import { useInView } from '@/hooks/useInView';

const stats = [
  {
    label: 'Resource',
    value: '30+',
    unit: 'Modules',
    color: '#86d930',
    glowColor: 'rgba(134, 217, 48, 0.2)',
  },
  {
    label: 'Visual',
    value: '34+',
    unit: 'Videos',
    color: '#a88dfc',
    glowColor: 'rgba(168, 141, 252, 0.2)',
  },
  {
    label: 'Access',
    value: 'Lifetime',
    unit: '',
    color: '#86d930',
    glowColor: 'rgba(134, 217, 48, 0.2)',
  },
];

export function StatsSection() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section className="w-full py-32 relative flex flex-col items-center">
      {/* Background filament line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px pointer-events-none opacity-40">
        <svg className="h-full w-[40px] -ml-[20px]" preserveAspectRatio="none">
          <path
            d="M20,0 C24,100 16,200 20,300 C24,400 16,500 20,600"
            fill="none"
            stroke="#d1d5db"
            strokeOpacity="0.6"
            strokeWidth="0.9"
            className={`transition-all duration-2000 ${isInView ? 'opacity-100' : 'opacity-0'}`}
          />
        </svg>
      </div>

      {/* Glass panel */}
      <div
        ref={ref}
        className={`relative z-10 w-full max-w-2xl mx-6 rounded-[2rem] p-10 md:p-16 transition-all duration-800 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: '0 25px 70px -12px rgba(0, 0, 0, 0.04), inset 0 0 30px rgba(255,255,255,0.95)',
        }}
      >
        <div className="space-y-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex items-center justify-between w-full group cursor-default transition-all duration-600 ${
                isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              {/* Label */}
              <span 
                className="text-label w-24 md:w-28 text-right transition-colors duration-500 font-semibold tracking-widest text-xs uppercase"
                style={{ color: stat.color }}
              >
                {stat.label}
              </span>

              {/* Node connector */}
              <div className="relative mx-4 md:mx-8">
                <div 
                  className={`w-4 h-4 rounded-full border bg-white z-10 relative transition-all duration-300 group-hover:scale-125 ${
                    isInView ? 'glow-pulse-active' : ''
                  }`}
                  style={{ borderColor: stat.color, transitionDelay: `${400 + index * 150}ms` }}
                />
                <div 
                  className="absolute inset-0 rounded-full scale-0 group-hover:scale-[2.5] transition-transform duration-700"
                  style={{ backgroundColor: stat.glowColor, filter: 'blur(4px)' }}
                />
              </div>

              {/* Value */}
              <div className="flex-1">
                <span className="font-display text-4xl md:text-5xl font-light text-slate-800">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-lg md:text-xl text-slate-400 font-body italic pl-2">
                      {stat.unit}
                    </span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative corner accents */}
        <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-slate-200/50 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-slate-200/50 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-slate-200/50 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-slate-200/50 rounded-br-lg" />
      </div>
    </section>
  );
}
