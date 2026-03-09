import { prisma } from '@/lib/prisma'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute['Sitemap']> {
    const courses = await prisma.course.findMany({ select: { id: true } })

    const courseUrls = courses.map((course) => ({
        url: `https://www.uni-rate.com/course/${course.id}`,
        changeFrequency: 'weekly' as const,
    }))

    return [
        {
            url: 'https://www.uni-rate.com',
            changeFrequency: 'daily',
        },
        ...courseUrls,
    ]
}
