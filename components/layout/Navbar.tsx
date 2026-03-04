'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  /* Seek to last frame on mount, play on hover */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekToEnd = () => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration - 0.01;
      }
    };

    if (hovering) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
      seekToEnd();
    }
  }, [hovering]);

  /* On initial load, seek to last frame */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onLoaded = () => {
      if (video.duration && isFinite(video.duration)) {
        video.currentTime = video.duration - 0.01;
      }
    };
    video.addEventListener('loadedmetadata', onLoaded);
    if (video.readyState >= 1) onLoaded();
    return () => video.removeEventListener('loadedmetadata', onLoaded);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.06] ${
          scrolled
            ? 'shadow-2xl shadow-black/50'
            : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-[60px] sm:h-[72px] flex items-center justify-between">
          {/* Logo - Video that plays on hover, rests on first frame */}
          <Link
            href="/"
            className="flex items-center group overflow-hidden relative"
            onClick={() => setMenuOpen(false)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{ height: '44px' }}
          >
            <video
              ref={videoRef}
              src="/images/AADUGAADU5.mp4"
              muted
              loop
              playsInline
              className="h-40 sm:h-60 object-cover"
              style={{
                filter: ' brightness(2)',
                clipPath: 'inset(20% 0 20% 0)',
                width: '100%',
              }}
              draggable={false}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-[14px] font-medium transition-all duration-300 rounded-full ${
                  pathname === link.href
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.07] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 bg-white text-black text-[13px] font-semibold pl-5 pr-4 py-2.5 rounded-full hover:bg-violet-500 hover:text-white transition-all duration-300"
            >
              Let&apos;s Start
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden relative w-10 h-10 flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-3.5 flex flex-col justify-between">
              <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block h-[1.5px] bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
            </div>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-3xl font-bold py-3 transition-colors ${
                      pathname === link.href ? 'text-white' : 'text-zinc-500 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-3.5 rounded-full text-base"
                >
                  Let&apos;s Start
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
