// Giao diện minh hoạ cho các dự án (dự án thật được bảo mật).
export type MockVariant = 'corporate' | 'dashboard' | 'chat'

function Corporate() {
  return (
    <div className="m-corp">
      <div className="m-corp-nav">
        <b>NOVA<i>.</i></b>
        <span>Solutions</span>
        <span>Industries</span>
        <span>About</span>
        <span>Careers</span>
        <em>Contact</em>
      </div>
      <div className="m-corp-hero">
        <div>
          <small>DIGITAL TRANSFORMATION</small>
          <h4>Building the future of business</h4>
          <p>Strategy, design and technology for companies across Asia.</p>
          <div className="m-corp-btns">
            <em>Get started</em>
            <span>Our work →</span>
          </div>
        </div>
        <div className="m-corp-art">
          <i className="c1" />
          <i className="c2" />
          <i className="c3" />
          <div className="m-corp-stat">
            <b>120+</b>
            <span>Global clients</span>
          </div>
        </div>
      </div>
      <div className="m-corp-features">
        {['Consulting', 'Engineering', 'Design'].map((t) => (
          <div key={t}>
            <i />
            <b>{t}</b>
            <span />
          </div>
        ))}
      </div>
    </div>
  )
}

function Dashboard() {
  const bars = [42, 64, 38, 80, 56, 92, 70, 60, 86, 48, 74, 95]
  return (
    <div className="m-dash">
      <aside>
        <b>◆ Admin</b>
        {['Overview', 'Orders', 'Customers', 'Products', 'Reports', 'Settings'].map((t, i) => (
          <span key={t} className={i === 0 ? 'on' : ''}>
            {t}
          </span>
        ))}
      </aside>
      <div className="m-dash-main">
        <div className="m-dash-top">
          <span className="m-search">Search…</span>
          <i className="m-avatar" />
        </div>
        <div className="m-kpis">
          {[
            ['Revenue', '$84.2k', '+12%'],
            ['Orders', '1,284', '+8%'],
            ['Users', '9,610', '+21%'],
            ['Refunds', '0.8%', '-3%'],
          ].map(([l, v, d]) => (
            <div key={l}>
              <span>{l}</span>
              <b>{v}</b>
              <em className={d.startsWith('-') ? 'down' : ''}>{d}</em>
            </div>
          ))}
        </div>
        <div className="m-charts">
          <div className="m-bars">
            <span className="m-label">Monthly sales</span>
            <div>
              {bars.map((h, i) => (
                <i key={i} style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
          <div className="m-donut">
            <span className="m-label">Traffic</span>
            <svg viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="6" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--theme)" strokeWidth="6" strokeDasharray="58 42" strokeDashoffset="25" />
              <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--accent)" strokeWidth="6" strokeDasharray="26 74" strokeDashoffset="67" />
            </svg>
          </div>
        </div>
        <div className="m-table">
          {['#1042  Completed', '#1041  Pending', '#1040  Completed'].map((r) => (
            <div key={r}>
              <span>{r.split('  ')[0]}</span>
              <i />
              <em className={r.includes('Pending') ? 'pending' : ''}>{r.split('  ')[1]}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Chat() {
  return (
    <div className="m-chat">
      <aside>
        <em>+ New chat</em>
        {['Refactor React hooks', 'Write unit tests', 'Explain this regex', 'SEO checklist'].map((t, i) => (
          <span key={t} className={i === 0 ? 'on' : ''}>
            {t}
          </span>
        ))}
      </aside>
      <div className="m-chat-main">
        <div className="m-msg user">How can I simplify this useEffect?</div>
        <div className="m-msg ai">
          <i className="m-bot">✦</i>
          <div>
            <p>You can derive the value directly instead of syncing state:</p>
            <pre>
              <span className="k">const</span> total = useMemo(() =&gt;{'\n'}  items.reduce((s, i) =&gt; s + i.price, 0),{'\n'}  [items])
            </pre>
            <p>This removes an extra render. ✔</p>
          </div>
        </div>
        <div className="m-msg ai typing">
          <i className="m-bot">✦</i>
          <span className="dots">
            <i />
            <i />
            <i />
          </span>
        </div>
        <div className="m-input">
          <span>Ask anything…</span>
          <em>↑</em>
        </div>
      </div>
    </div>
  )
}

export function WorkMock({ variant }: { variant: MockVariant }) {
  return (
    <div className="mock-ui" aria-hidden="true">
      {variant === 'corporate' && <Corporate />}
      {variant === 'dashboard' && <Dashboard />}
      {variant === 'chat' && <Chat />}
    </div>
  )
}
