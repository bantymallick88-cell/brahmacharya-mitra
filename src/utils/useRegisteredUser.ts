import { useState, useEffect } from 'react';

/**
 * Checks if the current visitor has registered/completed the onboarding setup wizard.
 * Listens to dynamic custom events so the UI updates instantaneously upon completion.
 */
export function useIsRegisteredUser(): boolean {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    const checkStatus = () => {
      try {
        if (typeof window === 'undefined') return;
        const completed = localStorage.getItem('bm_onboarding_completed') === 'true';
        const profile = localStorage.getItem('bm_user_profile');
        setIsRegistered(Boolean(completed || profile));
      } catch (e) {
        setIsRegistered(false);
      }
    };

    checkStatus();

    const handleProfileUpdate = () => checkStatus();
    window.addEventListener('onboarding-completed', handleProfileUpdate);
    window.addEventListener('bm_profile_updated', handleProfileUpdate);
    window.addEventListener('bm_sadhaks_updated', handleProfileUpdate);
    window.addEventListener('storage', handleProfileUpdate);

    return () => {
      window.removeEventListener('onboarding-completed', handleProfileUpdate);
      window.removeEventListener('bm_profile_updated', handleProfileUpdate);
      window.removeEventListener('bm_sadhaks_updated', handleProfileUpdate);
      window.removeEventListener('storage', handleProfileUpdate);
    };
  }, []);

  return isRegistered;
}
