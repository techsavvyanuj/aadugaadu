'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface ScrollStackProps {
  children: React.ReactNode[];
  stickyTop?: number;
  cardGap?: number;
}

export default function ScrollStack({
  children,
  stickyTop = 80,
  cardGap = 24,
}: ScrollStackProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  /* ── Lenis smooth scrolling ── */
  useEffect(() => {
    lenisRef.current = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, []);

  /* ── Scroll-driven stacking transforms ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!wrapperRef.current) return;
      const cards = wrapperRef.current.querySelectorAll<HTMLElement>('[data-stack-card]');
      const total = cards.length;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const targetTop = stickyTop + i * cardGap;

        // How far this card has been pushed into its sticky position
        const overlapPx = targetTop - rect.top;
        const progress = Math.max(0, Math.min(overlapPx / (window.innerHeight * 0.5), 1));

        // Cards that are already stacked scale down & dim slightly
        const scale = 1 - progress * 0.04 * (total - i);
        const brightness = 1 - progress * 0.12;

        const inner = card.querySelector<HTMLElement>('[data-stack-inner]');
        if (inner) {
          inner.style.transform = `scale(${Math.max(scale, 0.88)})`;
          inner.style.filter = `brightness(${Math.max(brightness, 0.7)})`;
          inner.style.borderRadius = '24px';
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stickyTop, cardGap]);

  return (
    <div ref={wrapperRef}>
      {children.map((child, i) => {
        return (
          <div
            key={i}
            data-stack-card
            className="sticky will-change-transform"
            style={{
              top: stickyTop + i * cardGap,
              zIndex: i + 1,
              marginBottom: i < children.length - 1 ? '60vh' : '20vh',
            }}
          >
            <div
              data-stack-inner
              className="will-change-transform origin-top overflow-hidden rounded-3xl"
              style={{ transition: 'transform 0.45s cubic-bezier(0.22,1,0.36,1), filter 0.45s ease' }}
            >
              {child}
            </div>
          </div>
        );
      })}
    </div>
  );
}
