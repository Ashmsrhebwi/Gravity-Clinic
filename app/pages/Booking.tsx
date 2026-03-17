import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { Check, ArrowRight, ArrowLeft, Calendar as CalendarIcon, User, Clipboard, CheckCircle, Shield, Clock, MapPin, Globe } from 'lucide-react';
import { toast } from 'sonner';

const treatments = [
  'dental.implants',
  'dental.whitening',
  'dental.veneers',
  'dental.braces',
  'dental.crowns',
  'dental.rootcanal',
  'hair.fue',
  'hair.dhi',
  'hair.sapphire',
  'hair.prp',
  'hair.beard',
  'hair.eyebrow',
];

export function Booking() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    treatment: '',
    date: '',
    message: '',
    botField: '',
  });

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField !== '') return;
    toast.success('Booking submitted successfully! We will contact you soon.');
    setCurrentStep(5); // Success state
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2: return formData.treatment;
      case 3: return formData.date;
      default: return true;
    }
  };

  const stepIcons = [User, Clipboard, CalendarIcon, CheckCircle];

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
            alt="Booking"
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
            <span className="text-sm font-medium tracking-wide">Secure Global Reservation</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          >
            {t('booking.title')}
          </motion.h1>
          <p className="text-xl text-white/80 font-light">{t('booking.hero.subtitle')}</p>
        </motion.div>
      </section>

      {/* Progress Stepper */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-border/40 backdrop-blur-xl bg-white/90">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -z-10" />
            {[1, 2, 3, 4].map((step) => {
              const Icon = stepIcons[step - 1];
              const isActive = step <= currentStep;
              const isCompleted = step < currentStep;
              
              return (
                <div key={step} className="flex flex-col items-center group">
                  <motion.div
                    animate={{
                      scale: step === currentStep ? 1.1 : 1,
                      backgroundColor: isActive ? 'var(--primary)' : 'var(--muted)',
                    }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'text-white shadow-xl shadow-primary/30' : 'text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </motion.div>
                  <span className={`mt-3 text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {t(`booking.step${step}`).split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <AnimatePresence mode="wait">
          {currentStep === 5 ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-primary/10"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-4xl font-bold text-secondary mb-4">{t('booking.success.title')}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                {t('booking.success.desc').replace('{name}', formData.firstName)}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-12">
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <Clock className="w-5 h-5 text-primary mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Response Time</p>
                  <p className="font-bold text-secondary">Within 4 Hours</p>
                </div>
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <MapPin className="w-5 h-5 text-primary mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Consultation</p>
                  <p className="font-bold text-secondary">Free & Remote</p>
                </div>
                <div className="p-6 bg-muted/30 rounded-2xl">
                  <Globe className="w-5 h-5 text-primary mb-3" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">International</p>
                  <p className="font-bold text-secondary">VIP Protocol</p>
                </div>
              </div>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-10 py-4 bg-secondary text-white font-bold rounded-full hover:bg-secondary/90 transition-all"
              >
                Return to Experience Center
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-border/40"
            >
              <div className="p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {currentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="col-span-2">
                        <h2 className="text-3xl font-bold text-secondary mb-2">{t('booking.step1')}</h2>
                        <p className="text-muted-foreground">{t('booking.step1.desc')}</p>
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">First Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border bg-muted/10 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">Last Name</label>
                        <input 
                          type="text" 
                          required 
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border bg-muted/10 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">Email Address</label>
                        <input 
                          type="email" 
                          required 
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border bg-muted/10 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">Phone Number</label>
                        <input 
                          type="tel" 
                          required 
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-6 py-4 rounded-2xl border bg-muted/10 border-border focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold text-secondary mb-2">{t('booking.step2')}</h2>
                        <p className="text-muted-foreground">{t('booking.step2.desc')}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {treatments.map((treatmentKey) => (
                          <button
                            key={treatmentKey}
                            type="button"
                            onClick={() => handleInputChange('treatment', treatmentKey)}
                            className={`px-6 py-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ${
                              formData.treatment === treatmentKey ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border hover:border-primary/30'
                            }`}
                          >
                            <span className={`font-bold ${formData.treatment === treatmentKey ? 'text-primary' : 'text-secondary'}`}>{t(treatmentKey)}</span>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              formData.treatment === treatmentKey ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/50'
                            }`}>
                              {formData.treatment === treatmentKey && <Check className="w-4 h-4 text-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold text-secondary mb-2">{t('booking.step3')}</h2>
                        <p className="text-muted-foreground">{t('booking.step3.desc')}</p>
                      </div>
                      <div className="space-y-6">
                        <div className="relative">
                          <CalendarIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-primary w-5 h-5 pointer-events-none" />
                          <input 
                            type="date" 
                            required 
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className="w-full pl-16 pr-6 py-5 rounded-2xl border bg-muted/10 border-border focus:border-primary outline-none transition-all font-bold text-secondary"
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground pl-1">Additional Requirements</label>
                          <textarea 
                            rows={5}
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Tell us about any medical history or specific expectations..."
                            className="w-full px-6 py-4 rounded-2xl border bg-muted/10 border-border focus:border-primary outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-3xl font-bold text-secondary mb-2">{t('booking.step4')}</h2>
                        <p className="text-muted-foreground">{t('booking.step4.desc')}</p>
                      </div>
                      <div className="bg-muted/30 rounded-[2rem] p-8 space-y-6 border border-border/50">
                        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('booking.firstName')} & {t('booking.lastName')}</p>
                            <p className="text-xl font-bold text-secondary">{formData.firstName} {formData.lastName}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('booking.treatment')}</p>
                            <p className="text-xl font-bold text-primary">{t(formData.treatment)}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('booking.email')}</p>
                            <p className="font-bold text-secondary">{formData.email}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">{t('booking.phone')}</p>
                            <p className="font-bold text-secondary">{formData.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                        <Shield className="w-6 h-6 text-primary shrink-0" />
                        <p className="text-sm text-secondary leading-relaxed">
                          Your data is encrypted following international healthcare security standards (HIPAA/GDPR compliance).
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Nav Actions */}
                  <div className="flex items-center justify-between pt-12 border-t border-border">
                    <button
                      type="button"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      className={`px-10 py-4 rounded-full font-bold transition-all flex items-center gap-2 ${
                        currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-secondary hover:bg-muted'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>
                    
                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="px-12 py-4 bg-primary text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 group"
                      >
                        Continue Phase
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="px-12 py-4 bg-primary text-white font-bold rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-2"
                      >
                        Confirm Booking
                        <CheckCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
