'use client';

import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import StatsMarquee from '@/components/sections/StatsMarquee';
import CTASection from '@/components/sections/CTASection';
import ElectricBorder from '@/components/animations/ElectricBorder';
import { motion } from 'framer-motion';
import { Rocket, Brain, Handshake, Globe, Linkedin, Github, Twitter } from 'lucide-react';

const values = [
  { icon: Rocket, title: 'Ship Fast', desc: 'We move with urgency. Ideas turn into products at startup speed without compromising quality.', gradient: 'from-violet-500/20 to-transparent' },
  { icon: Brain, title: 'Think Deep', desc: 'We obsess over the right solution, not just any solution. Architecture matters.', gradient: 'from-fuchsia-500/20 to-transparent' },
  { icon: Handshake, title: 'Client First', desc: "Your success is our success. We treat every project like it's our own business.", gradient: 'from-cyan-500/20 to-transparent' },
  { icon: Globe, title: 'Build Global', desc: 'We build for scale from day one — products that work for 100 users or 10 million.', gradient: 'from-amber-500/20 to-transparent' },
];

const timeline = [
  { year: '2025', title: 'Founded', desc: 'Started with a bold vision to build intelligent digital products that make a difference.' },
  { year: '2025', title: 'First AI Product', desc: 'Delivered our first AI-powered platform for a startup within months of founding.' },
  { year: '2025', title: 'Team Growth', desc: 'Rapidly expanded to 10+ engineers across AI, web, and mobile development.' },
  { year: '2025', title: 'Global Clients', desc: 'Started working with clients across 3 continents, building products that scale.' },
  { year: '2026', title: 'Scaling Up', desc: 'Launching OTT platforms and enterprise AI solutions at massive scale.' },
];

