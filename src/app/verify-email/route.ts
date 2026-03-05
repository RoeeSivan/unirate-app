import { prisma } from '@/lib/prisma'
import { encrypt } from '@/lib/auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get('token')

    if (!token) {
        return NextResponse.redirect(new URL('/login?error=invalid', request.url))
    }

    const user = await prisma.user.findUnique({ where: { verificationToken: token } })

    if (!user) {
        return NextResponse.redirect(new URL('/login?error=invalid', request.url))
    }

    // Mark verified and clear the token
    await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: true, verificationToken: null },
    })

    // Set session cookie and redirect home
    const session = await encrypt({ userId: user.id, email: user.email })
    const cookieStore = await cookies()
    cookieStore.set('session', session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/' })

    return NextResponse.redirect(new URL('/', request.url))
}
