import Link from 'next/link'
import { ui, type Locale } from '@/lib/i18n'
import { categories, getAllPosts } from '@/lib/blog'

export function CategoryTabs({ locale, active }: { locale: Locale; active?: string }) {
  const posts = getAllPosts(locale)
  return (
    <nav className="tabs" aria-label="Categories">
      <Link href={`/${locale}/blog/`} className={!active ? 'active' : ''}>
        {ui[locale].allPosts} <sup>{posts.length}</sup>
      </Link>
      {categories.map((c) => (
        <Link key={c.slug} href={`/${locale}/blog/category/${c.slug}/`} className={active === c.slug ? 'active' : ''}>
          {c.name[locale]} <sup>{posts.filter((p) => p.category === c.slug).length}</sup>
        </Link>
      ))}
    </nav>
  )
}