const founders = [
  {
    name: 'Anuj Mishra',
    role: 'Founder & CEO',
    bio: 'Visionary leader driving Aadugaadu\'s mission to build intelligent digital products. Passionate about AI, architecture, and creating impact at scale.',
    initials: 'AM',
    image: '/images/anuj-mishra.png',
    imageScale: '1.15',
    imagePosition: '45% 35%',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  {
    name: 'Nikhil Sahu',
    role: 'Co-Founder & CTO',
    bio: 'Tech architect leading engineering excellence across AI, full-stack, and mobile platforms. Turns complex problems into elegant solutions easily and precisely.',
    initials: 'NS',
    image: '/images/nikhil-sahu.png',
    imageScale: '1.0',
    imagePosition: '45% 30%',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    name: 'Harendra Singh',
    role: 'Co-Founder & COO',
    bio: 'Operations strategist ensuring seamless projects delivery and client success. Bridges the gap between technology and business outcomes efficiently.',
    initials: 'SH',
    image: '/images/harendra-singh.jpg',
    imageScale: '1.0',
    imagePosition: '33% 50%',
    gradient: 'from-amber-600 to-orange-600',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero — Split: Text left, Image right */}
      <section className="relative bg-[#050505] min-h-screen flex items-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/3 w-[800px] h-[800px] bg-violet-600/[0.04] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/[0.03] rounded-full blur-[120px]" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center py-24 sm:py-32 lg:py-0">
          {/* Left — Text */}
          <FadeIn direction="left">
            <div className="lg:pr-8">
              <span className="inline-block text-violet-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-6 border border-violet-500/20 rounded-full px-4 py-1.5">
                About Us
              </span>
              <h1
                className="text-white leading-[0.95] mb-6 sm:mb-8"
                style={{
                  fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                }}
              >
                We are{' '}
                <span className="text-gradient">Aadugaadu</span>
              </h1>
              <p className="text-zinc-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10">
                A software development company engineering intelligent, scalable, and beautiful
                digital products across AI, web, mobile, and OTT platforms.
              </p>

              {/* Quick stats row */}
              <div className="flex gap-6 sm:gap-8 md:gap-12">
                {[
                  { value: 'Est. 2025', label: 'Founded' },
                  { value: '10+', label: 'Engineers' },
                  { value: '3+', label: 'Continents' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-black">{s.value}</p>
                    <p className="text-zinc-600 text-xs uppercase tracking-wider mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right — Team Image */}
          <FadeIn direction="right" delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: -1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="relative group cursor-pointer"
              style={{ perspective: '1000px' }}
            >
              {/* Glow behind image */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/10 to-cyan-600/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/50 group-hover:border-violet-500/20 transition-all duration-500">
                <Image
                  src="/images/team-office.png"
                  alt="Aadugaadu Team"
                  width={700}
                  height={467}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Overlay text on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-bold text-lg">Our Vision</p>
                  <p className="text-zinc-300 text-sm">Building the future, one product at a time.</p>
                </div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-2 border-r-2 border-violet-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-2 border-l-2 border-violet-500/30 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#050505] py-16 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="left">
            <div>
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Our Story</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-6 sm:mb-8 leading-tight">
                Born from a passion for{' '}
                <span className="text-gradient">great software</span>
              </h2>
              <div className="space-y-5">
                <p className="text-zinc-500 leading-relaxed">
                  Aadugaadu was born in 2025 from a simple belief — that great software can change the world.
                  Founded by engineers who were tired of mediocre products, we set out to build a company
                  that truly cares about craft.
                </p>
                <p className="text-zinc-500 leading-relaxed">
                  From our first AI project to building full-scale OTT platforms, we&apos;ve stayed committed
                  to one thing: delivering products that work, scale, and delight users.
                </p>
                <p className="text-zinc-500 leading-relaxed">
                  Today, Aadugaadu is a growing team of engineers and designers working with startups,
                  enterprises, and visionary founders across the globe.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50+', label: 'Projects Delivered' },
                { value: '30+', label: 'Happy Clients' },
                { value: '1+', label: 'Year of Excellence' },
                { value: '10+', label: 'Team Members' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-5 sm:p-7 text-center group hover:border-violet-500/20 transition-colors duration-300"
                >
                  <p className="text-2xl sm:text-4xl font-black text-white mb-1.5">{stat.value}</p>
                  <p className="text-zinc-600 text-xs uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#050505] py-16 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Journey</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3">Our Timeline</h2>
            </div>
          </FadeIn>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-violet-600/20 to-transparent" />
            {timeline.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative pl-12 pb-12 last:pb-0">
                  <div className="absolute left-[11px] top-1 w-[10px] h-[10px] rounded-full bg-violet-600 ring-4 ring-violet-600/20" />
                  <span className="text-violet-400 text-xs font-bold tracking-wider">{item.year}</span>
                  <h3 className="text-white font-bold text-lg mt-1 mb-1.5">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Team */}
      <section className="bg-[#050505] py-16 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="text-center mb-12 sm:mb-20">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Leadership</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-4">
                Meet the <span className="text-gradient">Founders</span>
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto">
                The visionaries behind Aadugaadu — united by a mission to build exceptional software.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto overflow-hidden">
            {founders.map((founder, i) => (
              <FadeIn key={founder.name} delay={i * 0.15}>
                <ElectricBorder
                  color={i === 0 ? '#7c3aed' : i === 1 ? '#06b6d4' : '#f59e0b'}
                  speed={0.8}
                  chaos={0.08}
                  borderRadius={20}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-[#0a0a0a] rounded-[20px] p-6 sm:p-8 h-full flex flex-col items-center text-center group cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className={`w-28 h-40 rounded-full bg-gradient-to-br ${founder.gradient} flex items-center justify-center mb-6 ring-4 ring-white/[0.05] group-hover:ring-white/[0.1] transition-all duration-500 group-hover:scale-110 overflow-hidden relative p-1`}>
                      {founder.image ? (
                        <div className="w-full h-full rounded-full overflow-hidden bg-black/20">
                          <Image
                            src={founder.image}
                            alt={founder.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                            style={{ 
                              transform: `scale(${founder.imageScale || '1.15'})`,
                              objectPosition: founder.imagePosition || '50% 35%'
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-white text-2xl font-black tracking-wider">{founder.initials}</span>
                      )}
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-white font-black text-xl mb-1 tracking-tight">{founder.name}</h3>
                    <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.15em] mb-5">{founder.role}</p>

                    {/* Bio */}
                    <p className="text-zinc-500 text-sm leading-relaxed flex-1 mb-6">{founder.bio}</p>

                    {/* Social Icons */}
                    <div className="flex gap-3">
                      {[Linkedin, Github, Twitter].map((Icon, j) => (
                        <motion.a
                          key={j}
                          href="#"
                          whileHover={{ scale: 1.15, y: -2 }}
                          className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300"
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </ElectricBorder>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#050505] py-16 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="text-center mb-10 sm:mb-16">
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Values</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-4">What Drives Us</h2>
              <p className="text-zinc-500 max-w-lg mx-auto">
                These are the values that guide every decision, every line of code, every product we ship.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-8 group relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${v.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <v.icon className="w-6 h-6 text-violet-400 mb-5" />
                    <h3 className="text-white font-bold text-base mb-2.5">{v.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <StatsMarquee />
      <CTASection />
    </>
  );
}
