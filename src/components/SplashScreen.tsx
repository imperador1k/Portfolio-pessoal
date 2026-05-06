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

export default function SplashScreen({ isLoading }: { isLoading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState(BOOT_LOGS[0]);
  const requestRef = useRef<number>();
  
  useEffect(() => {
    if (!isLoading) return;
    
    const startTime = Date.now();
    const duration = 2800; // Total duration in ms
    
    const update = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);

      // Sync log with progress milestones
      const logIndex = Math.min(Math.floor((p / 100) * BOOT_LOGS.length), BOOT_LOGS.length - 1);
      setCurrentLog(BOOT_LOGS[logIndex]);

      if (p < 100) {
        requestRef.current = requestAnimationFrame(update);
      }
    };
    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAFAFA] overflow-hidden"
          exit={{ 
            y: "-100%",
            transition: {
              delay: 0.1,
              duration: 0.4,
              ease: [0.76, 0, 0.24, 1]
            }
          }}
        >
          {/* Subtle Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50 contrast-150" />
          
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            exit={{ 
                opacity: 0, 
                scale: 1.05,
                filter: "blur(10px)",
                transition: { duration: 0.3, ease: "easeIn" } 
            }}
          >
            {/* Top Info */}
            <div className="absolute top-8 left-8 flex flex-col gap-1 z-10">
              <div className="font-mono text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">
                BUILD_ENV // ANDROID_SDK_34
              </div>
              <div className="font-mono text-[10px] text-jb-primary/60 uppercase tracking-[0.2em]">
                {progress === 100 ? "READY" : "BOOTING_UP"}
              </div>
            </div>

            {/* Bottom Log */}
            <div className="absolute bottom-8 left-8 font-mono text-[10px] text-slate-400 uppercase tracking-widest z-10">
              {currentLog}
            </div>

            {/* Center Content */}
            <div className="relative flex flex-col items-center justify-center z-10">
                {/* SVG Filling Effect */}
                <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
                   {/* Background Path (Empty state) */}
                   <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                      <path
                         d="M 30,20 L 10,50 L 30,80 M 70,20 L 90,50 L 70,80 M 60,10 L 40,90"
                         fill="none"
                         stroke="#E2E8F0"
                         strokeWidth="2.5"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                      />
                   </svg>

                   {/* Filling Path (Primary color) */}
                   <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                      <defs>
                        <clipPath id="fill-clip">
                          <motion.rect 
                            x="0" 
                            width="100" 
                            initial={{ y: 100, height: 0 }}
                            animate={{ y: 100 - progress, height: progress }}
                            transition={{ ease: "linear" }}
                          />
                        </clipPath>
                      </defs>
                      <path
                         d="M 30,20 L 10,50 L 30,80 M 70,20 L 90,50 L 70,80 M 60,10 L 40,90"
                         fill="none"
                         stroke="#7F52FF"
                         strokeWidth="3"
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         clipPath="url(#fill-clip)"
                         className="drop-shadow-[0_0_8px_rgba(127,82,255,0.4)]"
                      />
                   </svg>

                   {/* Glow layer */}
                   <motion.div 
                     animate={{ opacity: [0.1, 0.3, 0.1] }}
                     transition={{ duration: 2, repeat: Infinity }}
                     className="absolute inset-0 bg-jb-primary/10 blur-3xl rounded-full scale-150 -z-10"
                   />
                </div>

                {/* Progress Bar Container */}
                <div className="relative flex flex-col items-center">
                    <div className="w-56 h-[2px] bg-slate-200/50 overflow-hidden relative rounded-full">
                        <motion.div 
                           className="absolute inset-y-0 left-0 bg-jb-primary w-full"
                           style={{ originX: 0, scaleX: progress / 100 }}
                        />
                    </div>
                    
                    {/* Percentage Counter */}
                    <div className="mt-4 flex items-baseline gap-1">
                        <span className="font-mono text-xl font-black text-slate-900 tracking-tighter">
                            {Math.floor(progress).toString().padStart(2, '0')}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 font-bold">%</span>
                    </div>
                </div>
            </div>

            {/* Corner Decorative Elements */}
            <div className="absolute top-8 right-8 font-mono text-[10px] text-slate-300">
               COORD_X: {Math.floor(progress * 1.2)}<br />
               COORD_Y: {Math.floor(progress * 0.8)}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
