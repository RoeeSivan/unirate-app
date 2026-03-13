import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import CoursePageClient from '@/components/CoursePageClient'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params
    const course = await prisma.course.findUnique({
        where: { id },
        select: { title: true, titleHe: true, isMandatory: true, reviews: { select: { rating: true } } }
    })

    if (!course) return { title: 'Course Not Found' }

    const reviewCount = course.reviews.length
    const avgRating = reviewCount > 0
        ? (course.reviews.reduce((acc, r) => acc + r.rating, 0) / reviewCount).toFixed(1)
        : null

    const title = `${course.title} - Reviews | Uni-Rate`
    const ratingText = !course.isMandatory && avgRating ? ` ⭐ ${avgRating}/5` : ''
    const description = `${reviewCount} student review${reviewCount !== 1 ? 's' : ''} for ${course.title}${ratingText} at Reichman University. Real tips from your peers.`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://www.uni-rate.com/course/${id}`,
            siteName: 'uni-rate',
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    }
}

export default async function CoursePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            reviews: {
                include: { user: true, likes: true },
                orderBy: { createdAt: 'desc' }
            },
            prerequisites: {
                include: {
                    prerequisite: { select: { id: true, title: true, titleHe: true } }
                }
            }
        }
    })

    if (!course) notFound()

    // Format prerequisites for the client
    const prerequisites = course.prerequisites.map((p: any) => ({
        id: p.prerequisite.id,
        title: p.prerequisite.title,
        titleHe: p.prerequisite.titleHe,
        simultaneous: p.simultaneous,
    }))

    const session = await getSession()
    const sortedReviews = [...course.reviews].sort((a, b) => b.likes.length - a.likes.length)
    const avgRating = course.reviews.length > 0
        ? course.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / course.reviews.length
        : 0

    // Strip user info from anonymous reviews so it's not exposed to the browser
    const currentUserId = session?.userId as string | undefined
    const safeReviews = sortedReviews.map((review: any) => {
        if (review.isAnonymous) {
            const { user, userId, ...rest } = review
            // Preserve userId only for the review author so they can still edit/delete
            return { ...rest, userId: userId === currentUserId ? userId : null, user: { name: 'Anonymous' } }
        }
        return review
    })

    // For non-logged-in users on non-Year-1 courses, strip review content
    const isLocked = !session && course.year !== 1
    const clientReviews = isLocked
        ? safeReviews.map((review: any) => ({
            ...review,
            courseTip: review.courseTip ? '██████████████████████████' : null,
            testTip: review.testTip ? '██████████████████████████' : null,
        }))
        : safeReviews

    return (
        <CoursePageClient
            course={JSON.parse(JSON.stringify(course))}
            sortedReviews={JSON.parse(JSON.stringify(clientReviews))}
            prerequisites={JSON.parse(JSON.stringify(prerequisites))}
            reviewsLocked={isLocked}
            avgRating={avgRating}
            session={session ? { userId: session.userId as string, email: session.email as string, isAdmin: !!(process.env.ADMIN_EMAIL && session.email === process.env.ADMIN_EMAIL) } : null}
        />
    )
}
