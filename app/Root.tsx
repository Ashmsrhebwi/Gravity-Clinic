import { Outlet } from 'react-router';
import { Navigation } from './components/Navigation';
import { useLanguage } from './context/LanguageContext';
import { Mail, Phone, Facebook, Instagram, Twitter, Youtube, MessageCircle, ChevronUp, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';

export function Root() {
  const { t, language } = useLanguage();

  // Set document direction for RTL languages
  useEffect(() => {
    if (language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setShowScrollTop(latest > 400);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-[100]"
          style={{ scaleX }}
        />
        <Navigation />
      
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating Actions */}
      <div className="fixed bottom-8 right-8 z-[60] flex flex-col gap-4">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="p-4 bg-white/80 backdrop-blur-md text-secondary rounded-2xl shadow-2xl border border-secondary/10 hover:bg-white transition-all group"
            >
              <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-1" />
            </motion.button>
          )}
        </AnimatePresence>
        
        <motion.a
          href="https://wa.me/902125550123"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-4 bg-[#25D366] text-white rounded-2xl shadow-2xl shadow-[#25D366]/30 hover:scale-110 active:scale-95 transition-all group relative"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-secondary text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {t('common.whatsappSupport')}
          </span>
        </motion.a>
      </div>

      {/* Premium Footer */}
      <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Brand Column */}
            <div className="space-y-8">
              <div className="bg-white/10 p-4 rounded-3xl inline-block backdrop-blur-md border border-white/10">
                <img src="/logo.png" alt="Gravity Clinic" className="h-12 w-auto brightness-0 invert" />
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {t('footer.desc')}
              </p>
              <div className="flex space-x-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Treatment Links */}
            <div>
              <h3 className="text-xl font-bold mb-8 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-3 text-primary" />
                {t('footer.expertise')}
              </h3>
              <ul className="space-y-4">
                {[
                  { label: t('nav.dental.implants'), to: '/dental' },
                  { label: t('nav.dental.hollywood'), to: '/dental' },
                  { label: t('hair.title'), to: '/hair' },
                  { label: 'FUE', to: '/hair' },
                  { label: t('hair.beard'), to: '/hair' },
                  { label: t('hair.prp'), to: '/hair' }
                ].map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-white/60 hover:text-primary hover:translate-x-2 transition-all duration-300 inline-block">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Links */}
            <div>
              <h3 className="text-xl font-bold mb-8">{t('footer.navigation')}</h3>
              <ul className="space-y-4 text-white/60">
                <li><Link to="/" className="hover:text-primary transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/doctors" className="hover:text-primary transition-colors">{t('nav.doctors')}</Link></li>
                <li><Link to="/articles" className="hover:text-primary transition-colors">{t('nav.articles')}</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
                <li><Link to="/booking" className="hover:text-primary transition-colors">{t('nav.booking')}</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
              <h3 className="text-xl font-bold mb-8">{t('footer.contact')}</h3>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">{t('footer.whatsapp')}</p>
                    <p className="font-bold">+90 212 555 0123</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">{t('footer.istanbul')}</p>
                    <p className="font-bold">{t('footer.address')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mr-4 shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50 uppercase font-bold tracking-widest mb-1">{t('footer.hours')}</p>
                    <p className="font-bold">{t('footer.monSat')}: 09:00 - 19:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm tracking-wide">
              {t('footer.copyright')}
            </p>
            <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-white/40">
              <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}