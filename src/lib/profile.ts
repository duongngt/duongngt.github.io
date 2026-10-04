import type { Localized } from './i18n'
import type { MockVariant } from '@/components/WorkMock'

// Nội dung trang chủ (song ngữ).
// Những mục có ghi chú "MẪU" là nội dung minh hoạ — hãy sửa lại cho đúng thực tế.

export const profile = {
  name: 'Nguyễn Tuấn Dương',
  shortName: { vi: 'Tuấn Dương', en: 'Duong Nguyen' } as Localized,
  role: { vi: 'Front-end Engineer', en: 'Front-end Engineer' } as Localized,
  company: 'Monstar Lab Vietnam',
  location: { vi: 'Đà Nẵng, Việt Nam', en: 'Da Nang, Viet Nam' } as Localized,
  email: 'duongngt16@gmail.com',
  phone: '079 546 6457',
  phoneHref: '+84795466457',
  github: 'https://github.com/duongngt',
  avatar: '/img/avatar.png',
}

export const hero = {
  eyebrow: { vi: 'Xin chào, tôi là', en: "Hello, I'm" } as Localized,
  script: { vi: 'Tôi xây dựng giao diện', en: 'I build interfaces' } as Localized,
  tagline: { vi: 'đẹp mắt & dễ dùng.', en: 'that look good & feel good.' } as Localized,
  intro: {
    vi: 'Front-end Engineer tại Monstar Lab Vietnam. Kết hợp giữa thiết kế và code — từ banner thương mại điện tử Nhật Bản đến ứng dụng web ReactJS & Next.js.',
    en: 'Front-end Engineer at Monstar Lab Vietnam. Blending design and code — from Japanese e-commerce banners to ReactJS & Next.js web applications.',
  } as Localized,
  badge: { vi: 'DESIGN · CODE · AI · ', en: 'DESIGN · CODE · AI · ' } as Localized,
}

export const stats: { value: string; label: Localized }[] = [
  { value: '5', label: { vi: 'Công ty đã làm', en: 'Companies' } },
  { value: '40+', label: { vi: 'Dự án hoàn thành', en: 'Projects delivered' } },
  { value: '300+', label: { vi: 'Banner đã thiết kế', en: 'Banners designed' } },
]

export const about = {
  lead: { vi: 'Nơi thiết kế gặp gỡ code.', en: 'Where design meets code.' } as Localized,
  paragraphs: [
    {
      vi: 'Hành trình của tôi bắt đầu từ năm 2015 với vai trò web designer — thiết kế banner, landing page và hình ảnh cho các thương hiệu thương mại điện tử Nhật Bản. Con mắt thẩm mỹ ấy vẫn luôn theo tôi: hôm nay, với vai trò Front-end Engineer tại Monstar Lab Vietnam, tôi biến ý tưởng thành những ứng dụng web nhanh, responsive với ReactJS và Next.js.',
      en: 'My journey started in 2015 as a web designer — crafting banners, landing pages and visuals for Japanese e-commerce brands. That design eye never left me: today, as a Front-end Engineer at Monstar Lab Vietnam, I turn ideas into fast, responsive web applications with ReactJS and Next.js.',
    },
    {
      vi: 'Tôi yêu khoảng giao thoa giữa thiết kế và lập trình, và luôn tìm cách làm việc thông minh hơn — đặc biệt với các công cụ AI giúp tôi tạo ra sản phẩm tốt hơn, nhanh hơn.',
      en: "I love the space where design meets code, and I'm always exploring new ways to work smarter — especially with AI tools that help me ship better products, faster.",
    },
  ] as Localized[],
  traits: [
    { vi: '#Tỉ mỉ', en: '#Detail-oriented' },
    { vi: '#Sáng tạo', en: '#Creative' },
    { vi: '#Làm việc nhóm', en: '#Team-player' },
    { vi: '#Ham học hỏi', en: '#Always-learning' },
  ] as Localized[],
}

