'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Smartphone } from 'lucide-react';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

interface FeaturedProject {
  _id: string;
  title: string;
  client: string;
  description: string;
  category: string;
  technologies: string[];
  gradient: string;
  thumbnail?: string;
  playStoreUrls?: { label: string; url: string }[];
  websiteUrl?: string;
}

const featuredProjects: FeaturedProject[] = [
  {
    _id: '1',
    title: 'UDrive',
    client: 'UDrive Pvt. Ltd.',
    category: 'Flutter & Mobile',
    description:
      'End-to-end ride-hailing platform for UDrive Pvt. Ltd. — a rider app for booking and tracking, and a driver app for vehicle registration & earnings. Both live on Google Play.',
    technologies: ['Flutter', 'Firebase', 'Google Maps', 'Node.js', 'Razorpay'],
    gradient: 'from-violet-600 to-indigo-700',
    playStoreUrls: [
      {
        label: 'Rider',
        url: 'https://play.google.com/store/apps/details?id=com.udrive.ridertaxiapp.taxiapp&hl=en_IN',
      },
      {
        label: 'Driver',
        url: 'https://play.google.com/store/apps/details?id=com.sizh.rideon.driverridebook.taxiapp&hl=en_IN',
      },
    ],
  },
  {
    _id: '2',
    title: 'Movie Ocean',
    client: 'Aadugaadu (Own Product)',
    category: 'OTT Platform',
    description:
      'A full-scale OTT streaming app designed and developed by Aadugaadu. Users can watch movies, live shows, and web series — with smooth playback and a rich content library.',
    technologies: ['Flutter', 'React', 'Node.js', 'HLS', 'AWS'],
    gradient: 'from-cyan-600 to-blue-700',
    playStoreUrls: [
      {
        label: 'Android',
        url: 'https://play.google.com/store/apps/details?id=com.webtimemovieocean.app&hl=en_IN',
      },
    ],
  },
  {
    _id: '3',
    title: 'MadBus',
    client: 'MadBus Services Pvt. Ltd.',
    category: 'Web Platform',
    description:
      'An end-to-end bus booking web platform for MadBus Services Pvt. Ltd. Search routes, compare seats, book tickets, and manage travel plans — all in one fast, responsive platform.',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'TypeScript'],
    gradient: 'from-amber-500 to-orange-700',
    websiteUrl: 'https://www.madbus.in',
  },
];

export default function Projects() {
  return (
    <section className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
            <div>
              <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Our Work</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3">
                Featured Projects
              </h2>
            </div>
            <Button href="/projects" variant="outline">
              All Projects →
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProjects.map((project, i) => (
            <FadeIn key={project._id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="group bg-zinc-950 border border-white/5 hover:border-violet-500/30 rounded-2xl overflow-hidden h-full transition-all duration-300 cursor-pointer flex flex-col"
              >
                {/* ── Thumbnail ── */}
                <div className="relative w-full aspect-[16/8] bg-zinc-900 overflow-hidden">
                  {project.thumbnail ? (
                    <Image
                      src={project.thumbnail}
                      alt={`${project.title} preview`}
                      fill
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 flex items-center justify-center`}>
                      <span className="text-white/20 text-5xl font-black select-none">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  {/* Fade bottom */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent" />
                </div>

                {/* ── Content ── */}
                <div className="p-7 flex flex-col flex-1">
                  {/* Category tag */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-0.5 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-600 text-[11px] font-medium mb-3">
                    {project.client}
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs bg-white/5 text-zinc-400 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Live links */}
                  <div className="flex gap-2 mt-auto">
                    {project.playStoreUrls?.map((ps) => (
                      <a
                        key={ps.url}
                        href={ps.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all duration-200"
                      >
                        <Smartphone className="w-3 h-3" />
                        {ps.label}
                      </a>
                    ))}
                    {project.websiteUrl && (
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white hover:text-black text-zinc-400 text-xs font-medium transition-all duration-200"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Live Site
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
