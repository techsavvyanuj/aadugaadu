'use client';

import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ArrowUpRight, Cpu, Globe, Smartphone, Cloud, Palette } from 'lucide-react';
import Link from 'next/link';
import FadeIn from '@/components/animations/FadeIn';

/* ── Project data ── */
const projects = [
  {
    name: 'AI Analytics',
    year: '2024',
    headline: 'Intelligent business insights powered by machine learning',
    description:
      'End-to-end AI analytics platform that transforms raw data into actionable insights. Custom ML models for predictive analytics, customer segmentation, and automated reporting.',
    tags: ['AI / ML', 'Web Platform', 'Data Analytics', 'B2B'],
    href: '/services#ai',
    accent: '#a78bfa',
    icon: Cpu,
    stats: { metric: '40%', label: 'Faster Insights' },
    techStack: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    codeSnippet: 'model.predict(data)',
  },
  {
    name: 'Enterprise SaaS',
    year: '2024',
    headline: 'Scalable cloud platform for modern enterprises',
    description:
      'Full-stack SaaS platform built with Next.js and Node.js. Real-time collaboration, role-based access, multi-tenant architecture, and seamless third-party integrations.',
    tags: ['Web Dev', 'Cloud Native', 'Next.js', 'SaaS'],
    href: '/services#fullstack',
    accent: '#60a5fa',
    icon: Globe,
    stats: { metric: '99.9%', label: 'Uptime SLA' },
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'AWS'],
    codeSnippet: 'deploy --scale=auto',
  },
  {
    name: 'Mobile Commerce',
    year: '2023',
    headline: 'Cross-platform mobile app with seamless checkout',
    description:
      'Flutter-based mobile commerce application for iOS and Android. Push notifications, in-app payments, real-time inventory sync, and native-quality animations.',
    tags: ['Flutter', 'Mobile', 'Firebase', 'D2C'],
    href: '/services#flutter',
    accent: '#34d399',
    icon: Smartphone,
    stats: { metric: '4.8★', label: 'App Rating' },
    techStack: ['Flutter', 'Dart', 'Firebase', 'Stripe'],
    codeSnippet: 'flutter build --release',
  },
  {
    name: 'Cloud Infrastructure',
    year: '2023',
    headline: 'Zero-downtime deployment pipeline & DevOps automation',
    description:
      'Containerized microservices architecture on AWS with CI/CD pipelines, auto-scaling, monitoring dashboards, and infrastructure-as-code for maximum reliability.',
    tags: ['DevOps', 'AWS', 'Docker & K8s', 'B2B'],
    href: '/services',
    accent: '#fb923c',
    icon: Cloud,
    stats: { metric: '0s', label: 'Downtime' },
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'AWS'],
    codeSnippet: 'kubectl apply -f prod',
  },
  {
    name: 'Design System',
    year: '2023',
    headline: 'Cohesive brand identity & component-driven design',
    description:
      'Complete design system with reusable components, design tokens, accessibility standards, and interactive prototypes. From brand strategy to pixel-perfect implementation.',
    tags: ['UI/UX', 'Design System', 'Brand', 'Prototyping'],
    href: '/services',
    accent: '#f472b6',
    icon: Palette,
    stats: { metric: '200+', label: 'Components' },
    techStack: ['Figma', 'Storybook', 'Tailwind', 'React'],
    codeSnippet: '<Button variant="primary" />',
  },
];

