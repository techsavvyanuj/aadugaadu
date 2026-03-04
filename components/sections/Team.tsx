'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/animations/FadeIn';
import { getTeamMembers } from '@/lib/api';
import type { TeamMember } from '@/types';

const fallbackTeam: TeamMember[] = [
  {
    _id: '1',
    name: 'Anuj Mishra',
    role: 'Founder & CEO',
    bio: 'Full-stack developer & AI enthusiast. Building the future one commit at a time.',
    expertise: ['AI/ML', 'React', 'Node.js', 'System Design'],
  },
];

export default function Team() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers()
      .then((res) => setTeam(res.data?.data || []))
      .catch(() => setTeam([]))
      .finally(() => setLoading(false));
  }, []);

  const displayTeam = team.length > 0 ? team : fallbackTeam;

  return (
    <section className="bg-zinc-950 py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">People</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Meet the Team</h2>
            <p className="text-zinc-400 text-lg max-w-lg mx-auto">
              Passionate engineers, designers, and problem solvers behind every product.
            </p>
          </div>
        </FadeIn>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {displayTeam.map((member, i) => (
              <FadeIn key={member._id} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-black border border-white/5 hover:border-violet-500/30 rounded-2xl p-6 text-center transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white text-xl font-black mx-auto mb-4">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-white font-bold text-base">{member.name}</h3>
                  <p className="text-violet-400 text-sm font-medium mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-zinc-500 text-xs leading-relaxed mb-4">{member.bio}</p>
                  )}
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.expertise?.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 text-xs bg-white/5 text-zinc-400 rounded-full">
                        {skill}
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
