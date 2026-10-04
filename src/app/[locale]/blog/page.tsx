import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate, ui, type Locale } from '@/lib/i18n'
import { categories, getAllPosts, getCategory } from '@/lib/blog'
import { Cover, PostCard } from '@/components/PostCard'
import { CategoryTabs } from '@/components/CategoryTabs'
import { Icon } from '@/components/Icon'

export const metadata: Metadata = { title: 'Blog' }

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const s = ui[locale]
  const vi = locale === 'vi'
  const posts = getAllPosts(locale)
  const featured = posts.filter((p) => p.featured)
  const main = featured[0] ?? posts[0]
  const side = posts.filter((p) => p.slug !== main.slug).slice(0, 2)
  const mainCat = getCategory(main.category)!

  return (
    <>
      <section className="blog-hero">
        <div className="blog-hero-bg" style={{ backgroundImage: 'url(/img/sea2.png)' }} />
        <div className="container blog-hero-inner" data-reveal>
          <span className="section-label">
            <em>✦</em> {vi ? 'Blog cá nhân' : 'Personal blog'}
          </span>
          <h1 className="display blog-title">
            {vi ? 'Câu chuyện' : 'Stories'} <span className="text-outline">&amp;</span> {vi ? 'ghi chép' : 'notes'}
          </h1>
          <p className="script blog-script">{vi ? 'một mảnh chuyện nhỏ của tôi' : 'a piece of my little story'}</p>
          <p className="blog-lead">
            {vi
              ? 'Về những chuyến đi, những dòng code và những điều tôi học được trên hành trình làm nghề.'
              : 'About trips, lines of code and everything I learn along the way.'}
          </p>
          <CategoryTabs locale={locale} />
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="section-head row" data-reveal>
            <span className="section-label">
              <em>01</em> {s.featured}
            </span>
          </div>
          <div className="featured">
            <Link href={`/${locale}/blog/${main.slug}/`} className="featured-main" data-reveal>
              <Cover src={main.cover} theme={mainCat.theme} label={mainCat.name[locale]} />
              <div className="featured-overlay">
                <span className={`badge theme-${mainCat.theme}`}>{mainCat.name[locale]}</span>
                <h2>{main.title}</h2>
                <p>{main.excerpt}</p>
                <span className="meta">
                  <Icon name="calendar" size={14} /> {formatDate(main.date, locale)} · {main.readingTime} {s.minRead}
                </span>
              </div>
            </Link>
            <div className="featured-side">
              {side.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-label">
              <em>02</em> {s.exploreCategories}
            </span>
            <h2 className="display">
              {vi ? 'Chọn một' : 'Pick a'} <span className="text-accent">{vi ? 'chủ đề' : 'topic'}</span>
            </h2>
          </div>
          <div className="cat-cards">
            {categories.map((c, i) => (
              <Link key={c.slug} href={`/${locale}/blog/category/${c.slug}/`} className={`cat-card theme-${c.theme}`} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <Cover src={c.cover} theme={c.theme} label="" />
                <span className="cat-card-vertical display">{c.name[locale]}</span>
                <div className="cat-card-body">
                  <span className="cat-card-count">
                    {posts.filter((p) => p.category === c.slug).length} {posts.filter((p) => p.category === c.slug).length === 1 ? s.post : s.posts}
                  </span>
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

      {/* QUOTE BANNER */}
      <section className="quote-band" data-reveal>
        <p className="spaced">{vi ? 'GHI LẠI MỌI KHOẢNH KHẮC' : 'CAPTURE EVERY MOMENT'}</p>
      </section>

      {/* LATEST */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <span className="section-label">
              <em>03</em> {s.latest}
            </span>
            <h2 className="display">
              {vi ? 'Mới' : 'Fresh'} <span className="text-accent">{vi ? 'nhất' : 'from the desk'}</span>
            </h2>
          </div>
          <div className="post-grid">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
