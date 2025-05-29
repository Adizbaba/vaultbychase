"use client";

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation'; // Corrected import
import { useToast } from '@/hooks/use-toast';

const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutes
const WARNING_TIMEOUT = 14 * 60 * 1000; // 14 minutes (1 minute before timeout)

export function useSessionTimeout() {
  const router = useRouter();
  const { toast, dismiss } = useToast();
  const [isActive, setIsActive] = useState(true);
  let activityTimer: NodeJS.Timeout | null = null;
  let warningTimer: NodeJS.Timeout | null = null;
  let toastIdRef = '';


  const handleLogout = useCallback(() => {
    // Implement actual logout logic (e.g., clear tokens, call API)
    console.log("Session timed out. Logging out...");
    dismiss(toastIdRef); // Dismiss any active warning toast
    router.push('/login?sessionExpired=true');
  }, [router, dismiss, toastIdRef]);

  const resetTimers = useCallback(() => {
    if (activityTimer) clearTimeout(activityTimer);
    if (warningTimer) clearTimeout(warningTimer);
    dismiss(toastIdRef);

    activityTimer = setTimeout(handleLogout, INACTIVITY_TIMEOUT);
    
    warningTimer = setTimeout(() => {
      const { id } = toast({
        title: "Session Expiry Warning",
        description: `You will be logged out due to inactivity in ${((INACTIVITY_TIMEOUT - WARNING_TIMEOUT) / 1000 / 60).toFixed(0)} minute(s). Click to stay logged in.`,
        variant: "destructive",
        duration: INACTIVITY_TIMEOUT - WARNING_TIMEOUT + 5000, // Keep toast slightly longer than remaining time
        action: (
          <Button variant="outline" size="sm" onClick={() => {
            resetTimers();
            dismiss(id);
          }}>
            Stay Logged In
          </Button>
        ),
      });
      if(id) toastIdRef = id;
    }, WARNING_TIMEOUT);

    setIsActive(true);
  }, [handleLogout, toast, dismiss, INACTIVITY_TIMEOUT, WARNING_TIMEOUT]);

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
      if (activityTimer) clearTimeout(activityTimer);
      if (warningTimer) clearTimeout(warningTimer);
      events.forEach(event => window.removeEventListener(event, handleActivity));
      dismiss(toastIdRef);
    };
  }, [resetTimers, dismiss, toastIdRef]);

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
