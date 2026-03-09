import { prisma } from '@/lib/prisma'

export default async function sitemap() {
    const courses = await prisma.course.findMany({ select: { id: true } })

    const courseUrls = courses.map((course) => ({
        url: `https://www.uni-rate.com/course/${course.id}`,
        changeFrequency: 'weekly' as const,
    }))

    return [
        {
            url: 'https://www.uni-rate.com',
            changeFrequency: 'daily' as const,
        },
        ...courseUrls,
    ]
}
