import { useInView } from '@/hooks/useInView';
import { motion } from 'framer-motion';

export type InterventionType = 'biological' | 'systemic' | 'kinetic' | 'mind' | 'nutrition' | 'detox';

interface StepModuleProps {
  number: string;
  title: string;
  description: string;
  type: InterventionType;
  glyphImage: string;
  alignment?: 'left' | 'right';
}

const typeConfig: Record<InterventionType, {
  label: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
  borderColor: string;
}> = {
  biological: {
    label: 'Biological',
    primaryColor: '#86d930',
    secondaryColor: '#6ea824',
    glowColor: 'rgba(134, 217, 48, 0.35)',
    borderColor: 'rgba(134, 217, 48, 0.3)',
  },
  systemic: {
    label: 'Systemic',
    primaryColor: '#a88dfc',
    secondaryColor: '#8565e8',
    glowColor: 'rgba(168, 141, 252, 0.35)',
    borderColor: 'rgba(168, 141, 252, 0.3)',
  },
  kinetic: {
    label: 'Kinetic',
    primaryColor: '#86d930',
    secondaryColor: '#a88dfc',
    glowColor: 'rgba(134, 217, 48, 0.25)',
    borderColor: 'rgba(134, 217, 48, 0.25)',
  },
  mind: {
    label: 'Neural',
    primaryColor: '#a88dfc',
    secondaryColor: '#c4b5fd',
    glowColor: 'rgba(168, 141, 252, 0.3)',
    borderColor: 'rgba(168, 141, 252, 0.25)',
  },
  nutrition: {
    label: 'Nutritional',
    primaryColor: '#6ea824',
    secondaryColor: '#86d930',
    glowColor: 'rgba(110, 168, 36, 0.35)',
    borderColor: 'rgba(110, 168, 36, 0.3)',
  },
  detox: {
    label: 'Defense',
    primaryColor: '#6ea824',
    secondaryColor: '#a88dfc',
    glowColor: 'rgba(110, 168, 36, 0.3)',
    borderColor: 'rgba(110, 168, 36, 0.25)',
  },
};

export function StepModule({ 
  number, 
  title, 
  description, 
  type, 
  glyphImage,
  alignment = 'left' 
}: StepModuleProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const config = typeConfig[type];
  const isLeft = alignment === 'left';

  return (
    <div
      ref={ref}
      className={`relative flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 py-20 transition-all duration-800 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
    >
      {/* Localized glow orb that pulses when in view */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isInView ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 60%)`,
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Content side */}
      <div className={`flex-1 ${isLeft ? 'md:text-left' : 'md:text-right'} relative z-10`}>
        {/* Type label */}
        <span
          className={`inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-4 transition-all duration-600 delay-200 ${
            isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-5' : 'translate-x-5'}`
          }`}
          style={{ color: config.secondaryColor }}
        >
          {number} — {config.label}
        </span>

        {/* Title */}
        <h3
          className={`font-display text-3xl md:text-4xl font-light text-slate-900 mb-4 tracking-tight transition-all duration-600 delay-300 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={`text-clinical text-lg text-slate-600 leading-relaxed max-w-md transition-all duration-600 delay-400 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          {description}
        </p>

        {/* Connection line to filament */}
        <div
          className={`hidden md:block absolute top-1/2 ${isLeft ? '-right-20' : '-left-20'} w-20 h-px transition-transform duration-800 delay-500 ${
            isLeft ? 'origin-left' : 'origin-right'
          } ${isInView ? 'scale-x-100' : 'scale-x-0'}`}
          style={{ background: `linear-gradient(${isLeft ? 'to right' : 'to left'}, ${config.primaryColor}40, transparent)` }}
        />
      </div>

      {/* Glyph side */}
      <div
        className={`relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 transition-all duration-800 delay-300 ${
          isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {/* Animated ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: config.borderColor }}
          animate={isInView ? {
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        {/* Inner glow ring */}
        <motion.div
          className="absolute inset-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${config.glowColor} 0%, transparent 70%)`,
          }}
          animate={isInView ? {
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Glyph image */}
        <motion.img
          src={glyphImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-contain p-6"
          animate={isInView ? {
            scale: [1, 1.03, 1],
          } : {}}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing node dot */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
          style={{ backgroundColor: config.primaryColor }}
          animate={isInView ? {
            scale: [1, 1.5, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              `0 0 0 0 ${config.glowColor}`,
              `0 0 20px 8px ${config.glowColor}`,
              `0 0 0 0 ${config.glowColor}`,
            ],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
}
