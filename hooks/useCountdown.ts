'use client';
import { useState, useEffect } from 'react';

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const storageKey = 'ventilator_countdown_deadline';
    let deadline: number;

    const stored = localStorage.getItem(storageKey);
    if (!stored || Date.now() > parseInt(stored)) {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(storageKey, deadline.toString());
    } else {
      deadline = parseInt(stored);
    }

    const calculate = (): TimeLeft => {
      const diff = deadline - Date.now();
      if (diff <= 0) {
        const newDeadline = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(storageKey, newDeadline.toString());
        deadline = newDeadline;
        return { hours: 23, minutes: 59, seconds: 59 };
      }
      return {
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculate());
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}
