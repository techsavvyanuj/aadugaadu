import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const footerLinks = {
  Menu: [
    { label: 'Projects', href: '/projects' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Services: [
    { label: 'AI Development', href: '/services#ai' },
    { label: 'Web Development', href: '/services#fullstack' },
    { label: 'Flutter & Mobile', href: '/services#flutter' },
    { label: 'OTT Platforms', href: '/services#ott' },
    { label: 'Android Development', href: '/services#android' },
    { label: 'Cloud & DevOps', href: '/services#cloud' },
  ],
  Technologies: [
    { label: 'React & Next.js', href: '/services#fullstack' },
    { label: 'Node.js', href: '/services#fullstack' },
    { label: 'Flutter', href: '/services#flutter' },
    { label: 'Python & AI', href: '/services#ai' },
    { label: 'MongoDB', href: '/services#fullstack' },
  ],
  Connect: [
    { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
    { label: 'GitHub', href: 'https://github.com', external: true },
    { label: 'Twitter', href: 'https://twitter.com', external: true },
    { label: 'Instagram', href: 'https://instagram.com', external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.04]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-8 sm:gap-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 flex items-center justify-center text-white font-black text-xs">
                A
              </div>
              <span className="font-bold text-white text-base">aadugaadu</span>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mb-6">
              AI, web, mobile & OTT technologies excellence. Engineering intelligent digital products from idea to launch.
            </p>
            <a href="mailto:hello@aadugaadu.com" className="text-zinc-400 hover:text-white text-sm transition-colors">
              hello@aadugaadu.com
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-5">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={'external' in link ? '_blank' : undefined}
                      rel={'external' in link ? 'noopener noreferrer' : undefined}
                      className="group inline-flex items-center gap-1 text-zinc-500 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                      {'external' in link && (
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-zinc-700 text-xs uppercase tracking-wider">
            {new Date().getFullYear()} AADUGAADU®. ALL RIGHTS RESERVED.
          </p>
          <p className="text-zinc-700 text-xs">
            Built with precision by the Aadugaadu team
          </p>
        </div>
      </div>
    </footer>
  );
}
