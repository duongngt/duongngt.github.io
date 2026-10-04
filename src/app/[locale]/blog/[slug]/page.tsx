import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate, locales, ui, type Locale } from '@/lib/i18n'
import { getAllPosts, getCategory, getPost, getPostSlugs } from '@/lib/blog'
import { Cover, PostCard } from '@/components/PostCard'
import { Icon } from '@/components/Icon'

type Params = { locale: Locale; slug: string }

export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) => getPostSlugs().map((slug) => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(slug, locale)
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.cover ? [post.cover] : undefined },
  }
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  const s = ui[locale]
  const post = await getPost(slug, locale)
  const cat = getCategory(post.category)!
  const all = getAllPosts(locale)
  const index = all.findIndex((p) => p.slug === slug)
  const newer = all[index - 1]
  const older = all[index + 1]
  const related = all.filter((p) => p.category === post.category && p.slug !== slug).slice(0, 3)

  return (
    <article>
      <header className="post-hero">
        <div className="post-hero-media">
          <Cover src={post.cover} theme={cat.theme} label={cat.name[locale]} />
        </div>
        <div className="container post-hero-inner" data-reveal>
          <nav className="crumbs">
            <Link href={`/${locale}/blog/`}>Blog</Link> <span>/</span>
            <Link href={`/${locale}/blog/category/${cat.slug}/`}>{cat.name[locale]}</Link>
          </nav>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="meta post-meta">
            <span><Icon name="calendar" size={16} /> {formatDate(post.date, locale)}</span>
            <span><Icon name="clock" size={16} /> {post.readingTime} {s.minRead}</span>
            {post.location && <span><Icon name="pin" size={16} /> {post.location}</span>}
          </div>
        </div>
      </header>

      <div className="container post-layout">
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.headings.length > 0 && (
          <aside className="toc">
            <p className="section-label">{s.onThisPage}</p>
            <ol>
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`}>{h.text}</a>
                </li>
              ))}
            </ol>
            <Link href={`/${locale}/blog/`} className="link-arrow back">
              <Icon name="arrowLeft" size={16} /> {s.backToBlog}
            </Link>
          </aside>
        )}
      </div>

      <nav className="container pager">
        {older ? (
          <Link href={`/${locale}/blog/${older.slug}/`}>
            <span>← {s.prev}</span>
            <strong>{older.title}</strong>
          </Link>
        ) : <span />}
        {newer && (
          <Link href={`/${locale}/blog/${newer.slug}/`} className="next">
            <span>{s.next} →</span>
            <strong>{newer.title}</strong>
          </Link>
        )}
      </nav>

      {related.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-head" data-reveal>
              <span className="section-label">
                <em>✦</em> {s.relatedPosts}
              </span>
            </div>
            <div className="post-grid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
