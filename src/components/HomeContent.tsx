'use client'

import { BookOpen, Star, MessageSquare } from 'lucide-react'
import { useLang } from './LanguageProvider'
import { t } from '@/lib/translations'

export function HeroSection({ totalCourses, totalReviews }: { totalCourses: number; totalReviews: number }) {
    const { lang } = useLang()

    return (
        <header className="hero">
            <h1 className="hero-title">
                {t('heroTitle1', lang)}<span className="text-gradient">{t('heroTitleHighlight', lang)}</span>
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '1rem', fontWeight: 500 }}>
                {t('heroDescription', lang)}
            </p>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '2rem',
                marginBottom: '2rem',
                flexWrap: 'wrap',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BookOpen size={20} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalCourses}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('statCourses', lang)}</span>
                </div>
                <div style={{ width: '1px', backgroundColor: 'var(--border)', alignSelf: 'stretch' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageSquare size={20} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{totalReviews}+</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{t('statReviews', lang)}</span>
                </div>
            </div>

            <p className="hero-subtitle">
                {t('heroSubtitle', lang)}{' '}
                <a href="https://www.runi.ac.il/yedion/en/pages/generalsearch.aspx" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'inherit' }}>
                    {t('yedion', lang)}
                </a>
            </p>
            <p className="hero-subtitle" style={{ marginTop: '0.5rem' }}>
                <a href="https://postidcac-my.sharepoint.com/personal/etausi_runi_ac_il/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fetausi%5Fruni%5Fac%5Fil%2FDocuments%2F%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D%20%D7%A7%D7%95%D7%A8%D7%A1%D7%99%20%D7%91%D7%97%D7%99%D7%A8%D7%94%2F%D7%AA%D7%A9%D7%A4%D7%95%2F%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D%20%D7%AA%D7%A9%D7%A4%D7%95%2Epdf&parent=%2Fpersonal%2Fetausi%5Fruni%5Fac%5Fil%2FDocuments%2F%D7%A1%D7%A8%D7%98%D7%95%D7%A0%D7%99%D7%9D%20%D7%A7%D7%95%D7%A8%D7%A1%D7%99%20%D7%91%D7%97%D7%99%D7%A8%D7%94%2F%D7%AA%D7%A9%D7%A4%D7%95&ga=1" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                    {t('electiveVideos', lang)}
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
