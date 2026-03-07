"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Star, ChevronDown } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLang } from './LanguageProvider';
import { t } from '@/lib/translations';

interface CourseData {
  id: string;
  title: string;
  titleHe?: string | null;
  description: string | null;
  descriptionHe?: string | null;
  year?: number | null;
  semester?: string | null;
  isMandatory?: boolean;
  isTheoretical?: boolean;
  tags?: string[];
  reviews: { id: string; rating: number }[];
}

interface CoursesListProps {
  courses: CourseData[];
  isLoggedIn: boolean;
}

function CourseCard({ course, lang }: { course: CourseData; lang: 'en' | 'he' }) {
  const avgRating = course.reviews && course.reviews.length > 0
    ? course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
    : 0;
  const courseTitle = (lang === 'he' && course.titleHe) ? course.titleHe : course.title;
  const courseDesc = (lang === 'he' && course.descriptionHe) ? course.descriptionHe : course.description;

  return (
    <Link
      href={`/course/${course.id}`}
      className="card card-hover-fx"
      style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{courseTitle}</h3>
          {course.tags && course.tags.length > 0 && (
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>
              {course.tags.join(', ')}
            </span>
          )}
          {course.isMandatory && (
            <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>{t('mandatory', lang)}</span>
          )}
        </div>
        <p dir="auto" style={{ color: 'var(--text-muted)' }}>{courseDesc}</p>
      </div>

      {course.isMandatory ? (
        course.reviews?.length > 0 && (
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            {course.reviews.length} {course.reviews.length === 1 ? t('review', lang) : t('reviews', lang)}
          </span>
        )
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                style={{
                  color: star <= Math.round(avgRating) ? '#fbbf24' : '#d1d5db',
                  fill: star <= Math.round(avgRating) ? '#fbbf24' : 'transparent',
                }}
              />
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ fontWeight: 'bold' }}>{avgRating.toFixed(1)}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              ({course.reviews?.length || 0})
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

function AccordionSection({ title, courses, lang, defaultOpen = false }: {
  title: string;
  courses: CourseData[];
  lang: 'en' | 'he';
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  if (courses.length === 0) return null;

  return (
    <div style={{ borderRadius: 'var(--radius)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.875rem 1.25rem',
          background: open ? 'var(--surface)' : 'var(--bg)',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-main)',
          fontSize: '1rem',
          fontWeight: 'bold',
          transition: 'background 0.15s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{title}</span>
          <span style={{
            fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)',
            backgroundColor: 'var(--surface-hover)', padding: '0.125rem 0.5rem', borderRadius: '10px',
          }}>
            {courses.length}
          </span>
        </div>
        <ChevronDown
          size={18}
          style={{
            color: 'var(--text-muted)',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>
      {open && (
        <div style={{
          padding: '0.5rem 0.75rem 0.75rem',
          display: 'flex', flexDirection: 'column', gap: '0.5rem',
          borderTop: '1px solid var(--border)',
        }}>
          {courses.map(course => (
            <CourseCard key={course.id} course={course} lang={lang} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursesList({ courses, isLoggedIn }: CoursesListProps) {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState(searchParams.get('q') || '');

  const updateURL = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    if (!courses) return [];
    if (!q) return courses;
    return courses.filter(c => {
      const title = (lang === 'he' && c.titleHe) ? c.titleHe : c.title;
      return title && title.toLowerCase().includes(q.toLowerCase());
    });
  }, [courses, q, lang]);

  // Group into sections: Year 1 Sem A, Year 1 Sem B, Year 2 Sem A, ...
  const sections = useMemo(() => {
    const result: { key: string; title: string; courses: CourseData[] }[] = [];

    for (const yr of [1, 2, 3]) {
      const yearLabel = t(`year${yr}` as 'year1' | 'year2' | 'year3', lang);
      const semALabel = t('semesterA', lang);
      const semBLabel = t('semesterB', lang);

      const yearCourses = filtered.filter(c => c.year === yr && c.isMandatory);
      const semA = yearCourses.filter(c => c.semester?.toUpperCase() === 'A');
      const semB = yearCourses.filter(c => c.semester?.toUpperCase() === 'B');
      const other = yearCourses.filter(c => !c.semester || (c.semester.toUpperCase() !== 'A' && c.semester.toUpperCase() !== 'B'));

      if (semA.length > 0) {
        result.push({ key: `y${yr}a`, title: `${yearLabel} — ${semALabel}`, courses: semA });
      }
      if (semB.length > 0) {
        result.push({ key: `y${yr}b`, title: `${yearLabel} — ${semBLabel}`, courses: semB });
      }
      if (other.length > 0) {
        result.push({ key: `y${yr}o`, title: `${yearLabel} — ${t('otherSemester', lang)}`, courses: other });
      }
    }

    const electives = filtered.filter(c => !c.isMandatory);
    if (electives.length > 0) {
      result.push({ key: 'electives', title: t('electives', lang), courses: electives });
    }

    return result;
  }, [filtered, lang]);

  if (!mounted) return null;

  const hiddenCount = isLoggedIn ? 0 : Math.max(0, filtered.length - 10);

  return (
    <>
      {/* Search */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          placeholder={t('searchCourses', lang)}
          className="input"
          style={{ width: '100%' }}
          value={q}
          onChange={e => { setQ(e.target.value); updateURL('q', e.target.value); }}
        />
      </div>

      {/* Accordion sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {sections.length > 0 ? (
          sections.map((section, i) => (
            <AccordionSection
              key={section.key}
              title={section.title}
              courses={section.courses}
              lang={lang}
              defaultOpen={i === 0}
            />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>{t('noCoursesFound', lang)}</p>
        )}

        {hiddenCount > 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', borderRadius: 'var(--radius)', border: '1px dashed var(--border)', marginTop: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>+{hiddenCount} {t('moreCourses', lang)}</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{t('signInToSeeAll', lang)}</p>
            <a href="/login" className="btn-primary" style={{ display: 'inline-block', padding: '0.5rem 1.5rem' }}>{t('signIn', lang)}</a>
          </div>
        )}
      </div>
    </>
  );
}
