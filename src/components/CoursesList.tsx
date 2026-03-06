"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// Updated to match the data types coming from the Prisma schema
interface CourseData {
  id: string;
  title: string;
  description: string | null;
  year?: number | null;
  semester?: string | null;
  isMandatory?: boolean;
  tags?: string[];
  reviews: { id: string; rating: number }[];
}

interface CoursesListProps {
  courses: CourseData[];
  isLoggedIn: boolean;
}

export default function CoursesList({ courses, isLoggedIn }: CoursesListProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState(searchParams.get('q') || '');
  const [year, setYear] = useState(searchParams.get('year') || '');
  const [semester, setSemester] = useState(searchParams.get('semester') || '');
  const [mandatory, setMandatory] = useState(searchParams.get('type') || '');

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
  console.log("Courses Data in Client:", courses);
  const filtered = useMemo(() => {
    if (!courses) return [];
    
    return courses.filter(c => {
      // 1. Query search: Protected against missing titles
      const matchesQuery = !q || (c.title && c.title.toLowerCase().includes(q.toLowerCase()));
      
      // 2. Year filter: Convert the Int from DB to string to match the Select value
      const matchesYear = !year || c.year?.toString() === year;
      
      // 3. Semester filter: Case-insensitive comparison (e.g., 'A' vs 'a')
      const matchesSemester = !semester || (c.semester && c.semester.toLowerCase() === semester.toLowerCase());
      
      // 4. Mandatory/Elective filter: Match string from Select to boolean in DB
      let matchesMandatory = true;
      if (mandatory === 'true') matchesMandatory = c.isMandatory === true;
      if (mandatory === 'false') matchesMandatory = c.isMandatory === false;

      // Return the course only if it meets all selected conditions (progressive filtering)
      return matchesQuery && matchesYear && matchesSemester && matchesMandatory;
    });
  }, [courses, q, year, semester, mandatory]);

  if (!mounted) return null;

  const visibleCourses = isLoggedIn ? filtered : filtered.slice(0, 10);
  const hiddenCount = isLoggedIn ? 0 : filtered.length - visibleCourses.length;

  return (
    <>
      {/* Filters Section */}
      <div className="search-bar-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Search courses..."
          className="input"
          value={q}
          onChange={e => { setQ(e.target.value); updateURL('q', e.target.value); }}
        />
        <select value={year} className="input" onChange={e => { setYear(e.target.value); updateURL('year', e.target.value); }}>
          <option value="">Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <select value={semester} className="input" onChange={e => { setSemester(e.target.value); updateURL('semester', e.target.value); }}>
          <option value="">Semester</option>
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        <select value={mandatory} className="input" onChange={e => { setMandatory(e.target.value); updateURL('type', e.target.value); }}>
          <option value="">All</option>
          <option value="true">Mandatory</option>
          <option value="false">Elective</option>
        </select>
      </div>
      
      {/* Render Filtered Courses List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length > 0 ? (
          visibleCourses.map(course => {
            const avgRating = course.reviews && course.reviews.length > 0
              ? course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
              : 0;
            return (
              <Link
                href={`/course/${course.id}`}
                key={course.id}
                className="card card-hover-fx"
                style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'var(--text-main)' }}>{course.title}</h3>
                    {course.tags && course.tags.length > 0 && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'var(--surface-hover)', color: 'var(--text-muted)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>
                        {course.tags.join(', ')}
                      </span>
                    )}
                    {course.isMandatory && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', backgroundColor: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>Mandatory</span>
                    )}
                  </div>
                  <p style={{ color: 'var(--text-muted)' }}>{course.description}</p>
                </div>
                
                {course.isMandatory ? (
                  course.reviews?.length > 0 && (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                      {course.reviews.length} {course.reviews.length === 1 ? 'review' : 'reviews'}
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
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No courses found matching your filters.</p>
        )}
        {hiddenCount > 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', borderRadius: 'var(--radius)', border: '1px dashed var(--border)', marginTop: '0.5rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>+{hiddenCount} more courses</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Sign in with your Reichman account to see all courses.</p>
            <a href="/login" className="btn-primary" style={{ display: 'inline-block', padding: '0.5rem 1.5rem' }}>Sign In</a>
          </div>
        )}
      </div>
    </>
  );
}