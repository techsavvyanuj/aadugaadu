'use client';

import { useRef, useEffect, useState } from 'react';

export default function UnveilingText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Start animating well before section enters viewport
      const start = windowH * 1.5;
      const end = -windowH * 0.5;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // "Unveiling" sweeps fully from left (-80%) to right (+60%)
  // "Possibilities" sweeps fully from right (+80%) to left (-60%)
  const unveilingX = -80 + progress * 140;
  const possibilitiesX = 80 - progress * 140;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0a0a0a] overflow-hidden py-0"
      style={{ marginBottom: '-1px' }}
    >
      {/* "Unveiling" — positioned at bottom, half clipped below */}
      <div className="flex flex-col justify-end overflow-hidden">
        <div className="w-full" style={{ marginBottom: '-0.35em' }}>
          <h2
            className="text-[clamp(3rem,15vw,14rem)] font-black leading-[0.85] tracking-tight whitespace-nowrap will-change-transform"
            style={{
              transform: `translateX(${unveilingX}%)`,
              WebkitTextStroke: '1.5px rgba(124, 58, 237, 0.5)',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 80px rgba(124, 58, 237, 0.08)',
            }}
          >
            Unveiling
          </h2>
        </div>
      </div>

      {/* "Possibilities" — at the top of the next visual block */}
      <div className="w-full pt-2 pb-8 sm:pb-16 overflow-hidden">
        <h2
          className="text-[clamp(3rem,15vw,14rem)] font-black leading-[0.85] tracking-tight whitespace-nowrap will-change-transform"
          style={{
            transform: `translateX(${possibilitiesX}%)`,
            WebkitTextStroke: '1.5px rgba(124, 58, 237, 0.5)',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 80px rgba(124, 58, 237, 0.08)',
          }}
        >
          Possibilities
        </h2>
      </div>
    </section>
  );
}
