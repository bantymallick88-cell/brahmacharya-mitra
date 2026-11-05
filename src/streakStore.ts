// Simple, reliable reactive streak store for Brahmacharya Mitra
// Synchronizes streak state across Home (Sobriety Ticker), Dashboard (Brahmacharya Dial), Navbar, and Settings

export interface StreakState {
  days: number;
  bestDays: number;
  attemptNumber: number;
  startTime: string;
}

const DEFAULT_STREAK = 8; // Default active streak demonstrating progression
const DEFAULT_BEST = 45;
const DEFAULT_ATTEMPT = 3;

// Helper to compute dynamic milestone targets for unlimited days counter ($N+$ days)
export function getDynamicTarget(
  days: number,
  baseGoal: number = 90
): { target: number; percent: number; remaining: number } {
  let target = Math.max(7, baseGoal);
  if (days >= target) {
    const milestones = [7, 21, 30, 60, 90, 108, 180, 365, 500, 730, 1000];
    const nextMilestone = milestones.find((m) => m > days);
    if (nextMilestone) {
      target = nextMilestone;
    } else {
      // For high streaks (1000+), scale dynamically in steps of 500 without UI break
      target = Math.ceil((days + 1) / 500) * 500;
    }
  }
  const percent = Math.min(100, Math.max(1, Math.round((days / target) * 100)));
  const remaining = Math.max(0, target - days);
  return { target, percent, remaining };
}

// Single source of truth helper to safely get stored streak
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
    const savedTimestamp = localStorage.getItem('tapasya_start_timestamp');
    const savedStartDate = localStorage.getItem('user_streak_start_date');
    const savedStartTime = localStorage.getItem('bm_streak_start_time');
    const savedDays = localStorage.getItem('bm_streak_days') ?? localStorage.getItem('bm_active_streak');
    const savedBest = localStorage.getItem('bm_best_days');
    const savedAttempt = localStorage.getItem('bm_attempt_num');

    let startMs: number;
    let days: number;

    // Check single source of truth timestamp / start date
    if (savedTimestamp && !isNaN(Number(savedTimestamp))) {
      startMs = Number(savedTimestamp);
      const elapsedDays = Math.max(0, Math.floor((Date.now() - startMs) / 86400000));
      days = savedDays !== null ? parseInt(savedDays, 10) : elapsedDays;
    } else if (savedStartDate) {
      startMs = new Date(savedStartDate).getTime();
      const elapsedDays = Math.max(0, Math.floor((Date.now() - startMs) / 86400000));
      days = savedDays !== null ? parseInt(savedDays, 10) : elapsedDays;
    } else if (savedStartTime) {
      startMs = new Date(savedStartTime).getTime();
      const elapsedDays = Math.max(0, Math.floor((Date.now() - startMs) / 86400000));
      days = savedDays !== null ? parseInt(savedDays, 10) : elapsedDays;
    } else if (savedDays !== null) {
      days = parseInt(savedDays, 10);
      startMs = Date.now() - days * 86400000;
    } else {
      days = DEFAULT_STREAK;
      startMs = Date.now() - days * 86400000;
    }

    if (isNaN(days) || days < 0) days = 0;

    const bestDays = savedBest !== null ? Math.max(days, parseInt(savedBest, 10)) : Math.max(days, DEFAULT_BEST);
    const attemptNumber = savedAttempt !== null ? parseInt(savedAttempt, 10) : DEFAULT_ATTEMPT;
    const startIso = new Date(startMs).toISOString();

    // Reconcile and ensure all keys exist and are in sync
    localStorage.setItem('bm_streak_days', String(days));
    localStorage.setItem('bm_active_streak', String(days));
    localStorage.setItem('tapasya_start_timestamp', String(startMs));
    localStorage.setItem('user_streak_start_date', startIso);
    localStorage.setItem('bm_streak_start_time', startIso);
    localStorage.setItem('bm_best_days', String(bestDays));
    localStorage.setItem('bm_attempt_num', String(attemptNumber));

    return { days, bestDays, attemptNumber, startTime: startIso };
  } catch {
    return {
      days: DEFAULT_STREAK,
      bestDays: DEFAULT_BEST,
      attemptNumber: DEFAULT_ATTEMPT,
      startTime: new Date().toISOString(),
    };
  }
}

// Update streak across all components immediately without page reload
export function updateGlobalStreak(newDays: number) {
  if (typeof window === 'undefined') return;

  try {
    const current = getStoredStreak();
    const safeDays = Math.max(0, Math.floor(newDays));
    const newBest = Math.max(safeDays, current.bestDays);

    const startMs = Date.now() - safeDays * 86400000;
    const startIso = new Date(startMs).toISOString();

    localStorage.setItem('bm_streak_days', String(safeDays));
    localStorage.setItem('bm_active_streak', String(safeDays));
    localStorage.setItem('tapasya_start_timestamp', String(startMs));
    localStorage.setItem('user_streak_start_date', startIso);
    localStorage.setItem('bm_streak_start_time', startIso);
    localStorage.setItem('bm_best_days', String(newBest));

    const detail = {
      days: safeDays,
      bestDays: newBest,
      attemptNumber: current.attemptNumber,
      startTime: startIso,
      startTimestamp: startMs,
    };

    // Dispatch global custom event for instant cross-component updates in current tab
    window.dispatchEvent(
      new CustomEvent('streak-updated', { detail })
    );

    window.dispatchEvent(
      new CustomEvent('bm_streak_sync', { detail })
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
    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();

    localStorage.setItem('bm_streak_days', '0');
    localStorage.setItem('bm_active_streak', '0');
    localStorage.setItem('tapasya_start_timestamp', String(nowMs));
    localStorage.setItem('user_streak_start_date', nowIso);
    localStorage.setItem('bm_streak_start_time', nowIso);
    localStorage.setItem('bm_attempt_num', String(nextAttempt));

    const detail = {
      days: 0,
      bestDays: current.bestDays,
      attemptNumber: nextAttempt,
      startTime: nowIso,
      startTimestamp: nowMs,
    };

    window.dispatchEvent(
      new CustomEvent('streak-updated', { detail })
    );

    window.dispatchEvent(
      new CustomEvent('bm_streak_sync', { detail })
    );
  } catch (err) {
    console.error('Failed to log relapse', err);
  }
}
