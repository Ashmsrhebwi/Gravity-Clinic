import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Calendar, User, ArrowRight, Shield, Bell, ChevronRight, Share2 } from 'lucide-react';
import { useState, useRef } from 'react';

const articles = [
  // Dental Articles
  {
    id: 1,
    category: 'dental',
    title: 'Modern Dental Implants: Restoring Your Natural Smile',
    excerpt: 'Everything you need to know about dental implants, from procedure to recovery.',
    image: 'https://images.unsplash.com/photo-1565090567208-c8038cfcf6cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBpbXBsYW50cyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Sarah Williams',
    date: 'March 10, 2026',
    readTime: '5 min read',
  },
  {
    id: 2,
    category: 'dental',
    title: 'Zirconium Crowns: Long-lasting Aesthetic Results',
    excerpt: 'Compare different whitening methods and find the best option for your smile.',
    image: 'https://images.unsplash.com/photo-1611690061822-b707a67bfebb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWV0aCUyMHdoaXRlbmluZyUyMHNtaWxlfGVufDF8fHx8MTc3MzYyMjc1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Michael Chen',
    date: 'March 8, 2026',
    readTime: '4 min read',
  },
  {
    id: 3,
    category: 'dental',
    title: 'The Benefits of Hollywood Smile for Total Transformation',
    excerpt: 'Discover how porcelain veneers can transform your teeth and boost confidence.',
    image: 'https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjB2ZW5lZXJzJTIwcGVyZmVjdHxlbnwxfHx8fDE3NzM2OTMxMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Emily Brown',
    date: 'March 5, 2026',
    readTime: '6 min read',
  },
  {
    id: 4,
    category: 'dental',
    title: 'Orthodontics: Modern Solutions for Straight Teeth',
    excerpt: 'Explore the latest orthodontic treatments including clear aligners and braces.',
    image: 'https://images.unsplash.com/photo-1598531228433-d9f0cb960816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcnRob2RvbnRpYyUyMGJyYWNlcyUyMHRlZXRofGVufDF8fHx8MTc3MzY3NjM2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. James Wilson',
    date: 'March 3, 2026',
    readTime: '5 min read',
  },
  {
    id: 5,
    category: 'dental',
    title: 'Dental Crowns: Types and Benefits',
    excerpt: 'Learn about different crown materials and which option is best for you.',
    image: 'https://images.unsplash.com/photo-1771442873035-474765b40ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjcm93biUyMHByb2NlZHVyZXxlbnwxfHx8fDE3NzM2NzI2NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Lisa Anderson',
    date: 'March 1, 2026',
    readTime: '4 min read',
  },
  {
    id: 6,
    category: 'dental',
    title: 'Root Canal Treatment: What to Expect',
    excerpt: 'Demystifying root canal procedures and addressing common concerns.',
    image: 'https://images.unsplash.com/photo-1664530838183-571e4f46040a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb290JTIwY2FuYWwlMjB0cmVhdG1lbnR8ZW58MXx8fHwxNzczNjg4NTU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Robert Taylor',
    date: 'February 28, 2026',
    readTime: '5 min read',
  },
  // Hair Articles
  {
    id: 7,
    category: 'hair',
    title: 'Hair Transplant: Procedure and Recovery Expectations',
    excerpt: 'Compare FUE and DHI techniques to determine the best method for your needs.',
    image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Ahmed Hassan',
    date: 'March 12, 2026',
    readTime: '7 min read',
  },
  {
    id: 8,
    category: 'hair',
    title: 'Sapphire FUE: The Premium Hair Transplant',
    excerpt: 'Discover why Sapphire FUE is becoming the gold standard in hair restoration.',
    image: 'https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbG9zcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Mehmet Ozturk',
    date: 'March 9, 2026',
    readTime: '6 min read',
  },
  {
    id: 9,
    category: 'hair',
    title: 'PRP Therapy: Natural Hair Growth Solution',
    excerpt: 'Learn how PRP therapy stimulates hair growth using your own blood platelets.',
    image: 'https://images.unsplash.com/photo-1758315949140-1972ace0644e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwaGFpciUyMGdyb3d0aHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Sofia Martinez',
    date: 'March 7, 2026',
    readTime: '5 min read',
  },
  {
    id: 10,
    category: 'hair',
    title: 'Hair Transplant Recovery: Tips and Timeline',
    excerpt: 'Essential guide to post-transplant care and what to expect during recovery.',
    image: 'https://images.unsplash.com/photo-1758544518111-53274094598e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwcmVzdG9yYXRpb24lMjByZXN1bHR8ZW58MXx8fHwxNzczNjkzMTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. David Lee',
    date: 'March 4, 2026',
    readTime: '6 min read',
  },
  {
    id: 11,
    category: 'hair',
    title: 'Beard Transplant: Guide to Facial Hair Restoration',
    excerpt: 'Achieve a fuller, more defined beard with modern transplant techniques.',
    image: 'https://images.unsplash.com/photo-1759813641406-980519f58b1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwdHJhbnNwbGFudCUyMHN1cmdlcnl8ZW58MXx8fHwxNzczNjkzMTIwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Omar Al-Rashid',
    date: 'March 2, 2026',
    readTime: '5 min read',
  },
  {
    id: 12,
    category: 'hair',
    title: 'Hair Loss Prevention: Early Intervention Strategies',
    excerpt: 'Proactive approaches to prevent hair loss and maintain healthy hair growth.',
    image: 'https://images.unsplash.com/photo-1773078280516-df823e1c9d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwbG9zcyUyMHRyZWF0bWVudHxlbnwxfHx8fDE3NzM2OTMxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Jennifer Kim',
    date: 'February 27, 2026',
    readTime: '6 min read',
  },
];

