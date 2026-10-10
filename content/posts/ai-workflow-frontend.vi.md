---
title: AI đã thay đổi cách tôi làm Front-end như thế nào
excerpt: Từ Claude Code đến GitHub Copilot — AI không thay thế lập trình viên, nhưng thay đổi cách chúng ta làm việc mỗi ngày.
date: 2026-08-25
category: ai
featured: true
---

Một năm trở lại đây, AI đã trở thành "đồng nghiệp" quen thuộc trong công việc của tôi. Mỗi sáng mở VS Code, tôi gần như luôn có Claude Code chạy trong terminal, GitHub Copilot gợi ý ngay trong editor, và một tab ChatGPT để hỏi nhanh những thứ không liên quan trực tiếp đến codebase. Bài viết này không nhằm chứng minh AI "thần kỳ" hay "nguy hiểm", mà chỉ ghi lại những gì tôi thật sự rút ra sau khi dùng nó hằng ngày cho công việc front-end với ReactJS và Next.js.

## Viết prompt như viết yêu cầu công việc

Bài học đầu tiên và quan trọng nhất: AI chỉ tốt bằng yêu cầu mình đưa cho nó. Hồi đầu, tôi hay gõ những câu rất ngắn kiểu "tạo cho tôi một form đăng nhập". Kết quả thường chạy được, nhưng dùng sai thư viện, sai cách đặt tên, sai cấu trúc thư mục của dự án — và tôi mất thêm thời gian sửa lại.

Bây giờ tôi viết prompt giống như viết một ticket cho đồng nghiệp mới vào team. Một prompt tốt thường có:

- **Mục tiêu**: cần làm gì và để phục vụ ai
- **Ngữ cảnh**: stack đang dùng, file liên quan, convention của dự án
- **Ràng buộc**: không thêm thư viện mới, phải hỗ trợ accessibility, phải responsive
- **Ví dụ mong muốn**: một component tương tự có sẵn để AI bắt chước
- **Đầu ra**: muốn nhận code, giải thích, hay chỉ một kế hoạch

Đây là một prompt mẫu tôi hay dùng khi cần dựng component mới:

```text
Bối cảnh: Dự án Next.js (App Router), TypeScript, Tailwind CSS.
Component tham khảo: src/components/ui/Card.tsx (hãy theo cùng style và cách đặt tên).

Nhiệm vụ: Tạo component <PricingCard /> hiển thị tên gói, giá, danh sách tính năng và một nút CTA.

Ràng buộc:
- Không thêm thư viện mới.
- Props có kiểu rõ ràng, không dùng any.
- Nút CTA phải dùng được bằng bàn phím và có trạng thái focus rõ ràng.
- Responsive: 1 cột trên mobile, đặt trong grid ở desktop.

Trước khi viết code, hãy liệt kê ngắn gọn kế hoạch và các giả định của bạn.
```

Dòng cuối cùng là một mẹo nhỏ nhưng rất hữu ích: yêu cầu AI nêu kế hoạch và giả định trước giúp tôi phát hiện hiểu nhầm sớm, trước khi nó sinh ra hàng trăm dòng code sai hướng.

## Những việc AI làm tốt

Sau một thời gian, tôi nhận ra AI phát huy hiệu quả nhất ở những việc có khuôn mẫu rõ ràng:

- **Dựng khung component và trang mới**: phần boilerplate, props, layout cơ bản
- **Viết test và tài liệu**: đặc biệt là các test case biên mà mình hay quên
- **Giải thích đoạn code lạ**: khi phải đọc một module cũ không ai còn nhớ
- **Chuyển đổi dữ liệu, refactor lặp đi lặp lại**: đổi tên hàng loạt, tách hàm, chuyển class component sang function component

Một ví dụ refactor nhỏ. Trước đây trong nhiều dự án tôi gặp kiểu code fetch dữ liệu rải rác trong component:

```tsx
// Trước
function UserList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

Tôi nhờ AI chuyển sang Server Component của Next.js, có kiểu dữ liệu và xử lý lỗi:

```tsx
// Sau
type User = { id: string; name: string };

