---
title: 5 kỹ thuật CSS hiện đại cho giao diện responsive
excerpt: clamp(), container queries, aspect-ratio, grid auto-fit và svh — những công cụ giúp tôi viết ít media query hơn.
date: 2026-06-02
category: frontend
---

Ngày trước, làm responsive đồng nghĩa với hàng chục media query: một bộ cho mobile, một bộ cho tablet, một bộ cho desktop, rồi thêm vài cái "vá" cho những màn hình lưng chừng. Giờ đây CSS đã thông minh hơn rất nhiều. Thay vì liệt kê từng breakpoint, tôi mô tả *quy tắc* — chữ nên to trong khoảng nào, thẻ nên rộng tối thiểu bao nhiêu — và để trình duyệt tự tính phần còn lại. Dưới đây là năm kỹ thuật tôi dùng hằng ngày, tất cả đều được hỗ trợ trong mọi trình duyệt hiện đại.

## 1. clamp() cho chữ co giãn

`clamp(MIN, PREFERRED, MAX)` trả về giá trị ở giữa, nhưng không bao giờ nhỏ hơn `MIN` hay lớn hơn `MAX`. Áp vào `font-size`, ta có chữ co giãn theo màn hình mà không vượt quá giới hạn:

```css
h1 {
  font-size: clamp(2.4rem, 7vw, 5rem);
}
```

Trên điện thoại hẹp, `7vw` nhỏ hơn `2.4rem` nên tiêu đề giữ ở `2.4rem`. Khi màn hình rộng dần, chữ to theo `7vw`, và dừng ở `5rem` trên màn hình lớn. Một dòng thay cho ba media query.

### Đừng chỉ dùng vw

Có một cái bẫy: nếu giá trị ở giữa chỉ là `vw`, chữ sẽ không phóng to khi người dùng zoom trình duyệt, vì `vw` phụ thuộc vào viewport chứ không phải cỡ chữ gốc. Cách an toàn hơn là cộng thêm một phần `rem`:

```css
:root {
  --step-0: clamp(1rem, 0.9rem + 0.5vw, 1.25rem);
  --step-3: clamp(1.75rem, 1.2rem + 2.5vw, 3rem);
}

body { font-size: var(--step-0); }
h2   { font-size: var(--step-3); }
```

Tôi gom các cỡ chữ vào biến CSS như trên để cả site dùng chung một thang chữ nhất quán. `clamp()` cũng dùng tốt cho `padding`, `gap` hay `margin` — khoảng trắng co giãn theo màn hình trông tự nhiên hơn hẳn.

## 2. Grid auto-fit

Đây có lẽ là dòng CSS tôi copy nhiều nhất:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}
```

Đọc từ trong ra ngoài: mỗi cột rộng tối thiểu `240px`, tối đa `1fr` (chia đều phần còn lại). `repeat(auto-fit, ...)` nhét được bao nhiêu cột thì nhét bấy nhiêu. Màn hình 1200px có bốn cột, tablet có hai, điện thoại còn một — không cần breakpoint nào.

### auto-fit hay auto-fill?

- `auto-fit` gộp các cột trống lại, nên khi chỉ có hai thẻ, chúng giãn ra lấp đầy hàng.
- `auto-fill` giữ nguyên các cột trống, nên hai thẻ vẫn chỉ rộng bằng kích thước một cột.

Có một lỗi nhỏ: trên màn hình hẹp hơn `240px` cộng padding, lưới sẽ tràn ngang. Kết hợp với `min()` để chặn điều đó:

```css
.grid {
  grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
}
```

`min(240px, 100%)` nghĩa là "240px, nhưng không bao giờ rộng hơn khung chứa".

## 3. aspect-ratio

Trước đây, muốn một khung video giữ tỉ lệ 16:9, ta phải dùng mẹo `padding-top: 56.25%` với một phần tử con `position: absolute`. Giờ chỉ cần:

```css
.video {
  width: 100%;
  aspect-ratio: 16 / 9;
}

