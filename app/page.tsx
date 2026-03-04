import Hero from '@/components/sections/Hero';
import ScrollRevealText from '@/components/sections/ScrollRevealText';
import LogoMarquee from '@/components/sections/LogoMarquee';
import Testimonials from '@/components/sections/Testimonials';
import TechExpertise from '@/components/sections/TechExpertise';
import ProcessCards from '@/components/sections/ProcessCards';
import UnveilingText from '@/components/sections/UnveilingText';
import Craftsmanship from '@/components/sections/Craftsmanship';
import StatsMarquee from '@/components/sections/StatsMarquee';
import CTASection from '@/components/sections/CTASection';
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
