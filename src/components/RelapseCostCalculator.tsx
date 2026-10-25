import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  Clock, 
  AlertTriangle, 
  Droplets, 
  IndianRupee, 
  HeartCrack, 
  ArrowRight,
  Activity
} from 'lucide-react';
import { useTranslation } from '../i18n';

export default function RelapseCostCalculator() {
  const { t } = useTranslation();
  const [years, setYears] = useState(7);
  const [dailyHours, setDailyHours] = useState(2.5);
  const [monthlySpend, setMonthlySpend] = useState(800);

  // Mathematical Calculations
  const totalDays = years * 365.25;
  const totalHoursWasted = Math.round(totalDays * dailyHours);
  const fullWakingYearsWasted = (totalHoursWasted / (16 * 365.25)).toFixed(2);

  // Direct Financial Spend
  const directFinancialLoss = years * 12 * monthlySpend;
  
  // Opportunity Cost
  const opportunityCost = Math.round(totalHoursWasted * 220);
  const totalEconomicLoss = directFinancialLoss + opportunityCost;

  // Veerya loss approximation
  const estimatedDischarges = Math.round(years * 52 * 4.2);
  const estimatedVeeryaDrops = estimatedDischarges * 40;

  return (
    <section id="calculator" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(239,68,68,0.25)] animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            {t.calculator.badge}
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance break-words">
            {t.calculator.title}{' '}
            <span className="bg-gradient-to-r from-red-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent metallic-gold-text">
              {t.calculator.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 text-balance break-words">
            {t.calculator.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full">
          
          {/* Left Column: Interactive Sliders (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-4 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 space-y-5 sm:space-y-6 shadow-2xl w-full"
          >
            <h3 className="text-base sm:text-lg font-bold font-cinzel text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              {t.calculator.paramsTitle}
            </h3>

            {/* Slider 1: Years */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-300">{t.calculator.addictionDuration}</span>
                <span className="text-amber-400 font-cinzel text-lg font-bold">{years} {t.calculator.yearsUnit}</span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-zinc-900 border border-zinc-800 accent-amber-400 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-zinc-400">
                <span>1 {t.calculator.yearsUnit}</span>
                <span>10 {t.calculator.yearsUnit}</span>
                <span>20 {t.calculator.yearsUnit}</span>
              </div>
            </div>

            {/* Slider 2: Daily Hours Wasted */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-300">{t.calculator.wastedTime}</span>
                <span className="text-amber-300 font-cinzel text-lg font-bold">{dailyHours} {t.calculator.hoursPerDayUnit}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={dailyHours}
                onChange={(e) => setDailyHours(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-zinc-900 border border-zinc-800 accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                {t.calculator.hoursPerDayDesc}
              </p>
            </div>

            {/* Slider 3: Monthly Expenses */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-zinc-300">{t.calculator.directSpend}</span>
                <span className="text-emerald-400 font-cinzel text-lg font-bold">₹{monthlySpend}</span>
              </div>
              <input
                type="range"
                min="0"
                max="10000"
                step="200"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full h-2 rounded-lg bg-zinc-900 border border-zinc-800 accent-emerald-400 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                {t.calculator.directSpendDesc}
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800/80">
              <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-xs text-zinc-300 leading-relaxed">
                <strong className="text-red-400">{t.calculator.truthQuote}</strong>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Live Shock Dashboard (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Big Shock Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Lost Waking Life */}
              <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-red-500/30 hover:border-red-400/60 hover:shadow-[0_0_35px_rgba(239,68,68,0.25)] transition-all duration-500 glass-card-lift relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  {t.calculator.youthVanishedTitle}
                </div>
                <div className="text-3xl sm:text-4xl font-black font-cinzel text-white">
                  {totalHoursWasted.toLocaleString()} <span className="text-base font-normal text-zinc-400">{t.calculator.hoursUnit}</span>
                </div>
                <div className="mt-2 text-xs text-zinc-300">
                  {t.calculator.wakingYearsText.replace('{years}', String(fullWakingYearsWasted))}
                </div>
              </div>

              {/* Estimated Veerya Loss */}
              <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-500 glass-card-lift relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  <Droplets className="w-4 h-4" />
                  {t.calculator.veeryaLostTitle}
                </div>
                <div className="text-3xl sm:text-4xl font-black font-cinzel text-white">
                  ~{estimatedDischarges.toLocaleString()} <span className="text-base font-normal text-zinc-400">{t.calculator.dischargesText}</span>
                </div>
                <div className="mt-2 text-xs text-zinc-300">
                  {t.calculator.dropsText.replace('{drops}', estimatedVeeryaDrops.toLocaleString())}
                </div>
              </div>

              {/* Economic Opportunity Loss */}
              <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-emerald-500/30 hover:border-emerald-400/60 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-500 glass-card-lift relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                  <IndianRupee className="w-4 h-4" />
                  {t.calculator.careerLossTitle}
                </div>
                <div className="text-3xl sm:text-4xl font-black font-cinzel text-white">
                  ₹{totalEconomicLoss.toLocaleString()}
                </div>
                <div className="mt-2 text-xs text-zinc-300">
                  {t.calculator.careerLossDesc}
                </div>
              </div>

              {/* Physical Health Breakdown */}
              <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-amber-500/30 hover:border-amber-400/60 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-500 glass-card-lift relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                  <Activity className="w-4 h-4" />
                  {t.calculator.nervousDamageTitle}
                </div>
                <div className="mt-2 text-xs text-zinc-300">
                  {t.calculator.nervousDamageDesc}
                </div>
              </div>

            </div>

            {/* Social & Relationship Reality Check Card */}
            <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-500/40 transition-all duration-500">
              <h4 className="text-sm font-bold text-zinc-200 flex items-center gap-2 mb-2">
                <HeartCrack className="w-4 h-4 text-red-400" />
                {t.calculator.socialDamageTitle}
              </h4>
              <ul className="space-y-1.5 text-xs text-zinc-300 list-disc list-inside">
                <li><strong className="text-zinc-100">{t.calculator.damagePoint1}</strong></li>
                <li><strong className="text-zinc-100">{t.calculator.damagePoint2}</strong></li>
                <li><strong className="text-zinc-100">{t.calculator.damagePoint3}</strong></li>
              </ul>
            </div>

            {/* Urgent Call to Action */}
            <div className="p-6 rounded-2xl backdrop-blur-2xl bg-gradient-to-r from-red-950/50 via-zinc-950/80 to-zinc-950 border border-amber-500/30 hover:border-amber-400/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl transition-all duration-500">
              <div>
                <h4 className="text-base font-bold text-white font-cinzel">
                  {t.calculator.stopLossTitle}
                </h4>
                <p className="text-xs text-zinc-300 mt-0.5">
                  {t.calculator.stopLossDesc}
                </p>
              </div>

              <a
                href="#courses"
                className="btn-shimmer w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-zinc-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <span>{t.calculator.initializeBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
