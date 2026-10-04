import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import type { Locale, Localized } from './i18n'

export type Category = {
  slug: string
  name: Localized
  tagline: Localized
  description: Localized
  cover?: string
  theme: string
}

export const categories: Category[] = [
  {
    slug: 'travel',
    name: { vi: 'Du lịch', en: 'Travel' },
    tagline: { vi: 'Đi để kể', en: 'Stories from the road' },
    description: {
      vi: 'Những chuyến đi, góc nhỏ Đà Nẵng và khoảnh khắc đáng nhớ.',
      en: 'Trips, hidden corners of Da Nang and moments worth remembering.',
    },
    cover: '/img/sea.png',
    theme: 'teal',
  },
  {
    slug: 'frontend',
    name: { vi: 'Front-end', en: 'Front-end' },
    tagline: { vi: 'Code & giao diện', en: 'Code & interfaces' },
    description: {
      vi: 'Ghi chép về ReactJS, Next.js, CSS và kinh nghiệm xây dựng web.',
      en: 'Notes on ReactJS, Next.js, CSS and building for the web.',
    },
    theme: 'violet',
  },
  {
    slug: 'ai',
    name: { vi: 'AI', en: 'AI' },
    tagline: { vi: 'Làm việc thông minh hơn', en: 'Working smarter' },
    description: {
      vi: 'Cách tôi dùng AI trong công việc lập trình hằng ngày.',
      en: 'How I use AI in day-to-day development work.',
    },
    theme: 'gold',
  },
  {
    slug: 'design',
    name: { vi: 'Thiết kế', en: 'Design' },
    tagline: { vi: 'Đẹp và dùng được', en: 'Beautiful & usable' },
    description: {
      vi: 'Bài học từ những năm làm web designer: màu sắc, bố cục, Figma.',
      en: 'Lessons from my web designer years: color, layout and Figma.',
    },
    theme: 'coral',
  },
]

export type PostMeta = {
  slug: string
  locale: Locale
  title: string
  excerpt: string
  date: string
  category: string
  cover?: string
  location?: string
  featured: boolean
  readingTime: number
}

export type Post = PostMeta & { html: string; headings: { id: string; text: string }[] }

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function readFile(slug: string, locale: Locale) {
  const file = path.join(POSTS_DIR, `${slug}.${locale}.md`)
  return matter(fs.readFileSync(file, 'utf8'))
}

function toMeta(slug: string, locale: Locale, data: Record<string, unknown>, content: string): PostMeta {
  const words = content.trim().split(/\s+/).length
  return {
    slug,
    locale,
    title: String(data.title),
    excerpt: String(data.excerpt ?? ''),
    date: String(data.date instanceof Date ? data.date.toISOString() : data.date),
    category: String(data.category),
    cover: data.cover ? String(data.cover) : undefined,
    location: data.location ? String(data.location) : undefined,
    featured: Boolean(data.featured),
    readingTime: Math.max(1, Math.round(words / 200)),
  }
}

export function getPostSlugs(): string[] {
  const slugs = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.(vi|en)\.md$/, ''))
  return [...new Set(slugs)]
}

export function getAllPosts(locale: Locale): PostMeta[] {
  return getPostSlugs()
    .map((slug) => {
      const { data, content } = readFile(slug, locale)
      return toMeta(slug, locale, data, content)
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByCategory(locale: Locale, category: string) {
  return getAllPosts(locale).filter((p) => p.category === category)
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export async function getPost(slug: string, locale: Locale): Promise<Post> {
  const { data, content } = readFile(slug, locale)
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content)
  const html = String(file)
  const headings = [...html.matchAll(/<h2 id="([^"]+)">(.*?)<\/h2>/g)].map((m) => ({
    id: m[1],
    text: m[2].replace(/<[^>]+>/g, ''),
  }))
  return { ...toMeta(slug, locale, data, content), html, headings }
}
