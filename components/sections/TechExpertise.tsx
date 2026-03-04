'use client';

import React, { useCallback } from 'react';
import FadeIn from '@/components/animations/FadeIn';
import OrbitImages from '@/components/animations/OrbitImages';
import type { OrbitItem } from '@/components/animations/OrbitImages';
import { techExpertise } from '@/lib/constants';
import dynamic from 'next/dynamic';

const SplinePlanet = dynamic(
  () => import('@splinetool/react-spline').then((mod) => {
    const Spline = mod.default;
    return function Planet() {
      const containerRef = React.useRef<HTMLDivElement>(null);

      const onLoad = useCallback((app: import('@splinetool/runtime').Application) => {
        const canvas = app.canvas as HTMLCanvasElement;

        // Aggressively block zoom at capture phase — before Spline processes it
        const blockZoom = (e: WheelEvent) => { e.preventDefault(); e.stopImmediatePropagation(); };
        canvas.addEventListener('wheel', blockZoom, { capture: true, passive: false });
        canvas.parentElement?.addEventListener('wheel', blockZoom, { capture: true, passive: false });

        // Also block pinch-zoom (touch)
        const blockPinch = (e: TouchEvent) => { if (e.touches.length > 1) { e.preventDefault(); e.stopImmediatePropagation(); } };
        canvas.addEventListener('touchmove', blockPinch, { capture: true, passive: false });

        // Hide watermark
        const parent = canvas?.parentElement;
        if (parent) {
          parent.querySelectorAll('a, div[style*="position: absolute"]').forEach((el) => {
            const h = el as HTMLElement;
            if (h.textContent?.includes('Spline') || h.querySelector('img')) h.style.display = 'none';
          });
        }
      }, []);

      // Block wheel on the React container at mount (capture phase)
      React.useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const block = (e: WheelEvent) => { e.preventDefault(); e.stopImmediatePropagation(); };
        el.addEventListener('wheel', block, { capture: true, passive: false });
        return () => el.removeEventListener('wheel', block, { capture: true } as EventListenerOptions);
      }, []);

      return (
        <div
          ref={containerRef}
          className="relative overflow-hidden select-none rounded-full"
          style={{ width: 280, height: 280, minWidth: 280, minHeight: 280, maxWidth: 280, maxHeight: 280, borderRadius: '50%' }}
        >
          <div
            style={{ position: 'absolute', inset: -40, width: 360, height: 360 }}
          >
            <Spline
              scene="https://prod.spline.design/qpzdgdyOdefe8ClR/scene.splinecode"
              onLoad={onLoad}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      );
    };
  }),
  {
    ssr: false,
    loading: () => (
      <div className="w-[280px] h-[280px] rounded-full flex items-center justify-center bg-white/[0.02]">
        <div className="w-10 h-10 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    ),
  }
);

/* ── Brand-colour accents per technology ── */
const techAccent: Record<string, string> = {
  Python: '#3776AB',
  TensorFlow: '#FF6F00',
  PyTorch: '#EE4C2C',
  OpenAI: '#00A67E',
  LangChain: '#1C3C3C',
  React: '#61DAFB',
  'Next.js': '#ffffff',
  TypeScript: '#3178C6',
  'Tailwind CSS': '#06B6D4',
  Redux: '#764ABC',
  Flutter: '#02569B',
  Dart: '#0175C2',
  'React Native': '#61DAFB',
  Firebase: '#FFCA28',
  SQLite: '#7DC8FF',
  'Node.js': '#68C668',
  Express: '#ffffff',
  MongoDB: '#47A248',
  PostgreSQL: '#4169E1',
  GraphQL: '#E10098',
};

const techAbbr: Record<string, string> = {
  Python: 'Py',
  TensorFlow: 'TF',
  PyTorch: 'PT',
  OpenAI: 'AI',
  LangChain: 'LC',
  React: 'Re',
  'Next.js': 'Nx',
  TypeScript: 'TS',
  'Tailwind CSS': 'TW',
  Redux: 'Rx',
  Flutter: 'Fl',
  Dart: 'Da',
  'React Native': 'RN',
  Firebase: 'Fb',
  SQLite: 'SQ',
  'Node.js': 'Nj',
  Express: 'Ex',
  MongoDB: 'Mg',
  PostgreSQL: 'PG',
  GraphQL: 'GQ',
};

