// Trang gốc "/": chuyển tới /vi/ hoặc /en/ theo ngôn ngữ trình duyệt.
const script = `location.replace((navigator.language || '').toLowerCase().startsWith('vi') ? '/vi/' : '/en/')`

export default function RootPage() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <noscript>
        <meta httpEquiv="refresh" content="0; url=/en/" />
      </noscript>
      <p style={{ color: '#ece8f0', fontFamily: 'sans-serif', padding: 24 }}>
        <a href="/en/" style={{ color: '#03e3e2' }}>English</a> · <a href="/vi/" style={{ color: '#03e3e2' }}>Tiếng Việt</a>
      </p>
    </>
  )
}
