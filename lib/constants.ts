import type { Service } from '@/types';

export const services: Service[] = [
  {
    id: 'ai',
    title: 'Artificial Intelligence (AI) Development',
    description:
      'Use advanced machine learning solutions and the power of AI to scale your business operations, predict customer behavior, and maximize engagement. We provide comprehensive services including LLM development, AI agents, and strategic AI consultancy.',
    icon: 'brain',
    features: ['Machine Learning', 'LLM & Generative AI', 'AI Agents', 'Computer Vision', 'NLP', 'AI Consultancy'],
  },
  {
    id: 'fullstack',
    title: 'Web & Software Development',
    description:
      'Bring new digital products to market or extend existing ones with our experienced team of designers, developers, and testers. Build an MVP to test ideas or scale your development with our senior specialists.',
    icon: 'code',
    features: ['React / Next.js', 'Node.js / Express', 'REST & GraphQL APIs', 'MongoDB / PostgreSQL', 'TypeScript', 'Cloud Deployment'],
  },
  {
    id: 'flutter',
    title: 'Flutter & Mobile Development',
    description:
      'Build your mobile application for Android and iOS operating systems. Our team specializes in Flutter and cross-platform mobile development to keep your tech stack ready for every platform.',
    icon: 'smartphone',
    features: ['Flutter / Dart', 'iOS & Android', 'Cross-Platform', 'Push Notifications', 'App Store Deployment', 'React Native'],
  },
  {
    id: 'ott',
    title: 'OTT Platform Development',
    description:
      'Scalable streaming platforms with smooth playback, CDN integration, DRM protection, and subscription management. End-to-end OTT solutions from architecture to deployment.',
    icon: 'play',
    features: ['Video Streaming', 'CDN Integration', 'Subscription & Billing', 'DRM & Security', 'Multi-Device', 'Analytics'],
  },
  {
    id: 'android',
    title: 'Native Android Development',
    description:
      'Native Android apps built with Kotlin for high performance, battery efficiency, and great UX. From concept to Google Play deployment with modern Jetpack architecture.',
    icon: 'tablet',
    features: ['Kotlin / Java', 'Material Design 3', 'Jetpack Compose', 'Firebase', 'Google Play', 'Performance Tuning'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    description:
      'Cloud infrastructure setup, CI/CD pipelines, containerization, and deployment automation. Ensure your applications are scalable, reliable, and cost-efficient.',
    icon: 'cloud',
    features: ['AWS / GCP / Azure', 'Docker & Kubernetes', 'CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring', 'Cost Optimization'],
  },
];

export const techExpertise = [
  {
    title: 'AI & Machine Learning',
    description: 'Automate complex business workflows with autonomous agents and custom models tailored to your data and specific needs.',
    techs: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain'],
  },
  {
    title: 'React & Next.js Development',
    description: 'Build high-performance, scalable web applications and enterprise platforms using the modern React ecosystem.',
    techs: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
  },
  {
    title: 'Flutter & Mobile Development',
    description: 'Launch native-quality iOS and Android apps faster with a single, maintainable codebase and seamless UX.',
    techs: ['Flutter', 'Dart', 'React Native', 'Firebase', 'SQLite'],
  },
  {
    title: 'Node.js & Backend',
    description: 'Architect secure, real-time backend systems and microservices capable of handling heavy traffic loads.',
    techs: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL'],
  },
];

export const stats = [
  { label: 'Projects Delivered', value: '50+' },
  { label: 'Happy Clients', value: '30+' },
  { label: 'Team Members', value: '10+' },
  { label: 'Years Experience', value: '3+' },
];

export const testimonials = [
  {
    quote: 'Aadugaadu delivered an exceptional AI-powered platform that exceeded our expectations. Their technical depth and commitment is unmatched.',
    name: 'Rahul Verma',
    role: 'CTO, TechVista',
    company: 'TechVista',
  },
  {
    quote: 'The Flutter app they built for us launched on both platforms simultaneously and the quality was indistinguishable from native apps.',
    name: 'Priya Sharma',
    role: 'Founder, AppSphere',
    company: 'AppSphere',
  },
  {
    quote: 'From ideation to deployment, Aadugaadu handled our OTT platform with incredible professionalism and speed.',
    name: 'Arjun Patel',
    role: 'CEO, StreamLine',
    company: 'StreamLine',
  },
  {
    quote: 'Their full-stack expertise helped us scale from 100 to 100,000 users without a single architecture change. Truly forward-thinking.',
    name: 'Neha Singh',
    role: 'VP Engineering, DataFlow',
    company: 'DataFlow',
  },
];

export const caseStudies = [
  {
    title: 'AI Analytics Dashboard',
    category: 'AI Development',
    description: 'Real-time business intelligence platform with NLP insights and predictive analytics for enterprise clients.',
    gradient: 'from-violet-600 to-indigo-600',
  },
  {
    title: 'StreamBox OTT',
    category: 'OTT Platform',
    description: 'Full-scale video streaming platform with DRM protection, CDN delivery, and subscription billing system.',
    gradient: 'from-fuchsia-600 to-pink-600',
  },
  {
    title: 'ShopFlutter',
    category: 'Flutter & Mobile',
    description: 'Cross-platform e-commerce app with AR product preview, real-time inventory, and payment integration.',
    gradient: 'from-cyan-600 to-blue-600',
  },
  {
    title: 'CloudSync SaaS',
    category: 'Full Stack',
    description: 'Enterprise SaaS platform with multi-tenant architecture, real-time collaboration, and cloud-native infrastructure.',
    gradient: 'from-emerald-600 to-teal-600',
  },
];

export const whyUsReasons = [
  {
    title: 'Results that speak louder: evidenced',
    description: "We don't just promise excellence; we deliver it. Our portfolio is a testament to our commitment to producing results that speak louder than words.",
    icon: 'trophy',
  },
  {
    title: 'Cracking complex cases with innovation',
    description: 'We specialize in cracking the most complex cases with a blend of innovation and strategic thinking, delivering creative and effective solutions.',
    icon: 'lightbulb',
  },
  {
    title: 'Engineering solutions with technical precision',
    description: 'We are committed to delivering engineering solutions that embody technical precision and superior quality, rooted in the latest technological advancements.',
    icon: 'settings',
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];
