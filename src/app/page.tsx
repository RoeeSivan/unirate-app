import { BookOpen, Star, MessageSquare } from "lucide-react";
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import CoursesList from '../components/CoursesList';

export default async function Home() {
  // fetch all courses once on the server; filtering will happen client-side
  const courses = await prisma.course.findMany({
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


      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <CoursesList courses={courses} />
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
