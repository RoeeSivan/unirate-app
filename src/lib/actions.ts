'use server'

import { prisma } from '@/lib/prisma'
import { logout, getSession } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'
import { randomBytes } from 'crypto'
import { redirect } from 'next/navigation'

export async function sendMagicLinkAction(formData: FormData) {
    const email = formData.get('email') as string

    if (!email) return { error: 'Please enter your email.' }
    if (!email.endsWith('@post.runi.ac.il')) {
        return { error: 'Only @post.runi.ac.il emails are allowed.' }
    }

    const token = randomBytes(32).toString('hex')

    // Upsert: create account if new, otherwise just refresh the token
    await prisma.user.upsert({
        where: { email },
        update: { verificationToken: token },
        create: {
            email,
            name: email.split('@')[0],
            verificationToken: token,
            emailVerified: false,
        },
    })

    await sendVerificationEmail(email, token)

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
