import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, Shield, ChevronDown, Check } from 'lucide-react';
import { useState, useRef } from 'react';
import { toast } from 'sonner';

const locations = [
  {
    id: 1,
    city: 'Istanbul',
    country: 'Turkey',
    address: 'Gürsel mahallesi 28 nisan caddesi no.6 D.3 Kağıthane İstanbul',
    phone: '+90 505 660 63 56',
    email: 'info@gravity-clinic.com',
    hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
  },
  {
    id: 2,
    city: 'London',
    country: 'United Kingdom',
    address: '123 Harley Street, London W1G 6BA',
    phone: '+44 20 7123 4567',
    email: 'london@mediclinic.com',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
  },
  {
    id: 3,
    city: 'Dubai',
    country: 'UAE',
    address: 'Dubai Healthcare City, Building 27',
    phone: '+971 4 123 4567',
    email: 'dubai@mediclinic.com',
    hours: 'Sun-Thu: 9:00 AM - 6:00 PM',
  },
];

const faqs = [
  {
    question: 'How long do I need to stay for treatment?',
    answer: 'Treatment duration varies. Dental procedures typically require 3-7 days, while hair transplants need 2-3 days. We provide detailed timelines during consultation.',
  },
  {
    question: 'Do you provide airport transfers and accommodation?',
    answer: 'Yes! We offer all-inclusive packages that include airport pickup, hotel accommodation, and transportation to the clinic.',
  },
  {
    question: 'What languages do your staff speak?',
    answer: 'Our multilingual team speaks English, French, Russian, Arabic, German, Spanish, and Turkish to ensure comfortable communication.',
  },
  {
    question: 'Are your treatments guaranteed?',
    answer: 'We offer lifetime guarantees on dental implants and 12-month guarantees on hair transplants. Full details are provided in your treatment contract.',
  },
  {
    question: 'How do I make a payment?',
    answer: 'We accept bank transfers, credit cards, and cash payments. Payment plans are available for treatments over $3,000.',
  },
  {
    question: 'What if I need follow-up care?',
    answer: 'We provide comprehensive aftercare instructions and offer telemedicine follow-ups. We also partner with clinics worldwide for in-person follow-ups if needed.',
  },
];

export function Contact() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botField: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField !== '') return;
    toast.success('Message sent successfully! We will respond within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '', botField: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src="https://images.unsplash.com/photo-1758551464584-170cb5a7bc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdG91cmlzbSUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3MzY5MzEyNnww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
          >
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium tracking-wide">24/7 Global Support</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            {t('contact.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light"
          >
            {t('contact.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">{t('contact.form.title')}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot Field */}
                <div className="absolute opacity-0 -z-50 h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="bot_field_contact">Do not fill this out if you are human.</label>
                  <input 
                    type="text" 
                    id="bot_field_contact" 
                    name="bot_field_contact" 
                    value={formData.botField} 
                    onChange={(e) => handleInputChange('botField', e.target.value)} 
                    tabIndex={-1} 
                    autoComplete="off" 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.name')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.email')} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('contact.subject')} *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t('booking.message')} *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold font-playfair rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all cursor-pointer"
                >
                  {t('contact.send')}
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl mb-6">{t('contact.info.title')}</h2>
                <p className="text-muted-foreground mb-6">
                  {t('contact.info.desc')}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">+90 505 660 63 56</p>
                    <p className="text-muted-foreground">+90 544 792 46 66</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@gravity-clinic.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold mb-1">{t('contact.workingHours')}</h3>
                    <p className="text-muted-foreground">{t('contact.monSat')}: 9:00 AM - 6:00 PM</p>
                    <p className="text-muted-foreground">{t('contact.sunday')}: {t('contact.closed')}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1758551464584-170cb5a7bc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdG91cmlzbSUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3MzY5MzEyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Our Location"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Locations */}
      <section className="py-20 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t('contact.locations')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card text-card-foreground border border-border rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl mb-2">{location.city}</h3>
                <p className="text-muted-foreground text-sm mb-4">{location.country}</p>
                <div className="space-y-2 text-sm">
                  <p className="text-foreground/80">{location.address}</p>
                  <p className="text-foreground/80 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    {location.phone}
                  </p>
                  <p className="text-foreground/80 flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary" />
                    {location.email}
                  </p>
                  <p className="text-foreground/80 flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                    {location.hours}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4 tracking-tight">
              {t('contact.faq')}
            </h2>
            <p className="text-muted-foreground text-lg">{t('contact.faq.subtitle')}</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-[2rem] border transition-all duration-300 ${
                  openFaq === index 
                    ? 'border-primary bg-primary/5 shadow-xl shadow-primary/5' 
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <span className={`text-lg font-bold transition-colors ${openFaq === index ? 'text-primary' : 'text-secondary font-semibold'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? 'bg-primary text-white rotate-180' : 'bg-muted text-muted-foreground'}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 pt-2">
                        <p className="text-muted-foreground leading-relaxed text-lg border-l-2 border-primary/20 pl-6">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
