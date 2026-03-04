'use client';

import Spline from '@splinetool/react-spline';
import { useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

export default function SplineRobot() {
  const onLoad = useCallback((splineApp: Application) => {
    // Remove "Built with Spline" watermark
    const canvas = splineApp.canvas as HTMLCanvasElement;
    const parent = canvas?.parentElement;
    if (parent) {
      const logos = parent.querySelectorAll('a, div[style*="position: absolute"]');
      logos.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.textContent?.includes('Spline') || htmlEl.querySelector('img')) {
          htmlEl.style.display = 'none';
        }
      });
    }
  }, []);

  return (
    <div className="w-full h-full min-h-[650px] relative overflow-visible">
      <Spline
        scene="https://prod.spline.design/lR4pb7BrSgFgWR8P/scene.splinecode"
        onLoad={onLoad}
      />
      {/* Cover the watermark area */}
      <div className="absolute bottom-0 right-0 w-40 h-14 bg-[#050505] z-10 pointer-events-none" />
    </div>
  );
}
