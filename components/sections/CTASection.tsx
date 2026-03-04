'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import FadeIn from '@/components/animations/FadeIn';

const CircularText = dynamic(() => import('@/components/animations/CircularText'), {
  ssr: false,
});

export default function CTASection() {
  const marqueeText = 'DIGITAL TRANSFORMATION • AI DEVELOPMENT • FLUTTER APPS • FULL STACK • CLOUD NATIVE • ';
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="bg-[#050505] border-t border-white/[0.03]">
      {/* Marquee strip — brighter + faster */}
      <div className="overflow-hidden py-10">
        <div className="flex" style={{ animation: 'marquee 18s linear infinite' }}>
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="whitespace-nowrap mx-6 tracking-tight font-black"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'rgba(255, 255, 255, 0.08)',
                WebkitTextStroke: '1px rgba(255, 255, 255, 0.06)',
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>

      {/* CTA content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-28">
        <FadeIn>
          <div className="text-center">
            {/* "The future awaits" — italic serif style like Lexogrine */}
            <h2
              className="text-white tracking-tight mb-4 sm:mb-6"
              style={{
                fontSize: 'clamp(2rem, 6vw, 5rem)',
                fontWeight: 900,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              The future awaits
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg md:text-xl mb-10 sm:mb-16 max-w-md mx-auto">
              It&apos;s time to successfully deliver your project.
            </p>

            {/* Circular spinning text + center button */}
            <div className="flex items-center justify-center">
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Rotating circular text */}
                <div className="text-zinc-500">
                  <CircularText
                    text="DIGITAL TRANSFORMATION • IN-HOUSE DEVELOPMENT • NEXT MAKING PRODUCT • "
                    onHover="speedUp"
                    spinDuration={20}
                    className="!w-[200px] !h-[200px] sm:!w-[280px] sm:!h-[280px]"
                  />
                </div>

                {/* Center button — expands on hover to cover the ring */}
                <Link
                  href="/contact"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full font-black uppercase tracking-wider text-white transition-all duration-500 ease-out z-10"
                  style={{
                    width: isHovered ? (isMobile ? '200px' : '280px') : (isMobile ? '110px' : '150px'),
                    height: isHovered ? (isMobile ? '200px' : '280px') : (isMobile ? '110px' : '150px'),
                    fontSize: isHovered ? '1rem' : '0.75rem',
                    background: isHovered
                      ? 'linear-gradient(135deg, #7c3aed, #6d28d9)'
                      : '#0a0a0a',
                    border: `2px solid ${isHovered ? '#7c3aed' : 'rgba(255,255,255,0.1)'}`,
                    boxShadow: isHovered
                      ? '0 0 60px rgba(124, 58, 237, 0.3), inset 0 0 30px rgba(124, 58, 237, 0.1)'
                      : '0 0 40px rgba(0,0,0,0.5)',
                    letterSpacing: '0.15em',
                  }}
                >
                  LET&apos;S START
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
