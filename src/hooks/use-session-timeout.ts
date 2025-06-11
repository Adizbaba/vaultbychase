"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIMEOUT = 14 * 60 * 1000; // 14 minutes (1 minute before timeout)

export function useSessionTimeout() {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const [isActive, setIsActive] = useState(true);
  const activityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastIdRef = useRef<string | undefined>(undefined);

  const handleLogout = useCallback(() => {
    // Implement actual logout logic (e.g., clear tokens, call API)
    console.log("Session timed out. Logging out...");
    if (toastIdRef.current) {
      dismiss(toastIdRef.current);
    }
    router.push('/login?sessionExpired=true');
  }, [router, dismiss]);

  const resetTimers = useCallback(() => {
    // Clear existing timers
    if (activityTimerRef.current) {
      clearTimeout(activityTimerRef.current);
      activityTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
    if (toastIdRef.current) {
      dismiss(toastIdRef.current);
      toastIdRef.current = undefined;
    }

    // Set new timers
    activityTimerRef.current = setTimeout(handleLogout, INACTIVITY_TIMEOUT);

    warningTimerRef.current = setTimeout(() => {
      const { id } = toast({
        title: "Session Expiry Warning",
        description: `You will be logged out due to inactivity in ${((INACTIVITY_TIMEOUT - WARNING_TIMEOUT) / 1000 / 60).toFixed(0)} minute(s). Click to stay logged in.`,
        variant: "destructive",
        duration: INACTIVITY_TIMEOUT - WARNING_TIMEOUT + 5000, // Keep toast slightly longer than remaining time
      });
      if (id) {
        toastIdRef.current = id;
      }
    }, WARNING_TIMEOUT);

    setIsActive(true);
  }, [handleLogout, toast, dismiss]);

  useEffect(() => {
    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart'];

    const handleActivity = () => {
      resetTimers();
    };

    if (typeof window !== 'undefined') {
      events.forEach(event => window.addEventListener(event, handleActivity));
      resetTimers(); // Initialize timers on mount
    }

    return () => {
      // Clean up timers
      if (activityTimerRef.current) {
        clearTimeout(activityTimerRef.current);
        activityTimerRef.current = null;
      }
      if (warningTimerRef.current) {
        clearTimeout(warningTimerRef.current);
        warningTimerRef.current = null;
      }
      // Clean up event listeners
      events.forEach(event => window.removeEventListener(event, handleActivity));
      // Clean up toast
      if (toastIdRef.current) {
        dismiss(toastIdRef.current);
        toastIdRef.current = undefined;
      }
    };
  }, [resetTimers, dismiss]);

  return isActive;
}

// How to use this hook in your DashboardLayout or a global context provider:
//
// import { useSessionTimeout } from '@/hooks/use-session-timeout';
//
// export default function DashboardLayout({ children }) {
//   useSessionTimeout(); // Call the hook
//   return (
//     // ... your layout JSX
//   );
// }
//
// Note: This hook is client-side only. It should be used in components marked with "use client".
// Ensure the user is actually logged in before activating this hook (e.g. by checking auth status).
