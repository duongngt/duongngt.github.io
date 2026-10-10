---
title: Deploy Next.js lên GitHub Pages với Static Export
excerpt: GitHub Pages chỉ phục vụ file tĩnh — nhưng với output export, bạn vẫn có thể dùng App Router, đa ngôn ngữ và blog Markdown.
date: 2026-09-18
category: frontend
featured: true
---

Trang web bạn đang đọc được xây bằng Next.js 16 (App Router) và chạy trên GitHub Pages — một dịch vụ chỉ phục vụ file tĩnh, không có Node.js, không có server. Nghe có vẻ mâu thuẫn, nhưng nhờ chế độ static export, mọi trang đều được build sẵn thành HTML. Trong bài này tôi ghi lại toàn bộ cách làm, kể cả một lỗi khá "khó chịu" mà tôi chỉ phát hiện ra sau khi deploy.

## Bật static export trong next.config.mjs

Mọi thứ bắt đầu từ file cấu hình. Đây là toàn bộ `next.config.mjs` của site này:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
```

Ba dòng, mỗi dòng có lý do riêng:

- `output: 'export'` — khi chạy `next build`, Next.js sinh toàn bộ HTML, CSS, JS vào thư mục `out/` thay vì chuẩn bị cho một Node server.
- `trailingSlash: true` — mỗi route được xuất thành `ten-trang/index.html` thay vì `ten-trang.html`. GitHub Pages tự phục vụ `index.html` trong thư mục, nên URL như `/vi/blog/` hoạt động ngay mà không cần cấu hình rewrite.
- `images: { unoptimized: true }` — image optimization mặc định của `next/image` cần server để resize ảnh theo yêu cầu. Không có server thì phải tắt, ảnh sẽ được phục vụ nguyên bản.

> Mẹo: nếu ảnh nặng, hãy tối ưu chúng trước khi commit (nén, đổi sang WebP, cắt đúng kích thước). Khi tắt optimization, file bạn đưa vào `public/` chính là file người dùng tải về.

## Route động cần generateStaticParams

Không có server nghĩa là không thể render trang "theo yêu cầu". Mọi route động như `/[locale]/blog/[slug]` phải khai báo trước tất cả giá trị có thể có, để Next.js build sẵn từng trang. Đây là phần đầu file `src/app/[locale]/blog/[slug]/page.tsx`:

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
  // ...render bài viết
}
```

Vài điểm cần lưu ý:

- `generateStaticParams` trả về mọi cặp `{ locale, slug }` — mỗi bài viết nhân với mỗi ngôn ngữ.
- `export const dynamicParams = false` nói rõ rằng ngoài danh sách trên, mọi giá trị khác đều là 404. Với static export, đây là hành vi duy nhất hợp lý.
- Trong các phiên bản Next.js mới, `params` là một **Promise**, nên phải `await params` trước khi dùng. Quên `await` là lỗi tôi gặp nhiều nhất khi nâng cấp.

`generateMetadata` cũng nhận `params` theo cách tương tự, nên mỗi bài viết có `title`, `description` và Open Graph riêng — tất cả được ghi thẳng vào HTML lúc build.

## Đa ngôn ngữ không cần middleware

Cách làm i18n phổ biến trong Next.js là dùng middleware để đọc header `Accept-Language` rồi chuyển hướng. Nhưng static export không hỗ trợ middleware, vì không có server nào chạy nó. Giải pháp của tôi: đặt ngôn ngữ thẳng vào đường dẫn qua segment `[locale]`, tạo ra `/vi/...` và `/en/...`.

Layout `src/app/[locale]/layout.tsx` cũng dùng `generateStaticParams` để build đủ hai ngôn ngữ, và đặt `lang` cho thẻ `<html>`:

```tsx
export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}
```

### Trang gốc chuyển hướng bằng script

Còn trang `/` thì sao? Nó nằm trong route group riêng `src/app/(root)/page.tsx` và chỉ làm một việc: đọc `navigator.language` rồi chuyển hướng bằng một đoạn script inline rất nhỏ:

