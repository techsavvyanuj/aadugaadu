'use client';

import { useRef, useEffect, useState } from 'react';
import { Trophy, Lightbulb, Settings } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

const reasons = [
  {
    icon: Trophy,
    title: 'Results that speak louder: evidenced',
    description:
      "We don't just promise excellence; we deliver it. Our portfolio is a testament to our commitment to producing results that speak louder than words.",
  },
  {
    icon: Lightbulb,
    title: 'Cracking complex cases with innovation',
    description:
      'We specialize in cracking the most complex cases with a blend of innovation and strategic thinking. Our team excels in dissecting intricate problems and delivering creative, effective solutions.',
  },
  {
    icon: Settings,
    title: 'Engineering solutions with technical precision',
    description:
      'We are committed to delivering engineering solutions that embody technical precision and superior quality. Our approach is rooted in a deep understanding of the latest technological advancements, enabling us to tackle complex challenges with professional expertise.',
  },
];

const CARD_HEIGHT_VH = 70; // each card occupies 70vh of scroll
const TOTAL_CARDS = reasons.length;

export default function WhyUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionH = sectionRef.current.offsetHeight;
      const viewH = window.innerHeight;
      // progress 0 → 1 across the whole section
      const raw = (-rect.top) / (sectionH - viewH);
      setScrollProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Which card is active (0, 1, 2)
  const activeCard = Math.min(
    TOTAL_CARDS - 1,
    Math.floor(scrollProgress * TOTAL_CARDS)
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505]"
      style={{ height: `${CARD_HEIGHT_VH * TOTAL_CARDS + 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Header — fades out as cards start */}
        <div
          className="text-center mb-8 transition-all duration-500 px-6"
          style={{
            opacity: scrollProgress < 0.05 ? 1 : Math.max(0, 1 - scrollProgress * 5),
            transform: `translateY(${Math.min(0, -scrollProgress * 200)}px)`,
          }}
        >
          <FadeIn>
            <h2
              className="font-black text-white tracking-tight mb-4"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              Exceptional is our standard
            </h2>
            <p className="text-zinc-500 text-base font-semibold">
              Why Aadugaadu
            </p>
          </FadeIn>
        </div>

        {/* Purple border frame */}
        <div className="relative mx-auto w-full px-6" style={{ maxWidth: '1000px' }}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              border: '2px solid rgba(124, 58, 237, 0.45)',
              boxShadow: '0 0 80px rgba(124, 58, 237, 0.06)',
              minHeight: '420px',
            }}
          >
            {/* "Why Aadugaadu" inside frame */}
            <div className="text-center pt-8 pb-4 relative z-20">
              <p className="text-zinc-500 text-sm font-semibold">
                Why Aadugaadu
              </p>
            </div>

            {/* Stacking cards container */}
            <div className="relative" style={{ minHeight: '350px' }}>
              {reasons.map((reason, i) => {
                const Icon = reason.icon;
                const isActive = activeCard === i;
                const isPast = activeCard > i;
                const isFuture = activeCard < i;

                // Card position: active = visible, past = slid up, future = below
                let translateY = 0;
                let opacity = 1;
                let scale = 1;

                if (isPast) {
                  translateY = -30 * (activeCard - i);
                  opacity = 0.3;
                  scale = 0.96 - (activeCard - i) * 0.02;
                } else if (isFuture) {
                  translateY = 100;
                  opacity = 0;
                  scale = 1.02;
                }

                return (
                  <div
                    key={reason.title}
                    className="absolute inset-0 transition-all duration-700 ease-out"
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                      zIndex: isActive ? 10 : isPast ? 10 - (activeCard - i) : 0,
                    }}
                  >
                    {/* Matte glass card */}
                    <div
                      className="mx-6 sm:mx-10 rounded-2xl h-full flex flex-col sm:flex-row items-center gap-8 sm:gap-12 px-8 sm:px-14 py-12 sm:py-16"
                      style={{
                        background: 'rgba(255, 255, 255, 0.04)',
                        backdropFilter: 'blur(40px) saturate(120%)',
                        WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
                      }}
                    >
                      {/* Large white circle with icon */}
                      <div className="shrink-0">
                        <div
                          className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.06)',
                          }}
                        >
                          <Icon
                            className="w-14 h-14 sm:w-16 sm:h-16"
                            style={{ color: 'rgba(255, 255, 255, 0.25)' }}
                            strokeWidth={1}
                          />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 text-center sm:text-left">
                        <h3
                          className="text-white font-bold mb-4 leading-snug"
                          style={{
                            fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {reason.title}
                        </h3>
                        <p
                          className="text-zinc-500 leading-relaxed"
                          style={{
                            fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                            lineHeight: 1.75,
                          }}
                        >
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress indicator dots */}
            <div className="flex items-center justify-center gap-2 py-6 relative z-20">
              {reasons.map((_, i) => (
                <div
                  key={i}
                  className="transition-all duration-500"
                  style={{
                    width: activeCard === i ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: activeCard === i ? '#7c3aed' : 'rgba(255,255,255,0.1)',
                    boxShadow: activeCard === i ? '0 0 10px rgba(124,58,237,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
