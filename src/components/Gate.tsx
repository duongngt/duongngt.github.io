'use client'

import { useState } from 'react'
import { GATE_KEY, PASSWORD_HASH } from '@/lib/gate-script'
import type { Locale } from '@/lib/i18n'
import { Icon } from './Icon'

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const copy = {
  vi: { title: 'Trang đang riêng tư', desc: 'Nhập mật khẩu để xem portfolio.', placeholder: 'Mật khẩu', submit: 'Mở khoá', wrong: 'Sai mật khẩu, thử lại nhé.' },
  en: { title: 'This site is private', desc: 'Enter the password to view the portfolio.', placeholder: 'Password', submit: 'Unlock', wrong: 'Wrong password, please try again.' },
}

export function Gate({ locale }: { locale: Locale }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const t = copy[locale]

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const hash = await sha256(value)
    if (hash !== PASSWORD_HASH) {
      setError(true)
      return
    }
    try {
      localStorage.setItem(GATE_KEY, hash)
    } catch {}
    document.documentElement.classList.remove('locked')
  }

  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <form className="gate-card" onSubmit={onSubmit}>
        <span className="gate-icon">
          <Icon name="star" size={26} />
        </span>
        <h1 id="gate-title" className="display">{t.title}</h1>
        <p className="muted">{t.desc}</p>
        <input
          type="password"
          value={value}
          autoFocus
          autoComplete="current-password"
          placeholder={t.placeholder}
          aria-invalid={error}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
        />
        {error && <p className="gate-error">{t.wrong}</p>}
        <button type="submit" className="btn">
          {t.submit} <Icon name="arrow" size={18} />
        </button>
      </form>
    </div>
  )
}
