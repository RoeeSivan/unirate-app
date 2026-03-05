import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default async function LoginPage() {
    const session = await getSession()
    if (session) redirect('/')
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    )
}
