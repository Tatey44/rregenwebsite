import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full py-32 relative overflow-hidden cta-container">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(134, 217, 48, 0.08) 0%, rgba(168, 141, 252, 0.06) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={isInView ? {
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        } : {}}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div 
        ref={ref}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        {/* Heading */}
        <h2 
          className={`font-display text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 mb-12 tracking-tight transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Ready to reclaim
          <br />
          your biology?
        </h2>

        {/* CTA Button */}
        <a
          href="#"
          className={`group relative px-12 py-5 bg-white border border-slate-200 rounded-full inline-flex items-center gap-4 transition-all duration-500 hover:border-primary/60 hover:shadow-button-hover hover:-translate-y-0.5 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <span className="font-display text-sm tracking-[0.3em] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
            TAKE CONTROL
          </span>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-primaryDark group-hover:translate-x-1 transition-all duration-300" />
        </a>

        {/* Subtle hint */}
        <p
          className={`mt-8 text-sm text-slate-400 font-light transition-all duration-600 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          Join thousands on their healing journey
        </p>
      </div>
    </section>
  );
}
