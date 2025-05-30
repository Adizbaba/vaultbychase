
"use client";

import { useEffect, useRef, useState } from 'react';

interface UseInViewAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useInViewAnimation(options?: UseInViewAnimationOptions) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null); // Can be more generic if needed e.g. HTMLElement

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options?.triggerOnce && currentRef) {
            observer.unobserve(currentRef);
          }
        } else {
          if (!options?.triggerOnce) {
            // Optional: reset isInView to false if you want animations to replay
            // setIsInView(false); 
          }
        }
      },
      { 
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || "0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]); // Re-run if options change

  return { ref, isInView };
}
