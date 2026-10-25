import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  AlertCircle, 
  TrendingUp,
  RefreshCw
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: { label: string; score: number }[];
}

const QUESTIONS: Question[] = [
  {
    id: 'morning_fog',
    title: '1. Morning Mental Heaviness & Awakening Gogginess',
    subtitle: 'How does your brain feel within the first 60 minutes after waking up?',
    options: [
      { label: 'Clouded, groggy, needing screen/stimulation to feel alive (Severe Fog)', score: 1 },
      { label: 'Moderate heaviness, takes 1-2 hours to think clearly', score: 2 },
      { label: 'Mild fog, clear after water & a quick splash', score: 3 },
      { label: 'Crystal sharp, energized, ready for deep intellectual work instantly', score: 4 },
    ]
  },
  {
    id: 'verbal_fluency',
    title: '2. Working Memory & Verbal Recall',
    subtitle: 'Do you experience mid-sentence blankness or forgetting common words?',
    options: [
      { label: 'Frequent blank mind, forgetting words, stuttering under slight pressure', score: 1 },
      { label: 'Occasional memory slips, taking long pauses to articulate thoughts', score: 2 },
      { label: 'Mostly coherent with minor cognitive hesitation', score: 3 },
      { label: 'Rapid vocabulary recall, articulate, razor-sharp conversational flow', score: 4 },
    ]
  },
  {
    id: 'focus_span',
    title: '3. Prefrontal Cortex Focus & Deep Work Duration',
    subtitle: 'How long can you study or work continuously on a challenging task without opening tabs/phone?',
    options: [
      { label: 'Less than 10-15 minutes before unbearable restlessness occurs', score: 1 },
      { label: 'Around 25-30 minutes before craving a quick distraction', score: 2 },
      { label: '45 to 60 minutes of consistent focus', score: 3 },
      { label: '90+ minutes of deep, undisturbed flow state (Dhyana)', score: 4 },
    ]
  },
  {
    id: 'social_eye_contact',
    title: '4. Social Presence, Eye Contact & Subconscious Guilt',
    subtitle: 'When speaking to colleagues, strangers, or women, how is your gaze?',
    options: [
      { label: 'Constant eye-aversion, subtle guilt, feeling mentally inferior or exposed', score: 1 },
      { label: 'Can hold eye contact briefly, but feel inner anxiety & fidgeting', score: 2 },
      { label: 'Decent eye contact, comfortable in regular conversations', score: 3 },
      { label: 'Piercing, calm, unwavering eye contact with magnetic masculine dignity', score: 4 },
    ]
  },
  {
    id: 'dopamine_flatness',
    title: '5. Anhedonia & Natural Dopamine Sensitivity',
    subtitle: 'Do simple joys (nature, a good book, sun on skin, sattvic food) feel deeply rewarding?',
    options: [
      { label: 'Emotionally numb, nothing excites me except hyper-stimulants or adult content', score: 1 },
      { label: 'Low enthusiasm for daily life, high baseline boredom', score: 2 },
      { label: 'Moderate enjoyment of everyday moments and hobbies', score: 3 },
      { label: 'Deep Sattvic joy (Prasanna Chitta), heightened appreciation for every breath', score: 4 },
    ]
  }
];

