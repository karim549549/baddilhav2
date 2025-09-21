import { useEffect, useState, useMemo } from "react";

export function useCountdownTimer(targetDate: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdown = useMemo(() => {
    const diff = Math.max(0, targetDate.getTime() - now.getTime());
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  }, [targetDate, now]);

  return countdown;
}
