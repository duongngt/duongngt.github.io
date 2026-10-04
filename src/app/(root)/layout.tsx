export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: '#1c1a20' }}>{children}</body>
    </html>
  )
}