async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.API_URL}/users`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Không tải được danh sách người dùng');
  return res.json();
}

export default async function UserList() {
  const users = await getUsers();
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

Việc này không khó, nhưng khi phải làm ở nhiều chỗ thì AI tiết kiệm cho tôi khá nhiều thời gian gõ phím. Phần còn lại — quyết định có nên chuyển sang Server Component hay không — vẫn là việc của tôi.

## Những cạm bẫy cần cẩn thận

AI rất tự tin, kể cả khi nó sai. Đây là những vấn đề tôi đã gặp:

### API "tưởng tượng"

AI đôi khi bịa ra một hàm, một prop hoặc một option không hề tồn tại trong thư viện, nhất là với những phiên bản mới. Code trông rất hợp lý, chỉ đến khi chạy mới lỗi. Mỗi khi thấy một API lạ, tôi mở tài liệu chính thức để kiểm tra trước khi tin.

### Bảo mật và code độc quyền

Phần lớn dự án tôi làm cho khách hàng đều có thỏa thuận bảo mật. Vì vậy tôi có vài nguyên tắc cứng:

1. Không bao giờ dán API key, token, mật khẩu hay file `.env` vào prompt
2. Tuân thủ chính sách của công ty và khách hàng về công cụ AI nào được phép dùng
3. Khi hỏi trên công cụ chat bên ngoài, tôi rút gọn đoạn code thành ví dụ tối thiểu, bỏ tên biến hay logic nghiệp vụ nhạy cảm

### Phụ thuộc quá mức

Đây là cạm bẫy khó thấy nhất. Có giai đoạn tôi nhận ra mình chấp nhận gợi ý của Copilot mà không thật sự hiểu nó. Nếu không hiểu code mình commit, mình sẽ không thể debug khi có sự cố. Thỉnh thoảng tôi cố tình tự viết một phần mà không dùng AI, chỉ để giữ "cơ bắp" lập trình.

> AI đề xuất — mình quyết định. Và mình chịu trách nhiệm cho từng dòng code được merge.

## Cách tôi review code do AI viết

Tôi đối xử với code do AI sinh ra như một pull request từ một đồng nghiệp rất nhanh nhưng chưa quen dự án. Khi review, tôi tự hỏi:

- Code có thật sự giải quyết đúng yêu cầu, hay chỉ trông giống như vậy?
- Có dùng API, thư viện nào mình chưa kiểm chứng không?
- Có xử lý trạng thái loading, lỗi, dữ liệu rỗng không?
- Có vấn đề accessibility nào không: label, focus, contrast?
- Có thêm dependency hoặc đoạn code thừa không cần thiết không?
- Có giữ đúng convention và cấu trúc của dự án không?

Sau đó tôi luôn chạy lint, type check, test và tự mở trình duyệt kiểm tra trên nhiều kích thước màn hình. Không có bước nào trong đó được bỏ qua chỉ vì "AI viết rồi".

## Những việc vẫn cần con người

Quyết định kiến trúc, trải nghiệm người dùng, và trách nhiệm với chất lượng sản phẩm vẫn là phần việc của lập trình viên. AI có thể đưa ra năm cách tổ chức state, nhưng nó không biết team mình sẽ bảo trì dự án ra sao trong vài năm tới. Nó có thể viết một animation mượt, nhưng không biết người dùng thật có thấy animation đó phiền hay không.

Với nền tảng từng làm designer, tôi càng thấy rõ điều này: cảm nhận về khoảng cách, nhịp điệu, sự cân bằng trên một giao diện là thứ cần mắt người và sự thấu hiểu người dùng.

## Quy trình của tôi

Hiện tại, quy trình làm việc với AI của tôi gồm các bước:

1. **Mô tả yêu cầu rõ ràng**: viết prompt như một ticket, kèm ngữ cảnh và ràng buộc
2. **Yêu cầu kế hoạch trước**: đọc kế hoạch và sửa giả định sai
3. **Để AI tạo bản nháp**: chia nhỏ việc, mỗi lần một phần
4. **Đọc lại, chỉnh sửa, kiểm thử**: review như review PR của đồng nghiệp
5. **Ghi lại prompt hiệu quả để dùng lại**: tôi giữ một file ghi chú các prompt mẫu cho từng loại việc

Chia nhỏ việc là điểm tôi muốn nhấn mạnh. Một yêu cầu lớn kiểu "làm cả trang dashboard" thường cho ra kết quả khó review. Mười yêu cầu nhỏ, mỗi cái kiểm tra kỹ, cho kết quả tốt hơn nhiều.

## Kết luận

AI không làm tôi trở thành một lập trình viên khác, nhưng nó thay đổi cách tôi phân bổ thời gian. Tôi dành ít thời gian hơn cho việc gõ lại những thứ lặp lại, và nhiều thời gian hơn cho việc suy nghĩ: component này nên chia thế nào, người dùng sẽ cảm thấy gì khi thao tác, có cách nào đơn giản hơn không.

Tôi nghĩ kỹ năng quan trọng nhất trong thời gian tới không phải là biết dùng công cụ AI nào, mà là biết đặt câu hỏi đúng và đủ hiểu biết để đánh giá câu trả lời. AI giúp tôi đi nhanh hơn — nhưng hướng đi, và người dùng ở cuối con đường, vẫn là điều tôi phải tự giữ trong đầu.