.avatar {
  width: 120px;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
}
```

Khi biết chiều rộng, trình duyệt tự tính chiều cao. Lợi ích lớn nhất là trình duyệt **giữ chỗ** cho ảnh ngay từ đầu, trước khi ảnh tải xong, nên nội dung bên dưới không bị nhảy — điều này giúp cải thiện chỉ số CLS (Cumulative Layout Shift). Kết hợp với `object-fit: cover`, ảnh có tỉ lệ khác vẫn lấp đầy khung mà không bị méo.

> Mẹo: với thẻ `img`, chỉ cần khai báo thuộc tính `width` và `height` trong HTML là trình duyệt đã tự suy ra tỉ lệ. Dùng `aspect-ratio` trong CSS khi bạn muốn ép một tỉ lệ cố định cho cả lưới thẻ, bất kể ảnh gốc ra sao.

## 4. Container queries

Media query hỏi "màn hình rộng bao nhiêu?". Nhưng một component thẻ bài viết có thể nằm trong cột chính rộng rãi, hoặc trong sidebar chật chội — trên cùng một màn hình. Container queries cho phép component hỏi "khung chứa tôi rộng bao nhiêu?":

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: grid;
  gap: 1rem;
}

@container card (min-width: 480px) {
  .card {
    grid-template-columns: 200px 1fr;
  }
}
```

`container-type: inline-size` biến phần tử thành một container theo chiều ngang. Khi khung chứa rộng từ `480px` trở lên, thẻ chuyển sang bố cục hai cột: ảnh bên trái, chữ bên phải. Đặt cùng component đó vào sidebar hẹp, nó tự quay về bố cục dọc — không cần class bổ sung, không cần biết nó đang ở đâu.

### Đơn vị cqi

Container queries còn mang theo các đơn vị mới. `1cqi` bằng 1% chiều inline (thường là chiều ngang) của container gần nhất. Kết hợp với `clamp()`:

```css
.card-title {
  font-size: clamp(1.1rem, 4cqi, 1.6rem);
}
```

Tiêu đề giờ co giãn theo kích thước của thẻ, không phải của màn hình. Với tôi, đây là mảnh ghép cuối cùng cho thiết kế dạng component: mỗi component tự lo phần responsive của mình.

## 5. Đơn vị svh, lvh và dvh

`100vh` trên điện thoại là một nỗi đau quen thuộc. Trên trình duyệt mobile, thanh địa chỉ co lại và giãn ra khi cuộn, nên `100vh` thường được tính theo viewport *lớn nhất* — phần cuối của section full màn hình bị thanh địa chỉ che mất. Ba đơn vị mới giải quyết chuyện này:

- `svh` (small) — chiều cao viewport khi thanh công cụ của trình duyệt đang hiện đầy đủ. Luôn vừa khít, không bao giờ bị che.
- `lvh` (large) — chiều cao khi thanh công cụ đã thu lại hết.
- `dvh` (dynamic) — thay đổi liên tục theo trạng thái thực tế của thanh công cụ.

```css
.hero {
  min-height: 100vh;  /* fallback cho trình duyệt cũ */
  min-height: 100svh;
}
```

Tôi thường chọn `svh` cho hero section: nội dung luôn nằm gọn trong màn hình. `dvh` nghe hấp dẫn hơn, nhưng vì nó thay đổi trong lúc cuộn, layout có thể bị giật nhẹ — hãy dùng nó có chủ đích. Khai báo `100vh` phía trên làm fallback là thói quen tốt: trình duyệt không hiểu `svh` sẽ bỏ qua dòng thứ hai.

## Thêm: min() và logical properties

Hai công cụ nhỏ nữa mà tôi dùng rất thường xuyên:

```css
.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
  padding-block: clamp(3rem, 8vw, 6rem);
}
```

- `width: min(100% - 2rem, 1200px)` — container rộng tối đa `1200px`, nhưng trên màn hình nhỏ luôn chừa `1rem` mỗi bên. Một dòng thay cho cặp `max-width` + `padding`.
- `margin-inline` và `padding-block` là logical properties: chúng nói "theo chiều dòng chữ" và "theo chiều khối" thay vì trái/phải/trên/dưới. Code ngắn hơn, và tự đúng khi site hỗ trợ ngôn ngữ viết từ phải sang trái.

## Tổng kết

Năm kỹ thuật trên có chung một tư duy: thay vì ra lệnh cho từng kích thước màn hình, hãy mô tả giới hạn và để CSS tự tính.

- `clamp()` cho chữ và khoảng trắng co giãn.
- `repeat(auto-fit, minmax())` cho lưới tự chia cột.
- `aspect-ratio` để giữ tỉ lệ và tránh layout nhảy.
- Container queries và `cqi` cho component tự responsive.
- `svh`/`dvh`/`lvh` cho chiều cao màn hình mobile chính xác.

Tôi vẫn dùng media query — cho những thay đổi bố cục lớn ở cấp trang, hay `prefers-reduced-motion` và `prefers-color-scheme`. Nhưng số lượng đã giảm đi rõ rệt. Hãy để CSS làm phần việc nặng — code gọn hơn, dễ bảo trì hơn.
