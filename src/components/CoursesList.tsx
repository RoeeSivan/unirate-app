"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';

// נגדיר Interface מקומי כדי לוודא שאין התנגשות עם Prisma
interface CourseData {
  id: string;
  title: string;
  description: string | null;
  year?: number | string | null;
  semester?: string | null;
  isMandatory?: boolean;
  tags?: string[];
  reviews: { id: string; rating: number }[];
}

interface CoursesListProps {
  courses: CourseData[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  // 1. הוספת State לבדיקה שהקומפוננטה נטענה (מונע שגיאות Hydration)
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [mandatory, setMandatory] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = useMemo(() => {
    if (!courses) return [];
    return courses.filter(c => {
      // we check that the fields are there before the filtering
      const matchesQuery = !q || c.title.toLowerCase().includes(q.toLowerCase());
      const matchesYear = !year || c.year?.toString() === year;
      const matchesSemester = !semester || c.semester === semester;
      
      let matchesMandatory = true;
      if (mandatory === 'true') matchesMandatory = c.isMandatory === true;
      if (mandatory === 'false') matchesMandatory = c.isMandatory === false;

      return matchesQuery && matchesYear && matchesSemester && matchesMandatory;
    });
  }, [courses, q, year, semester, mandatory]);

  if (!mounted) return null; // מחכה לטעינה בדפדפן

  return (
    <>
      {/* כאן נשאר ה-JSX שלך, הוא נראה מצוין */}
      <div className="search-bar-wrapper" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Search courses..."
          className="input" // וודא שהמחלקה הזו מוגדרת ב-CSS שלך
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        {/* שאר ה-Selects... */}
      </div>
      
      {/* רינדור הקורסים */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.length > 0 ? (
          filtered.map(course => (
            // ה-Link והכרטיסייה שלך...
            <div key={course.id}>{/* ... */}</div>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No courses found matching your filters.</p>
        )}
      </div>
    </>
  );
}