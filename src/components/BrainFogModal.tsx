import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  X, 
  AlertCircle, 
  TrendingUp,
  RefreshCw,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

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

export default function BrainFogModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<string, number>>({
    morning_fog: 2,
    verbal_fluency: 2,
    focus_span: 1,
    social_eye_contact: 2,
    dopamine_flatness: 1,
  });

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-brainfog-modal', handleOpen);
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-brainfog-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl overflow-y-auto">
          {/* Backdrop click to close */}
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-3xl rounded-3xl border-2 border-amber-500/50 bg-[#05050c]/98 p-5 sm:p-7 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_rgba(245,158,11,0.25)] relative z-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Top Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-amber-400 transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-left mb-6 pr-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                <span>Diagnostic Quiz</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel text-white">
                Porn-Induced Brain Fog & Mental Clarity Tracker
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Evaluate prefrontal cortex hypofrontality, memory latency & dopamine desensitization.
              </p>
            </div>

            {/* Live Score Meter */}
            <div className={`p-4 rounded-2xl border ${status.badgeBg} mb-6 flex flex-col sm:flex-row items-center justify-between gap-4`}>
              <div>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                  Current Clarity Index
                </span>
                <span className={`text-xl sm:text-2xl font-black ${status.color}`}>
                  {clarityPercentage}% Cognitive Power
                </span>
                <p className="text-xs text-zinc-300 mt-1">
                  {status.level}
                </p>
              </div>

              <div className="text-xs text-right hidden sm:block max-w-xs">
                <span className="font-bold text-amber-300">Prescription:</span>
                <p className="text-zinc-400 text-[11px] mt-0.5">{status.action}</p>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-5 text-left mb-6">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2.5">
                  <h4 className="text-xs sm:text-sm font-bold text-white">
                    {q.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400">
                    {q.subtitle}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isSelected = answers[q.id] === opt.score;
                      return (
                        <button
                          key={opt.score}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}
                          className={`p-2.5 rounded-xl border text-left text-xs font-medium transition cursor-pointer flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                              : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                          }`}
                        >
                          <span className="text-[11px] leading-snug">{opt.label}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Analysis & Timeline Summary */}
            <div className="p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800 text-left space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                Biological Recovery Timeline
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {status.summary}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="font-bold text-amber-400 block">Day 1 - 7:</span>
                  <span className="text-zinc-400">Acute dopamine cravings peak, initial fog breaks.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="font-bold text-amber-300 block">Day 14 - 30:</span>
                  <span className="text-zinc-400">D2 receptors resensitize, memory recall sharpens.</span>
                </div>
                <div className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="font-bold text-emerald-400 block">Day 60 - 90:</span>
                  <span className="text-zinc-400">DeltaFosB clearance complete. Laser flow state returns.</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.4)] transition cursor-pointer"
            >
              Done / Close Diagnostic
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
