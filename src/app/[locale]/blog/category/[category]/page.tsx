import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { locales, ui, type Locale } from '@/lib/i18n'
import { categories, getCategory, getPostsByCategory } from '@/lib/blog'
import { Cover, PostCard } from '@/components/PostCard'
import { CategoryTabs } from '@/components/CategoryTabs'
import { Icon } from '@/components/Icon'

type Params = { locale: Locale; category: string }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.slug })))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, category } = await params
  const cat = getCategory(category)
  return { title: cat ? `${cat.name[locale]} · Blog` : 'Blog', description: cat?.description[locale] }
}

export default async function CategoryPage({ params }: { params: Promise<Params> }) {
  const { locale, category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()
  const s = ui[locale]
  const posts = getPostsByCategory(locale, category)
  const others = categories.filter((c) => c.slug !== category)

  return (
    <>
      <section className={`cat-hero theme-${cat.theme}`}>
        <div className="cat-hero-media">
          <Cover src={cat.cover} theme={cat.theme} label="" />
        </div>
        <span className="cat-hero-vertical display" aria-hidden="true">
          {cat.name[locale]}
        </span>
        <div className="container cat-hero-inner" data-reveal>
          <nav className="crumbs">
            <Link href={`/${locale}/blog/`}>Blog</Link> <span>/</span> {cat.name[locale]}
          </nav>
          <p className="script cat-hero-script">{cat.tagline[locale]}</p>
          <h1 className="display cat-hero-title">{cat.name[locale]}</h1>
          <p className="cat-hero-desc">{cat.description[locale]}</p>
          <span className="pill">
            <span className="dot" /> {posts.length} {posts.length === 1 ? s.post : s.posts}
          </span>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <CategoryTabs locale={locale} active={category} />
          <div className="post-list">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} locale={locale} variant="row" />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-label">
              <em>✦</em> {s.otherCategories}
            </span>
          </div>
          <div className="cat-cards cat-cards-3">
            {others.map((c) => (
              <Link key={c.slug} href={`/${locale}/blog/category/${c.slug}/`} className={`cat-card theme-${c.theme}`} data-reveal>
                <Cover src={c.cover} theme={c.theme} label="" />
                <span className="cat-card-vertical display">{c.name[locale]}</span>
                <div className="cat-card-body">
                  <h3>{c.name[locale]}</h3>
                  <p>{c.tagline[locale]}</p>
                  <span className="cat-card-arrow">
                    <Icon name="arrow" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