export default function BrainFogTracker() {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<Record<string, number>>({
    morning_fog: 2,
    verbal_fluency: 2,
    focus_span: 1,
    social_eye_contact: 2,
    dopamine_flatness: 1,
  });

  const totalPoints = Object.values(answers).reduce((acc, curr) => acc + curr, 0);
  const maxPoints = QUESTIONS.length * 4;
  const clarityPercentage = Math.round((totalPoints / maxPoints) * 100);

  const getStatus = (pct: number) => {
    if (pct < 45) {
      return {
        level: "Severe Dopamine Desensitization & Hypofrontality",
        color: "text-red-400",
        badgeBg: "bg-red-950/60 border-red-500/50",
        summary: "Your prefrontal cortex dopamine D2 receptors are heavily down-regulated from chronic supernormal stimulation. DeltaFosB buildup is causing brain fog, memory slips, and social withdrawal.",
        action: "Urgent 30-Day Hardcore Retention & Digital Fast required."
      };
    }
    if (pct < 70) {
      return {
        level: "Moderate Brain Fog & Prefrontal Cortex Fatigue",
        color: "text-amber-400",
        badgeBg: "bg-amber-950/60 border-amber-500/50",
        summary: "You are experiencing noticeable cognitive latency. With 14-21 days of semen preservation and cold showers, gray matter density will rebound rapidly.",
        action: "Commit to the 60-Day Habit Rewiring Protocol."
      };
    }
    return {
      level: "Radiant Sattvic Mind & Laser Focus (Ojas Flowing)",
      color: "text-emerald-400",
      badgeBg: "bg-emerald-950/60 border-emerald-500/50",
      summary: "Your neurotransmitters are well-balanced. Sexual energy is transmuting into high-level intellect (Medha Shakti) and unshakeable poise.",
      action: "Maintain daily Pranayama and protect this divine state at all costs."
    };
  };

  const status = getStatus(clarityPercentage);

  return (
    <section id="brain-fog" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Brain className="w-4 h-4 text-amber-400" />
            {t.brainFog.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            {t.brainFog.title}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              {t.brainFog.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            {t.brainFog.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Diagnostic Questions (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            {QUESTIONS.map((q) => (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-5 sm:p-6 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 glass-card-lift shadow-xl"
              >
                <h3 className="text-base font-bold text-white mb-1">
                  {q.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-3.5">
                  {q.subtitle}
                </p>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isSelected = answers[q.id] === opt.score;
                    return (
                      <button
                        key={opt.score}
                        type="button"
                        onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-300 flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                            : 'bg-zinc-950/70 border-zinc-850 border-zinc-800/80 text-zinc-300 hover:border-amber-500/40 hover:bg-zinc-900/60'
                        }`}
                      >
                        <span className="leading-snug">{opt.label}</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 transition-colors ${
                          isSelected ? 'border-amber-400 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'border-zinc-700'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Real-time Clarity Score & Neuro-Roadmap (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Live Score Display Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] text-center relative overflow-hidden shadow-2xl transition-all duration-500"
            >
              
              {/* Subtle Ambient Cosmic Purple & Gold Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[radial-gradient(circle,rgba(109,40,217,0.22)_0%,rgba(99,102,241,0.18)_45%,rgba(245,158,11,0.14)_70%,transparent_100%)] blur-2xl pointer-events-none" />

              <div className="text-xs font-semibold uppercase tracking-widest text-zinc-400 mb-3 relative z-10">
                {t.brainFog.clarityScoreLabel}
              </div>

              {/* Animated Circular Gauge Representation */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center my-4 z-10">
                <svg className="w-full h-full -rotate-90 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#111827"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="url(#clarityGradientGlow)"
                    strokeWidth="8"
                    strokeDasharray={251.3}
                    strokeDashoffset={251.3 - (251.3 * clarityPercentage) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="clarityGradientGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl font-black font-cinzel text-white metallic-gold-text">
                    {clarityPercentage}%
                  </span>
                  <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mt-0.5">
                    {t.brainFog.clarityLevel}
                  </span>
                </div>
              </div>

              {/* Diagnosis Badge */}
              <div className={`p-4 rounded-2xl border ${status.badgeBg} text-left my-4 relative z-10 shadow-lg`}>
                <div className="flex items-center gap-2 mb-1.5">
                  <AlertCircle className={`w-4 h-4 ${status.color} shrink-0`} />
                  <span className={`text-xs font-bold ${status.color}`}>
                    {status.level}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {status.summary}
                </p>
                <div className="mt-2.5 text-[11px] text-amber-300 font-semibold border-t border-zinc-800/80 pt-2 flex items-center gap-1">
                  <span>👉 {t.brainFog.recommendedAction}:</span> 
                  <span className="text-white font-bold">{status.action}</span>
                </div>
              </div>

              {/* Retest Trigger */}
              <button
                type="button"
                onClick={() => setAnswers({
                  morning_fog: 2,
                  verbal_fluency: 2,
                  focus_span: 2,
                  social_eye_contact: 2,
                  dopamine_flatness: 2,
                })}
                className="text-xs text-zinc-400 hover:text-amber-300 inline-flex items-center gap-1.5 transition cursor-pointer relative z-10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                {t.brainFog.resetAssessment}
              </button>
            </motion.div>

            {/* 30-Day Neuro-Restoration Timeline */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-3xl backdrop-blur-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-amber-500/30 transition-all duration-500 shadow-xl"
            >
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-3.5">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                {t.brainFog.timelineTitle}
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition">
                  <div className="font-semibold text-zinc-200 text-xs">
                    {t.brainFog.timeline1Title}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.brainFog.timeline1Desc}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition">
                  <div className="font-semibold text-amber-300 text-xs">
                    {t.brainFog.timeline2Title}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.brainFog.timeline2Desc}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-emerald-500/40 transition">
                  <div className="font-semibold text-emerald-300 text-xs">
                    {t.brainFog.timeline3Title}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    {t.brainFog.timeline3Desc}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
