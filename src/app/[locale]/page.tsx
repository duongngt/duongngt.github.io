import Link from 'next/link'
import { ui, type Locale } from '@/lib/i18n'
import { Icon } from '@/components/Icon'
import { WorkMock } from '@/components/WorkMock'
import {
  about,
  archive,
  education,
  experience,
  hero,
  languages,
  process,
  profile,
  services,
  skillGroups,
  stats,
  works,
} from '@/lib/profile'

const allSkills = skillGroups.flatMap((g) => g.items)

function SectionHead({ index, label, title, accent }: { index: string; label: string; title: string; accent?: string }) {
  return (
    <div className="section-head" data-reveal>
      <span className="section-label">
        <em>{index}</em> {label}
      </span>
      <h2 className="display">
        {title} {accent && <span className="text-accent">{accent}</span>}
      </h2>
    </div>
  )
}

function RotatingBadge({ id, text, className = '' }: { id: string; text: string; className?: string }) {
  return (
    <div className={`rotating-badge ${className}`} aria-hidden="true">
      <svg viewBox="0 0 120 120">
        <defs>
          <path id={id} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
        </defs>
        <text textLength="280" lengthAdjust="spacing">
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </svg>
      <Icon name="star" size={22} />
    </div>
  )
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const s = ui[locale]
  const vi = locale === 'vi'

  return (
    <>
      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-outline" aria-hidden="true">
          <span>PORTFOLIO</span>
          <span>PORTFOLIO</span>
          <span>PORTFOLIO</span>
        </div>
        <div className="container hero-grid">
          <div className="hero-text" data-reveal>
            <span className="pill">
              <span className="dot" /> {profile.role[locale]} · {profile.company}
            </span>
            <p className="hero-eyebrow">{hero.eyebrow[locale]}</p>
            <h1 className="hero-name display">
              <span>Nguyễn</span>
              <span className="text-coral">Tuấn Dương</span>
            </h1>
            <p className="hero-script">
              <span className="script">{hero.script[locale]}</span> <strong>{hero.tagline[locale]}</strong>
            </p>
            <p className="hero-intro">{hero.intro[locale]}</p>
            <div className="hero-actions">
              <Link href="#work" className="btn">
                {s.nav.work} <Icon name="arrow" size={18} />
              </Link>
              <Link href="#contact" className="btn btn-ghost">
                {s.hireMe}
              </Link>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <div className="hero-blob" />
            <div className="hero-arch">
              <img src={profile.avatar} alt={profile.name} />
            </div>
            <span className="float-chip chip-1">ReactJS</span>
            <span className="float-chip chip-2">Next.js</span>
            <span className="float-chip chip-3">Figma</span>
            <span className="float-chip chip-4">
              <Icon name="pin" size={14} /> {profile.location[locale]}
            </span>
            <Icon name="star" size={34} className="sparkle sparkle-1" />
            <Icon name="star" size={20} className="sparkle sparkle-2" />
            <RotatingBadge id="badge-hero" text={hero.badge[locale]} className="hero-badge" />
          </div>
        </div>

        <div className="container">
          <dl className="stats" data-reveal>
            {stats.map((st) => (
              <div key={st.value + st.label.en}>
                <dt className="display">{st.value}</dt>
                <dd>{st.label[locale]}</dd>
              </div>
            ))}
          </dl>
        </div>

      </section>

      {/* MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...allSkills, ...allSkills].map((sk, i) => (
            <span key={i}>
              {sk} <Icon name="star" size={16} />
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="container">
          <SectionHead index="01" label={s.nav.about} title={vi ? 'Về' : 'About'} accent={vi ? 'tôi' : 'me'} />
          <div className="about-grid">
            <div data-reveal>
              <p className="about-lead">{about.lead[locale]}</p>
              {about.paragraphs.map((p, i) => (
                <p key={i} className="muted about-p">
                  {p[locale]}
                </p>
              ))}
              <ul className="traits">
                {about.traits.map((tr) => (
                  <li key={tr.en}>{tr[locale]}</li>
                ))}
              </ul>
            </div>
            <aside className="info-card" data-reveal>
              <h3 className="display">{vi ? 'Thông tin' : 'Contact'}</h3>
              <ul>
                <li>
                  <Icon name="pin" size={18} /> {profile.location[locale]}
                </li>
                <li>
                  <Icon name="mail" size={18} /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </li>
                <li>
                  <Icon name="phone" size={18} /> <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
                </li>
                <li>
                  <Icon name="github" size={18} /> <a href={profile.github}>github.com/duongngt</a>
                </li>
              </ul>
              <h4>{vi ? 'Ngoại ngữ' : 'Languages'}</h4>
              <div className="lang-list">
                {languages.map((l) => (
                  <div key={l.name.en}>
                    <strong>{l.name[locale]}</strong>
                    <span>{l.level[locale]}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section section-alt" id="services">
        <div className="container">
          <SectionHead index="02" label={s.nav.services} title={vi ? 'Tôi' : 'What I'} accent={vi ? 'làm gì' : 'do'} />
          <div className="services">
            {services.map((sv, i) => (
              <article key={sv.icon} className="service" data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="service-num">0{i + 1}</span>
                <span className="service-icon">
                  <Icon name={sv.icon} size={28} />
                </span>
                <h3>{sv.title[locale]}</h3>
                <p className="muted">{sv.desc[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section" id="work">
        <div className="container">
          <SectionHead index="03" label={s.nav.work} title={vi ? 'Dự án' : 'Selected'} accent={vi ? 'tiêu biểu' : 'works'} />
          <p className="works-note muted" data-reveal>
            {vi
              ? '* Các dự án khách hàng được bảo mật (NDA) — hình ảnh dưới đây là giao diện minh hoạ.'
              : '* Client projects are under NDA — the visuals below are illustrative mockups.'}
          </p>
          <div className="works">
            {works.map((w, i) => (
              <article key={w.title} className={`work theme-${w.theme}`} data-reveal>
                <div className="browser">
                  <div className="browser-bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="browser-screen">
                    {w.image ? (
                      <img src={w.image} alt={w.title} loading="lazy" />
                    ) : (
                      w.mock && <WorkMock variant={w.mock} />
                    )}
                  </div>
                </div>
                <div className="work-info">
                  <span className="work-num">0{i + 1}</span>
                  <div>
                    <h3>{w.title}</h3>
                    <p className="work-type">{w.type[locale]}</p>
                    <p className="muted">{w.desc[locale]}</p>
                    <ul className="tags">
                      {w.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN ARCHIVE */}
      <section className="archive" aria-label="Design archive">
        <div className="container archive-head" data-reveal>
          <span className="script">{vi ? 'Kho thiết kế' : 'Design archive'}</span>
          <p className="muted">{vi ? 'Một số banner tôi đã thiết kế cho các trang thương mại điện tử.' : 'A few banners I designed for e-commerce websites.'}</p>
        </div>
        <div className="archive-strip">
          <div className="archive-track">
            {[...archive, ...archive].map((src, i) => (
              <img key={i} src={src} alt="" loading="lazy" />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <div className="container">
          <SectionHead index="04" label={s.nav.experience} title={vi ? 'Kinh nghiệm' : 'Experience'} accent={vi ? '& kỹ năng' : '& skills'} />
          <div className="exp-grid">
            <ol className="timeline">
              {experience.map((e) => (
                <li key={e.company} data-reveal>
                  <span className="timeline-dot">
                    <Icon name="star" size={14} />
                  </span>
                  <span className="timeline-period display">{e.period}</span>
                  <div>
                    <h3>{e.role[locale]}</h3>
                    <p className="timeline-company">{e.company}</p>
                    <ul>
                      {e.points.map((p) => (
                        <li key={p.en}>{p[locale]}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="exp-side">
              <div className="edu-card" data-reveal>
                <span className="section-label dark">{vi ? 'Học vấn' : 'Education'}</span>
                <p className="display edu-period">{education.period}</p>
                <h3>{education.school[locale]}</h3>
                <p>{education.major[locale]}</p>
              </div>
              <div className="skills-card" data-reveal>
                <span className="section-label">{vi ? 'Kỹ năng' : 'Skills'}</span>
                {skillGroups.map((g) => (
                  <div key={g.title.en} className="skill-group">
                    <h4>{g.title[locale]}</h4>
                    <ul className="tags">
                      {g.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section section-alt">
        <div className="container">
          <SectionHead index="05" label={vi ? 'Quy trình' : 'Process'} title={vi ? 'Cách tôi' : 'How I'} accent={vi ? 'làm việc' : 'work'} />
          <ol className="process">
            {process.map((p, i) => (
              <li key={p.title.en} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="process-num display">0{i + 1}</span>
                <h3>{p.title[locale]}</h3>
                <p className="muted">{p.desc[locale]}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT */}
      <section className="cta" id="contact">
        <div className="container cta-inner">
          <div data-reveal>
            <span className="script cta-script">{vi ? 'Cùng nhau' : "Let's create"}</span>
            <h2 className="display cta-title">
              {vi ? 'Tạo nên điều' : 'Something amazing'}
              <br />
              <span>{vi ? 'tuyệt vời' : 'together'}</span>
            </h2>
            <p className="cta-text">
              {vi
                ? 'Bạn có dự án, ý tưởng hay chỉ muốn trò chuyện? Hãy gửi cho tôi một lời nhắn.'
                : 'Have a project, an idea, or just want to chat? Drop me a message.'}
            </p>
          </div>
          <div className="cta-links" data-reveal>
            <a href={`mailto:${profile.email}`}>
              <Icon name="mail" /> {profile.email}
            </a>
            <a href={`tel:${profile.phoneHref}`}>
              <Icon name="phone" /> {profile.phone}
            </a>
            <a href={profile.github}>
              <Icon name="github" /> github.com/duongngt
            </a>
            <RotatingBadge id="badge-cta" text={vi ? 'XIN CHÀO · SAY HELLO · ' : 'SAY HELLO · XIN CHÀO · '} className="cta-badge" />
          </div>
        </div>
      </section>
    </>
  )
}
