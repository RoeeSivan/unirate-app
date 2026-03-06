'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Lang } from '@/lib/translations'

const LanguageContext = createContext<{
    lang: Lang
    setLang: (lang: Lang) => void
}>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>('en')

    useEffect(() => {
        const stored = localStorage.getItem('lang') as Lang | null
        if (stored === 'he' || stored === 'en') setLangState(stored)
    }, [])

    const setLang = (l: Lang) => {
        setLangState(l)
        localStorage.setItem('lang', l)
        document.documentElement.dir = l === 'he' ? 'rtl' : 'ltr'
        document.documentElement.lang = l
    }

    useEffect(() => {
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang
    }, [lang])

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLang() {
    return useContext(LanguageContext)
}
