import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, QrCode, ShieldCheck, CheckCircle2,
  AlertCircle, ArrowRight, IndianRupee, Sparkles,
  Smartphone, X, ExternalLink, Mail, Lock
} from 'lucide-react';
import TelegramIcon from './TelegramIcon';
import { useIsRegisteredUser } from '../utils/useRegisteredUser';

export const UPI_ID = 'master1234567@ybl';
export const PAYEE_NAME = 'Brahmacharya Mitra';

export interface SevaRecord {
  id: string;
  amount: number;
  utr: string;
  date: string;
}

const PRESET_AMOUNTS = [29, 51, 108, 251, 501];

export const SevaSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(108);
  const [customAmountStr, setCustomAmountStr] = useState<string>('108');
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [utrSuccess, setUtrSuccess] = useState<boolean>(false);
  const [utrError, setUtrError] = useState<string>('');
  const isRegistered = useIsRegisteredUser();

  useEffect(() => {
    const handleOpenModal = (e: any) => {
      const amt = e.detail?.amount ? Number(e.detail.amount) : 108;
      const validAmt = Math.max(29, amt);
      setSelectedAmount(validAmt);
      setCustomAmountStr(String(validAmt));
      setShowQrModal(true);
    };

    window.addEventListener('open-payment-modal', handleOpenModal);
    window.addEventListener('open-seva-modal', handleOpenModal);

    return () => {
      window.removeEventListener('open-payment-modal', handleOpenModal);
      window.removeEventListener('open-seva-modal', handleOpenModal);
    };
  }, []);

  const handlePresetSelect = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmountStr(String(amt));
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const clean = e.target.value.replace(/\D/g, '');
    setCustomAmountStr(clean);
    const parsed = parseInt(clean, 10);
    setSelectedAmount(!isNaN(parsed) ? parsed : 0);
  };

  const isAmountValid = selectedAmount >= 29;

  const handleConfirmUtr = () => {
    const cleanUtr = utrNumber.trim();
    if (cleanUtr.length < 8) {
      setUtrError('12-Digit UTR / Transaction ID enter karein');
      return;
    }

    try {
      const record: SevaRecord = {
        id: 'seva_' + Date.now(),
        amount: Math.max(29, selectedAmount || 29),
        utr: cleanUtr,
        date: new Date().toISOString(),
      };

      const existingRaw = localStorage.getItem('bm_seva_contributions');
      const list: SevaRecord[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(record);
      localStorage.setItem('bm_seva_contributions', JSON.stringify(list));

      setUtrSuccess(true);
      setUtrError('');
      setUtrNumber('');
      setTimeout(() => setUtrSuccess(false), 6000);
    } catch (e) {
      setUtrError('Save error. Try again.');
    }
  };

  // Dynamic QR Code & Intent URLs with embedded payee details
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=${UPI_ID}%26pn=Brahmacharya%20Mitra%26am=${selectedAmount}%26cu=INR`;
  const universalUpiUrl = `upi://pay?pa=${UPI_ID}&pn=Brahmacharya%20Mitra&am=${selectedAmount}&cu=INR`;
  const phonepeUrl = `phonepe://pay?pa=${UPI_ID}&pn=Brahmacharya%20Mitra&am=${selectedAmount}&cu=INR`;
  const gpayUrl = `tez://upi/pay?pa=${UPI_ID}&pn=Brahmacharya%20Mitra&am=${selectedAmount}&cu=INR`;
  const paytmUrl = `paytmmp://pay?pa=${UPI_ID}&pn=Brahmacharya%20Mitra&am=${selectedAmount}&cu=INR`;

  return (
    <section id="seva-section" className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-10 relative">
      {/* Sleek Compact Dark Luxury Card */}
      <div className="relative rounded-3xl bg-zinc-950/85 border border-amber-500/30 p-5 sm:p-7 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header with Motivational Headline */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Heart className="w-5 h-5 fill-amber-400/20" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2 font-cinzel">
                <span>Brahmacharya Seva & Contribution</span>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  Ad-Free Dharma
                </span>
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Aapka chota sa sahyog platform server & high-quality nishulk sadhana tools ko chalane me madad karta hai.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Horizontal Preset Chips & Direct Yogdan Action */}
        <div className="py-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-zinc-400 mr-1 hidden sm:inline">Amount:</span>

            {PRESET_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handlePresetSelect(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/30 border border-amber-400 scale-105'
                      : 'bg-zinc-900/90 text-zinc-300 hover:text-white border border-zinc-800 hover:border-amber-500/30'
                  }`}
                >
                  ₹{amt} {amt === 29 ? '(Min)' : ''}
                </button>
              );
            })}

            {/* Compact Custom Input Field */}
            <div className="relative flex items-center min-w-[120px] max-w-[140px]">
              <span className="absolute left-2.5 text-xs font-bold text-amber-400 font-mono">₹</span>
              <input
                type="text"
                value={customAmountStr}
                onChange={handleCustomInput}
                placeholder="Custom"
                className="w-full pl-6 pr-2.5 py-1.5 rounded-xl bg-zinc-900/90 border border-zinc-700 focus:border-amber-400 text-xs text-white font-mono font-bold focus:outline-none"
              />
            </div>
          </div>

          {!isAmountValid && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Minimum Seva amount is ₹29.</span>
            </div>
          )}

          {/* Direct Yogdan Action Button */}
          <div className="pt-1">
            <button
              type="button"
              disabled={!isAmountValid}
              onClick={() => setShowQrModal(true)}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-sm tracking-wide shadow-xl flex items-center justify-center gap-2.5 transition-all ${
                isAmountValid
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 shadow-amber-500/25 hover:scale-[1.02] active:scale-95 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <QrCode className="w-4 h-4 text-zinc-950" />
              <span>Yogdan Karein (Pay ₹{isAmountValid ? selectedAmount : 29} via UPI App)</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </button>
          </div>
        </div>

        {/* 3. Compact 12-Digit UTR Verification Input */}
        <div className="pt-3 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={utrNumber}
                onChange={(e) => {
                  setUtrNumber(e.target.value);
                  if (utrError) setUtrError('');
                }}
                placeholder="Enter 12-Digit UTR / Transaction Ref ID after payment..."
                className="w-full px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none font-mono"
              />
            </div>

            <button
              type="button"
              onClick={handleConfirmUtr}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Confirm Seva</span>
            </button>
          </div>

          {utrError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400 mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{utrError}</span>
            </div>
          )}

          {utrSuccess && (
            <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 mt-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dhanyavad Sadhak! Aapka sahyog safalta-purvak darj ho gaya hai. 🙏</span>
            </div>
          )}

          {/* Support & Community Help Note */}
          <div className="mt-4 pt-3.5 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-zinc-400 text-center sm:text-left leading-relaxed text-[11px] sm:text-xs">
              For any queries, feedback, or assistance, reach out via Email or join our official Telegram group.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              {isRegistered ? (
                <a
                  href="https://t.me/+aeaMsRXfx0VhZDJl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <TelegramIcon className="w-3.5 h-3.5 text-amber-400" />
                  <span>Join Telegram</span>
                </a>
              ) : (
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-onboarding-wizard'))}
                  className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-amber-500/40 text-zinc-400 hover:text-amber-300 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  title="Complete Setup Wizard to unlock Telegram Community"
                >
                  <Lock className="w-3.5 h-3.5 text-amber-500/70" />
                  <span>Join Telegram 🔒</span>
                </button>
              )}
              <a
                href="mailto:bantyxyz13@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-amber-500/40 text-zinc-300 hover:text-white font-medium text-xs transition-all flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>bantyxyz13@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Compact Inline QR Modal with Direct Deep-Links */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQrModal(false)}
              className="fixed inset-0 bg-[#02040a]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-sm bg-zinc-950 border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl z-10 space-y-4"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs">
                    ₹
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white font-cinzel">Scan or Tap to Pay</h4>
                    <span className="text-[10px] text-zinc-400">Payee: {PAYEE_NAME}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* HD QR Code (No plain text UPI exposed) */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="p-2.5 rounded-2xl bg-white border-2 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.25)]">
                  <img
                    src={qrCodeUrl}
                    alt={`UPI QR Code for ₹${selectedAmount}`}
                    width={190}
                    height={190}
                    className="rounded-lg object-contain"
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-base font-black text-amber-300 font-mono">
                    ₹{selectedAmount} INR
                  </span>
                  <span className="text-[10px] text-zinc-500 block">
                    Scan with any UPI app (GPay / PhonePe / Paytm)
                  </span>
                </div>
              </div>

              {/* Direct UPI Deep-Link Action Buttons */}
              <div className="space-y-2 pt-1">
                <div className="grid grid-cols-3 gap-2">
                  {/* PhonePe */}
                  <a
                    href={phonepeUrl}
                    className="py-2 px-1 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-center text-[11px] font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>PhonePe</span>
                  </a>

                  {/* GPay */}
                  <a
                    href={gpayUrl}
                    className="py-2 px-1 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-200 text-center text-[11px] font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>GPay</span>
                  </a>

                  {/* Paytm */}
                  <a
                    href={paytmUrl}
                    className="py-2 px-1 rounded-xl bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-200 text-center text-[11px] font-bold transition flex items-center justify-center gap-1"
                  >
                    <span>Paytm</span>
                  </a>
                </div>

                {/* Universal UPI App link */}
                <a
                  href={universalUpiUrl}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Open in Default UPI App</span>
                </a>
              </div>

              {/* Note */}
              <p className="text-[10px] text-zinc-500 text-center leading-snug pt-1">
                After successful payment, enter your 12-Digit UTR reference in the card below to confirm.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SevaSection;
