import { useEffect, useRef, useCallback } from 'react';

// Glyph configurations - positioned in viewport %, NOT vh down the page
// Each has subtle drift parameters
const floatingGlyphs = [
  {
    src: '/images/glyph-inflammation.png',
    position: { top: '8%', left: '2%' },
    size: '320px',
    opacity: 0.06,
    blur: '1.5px',
    driftFactor: 0.8, // Multiplier for base drift
  },
  {
    src: '/images/glyph-energy.png',
    position: { top: '15%', right: '5%' },
    size: '380px',
    opacity: 0.05,
    blur: '2px',
    driftFactor: 0.6,
  },
  {
    src: '/images/glyph-mobility.png',
    position: { top: '45%', left: '8%' },
    size: '280px',
    opacity: 0.07,
    blur: '1px',
    driftFactor: 1.0,
  },
  {
    src: '/images/glyph-mind.png',
    position: { top: '55%', right: '3%' },
    size: '340px',
    opacity: 0.04,
    blur: '2.5px',
    driftFactor: 0.7,
  },
  {
    src: '/images/glyph-nutrition.png',
    position: { top: '75%', left: '4%' },
    size: '260px',
    opacity: 0.06,
    blur: '1.5px',
    driftFactor: 0.9,
  },
  {
    src: '/images/glyph-detox.png',
    position: { top: '82%', right: '7%' },
    size: '300px',
    opacity: 0.05,
    blur: '2px',
    driftFactor: 0.75,
  },
];

export function ParallaxBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesRef = useRef<HTMLDivElement>(null);
  const cellular1Ref = useRef<HTMLDivElement>(null);
  const cellular2Ref = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const glyphsRef = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  // RAF-based scroll handler - subtle parameter modulation only
  const handleScroll = useCallback(() => {
    if (rafIdRef.current) return;
    
    rafIdRef.current = requestAnimationFrame(() => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      
      // Only update if progress changed meaningfully
      if (Math.abs(progress - lastProgressRef.current) > 0.001) {
        // MAX DRIFT: 120px for waves, 70px for cellular, 35px for glyphs
        // These are tiny movements over the entire scroll
        
        // Waves layer - slowest, largest drift (but still only 120px max)
        if (wavesRef.current) {
          const wavesY = progress * 120;
          wavesRef.current.style.transform = `translate3d(0, ${wavesY}px, 0)`;
        }
        
        // Cellular pattern 1 - medium drift
        if (cellular1Ref.current) {
          const cellularY = progress * 70;
          cellular1Ref.current.style.transform = `translate3d(0, ${cellularY}px, 0)`;
        }
        
        // Cellular pattern 2 - opposite direction, smaller drift
        if (cellular2Ref.current) {
          const cellularY = progress * -50;
          cellular2Ref.current.style.transform = `translate3d(0, ${cellularY}px, 0)`;
        }
        
        // Photo texture - very subtle
        if (photoRef.current) {
          const photoY = progress * 30;
          photoRef.current.style.transform = `translate3d(0, ${photoY}px, 0)`;
        }
        
        // Glyphs - tiny independent drifts
        glyphsRef.current.forEach((glyph, index) => {
          if (glyph) {
            const factor = floatingGlyphs[index]?.driftFactor || 1;
            // Max 35px drift per glyph, multiplied by individual factor
            const glyphY = progress * 35 * factor;
            // Add tiny horizontal drift for organic feel
            const glyphX = progress * 15 * (index % 2 === 0 ? 1 : -1);
            glyph.style.transform = `translate3d(${glyphX}px, ${glyphY}px, 0)`;
          }
        });
        
        lastProgressRef.current = progress;
      }
      
      rafIdRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial position

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* BASE LAYER - Subtle warm gradient wash */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #fafcfb 30%, #f8faf9 70%, #ffffff 100%)',
        }}
      />

      {/* PHOTO TEXTURE LAYER - Extremely subtle photographic whisper */}
      <div
        ref={photoRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/images/0e796e6e-82f1-4107-97e9-6a0e179e5da5.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.025,
          filter: 'blur(8px)',
          mixBlendMode: 'luminosity',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* ORGANIC WAVES LAYER - Single continuous texture */}
      <div
        ref={wavesRef}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/images/organic-waves-2.png)',
          backgroundSize: '120% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08,
          filter: 'blur(1px)',
          mixBlendMode: 'soft-light',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* CELLULAR PATTERN 1 - Large tile, very subtle */}
      <div
        ref={cellular1Ref}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/images/cellular-pattern-1.png)',
          backgroundSize: '1500px auto',
          backgroundPosition: '20% 30%',
          backgroundRepeat: 'repeat',
          opacity: 0.035,
          filter: 'blur(0.5px)',
          mixBlendMode: 'multiply',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* CELLULAR PATTERN 2 - Offset, different blend */}
      <div
        ref={cellular2Ref}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: 'url(/images/cellular-pattern-2.png)',
          backgroundSize: '1800px auto',
          backgroundPosition: '70% 60%',
          backgroundRepeat: 'repeat',
          opacity: 0.03,
          filter: 'blur(1px)',
          mixBlendMode: 'soft-light',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* GLYPH LAYER - Floating organic shapes */}
      <div className="absolute inset-0">
        {floatingGlyphs.map((glyph, index) => (
          <div
            key={index}
            ref={(el) => { glyphsRef.current[index] = el; }}
            className="absolute will-change-transform"
            style={{
              ...glyph.position,
              width: glyph.size,
              height: 'auto',
              opacity: glyph.opacity,
              filter: `blur(${glyph.blur})`,
              mixBlendMode: 'soft-light',
              transform: 'translate3d(0, 0, 0)',
              // Radial mask for boundless edge fading
              maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 75%)',
            }}
          >
            <img
              src={glyph.src}
              alt=""
              className="w-full h-auto"
              style={{
                // Additional edge softening
                maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 60%, rgba(0,0,0,0) 80%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* SOFT ORBS - CSS-generated ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Green orb - upper left */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(134, 217, 48, 0.08) 0%, rgba(134, 217, 48, 0.02) 50%, transparent 70%)',
            filter: 'blur(60px)',
            top: '-10%',
            left: '-15%',
          }}
        />
        {/* Violet orb - upper right */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(168, 141, 252, 0.06) 0%, rgba(168, 141, 252, 0.015) 50%, transparent 70%)',
            filter: 'blur(50px)',
            top: '5%',
            right: '-10%',
          }}
        />
        {/* Green orb - lower area */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, rgba(134, 217, 48, 0.05) 0%, rgba(134, 217, 48, 0.01) 50%, transparent 70%)',
            filter: 'blur(55px)',
            bottom: '10%',
            left: '10%',
          }}
        />
        {/* Violet orb - lower right */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '480px',
            height: '480px',
            background: 'radial-gradient(circle, rgba(168, 141, 252, 0.05) 0%, rgba(168, 141, 252, 0.01) 50%, transparent 70%)',
            filter: 'blur(45px)',
            bottom: '20%',
            right: '5%',
          }}
        />
      </div>

      {/* NOISE OVERLAY - Very subtle texture */}
      <div 
        className="absolute inset-0 opacity-[0.008]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
