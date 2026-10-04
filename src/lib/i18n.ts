export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export type Localized<T = string> = Record<Locale, T>

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale]
}

export function formatDate(date: string, locale: Locale, style: 'long' | 'short' = 'long') {
  return new Date(date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
    day: '2-digit',
    month: style === 'long' ? 'long' : '2-digit',
    year: 'numeric',
  })
}

export function monthYear(date: string, locale: Locale) {
  return new Date(date).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', { month: 'short', year: 'numeric' })
}

export const ui = {
  vi: {
    nav: { home: 'Trang chủ', about: 'Giới thiệu', services: 'Dịch vụ', work: 'Dự án', experience: 'Kinh nghiệm', blog: 'Blog', contact: 'Liên hệ' },
    hireMe: 'Liên hệ ngay',
    switchLang: 'English',
    scrollDown: 'Cuộn xuống',
    readMore: 'Đọc tiếp',
    viewAll: 'Xem tất cả',
    minRead: 'phút đọc',
    posts: 'bài viết',
    post: 'bài viết',
    allPosts: 'Tất cả',
    featured: 'Nổi bật',
    latest: 'Bài mới nhất',
    exploreCategories: 'Khám phá theo chủ đề',
    otherCategories: 'Chủ đề khác',
    relatedPosts: 'Bài viết liên quan',
    onThisPage: 'Trong bài này',
    backToBlog: 'Quay lại Blog',
    prev: 'Bài trước',
    next: 'Bài sau',
    footerNote: 'Thiết kế & phát triển bởi Nguyễn Tuấn Dương với Next.js.',
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', work: 'Work', experience: 'Experience', blog: 'Blog', contact: 'Contact' },
    hireMe: "Let's talk",
    switchLang: 'Tiếng Việt',
    scrollDown: 'Scroll down',
    readMore: 'Read more',
    viewAll: 'View all',
    minRead: 'min read',
    posts: 'posts',
    post: 'post',
    allPosts: 'All',
    featured: 'Featured',
    latest: 'Latest posts',
    exploreCategories: 'Explore by category',
    otherCategories: 'Other categories',
    relatedPosts: 'Related posts',
    onThisPage: 'On this page',
    backToBlog: 'Back to Blog',
    prev: 'Previous',
    next: 'Next',
    footerNote: 'Designed & built by Nguyen Tuan Duong with Next.js.',
  },
} satisfies Record<Locale, unknown>
