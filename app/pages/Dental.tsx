import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, Shield, Award, Clock, Star, Phone, Calendar } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useRef } from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

const dentalTreatments = [
  {
    id: 1,
    key: 'implants',
    image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50cyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzczNjQ5MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.implants.1', 'dental.f.implants.2', 'dental.f.implants.3', 'dental.f.implants.4'],
  },
  {
    id: 2,
    key: 'whitening',
    image: 'https://images.unsplash.com/photo-1611690061822-b707a67bfebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWV0aCUyMHdoaXRlbmluZyUyMHNtaWxlfGVufDF8fHx8MTc3MzYyMjc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NzM2OTMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.whitening.1', 'dental.f.whitening.2', 'dental.f.whitening.3', 'dental.f.whitening.4'],
  },
  {
    id: 3,
    key: 'veneers',
    image: 'https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB2ZW5lZXJzJTIwcGVyZmVjdHxlbnwxfHx8fDE3NzM2OTMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzczNjQ5MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.veneers.1', 'dental.f.veneers.2', 'dental.f.veneers.3', 'dental.f.veneers.4'],
  },
  {
    id: 4,
    key: 'braces',
    image: 'https://images.unsplash.com/photo-1598531228433-d9f0cb960816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob2RvbnRpYyUyMGJyYWNlcyUyMHRlZXRofGVufDF8fHx8MTc3MzY3NjM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1630438994394-3deff7a591bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBhdGllbnQlMjBzbWlsZXxlbnwxfHx8fDE3NzM2OTMxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.braces.1', 'dental.f.braces.2', 'dental.f.braces.3', 'dental.f.braces.4'],
  },
  {
    id: 5,
    key: 'crowns',
    image: 'https://images.unsplash.com/photo-1771442873035-474765b40ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjcm93biUyMHByb2NlZHVyZXxlbnwxfHx8fDE3NzM2NzI2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1762625570087-6d98fca29531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBvZmZpY2UlMjBtb2Rlcm58ZW58MXx8fHwxNzczNjQ5MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.crowns.1', 'dental.f.crowns.2', 'dental.f.crowns.3', 'dental.f.crowns.4'],
  },
  {
    id: 6,
    key: 'rootcanal',
    image: 'https://images.unsplash.com/photo-1664530838183-571e4f46040a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb290JTIwY2FuYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczNjg4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1758691463333-c79215e8bc3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwY2xpbmljJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzczNjkzMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['dental.f.rootcanal.1', 'dental.f.rootcanal.2', 'dental.f.rootcanal.3', 'dental.f.rootcanal.4'],
  },
];

export function Dental() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src="https://images.unsplash.com/photo-1763887487088-469f68e3d68c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZGVudGFsJTIwY2xpbmljJTIwbW9kZXJufGVufDF8fHx8MTc3MzY5MzExOXww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
            alt="Dental Clinic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/20 to-secondary/40"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
          >
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium tracking-wide">{t('hero.clinic.badge')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 font-bold tracking-tight drop-shadow-2xl"
          >
            {t('dental.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {t('dental.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {dentalTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-border/50"
              >
                {/* Interactive Before/After Slider */}
                <div className="p-4">
                  <BeforeAfterSlider 
                    beforeImage={treatment.image} 
                    afterImage={treatment.beforeAfter} 
                  />
                </div>

                {/* Treatment Info */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <Star className="w-5 h-5 fill-current" />
                        </div>
                        <h3 className="text-3xl font-bold text-secondary tracking-tight">
                          {t(`dental.treatment.${treatment.key}.title`)}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
                        {t(`dental.treatment.${treatment.key}.desc`)}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {treatment.features.map((feature, fIndex) => (
                          <motion.div
                            key={fIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * fIndex }}
                            className="flex items-center space-x-3 group"
                          >
                            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                              <Check className="w-3 h-3 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <span className="text-secondary font-medium">{t(feature)}</span>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          to="/booking"
                          className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95"
                        >
                          {t('common.bookNow')}
                        </Link>
                        <button className="px-8 py-3 bg-secondary/5 text-secondary font-bold rounded-full hover:bg-secondary/10 transition-all">
                          {t('common.viewDetails')}
                        </button>
                      </div>
                    </div>

                    <div className="w-full md:w-[350px] space-y-4">
                      <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                        <h4 className="font-bold text-secondary mb-4 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-primary" />
                          {t('common.successRate')}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('common.patientSatisfaction')}</span>
                            <span className="font-bold text-secondary">99.8%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-full w-[99.8%] rounded-full" />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Clock className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t('common.duration')}</p>
                          <p className="text-sm font-bold text-secondary">2-3 {t('common.appointments')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonial Section */}
      <section className="py-24 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground mb-12">{t('testimonials.subtitle')}</p>
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg text-muted-foreground italic mb-4">
              "{t('testimonials.1.text')}"
            </p>
            <p className="font-semibold">{t('testimonials.1.name')}</p>
            <p className="text-sm text-muted-foreground">{t('testimonials.1.treatment')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsfGVufDF8fHx8MTc3MzY5MzExOXww&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/80 mb-10">{t('home.cta.subtitle')}</p>
          <Link
            to="/booking"
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 transition-all"
          >
            {t('common.bookNow')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
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
