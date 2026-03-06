'use client'

import { BookOpen, Star, MessageSquare } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { t } from '@/lib/translations'

export function HeroSection() {
    const { lang } = useLang()

    return (
        <header className="hero">
            <h1 className="hero-title">
                {t('heroTitle1', lang)}<span className="text-gradient">{t('heroTitleHighlight', lang)}</span>
            </h1>
            <p className="hero-subtitle">
                {t('heroSubtitle', lang)}{' '}
                <a href="https://www.runi.ac.il/yedion/en/pages/generalsearch.aspx" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'inherit' }}>
                    {t('yedion', lang)}
                </a>
            </p>
        </header>
    )
}

export function FeaturesSection() {
    const { lang } = useLang()

    return (
        <section className="features-grid">
            <div className="card feature-card delay-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="feature-icon"><Star size={24} /></div>
                <h3>{t('honestRatings', lang)}</h3>
                <p className="text-muted">{t('honestRatingsDesc', lang)}</p>
            </div>

            <div className="card feature-card delay-200" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="feature-icon"><BookOpen size={24} /></div>
                <h3>{t('courseTips', lang)}</h3>
                <p className="text-muted">{t('courseTipsDesc', lang)}</p>
            </div>

            <div className="card feature-card delay-300" style={{ boxShadow: 'var(--shadow-sm)' }}>
                <div className="feature-icon"><MessageSquare size={24} /></div>
                <h3>{t('testStrategies', lang)}</h3>
                <p className="text-muted">{t('testStrategiesDesc', lang)}</p>
            </div>
        </section>
    )
}
