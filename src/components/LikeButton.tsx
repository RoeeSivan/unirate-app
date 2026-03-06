'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toggleLikeAction } from '@/lib/actions'
import { ThumbsUp } from 'lucide-react'

export default function LikeButton({ reviewId, initialLiked, initialCount }: {
    reviewId: string
    initialLiked: boolean
    initialCount: number
}) {
    const router = useRouter()
    const [liked, setLiked] = useState(initialLiked)
    const [count, setCount] = useState(initialCount)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setLoading(true)
        const res = await toggleLikeAction(reviewId)
        if (res.liked !== undefined) {
            setLiked(res.liked)
            setCount(prev => res.liked ? prev + 1 : prev - 1)
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '999px',
                padding: '0.25rem 0.6rem',
                cursor: 'pointer',
                fontSize: '0.8rem',
                color: liked ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'all 0.2s',
            }}
        >
            <ThumbsUp size={14} style={{ fill: liked ? 'var(--primary)' : 'none' }} />
            {count > 0 && count}
        </button>
    )
}
