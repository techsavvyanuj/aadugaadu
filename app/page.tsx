import Hero from '@/components/sections/Hero';
import dynamic from 'next/dynamic';

// Lazy load below-fold sections — only Hero loads eagerly for fast first paint
const ScrollRevealText = dynamic(() => import('@/components/sections/ScrollRevealText'));
const LogoMarquee = dynamic(() => import('@/components/sections/LogoMarquee'));
const TechExpertise = dynamic(() => import('@/components/sections/TechExpertise'));
const ProcessCards = dynamic(() => import('@/components/sections/ProcessCards'));
const UnveilingText = dynamic(() => import('@/components/sections/UnveilingText'));
const Craftsmanship = dynamic(() => import('@/components/sections/Craftsmanship'));
const StatsMarquee = dynamic(() => import('@/components/sections/StatsMarquee'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const CTASection = dynamic(() => import('@/components/sections/CTASection'));

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollRevealText />
      <LogoMarquee />
      <TechExpertise />
      <ProcessCards />
      <UnveilingText />
      <Craftsmanship />
      <StatsMarquee />
      <Testimonials />
      <CTASection />
    </>
  );
}
