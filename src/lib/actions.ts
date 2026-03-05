'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { encrypt, logout, getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
    const username = formData.get('username') as string

    if (!username) return { error: 'Please enter your username.' }

    const email = `${username}@post.runi.ac.il`

    let user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        user = await prisma.user.create({
            data: { email, name: username, emailVerified: true }
        })
    }

    const session = await encrypt({ userId: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set('session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 30 })

    return { success: true }
}

export async function logoutAction() {
    await logout()
    redirect('/')
}

export async function addReviewAction(formData: FormData) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    const courseId = formData.get('courseId') as string
    const ratingRaw = formData.get('rating')
    const rating = typeof ratingRaw === 'string' ? parseInt(ratingRaw, 10) : NaN
    const courseTip = (formData.get('courseTip') as string) || null
    const testTip = (formData.get('testTip') as string) || null

    if (!courseId || !rating || isNaN(rating)) {
        return { error: 'Missing or invalid required fields' }
    }

    try {
        await prisma.review.create({
            data: {
                userId: session.userId as string,
                courseId,
                rating,
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

    const ADMIN_EMAIL = 'roee.sivan@post.runi.ac.il'
    const isAdmin = session.email === ADMIN_EMAIL

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
