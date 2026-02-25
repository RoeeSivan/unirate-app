import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import AddReviewForm from '@/components/AddReviewForm'
import DeleteReviewButton from '@/components/DeleteReviewButton'
import { getSession } from '@/lib/auth'
import { Star } from 'lucide-react'

export default async function CoursePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            reviews: {
                include: { user: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })

    if (!course) notFound()

    const session = await getSession()
    const avgRating = course.reviews.length > 0
        ? course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
        : 0

    return (
        <div className="course-page animate-fade-in py-12" style={{ padding: '2rem 0' }}>
            <div className="course-header card card-glass" style={{ marginBottom: '2rem' }}>
                <div className="course-header-row" style={{ marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <h1 className="course-title" style={{ fontSize: '2.5rem', margin: 0 }}>{course.title}</h1>
                      {course.tags && course.tags.length > 0 && (
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', textTransform: 'uppercase', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                          {course.tags.join(', ')}
                        </span>
                      )}
                    </div>
                    {course.isMandatory && (
                        <span style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>Mandatory</span>
                    )}
                </div>
                <p className="text-muted text-lg mt-2">{course.description}</p>
                <div className="rating-badge" style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
                    <Star style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem', marginLeft: '0.5rem' }}>{avgRating.toFixed(1)}</span>
                    <span className="text-muted" style={{ marginLeft: '0.5rem' }}>({course.reviews.length} reviews)</span>
                </div>
            </div>

            <div className="grid-2cols">
                <div className="space-y-6" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {session && (
                        <div className="mobile-only" style={{ width: '100%', marginBottom: '1.5rem' }}>
                            <AddReviewForm courseId={course.id} />
                        </div>
                    )}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Reviews</h2>
                    {course.reviews.length === 0 ? (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>No reviews yet. Be the first!</div>
                    ) : (
                        course.reviews.map(review => (
                            <div key={review.id} className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star key={star} size={16} style={{ color: star <= review.rating ? "#fbbf24" : "var(--border)", fill: star <= review.rating ? "#fbbf24" : "none" }} />
                                            ))}
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{review.user.name}</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                        {session?.userId === review.userId && (
                                            <DeleteReviewButton reviewId={review.id} />
                                        )}
                                    </div>
                                </div>

                                {review.courseTip && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <h4 style={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'var(--primary)', marginBottom: '0.25rem' }}>Course Tip</h4>
                                        <p style={{ fontSize: '0.875rem', backgroundColor: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>{review.courseTip}</p>
                                    </div>
                                )}
                                {review.testTip && (
                                    <div style={{ marginTop: '1rem' }}>
                                        <h4 style={{ fontWeight: 'bold', fontSize: '0.875rem', color: '#a855f7', marginBottom: '0.25rem' }}>Test Tip</h4>
                                        <p style={{ fontSize: '0.875rem', backgroundColor: 'var(--bg-color)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>{review.testTip}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                <div className="sticky-sidebar">
                    <div>
                                <div className="desktop-only">
                            {session ? (
                                <AddReviewForm courseId={course.id} />
                            ) : (
                                <div className="card" style={{ textAlign: 'center' }}>
                                    <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Want to add a review?</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Sign in with your university email to share your experience.</p>
                                    <a href="/login" className="btn-primary" style={{ display: 'block', width: '100%', textAlign: 'center' }}>Sign In</a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
