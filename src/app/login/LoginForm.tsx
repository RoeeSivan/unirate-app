'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAction } from '@/lib/actions'

export default function LoginForm() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    // Poll for session after magic link is clicked
    useEffect(() => {
        if (!sent) return
        const interval = setInterval(async () => {
            const res = await fetch('/api/auth/check')
            const data = await res.json()
            if (data.loggedIn) {
                clearInterval(interval)
                router.push('/')
                router.refresh()
            }
        }, 2000)
        return () => clearInterval(interval)
    }, [sent, router])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        try {
            const res = await loginAction(formData)
            if (res?.error) {
                setError(res.error)
            } else if (res?.sent) {
                setSent(true)
            }
        } catch {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="auth-container animate-fade-in">
                <div className="card card-glass auth-card" style={{ textAlign: 'center' }}>
                    <h1 className="auth-title">Check your inbox</h1>
                    <p className="auth-subtitle">We sent a sign-in link to your Reichman email. Click it and you'll be signed in automatically, in the meantime, close this tab.</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem' }}>Waiting for verification...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="auth-container animate-fade-in">
            <div className="card card-glass auth-card">
                <h1 className="auth-title">Sign In</h1>
                <p className="auth-subtitle">Use your Reichman university account.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <div className="email-input-row">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="input"
                                placeholder="firstname.lastname"
                                required
                            />
                            <span className="email-suffix">@post.runi.ac.il</span>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Sending link...' : 'Sign In'}
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
        .email-input-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .email-input-row .input {
          flex: 1;
          min-width: 0;
        }
        .email-suffix {
          font-size: 0.875rem;
          color: var(--text-muted);
          white-space: nowrap;
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
