---
title: Từ Web Designer đến Front-end Engineer
excerpt: Những năm làm banner cho các thương hiệu Nhật Bản đã dạy tôi điều gì khi chuyển sang viết code?
date: 2026-03-10
category: design
cover: /img/Group-1.png
---

Tôi bắt đầu sự nghiệp với Photoshop và Illustrator, thiết kế hàng trăm banner cho các trang thương mại điện tử Nhật Bản. Từ năm 2015 đến 2018, công việc hằng ngày của tôi là banner khuyến mãi, landing page, những bố cục phải bắt mắt và truyền tải thông điệp chỉ trong vài giây. Rồi một ngày, tôi muốn tự tay biến thiết kế thành sản phẩm thật — không chỉ giao file PSD rồi chờ xem người khác dựng nó ra sao.

Bài viết này là những gì tôi rút ra trên hành trình đó, và một vài gợi ý cho những designer đang nghĩ đến việc học code.

## Vì sao tôi chuyển hướng

Khi làm designer, tôi thường gặp cảm giác "hụt": thiết kế trên Photoshop rất chỉn chu, nhưng khi lên web thì khoảng cách lệch, font khác, hiệu ứng hover không như tưởng tượng. Tôi không trách developer — họ có rất nhiều việc khác phải lo. Nhưng tôi nhận ra nếu mình hiểu được cách trình duyệt hiển thị giao diện, mình sẽ thiết kế thực tế hơn, và có thể tự sửa những chi tiết nhỏ ấy.

Ban đầu tôi chỉ định học đủ HTML/CSS để tự dựng landing page. Nhưng càng học càng thấy thú vị, và dần dần code trở thành công việc chính.

## Những bài học từ nghề thiết kế

### Bài học 1: Chi tiết tạo nên chất lượng

Khách hàng Nhật rất khắt khe từng pixel. Một banner có thể phải sửa nhiều lần chỉ vì khoảng cách giữa tiêu đề và nút chưa cân. Thói quen ấy giúp tôi giờ đây không bao giờ bỏ qua khoảng cách, căn lề, trạng thái hover, focus hay disabled của một component.

### Bài học 2: Thiết kế cho người dùng

Một banner đẹp nhưng không ai bấm là banner thất bại. Làm banner cho thương mại điện tử dạy tôi rằng mọi yếu tố trên màn hình đều phải có mục đích. Giao diện cũng vậy — đẹp phải đi đôi với dễ dùng, nhanh và dễ tiếp cận.

### Bài học 3: Hiểu ngôn ngữ của nhau

Vì từng là designer, tôi hiểu designer muốn gì. Vì là developer, tôi biết điều gì khả thi. Đó là cầu nối giúp team làm việc nhanh hơn: ít vòng sửa đi sửa lại, ít hiểu nhầm hơn.

> Một thiết kế chỉ thật sự hoàn thành khi nó chạy được trên màn hình của người dùng.

## Lộ trình học của tôi

Nhìn lại, đây là thứ tự tôi thấy hợp lý cho một designer muốn học front-end:

1. **HTML/CSS**: hiểu cấu trúc trang, box model, Flexbox, Grid, responsive. Đây là phần designer sẽ thấy "quen" nhất vì nó gần với tư duy bố cục.
2. **JavaScript**: biến, hàm, mảng, object, DOM, sự kiện, rồi đến async/await và fetch dữ liệu. Phần này khó nhất với tôi vì nó đòi hỏi tư duy logic hoàn toàn khác.
3. **React**: tư duy component, props, state, hooks. Với designer, khái niệm component rất gần với symbol hay component trong công cụ thiết kế.
4. **Next.js**: routing, rendering phía server, tối ưu hình ảnh và hiệu năng — những thứ cần để đưa sản phẩm ra thực tế.

Đừng cố học tất cả cùng lúc. Tôi từng mất khá nhiều thời gian vì nhảy vào framework khi JavaScript cơ bản còn chưa vững.

### Một ví dụ nhỏ

Hồi mới học, tôi hay căn giữa bằng cách "ép" số liệu:

```css
/* Trước */
.banner-title {
  position: absolute;
  top: 120px;
  left: 340px;
}
```

Nó trông đúng trên màn hình của tôi, nhưng vỡ trên mọi kích thước khác. Sau khi hiểu Flexbox:

```css
/* Sau */
.banner {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 1.5rem;
}
```

Đó là lúc tôi hiểu sự khác biệt giữa thiết kế một khung hình cố định và thiết kế cho web.

## Công cụ tôi dùng

- **Figma**: công cụ chính để đọc thiết kế, lấy thông số và trao đổi với designer
- **Photoshop và Illustrator**: vẫn dùng khi cần xử lý ảnh, cắt asset hoặc chỉnh icon
- **VS Code**: editor hằng ngày, cùng các extension cho format, lint và Tailwind
- **Git**: lúc đầu tôi thấy rất khó hiểu, nhưng giờ không thể làm việc thiếu nó — đặc biệt khi làm việc nhóm

## Kỹ năng thiết kế giúp gì cho front-end

Đây là phần tôi thấy mình có lợi thế rõ nhất:

- **Spacing**: tôi tự nhiên nhận ra khi khoảng cách không theo hệ thống, và thích dùng thang spacing nhất quán thay vì số tùy ý
- **Typography**: hiểu line-height, độ dài dòng, cấp bậc tiêu đề giúp nội dung dễ đọc hơn hẳn
- **Design system**: tư duy về component, token màu, biến thể giúp tôi dựng thư viện UI có tổ chức và dễ mở rộng
- **Handoff**: tôi biết nên hỏi designer những gì — trạng thái rỗng, trạng thái lỗi, hành vi trên mobile — trước khi bắt tay vào code

## Lời khuyên cho designer muốn học code

Nếu bạn là designer muốn học code, đây là vài điều tôi ước mình biết sớm hơn:

- **Tự dựng lại chính thiết kế của mình**: đó là bài tập tốt nhất vì bạn đã hiểu rõ nó phải trông như thế nào
- **Học từng bước nhỏ**: mỗi ngày một chút còn hơn một tuần học dồn rồi bỏ
- **Dùng DevTools của trình duyệt**: inspect các trang web bạn thích để xem họ dựng thế nào
- **Đừng sợ lỗi**: lỗi trong console là cách trình duyệt "nói chuyện" với bạn
- **Giữ con mắt thẩm mỹ**: đó không phải thứ cần bỏ đi, mà là thứ làm bạn khác biệt

## Lời kết

Nhìn lại, những năm làm designer không phải là "đi đường vòng". Chúng cho tôi một góc nhìn mà tôi dùng mỗi ngày khi viết code: luôn nghĩ đến người sẽ nhìn và chạm vào giao diện đó. Công cụ và framework sẽ còn thay đổi, nhưng sự chú ý đến chi tiết và sự thấu hiểu người dùng thì không.

Nếu bạn đang đứng ở ngã rẽ giống tôi ngày trước, hãy cứ bắt đầu. Từng bước nhỏ một.