export const services: { title: Localized; desc: Localized; icon: string }[] = [
  {
    icon: 'code',
    title: { vi: 'Phát triển Front-end', en: 'Front-end Development' },
    desc: { vi: 'Ứng dụng web hiện đại với ReactJS & Next.js, code sạch, dễ mở rộng.', en: 'Modern web apps with ReactJS & Next.js — clean, scalable code.' },
  },
  {
    icon: 'layout',
    title: { vi: 'Thiết kế UI/UX', en: 'UI/UX Design' },
    desc: { vi: 'Giao diện trực quan trên Figma, lấy người dùng làm trung tâm.', en: 'Intuitive, user-centered interfaces designed in Figma.' },
  },
  {
    icon: 'device',
    title: { vi: 'Responsive & Hiệu năng', en: 'Responsive & Performance' },
    desc: { vi: 'Hiển thị đẹp trên mọi thiết bị, tải nhanh, chuẩn SEO.', en: 'Pixel-perfect on every device, fast-loading and SEO-friendly.' },
  },
  {
    icon: 'spark',
    title: { vi: 'Quy trình với AI', en: 'AI-assisted Workflow' },
    desc: { vi: 'Ứng dụng AI để tăng tốc phát triển và nâng cao chất lượng.', en: 'Using AI to speed up development and raise quality.' },
  },
]

// Dự án thật được bảo mật (NDA), nên 3 dự án cuối là minh hoạ với giao diện dựng bằng code (WorkMock).
export const works: {
  title: string
  type: Localized
  desc: Localized
  tags: string[]
  theme: string
  image?: string
  mock?: MockVariant
}[] = [
  {
    title: 'Nissen & Pal-shop',
    type: { vi: 'Thiết kế banner thương mại điện tử', en: 'E-commerce banner design' },
    desc: { vi: 'Banner, landing page và chỉnh sửa ảnh cho các website thời trang Nhật Bản.', en: 'Banners, landing pages and photo retouching for Japanese fashion stores.' },
    tags: ['Photoshop', 'Illustrator'],
    theme: 'coral',
    image: '/img/Group-1.png',
  },
  {
    title: 'Corporate Website',
    type: { vi: 'Website doanh nghiệp đa ngôn ngữ', en: 'Multilingual corporate site' },
    desc: { vi: 'Website doanh nghiệp đa ngôn ngữ, tối ưu SEO và tốc độ tải trang.', en: 'A multilingual corporate site optimised for SEO and page speed.' },
    tags: ['Next.js', 'TypeScript', 'i18n'],
    theme: 'teal',
    mock: 'corporate',
  },
  {
    title: 'Admin Dashboard',
    type: { vi: 'Ứng dụng quản trị', en: 'Web application' },
    desc: { vi: 'Dashboard quản trị với biểu đồ, bảng dữ liệu và phân quyền người dùng.', en: 'An admin dashboard with charts, data tables and role-based access.' },
    tags: ['ReactJS', 'Chart.js', 'REST API'],
    theme: 'violet',
    mock: 'dashboard',
  },
  {
    title: 'AI Chat Assistant',
    type: { vi: 'Giao diện chatbot AI', en: 'AI chatbot interface' },
    desc: { vi: 'Giao diện trò chuyện với AI, hỗ trợ streaming và hiển thị markdown.', en: 'A conversational AI interface with streaming and markdown rendering.' },
    tags: ['Next.js', 'AI SDK', 'Streaming'],
    theme: 'gold',
    mock: 'chat',
  },
]

