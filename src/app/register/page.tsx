'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { registerAction } from '@/lib/actions'

export default function RegisterPage() {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        try {
            const res = await registerAction(formData)
            if (res?.error) {
                setError(res.error)
            } else {
                router.push('/')
                router.refresh()
            }
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="auth-container animate-fade-in">
            <div className="card card-glass auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">Join with your @post.runi.ac.il email.</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">University Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="input"
                            placeholder="e.g. name@post.runi.ac.il"
                            required
                        />
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
                            minLength={6}
                        />
                    </div>
                    <button type="submit" className="btn-primary w-full" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link href="/login" className="text-primary-link">Sign In</Link>
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

        .w-full {
          width: 100%;
        }

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
          color: var(--primary-hover);
          text-decoration: underline;
        }
      `}</style>
        </div>
    )
}
