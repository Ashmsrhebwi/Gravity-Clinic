import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Star, Award, Clock, Languages, Shield, UserCheck, GraduationCap, Globe, Phone, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { useRef, useState } from 'react';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Williams',
    specialty: 'doctors.sarah.specialty',
    image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwcHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MXx8fHwxNzczNjkzMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    experience: '15+',
    patients: '5000+',
    languages: ['English', 'French', 'Spanish'],
    bio: 'doctors.sarah.bio',
    specialties: ['Dental Implants', 'Veneers', 'Smile Makeover'],
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'doctors.michael.specialty',
    image: 'https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzY2MDMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    experience: '12+',
    patients: '4200+',
    languages: ['English', 'Mandarin', 'Japanese'],
    bio: 'doctors.michael.bio',
    specialties: ['Braces', 'Invisalign', 'Jaw Alignment'],
  },
  {
    id: 3,
    name: 'Dr. Ahmed Hassan',
    specialty: 'doctors.ahmed.specialty',
    image: 'https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZW9uJTIwc3BlY2lhbGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY5MzEyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 5.0,
    experience: '18+',
    patients: '8000+',
    languages: ['English', 'Arabic', 'Turkish'],
    bio: 'doctors.ahmed.bio',
    specialties: ['FUE', 'DHI', 'Sapphire FUE'],
  },
  {
    id: 4,
    name: 'Dr. Emily Brown',
    specialty: 'doctors.emily.specialty',
    image: 'https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzY2MDMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    experience: '10+',
    patients: '3500+',
    languages: ['English', 'German', 'Italian'],
    bio: 'doctors.emily.bio',
    specialties: ['Teeth Whitening', 'Bonding', 'Gum Contouring'],
  },
  {
    id: 5,
    name: 'Dr. Mehmet Ozturk',
    specialty: 'doctors.mehmet.specialty',
    image: 'https://images.unsplash.com/photo-1643837833100-8b2ebd7127bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3VyZ2VvbiUyMHNwZWNpYWxpc3R8ZW58MXx8fHwxNzczNjkzMTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.9,
    experience: '14+',
    patients: '6500+',
    languages: ['English', 'Turkish', 'Russian'],
    bio: 'doctors.mehmet.bio',
    specialties: ['Beard Transplant', 'Eyebrow Transplant', 'PRP Therapy'],
  },
  {
    id: 6,
    name: 'Dr. Lisa Anderson',
    specialty: 'doctors.lisa.specialty',
    image: 'https://images.unsplash.com/photo-1758691461516-7e716e0ca135?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzY2MDMyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    experience: '11+',
    patients: '4000+',
    languages: ['English', 'Portuguese', 'French'],
    bio: 'doctors.lisa.bio',
    specialties: ['Root Canal', 'Retreatment', 'Apicoectomy'],
  },
];

export function Doctors() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [hoveredDoctor, setHoveredDoctor] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src="https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnZW9uJTIwc3BlY2lhbGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY5MzEyNHww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
            alt="Our Specialists"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E1C4B]/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E1C4B]/20 to-[#1E1C4B]/40"></div>
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
            <span className="text-sm font-medium tracking-wide">World-Class Medical Team</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 font-bold tracking-tight drop-shadow-2xl"
          >
            {t('doctors.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {t('doctors.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Specialist Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredDoctor(doctor.id)}
                onMouseLeave={() => setHoveredDoctor(null)}
                className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-border/40"
              >
                {/* Doctor Image & Profile Hook */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center justify-between text-white/90 mb-2">
                       <span className="text-xs font-bold uppercase tracking-widest text-primary">{t(doctor.specialty)}</span>
                       <div className="flex items-center bg-white/10 backdrop-blur-md px-2 py-1 rounded-lg">
                         <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 mr-1" />
                         <span className="text-xs font-bold">{doctor.rating}</span>
                       </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{doctor.name}</h3>
                    
                    <div className="flex items-center gap-4 text-white/80 text-sm">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1.5 text-primary" />
                        <span>{doctor.experience} {t('common.years')}</span>
                      </div>
                      <div className="flex items-center">
                        <UserCheck className="w-4 h-4 mr-1.5 text-primary" />
                        <span>{doctor.patients} {t('common.patients')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Hover Reveal Profile Details */}
                  <AnimatePresence>
                    {hoveredDoctor === doctor.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute inset-0 bg-secondary/95 backdrop-blur-xl p-8 flex flex-col justify-between text-white"
                      >
                        <div>
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mr-4">
                              <GraduationCap className="text-primary w-6 h-6" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">{t('common.education')}</p>
                              <p className="text-sm font-medium">Board Certified Specialist</p>
                            </div>
                          </div>
                          <p className="text-white/80 text-sm leading-relaxed mb-8 italic">
                            "{t(doctor.bio)}"
                          </p>
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Key Specialties</p>
                              <div className="flex flex-wrap gap-2">
                                {doctor.specialties.map(spec => (
                                  <span key={spec} className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium">
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">{t('common.languages')}</p>
                              <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-white/60" />
                                <div className="flex gap-2">
                                  {doctor.languages.map(lang => (
                                    <span key={lang} className="text-xs font-medium text-white/80">{lang}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Link
                          to="/booking"
                          className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-colors group/btn"
                        >
                          {t('common.viewProfile')}
                          <ChevronRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Doctors Section */}
      <section className="py-20 bg-[#F7F8FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">{t('feature.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'International Certification',
                desc: 'All our doctors are board-certified with credentials from leading medical institutions worldwide.',
              },
              {
                icon: Star,
                title: 'Proven Track Record',
                desc: 'Thousands of successful procedures with consistently high patient satisfaction ratings.',
              },
              {
                icon: Languages,
                title: 'Multilingual Staff',
                desc: 'Communicate comfortably in your preferred language with our diverse medical team.',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-card p-8 rounded-2xl shadow-lg text-center border border-border/40"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-secondary">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
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
            className="inline-flex items-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 transition-all"
          >
            {t('common.bookNow')}
          </Link>
        </div>
      </section>
    </div>
  );
}
