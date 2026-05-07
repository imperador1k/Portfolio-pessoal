import { motion } from 'motion/react';
import { useMouseTracking } from '../hooks/useMouseTracking';

export default function MouseGradient() {
  const { mouseX, mouseY, isActive } = useMouseTracking();

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-30"
        style={{
          x: mouseX,
          y: mouseY,
          background: 'radial-gradient(circle, rgba(127, 82, 255, 0.5) 0%, transparent 70%)',
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isActive ? 1 : 0.8,
        }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-25"
        style={{
          x: mouseX,
          y: mouseY,
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
          translateX: '-20%',
          translateY: '-80%',
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full blur-[120px] opacity-25"
        style={{
          x: mouseX,
          y: mouseY,
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
          translateX: '-80%',
          translateY: '20%',
        }}
      />
    </div>
  );
}
