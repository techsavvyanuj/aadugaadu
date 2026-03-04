'use client';

import { useRef, useEffect, useState } from 'react';

const PARAGRAPH =
  'We architect intelligent software systems that transform ideas into scalable digital products. From machine learning pipelines and cloud-native platforms to cross-platform mobile applications and enterprise web solutions — our engineering team delivers precision-crafted technology that drives real business impact. We blend deep technical expertise with creative problem-solving to build software that doesn\'t just work, it performs, scales, and evolves with your vision.';

export default function ScrollRevealText() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Section scroll range: from when top hits viewport bottom to when bottom hits viewport top
      const sectionH = sectionRef.current.offsetHeight;
      const totalScrollRange = sectionH + windowH;
      const scrolled = windowH - rect.top;

      const raw = scrolled / totalScrollRange;
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chars = PARAGRAPH.split('');
  const totalChars = chars.length;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#050505] py-0"
    >
      <div className="sticky top-0 min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-10 lg:px-20">
        <p
          className="text-[clamp(1.1rem,3.2vw,3.2rem)] font-bold leading-[1.35] tracking-wide max-w-[1200px] text-center"
          style={{ wordSpacing: '0.06em' }}
        >
          {chars.map((char, i) => {
            // Map progress (0→1) to character index
            // Start revealing a bit before section middle, finish a bit after
            const charProgress = (progress - 0.15) / 0.65; // starts at 15% scroll, ends at 80%
            const charThreshold = i / totalChars;
            const isRevealed = charProgress >= charThreshold;

            return (
              <span
                key={i}
                className="transition-colors duration-100"
                style={{
                  color: isRevealed ? '#ffffff' : '#333333',
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {/* Extra scroll height so sticky has room to work */}
      <div className="h-[80vh] sm:h-[150vh]" />
    </section>
  );
}
