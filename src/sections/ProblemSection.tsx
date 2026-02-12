import { useInView } from '@/hooks/useInView';

export function ProblemSection() {
  const { ref: ref1, isInView: isInView1 } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const { ref: ref2, isInView: isInView2 } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full max-w-5xl mx-auto space-y-32 md:space-y-48 py-32 relative">
      {/* First problem - left aligned */}
      <div
        ref={ref1}
        className={`flex flex-col md:w-5/12 mr-auto relative group pl-8 md:pl-12 transition-all duration-800 ${
          isInView1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
      >
        {/* Connector line */}
        <div 
          className={`absolute -left-4 md:-left-16 top-6 w-8 md:w-16 h-[0.8px] bg-slate-300/80 transition-transform duration-800 delay-300 origin-right ${
            isInView1 ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
        
        {/* Node dot with glow pulse */}
        <div 
          className={`absolute -left-4 md:-left-16 top-6 w-2 h-2 rounded-full bg-primary/60 transition-all duration-500 delay-600 ${
            isInView1 ? 'scale-100' : 'scale-0'
          } ${isInView1 ? 'glow-pulse-active' : ''}`}
          style={{ boxShadow: '0 0 25px 6px rgba(134, 217, 48, 0.35)' }}
        />

        <h2 className="font-display text-3xl md:text-4xl font-light text-slate-800 mb-6 tracking-tight">
          Tired of{' '}
          <span className="italic text-slate-400 font-serif font-light">joint pain?</span>
        </h2>
        
        <p className="text-clinical text-lg leading-loose text-slate-600">
          The cycle of inflammation isn't just a symptom; it's a signal. It weaves through your biology, creating blocks in your natural systems that conventional methods often miss.
        </p>
      </div>

      {/* Second problem - right aligned */}
      <div
        ref={ref2}
        className={`flex flex-col md:w-5/12 ml-auto relative group text-right md:items-end pr-8 md:pr-12 transition-all duration-800 ${
          isInView2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
      >
        {/* Connector line */}
        <div 
          className={`absolute -right-4 md:-right-16 top-6 w-8 md:w-16 h-[0.8px] bg-slate-300/80 transition-transform duration-800 delay-300 origin-left ${
            isInView2 ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
        
        {/* Node dot with violet glow pulse */}
        <div 
          className={`absolute -right-4 md:-right-16 top-6 w-2 h-2 rounded-full bg-violet-400/60 transition-all duration-500 delay-600 ${
            isInView2 ? 'scale-100' : 'scale-0'
          } ${isInView2 ? 'glow-pulse-violet-active' : ''}`}
          style={{ boxShadow: '0 0 25px 6px rgba(168, 141, 252, 0.35)' }}
        />

        <h2 className="font-display text-3xl md:text-4xl font-light text-slate-800 mb-6 tracking-tight">
          Does fatigue{' '}
          <span className="italic text-slate-400 font-serif font-light">weigh you down?</span>
        </h2>
        
        <p className="text-clinical text-lg leading-loose text-right text-slate-600">
          We need to go deeper into the organic intelligence of your body. Releasing the stored resistance that manifests as exhaustion requires a systemic shift.
        </p>
      </div>
    </section>
  );
}
