import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  QrCode, 
  Copy, 
  Check, 
  Server, 
  Bot, 
  Users,
  IndianRupee
} from 'lucide-react';
import { useTranslation } from '../i18n';

const AMOUNTS = [101, 251, 501, 1100, 2100, 5100];

export default function DonationSection() {
  const { t } = useTranslation();
  const [selectedAmount, setSelectedAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const upiId = "brahmacharyamitra@upi";

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const currentAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;

  return (
    <section id="donate" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Donation Container Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-3xl bg-zinc-950/70 rounded-3xl p-6 sm:p-12 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] overflow-hidden shadow-2xl transition-all duration-500"
        >
          
          {/* Subtle Ambient Cosmic Violet & Electric Gold Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-[radial-gradient(circle,rgba(109,40,217,0.2)_0%,rgba(99,102,241,0.15)_40%,rgba(245,158,11,0.14)_70%,transparent_100%)] blur-3xl rounded-full pointer-events-none -z-10 animate-aura-pulse" />

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              {t.donate.badge}
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
              {t.donate.title}{' '}
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
                {t.donate.titleHighlight}
              </span>
            </h2>
            
            <p className="text-base sm:text-lg font-sanskrit text-amber-200/95 mt-2 drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
              {t.donate.subtitleHindi}
            </p>

            <p className="mt-3 text-xs sm:text-sm text-zinc-300 max-w-2xl mx-auto">
              {t.donate.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            
            {/* Left Column: Quick Donation Options & Amounts (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-2.5">
                  {t.donate.selectAmountLabel}
                </label>
                
                <div className="grid grid-cols-3 gap-2.5">
                  {AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-3 px-3 rounded-2xl border text-center font-cinzel font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-[1.03]'
                            : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-200 hover:border-amber-500/40 hover:bg-zinc-900/60'
                        }`}
                      >
                        ₹{amt.toLocaleString()}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-3 flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 text-sm">₹</span>
                    <input
                      type="number"
                      placeholder={t.donate.customAmountPlaceholder}
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 focus:border-amber-400 text-white text-xs sm:text-sm focus:outline-none transition shadow-inner"
                    />
                  </div>
                </div>
              </div>

              {/* Direct UPI Pay Action & Copy ID */}
              <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-3.5 shadow-lg">
                <div className="flex items-center justify-between text-xs text-zinc-300 font-semibold">
                  <span>{t.donate.officialUpiLabel}</span>
                  <span className="text-amber-400 font-mono font-bold tracking-wider">{upiId}</span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    onClick={handleCopyUpi}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-xs font-bold text-white transition cursor-pointer"
                  >
                    {copiedUpi ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">{t.donate.upiCopiedBtn}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-amber-400" />
                        <span>{t.donate.copyUpiBtn}</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`upi://pay?pa=${upiId}&pn=BrahmacharyaMitra&am=${currentAmount}&cu=INR`}
                    className="btn-shimmer btn-metallic-glow flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-black text-xs transition shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer"
                  >
                    <IndianRupee className="w-4 h-4" />
                    <span>{t.donate.payViaUpiBtn} (₹{currentAmount})</span>
                  </a>
                </div>

                <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400 pt-1">
                  <span>PhonePe</span> • <span>Google Pay</span> • <span>Paytm</span> • <span>BHIM</span>
                </div>
              </div>

              {/* Transparency Highlights */}
              <div className="grid grid-cols-3 gap-2.5 pt-2 text-center">
                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/70">
                  <Server className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-[11px] font-medium text-zinc-300">{t.donate.fastServers}</div>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/70">
                  <Bot className="w-4 h-4 text-amber-300 mx-auto mb-1" />
                  <div className="text-[11px] font-medium text-zinc-300">{t.donate.aiTokens}</div>
                </div>
                <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/70">
                  <Users className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                  <div className="text-[11px] font-medium text-zinc-300">{t.donate.youthOutreach}</div>
                </div>
              </div>

            </div>

            {/* Right Column: UPI QR Code Display (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 shadow-2xl hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500">
              
              <div className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-3">
                {t.donate.scanQrLabel}
              </div>

              {/* Styled QR Code Box with Gold Border Glow */}
              <div className="p-4 rounded-3xl bg-white border-4 border-amber-400/90 shadow-[0_0_35px_rgba(245,158,11,0.35)] relative group hover:scale-[1.02] transition-transform duration-300">
                <div className="w-48 h-48 bg-zinc-950 rounded-2xl flex flex-col items-center justify-center p-3 text-center border border-zinc-800">
                  <QrCode className="w-32 h-32 text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                  <span className="text-[10px] text-zinc-300 font-mono mt-1 font-semibold">{upiId}</span>
                </div>
              </div>

              <div className="mt-4 text-sm font-black font-cinzel text-amber-300">
                Amount: ₹{currentAmount} Seva
              </div>
              <p className="text-[11px] text-zinc-400 mt-1 max-w-xs">
                {t.donate.scanQrDesc}
              </p>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
}
