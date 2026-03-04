'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';
import { getFeaturedProjects } from '@/lib/api';
import type { Project } from '@/types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedProjects()
      .then((res) => setProjects(res.data?.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  // Fallback sample projects if no data
  const displayProjects: Project[] = projects.length > 0 ? projects : [
    {
      _id: '1',
      title: 'AI-Powered Analytics Dashboard',
      description: 'Real-time business intelligence platform with NLP insights and predictive analytics.',
      services: ['AI Solutions'],
      technologies: ['Next.js', 'Python', 'TensorFlow', 'MongoDB'],
      featured: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '2',
      title: 'OTT Streaming Platform',
      description: 'Full-scale video streaming app with DRM protection, CDN delivery and subscription billing.',
      services: ['OTT Platforms'],
      technologies: ['React', 'Node.js', 'AWS', 'Stripe'],
      featured: true,
      createdAt: '',
      updatedAt: '',
    },
    {
      _id: '3',
      title: 'Flutter E-Commerce App',
      description: 'Cross-platform mobile shopping app with AR product preview and real-time inventory.',
      services: ['Flutter & Mobile'],
      technologies: ['Flutter', 'Dart', 'Firebase', 'Razorpay'],
      featured: true,
      createdAt: '',
      updatedAt: '',
    },
  ];

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

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {displayProjects.slice(0, 3).map((project, i) => (
              <FadeIn key={project._id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-zinc-950 border border-white/5 hover:border-violet-500/30 rounded-2xl p-7 h-full transition-all duration-300 cursor-pointer"
                >
                  {/* Service tag */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services?.slice(0, 1).map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-violet-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies?.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-xs bg-white/5 text-zinc-400 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
