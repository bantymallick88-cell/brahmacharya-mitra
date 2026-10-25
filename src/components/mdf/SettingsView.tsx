import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Flame, Bell, ShieldAlert, Download,
  Trash2, RotateCcw, Check, Globe, RefreshCw
} from 'lucide-react';
import LanguageSelector from '../LanguageSelector';

export default function SettingsView() {
  const [streakDays, setStreakDays] = useState(7);
  const [showPanicFAB, setShowPanicFAB] = useState(true);
  const [brahmaAlert, setBrahmaAlert] = useState(true);
  const [nightAlert, setNightAlert] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState('');
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bm_streak_days');
      if (saved) setStreakDays(parseInt(saved, 10));

      const fab = localStorage.getItem('bm_show_panic_fab');
      if (fab !== null) setShowPanicFAB(fab === 'true');
    } catch {}
  }, []);

  const handleUpdateStreak = (val: number) => {
    const next = Math.max(0, val);
    setStreakDays(next);
    try {
      localStorage.setItem('bm_streak_days', String(next));
      window.dispatchEvent(new CustomEvent('streak-updated', { detail: { days: next } }));
      showSuccess('Streak days updated successfully');
    } catch {}
  };

  const handleToggleFAB = () => {
    const next = !showPanicFAB;
    setShowPanicFAB(next);
    try {
      localStorage.setItem('bm_show_panic_fab', String(next));
      const fabEl = document.getElementById('floating-panic-btn');
      if (fabEl) {
        fabEl.style.display = next ? 'flex' : 'none';
      }
      showSuccess(`Floating panic button ${next ? 'enabled' : 'hidden'}`);
    } catch {}
  };

  const showSuccess = (msg: string) => {
    setSavedFeedback(msg);
    setTimeout(() => setSavedFeedback(''), 2500);
  };

  const handleExportData = () => {
    try {
      const data = {
        streakDays,
        journals: localStorage.getItem('bm_mdf_journals'),
        notes: localStorage.getItem('bm_mdf_notes'),
        todos: localStorage.getItem('bm_mdf_todos'),
        posts: localStorage.getItem('bm_mdf_community_posts'),
        exportDate: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brahmacharya-mitra-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      showSuccess('Data backup downloaded successfully');
    } catch {
      alert('Failed to export data');
    }
  };

  const handleResetAllData = () => {
    try {
      localStorage.removeItem('bm_mdf_journals');
      localStorage.removeItem('bm_mdf_notes');
      localStorage.removeItem('bm_mdf_todos');
      localStorage.removeItem('bm_mdf_community_posts');
      localStorage.setItem('bm_streak_days', '0');
      setStreakDays(0);
      window.dispatchEvent(new CustomEvent('streak-updated', { detail: { days: 0 } }));
      setConfirmResetOpen(false);
      showSuccess('All data reset to Day 0');
    } catch {}
  };

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-4 overflow-y-auto pr-1 pb-16">
      {/* ── Feedback Toast ── */}
      <AnimatePresence>
        {savedFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{savedFeedback}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Streak Adjustment Section ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Streak Counter Offset</h4>
          </div>
          <span className="text-xs font-black text-amber-400 font-cinzel">{streakDays} Days</span>
        </div>
        <p className="text-[11px] text-zinc-400">
          Started your streak prior to visiting? Calibrate your exact clean days count:
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleUpdateStreak(streakDays - 1)}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-bold text-xs"
          >
            -1 Day
          </button>
          <input
            type="number"
            value={streakDays}
            onChange={e => handleUpdateStreak(parseInt(e.target.value, 10) || 0)}
            className="flex-1 text-center py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white font-bold focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={() => handleUpdateStreak(streakDays + 1)}
            className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 font-bold text-xs"
          >
            +1 Day
          </button>
        </div>
      </div>

      {/* ── Sadhana Alerts & Alarms ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Daily Discipline Reminders</h4>
        </div>

        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between py-1.5 border-b border-zinc-900">
            <div>
              <div className="text-xs font-semibold text-zinc-200">Brahma Muhurta (4:00 AM)</div>
              <div className="text-[10px] text-zinc-500">Awakening notification for Japa & Pranayama</div>
            </div>
            <button
              onClick={() => { setBrahmaAlert(!brahmaAlert); showSuccess('Preference updated'); }}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                brahmaAlert ? 'bg-amber-500' : 'bg-zinc-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${brahmaAlert ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1.5">
            <div>
              <div className="text-xs font-semibold text-zinc-200">Night Reflection (9:30 PM)</div>
              <div className="text-[10px] text-zinc-500">Screen lock reminder & daily pledge review</div>
            </div>
            <button
              onClick={() => { setNightAlert(!nightAlert); showSuccess('Preference updated'); }}
              className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                nightAlert ? 'bg-amber-500' : 'bg-zinc-800'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${nightAlert ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Emergency Panic Button Sensitivity ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Emergency Panic Mode Settings</h4>
        </div>

        <div className="flex items-center justify-between py-1">
          <div>
            <div className="text-xs font-semibold text-zinc-200">Floating Screen Panic FAB</div>
            <div className="text-[10px] text-zinc-500">Always-visible emergency shield at bottom-right</div>
          </div>
          <button
            onClick={handleToggleFAB}
            className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
              showPanicFAB ? 'bg-red-500' : 'bg-zinc-800'
            }`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${showPanicFAB ? 'translate-x-4' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* ── Language Preference ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Interface Language</h4>
        </div>
        <p className="text-[11px] text-zinc-400">Choose from 14 languages (English, Hindi, Sanskrit, Regional):</p>
        <div className="pt-1">
          <LanguageSelector />
        </div>
      </div>

      {/* ── Data Backup & Reset ── */}
      <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Data & Privacy</h4>
        <p className="text-[11px] text-zinc-400">
          All your journals, streak counts, and notes are stored strictly on your local device.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={handleExportData}
            className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Export Backup (JSON)</span>
          </button>

          <button
            onClick={() => setConfirmResetOpen(true)}
            className="py-2 px-3 rounded-xl bg-red-950/40 hover:bg-red-950/70 border border-red-500/40 text-xs font-semibold text-red-300 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-400" />
            <span>Reset All Data</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmResetOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-xs rounded-3xl bg-zinc-950 border border-red-500/60 p-5 text-center space-y-3 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <RotateCcw className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white">Reset All Progress?</h3>
              <p className="text-xs text-zinc-400">
                This will reset your streak counter to 0 and clear your local journal and todos.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setConfirmResetOpen(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetAllData}
                  className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
