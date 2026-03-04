'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import dynamic from 'next/dynamic';

const LiquidEther = dynamic(() => import('@/components/animations/LiquidEther'), { ssr: false });
const SplineRobot = dynamic(() => import('@/components/animations/SplineRobot'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] flex items-center justify-center"><div className="w-12 h-12 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" /></div>,
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* LiquidEther WebGL background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Slight darkening overlay so text stays readable */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/80 pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full pt-24 sm:pt-32 pb-0 pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div className="pointer-events-auto flex flex-col justify-center min-h-[50vh] lg:min-h-[70vh]">
            <FadeIn delay={0.1}>
              <h1
                className="font-black leading-[0.95] tracking-[0.04em] mb-6 sm:mb-10"
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                }}
              >
                <span className="text-glass">
                  AI-Powered
                </span>
                <br />
                <span
                  className="text-gradient drop-shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                  style={{
                    WebkitTextStroke: '0.5px rgba(167,139,250,0.3)',
                  }}
                >
                  Digital
                </span>{' '}
                <span className="text-glass">Engineering</span>
                <br />
                <span className="text-glass">&</span>{' '}
                <span className="text-glass">Software</span>
                <br />
                <span
                  className="text-gradient drop-shadow-[0_0_40px_rgba(124,58,237,0.3)]"
                  style={{
                    WebkitTextStroke: '0.5px rgba(167,139,250,0.3)',
                  }}
                >
                  Craftsmanship
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-2 sm:gap-3 items-center mb-6 sm:mb-8">
                {['Machine Learning', 'Full Stack', 'Cloud Native', 'Mobile Apps'].map((tag, i) => (
                  <span
                    key={i}
                    className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/[0.08] text-zinc-500 bg-white/[0.02] backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full hover:bg-violet-500 hover:text-white transition-all duration-300 text-sm"
                >
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 font-medium px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all duration-300 text-sm"
                >
                  View Case Studies
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right - Interactive 3D Robot */}
          <div className="hidden lg:block pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-[700px] -mt-20 -mr-10 -mb-32"
              style={{ transform: 'scale(1.2)', transformOrigin: 'center bottom' }}
            >
              <SplineRobot />
            </motion.div>
          </div>
        </div>

        {/* Bottom tech strip */}
        <FadeIn delay={0.6}>
          <div className="mt-10 sm:mt-20 pt-6 sm:pt-10 border-t border-white/[0.04]">
            <div className="flex items-center gap-4 sm:gap-8 overflow-hidden">
              <p className="text-zinc-600 text-xs sm:text-base font-semibold uppercase tracking-widest whitespace-nowrap shrink-0 hidden sm:block">Tech Stack</p>
              <div className="flex gap-6 sm:gap-10 animate-marquee-slow">
                {['Next.js', 'React', 'Flutter', 'Node.js', 'Python', 'MongoDB', 'Kotlin', 'TensorFlow', 'AWS', 'Docker', 'TypeScript', 'Firebase',
                  'Next.js', 'React', 'Flutter', 'Node.js', 'Python', 'MongoDB', 'Kotlin', 'TensorFlow', 'AWS', 'Docker', 'TypeScript', 'Firebase',
                ].map((tech, i) => (
                  <span key={i} className="text-zinc-500 text-xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
