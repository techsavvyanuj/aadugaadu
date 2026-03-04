'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface CircularGalleryProps {
  children: React.ReactNode[];
  bend?: number;
  borderRadius?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  autoScroll?: boolean;
  autoScrollSpeed?: number;
  /** How many px of vertical scroll the section captures before releasing */
  scrollCapture?: number;
}

export default function CircularGallery({
  children,
  bend = 2,
  borderRadius = 0.11,
  scrollSpeed = 2.7,
  scrollEase = 0.11,
  itemWidth = 320,
  itemHeight = 420,
  gap = 30,
  autoScroll = true,
  autoScrollSpeed = 0.3,
  scrollCapture = 1200,
}: CircularGalleryProps) {
  /* ── Outer wrapper that creates the scroll‑capture zone ── */
  const outerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const targetRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const rafRef = useRef(0);
  const interactingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const totalWidth = children.length * (itemWidth + gap);

  const markInteracting = useCallback(() => {
    interactingRef.current = true;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      interactingRef.current = false;
    }, 3000);
  }, []);

  /* ── Mouse handlers ── */
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      draggingRef.current = true;
      startXRef.current = e.clientX;
      startScrollRef.current = targetRef.current;
      markInteracting();
    },
    [markInteracting],
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggingRef.current) return;
      targetRef.current = startScrollRef.current - (e.clientX - startXRef.current) * scrollSpeed;
      markInteracting();
    },
    [scrollSpeed, markInteracting],
  );

  const onMouseUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  /* ── Touch handlers ── */
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      draggingRef.current = true;
      startXRef.current = e.touches[0].clientX;
      startScrollRef.current = targetRef.current;
      markInteracting();
    },
    [markInteracting],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!draggingRef.current) return;
      targetRef.current =
        startScrollRef.current - (e.touches[0].clientX - startXRef.current) * scrollSpeed;
      markInteracting();
    },
    [scrollSpeed, markInteracting],
  );

  const onTouchEnd = useCallback(() => {
    draggingRef.current = false;
  }, []);

  /* ── Scroll-hijack: convert page scroll → gallery horizontal scroll ── */
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Walk up to the nearest tall scrollCapture wrapper (the section's outer div)
    const captureParent = outer.closest('[data-scroll-capture]') as HTMLElement | null;

    const onScroll = () => {
      const target = captureParent || outer;
      const rect = target.getBoundingClientRect();
      // The section wrapper height = 100vh + scrollCapture.
      // The sticky panel shows the section content at top:0.
      // We want capture to begin only after the section is fully in view,
      // i.e. after scrolling 1 viewport height into the wrapper.
      const vh = window.innerHeight;
      const entered = -(rect.top) - vh;
      if (entered < 0 || entered > scrollCapture) return;

      // Map vertical scroll progress (0 → scrollCapture) to horizontal gallery target
      const progress = entered / scrollCapture;
      const range = totalWidth * 0.6;
      targetRef.current = progress * range;
      markInteracting();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollCapture, totalWidth, markInteracting]);

  /* ── Render loop ── */
  useEffect(() => {
    const half = totalWidth / 2;

    const animate = () => {
      const container = containerRef.current;
      if (!container) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      // Auto‑scroll only when section is not in scroll‑capture zone
      const outer = outerRef.current;
      let inCaptureZone = false;
      if (outer) {
        const captureParent = outer.closest('[data-scroll-capture]') as HTMLElement | null;
        const target = captureParent || outer;
        const rect = target.getBoundingClientRect();
        const vh = window.innerHeight;
        const entered = -(rect.top) - vh;
        inCaptureZone = entered >= 0 && entered <= scrollCapture;
      }

      if (autoScroll && !interactingRef.current && !inCaptureZone) {
        targetRef.current += autoScrollSpeed;
      }

      // Ease toward target
      scrollRef.current += (targetRef.current - scrollRef.current) * scrollEase;

      const cw = container.offsetWidth;
      const items = container.querySelectorAll<HTMLElement>('[data-cg-item]');

      items.forEach((item, i) => {
        let x = i * (itemWidth + gap) - scrollRef.current;
        // Wrap around for infinite loop
        while (x > half) x -= totalWidth;
        while (x < -half) x += totalWidth;

        const fromCenter = x / (cw * 0.5);
        const absFC = Math.abs(fromCenter);

        const rotY = fromCenter * bend * 22;
        const tz = -absFC * bend * 60;
        const s = 1 - absFC * 0.15;
        const o = 1 - absFC * 0.45;

        item.style.transform = `translateX(${cw / 2 + x - itemWidth / 2}px) perspective(1200px) rotateY(${rotY}deg) translateZ(${tz}px) scale(${Math.max(s, 0.6)})`;
        item.style.opacity = `${Math.max(o, 0.15)}`;
        item.style.zIndex = `${Math.round((1 - absFC) * 100)}`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [autoScroll, autoScrollSpeed, bend, gap, itemWidth, scrollEase, totalWidth, scrollCapture]);

  /* ── Cleanup timeout ── */
  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const br = `${Math.round(borderRadius * 100)}%`;

  return (
    <div
      ref={outerRef}
      className="relative"
      style={{ height: itemHeight + 40 }}
    >
        <div
          ref={containerRef}
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none w-full h-full"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {children.map((child, i) => (
            <div
              key={i}
              data-cg-item
              className="absolute top-5 will-change-transform"
              style={{
                width: itemWidth,
                height: itemHeight,
                borderRadius: br,
                overflow: 'hidden',
              }}
            >
              {child}
            </div>
          ))}
        </div>
    </div>
  );
}
