export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import CoursesList from '../components/CoursesList';
import { HeroSection, FeaturesSection } from '../components/HomeContent';
import { getSession } from '@/lib/auth';


export default async function Home() {
  const session = await getSession();
  const courses = await prisma.course.findMany({
    include: { reviews: true }
  });

  const totalReviews = courses.reduce((sum, c) => sum + c.reviews.length, 0);
  const totalCourses = courses.length;
  const activeUsers = await prisma.user.count();

  return (
    <div className="page-wrapper animate-fade-in">
      <HeroSection totalCourses={totalCourses} totalReviews={totalReviews} activeUsers={activeUsers} />

      <section style={{ maxWidth: '800px', margin: '0 auto 4rem auto' }}>
        <Suspense fallback={null}>
          <CoursesList courses={courses} isLoggedIn={!!session} />
        </Suspense>
      </section>

      <FeaturesSection />

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