/* ── Individual description for every tech ── */
const techDescription: Record<string, { tagline: string; description: string; useCases: string[] }> = {
  Python: {
    tagline: 'Versatile & Powerful',
    description: 'The backbone of our AI and backend systems. We use Python for data pipelines, machine learning models, automation scripts, and rapid prototyping.',
    useCases: ['AI/ML Pipelines', 'REST APIs', 'Data Processing', 'Scripting'],
  },
  TensorFlow: {
    tagline: 'Production-Grade ML',
    description: 'Google\'s open-source ML framework powers our deep learning models — from image classification and NLP to recommendation engines deployed at scale.',
    useCases: ['Deep Learning', 'Computer Vision', 'NLP Models', 'Model Serving'],
  },
  PyTorch: {
    tagline: 'Research to Production',
    description: 'Our go-to for research-driven AI projects. PyTorch\'s dynamic computation graph lets us iterate fast on custom neural architectures and fine-tuned LLMs.',
    useCases: ['Custom Models', 'LLM Fine-Tuning', 'GANs', 'Reinforcement Learning'],
  },
  OpenAI: {
    tagline: 'Generative Intelligence',
    description: 'We integrate OpenAI\'s GPT models and APIs to build intelligent chatbots, content generators, code assistants, and AI-powered search systems.',
    useCases: ['Chatbots', 'Content Generation', 'Embeddings', 'Function Calling'],
  },
  LangChain: {
    tagline: 'AI Agent Framework',
    description: 'LangChain enables us to build complex AI agents that reason, retrieve from knowledge bases, and chain multiple LLM calls into autonomous workflows.',
    useCases: ['RAG Systems', 'AI Agents', 'Tool Calling', 'Memory Chains'],
  },
  React: {
    tagline: 'Component-Driven UI',
    description: 'The foundation of our frontend stack. React\'s component model, hooks, and vast ecosystem let us build highly interactive, maintainable user interfaces.',
    useCases: ['SPAs', 'Dashboards', 'Interactive UIs', 'Component Libraries'],
  },
  'Next.js': {
    tagline: 'Full-Stack React Framework',
    description: 'Our primary web framework. Next.js gives us SSR, static generation, API routes, and edge functions — everything needed for performant, SEO-friendly apps.',
    useCases: ['SSR/SSG Sites', 'SaaS Platforms', 'E-commerce', 'API Routes'],
  },
  TypeScript: {
    tagline: 'Type-Safe Development',
    description: 'TypeScript is non-negotiable in our stack. Static typing catches bugs at compile time, improves refactoring confidence, and makes codebases self-documenting.',
    useCases: ['Type Safety', 'Better DX', 'Scalable Code', 'API Contracts'],
  },
  'Tailwind CSS': {
    tagline: 'Utility-First Styling',
    description: 'Tailwind lets us rapidly build custom designs without leaving our markup. Combined with design tokens, it ensures pixel-perfect, consistent UI at speed.',
    useCases: ['Rapid Prototyping', 'Design Systems', 'Responsive Design', 'Dark Mode'],
  },
  Redux: {
    tagline: 'Predictable State',
    description: 'For complex client-side state, Redux Toolkit provides a predictable, debuggable architecture with devtools that make time-travel debugging a breeze.',
    useCases: ['Global State', 'Complex Forms', 'Caching', 'Middleware'],
  },
  Flutter: {
    tagline: 'Cross-Platform Native',
    description: 'Flutter lets us ship beautiful, natively compiled apps for iOS, Android, web, and desktop from a single Dart codebase — with 60fps performance.',
    useCases: ['Mobile Apps', 'Cross-Platform', 'Custom Animations', 'Material Design'],
  },
  Dart: {
    tagline: 'Fast & Expressive',
    description: 'Dart is the language behind Flutter. Its sound null safety, ahead-of-time compilation, and clean syntax make it ideal for building reliable mobile apps.',
    useCases: ['Flutter Apps', 'Null Safety', 'AOT Compilation', 'Strong Typing'],
  },
  'React Native': {
    tagline: 'React for Mobile',
    description: 'When teams already have React expertise, React Native lets us share logic between web and mobile while still accessing native platform APIs.',
    useCases: ['Shared Codebase', 'Native Modules', 'Hot Reload', 'Expo'],
  },
  Firebase: {
    tagline: 'Backend as a Service',
    description: 'Firebase accelerates development with real-time databases, authentication, cloud functions, push notifications, and analytics — all managed by Google.',
    useCases: ['Auth', 'Real-time DB', 'Cloud Functions', 'Push Notifications'],
  },
  SQLite: {
    tagline: 'Embedded Database',
    description: 'SQLite powers offline-first mobile apps with a lightweight, zero-config relational database that runs directly on the device — perfect for local data persistence.',
    useCases: ['Offline Storage', 'Mobile DB', 'Local Cache', 'Structured Data'],
  },
  'Node.js': {
    tagline: 'Server-Side JavaScript',
    description: 'Node.js runs our backend services. Its event-driven, non-blocking I/O model handles thousands of concurrent connections — ideal for real-time APIs and microservices.',
    useCases: ['REST APIs', 'WebSockets', 'Microservices', 'Real-time Apps'],
  },
  Express: {
    tagline: 'Minimal & Flexible',
    description: 'Express is our go-to Node.js framework for building fast, unopinionated RESTful APIs and middleware-driven backend architectures.',
    useCases: ['REST APIs', 'Middleware', 'Auth Layers', 'Proxy Servers'],
  },
  MongoDB: {
    tagline: 'Document Database',
    description: 'MongoDB\'s flexible document model lets us iterate fast on schemas, store complex nested data, and scale horizontally with built-in sharding and replication.',
    useCases: ['NoSQL Storage', 'Aggregation', 'Atlas Cloud', 'Schema Flexibility'],
  },
  PostgreSQL: {
    tagline: 'Enterprise SQL',
    description: 'When we need ACID compliance, complex joins, and advanced querying, PostgreSQL delivers — the world\'s most advanced open-source relational database.',
    useCases: ['Relational Data', 'Complex Queries', 'JSONB Support', 'Full-Text Search'],
  },
  GraphQL: {
    tagline: 'Flexible API Layer',
    description: 'GraphQL lets clients request exactly the data they need. We use it to build efficient, strongly-typed APIs that reduce over-fetching and simplify frontend logic.',
    useCases: ['Typed APIs', 'Query Optimization', 'Real-time Subscriptions', 'Schema Stitching'],
  },
};

