import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

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

        const session = await encrypt({ userId: u.id, email: u.email })
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

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Sign in to Uni-Rate</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Click the button below to complete your sign-in.</p>
                <form action={confirm}>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        Complete Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
