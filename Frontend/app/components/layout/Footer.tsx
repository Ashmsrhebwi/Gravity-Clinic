import { useLanguage } from '../../context/LanguageContext';
import { useDashboard } from '../../context/DashboardContext';
import { Link } from 'react-router';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  Facebook,
  Instagram,
  Twitter,
  X,
  Linkedin
} from 'lucide-react';

const TikTokIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const iconMap: Record<string, any> = {
  Facebook,
  Instagram,
  Twitter,
  X,
  Linkedin,
  TikTok: TikTokIcon
};

export function Footer() {
  const { language, t } = useLanguage();
  const { state } = useDashboard();

  // Helper to extract value safely from string OR multilingual object
  const getVal = (val: any) => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    return val[language] || val.en || "";
  };

  return (
    <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden relative" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 sm:gap-16 mb-20 lg:items-start">
          {/* Brand Column */}
          <div className="space-y-8 max-w-sm">
            <div className="bg-white/10 p-4 rounded-3xl inline-block backdrop-blur-md border border-white/10">
              <img src={state.branding.logo || "/logo"} alt={getVal(state.branding.name)} className="h-10 w-auto" />
            </div>
            <p className="text-white/60 leading-relaxed text-sm max-w-xs">
              {getVal(state.seo.description) || getVal(state.branding.name) || 'World-class medical tourism in Istanbul.'}
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 flex-1 lg:justify-center">
            {state.navLinks.map((section) => (
              <div key={section.id} className="min-w-[120px]">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-primary">
                  {getVal(section.label)}
                </h3>
                <ul className="space-y-4">
                  {section.children?.map((item: any) => (
                    <li key={item.id}>
                      <Link to={item.path || '#'} className="text-white/40 hover:text-white hover:translate-x-1 transition-all inline-block text-[13px] font-bold">
                        {getVal(item.label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="w-full lg:w-auto lg:min-w-[280px]">
            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/5 backdrop-blur-3xl h-full">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 text-white">{t('footer.contact')}</h3>
              <ul className="space-y-8 lg:space-y-6">
                {[
                  {
                    icon: Phone,
                    label: t('footer.whatsapp'),
                    value: state.whatsapp.phoneNumber || (state.locations[0]?.phone)
                  },
                  {
                    icon: MapPin,
                    label: getVal(state.locations[0]?.city) || t('footer.istanbul'),
                    value: getVal(state.locations[0]?.address) || t('footer.address') || 'Istanbul, Turkey'
                  },
                  ...(state.locations[0]?.email ? [{
                    icon: Mail,
                    label: t('footer.email') || 'Email Us',
                    value: state.locations[0].email
                  }] : [])
                ].map((item, idx) => (
                  <li key={idx} className="flex flex-col items-start gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-primary font-black uppercase tracking-[0.4em] mb-2 opacity-80">
                        {item.label}
                      </p>
                      <p className={`font-bold text-white transition-colors duration-300 ${item.icon === Phone ? 'text-lg sm:text-xl whitespace-nowrap' : 'text-sm leading-relaxed'}`}>
                        {item.value ?? ''}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <p className="text-white/30 text-[11px] font-medium tracking-wide">
              &copy; {new Date().getFullYear()} {state.branding.name[language]}. {t('footer.copyright')}
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {state.socialLinks.filter(link => link.is_active).map((link, i) => {
              const Icon = iconMap[link.icon_name] || iconMap[link.platform] || Instagram;
              return (
                <a
                  key={link.id || i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/5"
                  title={link.platform}
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
