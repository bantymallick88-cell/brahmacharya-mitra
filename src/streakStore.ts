// Simple, reliable reactive streak store for Brahmacharya Mitra
// Synchronizes streak state across Dashboard, WallpaperGallery, Navbar, and Settings

export interface StreakState {
  days: number;
  bestDays: number;
  attemptNumber: number;
  startTime: string;
}

const DEFAULT_STREAK = 8; // Default active streak demonstrating progression
const DEFAULT_BEST = 45;
const DEFAULT_ATTEMPT = 3;

// Helper to safely get stored streak
export function getStoredStreak(): StreakState {
  if (typeof window === 'undefined') {
    return {
      days: DEFAULT_STREAK,
      bestDays: DEFAULT_BEST,
      attemptNumber: DEFAULT_ATTEMPT,
      startTime: new Date().toISOString(),
    };
  }

  try {
    const savedDays = localStorage.getItem('bm_streak_days');
    const savedBest = localStorage.getItem('bm_best_days');
    const savedAttempt = localStorage.getItem('bm_attempt_num');
    const savedStartTime = localStorage.getItem('bm_streak_start_time');

    const days = savedDays !== null ? parseInt(savedDays, 10) : DEFAULT_STREAK;
    const bestDays = savedBest !== null ? parseInt(savedBest, 10) : Math.max(days, DEFAULT_BEST);
    const attemptNumber = savedAttempt !== null ? parseInt(savedAttempt, 10) : DEFAULT_ATTEMPT;
    const startTime = savedStartTime || new Date(Date.now() - days * 86400000).toISOString();

    // Ensure localStorage is initialized
    if (savedDays === null) localStorage.setItem('bm_streak_days', String(days));
    if (savedBest === null) localStorage.setItem('bm_best_days', String(bestDays));
    if (savedAttempt === null) localStorage.setItem('bm_attempt_num', String(attemptNumber));
    if (savedStartTime === null) localStorage.setItem('bm_streak_start_time', startTime);

    return { days, bestDays, attemptNumber, startTime };
  } catch {
    return {
      days: DEFAULT_STREAK,
      bestDays: DEFAULT_BEST,
      attemptNumber: DEFAULT_ATTEMPT,
      startTime: new Date().toISOString(),
    };
  }
}

// Update streak across all components
export function updateGlobalStreak(newDays: number) {
  if (typeof window === 'undefined') return;

  try {
    const current = getStoredStreak();
    const safeDays = Math.max(0, newDays);
    const newBest = Math.max(safeDays, current.bestDays);

    localStorage.setItem('bm_streak_days', String(safeDays));
    localStorage.setItem('bm_best_days', String(newBest));

    // Update start time relative to newDays
    const newStart = new Date(Date.now() - safeDays * 86400000).toISOString();
    localStorage.setItem('bm_streak_start_time', newStart);

    // Dispatch global custom event for instant cross-component updates
    window.dispatchEvent(
      new CustomEvent('streak-updated', {
        detail: {
          days: safeDays,
          bestDays: newBest,
          attemptNumber: current.attemptNumber,
        },
      })
    );
  } catch (err) {
    console.error('Failed to update global streak', err);
  }
}

// Log a relapse and advance attempt
export function logRelapse() {
  if (typeof window === 'undefined') return;

  try {
    const current = getStoredStreak();
    const nextAttempt = current.attemptNumber + 1;
    const newStart = new Date().toISOString();

    localStorage.setItem('bm_streak_days', '0');
    localStorage.setItem('bm_attempt_num', String(nextAttempt));
    localStorage.setItem('bm_streak_start_time', newStart);

    window.dispatchEvent(
      new CustomEvent('streak-updated', {
        detail: {
          days: 0,
          bestDays: current.bestDays,
          attemptNumber: nextAttempt,
        },
      })
    );
  } catch (err) {
    console.error('Failed to log relapse', err);
  }
}
