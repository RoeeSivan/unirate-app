'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { loginAction } from '@/lib/actions'

export default function LoginPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        const formData = new FormData(e.currentTarget)
        try {
            const res = await loginAction(formData)
            if (res?.error) {
                setError(res.error)
            } else {
                router.push('/')
                router.refresh()
            }
        } catch {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
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
                                placeholder="roee.sivan"
                                required
                            />
                            <span className="email-suffix">@post.runi.ac.il</span>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="auth-footer">
                    No account yet? <Link href="/register" className="text-primary-link">Create one</Link>
                </p>
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
        .auth-footer {
          margin-top: 2rem;
          text-align: center;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .text-primary-link {
          color: var(--primary);
          font-weight: 500;
        }
        .text-primary-link:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    )
}
