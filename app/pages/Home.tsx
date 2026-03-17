import { useRef, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router';
import { useLanguage } from '../context/LanguageContext';
import { motion, useInView, animate, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Award, Building2, DollarSign, Package, Star, Users, CheckCircle, Activity, Shield, Play } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import CountUp from 'react-countup';
import useEmblaCarousel from 'embla-carousel-react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

function Counter({ from = 0, to, duration = 2, suffix = '' }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString() + suffix;
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, inView, suffix]);

  return <span ref={nodeRef} className="tabular-nums">{from}{suffix}</span>;
}

const featuredTreatments = [
  {
    id: 1,
    title: 'dental.implants',
    category: 'nav.dental',
    image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50cyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/dental'
  },
  {
    id: 2,
    title: 'dental.veneers',
    category: 'nav.dental',
    image: 'https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB2ZW5lZXJzJTIwcGVyZmVjdHxlbnwxfHx8fDE3NzM2OTMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/dental'
  },
  {
    id: 3,
    title: 'hair.fue',
    category: 'nav.hair',
    image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/hair'
  },
  {
    id: 4,
    title: 'hair.dhi',
    category: 'nav.hair',
    image: 'https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGFpciUyMGdyb3d0aHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    link: '/hair'
  }
];

const testimonials = [
  {
    id: 1,
    text: 'testimonials.1.text',
    name: 'testimonials.1.name',
    treatment: 'testimonials.1.treatment',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NzM2OTMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    text: 'testimonials.2.text',
    name: 'testimonials.2.name',
    treatment: 'testimonials.2.treatment',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NzM2OTMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    text: 'testimonials.3.text',
    name: 'testimonials.3.name',
    treatment: 'testimonials.3.treatment',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NzM2OTMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Home() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);


  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover origin-center"
          >
            <source src="/hero-background.mp4" type="video/mp4" />
            <img
              src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyMHx8bHV4dXJ5JTIwY2xpbmljfGVufDF8fHx8MTc3MzY2NDkzOXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
              alt="Gravity Clinic Interior"
              className="w-full h-full object-cover origin-center"
            />
          </video>
          {/* Luxury dark overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E1C4B]/80 via-[#1E1C4B]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
        </motion.div>

        {/* Hero Content */}
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium tracking-wide">JCI Accredited International Clinic</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 leading-tight drop-shadow-xl font-bold"
          >
            <span className="block">{t('hero.title')}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400 mt-2">
              {t('hero.subheader')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(242,133,34,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center group"
            >
              {t('hero.cta')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 border border-white/30 transition-all flex items-center justify-center group">
              <Play className="w-5 h-5 mr-2 group-hover:text-primary transition-colors" />
              {t('hero.watchTour')}
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-white/70 text-sm mb-2 uppercase tracking-widest font-medium">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>


      {/* Animated Statistics Band */}
      <section className="py-16 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')] bg-cover bg-center" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
            {[
              { to: 15000, suffix: '+', label: 'stats.patients', icon: Users },
              { to: 15, suffix: '+', label: 'stats.years', icon: Award },
              { to: 98, suffix: '%', label: 'stats.success', icon: Activity },
              { to: 50, suffix: '+', label: 'stats.countries', icon: CheckCircle },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/20 mb-4 group-hover:bg-primary transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  <Counter to={stat.to} suffix={stat.suffix} duration={2.5} />
                </div>
                <p className="text-white/60 text-sm font-medium uppercase tracking-widest">{t(stat.label)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{t('feature.title')}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t('feature.subtitle')}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Award, key: '1' },
              { icon: Building2, key: '2' },
              { icon: DollarSign, key: '3' },
              { icon: Package, key: '4' },
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-border/30"
              >
                <div className="w-14 h-14 bg-secondary rounded-2xl flex items-center justify-center mb-6 text-primary shadow-lg shadow-primary/10">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-secondary">{t(`feature.${feature.key}.title`)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(`feature.${feature.key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Treatments */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{t('home.treatments.title') || 'Featured Treatments'}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('home.treatments.subtitle') || 'Discover our most popular medical procedures'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img
                    src={treatment.image}
                    alt={t(treatment.title)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-bold rounded-full border border-white/20">
                      {t(treatment.category)}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1C4B]/95 via-[#1E1C4B]/40 to-transparent flex items-end">
                  <div className="p-8 text-white w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{t(treatment.title)}</h3>
                    <p className="text-sm text-white/80 mb-6 line-clamp-2 font-light">{t(`${treatment.title}.desc`) || 'Expert medical care tailored to your needs.'}</p>
                    <Link
                      to={`/${treatment.category}`}
                      className="inline-flex items-center text-sm font-semibold text-primary hover:text-white transition-colors group/link"
                    >
                      {t('common.learnMore')}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Results / Before & After Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-secondary tracking-tight">{t('home.results.title')}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">{t('home.results.subtitle')}</p>
            </div>
            <Link to="/doctors" className="hidden md:flex items-center text-primary font-bold hover:gap-3 transition-all duration-300">
              {t('home.results.cta')} <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1598300188704-5f830aecd69c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBwYXRpZW50fGVufDF8fHx8MTc3MzY5MzEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                afterImage="https://images.unsplash.com/photo-1611690061822-b707a67bfebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWV0aCUyMHdoaXRlbmluZyUyMHNtaWxlfGVufDF8fHx8MTc3MzYyMjc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                label={t('home.results.1.label')}
              />
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="text-lg font-bold text-secondary mb-2">"{t('home.results.1.title')}"</h4>
                <p className="text-muted-foreground text-sm italic leading-relaxed">"{t('home.results.1.text')}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase">{t('home.results.1.category')}</span>
                  <span className="text-xs text-muted-foreground">{t('home.results.1.patient')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1758544518111-53274094598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcmVzdG9yYXRpb24lMjByZXN1bHR8ZW58MXx8fHwxNzczNjkzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                afterImage="https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                label={t('home.results.2.label')}
              />
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h4 className="text-lg font-bold text-secondary mb-2">"{t('home.results.2.title')}"</h4>
                <p className="text-muted-foreground text-sm italic leading-relaxed">"{t('home.results.2.text')}"</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase">{t('home.results.2.category')}</span>
                  <span className="text-xs text-muted-foreground">{t('home.results.2.patient')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{t('testimonials.title')}</h2>
            <p className="text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_33.33%] min-w-0 pl-6 first:pl-0">
                  <motion.div
                    className="h-full bg-card p-10 rounded-3xl shadow-xl shadow-secondary/5 border border-border/40 relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center mb-6 text-primary">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-current" />
                        ))}
                      </div>
                      <p className="text-secondary text-lg mb-8 italic font-medium leading-relaxed">"{t(testimonial.text)}"</p>
                    </div>

                    <div className="flex items-center pt-6 border-t border-border/30">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-muted mr-4 border-2 border-primary/10 shadow-lg">
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={t(testimonial.name)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-secondary text-lg">{t(testimonial.name)}</p>
                        <p className="text-sm text-primary font-semibold tracking-wide uppercase">{t(testimonial.treatment)}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-12 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${selectedIndex === index ? 'w-8 bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsfGVufDF8fHx8MTc3MzY5MzExOXww&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/80 mb-10">{t('home.cta.subtitle')}</p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/booking"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:shadow-xl shadow-md transition-shadow"
            >
              {t('common.bookNow')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border z-40">
        <Link
          to="/booking"
          className="flex items-center justify-center w-full py-3 bg-primary text-white rounded-xl font-semibold shadow-lg shadow-primary/30"
        >
          {t('common.bookNow')}
        </Link>
      </div>
    </div>
  );
}
