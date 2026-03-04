'use client';

import FadeIn from '@/components/animations/FadeIn';
import { useContactForm } from '@/hooks/useContactForm';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Contact() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <section className="bg-[#050505] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <FadeIn direction="left">
            <div>
              <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">Contact</span>
              <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-6">
                Let&apos;s Build Something Great
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10">
                Got a project idea? Want to collaborate? Or just want to say hi?
                We&apos;d love to hear from you.
              </p>

              <div className="flex flex-col gap-5">
                {[
                  { icon: '📧', label: 'Email', value: 'hello@aadugaadu.com' },
                  { icon: '📍', label: 'Location', value: 'India (Remote Worldwide)' },
                  { icon: '⚡', label: 'Response Time', value: 'Within 24 hours' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-lg">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-zinc-500 text-xs">{item.label}</p>
                      <p className="text-white text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Name</label>
                  <input
                    name="name" value={formData.name} onChange={handleChange} required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Email</label>
                  <input
                    name="email" type="email" value={formData.email} onChange={handleChange} required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">Message</label>
                <textarea
                  name="message" value={formData.message} onChange={handleChange} required rows={5}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              {status === 'success' && (
                <p className="text-emerald-400 text-sm text-center">Message sent! We&apos;ll get back to you within 24 hours.</p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
              )}

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-bold text-sm py-4 rounded-xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
              </motion.button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
