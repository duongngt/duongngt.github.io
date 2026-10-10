---
title: Deploying Next.js to GitHub Pages with Static Export
excerpt: GitHub Pages only serves static files — but with output export you still get the App Router, multiple languages and a Markdown blog.
date: 2026-09-18
category: frontend
featured: true
---

The site you are reading is built with Next.js 16 (App Router) and runs on GitHub Pages — a service that only serves static files: no Node.js, no server. That sounds like a contradiction, but thanks to static export every page is pre-built as HTML. In this post I walk through the whole setup, including a rather annoying bug I only discovered after deploying.

## Turn on static export in next.config.mjs

It all starts with the config file. This is the entire `next.config.mjs` of this site:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

Three lines, each with its own reason:

- `output: 'export'` — when you run `next build`, Next.js writes all HTML, CSS and JS into the `out/` folder instead of preparing for a Node server.
- `trailingSlash: true` — every route is exported as `page-name/index.html` rather than `page-name.html`. GitHub Pages serves `index.html` inside a folder automatically, so a URL like `/en/blog/` works out of the box with no rewrite rules.
- `images: { unoptimized: true }` — the default image optimization in `next/image` needs a server to resize images on demand. Without a server it has to be turned off, and images are served as-is.

> Tip: if your images are heavy, optimize them before committing (compress, convert to WebP, crop to the right size). With optimization off, the file you put in `public/` is exactly the file your visitors download.

## Dynamic routes need generateStaticParams

No server means no rendering "on request". Every dynamic route such as `/[locale]/blog/[slug]` has to declare all its possible values up front so Next.js can pre-build each page. Here is the top of `src/app/[locale]/blog/[slug]/page.tsx`:

```tsx
type Params = { locale: Locale; slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getPostSlugs().map((slug) => ({ locale, slug }))
  )
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  // ...render the post
}
```

A few things to note:

- `generateStaticParams` returns every `{ locale, slug }` pair — each post multiplied by each language.
- `export const dynamicParams = false` makes it explicit that anything outside that list is a 404. With static export, that is the only sensible behavior.
- In recent Next.js versions `params` is a **Promise**, so you must `await params` before using it. Forgetting the `await` was the mistake I made most often while upgrading.

`generateMetadata` receives `params` the same way, so each post gets its own `title`, `description` and Open Graph tags — all written straight into the HTML at build time.

## i18n without middleware

The usual way to do i18n in Next.js is middleware that reads the `Accept-Language` header and redirects. But static export doesn't support middleware, because there is no server to run it. My solution: put the language directly in the path through a `[locale]` segment, giving `/vi/...` and `/en/...`.

The layout `src/app/[locale]/layout.tsx` also uses `generateStaticParams` to build both languages, and sets the `lang` attribute on `<html>`:

```tsx
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
```

### The root page redirects with a script

What about `/`? It lives in its own route group, `src/app/(root)/page.tsx`, and does exactly one thing: read `navigator.language` and redirect with a tiny inline script:

```tsx
const script = `location.replace((navigator.language || '').toLowerCase().startsWith('vi') ? '/vi/' : '/en/')`

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      {/* plus two English / Tiếng Việt links to pick manually */}
    </>
  )
}
```

I use `location.replace` instead of assigning `location.href` so that `/` doesn't stay in the browser history — hitting Back won't trap you in a redirect loop. If JavaScript is disabled, the `<noscript>` block with a `meta refresh` sends visitors to the English version.

## A Markdown blog

Each post is a Markdown file in `content/posts/`, named `slug.vi.md` and `slug.en.md`. The top of each file is YAML front-matter with the title, excerpt, date and category. In `src/lib/blog.ts` I use `gray-matter` to split off the front-matter, then run the content through a unified pipeline:

```ts
const { data, content } = matter(fs.readFileSync(file, 'utf8'))

const html = String(
  await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content)
)
```

`remark-parse` reads the Markdown, `remark-gfm` adds tables and other GitHub syntax, `remark-rehype` converts it to an HTML tree, and `rehype-slug` gives every heading an `id`. With those ids in place, I collect the `h2` headings to build the "On this page" table of contents next to the post. All of this runs at build time using Node's `fs` — readers only ever receive plain HTML.

## Auto-deploy with GitHub Actions

On every push to `master`, the `.github/workflows/deploy.yml` workflow builds the site and publishes `out/` to Pages:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

The workflow needs the `pages: write` and `id-token: write` permissions. One step that is easy to forget: go to the repo's **Settings → Pages → Source** and choose **GitHub Actions**. If it is still set to deploy from a branch, the workflow goes green but the site never changes.

## 404s on RSC prefetch files

This is the part I only found after deploying. The site worked, but the Network tab was full of 404s whenever I hovered over a link. The cause: when `next/link` prefetches, the client requests RSC payload files with **flat names**, such as `__next.$d$locale.__PAGE__.txt`. The export, however, writes them as **nested folders**, like `__next.$d$locale/__PAGE__.txt`. A static host like GitHub Pages can't map one to the other.

My fix is a small script that runs right after the build (`"build": "next build && node scripts/flatten-rsc.mjs"`): it walks `out/`, and for every folder whose name starts with `__next.` it copies each file inside to a flat-named copy alongside it:

```js
function flatten(dir, prefix, target) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const name = `${prefix}.${entry.name}`
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) flatten(full, name, target)
    else fs.copyFileSync(full, path.join(target, name))
  }
}
```

> Lesson learned: always test the build with a static server (for example `npx serve out`) and open the Network tab before trusting that everything is fine. `next dev` will never show you this kind of bug.

## Limitations to know about

Static export isn't magic. Features that need a server are off the table:

- Route Handlers that depend on the `Request` (reading headers, dynamic query params).
- Reading or writing cookies.
- `rewrites`, `redirects` and `headers` in `next.config`.
- Middleware.
- ISR (Incremental Static Regeneration) — to update content you rebuild.
- Server Actions.
- Default image optimization.

For a personal portfolio and blog, I need none of these.

## Wrapping up

Static export is a great fit for portfolios and blogs: fast, free, and still powered by the React ecosystem and the App Router. The key is accepting that everything must be known at build time — from the list of posts to the languages — and checking the `out/` folder on a real static server before you deploy.
