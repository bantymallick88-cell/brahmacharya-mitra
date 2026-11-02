import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  X, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertCircle, 
  Scale, 
  FileText,
  Clock,
  BookOpen
} from 'lucide-react';

export default function DmcaModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const contactEmail = 'bantyxyz13@gmail.com';

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-dmca-modal', handleOpen);
    window.addEventListener('close-dmca-modal', handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-dmca-modal', handleOpen);
      window.removeEventListener('close-dmca-modal', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const copyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Darkened Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* 3D Glass Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-zinc-950/95 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(245,158,11,0.2)] backdrop-blur-2xl z-10 my-8 overflow-hidden"
        >
          {/* Top Amber Radiant Flare */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-36 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white transition cursor-pointer"
            aria-label="Close DMCA Modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge & Title */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-inner">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 tracking-wider">
                Legal Notice & DMCA Compliance
              </span>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel text-white mt-1">
                Copyright & DMCA Takedown Policy
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-800">
            {/* Fair Use Box */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Non-Profit Spiritual & Educational Fair Use</span>
              </div>
              <p className="text-xs text-amber-200/90 leading-relaxed">
                Brahmacharya Mitra is an entirely non-profit educational and spiritual initiative dedicated to helping individuals overcome digital addiction, preserve vital energy, and achieve self-mastery. All literature, ancient scriptures, and research documents hosted in the Sacred Library are provided strictly under the principles of <strong>Fair Use</strong> (Section 107 of the U.S. Copyright Act & Section 52 of the Indian Copyright Act, 1957) for private study, scholarship, and spiritual research.
              </p>
            </div>

            {/* Intellectual Property Notice */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-white text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Intellectual Property Respect</span>
              </div>
              <p className="text-xs text-zinc-400">
                We hold immense respect for authors, spiritual publishing trusts, and researchers. All copyrights, trademarks, and intellectual rights remain the exclusive property of their respective creators, publishers, and lineages.
              </p>
            </div>

            {/* Takedown Procedure */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>DMCA Notice & Takedown Procedure</span>
              </h3>
              <p className="text-xs text-zinc-400">
                If you are a copyright owner or an authorized agent and believe in good faith that any content hosted in our library infringes upon your copyright, please notify us immediately. Upon receiving a verifiable request, we will expeditiously remove or disable access to the content within <strong>24 to 48 hours</strong>.
              </p>
              
              <div className="bg-zinc-900/80 p-3 rounded-xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1 font-mono">
                <p className="text-zinc-300 font-sans font-semibold mb-1">Please include the following in your notice:</p>
                <p>1. Title & author of the copyrighted work claimed to be infringed.</p>
                <p>2. The exact URL or book title as shown on brahmacharya.fixeehub.com.</p>
                <p>3. Your legal name, organization, email, and proof of copyright ownership.</p>
                <p>4. A statement of good-faith belief that the disputed use is unauthorized.</p>
                <p>5. An electronic or physical signature of the authorized copyright holder.</p>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800/80">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Dedicated Response Window: <strong>Within 24–48 Hours Guaranteed</strong>.</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href={`mailto:${contactEmail}?subject=DMCA%20Copyright%20Takedown%20Request%20-%20Brahmacharya%20Mitra&body=Dear%20Brahmacharya%20Mitra%20Legal%20Team,%0A%0AI%20am%20writing%20to%20request%20the%20takedown%20of%20a%20copyrighted%20work.%0A%0AWork%20Title:%0AURL%20on%20Site:%0ACopyright%20Holder:%0AProof%20of%20Authorization:%0AContact%20Details:%0A%0AThank%20you.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Email DMCA Notice</span>
                <ExternalLink className="w-3 h-3 text-zinc-900" />
              </a>

              <button
                onClick={copyEmail}
                className="px-3.5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-amber-400 text-zinc-300 hover:text-white font-bold text-xs transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                title="Copy Contact Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>{contactEmail}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Close Notice
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

