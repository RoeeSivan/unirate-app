'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addReviewAction } from '@/lib/actions'
import { Star } from 'lucide-react'

export default function AddReviewForm({ courseId }: { courseId: string }) {
    const router = useRouter()
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (rating === 0) {
            setError('Please select a rating')
            return
        }

        setLoading(true)
        setError('')

        const formData = new FormData(e.currentTarget)
        formData.append('courseId', courseId)
        formData.append('rating', rating.toString())

        try {
            const res = await addReviewAction(formData)
            if (res?.error) {
                setError(res.error)
            } else {
                setRating(0)
                e.currentTarget.reset()
                router.refresh()
            }
        } catch (err) {
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card card-glass">
            <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>Add Your Rating</h3>

            {error && (
                <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Overall Rating</label>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                            >
                                <Star
                                    size={28}
                                    style={{
                                        color: star <= (hoverRating || rating) ? "#fbbf24" : "var(--border)",
                                        fill: star <= (hoverRating || rating) ? "#fbbf24" : "none",
                                        transition: 'all 0.2s'
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="courseTip" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Course Tip (Optional)</label>
                    <textarea
                        id="courseTip"
                        name="courseTip"
                        className="input"
                        placeholder="What should students know about the lectures, assignments, etc.?"
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div>
                    <label htmlFor="testTip" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Test Tip (Optional)</label>
                    <textarea
                        id="testTip"
                        name="testTip"
                        className="input"
                        placeholder="How should someone study for the exams?"
                        rows={2}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <button type="submit" className="btn-primary w-full" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Submitting...' : 'Submit Rating'}
                </button>
            </form>
        </div>
    )
}
