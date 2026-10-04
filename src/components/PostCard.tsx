import Link from 'next/link'
import { formatDate, monthYear, ui, type Locale } from '@/lib/i18n'
import { getCategory, type PostMeta } from '@/lib/blog'
import { Icon } from './Icon'

export function Cover({ src, theme, label, className = '' }: { src?: string; theme: string; label: string; className?: string }) {
  if (src) return <img className={`cover ${className}`} src={src} alt="" loading="lazy" />
  return (
    <div className={`cover cover-art theme-${theme} ${className}`} aria-hidden="true">
      <span>{label}</span>
    </div>
  )
}

export function PostCard({ post, locale, variant = 'card' }: { post: PostMeta; locale: Locale; variant?: 'card' | 'row' | 'feature' }) {
  const cat = getCategory(post.category)!
  const href = `/${locale}/blog/${post.slug}/`
  const s = ui[locale]

  if (variant === 'row') {
    return (
      <Link href={href} className="post-row" data-reveal>
        <time className="post-row-date">
          <strong>{new Date(post.date).getDate().toString().padStart(2, '0')}</strong>
          <span>{monthYear(post.date, locale)}</span>
        </time>
        <Cover src={post.cover} theme={cat.theme} label={cat.name[locale]} className="post-row-img" />
        <div className="post-row-body">
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span className="meta">
            <Icon name="clock" size={14} /> {post.readingTime} {s.minRead}
            {post.location && (
              <>
                <Icon name="pin" size={14} /> {post.location}
              </>
            )}
          </span>
        </div>
        <span className="post-row-arrow"><Icon name="arrow" /></span>
      </Link>
    )
  }

  return (
    <Link href={href} className={`post-card ${variant === 'feature' ? 'post-card-feature' : ''}`} data-reveal>
      <div className="post-card-media">
        <Cover src={post.cover} theme={cat.theme} label={cat.name[locale]} />
        <span className={`badge theme-${cat.theme}`}>{cat.name[locale]}</span>
        {post.location && (
          <span className="post-card-loc">
            <Icon name="pin" size={14} /> {post.location}
          </span>
        )}
      </div>
      <div className="post-card-body">
        <span className="meta">
          <Icon name="calendar" size={14} /> {formatDate(post.date, locale)} · {post.readingTime} {s.minRead}
        </span>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <span className="link-arrow">
          {s.readMore} <Icon name="arrow" size={16} />
        </span>
      </div>
    </Link>
  )
}
