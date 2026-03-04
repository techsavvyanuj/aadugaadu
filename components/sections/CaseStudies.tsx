'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import ScrollStack from '@/components/animations/ScrollStack';
import { caseStudies } from '@/lib/constants';

export default function CaseStudies() {
  return (
    <section className="bg-[#050505] py-28 px-6">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Portfolio
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Few successes among many
            </h2>
          </div>
        </FadeIn>

        {/* Scroll‑stacking cards */}
        <ScrollStack stickyTop={100} cardGap={30}>
          {caseStudies.map((study, i) => (
            <div
              key={i}
              className="group relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Gradient background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${study.gradient} opacity-85 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Pattern overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />

              {/* Content */}
              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest bg-black/25 backdrop-blur-sm rounded-full text-white/90 mb-5">
                    {study.category}
                  </span>
                  <h3 className="text-white text-3xl sm:text-4xl lg:text-5xl font-black mb-4 max-w-2xl">
                    {study.title}
                  </h3>
                  <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl">
                    {study.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs font-semibold uppercase tracking-[0.2em]">
                    Case Study
                  </span>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ScrollStack>

        {/* View all */}
        <FadeIn delay={0.3}>
          <div className="text-center mt-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              View all projects
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
