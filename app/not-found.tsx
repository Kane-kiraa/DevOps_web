import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: 64, margin: 0 }}>404</h1>
      <p style={{ marginTop: 16, fontSize: 18 }}>Sorry — the page you are looking for was not found.</p>
      <Link href="/" style={{ marginTop: 24, color: '#2563eb', textDecoration: 'underline' }}>Go back home</Link>
    </main>
  )
}
