import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Smartphone, X, Sparkles, Share2, PlusSquare } from 'lucide-react';
import { MAHADEV_IMAGE_DATA } from '../assets/mahadevBase64';

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (PWA installed)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true;

    if (isStandalone) {
      return;
    }

    // Capture beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);

      const dismissed = sessionStorage.getItem('bm_pwa_dismissed');
      if (!dismissed) {
        setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Custom event to manually open prompt from Navigation Menu / Drawer
    const handleManualTrigger = () => {
      setShowBanner(true);
      if (!deferredPrompt && /iPad|iPhone|iPod/.test(navigator.userAgent)) {
        setShowIosGuide(true);
      }
    };
    window.addEventListener('open-install-prompt', handleManualTrigger);

    // Check if on iOS
    const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    if (isIos && !isStandalone) {
      const dismissed = sessionStorage.getItem('bm_pwa_dismissed');
      if (!dismissed) {
        // Delay showing banner slightly on iOS for smooth UX
        const timer = setTimeout(() => setShowBanner(true), 3500);
        return () => clearTimeout(timer);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('open-install-prompt', handleManualTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallTap = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setShowBanner(false);
        setIsInstallable(false);
      }
      setDeferredPrompt(null);
    } else {
      // Show iOS or standard browser instructions
      setShowIosGuide(true);
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
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
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
                  src="/photo_mahadev.jpg"
                  alt="Brahmacharya Mitra"
                  className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#FF8C00] shrink-0 shadow-[0_0_12px_rgba(255,140,0,0.5)]"
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
                    App
                  </span>
                </div>
                <p className="text-[11px] text-zinc-300 truncate mt-0.5">
                  📱 Add to Home Screen for offline sadhana
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={handleInstallTap}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-zinc-950 font-black text-xs shadow-[0_0_20px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Install</span>
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

      {/* ── iOS / Safari Add to Home Screen Step-by-Step Modal ── */}
      <AnimatePresence>
        {showIosGuide && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIosGuide(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-sm rounded-3xl p-6 border border-amber-500/40 shadow-2xl text-white text-center"
              style={{
                background: 'linear-gradient(135deg, #0d0d0d 0%, #161622 100%)',
              }}
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-[#FF8C00] overflow-hidden shadow-[0_0_25px_rgba(255,140,0,0.5)]">
                <img
                  src="/photo_mahadev.jpg"
                  alt="Brahmacharya Mitra"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = MAHADEV_IMAGE_DATA;
                  }}
                />
              </div>

              <h3 className="text-base font-black font-cinzel text-amber-300 mb-1">
                Install Brahmacharya Mitra
              </h3>
              <p className="text-xs text-zinc-300 mb-4">
                Fast, 1-tap launch directly from your Home Screen with zero app store download needed.
              </p>

              <div className="space-y-3 text-left text-xs bg-zinc-950/70 p-3.5 rounded-2xl border border-zinc-800 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Tap the Safari</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 font-semibold text-[11px]">
                      <Share2 className="w-3 h-3" /> Share
                    </span>
                    <span>button below</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>Scroll down and select</span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 text-amber-300 font-semibold text-[11px]">
                      <PlusSquare className="w-3 h-3" /> Add to Home Screen
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <div>
                    <span>Tap </span>
                    <span className="font-bold text-amber-300">"Add"</span>
                    <span> in the top right corner</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIosGuide(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition cursor-pointer"
              >
                Got It, Thank You!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
