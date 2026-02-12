import { useScrollProgress } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

const typeColors: Record<string, { primary: string; glow: string }> = {
  biological: { primary: '#86d930', glow: 'rgba(134, 217, 48, 0.4)' },
  systemic: { primary: '#a88dfc', glow: 'rgba(168, 141, 252, 0.4)' },
  kinetic: { primary: '#86d930', glow: 'rgba(134, 217, 48, 0.35)' },
  mind: { primary: '#a88dfc', glow: 'rgba(168, 141, 252, 0.35)' },
  nutrition: { primary: '#6ea824', glow: 'rgba(110, 168, 36, 0.4)' },
  detox: { primary: '#6ea824', glow: 'rgba(110, 168, 36, 0.35)' },
};

// Nodes positioned by viewport %, NOT fixed Y coordinates
const nodes = [
  { vpY: 0.12, type: 'biological', activeRange: [0, 0.15] },
  { vpY: 0.28, type: 'systemic', activeRange: [0.1, 0.3] },
  { vpY: 0.44, type: 'kinetic', activeRange: [0.2, 0.4] },
  { vpY: 0.58, type: 'mind', activeRange: [0.35, 0.55] },
  { vpY: 0.72, type: 'nutrition', activeRange: [0.5, 0.7] },
  { vpY: 0.86, type: 'detox', activeRange: [0.65, 0.85] },
];

export function FilamentSpine() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="absolute inset-0 hidden lg:block">
      {/* Continuous filament line - spans full viewport height */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="filamentGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d1d5db" stopOpacity="0.25" />
            <stop offset="20%" stopColor="#86d930" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#a88dfc" stopOpacity="0.35" />
            <stop offset="80%" stopColor="#86d930" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.2" />
          </linearGradient>
          
          <filter id="nodeGlowFilter">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Main continuous filament - gentle S-curve */}
        <motion.path
          d="M50%,2% Q52%,25% 50%,50% Q48%,75% 50%,98%"
          fill="none"
          stroke="url(#filamentGrad)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          style={{
            filter: 'blur(0.5px)',
          }}
        />

        {/* Subtle branch filaments */}
        <motion.path
          d="M50%,15% Q45%,18% 42%,22%"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M50%,15% Q55%,18% 58%,22%"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="0.5"
          strokeDasharray="4 6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        />
        <motion.path
          d="M50%,45% Q46%,48% 43%,52%"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
        <motion.path
          d="M50%,60% Q54%,63% 57%,67%"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="0.6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
        />

        {/* Animated nodes - positioned by viewport % */}
        {nodes.map((node, index) => {
          const colors = typeColors[node.type];
          const isActive = scrollProgress >= node.activeRange[0] && scrollProgress <= node.activeRange[1];
          const cx = 50 + (index % 2 === 0 ? -2 : 2); // Slight offset left/right
          
          return (
            <g key={index}>
              {/* Glow effect */}
              <motion.circle
                cx={`${cx}%`}
                cy={`${node.vpY * 100}%`}
                r="12"
                fill={colors.glow}
                filter="url(#nodeGlowFilter)"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: isActive ? 0.5 : 0.15,
                }}
                transition={{ duration: 0.5 }}
              />
              
              {/* Main node */}
              <motion.circle
                cx={`${cx}%`}
                cy={`${node.vpY * 100}%`}
                r={isActive ? 3.5 : 2}
                fill="white"
                stroke={colors.primary}
                strokeWidth={isActive ? 1.5 : 1}
                strokeOpacity={isActive ? 0.8 : 0.35}
                initial={{ scale: 0 }}
                animate={{ 
                  scale: isActive ? [1, 1.15, 1] : 1,
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }
                }}
              />
              
              {/* Pulse ring when active */}
              {isActive && (
                <motion.circle
                  cx={`${cx}%`}
                  cy={`${node.vpY * 100}%`}
                  r="6"
                  fill="none"
                  stroke={colors.primary}
                  strokeWidth="0.8"
                  initial={{ scale: 1, opacity: 0.7 }}
                  animate={{ 
                    scale: [1, 1.8, 2.2],
                    opacity: [0.7, 0.25, 0],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Scroll progress dot - moves along the filament */}
        <motion.circle
          cx="50%"
          cy="2%"
          r="5"
          fill="white"
          stroke="#86d930"
          strokeWidth="1.5"
          animate={{
            cy: `${2 + scrollProgress * 96}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
        <motion.circle
          cx="50%"
          cy="2%"
          r="8"
          fill="rgba(134, 217, 48, 0.15)"
          animate={{
            cy: `${2 + scrollProgress * 96}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
