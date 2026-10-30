import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Sparkles, QrCode, ShieldCheck, CheckCircle2,
  AlertCircle, ArrowRight, IndianRupee, Users, Server,
  Lock, Flame, Copy, Check
} from 'lucide-react';
import { UPI_ID, PAYEE_NAME } from './PaymentModal';
import type { SevaContribution } from './PaymentModal';

const PRESET_AMOUNTS = [
  { amount: 29, label: '₹29', subtitle: 'Minimum Seva', highlight: 'Pledge of Faith' },
  { amount: 51, label: '₹51', subtitle: 'Server Sahyog', highlight: 'Cloud Hosting' },
  { amount: 108, label: '₹108', subtitle: 'Sacred Mala', highlight: 'Sadhana Tools' },
  { amount: 251, label: '₹251', subtitle: 'Dharma Guardian', highlight: 'Content Expansion' },
  { amount: 501, label: '₹501', subtitle: 'Maha Seva', highlight: 'Platform Patron' },
];

export const DonationSection: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(108);
  const [customAmountStr, setCustomAmountStr] = useState<string>('108');
  const [utrInput, setUtrInput] = useState<string>('');
  const [contributorName, setContributorName] = useState<string>('');
  const [confirmationSuccess, setConfirmationSuccess] = useState<boolean>(false);
  const [utrError, setUtrError] = useState<string>('');
  const [recentContributions, setRecentContributions] = useState<SevaContribution[]>([]);
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);

  // Load contributions from LocalStorage
  const loadContributions = () => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('bm_seva_contributions');
      if (raw) {
        setRecentContributions(JSON.parse(raw));
      }
    } catch (e) {}
  };

  useEffect(() => {
    loadContributions();
    const handleRecorded = () => loadContributions();
    window.addEventListener('bm_seva_recorded', handleRecorded);
    return () => window.removeEventListener('bm_seva_recorded', handleRecorded);
  }, []);

  const handlePresetClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmountStr(String(amt));
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setCustomAmountStr(val);
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      setSelectedAmount(num);
    } else {
      setSelectedAmount(0);
    }
  };

  const isAmountValid = selectedAmount >= 29;

  const handleOpenPaymentModal = () => {
    if (!isAmountValid) return;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-payment-modal', {
          detail: { amount: selectedAmount },
        })
      );
    }
  };

  const handleDirectUtrConfirm = () => {
    const cleanUtr = utrInput.trim();
    if (cleanUtr.length < 8) {
      setUtrError('Kripya valid 12-Digit UTR ya Transaction ID enter karein.');
      return;
    }

    try {
      const record: SevaContribution = {
        id: 'seva_' + Date.now(),
        amount: Math.max(29, selectedAmount || 29),
        utr: cleanUtr,
        name: contributorName.trim() || 'Gupt Sadhak',
        date: new Date().toISOString(),
      };

      const existingRaw = localStorage.getItem('bm_seva_contributions');
      const list: SevaContribution[] = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(record);
      localStorage.setItem('bm_seva_contributions', JSON.stringify(list));

      setRecentContributions(list);
      setConfirmationSuccess(true);
      setUtrError('');
      setUtrInput('');
      window.dispatchEvent(new CustomEvent('bm_seva_recorded', { detail: record }));
    } catch (e) {
      setUtrError('Save karne me asuvidha hui. Kripya punah prayas karein.');
    }
  };

  const handleCopyUpi = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(UPI_ID);
        setCopiedUpi(true);
        setTimeout(() => setCopiedUpi(false), 2500);
      }
    } catch (e) {}
  };

  return (
    <section
      id="seva-section"
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative"
    >
      {/* Background Saffron/Obsidian Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Card Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border-2 border-amber-500/30 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_0_60px_rgba(245,158,11,0.12)] overflow-hidden">
        {/* Top Gold Border Beam */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
            <span>Dharma Seva & Digital Tapasya</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-cinzel">
            Brahmacharya Seva & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">Web Development Contribution</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-sans pt-1">
            "Aapka ek chota sa yogdan is sadhana aur gyan ko lakhon sadhakon tak nishulk / affordable pahunchane me madad karta hai. Aapke sahyog se hum naye premium tools, server upgrades, aur high-quality content add kar rahe hain."
          </p>
        </div>

        {/* Impact Highlights Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 pb-6 border-b border-zinc-800/80">
          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">100% Ad-Free & Pure</span>
              <span className="text-[10px] text-zinc-400">Zero corporate trackers or triggers</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Brotherhood Server Cost</span>
              <span className="text-[10px] text-zinc-400">Fast cloud infra for 50,000+ sadhaks</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">Vedic Translation R&D</span>
              <span className="text-[10px] text-zinc-400">Audio, Mala & Panic Shield updates</span>
            </div>
          </div>
        </div>

        {/* Contribution Amount Selection Section */}
        <div className="pt-8 space-y-6">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              Select Your Seva Amount (चयन करें)
            </span>
            <p className="text-xs text-zinc-400 mt-0.5">
              Choose a sacred preset or enter your custom amount (Minimum ₹29)
            </p>
          </div>

          {/* 5 Preset Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {PRESET_AMOUNTS.map((p) => {
              const isSelected = selectedAmount === p.amount;
              return (
                <button
                  key={p.amount}
                  type="button"
                  onClick={() => handlePresetClick(p.amount)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] ring-1 ring-amber-400'
                      : 'bg-zinc-950/80 border-zinc-800 hover:border-amber-500/40'
                  }`}
                >
                  <div className="text-lg sm:text-xl font-black text-amber-300 font-mono">
                    {p.label}
                  </div>
                  <div className="text-[11px] font-bold text-white mt-1">
                    {p.subtitle}
                  </div>
                  <div className="text-[9px] text-zinc-400 mt-0.5">
                    {p.highlight}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Custom Amount Input Box with Minimum ₹29 Constraint */}
          <div className="p-5 rounded-2xl bg-zinc-950/80 border border-amber-500/25 max-w-xl mx-auto space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                <span>Custom Seva Amount (निश्चित करें)</span>
              </label>
              <span className="text-[11px] font-mono font-bold text-amber-400">
                Min Constraint: ₹29
              </span>
            </div>

            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-black text-amber-400 font-mono">
                ₹
              </span>
              <input
                type="text"
                value={customAmountStr}
                onChange={handleCustomChange}
                placeholder="Enter amount (min 29)..."
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:border-amber-400 focus:outline-none text-white font-mono font-bold text-base"
              />
            </div>

            {!isAmountValid && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-0.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Minimum Seva contribution amount is ₹29. Please increase amount.</span>
              </div>
            )}
          </div>

          {/* Main Action: 'Yogdan Karein / Contribute' Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              disabled={!isAmountValid}
              onClick={handleOpenPaymentModal}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm tracking-wide shadow-2xl transition-all flex items-center justify-center gap-2.5 ${
                isAmountValid
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 shadow-amber-500/30 hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
              }`}
            >
              <QrCode className="w-5 h-5 text-zinc-950" />
              <span>Yogdan Karein / Contribute (₹{isAmountValid ? selectedAmount : 29})</span>
              <ArrowRight className="w-4 h-4 text-zinc-950 ml-1" />
            </button>

            <button
              type="button"
              onClick={handleCopyUpi}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-amber-500/30 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedUpi ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">UPI Copied: {UPI_ID}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy UPI: {UPI_ID}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Direct UTR Confirmation Card */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/90 max-w-2xl mx-auto space-y-4 shadow-xl">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold text-white">
                Payment Confirmation (12-Digit UTR Ref ID)
              </h3>
              <p className="text-[11px] text-zinc-400">
                Payment ke baad apne UPI statement se 12-Digit UTR number enter karein:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={contributorName}
              onChange={(e) => setContributorName(e.target.value)}
              placeholder="Your Name / Sadhak Alias"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none"
            />

            <input
              type="text"
              value={utrInput}
              onChange={(e) => {
                setUtrInput(e.target.value);
                if (utrError) setUtrError('');
              }}
              placeholder="12-Digit UTR Number *"
              className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none font-mono"
            />
          </div>

          {utrError && (
            <div className="flex items-center gap-1.5 text-xs text-rose-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{utrError}</span>
            </div>
          )}

          {confirmationSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Aapka sahyog safalta-purvak register ho gaya hai. Har Har Mahadev! 🙏</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleDirectUtrConfirm}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs tracking-wider shadow-md shadow-emerald-600/20 transition cursor-pointer active:scale-98"
          >
            Confirm Seva (सत्यापित करें)
          </button>
        </div>

        {/* Local Verified Seva Contributor Roll */}
        {recentContributions.length > 0 && (
          <div className="mt-8 pt-6 border-t border-zinc-800/80 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-3">
              🙏 Verified Platform Benefactors ({recentContributions.length})
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {recentContributions.slice(0, 8).map((c) => (
                <span
                  key={c.id}
                  className="px-3 py-1 rounded-full bg-zinc-950 border border-amber-500/20 text-xs text-zinc-300 flex items-center gap-1.5"
                >
                  <span className="text-amber-400 font-bold">₹{c.amount}</span>
                  <span>•</span>
                  <span>{c.name || 'Gupt Sadhak'}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationSection;
