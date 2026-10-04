---
title: Deploy Next.js lên GitHub Pages với Static Export
excerpt: GitHub Pages chỉ phục vụ file tĩnh — nhưng với output export, bạn vẫn có thể dùng App Router, đa ngôn ngữ và blog Markdown.
date: 2026-09-18
category: frontend
featured: true
---

Trang web bạn đang đọc được xây bằng Next.js và chạy trên GitHub Pages — một dịch vụ chỉ phục vụ file tĩnh. Đây là cách tôi làm.

## Bật static export

Trong `next.config.mjs`, chỉ cần một dòng:

```js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}
```

Khi chạy `next build`, Next.js sinh toàn bộ HTML vào thư mục `out/`.

## Route động cần generateStaticParams

Mỗi route động như `/blog/[slug]` phải khai báo trước tất cả giá trị có thể có. Không có server, nên mọi trang phải được build sẵn.

## Đa ngôn ngữ không cần middleware

Static export không hỗ trợ middleware, nên tôi đặt ngôn ngữ vào đường dẫn: `/vi/...` và `/en/...`. Trang gốc `/` chỉ làm một việc: đọc ngôn ngữ trình duyệt và chuyển hướng.

## Tự động deploy với GitHub Actions

Mỗi lần push lên `master`, workflow sẽ build và đẩy thư mục `out/` lên Pages. Không cần làm gì thủ công.

## Kết luận

Static export là lựa chọn tuyệt vời cho portfolio và blog: nhanh, miễn phí, và vẫn tận dụng được hệ sinh thái React.
