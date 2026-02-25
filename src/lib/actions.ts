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

    const courseId = formData.get('courseId') as string
    const rating = parseInt(formData.get('rating') as string, 10)
    const courseTip = formData.get('courseTip') as string || null
    const testTip = formData.get('testTip') as string || null

    if (!courseId || !rating) return { error: 'Missing required fields' }

    await prisma.review.create({
        data: {
            userId: session.userId as string,
            courseId,
            rating,
            courseTip,
            testTip
        }
    })

    return { success: true }
}
