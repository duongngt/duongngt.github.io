import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Anton, Be_Vietnam_Pro, Dancing_Script } from 'next/font/google'
import { isLocale, locales } from '@/lib/i18n'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { Gate } from '@/components/Gate'
import { gateScript } from '@/lib/gate-script'
import '../globals.css'
import '../mocks.css'

const body = Be_Vietnam_Pro({ subsets: ['latin', 'vietnamese'], weight: ['400', '500', '600', '700', '800'], variable: '--font-body' })
const display = Anton({ subsets: ['latin', 'vietnamese'], weight: '400', variable: '--font-display' })
const script = Dancing_Script({ subsets: ['latin', 'vietnamese'], weight: ['600', '700'], variable: '--font-script' })

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const vi = locale === 'vi'
  return {
    title: { default: 'Nguyễn Tuấn Dương — Front-end Engineer', template: '%s · Tuấn Dương' },
    description: vi
      ? 'Portfolio & blog của Nguyễn Tuấn Dương — Front-end Engineer tại Monstar Lab Vietnam.'
      : 'Portfolio & blog of Nguyen Tuan Duong — Front-end Engineer at Monstar Lab Vietnam.',
    metadataBase: new URL('https://duongngt.github.io'),
    alternates: { languages: { vi: '/vi/', en: '/en/' } },
    robots: { index: false, follow: false },
  }
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  return (
    <html lang={locale} suppressHydrationWarning className={`${body.variable} ${display.variable} ${script.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');" + gateScript }} />
      </head>
      <body>
        <Nav locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <Reveal />
        <Gate locale={locale} />
      </body>
    </html>
  )
}
