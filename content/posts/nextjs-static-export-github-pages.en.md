---
title: Deploying Next.js to GitHub Pages with Static Export
excerpt: GitHub Pages only serves static files — but with output export you still get the App Router, multiple languages and a Markdown blog.
date: 2026-09-18
category: frontend
featured: true
---

The site you are reading is built with Next.js and runs on GitHub Pages — a service that only serves static files. Here is how I did it.

## Turn on static export

In `next.config.mjs`, it only takes a line:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

When you run `next build`, Next.js generates every page as HTML into the `out/` folder.

## Dynamic routes need generateStaticParams

Every dynamic route such as `/blog/[slug]` must declare all of its possible values up front. There is no server, so every page has to be built ahead of time.

## i18n without middleware

Static export doesn't support middleware, so the language lives in the URL: `/vi/...` and `/en/...`. The root `/` page does one thing: read the browser language and redirect.

## Auto-deploy with GitHub Actions

On every push to `master`, a workflow builds the site and publishes `out/` to Pages. Nothing manual.

## Wrapping up

Static export is a great fit for portfolios and blogs: fast, free, and still powered by the React ecosystem.
