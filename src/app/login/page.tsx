'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { sendMagicLinkAction } from '@/lib/actions'

export default function LoginPage() {
    const searchParams = useSearchParams()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState('')

    useEffect(() => {
        if (searchParams.get('error') === 'invalid') {
            setError('This sign-in link is invalid or has already been used. Please request a new one.')
        }
    }, [searchParams])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        try {
            const res = await sendMagicLinkAction(formData)
            if (res?.error) {
                setError(res.error)
            } else {
                setSubmittedEmail(email)
                setEmailSent(true)
            }
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    if (emailSent) {
        return (
            <div className="auth-container animate-fade-in">
                <div className="card card-glass auth-card" style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📬</div>
                    <h1 className="auth-title">Check Your Inbox</h1>
                    <p className="auth-subtitle">
                        We sent a sign-in link to<br />
                        <strong>{submittedEmail}</strong>
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '1rem' }}>
                        Open your Reichman email and click the link to sign in. It expires in 24 hours.
                    </p>
                    <button
                        onClick={() => { setEmailSent(false); setSubmittedEmail('') }}
                        style={{ marginTop: '2rem', background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
                    >
                        Use a different email
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container animate-fade-in">
            <div className="card card-glass auth-card">
                <h1 className="auth-title">Sign In</h1>
                <p className="auth-subtitle">Enter your Reichman email and we'll send you a sign-in link.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">University Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            placeholder="name@post.runi.ac.il"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Sending link...' : 'Send Sign-In Link'}
                    </button>
                </form>
            </div>

            <style>{`
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: calc(100vh - 200px);
          padding: 2rem;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem 2rem;
        }

        .auth-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .auth-subtitle {
          color: var(--text-muted);
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          color: var(--text-muted);
        }

        .w-full { width: 100%; }

        .error-message {
          background-color: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
      `}</style>
        </div>
    )
}
