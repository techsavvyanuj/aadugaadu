'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Smartphone } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import CTASection from '@/components/sections/CTASection';

/* Lazy-load the WebGL component so it never SSRs */
const FlyingPosters = dynamic(
  () => import('@/components/animations/FlyingPosters'),
  { ssr: false }
);

const TextPressure = dynamic(
  () => import('@/components/animations/TextPressure'),
  { ssr: false }
);

/* ──────── Project data ──────── */

interface RealProject {
  title: string;
  client: string;
  category: string;
  desc: string;
  tags: string[];
  gradient: string;
  year: string;
  thumbnail?: string;
  playStoreUrls?: { label: string; url: string }[];
  websiteUrl?: string;
}

const projects: RealProject[] = [
  {
    title: 'UDrive — Rider App',
    client: 'UDrive Pvt. Ltd.',
    category: 'Flutter & Mobile',
    desc: 'A full-featured ride-booking platform for passengers. Book rides, track drivers in real-time, manage payments, and view ride history — all in a seamless, native-quality Flutter experience.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Razorpay'],
    gradient: 'from-violet-600 to-indigo-700',
    year: '2024',
    playStoreUrls: [
      { label: 'Rider App', url: 'https://play.google.com/store/apps/details?id=com.udrive.ridertaxiapp.taxiapp&hl=en_IN' },
    ],
  },
  {
    title: 'UDrive — Driver App',
    client: 'UDrive Pvt. Ltd.',
    category: 'Flutter & Mobile',
    desc: 'The companion driver-side app. Drivers register their vehicle, go online/offline, accept ride requests, track earnings, and navigate to pickup points. Built with Flutter for Android & iOS.',
    tags: ['Flutter', 'Dart', 'Firebase', 'Google Maps', 'Node.js'],
    gradient: 'from-fuchsia-600 to-violet-700',
    year: '2024',
    playStoreUrls: [
      { label: 'Driver App', url: 'https://play.google.com/store/apps/details?id=com.sizh.rideon.driverridebook.taxiapp&hl=en_IN' },
    ],
  },
  {
    title: 'Movie Ocean',
    client: 'Aadugaadu (Own Product)',
    category: 'OTT Platform',
    desc: 'A full-scale OTT streaming platform — movies, live shows, and web series. Designed and developed end-to-end by Aadugaadu, from architecture to deployment.',
    tags: ['React', 'Node.js', 'Flutter', 'HLS Streaming', 'AWS'],
    gradient: 'from-cyan-600 to-blue-700',
    year: '2024',
    playStoreUrls: [
      { label: 'Android App', url: 'https://play.google.com/store/apps/details?id=com.webtimemovieocean.app&hl=en_IN' },
    ],
  },
  {
    title: 'MadBus',
    client: 'MadBus Services Pvt. Ltd.',
    category: 'Web Platform',
    desc: 'End-to-end bus booking web platform. Search routes, compare seats, book tickets, and manage travel — all within a responsive, fast, and intuitive web experience.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'TypeScript'],
    gradient: 'from-amber-500 to-orange-700',
    year: '2024',
    websiteUrl: 'https://www.madbus.in',
  },
  {
    title: 'BuildVeritas',
    client: 'BuildVeritas',
    category: 'AI & Web',
    desc: 'Website for an AI-automated construction company. A premium, modern aesthetic that communicates trust, innovation, and technical authority in the construction sector.',
    tags: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    gradient: 'from-emerald-600 to-teal-700',
    year: '2025',
    websiteUrl: 'https://www.buildveritas.in',
  },
  {
    title: 'Unik Naturals',
    client: 'Unik Naturals',
    category: 'E-Commerce',
    desc: 'A clean and elegant e-commerce website for a skincare and cosmetics brand. Browse, add to cart, and purchase natural beauty products with a smooth shopping experience.',
    tags: ['React', 'Node.js', 'MongoDB', 'Razorpay', 'CSS3'],
    gradient: 'from-rose-500 to-pink-700',
    year: '2024',
    websiteUrl: 'https://uniknaturals.com',
  },
];

/* Poster images — placeholders for now; replace with real thumbnails */
const posterImages = projects.map(
  (_, i) => `https://picsum.photos/seed/aadugaadu${i}/600/600`
);

