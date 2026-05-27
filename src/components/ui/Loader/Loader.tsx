import { memo, useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import tinycolor from 'tinycolor2';
import { useSharedState } from '@/app/providers/AppContext';
import { THEME_COLORS, LOADER_LOGS } from '@/config';

interface LoaderProps {
  logLines?: string[];
  isFullScreen?: boolean;
  ignoreSessionStorage?: boolean;
  systemMessage?: { pending: string[]; done: string[] };
}

const Loader = ({
  logLines = LOADER_LOGS.GLOBAL_BOOT as unknown as string[],
  isFullScreen = true,
  systemMessage = {
    pending: ['// HANG TIGHT, EXPLORER.', '// THE SYSTEM IS GETTING EVERYTHING READY FOR YOU...'],
    done: ['// SYSTEMS SYNCHRONIZED.', '// WELCOME ABOARD.']
  }
}: LoaderProps) => {
  const [isVisible] = useState(true);
  const [activeLogIndex, setActiveLogIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { backgroundColor } = useSharedState();

  const isDark = backgroundColor ? tinycolor(backgroundColor).isDark() : false;
  const gridColor = isDark ? THEME_COLORS.DARK_GRID : THEME_COLORS.LIGHT_GRID;
  const bgStyles = {
    backgroundColor: backgroundColor || (isDark ? '#1a1a1a' : '#f5f2eb'),
    '--grid-color': gridColor,
  } as React.CSSProperties;

  useEffect(() => {
    // Total cycle duration is 3s (3000ms)
    const logInterval = 3000 / logLines.length;
    
    // Start infinite logs sequence
    const intervalId = setInterval(() => {
      setActiveLogIndex((prev) => (prev + 1) % logLines.length);
    }, logInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [logLines.length]);


  const containerClasses = isFullScreen
    ? 'fixed inset-0 z-[9999]'
    : 'absolute inset-0 z-50 min-h-[300px] w-full rounded-lg'; // absolute allows it to fill relative parent sections

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: isFullScreen ? -20 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`${containerClasses} flex flex-col justify-between text-zinc-800 dark:text-zinc-300 font-mono text-xs uppercase tracking-wider p-6 sm:p-12 overflow-hidden`}
          style={bgStyles}
        >
          <div className="grid-background absolute inset-0 z-[-1]" style={{ '--grid-color': gridColor } as React.CSSProperties} />

          {/* Main Content Area: 3 columns on large screens */}
          <div className="relative flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto items-center md:items-stretch">
            
            {/* Left Side: Logs */}
            <div className="flex-1 flex flex-col justify-center w-full md:w-auto mt-12 md:mt-0">
              <div className="space-y-3">
                {logLines.map((line, idx) => {
                  const isActive = idx === activeLogIndex;
                  const shouldShow = true; // Show all lines, but highlight active one
                  
                  return (
                    <motion.div
                      key={line}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: shouldShow ? (isActive ? 1 : 0.4) : 0,
                        y: 0,
                      }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
                      className={`flex items-center space-x-2 transition-colors duration-300 ${
                        isActive ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-200/50 dark:bg-zinc-800/50 py-1 px-2 -ml-2 rounded-sm' : ''
                      }`}
                    >
                      <span>// {line}</span>
                      {isActive && !shouldReduceMotion && (
                        <motion.span
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="inline-block w-2.5 h-4 bg-zinc-800 dark:bg-zinc-200"
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Center: Status (Removed for infinite loop) */}
            <div className="flex-1 flex items-center justify-center py-12 md:py-0 w-full md:w-auto">
            </div>

            {/* Right Side: Message */}
            <div className="flex-1 flex flex-col justify-center md:items-end w-full md:w-auto mb-8 md:mb-0 text-left md:text-right">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 1 }}
                className="max-w-[200px]"
              >
                <>
                  {systemMessage.pending.map(msg => <p key={msg}>{msg}</p>)}
                </>
              </motion.div>
            </div>
          </div>

          {/* Bottom Area: Metadata */}
          {isFullScreen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end text-[10px] sm:text-xs pt-6 border-t border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="w-6 h-6 border-[0.5px] border-zinc-800 dark:border-zinc-400 relative"
                >
                  <div className="absolute top-1/2 left-0 w-full h-[0.5px] bg-zinc-800 dark:bg-zinc-400" />
                  <div className="absolute top-0 left-1/2 w-[0.5px] h-full bg-zinc-800 dark:bg-zinc-400" />
                </motion.div>
                <div>
                  <p>BOOT SEQUENCE</p>
                  <p>v1.0.0 • AB❤️.</p>
                </div>
              </div>
              
              <div className="text-left sm:text-right">
                <p>© {new Date().getFullYear()} ADITYA RAWAL / ALL RIGHTS RESERVED</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Loader);
