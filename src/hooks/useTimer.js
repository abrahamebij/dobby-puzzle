import { useState, useEffect, useRef } from "react";

// Custom hook to manage a timer
export const useTimer = (isActive, isGameWon) => {
  // State to keep track of elapsed time
  const [time, setTime] = useState(0);
  // Ref to store the interval ID
  const intervalRef = useRef(null);

  // Effect to start/stop the timer based on isActive and isGameWon
  useEffect(() => {
    // Start timer if active and game not won
    if (isActive && !isGameWon) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1); // Increment time by 0.1 seconds
      }, 100); // Every 100ms
    } else {
      // Stop timer if not active or game won
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup interval on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isGameWon]);

  // Function to reset the timer
  const resetTimer = () => {
    setTime(0); // Reset time to zero
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Clear interval if running
      intervalRef.current = null;
    }
  };

  // Function to format time as MM:SS.s
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60); // Minutes part
    const secs = (seconds % 60).toFixed(1); // Seconds part with one decimal
    return `${mins.toString().padStart(2, "0")}:${secs.padStart(4, "0")}`; // Format as 00:00.0
  };

  // Return timer state and utility functions
  return {
    time,
    formattedTime: formatTime(time),
    resetTimer,
  };
};
