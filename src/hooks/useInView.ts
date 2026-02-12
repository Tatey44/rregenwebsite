import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
) {
  const { 
    threshold = 0.15, 
    rootMargin = '0px 0px -50px 0px', 
    triggerOnce = true 
  } = options;
  
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          setHasTriggered(true);
        }
      } else if (!triggerOnce) {
        setIsInView(false);
      }
    },
    [triggerOnce]
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || (triggerOnce && hasTriggered)) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, handleIntersection]);

  return { ref, isInView };
}

// Hook for triggering a one-time glow pulse when element enters view
export function useGlowPulse<T extends HTMLElement>(
  options: UseInViewOptions = {}
) {
  const { ref, isInView } = useInView<T>(options);
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldPulse(true);
      // Reset pulse after animation completes
      const timer = setTimeout(() => {
        setShouldPulse(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return { ref, isInView, shouldPulse };
}
