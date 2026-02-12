import { ParallaxBackground } from '@/components/ParallaxBackground';
import { FilamentSpine } from '@/components/FilamentSpine';
import { HeroSection } from '@/sections/HeroSection';
import { ProblemSection } from '@/sections/ProblemSection';
import { StepModulesSection } from '@/sections/StepModulesSection';
import { StatsSection } from '@/sections/StatsSection';
import { TestimonialSection } from '@/sections/TestimonialSection';
import { CTASection } from '@/sections/CTASection';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <div className="relative">
      {/* BACKGROUND LAYER - Fixed viewport, continuous scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ParallaxBackground />
      </div>
      
      {/* FILAMENT SPINE - Fixed, behind content */}
      <div className="fixed inset-0 z-[5] pointer-events-none">
        <FilamentSpine />
      </div>
      
      {/* LOGO - Fixed, always on top */}
      <div className="fixed top-8 left-8 md:top-12 md:left-12 z-[100] opacity-95 transition-opacity duration-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-violet/60 flex items-center justify-center">
            <span className="text-white font-display font-semibold text-sm">RR</span>
          </div>
          <span className="hidden md:block font-display text-sm font-medium text-slate-700 tracking-wide">
            Rheumatoid Regeneration
          </span>
        </div>
      </div>

      {/* FOREGROUND CONTENT - Scrolls normally above background */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <HeroSection />
        <ProblemSection />
        <StepModulesSection />
        <StatsSection />
        <TestimonialSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
}

export default App;
