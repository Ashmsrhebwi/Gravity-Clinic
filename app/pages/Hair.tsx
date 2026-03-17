import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'motion/react';
import { Check, ArrowRight, Star, Shield, Award, Clock, Phone, Calendar, UserCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useRef } from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

const hairTreatments = [
  {
    id: 1,
    key: 'fue',
    image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1758544518111-53274094598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcmVzdG9yYXRpb24lMjByZXN1bHR8ZW58MXx8fHwxNzczNjkzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.fue.1', 'hair.f.fue.2', 'hair.f.fue.3', 'hair.f.fue.4'],
    successRate: 95,
  },
  {
    id: 2,
    key: 'dhi',
    image: 'https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGFpciUyMGdyb3d0aHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1758544518111-53274094598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcmVzdG9yYXRpb24lMjByZXN1bHR8ZW58MXx8fHwxNzczNjkzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.dhi.1', 'hair.f.dhi.2', 'hair.f.dhi.3', 'hair.f.dhi.4'],
    successRate: 97,
  },
  {
    id: 3,
    key: 'sapphire',
    image: 'https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbG9zcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.sapphire.1', 'hair.f.sapphire.2', 'hair.f.sapphire.3', 'hair.f.sapphire.4'],
    successRate: 98,
  },
  {
    id: 4,
    key: 'prp',
    image: 'https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGFpciUyMGdyb3d0aHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbG9zcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.prp.1', 'hair.f.prp.2', 'hair.f.prp.3', 'hair.f.prp.4'],
    successRate: 85,
  },
  {
    id: 5,
    key: 'beard',
    image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1758544518111-53274094598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcmVzdG9yYXRpb24lMjByZXN1bHR8ZW58MXx8fHwxNzczNjkzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.beard.1', 'hair.f.beard.2', 'hair.f.beard.3', 'hair.f.beard.4'],
    successRate: 96,
  },
  {
    id: 6,
    key: 'eyebrow',
    image: 'https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGFpciUyMGdyb3d0aHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    beforeAfter: 'https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbG9zcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    features: ['hair.f.eyebrow.1', 'hair.f.eyebrow.2', 'hair.f.eyebrow.3', 'hair.f.eyebrow.4'],
    successRate: 94,
  },
];

export function Hair() {
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
            src="https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
            alt="Hair Restoration"
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
            {t('hair.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {t('hair.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {hairTreatments.map((treatment, index) => (
              <motion.div
                key={treatment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow border border-border/50"
              >
                {/* Interactive Before/After Slider */}
                <div className="p-4 relative">
                  <BeforeAfterSlider 
                    beforeImage={treatment.image} 
                    afterImage={treatment.beforeAfter} 
                  />
                  <div className="absolute top-6 right-6 bg-primary text-white z-10 px-3 py-1 rounded-full text-sm flex items-center shadow-lg pointer-events-none">
                    <Star className="w-4 h-4 mr-1 fill-white" />
                    {treatment.successRate}%
                  </div>
                </div>

                {/* Treatment Info */}
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-3xl font-bold text-secondary tracking-tight">
                          {t(`hair.treatment.${treatment.key}.title`)}
                        </h3>
                      </div>
                      
                      <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
                        {t(`hair.treatment.${treatment.key}.desc`)}
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
                          <Star className="w-4 h-4 mr-2 text-primary" />
                          {t('common.successRate')}
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">{t('common.successfulResults')}</span>
                            <span className="font-bold text-secondary">{treatment.successRate}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${treatment.successRate}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className="bg-primary h-full rounded-full" 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
                        <Clock className="w-5 h-5 text-primary mr-3" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{t('common.procedure')}</p>
                          <p className="text-sm font-bold text-secondary">6-8 {t('common.hours')} ({t('common.oneDay')})</p>
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

      {/* Why Choose Us for Hair */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t('feature.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'hair.why.1.title', desc: 'hair.why.1.desc' },
              { title: 'hair.why.2.title', desc: 'hair.why.2.desc' },
              { title: 'hair.why.3.title', desc: 'hair.why.3.desc' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card p-8 rounded-2xl shadow-lg text-center border border-border/50"
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl mb-3">{t(item.title)}</h3>
                <p className="text-muted-foreground">{t(item.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Testimonial */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-secondary">{t('testimonials.title')}</h2>
          <p className="text-lg text-muted-foreground mb-12">{t('testimonials.subtitle')}</p>
          <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/50">
            <div className="flex items-center justify-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-lg text-muted-foreground italic mb-4">
              "{t('testimonials.3.text')}"
            </p>
            <p className="font-semibold">{t('testimonials.3.name')}</p>
            <p className="text-sm text-muted-foreground">{t('testimonials.3.treatment')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-secondary to-secondary/90 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-white/80 mb-10">{t('home.cta.subtitle')}</p>
          <Link
            to="/booking"
            className="inline-flex items-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-1 transition-all"
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
