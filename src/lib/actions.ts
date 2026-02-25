'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { encrypt, logout, getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function registerAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) return { error: 'Missing fields' }
    if (!email.endsWith('@post.runi.ac.il')) {
        return { error: 'Email must end with @post.runi.ac.il to register.' }
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return { error: 'Email already exists' }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: { email, passwordHash, name: email.split('@')[0] }
    })

    // Log in immediately
    const session = await encrypt({ userId: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set('session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
    return { success: true }
}

export async function loginAction(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) return { error: 'Missing fields' }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return { error: 'Invalid credentials' }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) return { error: 'Invalid credentials' }

    const session = await encrypt({ userId: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set('session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })
    return { success: true }
}

export async function logoutAction() {
    await logout()
    redirect('/')
}

export async function addReviewAction(formData: FormData) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    // extract and validate incoming data
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
        // bubble a descriptive message back so client doesn't fall into the generic catch
        return { error: 'Failed to save review, please try again later.' }
    }

    return { success: true }
}
// server-side action to delete a review; only the author may remove it
export async function deleteReviewAction(reviewId: string) {
    const session = await getSession()
    if (!session) return { error: 'Unauthorized' }

    if (!reviewId) return { error: 'Missing review id' }

    const review = await prisma.review.findUnique({ where: { id: reviewId } })
    if (!review) return { error: 'Review not found' }
    if (review.userId !== session.userId) return { error: 'Forbidden' }

    try {
        await prisma.review.delete({ where: { id: reviewId } })
    } catch (err) {
        console.error('Failed to delete review:', err)
        return { error: 'Failed to delete review, please try again later.' }
    }

    return { success: true }
}