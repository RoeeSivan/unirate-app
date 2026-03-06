'use client'

import { useLang } from './LanguageProvider'
import { t } from '@/lib/translations'

export default function VerifyEmailContent({ confirmAction }: { confirmAction: () => void }) {
    const { lang } = useLang()

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem' }}>
            <div style={{ textAlign: 'center', maxWidth: '400px' }}>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>{t('signInToUniRate', lang)}</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{t('completeSignInDesc', lang)}</p>
                <form action={confirmAction}>
                    <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem' }}>
                        {t('completeSignIn', lang)}
                    </button>
                </form>
            </div>
        </div>
    )
}
