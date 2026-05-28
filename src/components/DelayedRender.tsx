import React, { useState, useEffect } from 'react';

interface DelayedRenderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function DelayedRender({ children, fallback = null }: DelayedRenderProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // We want to clear the main thread for the initial render (LCP/FCP).
    // The easiest way is to wait until the browser is idle, or use a fallback timer.
    let timerId: ReturnType<typeof setTimeout>;
    
    const triggerRender = () => {
      setShouldRender(true);
    };

    // If requestIdleCallback is supported, use it. Otherwise, fallback to a timeout.
    if ('requestIdleCallback' in window) {
      // @ts-ignore
      window.requestIdleCallback(() => {
        timerId = setTimeout(triggerRender, 100); // Add a small extra delay after idle just in case
      });
    } else {
      timerId = setTimeout(triggerRender, 1500); // 1.5s fallback delay for Safari/older browsers
    }

    // Also trigger immediately on user interaction (scroll, click, touch)
    const handleInteraction = () => {
      setShouldRender(true);
    };

    window.addEventListener('scroll', handleInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleInteraction, { once: true, passive: true });
    window.addEventListener('mousemove', handleInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timerId);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
    };
  }, []);

  if (!shouldRender) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
