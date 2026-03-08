import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { getSession } from '@/lib/auth'
import CoursePageClient from '@/components/CoursePageClient'

export default async function CoursePage({ params }: { params: { id: string } }) {
    const { id } = await params

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            reviews: {
                include: { user: true, likes: true },
                orderBy: { createdAt: 'desc' }
            }
        }
    })

    if (!course) notFound()

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
            reviewsLocked={isLocked}
            avgRating={avgRating}
            session={session ? { userId: session.userId as string, email: session.email as string } : null}
        />
    )
}
