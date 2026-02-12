import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';

export function TestimonialSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full py-32 relative">
      {/* Large quote mark background */}
      <div 
        className={`absolute top-0 left-1/2 -translate-x-1/2 text-[14rem] md:text-[18rem] text-slate-100 font-serif leading-none select-none pointer-events-none transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        "
      </div>

      <div 
        ref={ref}
        className="max-w-3xl mx-auto px-6 text-center relative z-10"
      >
        {/* Quote text */}
        <p 
          className={`text-clinical text-2xl md:text-3xl italic text-slate-700 font-light leading-relaxed mb-12 transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          It felt less like a medical treatment and more like a gentle{' '}
          <span className="text-primaryDark relative inline-block font-normal not-italic">
            remembering
            <svg 
              className="absolute -bottom-2 left-0 w-full h-3 opacity-70" 
              preserveAspectRatio="none"
              viewBox="0 0 100 10"
            >
              <motion.path 
                d="M0,5 Q25,10 50,5 T100,5" 
                fill="none" 
                stroke="#86d930" 
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </svg>
          </span>{' '}
          of how my body is supposed to work.
        </p>

        {/* Attribution */}
        <div 
          className={`flex justify-center items-center space-x-6 transition-all duration-600 delay-400 ${
            isInView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-300" />
          <span className="text-label text-slate-500 font-bold tracking-[0.2em] text-xs uppercase">
            Sarah J.
          </span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-300" />
        </div>
      </div>
    </section>
  );
}
