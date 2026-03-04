'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';

/* ── Review data ── */
const reviews = [
  {
    quote: 'Aadugaadu delivered an exceptional AI-powered platform that exceeded our expectations. Their technical depth and commitment is unmatched.',
    highlight: 'exceeded our expectations.',
    name: 'Rahul Verma',
    role: 'CTO, TECHVISTA',
    initials: 'RV',
  },
  {
    quote: 'The Flutter app they built for us launched on both platforms simultaneously and the quality was indistinguishable from native apps.',
    highlight: 'indistinguishable from native apps.',
    name: 'Priya Sharma',
    role: 'FOUNDER, APPSPHERE',
    initials: 'PS',
  },
  {
    quote: 'From ideation to deployment, Aadugaadu handled our OTT platform with incredible professionalism and speed.',
    highlight: 'incredible professionalism and speed.',
    name: 'Arjun Patel',
    role: 'CEO, STREAMLINE',
    initials: 'AP',
  },
  {
    quote: 'Their full-stack expertise helped us scale from 100 to 100,000 users without a single architecture change. Truly forward-thinking.',
    highlight: 'without a single architecture change.',
    name: 'Neha Singh',
    role: 'VP ENGINEERING, DATAFLOW',
    initials: 'NS',
  },
  {
    quote: 'The AI analytics dashboard they built gives us real-time insights that helped us increase revenue by 40% in just three months.',
    highlight: 'increase revenue by 40%',
    name: 'Vikram Mehta',
    role: 'CEO, ANALYTICA',
    initials: 'VM',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (dir: 'left' | 'right') => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);

      setTimeout(() => {
        setActiveIndex((prev) =>
          dir === 'right'
            ? (prev + 1) % reviews.length
            : (prev - 1 + reviews.length) % reviews.length
        );
        setIsAnimating(false);
      }, 400);
    },
    [isAnimating]
  );

  /* Auto-advance */
  useEffect(() => {
    timeoutRef.current = setInterval(() => goTo('right'), 6000);
    return () => { if (timeoutRef.current) clearInterval(timeoutRef.current); };
  }, [goTo]);

  const review = reviews[activeIndex];

  /* Split quote to bold the highlight portion */
  const renderQuote = () => {
    const idx = review.quote.indexOf(review.highlight);
    if (idx === -1) return review.quote;
    const before = review.quote.slice(0, idx);
    const after = review.quote.slice(idx + review.highlight.length);
    return (
      <>
        {before}
        <span className="font-extrabold text-white">{review.highlight}</span>
        {after}
      </>
    );
  };

  return (
    <section className="bg-[#050505] relative">
      <div className="max-w-[960px] mx-auto px-4 sm:px-8 py-16 sm:py-28 lg:py-36 flex flex-col justify-center sm:min-h-screen">
        <FadeIn>
          {/* Rating bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-10">
            <span className="text-white text-xl font-black tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
              Google
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#ff6b6b] text-[#ff6b6b]" />
              ))}
            </div>
            <span className="text-white text-lg font-bold">5.0</span>
            <span className="w-10 h-px bg-zinc-600" />
            <span className="text-zinc-500 text-base font-medium">10 Reviews</span>
          </div>
        </FadeIn>

        {/* Quote area */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-12">
          {/* Left arrow */}
          <button
            onClick={() => goTo('left')}
            className="shrink-0 group"
            aria-label="Previous review"
          >
            <ArrowLeft
              className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600 group-hover:text-white transition-colors duration-300"
              strokeWidth={1.5}
            />
          </button>

          {/* Center quote */}
          <div
            className="flex-1 transition-all duration-400"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating
                ? `translateX(${direction === 'right' ? '-30px' : '30px'})`
                : 'translateX(0)',
            }}
          >
            <blockquote
              className="text-zinc-300 font-medium leading-[1.3] mb-6 sm:mb-10"
              style={{
                fontSize: 'clamp(1.1rem, 3.5vw, 2.8rem)',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              {renderQuote()}
            </blockquote>

            {/* Person info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shrink-0">
                {review.initials}
              </div>
              <div>
                <p className="text-white font-bold text-base" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {review.name}
                </p>
                <p
                  className="text-zinc-500 text-xs font-semibold uppercase tracking-[0.12em]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {review.role}
                </p>
              </div>
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => goTo('right')}
            className="shrink-0 group"
            aria-label="Next review"
          >
            <ArrowRight
              className="w-6 h-6 sm:w-8 sm:h-8 text-zinc-600 group-hover:text-white transition-colors duration-300"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-14">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (i === activeIndex || isAnimating) return;
                setDirection(i > activeIndex ? 'right' : 'left');
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveIndex(i);
                  setIsAnimating(false);
                }, 400);
              }}
              className="transition-all duration-300"
              style={{
                width: i === activeIndex ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === activeIndex ? '#7c3aed' : 'rgba(255,255,255,0.15)',
              }}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
