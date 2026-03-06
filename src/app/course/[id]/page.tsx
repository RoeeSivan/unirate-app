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

    return (
        <CoursePageClient
            course={JSON.parse(JSON.stringify(course))}
            sortedReviews={JSON.parse(JSON.stringify(sortedReviews))}
            avgRating={avgRating}
            session={session ? { userId: session.userId as string, email: session.email as string } : null}
        />
    )
}