/* ──────── Page ──────── */

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleActiveChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Only enable poster scroll when showcase section is 80%+ in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeProject = projects[activeIndex] || projects[0];

  return (
    <>
      {/* ── Hero — fills its own viewport ── */}
      <section className="relative bg-[#050505] h-screen flex flex-col px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-600/[0.03] rounded-full blur-[120px]" />

        {/* Main hero content — upper portion, centered */}
        <div className="flex-1 flex items-center justify-center relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-violet-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5 border border-violet-500/20 rounded-full px-4 py-1.5">
                Portfolio
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-5 sm:mb-8">
                Our <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                Real products. Real impact. Scroll through our live work below.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* SCROLL HERE + arrow — pinned to bottom of hero, seam between sections */}
        <div className="relative z-10 mt-8">
          <div style={{ position: 'relative', height: '160px' }}>
            <TextPressure
              text="SCROLL HERE"
              flex
              alpha={false}
              stroke={false}
              width
              weight
              italic
              textColor="#ffffff"
              strokeColor="#5227FF"
              minFontSize={28}
            />
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="flex justify-center py-8"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <motion.path
                d="M18 6 L18 28 M9 20 L18 29 L27 20"
                stroke="rgba(167,139,250,0.8)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </div>
      </section>

      <section
        ref={sectionRef}
        className="relative bg-[#050505] h-screen overflow-hidden hidden lg:grid"
        style={{ gridTemplateColumns: '340px 1fr 340px' }}
      >
        {/* LEFT — Project details */}
        <div className="flex items-center px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="space-y-5"
            >
              <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r ${activeProject.gradient} text-white`}>
                {activeProject.category}
              </span>

              <h2 className="text-white text-3xl xl:text-4xl font-black leading-tight">
                {activeProject.title}
              </h2>

              <p className="text-zinc-600 text-xs font-medium">
                Client — <span className="text-zinc-400">{activeProject.client}</span>
              </p>

              <p className="text-zinc-500 text-sm leading-relaxed">
                {activeProject.desc}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {activeProject.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-white/[0.04] rounded-full border border-white/[0.06]">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER — FlyingPosters canvas */}
        <div className="relative h-full">
          <FlyingPosters
            items={posterImages}
            planeWidth={280}
            planeHeight={280}
            distortion={2.3}
            scrollEase={0.05}
            cameraFov={43}
            cameraZ={16}
            onActiveChange={handleActiveChange}
            enabled={isSectionVisible}
          />
          {/* Edge fades */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </div>

        {/* RIGHT — Year + live links */}
        <div className="flex items-center justify-end px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="text-right space-y-6"
            >
              <div>
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest mb-1">Year</p>
                <p className="text-white text-5xl font-black font-mono">{activeProject.year}</p>
              </div>

              {/* Live links */}
              <div className="flex flex-col items-end gap-3 pt-4">
                {activeProject.playStoreUrls?.map((ps) => (
                  <a
                    key={ps.url}
                    href={ps.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all duration-200"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    {ps.label}
                  </a>
                ))}
                {activeProject.websiteUrl && (
                  <a
                    href={activeProject.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Visit Website
                  </a>
                )}
              </div>

              {/* Project counter */}
              <p className="text-zinc-700 text-sm font-mono pt-4">
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Mobile showcase (below lg) ── */}
      <section className="lg:hidden bg-[#050505] overflow-hidden">
        <div className="h-[70vh] relative">
          <FlyingPosters
            items={posterImages}
            planeWidth={260}
            planeHeight={260}
            distortion={2.3}
            scrollEase={0.05}
            cameraFov={43}
            cameraZ={16}
            onActiveChange={handleActiveChange}
            enabled={true}
          />
          <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
        </div>
        <div className="px-6 pb-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="max-w-lg mx-auto space-y-4 pt-6"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r ${activeProject.gradient} text-white`}>
                  {activeProject.category}
                </span>
                <span className="text-zinc-700 text-xs font-mono">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>

              <h2 className="text-white text-2xl font-black">{activeProject.title}</h2>
              <p className="text-zinc-600 text-xs">Client — <span className="text-zinc-400">{activeProject.client}</span></p>
              <p className="text-zinc-500 text-sm leading-relaxed">{activeProject.desc}</p>

              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500 bg-white/[0.04] rounded-full border border-white/[0.06]">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-2">
                {activeProject.playStoreUrls?.map((ps) => (
                  <a key={ps.url} href={ps.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all">
                    <Smartphone className="w-3 h-3" />{ps.label}
                  </a>
                ))}
                {activeProject.websiteUrl && (
                  <a href={activeProject.websiteUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all">
                    <ExternalLink className="w-3 h-3" />Live Site
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <CTASection />
    </>
  );
}
