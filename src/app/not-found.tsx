import Link from 'next/link'

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem',
        }}>
            <h1 style={{
                fontSize: '6rem',
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: '0.5rem',
            }}>
                <span className="text-gradient">404</span>
            </h1>
            <p style={{
                fontSize: '1.25rem',
                color: 'var(--text-muted)',
                marginBottom: '2rem',
            }}>
                This page doesn't exist.
            </p>
            <Link
                href="/"
                className="btn-primary"
                style={{ padding: '0.625rem 1.5rem', fontSize: '0.925rem' }}
            >
                Back to Home
            </Link>
        </div>
    )
}
