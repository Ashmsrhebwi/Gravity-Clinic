import { Link, useLocation } from 'react-router';
import { useLanguage, Language } from '../context/LanguageContext';
import { Menu, X, Globe, ChevronDown, Search, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const flags: Record<Language, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  ru: '🇷🇺',
  ar: '🇸🇦',
};

const languageNames: Record<Language, string> = {
  en: 'English',
  fr: 'Français',
  ru: 'Русский',
  ar: 'العربية',
};

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { 
      label: t('nav.dental'), 
      isDropdown: true,
      items: [
        { path: '/dental', label: t('nav.dental.implants') },
        { path: '/dental', label: t('nav.dental.hollywood') },
      ]
    },
    { 
      label: t('nav.hair'), 
      isDropdown: true,
      items: [
        { path: '/hair', label: t('nav.hair.male') },
        { path: '/hair', label: t('nav.hair.female') },
        { path: '/hair', label: t('nav.hair.beard') },
        { path: '/hair', label: t('nav.hair.eyebrow') },
      ]
    },
    { 
      label: t('nav.about'), 
      isDropdown: true,
      items: [
        { path: '/booking', label: t('nav.about.appointment') },
        { path: '/articles', label: t('nav.about.blog') },
        { path: '/contact', label: t('nav.about.contact') },
      ]
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'top-0 bg-white/95 backdrop-blur-xl shadow-2xl py-0 border-b border-secondary/5' 
          : 'top-0 bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 group">
            <div className="relative">
              <img src="/logo.png" alt="Gravity Clinic" className="h-14 w-auto object-contain transition-transform group-hover:scale-105" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.label} className="relative group px-1">
                <button 
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500 opacity-50" />
                </button>
                
                {/* Mega Menu / Dropdown */}
                <div className="absolute top-full left-0 pt-4 opacity-0 -translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-500">
                  <div className="bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-border/40 p-6 min-w-[280px] backdrop-blur-3xl">
                    <div className="grid gap-2">
                      {link.items?.map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="flex items-center justify-between px-5 py-4 rounded-[1.25rem] transition-all hover:bg-primary/5 group/item"
                        >
                          <span className="text-sm font-bold text-secondary group-hover/item:text-primary transition-colors">
                            {item.label}
                          </span>
                          <ArrowRight className="w-4 h-4 text-primary opacity-0 -translate-x-4 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center ml-4 space-x-4 border-l border-border/20 pl-6">
              {/* Search Toggle */}
              <button 
                className={`p-2.5 rounded-xl transition-all ${
                  scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-xl transition-all ${
                    scrolled ? 'text-secondary hover:bg-secondary/5' : 'text-white hover:bg-white/10'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-black uppercase">{language}</span>
                </button>

                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 10 }}
                      className="absolute right-0 mt-4 w-48 bg-white/90 backdrop-blur-2xl border border-border/40 rounded-[2rem] shadow-2xl py-3 overflow-hidden"
                    >
                      {(Object.keys(flags) as Language[]).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setLanguage(lang);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-6 py-3 text-left hover:bg-primary/5 flex items-center justify-between group ${
                            language === lang ? 'bg-primary/5 text-primary' : 'text-secondary font-bold'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{flags[lang]}</span>
                            <span className="text-xs uppercase tracking-widest">{languageNames[lang]}</span>
                          </div>
                          {language === lang && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* CTA Button */}
              <Link
                to="/booking"
                className="ml-2 px-8 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
              >
                {t('nav.booking')}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-4">
             <button className={`p-2 rounded-xl ${scrolled ? 'text-secondary' : 'text-white'}`}>
                <Search className="w-5 h-5" />
             </button>
             <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl transition-colors ${
                scrolled ? 'text-secondary bg-secondary/5' : 'text-white bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden bg-secondary flex flex-col pt-24 px-8"
          >
            <div className="space-y-6 overflow-y-auto pb-12">
              {navLinks.map((link) => (
                <div key={link.label} className="space-y-4">
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">
                    {link.label}
                  </div>
                  <div className="grid gap-4">
                    {link.items?.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center justify-between"
                      >
                        {item.label}
                        <ArrowRight className="w-6 h-6 opacity-20" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-8 mt-8 border-t border-white/10 space-y-8">
                 <div className="grid grid-cols-2 gap-4">
                    {(Object.keys(flags) as Language[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => {
                          setLanguage(lang);
                          setMobileMenuOpen(false);
                        }}
                        className={`px-6 py-4 rounded-[1.5rem] flex items-center gap-3 transition-all ${
                          language === lang ? 'bg-primary text-white' : 'bg-white/5 text-white/60'
                        }`}
                      >
                        <span className="text-xl">{flags[lang]}</span>
                        <span className="text-xs font-black uppercase tracking-widest">{lang}</span>
                      </button>
                    ))}
                 </div>
                 <Link
                    to="/booking"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-6 bg-primary text-white font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-primary/30"
                  >
                    {t('nav.booking')}
                  </Link>
              </div>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 p-3 bg-white/10 rounded-2xl text-white"
            >
              <X className="w-8 h-8" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
