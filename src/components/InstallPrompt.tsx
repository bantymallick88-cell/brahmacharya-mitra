import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, X, Check, Download } from 'lucide-react';
import { MAHADEV_IMAGE_DATA } from '../assets/mahadevBase64';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';

  useEffect(() => {
    // Check if app is already running in standalone mode (PWA installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // Capture browser beforeinstallprompt event (Native Chrome / Edge / Android)
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);

      // Check if user previously dismissed in this browser session
      const dismissed = sessionStorage.getItem('bm_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for successful PWA installation
    const handleAppInstalled = () => {
      setShowBanner(false);
      setDeferredPrompt(null);
      setToastMessage('Brahmacharya Mitra successfully installed!');
      setTimeout(() => setToastMessage(null), 3000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Custom event to trigger install prompt from Header / Navigation Menu
    const handleManualTrigger = () => {
      setShowBanner(true);
      if (deferredPrompt) {
        deferredPrompt.prompt();
      }
    };

    window.addEventListener('open-install-prompt', handleManualTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('open-install-prompt', handleManualTrigger);
    };
  }, [deferredPrompt]);

  /* ─────────────────────────────────────────────────────────────
     True 1-Tap Native PWA Install Trigger:
     Directly invokes deferredPrompt.prompt() to open native Chrome/Edge/Android dialog
  ───────────────────────────────────────────────────────────── */
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        // Trigger native browser install dialog directly
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult && choiceResult.outcome === 'accepted') {
          setShowBanner(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
    } else {
      // Fallback message for browsers where install prompt is in the address bar
      setToastMessage('To install: click the Install icon (⊕) in your browser address bar.');
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    sessionStorage.setItem('bm_pwa_dismissed', 'true');
  };

  return (
    <>
      {/* ── Compact Floating "Add to Home Screen" Banner ── */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 sm:max-w-md w-auto"
          >
            <div
              className="relative overflow-hidden rounded-2xl p-3.5 sm:p-4 backdrop-blur-2xl border border-amber-500/40 shadow-[0_10px_40px_rgba(0,0,0,0.95),0_0_25px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3 text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(13,13,13,0.96) 0%, rgba(20,20,30,0.96) 100%)',
              }}
            >
              {/* Subtle top shimmer beam */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

              {/* Brand Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={baseUrl + "photo_mahadev.jpg"}
                  alt="Mahadev"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#FF8C00] shrink-0 shadow-[0_0_12px_rgba(255,140,0,0.5)]"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = MAHADEV_IMAGE_DATA;
                  }}
                />
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[9px] font-black flex items-center justify-center text-black border border-black">
                  +
                </span>
              </div>

              {/* App Info */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                    Brahmacharya Mitra
                  </h4>
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    PWA
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 truncate mt-0.5">
                  📱 Add to Home Screen for offline sadhana
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={handleInstallClick}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                  title="1-Tap Native Install"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Add to Home Screen</span>
                </button>

                <button
                  onClick={handleDismiss}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Dismiss install banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Feedback Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[120] pointer-events-none"
          >
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-950/95 border border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.5)] backdrop-blur-2xl text-white font-bold text-xs sm:text-sm">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-amber-200">{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
