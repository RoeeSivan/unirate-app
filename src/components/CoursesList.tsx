"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
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

export default function CoursesList({ courses, isLoggedIn }: CoursesListProps) {
  const { lang } = useLang();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [semester, setSemester] = useState(searchParams.get('semester') || '');
  const [mandatory, setMandatory] = useState(searchParams.get('type') || '');
  const [cluster, setCluster] = useState(searchParams.get('cluster') || '');

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

    return courses.filter(c => {
      const title = (lang === 'he' && c.titleHe) ? c.titleHe : c.title;
      const matchesQuery = !q || (title && title.toLowerCase().includes(q.toLowerCase()));
      const matchesYear = !year || c.year?.toString() === year;
      const matchesSemester = !semester || (c.semester && c.semester.toLowerCase() === semester.toLowerCase());
      let matchesMandatory = true;
      if (mandatory === 'true') matchesMandatory = c.isMandatory === true;
      if (mandatory === 'false') matchesMandatory = c.isMandatory === false;
      let matchesCluster = true;
      if (cluster === 'theoretical') matchesCluster = c.isTheoretical === true;
      return matchesQuery && matchesYear && matchesSemester && matchesMandatory && matchesCluster;
    });
  }, [courses, q, year, semester, mandatory, cluster, lang]);

  if (!mounted) return null;

  const visibleCourses = isLoggedIn ? filtered : filtered.slice(0, 10);
  const hiddenCount = isLoggedIn ? 0 : filtered.length - visibleCourses.length;

  return (
    <>
      <div className="search-bar-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          placeholder={t('searchCourses', lang)}
          className="input"
          value={q}
          onChange={e => { setQ(e.target.value); updateURL('q', e.target.value); }}
        />
        <select value={year} className="input" onChange={e => { setYear(e.target.value); updateURL('year', e.target.value); }}>
          <option value="">{t('year', lang)}</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select value={semester} className="input" onChange={e => { setSemester(e.target.value); updateURL('semester', e.target.value); }}>
          <option value="">{t('semester', lang)}</option>
          <option value="A">{lang === 'he' ? "א'" : 'A'}</option>
          <option value="B">{lang === 'he' ? "ב'" : 'B'}</option>
        </select>
        <select value={mandatory} className="input" onChange={e => {
          setMandatory(e.target.value);
          updateURL('type', e.target.value);
          if (e.target.value !== 'false') { setCluster(''); updateURL('cluster', ''); }
        }}>
          <option value="">{t('all', lang)}</option>
          <option value="true">{t('mandatory', lang)}</option>
          <option value="false">{t('elective', lang)}</option>
        </select>
        {mandatory === 'false' && (
          <select
            value={cluster}
            className="input"
            style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}
            onChange={e => { setCluster(e.target.value); updateURL('cluster', e.target.value); }}
          >
            <option value="">{t('allElectives', lang)}</option>
            <option value="theoretical">{t('theoreticalCluster', lang)}</option>
          </select>
        )}
        {(q || year || semester || mandatory || cluster) && (
          <button
            className="btn-outline"
            style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}
            onClick={() => {
              setQ(''); setYear(''); setSemester(''); setMandatory(''); setCluster('');
              router.replace('?', { scroll: false });
            }}
          >
            {t('resetFilters', lang)}
          </button>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length > 0 ? (
          visibleCourses.map(course => {
            const avgRating = course.reviews && course.reviews.length > 0
              ? course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
              : 0;
            const courseTitle = (lang === 'he' && course.titleHe) ? course.titleHe : course.title;
            const courseDesc = (lang === 'he' && course.descriptionHe) ? course.descriptionHe : course.description;
            return (
              <Link
                href={`/course/${course.id}`}
                key={course.id}
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
                    {course.year && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>
                        {lang === 'he' ? `שנה ${course.year}` : `Year ${course.year}`}
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
          })
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>{t('noCoursesFound', lang)}</p>
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
