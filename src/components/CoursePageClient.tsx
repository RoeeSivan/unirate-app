'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Star, Link2, Check } from 'lucide-react'
import AddReviewForm from './AddReviewForm'
import DeleteReviewButton from './DeleteReviewButton'
import LikeButton from './LikeButton'
import { useLang } from './LanguageProvider'
import { t } from '@/lib/translations'
import { editReviewAction } from '@/lib/actions'

interface Prerequisite {
    id: string
    title: string
    titleHe: string | null
    simultaneous: boolean
}

interface CoursePageClientProps {
    course: any
    sortedReviews: any[]
    prerequisites: Prerequisite[]
    avgRating: number
    session: { userId: string; email: string; isAdmin?: boolean } | null
    reviewsLocked?: boolean
}

function EditReviewForm({ review, isMandatory, lang, onCancel, onSaved }: {
    review: any; isMandatory: boolean; lang: 'en' | 'he'; onCancel: () => void; onSaved: () => void;
}) {
    const isRtl = lang === 'he'
    const [rating, setRating] = useState(review.rating || 0)
    const [hoverRating, setHoverRating] = useState(0)
    const [courseTip, setCourseTip] = useState(review.courseTip || '')
    const [testTip, setTestTip] = useState(review.testTip || '')
    const [yearTaken, setYearTaken] = useState(review.yearTaken?.toString() || '')
    const [anonymous, setAnonymous] = useState(review.isAnonymous || false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        const formData = new FormData()
        formData.append('rating', rating.toString())
        formData.append('courseTip', courseTip)
        formData.append('testTip', testTip)
        formData.append('yearTaken', yearTaken)
        formData.append('isAnonymous', anonymous.toString())

        const res = await editReviewAction(review.id, formData)
        setLoading(false)

        if (res?.error) {
            setError(res.error)
            return
        }
        onSaved()
    }

    return (
        <form onSubmit={handleSubmit} dir={isRtl ? 'rtl' : 'ltr'} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {error && (
                <div style={{ backgroundColor: 'white', color: '#ef4444', padding: '0.75rem', borderRadius: '8px', fontSize: '0.875rem', border: '1px solid #ef4444' }}>
                    {error}
                </div>
            )}

            {!isMandatory && (
                <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{t('overallRating', lang)}</label>
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
                                <Star size={24} style={{
                                    color: star <= (hoverRating || rating) ? "#fbbf24" : "var(--border)",
                                    fill: star <= (hoverRating || rating) ? "#fbbf24" : "none",
                                    transition: 'all 0.2s'
                                }} />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{t('courseTipOptional', lang)}</label>
                <textarea
                    dir={isRtl ? 'rtl' : 'ltr'}
                    className="input"
                    placeholder={t('courseTipPlaceholder', lang)}
                    rows={3}
                    value={courseTip}
                    onChange={e => setCourseTip(e.target.value)}
                    style={{ resize: 'vertical' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{t('testTipOptional', lang)}</label>
                <textarea
                    dir={isRtl ? 'rtl' : 'ltr'}
                    className="input"
                    placeholder={t('testTipPlaceholder', lang)}
                    rows={2}
                    value={testTip}
                    onChange={e => setTestTip(e.target.value)}
                    style={{ resize: 'vertical' }}
                />
            </div>

            <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{t('yearTaken', lang)}</label>
                <select className="input" value={yearTaken} onChange={e => setYearTaken(e.target.value)} style={{ cursor: 'pointer' }}>
                    <option value="">{t('selectYear', lang)}</option>
                    {[2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026].map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} style={{ width: '1rem', height: '1rem', cursor: 'pointer' }} />
                {t('postAnonymously', lang)}
            </label>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="submit" className="btn-primary" disabled={loading} style={{ flex: 1 }}>
                    {loading ? t('saving', lang) : t('saveEdit', lang)}
                </button>
                <button type="button" className="btn-outline" onClick={onCancel} style={{ flex: 1 }}>
                    {t('cancelEdit', lang)}
                </button>
            </div>
        </form>
    )
}

export default function CoursePageClient({ course, sortedReviews, prerequisites, avgRating, session, reviewsLocked }: CoursePageClientProps) {
    const { lang } = useLang()
    const router = useRouter()
    const [editingId, setEditingId] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const courseTitle = (lang === 'he' && course.titleHe) ? course.titleHe : course.title
    const courseDesc = (lang === 'he' && course.descriptionHe) ? course.descriptionHe : course.description

    return (
        <div className="course-page animate-fade-in py-12" style={{ padding: '2rem 0' }}>
            <div className="course-header card card-glass" style={{ marginBottom: '2rem' }}>
                <div className="course-header-row" style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <h1 className="course-title" style={{ fontSize: '2.5rem', margin: 0 }}>{courseTitle}</h1>
                        {course.tags && course.tags.length > 0 && (
                            <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                {course.tags.join(', ')}
                            </span>
                        )}
                    </div>
                    {course.isMandatory && (
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{t('mandatory', lang)}</span>
                    )}
                </div>
                <p dir="auto" className="text-muted text-lg mt-2">{courseDesc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
                    {course.courseNumber && (
                        <span style={{
                            fontSize: '0.8rem', fontWeight: 500,
                            backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)',
                            padding: '0.25rem 0.625rem', borderRadius: '6px',
                        }}>
                            {t('courseNumber', lang)}: {course.courseNumber}
                        </span>
                    )}
                    {course.finalAssignment && (
                        <span style={{
                            fontSize: '0.8rem', fontWeight: 500,
                            backgroundColor: course.finalAssignment === 'exam' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                            color: course.finalAssignment === 'exam' ? '#ef4444' : '#16a34a',
                            border: `1px solid ${course.finalAssignment === 'exam' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)'}`,
                            padding: '0.25rem 0.625rem', borderRadius: '6px',
                        }}>
                            {t('finalAssignment', lang)}: {course.finalAssignment === 'exam' ? t('finalExam', lang) : t('finalPaper', lang)}
                        </span>
                    )}
                    <span style={{
                        fontSize: '0.8rem', fontWeight: 500,
                        backgroundColor: 'rgba(59, 130, 246, 0.08)',
                        color: '#3b82f6',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                        padding: '0.25rem 0.625rem', borderRadius: '6px',
                    }}>
                        {t('language', lang)}: {course.isMandatory
                            ? t('langHebrewAndEnglish', lang)
                            : course.tags?.includes('E')
                                ? t('langEnglish', lang)
                                : t('langHebrew', lang)}
                    </span>
                    {course.tags?.includes('Entrepreneurship') && (
                        <span style={{
                            fontSize: '0.8rem', fontWeight: 500,
                            backgroundColor: 'rgba(245, 158, 11, 0.08)',
                            color: '#d97706',
                            border: '1px solid rgba(245, 158, 11, 0.2)',
                            padding: '0.25rem 0.625rem', borderRadius: '6px',
                        }}>
                            {t('entrepreneurshipMandatory', lang)}
                        </span>
                    )}
                </div>
                {!course.isMandatory && (
                    <div className="rating-badge" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                        <Star style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                        <span style={{ fontWeight: 'bold', fontSize: '1.25rem', marginLeft: '0.5rem' }}>{avgRating.toFixed(1)}</span>
                        <span className="text-muted" style={{ marginLeft: '0.5rem' }}>({course.reviews.length} {t('reviews', lang)})</span>
                    </div>
                )}
                {prerequisites.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                            {t('prerequisites', lang)}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {prerequisites.map((p) => (
                                <a
                                    key={p.id}
                                    href={`/course/${p.id}`}
                                    style={{
                                        fontSize: '0.8rem', fontWeight: 500,
                                        backgroundColor: 'rgba(99, 102, 241, 0.08)',
                                        color: 'var(--primary)',
                                        border: '1px solid rgba(99, 102, 241, 0.2)',
                                        padding: '0.25rem 0.625rem', borderRadius: '6px',
                                        textDecoration: 'none',
                                        transition: 'background-color 0.2s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.15)')}
                                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(99, 102, 241, 0.08)')}
                                >
                                    {(lang === 'he' && p.titleHe) ? p.titleHe : p.title}
                                    {p.simultaneous && ` (${t('simultaneous', lang)})`}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <a
                        href={`https://wa.me/?text=${encodeURIComponent(`Hey, check out the reviews for "${courseTitle}" on uni-rate!\n${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#25D366',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {t('shareWhatsApp', lang)}
                    </a>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/course/${course.id}`)
                            setCopied(true)
                            setTimeout(() => setCopied(false), 2000)
                        }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: copied ? '#16a34a' : 'var(--surface-hover)',
                            color: copied ? '#fff' : 'var(--text)',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            border: copied ? 'none' : '1px solid var(--border)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                    >
                        {copied ? <Check size={16} /> : <Link2 size={16} />}
                        {copied ? t('copied', lang) : t('copyLink', lang)}
                    </button>
                </div>
            </div>

            <div className="grid-2cols">
                <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {session && (
                        <div className="mobile-only" style={{ width: '100%', marginBottom: '1.5rem' }}>
                            <AddReviewForm courseId={course.id} isMandatory={course.isMandatory} />
                        </div>
                    )}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{t('reviewsTitle', lang)}</h2>
                    {reviewsLocked && sortedReviews.length > 0 && (
                        <div className="card" style={{ textAlign: 'center', padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(99, 102, 241, 0.1))', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('reviewsLockedTitle', lang)}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{t('reviewsLockedDesc', lang)}</p>
                            <a href="/login" className="btn-primary" style={{ display: 'inline-block', padding: '0.5rem 1.5rem' }}>{t('signIn', lang)}</a>
                        </div>
                    )}
                    {sortedReviews.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>{t('noReviewsYet', lang)}</div>
                    ) : (
                        sortedReviews.map((review: any) => (
                            <div key={review.id} className="card" style={reviewsLocked ? { filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none' } : undefined}>
                                {editingId === review.id ? (
                                    <EditReviewForm
                                        review={review}
                                        isMandatory={course.isMandatory}
                                        lang={lang}
                                        onCancel={() => setEditingId(null)}
                                        onSaved={() => { setEditingId(null); router.refresh(); }}
                                    />
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                            <div>
                                                {!course.isMandatory && (
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        {[1, 2, 3, 4, 5].map((star: number) => (
                                                            <Star key={star} size={16} style={{ color: star <= review.rating ? "#fbbf24" : "var(--border)", fill: star <= review.rating ? "#fbbf24" : "none" }} />
                                                        ))}
                                                    </div>
                                                )}
                                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                    {review.isAnonymous ? t('anonymous', lang) : review.user.name}
                                                    {review.yearTaken && <span style={{ marginLeft: '0.5rem', opacity: 0.7 }}>({review.yearTaken})</span>}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                {session?.userId === review.userId && (
                                                    <button
                                                        onClick={() => setEditingId(review.id)}
                                                        className="btn-outline"
                                                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                                                    >
                                                        {t('edit', lang)}
                                                    </button>
                                                )}
                                                {(
                                                    session?.userId === review.userId ||
                                                    session?.isAdmin
                                                ) && (
                                                    <DeleteReviewButton reviewId={review.id} />
                                                )}
                                            </div>
                                        </div>

                                        {review.courseTip && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <h4 style={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>{t('courseTip', lang)}</h4>
                                                <p dir="auto" style={{ fontSize: '0.875rem', backgroundColor: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>{review.courseTip}</p>
                                            </div>
                                        )}
                                        {review.testTip && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <h4 style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#a855f7', marginBottom: '0.25rem' }}>{t('testTip', lang)}</h4>
                                                <p dir="auto" style={{ fontSize: '0.875rem', backgroundColor: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>{review.testTip}</p>
                                            </div>
                                        )}
                                        {session && (
                                            <div style={{ marginTop: '0.75rem' }}>
                                                <LikeButton
                                                    reviewId={review.id}
                                                    initialLiked={review.likes.some((l: any) => l.userId === session.userId)}
                                                    initialCount={review.likes.length}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="sticky-sidebar">
                    <div>
                        <div className="desktop-only">
                            {session ? (
                                <AddReviewForm courseId={course.id} isMandatory={course.isMandatory} />
                            ) : (
                                <div className="card" style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{t('wantToAddReview', lang)}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{t('signInToReview', lang)}</p>
                                    <a href="/login" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center' }}>{t('signIn', lang)}</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
