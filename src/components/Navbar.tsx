'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLang } from './LanguageProvider'
import { t } from '@/lib/translations'
import { logoutAction } from '@/lib/actions'

export default function Navbar({ session }: { session: { email: string; name?: string } | null }) {
    const { lang } = useLang()

    const displayName = session?.name || session?.email.split('@')[0]

    return (
        <>
            <nav className="navbar container">
                <Link href="/" className="navbar-logo">
                    <span className="text-gradient">Uni-Rate.com</span>
                </Link>
                <div className="navbar-links" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <LanguageToggle />
                    <ThemeToggle />
                    {session ? (
                        <>
                            <span className="text-muted navbar-greeting-desktop">{t('hey', lang)}, {displayName}</span>
                            <form action={logoutAction}>
                                <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    {t('signOut', lang)}
                                </button>
                            </form>
                        </>
                    ) : (
                        <Link href="/login" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                            {t('signIn', lang)}
                        </Link>
                    )}
                </div>
            </nav>
            {session && (
                <div className="navbar-greeting-mobile container">
                    <span>{t('hey', lang)}, {displayName} 👋</span>
                </div>
            )}
        </>
    )
}
