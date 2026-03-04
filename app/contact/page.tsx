'use client';

import FadeIn from '@/components/animations/FadeIn';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, ArrowUpRight, Send } from 'lucide-react';
import { useContactForm } from '@/hooks/useContactForm';

const contactInfo = [
  { icon: Mail, label: 'Email Us', value: 'info.aadugaadu@gmail.com', href: 'mailto:info.aadugaadu@gmail.com' },
  { icon: MapPin, label: 'Location', value: 'India — Remote Worldwide', href: null },
  { icon: Clock, label: 'Response Time', value: 'Within 24 hours', href: null },
];

export default function ContactPage() {
  const { formData, status, handleChange, handleSubmit } = useContactForm();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#050505] pt-20 sm:pt-40 pb-10 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 right-1/4 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-violet-600/[0.03] rounded-full blur-[120px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-violet-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 sm:mb-5 border border-violet-500/20 rounded-full px-4 py-1.5">
                Contact
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] mb-5 sm:mb-8">
                Let&apos;s <span className="text-gradient">Talk</span>
              </h1>
              <p className="text-zinc-500 text-lg sm:text-xl leading-relaxed">
                Have a project in mind? We&apos;d love to hear about it. Drop us a line and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-[#050505] py-10 sm:py-28 px-4 sm:px-6 border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 sm:gap-16">
          {/* Left - Info */}
          <FadeIn direction="left">
            <div>
              <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">Get In Touch</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3 mb-4 sm:mb-5">
                Start your project with us
              </h2>
              <p className="text-zinc-500 leading-relaxed mb-12">
                Whether you need AI development, a mobile app, a web platform, or a full OTT solution —
                we&apos;re here to help turn your vision into reality.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
                      <item.icon className="w-4.5 h-4.5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-zinc-600 text-xs font-bold uppercase tracking-wider mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white text-sm hover:text-violet-400 transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <div className="mt-10 sm:mt-14">
                <p className="text-zinc-600 text-xs font-bold uppercase tracking-wider mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="px-4 py-2 text-xs font-semibold text-zinc-500 bg-white/[0.03] border border-white/[0.06] rounded-full hover:bg-white/[0.06] hover:text-white transition-all duration-200"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right - Form */}
          <FadeIn direction="right">
            <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-5 sm:p-8 md:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors"
                  placeholder="Your company (optional)"
                />
              </div>

              <div className="mb-5">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                  Service Interested In
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-violet-500/40 transition-colors appearance-none"
                >
                  <option value="" className="bg-zinc-900">Select a service</option>
                  <option value="ai" className="bg-zinc-900">AI Development</option>
                  <option value="web" className="bg-zinc-900">Full Stack Web</option>
                  <option value="flutter" className="bg-zinc-900">Flutter Development</option>
                  <option value="android" className="bg-zinc-900">Android Development</option>
                  <option value="ott" className="bg-zinc-900">OTT Platform</option>
                  <option value="cloud" className="bg-zinc-900">Cloud & DevOps</option>
                  <option value="other" className="bg-zinc-900">Other</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="text-zinc-500 text-xs font-bold uppercase tracking-wider block mb-2">
                  Project Details
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white text-sm placeholder:text-zinc-700 focus:outline-none focus:border-violet-500/40 transition-colors resize-none"
                  placeholder="Tell us about your project, timeline, and budget..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-bold text-sm py-4 rounded-xl hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <p className="text-emerald-400 text-sm text-center mt-4">
                  Message sent! We&apos;ll get back to you within 24 hours.
                </p>
              )}
              {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-4">
                  Something went wrong. Please email us directly.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
