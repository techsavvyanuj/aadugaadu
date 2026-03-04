'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════════════
   ProcessCards – Lexogrine-style scroll-driven card-spread
   Two cards start touching, spread apart on scroll to reveal
   center "Trust the process" content.
   ═══════════════════════════════════════════════════════════ */

export default function ProcessCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  /* ── scroll-driven animation tick ── */
  const tick = useCallback(() => {
    const w = wrapperRef.current;
    const l = leftRef.current;
    const r = rightRef.current;
    const c = centerRef.current;
    if (!w || !l || !r || !c) return;

    /* On mobile, just show static layout */
    if (window.innerWidth < 768) {
      l.style.transform = '';
      r.style.transform = '';
      c.style.opacity = '1';
      c.style.transform = '';
      return;
    }

    const rect = w.getBoundingClientRect();
    const vh = window.innerHeight;
    const range = w.offsetHeight - vh;
    const scrolled = -rect.top;
    const p = Math.max(0, Math.min(1, scrolled / range));

    /*
     * Cards start MERGED (overlapping in center) then spread apart.
     *
     * At p = 0: both cards sit at ~52% inward (fully overlapping)
     * At p = 1: cards move to 28% outward (fully spread)
     *
     * Total X travel = 52 + 28 = 80% of card width
     *
     * Cards also TILT with a slight rotateZ as they separate
     * (left card tilts clockwise, right card counter-clockwise)
     * matching the lexogrine 3D perspective look.
     */
    const mergeStart = 75;  // initial overlap offset (%) — cards sit exactly on top of each other
    const spreadEnd = 16;   // final spread offset (%) — keep cards on screen
    const xTravel = mergeStart + spreadEnd;
    const currentX = mergeStart - p * xTravel; // +75 → -16

    const yShift = p * -2;           // em upward
    const tilt = p * 3.5;            // degrees: straight when merged → tilted when apart
    const scaleDown = 1 - (1 - p) * 0.02; // very slight scale when merged

    l.style.transform = `translate3d(${currentX}%, ${yShift}em, 0px) scale3d(${scaleDown}, ${scaleDown}, 1) rotateZ(${-tilt}deg)`;
    r.style.transform = `translate3d(${-currentX}%, ${yShift}em, 0px) scale3d(${scaleDown}, ${scaleDown}, 1) rotateZ(${tilt}deg)`;

    /* Center content: fade-in + scale-up after 35% progress (cards need to separate first) */
    const cf = Math.max(0, Math.min(1, (p - 0.35) / 0.4));
    c.style.opacity = String(cf);
    c.style.transform = `scale(${0.85 + cf * 0.15}) translateY(${(1 - cf) * 24}px)`;
  }, []);

  useEffect(() => {
    const handler = () => requestAnimationFrame(tick);
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', handler);
      window.removeEventListener('resize', handler);
    };
  }, [tick]);

  return (
    <section className="bg-[#050505] -mt-4">
      {/* tall wrapper = scroll-capture zone */}
      <div ref={wrapperRef} className="md:h-[280vh]">
        <div className="md:sticky md:top-0 md:h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
          <div
            className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6
                        flex flex-col md:block gap-6 md:gap-0 md:min-h-[85vh]"
          >
            {/* ── LEFT CARD ── */}
            <div
              ref={leftRef}
              className="soft_animation_card relative md:absolute md:top-[1.5%] md:bottom-[1.5%] md:left-[4%] w-full md:w-[37%]
                         bg-[#0c1118] border border-white/[0.06] rounded-2xl overflow-hidden z-10"
              style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transformOrigin: '100% 50%',
                perspectiveOrigin: '100% 50%',
              }}
            >
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col min-h-0 sm:min-h-[400px]">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-black text-white tracking-tight mb-6 sm:mb-8">
                  Collaboration Process
                </h3>
                <div className="flex-1 flex items-center justify-center">
                  <CollaborationCircle />
                </div>
              </div>
            </div>

            {/* ── CENTER (revealed between cards) ── */}
            <div
              ref={centerRef}
              className="md:absolute md:inset-0 flex flex-col items-center justify-center
                         pointer-events-none order-last md:order-none py-6 md:py-0"
              style={{ zIndex: 0 }}
            >
              {/* Company logo (inverted to white) */}
              <div className="mb-17">
                <Image
                  src="/images/aadugaadu-logo.jpeg"
                  alt="Aadugaadu logo"
                  width={100}
                  height={100}
                  className="invert brightness-0 invert-[1] opacity-90"
                  style={{ filter: 'invert(1) brightness(2)' }}
                />
              </div>

              <h2 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center leading-[1.05] mb-4 sm:mb-8">
                Trust the
                <br />
                process
              </h2>

              {/* vertical separator */}
              <div className="w-px h-10 sm:h-20 bg-white/20 mb-4 sm:mb-8" />

              {/* CTA */}
              <Link
                href="/contact"
                className="pointer-events-auto flex items-center gap-4 text-white text-xl font-semibold
                           hover:text-violet-300 transition-colors"
              >
                Brief us
                <span className="w-11 h-11 rounded-full bg-violet-500 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>

            {/* ── RIGHT CARD ── */}
            <div
              ref={rightRef}
              className="soft_animation_card relative md:absolute md:top-[1.5%] md:bottom-[1.5%] md:right-[4%] w-full md:w-[37%]
                         bg-[#0c1118] border border-white/[0.06] rounded-2xl overflow-hidden z-10"
              style={{
                willChange: 'transform',
                transformStyle: 'preserve-3d',
                transformOrigin: '0% 50%',
                perspectiveOrigin: '0% 50%',
              }}
            >
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 h-full flex flex-col min-h-0 sm:min-h-[400px]">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.5rem] font-black text-white tracking-tight mb-6 sm:mb-8">
                  Software Production
                </h3>
                <div className="flex-1 flex items-center justify-center">
                  <ProductionVModel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   Collaboration circle diagram  (left card)
   5 numbered steps arranged around a circle with arrow
   ═══════════════════════════════════════════════════════════ */
function CollaborationCircle() {
  const cx = 200;
  const cy = 210;
  const r = 115;

  const steps: { num: string; label: string[]; angle: number }[] = [
    { num: '01', label: ['Collecting', 'Feedback'], angle: 230 },
    { num: '02', label: ['Deploying', 'to staging'], angle: 335 },
    { num: '03', label: ['Testing'], angle: 55 },
    { num: '04', label: ['Development'], angle: 140 },
    { num: '05', label: ['Sprint', 'Planning'], angle: 185 },
  ];

  const pos = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.sin(rad), y: cy - r * Math.cos(rad) };
  };

  /* Arrow between step 05 and 01 (short gap on the circle) */
  const a1 = pos(210); // start of arrow (near 05)
  const a2 = pos(224); // end of arrow (approaching 01)

  return (
    <svg
      viewBox="0 0 400 430"
      className="w-full h-full max-w-[320px]"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker
          id="circArrow"
          viewBox="0 0 10 10"
          refX="10"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M0 1 L9 5 L0 9Z" fill="rgba(255,255,255,0.35)" />
        </marker>
      </defs>

      {/* Main circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke="rgba(255,255,255,0.12)"
        fill="none"
        strokeWidth="1.5"
      />

      {/* Directional arrow between 05 → 01 */}
      <line
        x1={a1.x}
        y1={a1.y}
        x2={a2.x}
        y2={a2.y}
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        markerEnd="url(#circArrow)"
      />

      {/* Step badges + labels */}
      {steps.map((s, i) => {
        const p = pos(s.angle);
        return (
          <g key={i}>
            {/* White numbered badge */}
            <circle cx={p.x} cy={p.y} r={20} fill="white" />
            <text
              x={p.x}
              y={p.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="12"
              fontWeight="700"
              fill="#0c1118"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {s.num}.
            </text>

            {/* Labels below badge */}
            {s.label.map((line, li) => (
              <text
                key={li}
                x={p.x}
                y={p.y + 36 + li * 16}
                textAnchor="middle"
                fontSize="12"
                fontWeight="500"
                fill="white"
                fillOpacity="0.85"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   Software Production V-Model diagram  (right card)
   9 steps connected by lines forming a classic V-shape
   ═══════════════════════════════════════════════════════════ */
function ProductionVModel() {
  const pts: {
    x: number;
    y: number;
    label: string[];
    anchor: 'start' | 'end' | 'middle';
    lx: number;
  }[] = [
    { x: 120, y: 42,  label: ['Requirement', 'Gathering'],   anchor: 'end',    lx: -14 },
    { x: 130, y: 104, label: ['System', 'Analysis'],         anchor: 'end',    lx: -14 },
    { x: 145, y: 166, label: ['Architecture', 'Design'],     anchor: 'end',    lx: -14 },
    { x: 160, y: 228, label: ['Module', 'Design'],           anchor: 'end',    lx: -14 },
    { x: 200, y: 335, label: ['Coding'],                     anchor: 'middle', lx: 0   },
    { x: 270, y: 255, label: ['Unit', 'Testing'],            anchor: 'start',  lx: 14  },
    { x: 300, y: 193, label: ['Integration', 'Testing'],     anchor: 'start',  lx: 14  },
    { x: 318, y: 131, label: ['System', 'Testing'],          anchor: 'start',  lx: 14  },
    { x: 330, y: 69,  label: ['Acceptance', 'Testing'],      anchor: 'start',  lx: 14  },
  ];

  return (
    <svg
      viewBox="0 0 460 380"
      className="w-full h-full max-w-[380px]"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* V-shape connecting lines */}
      {pts.map((p, i) => {
        if (i === 0) return null;
        return (
          <line
            key={`v${i}`}
            x1={pts[i - 1].x}
            y1={pts[i - 1].y}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Horizontal correspondence lines (dashed) */}
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1={pts[i].x}
          y1={pts[i].y}
          x2={pts[8 - i].x}
          y2={pts[8 - i].y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
      ))}

      {/* Dots + labels */}
      {pts.map((p, i) => {
        const lineH = 15;
        const total = p.label.length;
        /* centre multi-line label on the dot; special case for 'Coding' which goes below */
        const baseY =
          i === 4
            ? p.y + 22
            : p.y - ((total - 1) * lineH) / 2 + 4;

        return (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4.5} fill="white" fillOpacity={0.7} />
            {p.label.map((line, li) => (
              <text
                key={li}
                x={p.x + p.lx}
                y={baseY + li * lineH}
                textAnchor={p.anchor}
                fontSize="12"
                fontWeight="500"
                fill="white"
                fillOpacity="0.8"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}
