import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const BOOT_LOGS = [
  "> AWAITING SYSTEM ROOT...",
  "> MOUNTING KERNEL...",
  "> ALLOCATING MEMORY...",
  "> MOUNT UI COMPONENTS...",
  "> COMPILE KOTLIN MODULES...",
  "> RESOLVE DEPENDENCIES...",
  "> INJECT STYLES...",
  "> WARMUP RENDER ENGINE...",
  "> SYSTEM VERIFICATION OK.",
  "> INITIATING BOOT SEQUENCE..."
];

// Sub-component to isolate frequent re-renders for the log
const TelemetryLog = () => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const duration = 2800; // Finish log sequence right before exit
    const interval = setInterval(() => {
      setLogIndex(prev => Math.min(prev + 1, BOOT_LOGS.length - 1));
    }, duration / BOOT_LOGS.length);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-6 left-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest z-10 whitespace-pre">
      {BOOT_LOGS[logIndex]}
    </div>
  );
};

// Sub-component to isolate frequent re-renders for the percentage
const ProgressCounter = () => {
    const [progress, setProgress] = useState(0);
    const requestRef = useRef<number>();
    
    useEffect(() => {
        const startTime = Date.now();
        const duration = 2800;
        
        const update = () => {
            const elapsed = Date.now() - startTime;
            const p = Math.min((elapsed / duration) * 100, 100);
            setProgress(Math.floor(p));
            if (p < 100) {
                requestRef.current = requestAnimationFrame(update);
            }
        };
        requestRef.current = requestAnimationFrame(update);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);
    
    return (
        <div className="font-mono text-xs text-slate-400 mt-4 tracking-widest">
            {progress.toString().padStart(3, '0')}%
        </div>
    );
};

export default function SplashScreen({ isLoading }: { isLoading: boolean }) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAFAFA] overflow-hidden"
          exit={{ 
            y: "-100%",
            transition: {
              delay: 0.2, // Phase 2: Slide up after contents fade out
              duration: 0.6,
              ease: [0.76, 0, 0.24, 1] // Custom easeInOut for smooth curtain effect
            }
          }}
        >
          {/* Phase 1: Contents fade out and move up quickly */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ 
                opacity: 0, 
                y: -15, 
                transition: { duration: 0.2, ease: "easeOut" } 
            }}
          >
            {/* Telemetry Top Left */}
            <div className="absolute top-6 left-6 font-mono text-[10px] text-slate-400 uppercase tracking-widest z-10">
              BUILD_ENV // ANDROID_SDK_34
            </div>

            <TelemetryLog />

            {/* Center Focus (SVG Line Art) */}
            <div className="relative flex flex-col items-center justify-center z-10">
               {/* The abstract logo / <> */}
               <svg viewBox="0 0 100 100" className="relative z-10 w-24 h-24 md:w-32 md:h-32 mb-2">
                  <motion.path
                     d="M 30,20 L 10,50 L 30,80 M 70,20 L 90,50 L 70,80 M 60,10 L 40,90"
                     fill="none"
                     stroke="#7F52FF"
                     strokeWidth="2"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 2.5, ease: "easeInOut" }}
                  />
               </svg>

               {/* Minimalist Progress Bar */}
               <div className="w-48 h-[1px] bg-slate-200 overflow-hidden relative mt-8">
                   <motion.div 
                      className="absolute inset-y-0 left-0 bg-jb-primary w-full"
                      style={{ originX: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 2.8, ease: "easeInOut" }}
                   />
               </div>

               <ProgressCounter />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
