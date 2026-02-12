import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.1 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger initial animation after mount
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isVisible = isLoaded || isInView;

  return (
    <section 
      ref={ref}
      className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center space-y-10 relative pt-32 pb-48"
    >
      {/* Top connector line */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-slate-300/80 transition-transform duration-1000 ease-out ${
          isVisible ? 'scale-y-100' : 'scale-y-0'
        }`}
        style={{ transformOrigin: 'top' }}
      />
      
      {/* Top node with glow pulse on reveal */}
      <div 
        className={`absolute top-[128px] left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border border-slate-200 transition-all duration-500 delay-700 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } ${isInView ? 'glow-pulse-active' : ''}`}
        style={{ boxShadow: '0 0 25px 6px rgba(134, 217, 48, 0.35)' }}
      />

      {/* Label */}
      <span 
        className={`text-label text-slate-500 tracking-[0.3em] uppercase text-xs font-semibold transition-all duration-600 delay-200 ${
          isVisible ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        System Orientation
      </span>

      {/* Main heading */}
      <h1 
        className={`font-display font-light text-5xl md:text-6xl lg:text-7xl text-slate-900 tracking-tight leading-[1.05] relative transition-all duration-800 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        Begin your RA
        <br />
        <span className="text-primary font-normal relative inline-block">
          fightback
          <motion.span 
            className="absolute -right-4 top-2 w-2 h-2 bg-primary rounded-full"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ boxShadow: '0 0 10px 2px rgba(134, 217, 48, 0.5)' }}
          />
        </span>
      </h1>

      {/* Subtitle */}
      <p 
        className={`text-clinical text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed transition-all duration-600 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        A quiet restoration of your biological intelligence.
      </p>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-600 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <span className="text-xs text-slate-400 tracking-widest uppercase">Explore</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: 'top' }}
        />
      </div>
    </section>
  );
}
