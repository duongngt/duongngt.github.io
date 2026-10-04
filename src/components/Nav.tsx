'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ui, type Locale } from '@/lib/i18n'
import { Icon } from './Icon'

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const s = ui[locale]
  const other: Locale = locale === 'vi' ? 'en' : 'vi'
  const switchHref = pathname.replace(/^\/(vi|en)/, `/${other}`)
  const home = `/${locale}/`
  const onBlog = pathname.includes('/blog')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const links = [
    { href: `${home}#about`, label: s.nav.about },
    { href: `${home}#services`, label: s.nav.services },
    { href: `${home}#work`, label: s.nav.work },
    { href: `${home}#experience`, label: s.nav.experience },
    { href: `/${locale}/blog/`, label: s.nav.blog, active: onBlog },
  ]

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner">
        <Link href={home} className="logo" aria-label={s.nav.home}>
          <Icon name="star" size={18} className="logo-star" />
          <span>Tuan Duong</span>
        </Link>
        <nav className="nav-links">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={l.active ? 'active' : ''}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href={switchHref} className="lang" hrefLang={other}>
            <Icon name="globe" size={16} /> {other.toUpperCase()}
          </Link>
          <Link href={`${home}#contact`} className="btn btn-sm">
            {s.hireMe}
          </Link>
          <button className="nav-toggle" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>
    </header>
  )
}
