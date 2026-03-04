'use client';

import FadeIn from '@/components/animations/FadeIn';
import { stats } from '@/lib/constants';

export default function Stats() {
  return (
    <section className="bg-zinc-950 border-y border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.1}>
              <div>
                <p className="text-4xl sm:text-5xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-zinc-500 text-sm font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
