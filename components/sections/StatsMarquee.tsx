'use client';

export default function StatsMarquee() {
  const items = [
    { value: '2025', label: 'Founded' },
    { value: '10+', label: 'Team Members' },
    { value: '2+', label: 'Years on average for client partnership' },
  ];

  /* Repeat enough for seamless loop */
  const row = [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <section className="bg-[#050505] py-8 sm:py-14 overflow-hidden border-y border-white/[0.03]">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-[#050505] to-transparent z-10" />

        <div className="flex whitespace-nowrap" style={{ animation: 'marquee 20s linear infinite' }}>
          {row.map((item, i) => (
            <div key={i} className="flex items-baseline gap-3 sm:gap-5 mx-4 sm:mx-10 shrink-0">
              <span
                className="font-black tracking-tight"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                  lineHeight: 1,
                  color: '#ffffff',
                }}
              >
                {item.value}
              </span>
              <span
                className="font-semibold text-zinc-500 whitespace-nowrap"
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.75rem)',
                  lineHeight: 1.2,
                }}
              >
                {item.label}
              </span>
              <span className="text-zinc-700 text-4xl mx-4 select-none">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
