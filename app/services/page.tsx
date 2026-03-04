'use client';

import FadeIn from '@/components/animations/FadeIn';
import CTASection from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import { Bot, Code2, Smartphone, Tv, TabletSmartphone, Cloud, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

const services = [
  {
    icon: Bot,
    title: 'AI Development',
    desc: 'Custom AI/ML models, LLM integration, intelligent automation, and AI-powered SaaS platforms that transform how businesses operate.',
    tags: ['Machine Learning', 'LLM Integration', 'AI Agents', 'Computer Vision', 'NLP'],
    gradient: 'from-violet-500/20 to-transparent',
  },
  {
    icon: Code2,
    title: 'Full Stack Web',
    desc: 'High-performance web applications built with modern frameworks. From MVPs to enterprise platforms with pixel-perfect UI.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
    gradient: 'from-fuchsia-500/20 to-transparent',
  },
  {
    icon: Smartphone,
    title: 'Flutter Development',
    desc: 'Beautiful, natively compiled applications for iOS and Android from a single codebase. Fast development, native performance.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Cross-Platform', 'Material Design'],
    gradient: 'from-cyan-500/20 to-transparent',
  },
  {
    icon: TabletSmartphone,
    title: 'Android Development',
    desc: 'Native Android applications with Kotlin and Jetpack Compose. Optimized for performance and modern Android standards.',
    tags: ['Kotlin', 'Jetpack Compose', 'Room DB', 'Coroutines', 'MVVM'],
    gradient: 'from-emerald-500/20 to-transparent',
  },
  {
    icon: Tv,
    title: 'OTT Platforms',
    desc: 'End-to-end streaming platforms with DRM, adaptive bitrate, multi-device support, and content management systems.',
    tags: ['Video Streaming', 'HLS/DASH', 'DRM', 'CDN', 'CMS'],
    gradient: 'from-amber-500/20 to-transparent',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps',
    desc: 'Cloud infrastructure, CI/CD pipelines, containerization, and auto-scaling architectures for maximum uptime and efficiency.',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    gradient: 'from-rose-500/20 to-transparent',
  },
];

const process = [
  { step: '01', title: 'Discovery', desc: 'We deeply understand your vision, users, and business goals through collaborative workshops.' },
  { step: '02', title: 'Architecture', desc: 'We design the system architecture, tech stack, and project roadmap before writing a line of code.' },
  { step: '03', title: 'Build & Iterate', desc: 'Agile sprints with continuous delivery. You see progress every week with working software.' },
  { step: '04', title: 'Launch & Scale', desc: 'We deploy, monitor, and optimize — then help you scale as your product grows.' },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#050505] pt-20 sm:pt-40 pb-10 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-600/[0.03] rounded-full blur-[120px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-violet-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5 border border-violet-500/20 rounded-full px-4 py-1.5">
                What We Offer
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-5 sm:mb-8">
                Our <span className="text-gradient">Services</span>
              </h1>
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                From AI-powered systems to OTT streaming platforms — we engineer complete digital products that scale.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#050505] py-10 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <FadeIn key={service.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 sm:p-8 h-full group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <service.icon className="w-6 sm:w-7 h-6 sm:h-7 text-violet-400 mb-4 sm:mb-6" />
                    <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3">{service.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-white/[0.03] rounded-full border border-white/[0.04]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#050505] py-10 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-20">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Process</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">How We Work</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {process.map((p, i) => (
              <FadeIn key={p.step} delay={i * 0.1}>
                <div className="glass-card rounded-2xl p-8">
                  <span className="text-violet-600/60 text-5xl font-black">{p.step}</span>
                  <h3 className="text-white font-bold text-lg mt-4 mb-2.5">{p.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
