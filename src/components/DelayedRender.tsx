import React, { useState, useEffect, useRef } from 'react';

interface DelayedRenderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function DelayedRender({ children, fallback = null }: DelayedRenderProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    const triggerRender = () => {
      setShouldRender(true);
    };

    // User interactions are guaranteed to mean the user is active on the page
    const handleInteraction = () => {
      triggerRender();
    };

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });

    let observer: IntersectionObserver | null = null;
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerRender();
              if (observer) {
                observer.disconnect();
              }
            }
          });
        },
        {
          rootMargin: '300px 0px', // start loading when user is 300px close
        }
      );
      observer.observe(containerRef.current);
    } else {
      // Fallback for bots/legacy browsers with lack of IntersectionObserver
      const timer = setTimeout(triggerRender, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return (
      <div ref={containerRef} style={{ minHeight: '150px', width: '100%' }} className="flex justify-center items-center">
        {fallback}
      </div>
    );
  }

  return <>{children}</>;
}
