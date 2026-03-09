'use server'

import { prisma } from '@/lib/prisma'
import { logout, getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { sendVerificationEmail } from '@/lib/email'
import { randomBytes } from 'crypto'
import { headers } from 'next/headers'
import { rateLimit } from '@/lib/rate-limit'

function getClientIp(): string {
    try {
        const hdrs = headers()
        const forwarded = (hdrs as any).get?.('x-forwarded-for')
        if (forwarded) return forwarded.split(',')[0].trim()
    } catch {}
    return 'unknown'
}

export async function loginAction(formData: FormData) {
    const username = formData.get('username') as string

    if (!username) return { error: 'Please enter your username.' }

    // Only allow letters, numbers, dots, hyphens, underscores (valid email usernames)
    if (!/^[a-zA-Z0-9._-]+$/.test(username)) {
        return { error: 'Invalid username. Use only letters, numbers, dots, or hyphens.' }
    }

    // Rate limit: 5 login attempts per 15 minutes per IP
    const ip = getClientIp()
    const { success: allowed } = rateLimit(`login:${ip}`, { maxRequests: 5, windowMs: 15 * 60 * 1000 })
    if (!allowed) {
        return { error: 'Too many login attempts. Please try again in a few minutes.' }
    }

    const normalizedUsername = username.toLowerCase()
    const email = `${normalizedUsername}@post.runi.ac.il`
    const displayName = normalizedUsername
        .split(/[._-]/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ')

    try {
        let user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            user = await prisma.user.create({
                data: { email, name: displayName, emailVerified: false }
            })
        }

        const token = randomBytes(32).toString('hex')
        await prisma.user.update({
            where: { id: user.id },
            data: { verificationToken: token, name: displayName },
        })

        await sendVerificationEmail(email, token)

        return { sent: true }
    } catch (err) {
        console.error('loginAction error:', err)
        return { error: 'Something went wrong. Please try again.' }
    }
}

export async function logoutAction() {
    await logout()
    redirect('/')
}

export async function addReviewAction(formData: FormData) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    // Rate limit: 10 reviews per hour per user
    const { success: allowed } = rateLimit(`review:${session.userId}`, { maxRequests: 10, windowMs: 60 * 60 * 1000 })
    if (!allowed) {
        return { error: 'Too many reviews submitted. Please try again later.' }
    }

    const courseId = formData.get('courseId') as string
    const ratingRaw = formData.get('rating')
    const rating = typeof ratingRaw === 'string' ? parseInt(ratingRaw, 10) : 0
    const courseTip = (formData.get('courseTip') as string) || null
    const testTip = (formData.get('testTip') as string) || null
    const yearTakenRaw = formData.get('yearTaken')
    const yearTaken = yearTakenRaw ? parseInt(yearTakenRaw as string, 10) : null
    const isAnonymous = formData.get('isAnonymous') === 'true'

    if (!courseId || isNaN(rating)) {
        return { error: 'Missing or invalid required fields' }
    }

    try {
        await prisma.review.create({
            data: {
                userId: session.userId as string,
                courseId,
                rating,
                yearTaken,
                isAnonymous,
                courseTip,
                testTip,
            },
        })
    } catch (err) {
        console.error('Failed to create review:', err)
        return { error: 'Failed to save review, please try again later.' }
    }

    return { success: true }
}

export async function deleteReviewAction(reviewId: string) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    if (!reviewId) return { error: 'Missing review id' }

    const review = await prisma.review.findUnique({ where: { id: reviewId } })
    if (!review) return { error: 'Review not found' }

    const adminEmail = process.env.ADMIN_EMAIL
    const isAdmin = adminEmail ? session.email === adminEmail : false

    if (review.userId !== session.userId && !isAdmin) {
        return { error: 'Forbidden' }
    }

    try {
        await prisma.review.delete({ where: { id: reviewId } })
    } catch (err) {
        console.error('Failed to delete review:', err)
        return { error: 'Failed to delete review, please try again later.' }
    }

    return { success: true }
}

export async function editReviewAction(reviewId: string, formData: FormData) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    if (!reviewId) return { error: 'Missing review id' }

    const review = await prisma.review.findUnique({ where: { id: reviewId } })
    if (!review) return { error: 'Review not found' }

    if (review.userId !== session.userId) {
        return { error: 'Forbidden' }
    }

    const ratingRaw = formData.get('rating')
    const rating = typeof ratingRaw === 'string' ? parseInt(ratingRaw, 10) : review.rating
    const courseTip = (formData.get('courseTip') as string) || null
    const testTip = (formData.get('testTip') as string) || null
    const yearTakenRaw = formData.get('yearTaken')
    const yearTaken = yearTakenRaw ? parseInt(yearTakenRaw as string, 10) : null
    const isAnonymous = formData.get('isAnonymous') === 'true'

    try {
        await prisma.review.update({
            where: { id: reviewId },
            data: { rating, courseTip, testTip, yearTaken, isAnonymous },
        })
    } catch (err) {
        console.error('Failed to edit review:', err)
        return { error: 'Failed to update review.' }
    }

    return { success: true }
}

export async function toggleLikeAction(reviewId: string) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    // Rate limit: 60 likes per minute per user
    const { success: allowed } = rateLimit(`like:${session.userId}`, { maxRequests: 60, windowMs: 60 * 1000 })
    if (!allowed) {
        return { error: 'Too many requests. Please slow down.' }
    }

    const userId = session.userId as string

    try {
        const existing = await prisma.like.findUnique({
            where: { reviewId_userId: { reviewId, userId } }
        })

        if (existing) {
            await prisma.like.delete({ where: { id: existing.id } })
            return { liked: false }
        } else {
            await prisma.like.create({ data: { reviewId, userId } })
            return { liked: true }
        }
    } catch (err) {
        console.error('Failed to toggle like:', err)
        return { error: 'Failed to update like.' }
    }
}