/* ── Map every tech → its parent category ── */
const techToCategory = new Map<string, (typeof techExpertise)[0]>();
techExpertise.forEach((cat) => cat.techs.forEach((t) => techToCategory.set(t, cat)));
const allTechs = techExpertise.flatMap((cat) => cat.techs);

/* ── Tiny icon badge ── */
function TechIcon({ name }: { name: string }) {
  const color = techAccent[name] || '#7c3aed';
  return (
    <div
      className="w-full h-full rounded-xl bg-white/[0.05] border border-white/[0.08] flex flex-col items-center justify-center gap-0.5 backdrop-blur-sm"
      style={{ borderColor: `${color}35` }}
    >
      <span className="font-bold text-lg leading-none" style={{ color }}>
        {techAbbr[name] || name.slice(0, 2)}
      </span>
      <span className="text-[9px] text-zinc-500 leading-none truncate max-w-[90%] text-center">
        {name}
      </span>
    </div>
  );
}

/* ── Hover popup card — per-technology ── */
function PopupCard({ name }: { name: string }) {
  const info = techDescription[name];
  const color = techAccent[name] || '#7c3aed';
  const category = techToCategory.get(name);

  if (!info) return null;

  return (
    <div className="w-80 max-w-[calc(100vw-2rem)] glass-card rounded-xl p-4 sm:p-5 border border-violet-500/20 shadow-xl shadow-violet-500/10 backdrop-blur-xl">
      {/* Header with tech name + tagline */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0"
          style={{ borderColor: `${color}40` }}
        >
          <span className="font-bold text-sm" style={{ color }}>
            {techAbbr[name] || name.slice(0, 2)}
          </span>
        </div>
        <div>
          <h4 className="text-white font-bold text-sm leading-tight">{name}</h4>
          <p className="text-[10px] font-medium tracking-wide" style={{ color }}>{info.tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-xs leading-relaxed mb-3">{info.description}</p>

      {/* Use cases */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {info.useCases.map((uc) => (
          <span
            key={uc}
            className="px-2 py-1 text-[10px] font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-md"
          >
            {uc}
          </span>
        ))}
      </div>

      {/* Category label */}
      {category && (
        <div className="pt-2 border-t border-white/[0.06]">
          <p className="text-[10px] text-zinc-600">
            Part of <span className="text-zinc-400 font-medium">{category.title}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function TechExpertise() {
  const orbitItems: OrbitItem[] = allTechs.map((tech) => {
    return {
      icon: <TechIcon name={tech} />,
      label: tech,
      popupContent: <PopupCard name={tech} />,
    };
  });

  return (
    <section className="bg-[#0a0a0a] pt-16 sm:pt-20 lg:pt-24 pb-0 px-4 sm:px-6 overflow-x-clip">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn>
          <div className="text-center mb-4">
            <p className="text-violet-400 text-xs font-bold uppercase tracking-[0.2em] mb-3">
              Technologies
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Our Tech Expertise
            </h2>
            <p className="text-zinc-500 text-sm mt-4 max-w-md mx-auto hidden sm:block">
              Hover any icon to explore the category
            </p>
            <p className="text-zinc-500 text-sm mt-4 max-w-md mx-auto sm:hidden">
              Tap any icon to explore
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <OrbitImages
            items={orbitItems}
            radiusX={480}
            radiusY={130}
            rotation={-6}
            duration={35}
            itemSize={96}
            responsive
            centerContent={
              <div className="hidden md:block">
                <SplinePlanet />
              </div>
            }
          />
        </FadeIn>
      </div>
    </section>
  );
}
