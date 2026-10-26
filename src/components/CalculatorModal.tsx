import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, 
  X, 
  Clock, 
  AlertTriangle, 
  Droplets, 
  IndianRupee, 
  HeartCrack,
  Activity
} from 'lucide-react';

export default function CalculatorModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [years, setYears] = useState(7);
  const [dailyHours, setDailyHours] = useState(2.5);
  const [monthlySpend, setMonthlySpend] = useState(800);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-calculator-modal', handleOpen);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-calculator-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Mathematical Calculations
  const totalDays = years * 365.25;
  const totalHoursWasted = Math.round(totalDays * dailyHours);
  const fullWakingYearsWasted = (totalHoursWasted / (16 * 365.25)).toFixed(2);
  const directFinancialLoss = years * 12 * monthlySpend;
  const opportunityCost = Math.round(totalHoursWasted * 220);
  const totalEconomicLoss = directFinancialLoss + opportunityCost;
  const estimatedDischarges = Math.round(years * 52 * 4.2);
  const estimatedVeeryaDrops = estimatedDischarges * 40;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl overflow-y-auto">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-3xl rounded-3xl border-2 border-red-500/50 bg-[#05050c]/98 p-5 sm:p-7 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(239,68,68,0.25)] relative z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-red-400 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-left mb-6 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-3.5 h-3.5 text-red-400" />
                <span>Life Vitality Impact</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel text-white">
                Relapse Cost & Vitality Hemorrhage Calculator
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Confront the true mathematical cost of compulsive relapse on your life, wealth, and spiritual essence.
              </p>
            </div>

            {/* Interactive Sliders & Real-Time Losses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              
              {/* Sliders Column */}
              <div className="space-y-4 p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Adjust Addiction Parameters
                </h3>

                {/* Years */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 font-medium">Years Active:</span>
                    <span className="text-amber-400 font-bold">{years} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Daily Hours */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 font-medium">Daily Hours Consumed:</span>
                    <span className="text-amber-400 font-bold">{dailyHours} Hours/Day</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="8"
                    step="0.5"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                {/* Monthly Spend */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-300 font-medium">Monthly Direct Spend (Subscriptions/Data):</span>
                    <span className="text-amber-400 font-bold">₹{monthlySpend}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Cumulative Shock Dashboard */}
              <div className="space-y-3 p-4 rounded-2xl bg-red-950/30 border border-red-500/40">
                <h3 className="text-xs font-bold text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  Irreversible Cumulative Losses
                </h3>

                {/* Hours Wasted */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-red-400" />
                    <span>Pure Waking Life Lost:</span>
                  </div>
                  <div className="text-lg font-black text-white mt-0.5">
                    {totalHoursWasted.toLocaleString()} Hours{' '}
                    <span className="text-xs text-red-400 font-normal">
                      (~{fullWakingYearsWasted} years of 16-hr days)
                    </span>
                  </div>
                </div>

                {/* Economic Loss */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <IndianRupee className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estimated Economic Drain:</span>
                  </div>
                  <div className="text-lg font-black text-amber-300 mt-0.5">
                    ₹{totalEconomicLoss.toLocaleString()}{' '}
                    <span className="text-[10px] text-zinc-400 font-normal">
                      (Direct + Opportunity Cost)
                    </span>
                  </div>
                </div>

                {/* Veerya Dissipation */}
                <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    <span>Veerya / Vital Essence Lost:</span>
                  </div>
                  <div className="text-lg font-black text-blue-300 mt-0.5">
                    ~{estimatedDischarges.toLocaleString()} Ejaculations{' '}
                    <span className="text-[10px] text-zinc-400 font-normal">
                      (={estimatedVeeryaDrops.toLocaleString()} drops of vital ojas)
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Wake-Up Call Message */}
            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-left mt-5 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                The Vedic Wake-Up Call
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                “Every drop of semen saved is forty drops of blood and marrow preserved. The time you lost cannot return, but your future vitality can be 100% reclaimed starting today.”
              </p>
            </div>

            {/* Bottom Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-5 py-3 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(239,68,68,0.4)] transition cursor-pointer"
            >
              Close Calculator & Retain Energy
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
