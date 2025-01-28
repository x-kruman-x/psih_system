import { useState, useEffect } from "react";

export const useTimer = (initialTime: number) => {
  const [timer, setTimer] = useState(initialTime);
  const isTimerActive = timer > 0;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timer]);

  const resetTimer = (newTime: number) => {
    setTimer(newTime);
  };

  return { timer, isTimerActive, resetTimer };
};