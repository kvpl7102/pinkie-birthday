import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAF1F3',
        color: '#2C1820',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '2.5rem',
          marginBottom: '12px',
          color: '#C24D6F',
        }}
      >
        404 — Không tìm thấy trang
      </h2>
      <p style={{ color: '#7A5C67', marginBottom: '24px' }}>
        Trang cậu tìm kiếm không tồn tại hoặc đã được chuyển đi.
      </p>
      <Link
        href="/"
        style={{
          padding: '10px 24px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #E76F8E 0%, #D65A7B 100%)',
          color: '#FFFFFF',
          textDecoration: 'none',
          fontWeight: 600,
        }}
      >
        Trở về trang chủ
      </Link>
    </main>
  )
}
