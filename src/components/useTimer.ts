import { useState, useEffect, useRef, useCallback } from 'react';

export function useTimer(initialTime: number) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset timer when initialTime changes
  useEffect(() => {
    setTimeLeft(initialTime);
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [initialTime]);

  const start = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(initialTime);
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          setIsRunning(false);
          return 0;
        }
      });
    }, 1000);
  }, [initialTime]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setTimeLeft(initialTime);
  }, [initialTime, stop]);

  // Clean up on unmount
  useEffect(() => () => stop(), [stop]);

  return { timeLeft, isRunning, start, stop, reset, setTimeLeft };
}
