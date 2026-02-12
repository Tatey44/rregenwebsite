import { useInView } from '@/hooks/useInView';

export function Footer() {
  const { ref, isInView } = useInView<HTMLElement>({ threshold: 0.3 });

  return (
    <footer ref={ref} className="w-full py-16 relative">
      <div 
        className={`text-center transition-all duration-800 ${
          isInView ? 'opacity-60' : 'opacity-0'
        } hover:opacity-100`}
      >
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400 leading-relaxed font-medium">
          © 2024 Rheumatoid Regeneration
          <br />
          Systems Thinking for Biological Healing
        </p>
      </div>
    </footer>
  );
}
