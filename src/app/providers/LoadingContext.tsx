import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
  useEffect,
} from 'react';

interface LoadingState {
  isAppReady: boolean;
  pendingTasks: string[];
  registerTask: (taskId: string) => void;
  resolveTask: (taskId: string) => void;
}

export const LoadingContext = createContext<LoadingState | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  // Define initial critical tasks that the app *must* wait for
  // 'portfolio-chunk' is the initial route chunk
  const [pendingTasks, setPendingTasks] = useState<string[]>([
    'fonts',
    'github-stats',
    'lanyard',
    'portfolio-chunk',
  ]);
  
  // We only show the global loader once on initial load.
  // Once the app is ready, it stays ready.
  const [isAppReady, setIsAppReady] = useState(false);

  const registerTask = useCallback((taskId: string) => {
    setPendingTasks((prev) => {
      if (!prev.includes(taskId)) {
        return [...prev, taskId];
      }
      return prev;
    });
  }, []);

  const resolveTask = useCallback((taskId: string) => {
    setPendingTasks((prev) => prev.filter((id) => id !== taskId));
  }, []);

  // Check if we are ready
  useEffect(() => {
    if (!isAppReady && pendingTasks.length === 0) {
      // Add a tiny artificial delay to ensure smooth transition
      const timer = setTimeout(() => setIsAppReady(true), 300);
      return () => clearTimeout(timer);
    }
  }, [pendingTasks.length, isAppReady]);

  // Failsafe: if the app takes longer than 15 seconds to load (e.g. 3D fails, API hangs)
  // forcefully resolve all tasks to unblock the user.
  useEffect(() => {
    if (!isAppReady) {
      const failsafeTimer = setTimeout(() => {
        console.warn('Loading failsafe triggered. Some tasks took too long:', pendingTasks);
        setIsAppReady(true);
      }, 15000);
      return () => clearTimeout(failsafeTimer);
    }
  }, [isAppReady, pendingTasks]);

  const value = useMemo(
    () => ({ isAppReady, pendingTasks, registerTask, resolveTask }),
    [isAppReady, pendingTasks, registerTask, resolveTask]
  );

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
