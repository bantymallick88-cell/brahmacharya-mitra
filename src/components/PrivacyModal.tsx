import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Database, 
  HardDrive, 
  Sparkles, 
  Download, 
  ExternalLink, 
  X, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function PrivacyModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-privacy-modal', handleOpen);
    window.addEventListener('close-privacy-modal', handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-privacy-modal', handleOpen);
      window.removeEventListener('close-privacy-modal', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleExportData = () => {
    try {
      const data = {
        streakDays: localStorage.getItem('bm_streak_days') || '0',
        relapses: localStorage.getItem('bm_relapse_history') || '[]',
        journals: localStorage.getItem('bm_mdf_journals') || '[]',
        notes: localStorage.getItem('bm_mdf_notes') || '[]',
        todos: localStorage.getItem('bm_mdf_todos') || '[]',
        communityPosts: localStorage.getItem('bm_mdf_community_posts') || '[]',
        language: localStorage.getItem('bm_language') || 'en',
        exportedAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `brahmacharya-mitra-privacy-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not export local data.');
    }
  };

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL) 
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/') 
    : '/';

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-modal-title"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#030712] border border-amber-500/40 rounded-3xl p-6 sm:p-8 text-zinc-100 shadow-[0_0_60px_rgba(245,158,11,0.25)] relative max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Header Aura */}
            <div className="absolute top-0 right-1/4 w-72 h-36 bg-amber-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-36 bg-indigo-500/10 blur-3xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80 relative z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl divine-emblem flex items-center justify-center text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h3 id="privacy-modal-title" className="text-lg sm:text-xl font-black text-white font-cinzel">
                    Privacy Policy & Sacred Trust
                  </h3>
                  <div className="text-[11px] text-amber-400/90 font-medium flex items-center gap-1.5">
                    <span>100% Client-Side</span>
                    <span>•</span>
                    <span>Zero Data Selling</span>
                    <span>•</span>
                    <span>Local Only</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-amber-400/60 text-zinc-400 hover:text-white transition cursor-pointer"
                aria-label="Close Privacy Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Privacy Content */}
            <div className="overflow-y-auto space-y-5 py-4 pr-1 text-xs text-zinc-300 leading-relaxed relative z-10">
              
              {/* Core Commitment Banner */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-amber-200 text-sm">
                    Our Sacred Pledge (धार्मिक प्रतिज्ञा)
                  </h4>
                  <p className="mt-1 text-zinc-300">
                    Overcoming addiction and walking the path of Brahmacharya requires absolute psychological safety. 
                    <strong className="text-white"> Brahmacharya Mitra never tracks, sells, or monetizes your private journey.</strong> Your recovery data belongs entirely to you.
                  </p>
                </div>
              </div>

              {/* 1. Client-Side Storage */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <HardDrive className="w-4 h-4 text-emerald-400" />
                  <span>1. 100% Local Storage (No Remote Database)</span>
                </div>
                <p className="text-zinc-400">
                  Every piece of information you input—including your streak start date, relapse count, emergency notes, 
                  journal entries, and daily habit checklists—is stored strictly in your browser’s local storage (<code className="text-amber-300 bg-zinc-900 px-1 py-0.5 rounded">localStorage</code>). 
                  None of this data is ever sent to any remote server or backend database.
                </p>
              </div>

              {/* 2. Zero Invasive Ads & Zero Spying */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <EyeOff className="w-4 h-4 text-indigo-400" />
                  <span>2. Zero Third-Party Advertising Trackers</span>
                </div>
                <p className="text-zinc-400">
                  We do not use invasive tracking pixels (such as Facebook Pixel or cross-site fingerprinting scripts) or intrusive display ad networks. 
                  You will never be retargeted with ads across the web based on your usage of this app.
                </p>
              </div>

              {/* 3. Hardware & Sensor Permissions */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>3. Hardware & Device Permissions</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong className="text-zinc-200">Camera & Microphone:</strong> Never accessed or requested.</li>
                  <li><strong className="text-zinc-200">Vibration & Audio:</strong> Utilized solely on your local device for guided Pranayama breathing cues and sacred bell tones.</li>
                  <li><strong className="text-zinc-200">Offline / PWA Cache:</strong> Service worker files cache assets locally so you can use the app without an active internet connection.</li>
                </ul>
              </div>

              {/* 4. Affiliate Disclosures */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  <span>4. Transparent Affiliate Disclosure</span>
                </div>
                <p className="text-zinc-400">
                  Certain spiritual and neuroscience book links (e.g., Swami Vivekananda, Julian Lee) contain Amazon Associate affiliate tags. 
                  If you purchase a book through these links, a modest commission is generated at <strong className="text-zinc-200">zero additional cost to you</strong>. 
                  These proceeds fund our server hosting costs and allow the platform to remain 100% free forever.
                </p>
              </div>

              {/* 5. User Ownership & Instant Erasure */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-bold text-white text-sm">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>5. Complete User Data Ownership & Deletion</span>
                </div>
                <p className="text-zinc-400">
                  You can download your entire progress log anytime using the Export button below. If you wish to wipe all data permanently, 
                  simply use "Reset All Data" in Settings or clear your browser cache.
                </p>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 relative z-10 shrink-0">
              <button
                onClick={handleExportData}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 hover:border-amber-400 text-xs font-bold text-zinc-200 flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export My Data (JSON)</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`${baseUrl}privacy`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-400 hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Full Legal Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-black text-xs transition cursor-pointer shadow-md"
                >
                  I Understand
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
