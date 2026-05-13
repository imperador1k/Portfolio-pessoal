import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => (
  <AnimatePresence>
    {isPlaying && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="flex items-end gap-[2px] h-4"
      >
        {[1, 2, 3, 4].map((bar) => (
          <motion.div
            key={bar}
            className="w-0.5 sm:w-1 bg-[#1DB954] rounded-t-sm"
            animate={{ height: ['20%', '100%', '40%', '80%', '20%'] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: 'linear',
              delay: bar * 0.1
            }}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);
