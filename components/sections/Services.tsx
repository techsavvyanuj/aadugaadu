'use client';

import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import { services } from '@/lib/constants';

export default function Services() {
  return (
    <section className="bg-black py-28 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">What We Do</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
              Our Services
            </h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              End-to-end digital solutions that scale. We cover every layer of the modern tech stack.
            </p>
          </div>
        </FadeIn>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <FadeIn key={service.id} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(139,92,246,0.4)' }}
                className="group relative bg-zinc-950 border border-white/5 rounded-2xl p-7 h-full transition-all duration-300 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-violet-600/0 group-hover:from-violet-600/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

                <div className="relative z-10">
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-5">{service.description}</p>

                  <ul className="flex flex-col gap-1.5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-zinc-400 text-xs">
                        <span className="w-1 h-1 rounded-full bg-violet-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
