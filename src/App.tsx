import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from 'framer-motion';
import {
  Menu,
  X,
  Play,
  ChevronDown,
  ChevronRight,
  Camera,
  Megaphone,
  Film,
  BarChart3,
  Sparkles,
  Target,
  Zap,
  Heart,
  Users,
  Award,
  Star,
  ArrowRight,
  Mail,
  Phone,
  Quote,
  ChevronLeft,
} from 'lucide-react';

// Animation Variants with proper types
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// Section Wrapper with Animation
function AnimatedSection({
  children,
  className = '',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
        },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Navigation
function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Serviços', href: '#services' },
    { label: 'Resultados', href: '#results' },
    { label: 'Processo', href: '#process' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="relative z-10 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-3xl font-bold tracking-tighter text-black">GRL</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-black"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg hover:shadow-black/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar
              <ArrowRight className="h-4 w-4" />
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <motion.button
            className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-white md:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-black"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4 block rounded-full bg-black px-6 py-3 text-center text-base font-medium text-white"
                onClick={() => setIsOpen(false)}
              >
                Começar
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#F8F6F3] to-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-amber-100/50 to-orange-100/30 blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollY, [0, 500], [0, 100]) }}
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-tr from-gray-100 to-slate-100 blur-3xl"
        />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(black 1px, transparent 1px), linear-gradient(90deg, black 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div style={{ opacity }} className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-600 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Marketing Audiovisual Premium</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-5xl text-5xl font-bold leading-[1.1] tracking-tight text-black sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Eleve sua Marca com{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent">
                Excelência Visual
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 h-3 w-full bg-gradient-to-r from-amber-200 to-orange-200"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                style={{ originX: 0 }}
              />
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl"
          >
            A GRL cria conteúdo audiovisual envolvente e estratégias de mídia social que
            transformam marcas, cativam públicos e impulsionam crescimento mensurável para
            empresas visionárias.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-black px-8 py-4 text-base font-semibold text-white shadow-xl shadow-black/10 transition-all hover:bg-gray-800 hover:shadow-2xl hover:shadow-black/20"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Eleve sua Marca
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <motion.a
              href="#results"
              className="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-black transition-all hover:border-gray-300 hover:shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-5 w-5 text-amber-500" />
              Veja Nosso Trabalho
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-20 flex flex-col items-center"
          >
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-gray-400">
              Confiado por Líderes do Mercado
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale sm:gap-12">
              {['TechFlow', 'Artisan Co', 'Luxe Media', 'Apex Digital', 'Vertex Labs'].map(
                (brand, idx) => (
                  <motion.span
                    key={brand}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    className="text-lg font-bold tracking-tight text-gray-800 sm:text-xl"
                  >
                    {brand}
                  </motion.span>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
            Role
          </span>
          <div className="h-10 w-6 rounded-full border-2 border-gray-300 p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-2 rounded-full bg-gray-400"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Visual Proof Section (Before/After)
function VisualProof() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  return (
    <AnimatedSection className="py-24 sm:py-32" id="results">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              Prova Visual
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Veja a Diferença GRL
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Nossa pós-produção aprimorada por IA transforma conteúdo comum em
              experiências visuais extraordinárias que cativam e convertem.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={scaleIn}
          className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl bg-gray-100 shadow-2xl shadow-gray-200/50"
          onMouseMove={handleDrag}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchMove={handleDrag}
          onTouchEnd={() => setIsDragging(false)}
        >
          {/* After Image (Background) */}
          <div className="relative aspect-video w-full">
            <img
              src="/images/after-edit.jpg"
              alt="Fotografia profissional aprimorada por IA com iluminação e tratamento de cor premium"
              className="absolute inset-0 h-full w-full object-cover"
              draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="/images/before-edit.jpg"
                alt="Fotografia original não editada em fundo branco"
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              {/* Slider Handle */}
              <div
                className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white shadow-xl transition-transform hover:scale-110 active:cursor-grabbing"
                onMouseDown={() => setIsDragging(true)}
                onTouchStart={() => setIsDragging(true)}
              >
                <div className="flex gap-1">
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-6 left-6">
              <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-black backdrop-blur-sm">
                Original
              </span>
            </div>
            <div className="absolute top-6 right-6">
              <span className="rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg">
                Aprimorado por IA ✨
              </span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { value: '300%', label: 'Aumento no Engajamento' },
            { value: '45%', label: 'Taxa de Conversão Maior' },
            { value: '2,5x', label: 'Mais Alcance Social' },
            { value: '98%', label: 'Satisfação dos Clientes' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-black sm:text-4xl">{stat.value}</div>
              <div className="mt-2 text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Features Section
function Features() {
  const features = [
    {
      icon: Camera,
      title: 'Fotografia Profissional',
      description:
        'Fotografia de produtos e marcas de qualidade de estúdio que conta sua história com clareza e impacto.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: Film,
      title: 'Produção de Vídeo',
      description:
        'Conteúdo em vídeo cinematográfico que captura atenção e gera conexão emocional com seu público.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Megaphone,
      title: 'Estratégia de Mídia Social',
      description:
        'Campanhas sociais baseadas em dados que amplificam seu alcance e constroem comunidades de marca significativas.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Sparkles,
      title: 'Pós-Produção com IA',
      description:
        'Aprimoramento de ponta com IA que eleva cada quadro à perfeição com tratamento de cor impressionante.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: BarChart3,
      title: 'Análises e Insights',
      description:
        'Acompanhamento abrangente de performance e insights acionáveis para otimizar o ROI do seu marketing.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: Target,
      title: 'Identidade de Marca',
      description:
        'Sistemas visuais coesos que tornam sua marca instantaneamente reconhecível e memorável.',
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <AnimatedSection className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Capacidades
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Tudo que sua Marca Precisa
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Do conceito à conclusão, fornecemos soluções audiovisuais completas
              que transformam a forma como o mundo vê sua marca.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100"
              whileHover={{ y: -4 }}
            >
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
              >
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-black">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              <div className="absolute -bottom-2 -right-2 h-24 w-24 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Services Showcase
function Services() {
  const services = [
    {
      title: 'Criação de Conteúdo',
      description:
        'Crie conteúdos visuais impressionantes que fazem o scroll parar e capturam a atenção.',
      image: '/images/after-edit.jpg',
      features: ['Fotografia', 'Videografia', 'Motion Graphics', 'Renderização 3D'],
    },
    {
      title: 'Gestão de Mídias Sociais',
      description:
        'Presença social estratégica que constrói comunidade e impulsiona engajamento significativo.',
      image: '/images/hero-bg.jpg',
      features: ['Estratégia por Plataforma', 'Calendário de Conteúdo', 'Gestão de Comunidade', 'Relatórios'],
    },
    {
      title: 'Campanhas de Marca',
      description:
        'Campanhas integradas que contam sua história em todos os pontos de contato.',
      image: '/images/before-edit.jpg',
      features: ['Estratégia de Campanha', 'Direção Criativa', 'Multi-Canal', 'Performance'],
    },
  ];

  return (
    <AnimatedSection className="py-24 sm:py-32" id="services">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Column */}
          <motion.div variants={slideInLeft}>
            <span className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
              Nossos Serviços
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Soluções Personalizadas para Marcas Modernas
            </h2>
            <p className="mt-6 text-lg text-gray-600">
              Combinamos visão criativa com pensamento estratégico para entregar
              experiências audiovisuais que ressoam com seu público e alcançam
              resultados reais de negócio.
            </p>

            <div className="mt-12 space-y-8">
              {services.map((service, idx) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="group relative rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-gray-200 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-black to-gray-800 text-white">
                      <span className="text-lg font-bold">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{service.title}</h3>
                      <p className="mt-2 text-gray-600">{service.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((feat) => (
                          <span
                            key={feat}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                          >
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div variants={slideInRight} className="relative">
            <div className="sticky top-32">
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl shadow-gray-200/50">
                <img
                  src="/images/after-edit.jpg"
                  alt="Exemplo de conteúdo visual premium"
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                    <Play className="h-4 w-4" />
                    Assista ao Nosso Showreel
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 rounded-2xl bg-white p-4 shadow-xl sm:-right-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">2x Mais Rápido</div>
                    <div className="text-xs text-gray-500">Tempo de Produção</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-32 -left-4 rounded-2xl bg-white p-4 shadow-xl sm:-left-8"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500 text-white">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-black">98%</div>
                    <div className="text-xs text-gray-500">Satisfação</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Process Section
function Process() {
  const steps = [
    {
      step: '01',
      title: 'Descoberta',
      description: 'Mergulhamos profundamente na sua marca, público e objetivos para elaborar a estratégia perfeita.',
    },
    {
      step: '02',
      title: 'Criativo',
      description: 'Nossa equipe dá vida à sua visão com conteúdos visuais e campanhas impressionantes.',
    },
    {
      step: '03',
      title: 'Lançamento',
      description: 'Implantação estratégica em todos os canais para máximo impacto e alcance.',
    },
    {
      step: '04',
      title: 'Otimização',
      description: 'Aprimoramentos baseados em dados para melhorar continuamente a performance e o ROI.',
    },
  ];

  return (
    <AnimatedSection className="py-24 sm:py-32" id="process">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Como Funciona
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Seu Caminho para a Excelência
            </h2>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-16"
        >
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeInUp}
                className="relative text-center"
              >
                <motion.div
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-black to-gray-800 text-2xl font-bold text-white shadow-xl shadow-black/10"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-xl font-bold text-black">{step.title}</h3>
                <p className="mt-3 text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// Benefits Section
function Benefits() {
  const benefits = [
    {
      icon: Zap,
      title: 'Entrega Ultrarrápida',
      description: 'Tenha seu conteúdo pronto em dias, não semanas.',
    },
    {
      icon: Target,
      title: 'Focado em Resultados',
      description: 'Cada peça otimizada para máximo impacto.',
    },
    {
      icon: Award,
      title: 'Qualidade Vencedora de Prêmios',
      description: 'Excelência criativa reconhecida pela indústria.',
    },
    {
      icon: Users,
      title: 'Equipe Dedicada',
      description: 'Seus parceiros criativos pessoais.',
    },
  ];

  return (
    <AnimatedSection className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div variants={slideInLeft}>
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
              Por que a GRL
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              O Parceiro que sua Marca Merece
            </h2>
            <p className="mt-6 text-lg text-gray-400">
              Não somos apenas criadores — somos estrategistas que entendem a interseção
              entre arte e comércio. Nossa abordagem combina excelência criativa com
              insights baseados em dados para entregar resultados mensuráveis.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid gap-6 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors group-hover:bg-white/20">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      quote:
        "A GRL transformou completamente a presença da nossa marca. Nosso engajamento aumentou 400% em apenas três meses. Eles não apenas criam conteúdo — criam experiências.",
      author: 'Sarah Chen',
      role: 'CMO, TechFlow',
      rating: 5,
    },
    {
      quote:
        "A qualidade e atenção aos detalhes são incomparáveis. Cada peça de conteúdo que entregam supera nossas expectativas. Vale cada centavo.",
      author: 'Marcus Thompson',
      role: 'Fundador, Artisan Co',
      rating: 5,
    },
    {
      quote:
        "Trabalhar com a GRL tem sido um divisor de águas. A abordagem estratégica deles para mídia social nos ajudou a alcançar públicos que nunca imaginamos possível.",
      author: 'Emma Rodriguez',
      role: 'Diretora de Marketing, Luxe Media',
      rating: 5,
    },
  ];

  return (
    <AnimatedSection className="py-24 sm:py-32" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              Depoimentos
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Amado por Líderes do Mercado
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Não acredite apenas na nossa palavra. Veja o que nossos clientes têm a dizer
              sobre trabalhar com a GRL.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid gap-8 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.author}
              variants={fadeInUp}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:border-gray-200 hover:shadow-xl"
              whileHover={{ y: -4 }}
            >
              <Quote className="mb-4 h-10 w-10 text-gray-200" />
              <p className="mb-6 text-gray-600 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200">
                  <span className="text-lg font-bold text-gray-600">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-black">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Quais tipos de empresas vocês trabalham?',
      answer:
        "Trabalhamos com marcas de todas as indústrias — desde startups emergentes até empresas estabelecidas. Nossos clientes incluem marcas de e-commerce, empresas de tecnologia, varejistas de luxo, restaurantes e mais. Se você valoriza a excelência visual e quer se destacar, adoraríamos trabalhar com você.",
    },
    {
      question: 'Quanto tempo leva um projeto típico?',
      answer:
        'Os prazos dos projetos variam conforme o escopo. Conteúdo simples de mídia social pode ser entregue em 3 a 5 dias úteis, enquanto campanhas abrangentes de marca normalmente levam de 2 a 4 semanas. Sempre fornecemos prazos detalhados no início e mantemos você informado durante todo o processo.',
    },
    {
      question: 'O que torna a GRL diferente de outras agências?',
      answer:
        'Três coisas: Primeiro, nossas capacidades de produção aprimoradas por IA nos permitem entregar qualidade premium mais rápido e de forma mais acessível. Segundo, combinamos excelência criativa com estratégia baseada em dados. Terceiro, tratamos cada cliente como parceiro, não como número.',
    },
    {
      question: 'Vocês oferecem pacotes de retenção mensal?',
      answer:
        "Sim! Oferecemos pacotes mensais flexíveis adaptados às suas necessidades. Isso inclui criação contínua de conteúdo, gestão de mídia social e relatórios de performance. Entre em contato para discutir qual pacote se adequa melhor aos seus objetivos e orçamento.",
    },
    {
      question: 'Como vocês medem o sucesso?',
      answer:
        'Focamos em métricas que importam para o seu negócio: taxas de engajamento, alcance, taxas de conversão e, finalmente, ROI. Cada projeto inclui um painel de performance para que você possa ver exatamente como seu investimento está rendendo.',
    },
    {
      question: 'Posso ver exemplos do trabalho de vocês?',
      answer:
        "Claro! Temos um portfólio extenso mostrando nosso trabalho em diversas indústrias. Você pode ver uma amostra de nossas transformações antes/depois na seção de Prova Visual acima, ou entre em contato e enviamos estudos de caso relevantes.",
    },
  ];

  return (
    <AnimatedSection className="py-24 sm:py-32" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-block rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
              FAQ
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-black sm:text-5xl">
              Perguntas? Respondidas.
            </h2>
          </motion.div>
        </div>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16 space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              variants={fadeInUp}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                aria-expanded={openIndex === i}
              >
                <span className="pr-4 text-lg font-semibold text-black">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// CTA Section
function CTA() {
  return (
    <AnimatedSection className="py-24 sm:py-32" id="contact">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-black via-gray-900 to-black p-12 sm:p-16 lg:p-24">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl"
          />

          <div className="relative text-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Pronto para Transformar sua Marca?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                Junte-se às marcas que já elevaram sua presença visual com
                a GRL. Vamos criar algo extraordinário juntos.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.a
                  href="mailto:contato@grl.studio"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-black shadow-xl transition-all hover:bg-gray-100 hover:shadow-2xl"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail className="h-5 w-5" />
                  Inicie seu Projeto
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <motion.a
                  href="tel:+5511999999999"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all hover:border-white/40 hover:bg-white/5"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Phone className="h-5 w-5" />
                  Agende uma Conversa
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

// Social Icons (SVG components for social media)
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
      <path d="m10 15 5-3-5-3z"/>
    </svg>
  );
}

// Footer
function Footer() {
  const links = {
    Serviços: ['Fotografia', 'Videografia', 'Mídia Social', 'Estratégia de Marca', 'Análises'],
    Empresa: ['Sobre', 'Portfólio', 'Carreiras', 'Blog', 'Contato'],
    Recursos: ['Estudos de Caso', 'Guia', 'Newsletter', 'Parceiros', 'Imprensa'],
  };

  const socialIcons = [InstagramIcon, TwitterIcon, LinkedinIcon, YoutubeIcon];

  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-block">
              <span className="text-3xl font-bold tracking-tighter text-black">GRL</span>
            </a>
            <p className="mt-6 max-w-sm text-gray-600">
              Marketing audiovisual e mídia social premium para marcas que exigem
              excelência.
            </p>
            <div className="mt-8 flex gap-4">
              {socialIcons.map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-black hover:text-white"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-black">
                {title}
              </h4>
              <ul className="mt-6 space-y-4">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-600 transition-colors hover:text-black"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GRL. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-black">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-black">
                Termos de Serviço
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Navigation />
      <main>
        <Hero />
        <VisualProof />
        <Features />
        <Process />
        <Services />
        <Benefits />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