/* ── Animated Tech Grid Background (SVG-based) ── */
function TechGridBg({ accent, activeIndex }: { accent: string; activeIndex: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Scanning line */}
      <div
        className="absolute left-0 right-0 h-px transition-all duration-1000"
        style={{
          top: `${20 + activeIndex * 15}%`,
          background: `linear-gradient(90deg, transparent, ${accent}40, transparent)`,
          boxShadow: `0 0 20px ${accent}20`,
        }}
      />

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${2 + (i % 3)}px`,
            height: `${2 + (i % 3)}px`,
            background: accent,
            opacity: 0.15 + (i % 5) * 0.05,
            left: `${8 + (i * 7.5) % 85}%`,
            top: `${5 + (i * 13) % 90}%`,
            animation: `craftFloat ${3 + (i % 4)}s ease-in-out ${i * 0.3}s infinite alternate`,
          }}
        />
      ))}

      {/* Corner circuit lines */}
      <svg className="absolute top-0 left-0 w-40 h-40 opacity-[0.06]" viewBox="0 0 160 160">
        <path d="M0,40 L40,40 L40,80 L80,80" fill="none" stroke={accent} strokeWidth="1" className="craft-circuit-draw" />
        <circle cx="40" cy="40" r="3" fill={accent} className="craft-node-pulse" />
        <circle cx="80" cy="80" r="3" fill={accent} className="craft-node-pulse" style={{ animationDelay: '0.5s' }} />
      </svg>
      <svg className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.06] rotate-180" viewBox="0 0 160 160">
        <path d="M0,40 L40,40 L40,80 L80,80" fill="none" stroke={accent} strokeWidth="1" className="craft-circuit-draw" />
        <circle cx="40" cy="40" r="3" fill={accent} className="craft-node-pulse" />
        <circle cx="80" cy="80" r="3" fill={accent} className="craft-node-pulse" style={{ animationDelay: '0.5s' }} />
      </svg>
    </div>
  );
}

/* ── Animated Counter ── */
function AnimatedMetric({ value, isActive }: { value: string; isActive: boolean }) {
  const [displayed, setDisplayed] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isActive) return;
    setIsAnimating(true);
    const chars = '0123456789%★+.s';
    let frame = 0;
    const maxFrames = 8;
    const interval = setInterval(() => {
      if (frame >= maxFrames) {
        setDisplayed(value);
        setIsAnimating(false);
        clearInterval(interval);
        return;
      }
      setDisplayed(
        value
          .split('')
          .map((ch, i) => (i <= frame ? ch : chars[Math.floor(Math.random() * chars.length)]))
          .join('')
      );
      frame++;
    }, 60);
    return () => clearInterval(interval);
  }, [isActive, value]);

  return (
    <span className={`font-mono transition-all duration-300 ${isAnimating ? 'opacity-80' : 'opacity-100'}`}>
      {displayed}
    </span>
  );
}

/* ── Typing code effect ── */
function TypingCode({ code, isActive }: { code: string; isActive: boolean }) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!isActive) {
      setDisplayed('');
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      if (i >= code.length) {
        clearInterval(interval);
        return;
      }
      setDisplayed(code.slice(0, i + 1));
      i++;
    }, 50);
    return () => clearInterval(interval);
  }, [isActive, code]);

  return (
    <span className="font-mono text-xs">
      <span className="text-zinc-500">$ </span>
      <span className="text-emerald-400/80">{displayed}</span>
      <span className="animate-pulse text-white/60">▌</span>
    </span>
  );
}

/* ── Orbital ring around the icon ── */
function OrbitalRing({ accent, isActive }: { accent: string; isActive: boolean }) {
  return (
    <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
      <div
        className="absolute inset-[-8px] rounded-full border border-dashed craft-orbit-spin"
        style={{ borderColor: `${accent}25` }}
      />
      <div
        className="absolute inset-[-16px] rounded-full border border-dotted craft-orbit-spin-reverse"
        style={{ borderColor: `${accent}15` }}
      />
      {/* Orbiting dot */}
      <div
        className="absolute w-2 h-2 rounded-full craft-orbit-dot"
        style={{
          background: accent,
          boxShadow: `0 0 8px ${accent}`,
          top: '-10px',
          left: '50%',
          marginLeft: '-4px',
        }}
      />
    </div>
  );
}

export default function Craftsmanship() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const prevIndexRef = useRef(0);

  /* Scroll-driven active detection */
  useEffect(() => {
    const handleScroll = () => {
      const windowH = window.innerHeight;
      let closest = 0;
      let closestDist = Infinity;

      projectRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - windowH * 0.45);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      if (closest !== prevIndexRef.current) {
        prevIndexRef.current = closest;
        setActiveIndex(closest);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Card mouse tracking for 3D tilt */
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  const cardTransform = useMemo(() => {
    if (!isCardHovered) return 'perspective(800px) rotateX(0deg) rotateY(0deg)';
    return `perspective(800px) rotateX(${-mousePos.y * 6}deg) rotateY(${mousePos.x * 6}deg)`;
  }, [isCardHovered, mousePos]);

  const activeProject = projects[activeIndex];
  const ActiveIcon = activeProject.icon;

  return (
    <section
      ref={sectionRef}
      className="relative py-0"
      style={{ background: '#161618' }}
    >
      {/* Animated tech grid background */}
      <TechGridBg accent={activeProject.accent} activeIndex={activeIndex} />

      {/* Section header */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 pt-10 sm:pt-28 pb-6 sm:pb-16">
        <FadeIn>
          <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.25em] mb-4">
            What We Do
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6">
            Our craftsmanship
          </h2>
          <p className="text-zinc-500 text-base leading-relaxed max-w-lg">
            Aadugaadu excels in many types of expertise and services: from AI development
            to web and mobile proficiency. From custom software development to consultancy.
            From strategy to end-to-end product delivery.
          </p>
        </FadeIn>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-4 sm:px-8 pb-10 sm:pb-28">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-20">
          {/* Left — scrollable project list */}
          <div className="flex-1 lg:max-w-[50%]">
            {projects.map((project, i) => {
              const isActive = activeIndex === i;
              const isHovered = hoveredIndex === i;
              return (
                <div
                  key={project.name}
                  ref={(el) => { projectRefs.current[i] = el; }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated separator line */}
                  <div className="relative h-px">
                    <div className="absolute inset-0 bg-white/[0.06]" />
                    <div
                      className="absolute inset-y-0 left-0 transition-all duration-700 ease-out"
                      style={{
                        width: isActive ? '100%' : isHovered ? '60%' : '0%',
                        background: `linear-gradient(90deg, ${project.accent}60, transparent)`,
                      }}
                    />
                  </div>

                  <div
                    className="relative py-4 sm:py-12 transition-all duration-500 cursor-pointer group"
                    style={{
                      opacity: isActive ? 1 : isHovered ? 0.8 : 0.35,
                      transform: isActive ? 'translateX(8px)' : 'translateX(0px)',
                    }}
                  >
                    {/* Active indicator bar */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-full transition-all duration-500"
                      style={{
                        height: isActive ? '40px' : '0px',
                        background: project.accent,
                        boxShadow: isActive ? `0 0 12px ${project.accent}60` : 'none',
                      }}
                    />

                    {/* Name — since — arrow row */}
                    <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-5">
                      {/* Icon badge */}
                      <div
                        className="relative w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500"
                        style={{
                          background: isActive ? `${project.accent}15` : 'transparent',
                          border: `1px solid ${isActive ? `${project.accent}30` : 'transparent'}`,
                        }}
                      >
                        <project.icon
                          className="w-4 h-4 transition-all duration-500"
                          style={{ color: isActive ? project.accent : '#71717a' }}
                        />
                      </div>

                      <span
                        className="font-bold text-lg tracking-tight transition-colors duration-500"
                        style={{ color: isActive ? project.accent : '#ffffff' }}
                      >
                        {project.name}
                      </span>
                      <span className="flex-1 h-px bg-white/[0.08]" />
                      <span className="text-zinc-500 text-sm font-medium font-mono">
                        {project.year}
                      </span>
                      <Link href={project.href}>
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: isHovered ? `${project.accent}15` : 'transparent',
                            border: `1px solid ${isHovered ? `${project.accent}30` : 'rgba(255,255,255,0.08)'}`,
                          }}
                        >
                          <ArrowUpRight
                            className="w-3.5 h-3.5 transition-all duration-300"
                            style={{
                              color: isHovered ? project.accent : '#71717a',
                              transform: isHovered ? 'translate(1px, -1px)' : 'translate(0,0)',
                            }}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Headline */}
                    <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold leading-snug mb-3 sm:mb-4 max-w-md">
                      {project.headline}
                    </h3>

                    {/* Tags as pills */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full font-medium transition-all duration-500"
                          style={{
                            color: isActive ? project.accent : '#71717a',
                            background: isActive ? `${project.accent}10` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isActive ? `${project.accent}20` : 'rgba(255,255,255,0.05)'}`,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Tech stack row — visible on active */}
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{
                        maxHeight: isActive ? '60px' : '0px',
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? '12px' : '0px',
                      }}
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-zinc-600 font-mono">stack:</span>
                        {project.techStack.map((tech, ti) => (
                          <span
                            key={tech}
                            className="text-zinc-400 font-mono transition-all"
                            style={{ animationDelay: `${ti * 100}ms` }}
                          >
                            {tech}{ti < project.techStack.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bottom separator */}
            <div className="h-px bg-white/[0.06]" />

            {/* Explore link */}
            <div className="py-10">
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-semibold transition-colors"
              >
                <span className="relative">
                  Explore all services
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-violet-400 group-hover:w-full transition-all duration-300" />
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right — sticky interactive card (desktop only, mobile gets inline badge) */}
          <div className="hidden lg:block lg:w-[45%]">
            <div className="sticky" style={{ top: '12vh' }}>
                {/* 3D tilt card */}
                <div
                  ref={cardRef}
                  className="relative w-full rounded-2xl overflow-hidden border border-white/[0.06] transition-all duration-500"
                  style={{
                    aspectRatio: '4/5',
                    transform: cardTransform,
                    transformStyle: 'preserve-3d',
                    background: '#1a1a1c',
                  }}
                  onMouseMove={handleCardMouseMove}
                  onMouseEnter={() => setIsCardHovered(true)}
                  onMouseLeave={() => { setIsCardHovered(false); setMousePos({ x: 0, y: 0 }); }}
                >
                  {/* Animated gradient blobs */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute w-[300px] h-[300px] rounded-full blur-[100px] transition-all duration-1000"
                      style={{
                        background: `${activeProject.accent}18`,
                        top: '10%',
                        left: '20%',
                        animation: 'craftBlob1 6s ease-in-out infinite alternate',
                      }}
                    />
                    <div
                      className="absolute w-[200px] h-[200px] rounded-full blur-[80px] transition-all duration-1000"
                      style={{
                        background: `${activeProject.accent}12`,
                        bottom: '20%',
                        right: '10%',
                        animation: 'craftBlob2 5s ease-in-out infinite alternate-reverse',
                      }}
                    />
                  </div>

                  {/* Grid overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.03] transition-opacity duration-500"
                    style={{
                      backgroundImage: `
                        linear-gradient(${activeProject.accent}30 1px, transparent 1px),
                        linear-gradient(90deg, ${activeProject.accent}30 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Spotlight effect that follows mouse */}
                  {isCardHovered && (
                    <div
                      className="absolute w-[300px] h-[300px] rounded-full pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle, ${activeProject.accent}12, transparent 70%)`,
                        left: `${(mousePos.x + 1) / 2 * 100}%`,
                        top: `${(mousePos.y + 1) / 2 * 100}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    />
                  )}

                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center" style={{ transform: 'translateZ(30px)' }}>
                    {/* Icon with orbital rings */}
                    <div className="relative w-20 h-20 mb-8">
                      <div
                        className="absolute inset-0 rounded-2xl flex items-center justify-center transition-all duration-700"
                        style={{
                          background: `${activeProject.accent}12`,
                          border: `1px solid ${activeProject.accent}25`,
                          boxShadow: `0 0 40px ${activeProject.accent}15, inset 0 0 20px ${activeProject.accent}08`,
                        }}
                      >
                        <ActiveIcon className="w-8 h-8 transition-all duration-700" style={{ color: activeProject.accent }} />
                      </div>
                      <OrbitalRing accent={activeProject.accent} isActive={true} />
                    </div>

                    {/* Animated number */}
                    <div className="mb-2">
                      <span
                        className="text-[5rem] font-black leading-none transition-all duration-700 select-none"
                        style={{
                          WebkitTextStroke: `1.5px ${activeProject.accent}40`,
                          WebkitTextFillColor: 'transparent',
                          filter: `drop-shadow(0 0 20px ${activeProject.accent}15)`,
                        }}
                      >
                        0{activeIndex + 1}
                      </span>
                    </div>

                    {/* Project name */}
                    <h4
                      className="text-xl font-bold mb-2 transition-all duration-700"
                      style={{ color: activeProject.accent }}
                    >
                      {activeProject.name}
                    </h4>

                    {/* Stat badge */}
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 transition-all duration-700"
                      style={{
                        background: `${activeProject.accent}08`,
                        border: `1px solid ${activeProject.accent}15`,
                      }}
                    >
                      <span className="text-2xl font-black" style={{ color: activeProject.accent }}>
                        <AnimatedMetric value={activeProject.stats.metric} isActive={true} />
                      </span>
                      <span className="text-zinc-500 text-xs font-medium">{activeProject.stats.label}</span>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-[260px] mb-6">
                      {activeProject.description}
                    </p>

                    {/* Terminal-style code snippet */}
                    <div
                      className="w-full max-w-[240px] rounded-lg overflow-hidden transition-all duration-700"
                      style={{
                        background: 'rgba(0,0,0,0.4)',
                        border: `1px solid ${activeProject.accent}15`,
                      }}
                    >
                      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/[0.05]">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                        <div className="w-2 h-2 rounded-full bg-green-500/50" />
                        <span className="text-[9px] text-zinc-600 ml-2 font-mono">terminal</span>
                      </div>
                      <div className="px-3 py-2.5">
                        <TypingCode code={activeProject.codeSnippet} isActive={true} />
                      </div>
                    </div>
                  </div>

                  {/* Scanning line on card */}
                  <div
                    className="absolute left-0 right-0 h-px pointer-events-none craft-scan-line"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${activeProject.accent}30, transparent)`,
                    }}
                  />

                  {/* Corner circuit accents */}
                  <svg className="absolute top-4 left-4 w-12 h-12 transition-all duration-700" viewBox="0 0 48 48">
                    <path d="M0,16 L16,16 L16,0" fill="none" stroke={`${activeProject.accent}40`} strokeWidth="1" />
                    <circle cx="16" cy="16" r="2" fill={activeProject.accent} className="craft-node-pulse" />
                  </svg>
                  <svg className="absolute bottom-4 right-4 w-12 h-12 transition-all duration-700" viewBox="0 0 48 48">
                    <path d="M48,32 L32,32 L32,48" fill="none" stroke={`${activeProject.accent}40`} strokeWidth="1" />
                    <circle cx="32" cy="32" r="2" fill={activeProject.accent} className="craft-node-pulse" style={{ animationDelay: '1s' }} />
                  </svg>

                  {/* Progress dots at bottom */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    {projects.map((p, i) => (
                      <div
                        key={i}
                        className="relative transition-all duration-500"
                        style={{
                          width: activeIndex === i ? '24px' : '6px',
                          height: '6px',
                          borderRadius: '3px',
                          background: activeIndex === i ? p.accent : 'rgba(255,255,255,0.1)',
                          boxShadow: activeIndex === i ? `0 0 8px ${p.accent}50` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>{/* closes card */}
            </div>{/* closes sticky */}
          </div>{/* closes right column */}
        </div>{/* closes flex */}
      </div>{/* closes max-w container */}

      {/* CSS animations */}
      <style jsx>{`
        @keyframes craftFloat {
          0% { transform: translateY(0px) scale(1); opacity: 0.15; }
          100% { transform: translateY(-20px) scale(1.5); opacity: 0.3; }
        }
        @keyframes craftBlob1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 20px) scale(1.2); }
        }
        @keyframes craftBlob2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-20px, -30px) scale(1.3); }
        }
        .craft-circuit-draw {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: craftDraw 3s ease forwards infinite;
        }
        @keyframes craftDraw {
          0% { stroke-dashoffset: 200; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
        .craft-node-pulse {
          animation: craftPulse 2s ease-in-out infinite;
        }
        @keyframes craftPulse {
          0%, 100% { opacity: 0.3; r: 2; }
          50% { opacity: 1; r: 4; }
        }
        .craft-orbit-spin {
          animation: craftSpin 12s linear infinite;
        }
        .craft-orbit-spin-reverse {
          animation: craftSpin 18s linear infinite reverse;
        }
        .craft-orbit-dot {
          animation: craftOrbitDot 4s linear infinite;
        }
        @keyframes craftSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes craftOrbitDot {
          from { transform: rotate(0deg) translateY(-28px); }
          to { transform: rotate(360deg) translateY(-28px); }
        }
        .craft-scan-line {
          animation: craftScan 4s ease-in-out infinite;
        }
        @keyframes craftScan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
