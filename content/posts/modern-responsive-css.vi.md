---
title: 5 kỹ thuật CSS hiện đại cho giao diện responsive
excerpt: clamp(), container queries, aspect-ratio, grid auto-fit và svh — những công cụ giúp tôi viết ít media query hơn.
date: 2026-06-02
category: frontend
---

Ngày trước, làm responsive đồng nghĩa với hàng chục media query. Giờ đây CSS đã thông minh hơn rất nhiều.

## 1. clamp() cho chữ co giãn

```css
h1 { font-size: clamp(2.4rem, 7vw, 5rem); }
```

Một dòng, chữ tự co giãn mượt giữa điện thoại và màn hình lớn.

## 2. Grid auto-fit

```css
.grid { grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
```

Lưới tự chia số cột theo chiều rộng, không cần breakpoint.

## 3. aspect-ratio

Giữ tỉ lệ ảnh và video ổn định, tránh layout bị nhảy khi tải trang.

## 4. Container queries

Component tự thay đổi theo kích thước của khung chứa nó, thay vì theo màn hình. Rất hợp với thiết kế dạng component.

## 5. Đơn vị svh

`100vh` trên điện thoại thường bị thanh địa chỉ che mất. `100svh` giải quyết điều đó.

## Tổng kết

Hãy để CSS làm phần việc nặng — code gọn hơn, dễ bảo trì hơn.
