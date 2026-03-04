'use client';

import FadeIn from '@/components/animations/FadeIn';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

const projects = [
  {
    title: 'AI Analytics Platform',
    category: 'AI Development',
    desc: 'Enterprise AI platform with real-time analytics, predictive modeling, and automated reporting for data-driven decision making.',
    tags: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    gradient: 'from-violet-600 to-violet-800',
    year: '2024',
  },
  {
    title: 'FinTech Mobile App',
    category: 'Flutter Development',
    desc: 'Cross-platform financial management app with real-time portfolio tracking, budgeting tools, and secure payment integration.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
    gradient: 'from-fuchsia-600 to-fuchsia-800',
    year: '2024',
  },
  {
    title: 'StreamVerse OTT',
    category: 'OTT Platform',
    desc: 'Full-featured OTT streaming platform with DRM protection, adaptive streaming, multi-device sync, and content management.',
    tags: ['React', 'Node.js', 'HLS', 'AWS'],
    gradient: 'from-cyan-600 to-cyan-800',
    year: '2024',
  },
  {
    title: 'E-Commerce Engine',
    category: 'Full Stack',
    desc: 'Scalable e-commerce platform with headless CMS, AI-powered recommendations, and real-time inventory management.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Redis'],
    gradient: 'from-emerald-600 to-emerald-800',
    year: '2023',
  },
  {
    title: 'HealthTech Dashboard',
    category: 'AI + Web',
    desc: 'Patient monitoring dashboard with AI-driven diagnostics, real-time vitals tracking, and automated health reports.',
    tags: ['React', 'Python', 'FastAPI', 'TensorFlow'],
    gradient: 'from-amber-600 to-amber-800',
    year: '2023',
  },
  {
    title: 'Logistics Tracker',
    category: 'Android Development',
    desc: 'Native Android fleet tracking system with real-time GPS, route optimization, and delivery management for logistics companies.',
    tags: ['Kotlin', 'Jetpack Compose', 'Maps SDK', 'Firebase'],
    gradient: 'from-rose-600 to-rose-800',
    year: '2023',
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#050505] pt-20 sm:pt-40 pb-10 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 left-1/3 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-600/[0.03] rounded-full blur-[120px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-violet-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5 border border-violet-500/20 rounded-full px-4 py-1.5">
                Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-5 sm:mb-8">
                Our <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                Real products. Real impact. Here&apos;s a selection of what we&apos;ve built.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-[#050505] py-10 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {projects.map((project, i) => (
              <FadeIn key={project.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl overflow-hidden h-full"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500`} />

                  <div className="relative glass-card rounded-2xl p-6 sm:p-8 md:p-10 h-full flex flex-col">
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400 bg-violet-500/10 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <span className="text-zinc-600 text-xs font-mono">{project.year}</span>
                    </div>

                    {/* Content */}
                    <h3 className="text-white text-2xl sm:text-3xl font-black mb-3 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 flex-1">
                      {project.desc}
                    </p>

                    {/* Tags + link */}
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-white/[0.03] rounded-full border border-white/[0.04]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 shrink-0"
                      >
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-black transition-colors" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