export function Articles() {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dental' | 'hair'>('all');

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: backgroundY }}
        >
          <img
            src="https://images.unsplash.com/photo-1758551464584-170cb5a7bc69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdG91cmlzbSUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc3MzY5MzEyNnww&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
            alt="Knowledge Center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-secondary/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </motion.div>

        <motion.div 
          style={{ y: textY, opacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-8 border border-white/20"
          >
            <Shield className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium tracking-wide italic">{t('articles.hero.badge')}</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter mb-4"
          >
            {t('nav.articles')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-light max-w-3xl mx-auto"
          >
            {t('articles.hero.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Premium Category Filter */}
      <section className="sticky top-20 z-40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="bg-white/80 backdrop-blur-2xl p-2 rounded-[2rem] border border-border/40 shadow-xl flex gap-2">
              {['all', 'dental', 'hair'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category as 'all' | 'dental' | 'hair')}
                  className={`px-8 py-3 rounded-2xl transition-all font-bold text-sm tracking-widest uppercase ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-2xl shadow-primary/40'
                      : 'text-muted-foreground hover:text-secondary'
                  }`}
                >
                  {category === 'all' 
                    ? t('articles.filter.all') 
                    : category === 'dental' 
                    ? t('articles.filter.dental') 
                    : t('articles.filter.hair')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  layout
                  variants={item}
                  key={article.id}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[2.5rem] border border-border/40 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 hover:-translate-y-2"
                >
                  <div className="aspect-[16/11] overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-6 right-6">
                      <div className="px-4 py-1 bg-white/90 backdrop-blur-md text-secondary rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${
                        article.category === 'dental' ? 'text-primary' : 'text-secondary'
                      }`}>
                        {article.category === 'dental' ? t('nav.dental') : t('nav.hair')} {t('common.restoration')}
                      </span>
                      <Share2 className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                    </div>

                    <h3 className="text-2xl font-bold text-secondary mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed mb-8 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <div className="pt-8 border-t border-muted flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted border-2 border-primary/20 flex items-center justify-center overflow-hidden">
                           <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-secondary">{article.author}</p>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{article.date}</p>
                        </div>
                      </div>
                      <button className="w-12 h-12 rounded-2xl bg-muted group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Premium Newsletter Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary p-12 md:p-20 rounded-[4rem] relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center px-4 py-2 bg-white/5 rounded-full mb-8"
              >
                <Bell className="w-4 h-4 text-primary mr-2" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('articles.newsletter.badge')}</span>
              </motion.div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {t('articles.newsletter.title')}
              </h2>
              <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                {t('articles.newsletter.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                <input
                  type="email"
                  placeholder="name@exclusive.com"
                  className="bg-transparent text-white px-8 py-4 outline-none flex-1 font-medium placeholder:text-white/20"
                />
                  <button className="px-12 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl shadow-primary/20">
                     {t('articles.newsletter.cta')}
                  </button>
              </div>
              <p className="mt-6 text-white/30 text-[10px] uppercase font-bold tracking-[0.2em]">
                Privacy guaranteed &bull; One-click unsubscribe &bull; Exclusive pearls
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
