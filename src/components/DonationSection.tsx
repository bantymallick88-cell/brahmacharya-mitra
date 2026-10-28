// Seva Donation & UPI QR Section temporarily disabled
// To re-enable, uncomment the component JSX below.

export default function DonationSection() {
  return null;
}

/*
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

export function DonationSectionOriginal() {
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
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative backdrop-blur-3xl bg-zinc-950/70 rounded-3xl p-6 sm:p-12 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] overflow-hidden shadow-2xl transition-all duration-500"
        >
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[480px] bg-[radial-gradient(circle,rgba(109,40,217,0.2)_0%,rgba(99,102,241,0.15)_40%,rgba(245,158,11,0.14)_70%,transparent_100%)] blur-3xl rounded-full pointer-events-none -z-10 animate-aura-pulse" />

          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {t.donate.badge}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-wide">
              {t.donate.title}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500">
                {t.donate.titleHighlight}
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base font-serif italic text-amber-300/90 max-w-xl mx-auto font-medium">
              {t.donate.subtitleHindi}
            </p>

            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              {t.donate.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
                  {t.donate.selectAmountLabel}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
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
                        className={`py-3 px-2 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 shadow-[0_0_20px_rgba(245,158,11,0.45)] scale-105 border-2 border-white'
                            : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-amber-500/50'
                        }`}
                      >
                        <IndianRupee className="w-3.5 h-3.5" />
                        <span>{amt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <input
                  type="number"
                  placeholder={t.donate.customAmountPlaceholder}
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 focus:border-amber-400 text-zinc-100 text-sm placeholder:text-zinc-500 focus:outline-none transition"
                />
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {t.donate.officialUpiLabel}
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="font-mono text-sm font-bold text-amber-300 px-3 py-1.5 rounded-xl bg-black/50 border border-amber-500/20 select-all">
                    {upiId}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {copiedUpi ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t.donate.upiCopiedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{t.donate.copyUpiBtn}</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`upi://pay?pa=${upiId}&pn=BrahmacharyaMitra&am=${currentAmount}&cu=INR`}
                      className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.donate.payViaUpiBtn}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <Server className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium">{t.donate.fastServers}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <Bot className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium">{t.donate.aiTokens}</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                  <Users className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <span className="text-zinc-300 font-medium">{t.donate.youthOutreach}</span>
                </div>
              </div>

            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
              
              <div className="text-xs font-bold text-amber-200 uppercase tracking-wider mb-4">
                {t.donate.scanQrLabel}
              </div>

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
*/
