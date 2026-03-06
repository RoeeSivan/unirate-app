'use client'

import { useLang } from './LanguageProvider'

export default function LanguageToggle() {
    const { lang, setLang } = useLang()

    return (
        <div style={{ display: 'flex', borderRadius: '999px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <button
                onClick={() => setLang('en')}
                style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: lang === 'en' ? 'var(--primary)' : 'transparent',
                    color: lang === 'en' ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                }}
            >
                En
            </button>
            <button
                onClick={() => setLang('he')}
                style={{
                    padding: '0.25rem 0.6rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    background: lang === 'he' ? 'var(--primary)' : 'transparent',
                    color: lang === 'he' ? 'white' : 'var(--text-muted)',
                    transition: 'all 0.2s',
                }}
            >
                He
            </button>
        </div>
    )
}
