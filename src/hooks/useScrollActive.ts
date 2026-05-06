import { useEffect, useState, useRef } from 'react';

export function useScrollActive() {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Node is in the center 40% of the screen
      const centerStart = windowHeight * 0.3;
      const centerEnd = windowHeight * 0.7;
      
      const nodeCenter = rect.top + rect.height / 2;
      
      if (nodeCenter >= centerStart && nodeCenter <= centerEnd) {
        setIsActive(true);
      } else if (nodeCenter < centerStart || nodeCenter > centerEnd) {
        setIsActive(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { ref, isActive };
}
