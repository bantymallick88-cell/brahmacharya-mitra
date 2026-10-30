import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Check, Copy, QrCode, ShieldCheck, Heart, Sparkles,
  ExternalLink, ArrowRight, CheckCircle2, AlertCircle, Smartphone
} from 'lucide-react';

export const UPI_ID = 'master1234567@ybl';
export const PAYEE_NAME = 'Brahmacharya Mitra';

interface PaymentModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  defaultAmount?: number;
}

export interface SevaContribution {
  id: string;
  amount: number;
  utr: string;
  name?: string;
  date: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen: propIsOpen,
  onClose,
  defaultAmount = 108,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [copiedUPI, setCopiedUPI] = useState(false);
  const [utrNumber, setUtrNumber] = useState('');
  const [contributorName, setContributorName] = useState('');
  const [utrSuccess, setUtrSuccess] = useState(false);
  const [utrError, setUtrError] = useState('');

  // Handle global event listener to open from anywhere
  useEffect(() => {
    const handleOpen = (e: any) => {
      const amt = e.detail?.amount ? Number(e.detail.amount) : defaultAmount;
      setAmount(Math.max(29, amt));
      setInternalOpen(true);
      setUtrSuccess(false);
      setUtrError('');
    };

    window.addEventListener('open-payment-modal', handleOpen);
    return () => window.removeEventListener('open-payment-modal', handleOpen);
  }, [defaultAmount]);

  useEffect(() => {
    if (defaultAmount) {
      setAmount(Math.max(29, defaultAmount));
    }
  }, [defaultAmount]);

  const isModalOpen = propIsOpen !== undefined ? propIsOpen : internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    setUtrSuccess(false);
    setUtrError('');
    if (onClose) onClose();
  };

  const handleCopyUPI = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(UPI_ID);
        setCopiedUPI(true);
        setTimeout(() => setCopiedUPI(false), 2500);
      }
    } catch (e) {}
  };

  const handleConfirmUTR = () => {
    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 8) {
      setUtrError('Please enter a valid 12-Digit UTR or Transaction Reference number.');
      return;
    }

    try {
      const record: SevaContribution = {
        id: 'seva_' + Date.now(),
        amount,
        utr: cleanUtr,
        name: contributorName.trim() || 'Gupt Sadhak',
        date: new Date().toISOString(),
      };

      const existingRaw = localStorage.getItem('bm_seva_contributions');
      const list: SevaContribution[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(record);
      localStorage.setItem('bm_seva_contributions', JSON.stringify(list));

      // Dispatch event so any UI listeners update
      window.dispatchEvent(new CustomEvent('bm_seva_recorded', { detail: record }));

      setUtrSuccess(true);
      setUtrError('');
      setUtrNumber('');
    } catch (e) {
      setUtrError('Could not save confirmation. Please retry.');
    }
  };

  // Dynamic QR Code URL as strictly specified:
  // https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=master1234567@ybl%26pn=Brahmacharya%20Mitra%26am=${amount}%26cu=INR
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=master1234567@ybl%26pn=Brahmacharya%20Mitra%26am=${amount}%26cu=INR`;
  const upiIntentUrl = `upi://pay?pa=master1234567@ybl&pn=Brahmacharya%20Mitra&am=${amount}&cu=INR`;

  if (!isModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-[#02040a]/90 backdrop-blur-2xl transition-all"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-zinc-950 border-2 border-amber-500/35 rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_50px_rgba(245,158,11,0.25)] overflow-hidden my-auto z-10"
        >
          {/* Top Ambient Saffron Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-28 bg-gradient-to-b from-amber-500/25 via-amber-600/10 to-transparent blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="relative px-6 pt-6 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/20">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center font-cinzel font-black text-amber-400 text-sm">
                  ₹
                </div>
              </div>
              <div>
                <h3 className="font-cinzel font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <span>Brahmacharya Seva</span>
                  <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    UPI Instant QR
                  </span>
                </h3>
                <p className="text-xs text-zinc-400">Direct contribution to server & platform development</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition cursor-pointer"
              title="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            {/* Amount Selector Row */}
            <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/25 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-300">Selected Contribution Amount</span>
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 font-mono">
                  ₹{amount}
                </span>
              </div>

              {/* Quick Preset Badges */}
              <div className="flex flex-wrap gap-2">
                {[29, 51, 108, 251, 501].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      amount === amt
                        ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 border border-amber-400'
                        : 'bg-zinc-950 text-zinc-300 hover:text-white border border-zinc-800'
                    }`}
                  >
                    ₹{amt} {amt === 29 ? '(Min)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic UPI QR Code Box */}
            <div className="flex flex-col items-center justify-center p-5 rounded-3xl bg-zinc-900/70 border border-amber-500/30 text-center relative overflow-hidden shadow-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold mb-3">
                <QrCode className="w-3.5 h-3.5 text-amber-400" />
                <span>Scan with Any UPI App (GPay, PhonePe, Paytm)</span>
              </div>

              {/* QR Image with Saffron Border Frame */}
              <div className="p-3 rounded-2xl bg-white shadow-[0_0_30px_rgba(245,158,11,0.25)] border-4 border-amber-400/80">
                <img
                  src={qrCodeUrl}
                  alt={`UPI QR Code for ₹${amount}`}
                  width={220}
                  height={220}
                  className="rounded-lg object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="text-sm font-extrabold text-white block">
                  Payee: <strong className="text-amber-400">{PAYEE_NAME}</strong>
                </span>
                <span className="text-xs text-zinc-400 block mt-0.5">
                  Amount locked to: <strong className="text-amber-300 font-mono">₹{amount} INR</strong>
                </span>
              </div>

              {/* Mobile Direct Pay Button */}
              <a
                href={upiIntentUrl}
                className="mt-4 sm:hidden w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Smartphone className="w-4 h-4" />
                <span>Open in UPI App (GPay / PhonePe)</span>
              </a>
            </div>

            {/* VPA ID Copy Field */}
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-bold">
                  Official UPI VPA ID
                </span>
                <span className="text-xs sm:text-sm font-mono font-bold text-amber-300">
                  {UPI_ID}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyUPI}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-xs font-bold text-zinc-200 transition cursor-pointer"
              >
                {copiedUPI ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copy UPI</span>
                  </>
                )}
              </button>
            </div>

            {/* 12-Digit UTR / Transaction Ref ID Form */}
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Confirm Seva (12-Digit UTR Reference)
                </h4>
              </div>

              <p className="text-[11px] text-zinc-400">
                Payment karne ke baad apne UPI app se 12-Digit UTR / Ref Number yahan enter karein taaki aapka sahyog darj ho sake.
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  value={contributorName}
                  onChange={(e) => setContributorName(e.target.value)}
                  placeholder="Your Name (Optional / e.g. Aryan)"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
                />

                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => {
                    setUtrNumber(e.target.value);
                    if (utrError) setUtrError('');
                  }}
                  placeholder="Enter 12-Digit UTR / Transaction Ref ID *"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none font-mono"
                />

                {utrError && (
                  <div className="flex items-center gap-1.5 text-xs text-rose-400">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{utrError}</span>
                  </div>
                )}

                {utrSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Aapka yogdan safalta-purvak darj kar liya gaya hai. Dhanyavad Sadhak! 🙏</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleConfirmUTR}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-98"
                >
                  Confirm Seva (पुष्टि करें)
                </button>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="px-6 py-3 bg-zinc-950/90 border-t border-white/10 text-center">
            <span className="text-[10px] text-zinc-500 font-sanskrit">
              "यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः" • निःस्वार्थ सेवा ही परम तप है
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PaymentModal;
