import { BookOpen, Star, MessageSquare } from "lucide-react";
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string, year?: string, semester?: string, mandatory?: string }> }) {
  const { q, year, semester, mandatory } = await searchParams;

  const where: any = {};
  if (q) {
    where.title = { contains: q, mode: 'insensitive' };
  }
  if (year) {
    const y = parseInt(year, 10);
    if (!isNaN(y)) where.year = y;
  }
  if (semester && (semester === 'A' || semester === 'B')) {
    where.semester = semester;
  }
  if (mandatory === 'true') where.isMandatory = true;
  else if (mandatory === 'false') where.isMandatory = false;

  const courses = await prisma.course.findMany({
    where,
    include: { reviews: true }
  });

  return (
    <div className="page-wrapper animate-fade-in">
      <header className="hero">
        <h1 className="hero-title">
          Discover the Best <span className="text-gradient">Courses</span>
        </h1>
        <p className="hero-subtitle">
          Real ratings and test tips from your peers at the university.
          Make informed decisions for your next semester.
        </p>

        <div className="search-bar-wrapper">
          <form method="get" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <input
              name="q"
              defaultValue={q || ''}
              type="text"
              className="input search-input"
              placeholder="Search for a course (e.g., Intro to Computer Science)..."
            />

            <select name="year" defaultValue={year || ''} className="input">
              <option value="">Year</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>

            <select name="semester" defaultValue={semester || ''} className="input">
              <option value="">Semester</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </select>

            <select name="mandatory" defaultValue={mandatory || ''} className="input">
              <option value="">All</option>
              <option value="true">Mandatory</option>
              <option value="false">Elective</option>
            </select>

            <button className="btn-primary" style={{ padding: '0 2rem', borderRadius: '50px' }}>Filter</button>
          </form>
        </div>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center' }}>Top Courses</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {courses.map(course => {
            const avgRating = course.reviews.length > 0
              ? course.reviews.reduce((acc, r) => acc + r.rating, 0) / course.reviews.length
              : 0;

            return (
              <Link href={`/course/${course.id}`} key={course.id} className="card card-hover-fx" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={20} style={{ color: '#fbbf24', fill: '#fbbf24' }} />
                  <span style={{ fontWeight: 'bold' }}>{avgRating.toFixed(1)}</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginLeft: '0.5rem' }}>({course.reviews.length})</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="features-grid">
        <div className="card feature-card delay-100" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="feature-icon"><Star size={24} /></div>
          <h3>Honest Ratings</h3>
          <p className="text-muted">See what students really think about the workload and difficulty.</p>
        </div>

        <div className="card feature-card delay-200" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="feature-icon"><BookOpen size={24} /></div>
          <h3>Course Tips</h3>
          <p className="text-muted">Get a head start with advice on assignments and lectures.</p>
        </div>

        <div className="card feature-card delay-300" style={{ boxShadow: 'var(--shadow-sm)' }}>
          <div className="feature-icon"><MessageSquare size={24} /></div>
          <h3>Test Strategies</h3>
          <p className="text-muted">Learn exactly how to study for the midterm and final exams.</p>
        </div>
      </section>

      <style>{`
        .page-wrapper {
          padding-top: 4rem;
          padding-bottom: 4rem;
        }
        
        .hero {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 5rem auto;
        }

        .hero-title {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          line-height: 1.1;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-muted);
          margin-bottom: 2.5rem;
        }

        .search-bar-wrapper {
          display: flex;
          gap: 0.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-input {
          flex: 1;
          padding: 1rem 1.5rem;
          font-size: 1rem;
          border-radius: 50px;
        }
        
        .card-hover-fx {
          transition: all 0.2s ease;
        }
        .card-hover-fx:hover {
          transform: translateY(-2px);
          border-color: var(--primary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 4rem;
        }
        
        .feature-card {
          text-align: center;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .feature-icon {
          background-color: var(--surface-hover);
          color: var(--primary);
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }
        
        .feature-card h3 {
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
}
