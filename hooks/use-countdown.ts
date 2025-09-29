"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(initialSeconds: number = 180) {
  const [remaining, setRemaining] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clear();
    setIsActive(false);
  }, [clear]);

  const start = useCallback(
    (seconds?: number) => {
      clear();
      if (typeof seconds === "number") setRemaining(seconds);
      setIsActive(true);
      timerRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clear();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    },
    [clear]
  );

  const reset = useCallback(() => {
    stop();
    setRemaining(initialSeconds);
  }, [initialSeconds, stop]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return { remaining, isActive, start, stop, reset, mm, ss };
}
