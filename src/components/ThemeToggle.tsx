'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light')

    useEffect(() => {
        // initialize from localStorage or system preference
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null
        if (stored) {
            setTheme(stored)
        } else {
            const m = window.matchMedia('(prefers-color-scheme: dark)')
            setTheme(m.matches ? 'dark' : 'light')
        }
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

    return (
        <button
            onClick={toggle}
            className="btn-outline"
            style={{ fontSize: '0.875rem' }}
        >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
    )
}
