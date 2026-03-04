'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface OrbitItem {
  icon: React.ReactNode;
  label: string;
  popupContent?: React.ReactNode;
}

interface OrbitImagesProps {
  items: OrbitItem[];
  radiusX?: number;
  radiusY?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  responsive?: boolean;
  className?: string;
  centerContent?: React.ReactNode;
}

interface ItemPosition {
  x: number;
  y: number;
  scale: number;
  zIndex: number;
  opacity: number;
}

export default function OrbitImages({
  items,
  radiusX = 480,
  radiusY = 130,
  rotation = -6,
  duration = 35,
  itemSize = 72,
  responsive = true,
  className = '',
  centerContent,
}: OrbitImagesProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [positions, setPositions] = useState<ItemPosition[]>([]);
  const progressRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);
  const pausedRef = useRef(false);
  const [rScale, setRScale] = useState(1);

  /* ── Responsive scaling ── */
  useEffect(() => {
    if (!responsive) return;
    const update = () => {
      const w = window.innerWidth;
      setRScale(w < 480 ? 0.38 : w < 640 ? 0.48 : w < 768 ? 0.58 : w < 1024 ? 0.72 : 1);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [responsive]);

  /* ── Sync pause state ── */
  useEffect(() => {
    pausedRef.current = hoveredIdx !== null;
  }, [hoveredIdx]);

  /* ── Animation loop ── */
  useEffect(() => {
    const n = items.length;
    if (n === 0) return;

    const speed = (2 * Math.PI) / (duration * 1000);
    const rotRad = (rotation * Math.PI) / 180;
    const cosR = Math.cos(rotRad);
    const sinR = Math.sin(rotRad);

    const tick = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        progressRef.current += speed * dt;
      }

      const newPos: ItemPosition[] = [];
      for (let i = 0; i < n; i++) {
        const angle = ((2 * Math.PI) / n) * i + progressRef.current;
        const ex = radiusX * Math.cos(angle);
        const ey = radiusY * Math.sin(angle);
        const rx = ex * cosR - ey * sinR;
        const ry = ex * sinR + ey * cosR;
        const depth = (Math.sin(angle) + 1) / 2; // 0 = back · 1 = front
        newPos.push({
          x: rx * rScale,
          y: ry * rScale,
          scale: 0.55 + 0.45 * depth,
          zIndex: Math.round(depth * 100),
          opacity: 0.25 + 0.75 * depth,
        });
      }
      setPositions(newPos);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [items.length, radiusX, radiusY, rotation, duration, rScale]);

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: '100%',
        maxWidth: (radiusX * 2 + itemSize + 80) * rScale,
        height: (radiusY * 2 + itemSize + 60) * rScale + 120,
      }}
    >
      {/* Center content (e.g. 3D model) */}
      {centerContent && (
        <div
          className="absolute pointer-events-auto"
          style={{
            left: '50%',
            top: '38%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
          }}
        >
          {centerContent}
        </div>
      )}

      {items.map((item, i) => {
        const pos = positions[i];
        if (!pos) return null;
        const isHovered = hoveredIdx === i;
        const sz = itemSize * rScale;

        return (
          <div
            key={`orbit-${i}`}
            className="absolute"
            style={{
              left: '50%',
              top: '38%',
              transform: `translate(${pos.x - sz / 2}px, ${pos.y - sz / 2}px) scale(${isHovered ? 1.25 : pos.scale})`,
              zIndex: isHovered ? 200 : pos.zIndex,
              opacity: isHovered ? 1 : pos.opacity,
              width: sz,
              height: sz,
              transition: 'transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s ease',
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Icon */}
            <div
              className={`w-full h-full rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 ${
                isHovered
                  ? 'ring-2 ring-violet-400/60 shadow-[0_0_30px_rgba(124,58,237,0.3)]'
                  : ''
              }`}
            >
              {item.icon}
            </div>

            {/* Popup — on desktop: below icon; on mobile: fixed center */}
            {isHovered && item.popupContent && (
              <>
                {/* Desktop popup */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 animate-in fade-in slide-in-from-top-2 duration-200 hidden sm:block"
                  style={{ zIndex: 300 }}
                >
                  {item.popupContent}
                </div>
                {/* Mobile popup - fixed positioned */}
                <div
                  className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-in fade-in duration-200 sm:hidden"
                  style={{ zIndex: 1000 }}
                >
                  {item.popupContent}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
