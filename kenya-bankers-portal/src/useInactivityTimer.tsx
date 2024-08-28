import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './packages/auth/components/Logout'; // Adjusted path

const useInactivityTimer = (timeout: number) => {
  const navigate = useNavigate();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log("Timer cleared");
    }
  };

  const resetTimer = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      console.log("User is inactive, logging out");
      logout(navigate);
    }, timeout);
    console.log("Timer reset");
  };

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'touchmove', 'scroll'];
    const handleUserActivity = () => {
      console.log("User activity detected");
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    resetTimer();

    return () => {
      clearTimer();
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [navigate]);

  console.log("Inactivity timer set up");
};

export default useInactivityTimer;
