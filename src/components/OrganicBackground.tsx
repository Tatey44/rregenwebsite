import { useScrollProgress } from '@/hooks/useScrollReveal';
import { motion } from 'framer-motion';

export function OrganicBackground() {
  const scrollProgress = useScrollProgress();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base gradient - subtle warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#fafbfc] to-white" />
      
      {/* Glass polymorphism orbs - animated with scroll */}
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(134, 217, 48, 0.12) 0%, rgba(134, 217, 48, 0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
          top: '5%',
          left: '-10%',
        }}
        animate={{
          x: scrollProgress * 50,
          y: scrollProgress * 30,
          scale: 1 + scrollProgress * 0.1,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      
      <motion.div 
        className="absolute w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 141, 252, 0.1) 0%, rgba(168, 141, 252, 0.03) 40%, transparent 70%)',
          filter: 'blur(70px)',
          top: '25%',
          right: '-15%',
        }}
        animate={{
          x: -scrollProgress * 40,
          y: scrollProgress * 60,
          scale: 1 + scrollProgress * 0.08,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(134, 217, 48, 0.08) 0%, rgba(110, 168, 36, 0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          top: '55%',
          left: '20%',
        }}
        animate={{
          x: scrollProgress * 30,
          y: -scrollProgress * 40,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      
      <motion.div 
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(168, 141, 252, 0.08) 0%, rgba(133, 101, 232, 0.02) 40%, transparent 70%)',
          filter: 'blur(50px)',
          bottom: '10%',
          right: '10%',
        }}
        animate={{
          x: -scrollProgress * 35,
          y: -scrollProgress * 25,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />

      {/* SVG Organic Wave Shapes - seamless edge-to-edge */}
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        viewBox="0 0 1440 3200"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.15 }}
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#86d930" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a88dfc" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#86d930" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a88dfc" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#86d930" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a88dfc" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Wave 1 - Top flowing organic shape */}
        <motion.path
          d="M-100,100 C200,50 400,150 600,100 C800,50 1000,180 1200,120 C1400,60 1600,150 1800,100 L1800,-100 L-100,-100 Z"
          fill="url(#waveGradient1)"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 1,
            d: [
              "M-100,100 C200,50 400,150 600,100 C800,50 1000,180 1200,120 C1400,60 1600,150 1800,100 L1800,-100 L-100,-100 Z",
              "M-100,120 C200,80 400,130 600,90 C800,70 1000,160 1200,140 C1400,80 1600,130 1800,120 L1800,-100 L-100,-100 Z",
              "M-100,100 C200,50 400,150 600,100 C800,50 1000,180 1200,120 C1400,60 1600,150 1800,100 L1800,-100 L-100,-100 Z"
            ]
          }}
          transition={{ 
            pathLength: { duration: 2, ease: "easeInOut" },
            opacity: { duration: 1 },
            d: { duration: 15, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Wave 2 - Middle organic flow */}
        <motion.path
          d="M-100,600 C300,550 500,700 800,620 C1100,540 1300,680 1600,600 C1900,520 2100,650 2400,580 L2400,400 L-100,400 Z"
          fill="url(#waveGradient2)"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.7,
            d: [
              "M-100,600 C300,550 500,700 800,620 C1100,540 1300,680 1600,600 C1900,520 2100,650 2400,580 L2400,400 L-100,400 Z",
              "M-100,620 C300,580 500,680 800,640 C1100,560 1300,660 1600,620 C1900,540 2100,630 2400,600 L2400,400 L-100,400 Z",
              "M-100,600 C300,550 500,700 800,620 C1100,540 1300,680 1600,600 C1900,520 2100,650 2400,580 L2400,400 L-100,400 Z"
            ]
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 0.3 },
            d: { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Wave 3 - Lower organic flow */}
        <motion.path
          d="M-100,1200 C400,1150 600,1300 900,1180 C1200,1060 1400,1250 1700,1150 C2000,1050 2200,1200 2500,1120 L2500,950 L-100,950 Z"
          fill="url(#waveGradient1)"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.5,
            d: [
              "M-100,1200 C400,1150 600,1300 900,1180 C1200,1060 1400,1250 1700,1150 C2000,1050 2200,1200 2500,1120 L2500,950 L-100,950 Z",
              "M-100,1180 C400,1130 600,1280 900,1160 C1200,1080 1400,1230 1700,1170 C2000,1070 2200,1180 2500,1140 L2500,950 L-100,950 Z",
              "M-100,1200 C400,1150 600,1300 900,1180 C1200,1060 1400,1250 1700,1150 C2000,1050 2200,1200 2500,1120 L2500,950 L-100,950 Z"
            ]
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 0.6 },
            d: { duration: 20, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        {/* Wave 4 - Bottom organic flow */}
        <motion.path
          d="M-100,2000 C350,1950 550,2100 850,1980 C1150,1860 1350,2050 1650,1950 C1950,1850 2150,2000 2450,1920 L2450,1750 L-100,1750 Z"
          fill="url(#waveGradient2)"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 0.6,
            d: [
              "M-100,2000 C350,1950 550,2100 850,1980 C1150,1860 1350,2050 1650,1950 C1950,1850 2150,2000 2450,1920 L2450,1750 L-100,1750 Z",
              "M-100,2020 C350,1970 550,2080 850,2000 C1150,1880 1350,2030 1650,1970 C1950,1870 2150,1980 2450,1940 L2450,1750 L-100,1750 Z",
              "M-100,2000 C350,1950 550,2100 850,1980 C1150,1860 1350,2050 1650,1950 C1950,1850 2150,2000 2450,1920 L2450,1750 L-100,1750 Z"
            ]
          }}
          transition={{ 
            opacity: { duration: 1.5, delay: 0.9 },
            d: { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Cellular blob shapes - organic circles */}
        <motion.ellipse
          cx="200"
          cy="400"
          rx="150"
          ry="100"
          fill="rgba(134, 217, 48, 0.08)"
          filter="url(#glow)"
          animate={{
            rx: [150, 170, 150],
            ry: [100, 90, 100],
            cx: [200, 220, 200],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.ellipse
          cx="1200"
          cy="800"
          rx="180"
          ry="120"
          fill="rgba(168, 141, 252, 0.06)"
          filter="url(#glow)"
          animate={{
            rx: [180, 200, 180],
            ry: [120, 110, 120],
            cx: [1200, 1180, 1200],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.ellipse
          cx="400"
          cy="1600"
          rx="200"
          ry="140"
          fill="rgba(134, 217, 48, 0.05)"
          filter="url(#glow)"
          animate={{
            rx: [200, 220, 200],
            ry: [140, 130, 140],
            cy: [1600, 1620, 1600],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.ellipse
          cx="1100"
          cy="2400"
          rx="160"
          ry="100"
          fill="rgba(168, 141, 252, 0.07)"
          filter="url(#glow)"
          animate={{
            rx: [160, 180, 160],
            ry: [100, 90, 100],
            cx: [1100, 1120, 1100],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Subtle noise texture overlay for glass effect */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
