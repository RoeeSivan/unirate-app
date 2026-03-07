import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import VerifyEmailContent from '@/components/VerifyEmailContent'

export default async function VerifyEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>
}) {
    const { token } = await searchParams

    if (!token) redirect('/login?error=invalid')

    const user = await prisma.user.findUnique({ where: { verificationToken: token } })

    if (!user) redirect('/login?error=invalid')

    async function confirm() {
        'use server'
        const u = await prisma.user.findUnique({ where: { verificationToken: token } })
        if (!u) redirect('/login?error=invalid')

        await prisma.user.update({
            where: { id: u.id },
            data: { emailVerified: true, verificationToken: null },
        })

        const session = await encrypt({ userId: u.id, email: u.email, name: u.name })
        const cookieStore = await cookies()
        cookieStore.set('session', session, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
        })

        redirect('/')
    }

    return <VerifyEmailContent confirmAction={confirm} />
}
