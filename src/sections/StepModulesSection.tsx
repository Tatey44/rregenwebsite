import { StepModule } from '@/components/StepModule';
import { useInView } from '@/hooks/useInView';

const steps = [
  {
    number: '01',
    title: 'Support Reduced Inflammation',
    description: 'Deep tissue recovery protocols that speak the language of your cells. Gentle interventions designed to support your body\'s natural inflammatory response pathways.',
    type: 'biological' as const,
    glyphImage: '/images/glyph-inflammation.png',
    alignment: 'left' as const,
  },
  {
    number: '02',
    title: 'Restore Energy Capacity',
    description: 'Revitalizing mitochondrial function to restore your natural rhythm. Supporting cellular energy production through targeted nutritional and lifestyle interventions.',
    type: 'systemic' as const,
    glyphImage: '/images/glyph-energy.png',
    alignment: 'right' as const,
  },
  {
    number: '03',
    title: 'Enhance Mobility Pathways',
    description: 'Regenerating healing root systems allowing for fluid, painless movement. Gentle kinetic practices that honor your body\'s current state while encouraging progress.',
    type: 'kinetic' as const,
    glyphImage: '/images/glyph-mobility.png',
    alignment: 'left' as const,
  },
  {
    number: '04',
    title: 'Calm Neural Response',
    description: 'Mind-body practices that help recalibrate your stress response. Supporting the parasympathetic nervous system for deeper restoration and recovery.',
    type: 'mind' as const,
    glyphImage: '/images/glyph-mind.png',
    alignment: 'right' as const,
  },
  {
    number: '05',
    title: 'Nourish Cellular Intelligence',
    description: 'Plant-forward nutritional guidance that feeds your body\'s innate wisdom. Supporting cellular repair through whole-food, anti-inflammatory approaches.',
    type: 'nutrition' as const,
    glyphImage: '/images/glyph-nutrition.png',
    alignment: 'left' as const,
  },
  {
    number: '06',
    title: 'Support Defense Systems',
    description: 'Gentle detoxification and immune support protocols. Helping your body release what no longer serves it while building resilience for the journey ahead.',
    type: 'detox' as const,
    glyphImage: '/images/glyph-detox.png',
    alignment: 'right' as const,
  },
];

export function StepModulesSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section className="w-full py-32 relative">
      {/* Section header */}
      <div
        ref={ref}
        className={`text-center mb-24 transition-all duration-800 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <span className="text-label text-slate-400 tracking-[0.25em] uppercase text-xs font-semibold mb-4 block">
          The System
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
          Six pathways to
          <span className="text-primary"> restoration</span>
        </h2>
      </div>

      {/* Step modules */}
      <div className="max-w-5xl mx-auto px-6">
        {steps.map((step, index) => (
          <StepModule
            key={index}
            {...step}
          />
        ))}
      </div>

      {/* Central divider line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none opacity-30 hidden md:block">
        <div
          className={`h-full bg-gradient-to-b from-transparent via-slate-200 to-transparent transition-transform duration-2000 delay-500 origin-top ${
            isInView ? 'scale-y-100' : 'scale-y-0'
          }`}
        />
      </div>
    </section>
  );
}
