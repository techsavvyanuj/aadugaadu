'use client';

export default function LogoMarquee() {
  const logos = [
    'TechVista', 'AppSphere', 'StreamLine', 'DataFlow', 'CloudSync',
    'NeuralTech', 'PixelForge', 'ByteWorks', 'AgilePulse', 'CodeCraft',
  ];

  const row = [...logos, ...logos];

  return (
    <section className="bg-[#050505] py-8 sm:py-14 border-y border-white/[0.03] overflow-hidden">
      {/* Top row — scrolls left */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="flex animate-marquee">
          {row.map((name, i) => (
            <span
              key={`top-${i}`}
              className="text-white/[0.07] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black whitespace-nowrap mx-4 sm:mx-8 md:mx-12 tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Center text */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 my-6 sm:my-8">
        <p className="text-zinc-400 text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Our expertise is trusted by innovative companies
        </p>
      </div>

      {/* Bottom row — scrolls RIGHT (opposite direction) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="flex animate-marquee-reverse">
          {row.map((name, i) => (
            <span
              key={`bot-${i}`}
              className="text-white/[0.07] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black whitespace-nowrap mx-4 sm:mx-8 md:mx-12 tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
