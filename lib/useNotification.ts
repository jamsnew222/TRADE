'use client';

import { useState, useRef, useEffect } from 'react';

export function useNotification(timeoutMs = 3000) {
  const [notification, setNotification] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const show = (message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setNotification(message);
    timerRef.current = setTimeout(() => setNotification(null), timeoutMs);
  };

  return { notification, show };
}
