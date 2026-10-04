import Link from 'next/link'
import { ui, type Locale } from '@/lib/i18n'
import { profile } from '@/lib/profile'
import { categories } from '@/lib/blog'
import { Icon } from './Icon'

export function Footer({ locale }: { locale: Locale }) {
  const s = ui[locale]
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link href={`/${locale}/`} className="logo">
            <Icon name="star" size={18} className="logo-star" />
            <span>Tuan Duong</span>
          </Link>
          <p className="muted">{s.footerNote}</p>
        </div>
        <div>
          <h4>{s.nav.blog}</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/${locale}/blog/category/${c.slug}/`}>{c.name[locale]}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>{s.nav.contact}</h4>
          <ul>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={`tel:${profile.phoneHref}`}>{profile.phone}</a></li>
            <li><a href={profile.github}>GitHub</a></li>
          </ul>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()} {profile.name}</p>
    </footer>
  )
}