```tsx
const script = `location.replace((navigator.language || '').toLowerCase().startsWith('vi') ? '/vi/' : '/en/')`

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      {/* thêm hai link English / Tiếng Việt để chọn tay */}
    </>
  )
}
```

Dùng `location.replace` thay vì gán `location.href` để trang `/` không nằm lại trong lịch sử trình duyệt — bấm Back sẽ không bị kẹt vòng lặp. Nếu JavaScript bị tắt, thẻ `<noscript>` với `meta refresh` đưa người dùng về bản tiếng Anh.

## Blog bằng Markdown

Mỗi bài viết là một file Markdown trong `content/posts/`, đặt tên theo dạng `slug.vi.md` và `slug.en.md`. Phần đầu file là front-matter YAML chứa tiêu đề, mô tả, ngày, category. Trong `src/lib/blog.ts`, tôi dùng `gray-matter` để tách front-matter, rồi đưa nội dung qua pipeline unified:

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

`remark-parse` đọc Markdown, `remark-gfm` thêm bảng và các cú pháp GitHub, `remark-rehype` chuyển sang cây HTML, và `rehype-slug` gắn `id` cho mọi heading. Nhờ có `id`, tôi lấy danh sách các heading `h2` để dựng mục lục "Trên trang này" ở cạnh bài viết. Tất cả chạy lúc build bằng `fs` của Node — người đọc chỉ nhận về HTML thuần.

## Tự động deploy với GitHub Actions

Mỗi lần push lên `master`, workflow `.github/workflows/deploy.yml` sẽ build và đẩy thư mục `out/` lên Pages:

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

Workflow cần các quyền `pages: write` và `id-token: write`. Một bước rất dễ quên: vào **Settings → Pages → Source** của repo và chọn **GitHub Actions**. Nếu vẫn để chế độ deploy từ branch, workflow chạy xanh nhưng site không hề thay đổi.

## Lỗi 404 với file prefetch RSC

Đây là phần tôi chỉ phát hiện sau khi deploy. Site chạy bình thường, nhưng tab Network đầy lỗi 404 mỗi khi hover vào link. Nguyên nhân: khi `next/link` prefetch, client request các file payload RSC với **tên phẳng**, ví dụ `__next.$d$locale.__PAGE__.txt`. Trong khi đó, bản export lại ghi chúng thành **thư mục lồng nhau**, kiểu `__next.$d$locale/__PAGE__.txt`. Một server tĩnh như GitHub Pages không tự map được hai dạng này.

Cách sửa của tôi là một script nhỏ chạy ngay sau build (`"build": "next build && node scripts/flatten-rsc.mjs"`): duyệt thư mục `out/`, gặp thư mục nào bắt đầu bằng `__next.` thì copy từng file bên trong ra một bản tên phẳng cùng cấp:

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

> Bài học: luôn kiểm tra bản build bằng một static server (ví dụ `npx serve out`) và mở tab Network trước khi tin rằng mọi thứ đã ổn. `next dev` không bao giờ cho bạn thấy lỗi kiểu này.

## Những giới hạn cần biết

Static export không phải phép màu. Những tính năng cần server sẽ không dùng được:

- Route Handlers phụ thuộc vào `Request` (đọc header, query động).
- Đọc/ghi cookies.
- `rewrites`, `redirects`, `headers` trong `next.config`.
- Middleware.
- ISR (Incremental Static Regeneration) — muốn cập nhật nội dung thì phải build lại.
- Server Actions.
- Image optimization mặc định.

Với một portfolio và blog cá nhân, tôi không cần bất kỳ thứ nào trong danh sách trên.

## Kết luận

Static export là lựa chọn tuyệt vời cho portfolio và blog: nhanh, miễn phí, và vẫn tận dụng được hệ sinh thái React cùng App Router. Chìa khóa là chấp nhận rằng mọi thứ phải được biết trước lúc build — từ danh sách bài viết đến ngôn ngữ — và kiểm tra kỹ bản `out/` trên một static server thật trước khi deploy.
