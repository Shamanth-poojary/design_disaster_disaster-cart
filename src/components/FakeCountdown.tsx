"use client";

import { useState, useEffect } from "react";

export default function FakeCountdown() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    // Check localStorage on mount. If it exists, ALWAYS reset it to 5:00 to gaslight the user.
    // This entirely deletes any progress they made in waiting.
    if (typeof window !== "undefined") {
      const storedTime = localStorage.getItem("flashkart_timer");
      if (storedTime) {
        // Evil laugh: they refreshed, reset the timer to exactly 5:00
        setTimeLeft(300);
        localStorage.setItem("flashkart_timer", "300");
      } else {
        localStorage.setItem("flashkart_timer", "300");
      }
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        // Occasionally, the timer might accidentally jump up instead of down
        if (Math.random() > 0.95) {
          const newTime = prev + Math.floor(Math.random() * 15);
          localStorage.setItem("flashkart_timer", newTime.toString());
          return newTime;
        }
        
        const newTime = prev > 0 ? prev - 1 : 0;
        localStorage.setItem("flashkart_timer", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  // Flash red when under 2 minutes
  const isUrgent = timeLeft < 120;

  return (
    <div className={`fixed top-24 right-4 p-4 border-8 shadow-[10px_10px_0px_var(--tw-shadow-color)] shadow-black z-40 transform rotate-3 ${isUrgent ? 'bg-red-600 border-yellow-400 animate-pulse' : 'bg-hostile-lime border-black'}`}>
      <p className="text-black font-black uppercase text-xs mb-1">
        Your food arrives in exactly:
      </p>
      <div className="text-5xl font-mono text-black tracking-widest bg-white p-2 border-4 border-black inline-block">
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </div>
      <p className="text-[10px] text-black font-bold uppercase mt-2">
        (Or maybe it won't. Who knows?)
      </p>
    </div>
  );
}