export const experience: { period: string; role: Localized; company: string; points: Localized[] }[] = [
  {
    period: '2022 – Now', // TODO: kiểm tra năm bắt đầu
    role: { vi: 'Front-end Engineer', en: 'Front-end Engineer' },
    company: 'Monstar Lab Vietnam',
    points: [
      { vi: 'Xây dựng ứng dụng web với ReactJS và Next.js', en: 'Build web applications with ReactJS and Next.js' },
      { vi: 'Ứng dụng công cụ AI để tăng tốc phát triển', en: 'Apply AI tools to speed up development' },
    ],
  },
  {
    period: '2020 – 2022',
    role: { vi: 'Web Developer', en: 'Web Developer' },
    company: 'Cơ Điện Đà Nẵng',
    points: [
      { vi: 'Phát triển và bảo trì website của công ty', en: 'Developed and maintained the company website' },
      { vi: 'Xây dựng giao diện responsive, tối ưu SEO', en: 'Built responsive, SEO-friendly pages' },
    ],
  },
  {
    period: '2019 – 2020',
    role: { vi: 'Front-end Developer', en: 'Front-end Developer' },
    company: 'Hifiveplus',
    points: [
      { vi: 'Phát triển giao diện web responsive', en: 'Developed responsive web interfaces' },
      { vi: 'Chuyển thiết kế UI thành HTML, CSS và JavaScript', en: 'Turned UI designs into HTML, CSS and JavaScript' },
    ],
  },
  {
    period: '2015 – 2018',
    role: { vi: 'Web Designer', en: 'Web Designer' },
    company: 'IF Vietnam',
    points: [
      { vi: 'Thiết kế banner, hình ảnh và landing page', en: 'Designed banners, images and landing pages' },
      { vi: 'Chỉnh màu, cắt ghép ảnh cho nissen.co.jp, pal-shop.jp', en: 'Color correction and clipping for nissen.co.jp, pal-shop.jp' },
    ],
  },
  {
    period: '2014 – 2015',
    role: { vi: 'Web Admin', en: 'Web Admin' },
    company: 'Ô tô Đại Mỹ',
    points: [
      { vi: 'Thiết kế banner, đăng bài và hỗ trợ khách hàng', en: 'Designed banners, posted content and supported customers' },
    ],
  },
]

export const education = {
  period: '2011 – 2015',
  school: { vi: 'Trường ĐH Công nghệ Thông tin và Truyền thông Việt – Hàn', en: 'Vietnam – Korea University of Information and Communication Technology' } as Localized,
  major: { vi: 'Chuyên ngành: Thương mại điện tử', en: 'Major: E-commerce' } as Localized,
}

export const skillGroups: { title: Localized; items: string[] }[] = [
  { title: { vi: 'Front-end', en: 'Front-end' }, items: ['ReactJS', 'Next.js', 'JavaScript', 'HTML', 'CSS'] },
  { title: { vi: 'AI', en: 'AI' }, items: ['Prompt Engineering', 'Claude Code', 'GitHub Copilot', 'ChatGPT'] },
  { title: { vi: 'Thiết kế', en: 'Design' }, items: ['Figma', 'Photoshop', 'Illustrator'] },
]

// MẪU: trình độ ngoại ngữ — sửa lại cho đúng.
export const languages: { name: Localized; level: Localized }[] = [
  { name: { vi: 'Tiếng Việt', en: 'Vietnamese' }, level: { vi: 'Bản ngữ', en: 'Native' } },
  { name: { vi: 'Tiếng Anh', en: 'English' }, level: { vi: 'Giao tiếp công việc', en: 'Professional working' } },
]

export const process: { title: Localized; desc: Localized }[] = [
  { title: { vi: 'Tìm hiểu', en: 'Discover' }, desc: { vi: 'Lắng nghe mục tiêu, người dùng và yêu cầu.', en: 'Understand goals, users and requirements.' } },
  { title: { vi: 'Thiết kế', en: 'Design' }, desc: { vi: 'Phác thảo wireframe và giao diện trên Figma.', en: 'Wireframes and UI design in Figma.' } },
  { title: { vi: 'Phát triển', en: 'Build' }, desc: { vi: 'Code với React/Next.js, kiểm thử trên mọi thiết bị.', en: 'Code with React/Next.js, tested on every device.' } },
  { title: { vi: 'Bàn giao', en: 'Ship' }, desc: { vi: 'Tối ưu, triển khai và đồng hành sau ra mắt.', en: 'Optimise, deploy and support after launch.' } },
]

export const archive = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `/img/${n}.png`)
