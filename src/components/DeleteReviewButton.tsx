'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { deleteReviewAction } from '@/lib/actions'

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = async () => {
        if (loading) return
        setLoading(true)
        setError('')

        try {
            const res = await deleteReviewAction(reviewId)
            if (res?.error) {
                setError(res.error)
            } else {
                router.refresh()
            }
        } catch (err) {
            console.error('delete review caught', err)
            setError('An unexpected error occurred.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div style={{ display: 'inline-block' }}>
            {error && (
                <div style={{ color: '#dc2626', fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    {error}
                </div>
            )}
            <button
                onClick={handleDelete}
                disabled={loading}
                className="btn-outline"
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            >
                {loading ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    )
}
