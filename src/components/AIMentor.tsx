import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Target, 
  Clock, 
  Sun, 
  Moon, 
  Dumbbell, 
  ShieldAlert, 
  Copy, 
  Check, 
  RefreshCw,
  Flame
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface RoutinePlan {
  title: string;
  sanskritAffirmation: string;
  morningProtocol: string[];
  physicalTransmutation: string[];
  focusWorkStrategy: string[];
  eveningDetox: string[];
  nightCurfew: string[];
  emergencyKillswitch: string;
}

export default function AIMentor() {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goal, setGoal] = useState<'beginner' | 'intermediate' | 'sadhana'>('beginner');
  const [trigger, setTrigger] = useState<'latenight' | 'boredom' | 'stress' | 'bed_morning'>('latenight');
  const [schedule, setSchedule] = useState<'student' | 'it_tech' | 'govt_aspirant' | 'entrepreneur'>('student');
  const [copied, setCopied] = useState(false);
  const [generatedRoutine, setGeneratedRoutine] = useState<RoutinePlan | null>(null);

  const generatePlan = () => {
    let title = "Sattvic Warrior Transmutation Routine";
    let affirmation = "ॐ तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्";
    
    const morning: string[] = [
      "05:00 AM: Wake up in Brahma Muhurta. Splash freezing water onto eyes and face.",
      "05:15 AM: Drink 750ml warm water with soaked almonds / munakka.",
      "05:30 AM: 20 Minutes Pranayama: Anulom Vilom (10 min) + Mula Bandha / Ashwini Mudra (10 min) to pull prana upwards."
    ];

    const physical: string[] = [];
    const focus: string[] = [];
    const evening: string[] = [];
    const night: string[] = [];
    let killswitch = "";

    if (goal === 'beginner') {
      title = "Phase 1: 30-Day Emergency Shield & Dopamine Reset";
      affirmation = "अहं जितेन्द्रियोऽस्मि | मैं अपनी इंद्रियों का स्वामी हूँ।";
      physical.push("06:00 AM: 100 Bodyweight Squats, 40 Push-ups, and Surya Namaskar (6 cycles).");
    } else if (goal === 'intermediate') {
      title = "Phase 2: 60-Day Pranic Energy Transmutation Blueprint";
      affirmation = "तेजस्वी नवधीतमस्तु मा विद्विषावहै |";
      physical.push("06:00 AM: Intense 45-min Gym session / Calisthenics with heavy compound movements (Deadlift/Squats).");
    } else {
      title = "Phase 3: 100-Day Akhand Brahmacharya & Urdhva Retas Sadhana";
      affirmation = "ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत |";
      physical.push("05:45 AM: Asanas for energy sublimation: Shirshasana (Headstand) or Sarvangasana + Nauli Kriya.");
    }

    if (schedule === 'student') {
      focus.push("08:00 AM - 12:00 PM: Deep Study Sprint. Phone kept in another room with airplane mode.");
      focus.push("02:00 PM - 05:00 PM: Active library/classroom study. Avoid isolating in hostel room.");
    } else if (schedule === 'it_tech') {
      focus.push("09:00 AM - 01:00 PM: Deep Coding / Technical Sprint. Use 50m work / 10m walking intervals.");
      focus.push("Blue light filter enabled on all screens. Stand up every 45 mins to prevent blood pooling in pelvic basin.");
    } else if (schedule === 'govt_aspirant') {
      focus.push("07:30 AM - 01:30 PM: High-intensity syllabus mastery. Zero social media apps installed.");
      focus.push("03:00 PM - 07:00 PM: Answer writing and mock tests. Mind is clear from brain fog.");
    } else {
      focus.push("08:30 AM - 02:00 PM: High-leverage revenue tasks & deep client strategy.");
      focus.push("Direct sexual libido into relentless entrepreneurial execution.");
    }

    evening.push("06:30 PM: Outdoor jog or brisk walk in natural air to clear mental residue.");
    evening.push("07:30 PM: Light Sattvic dinner (no spicy, overly fried, or tamasic garlic-heavy food).");

    if (trigger === 'latenight') {
      night.push("09:30 PM: HARD DIGITAL CURFEW. Smartphone charging in living room or kitchen.");
      night.push("10:00 PM: 10 pages reading of Swami Vivekananda or Bhagavad Gita under warm lamp.");
      night.push("10:30 PM: Sleep on your back or right side. Never sleep on your stomach.");
      killswitch = "If an urge strikes in bed: Jump out of bed IMMEDIATELY. Do not negotiate. Do 25 pushups on the cold floor and sleep without phone.";
    } else if (trigger === 'boredom') {
      night.push("09:30 PM: Schedule tomorrow’s hour-by-hour calendar before bed so no idle gaps exist.");
      night.push("10:15 PM: Journal 3 victories of the day. Screen blackout.");
      killswitch = "When boredom urge hits: Call an accountability partner or step out for a 15-minute walk outside.";
    } else if (trigger === 'stress') {
      night.push("09:45 PM: 5-minute cold foot wash + relaxing Bhramari Pranayama to silence anxiety.");
      night.push("10:15 PM: Write your worries on paper and burn or close the book.");
      killswitch = "When stress urges you to seek dopamine: Take 10 deep belly breaths. Tell yourself: 'Masturbation will not solve this problem, it will only make me weak.'";
    } else {
      night.push("10:00 PM: Sleep on clean bedsheets. Do not stay in bed after waking.");
      night.push("Morning Rule: The very second eyes open, feet MUST hit the floor within 5 seconds.");
      killswitch = "Morning urge killswitch: Jump straight into the shower with freezing cold water. Wash testicles and perineum.";
    }

    setGeneratedRoutine({
      title,
      sanskritAffirmation: affirmation,
      morningProtocol: morning,
      physicalTransmutation: physical,
      focusWorkStrategy: focus,
      eveningDetox: evening,
      nightCurfew: night,
      emergencyKillswitch: killswitch
    });
  };

  const copyToClipboard = () => {
    if (!generatedRoutine) return;
    const text = `
🔱 ${generatedRoutine.title} 🔱
Mantra: ${generatedRoutine.sanskritAffirmation}

☀️ MORNING PROTOCOL:
${generatedRoutine.morningProtocol.map(s => `- ${s}`).join('\n')}

🏋️ PHYSICAL TRANSMUTATION:
${generatedRoutine.physicalTransmutation.map(s => `- ${s}`).join('\n')}

🧠 DEEP FOCUS & WORK:
${generatedRoutine.focusWorkStrategy.map(s => `- ${s}`).join('\n')}

🌆 EVENING & NIGHT DETOX:
${generatedRoutine.eveningDetox.map(s => `- ${s}`).join('\n')}
${generatedRoutine.nightCurfew.map(s => `- ${s}`).join('\n')}

🚨 EMERGENCY KILLSWITCH:
${generatedRoutine.emergencyKillswitch}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="ai-mentor" className="py-20 relative">
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
            <Sparkles className="w-4 h-4 text-amber-400" />
            {t.aiMentor.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            {t.aiMentor.title}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              {t.aiMentor.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            {t.aiMentor.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Quiz Wizard (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 shadow-2xl space-y-6"
          >
            
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {t.aiMentor.stepOf.replace('{step}', String(step))}
              </span>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-7 h-1.5 rounded-full transition-all duration-300 ${
                      step >= s ? 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Step 1: Goal */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-amber-400" />
                    {t.aiMentor.step1Title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {t.aiMentor.step1Subtitle}
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'beginner', title: 'Beginner: Break 7-14 Day Relapse Cycle', desc: 'Overcome physical cravings, brain fog, and chronic urges.' },
                    { id: 'intermediate', title: 'Warrior: 30-60 Day Habit Transformation', desc: 'Rewire subconscious mind, deepen voice, and channel into gym & career.' },
                    { id: 'sadhana', title: 'Deep Sadhak: 100+ Day Urdhva Retas', desc: 'Awaken Kundalini, supreme Medha Shakti, and complete sense mastery.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id as any)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                        goal === item.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                          : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-amber-500/40 hover:bg-zinc-900/60'
                      }`}
                    >
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-shimmer w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:scale-[1.02] transition cursor-pointer"
                >
                  {t.aiMentor.continueTriggerBtn}
                </button>
              </div>
            )}

            {/* Step 2: Primary Vulnerability / Trigger */}
            {step === 2 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    {t.aiMentor.step2Title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {t.aiMentor.step2Subtitle}
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'latenight', title: 'Late Night Bed Scrolling (11 PM - 2 AM)', desc: 'Alone in bedroom with smartphone and low willpower.' },
                    { id: 'boredom', title: 'Afternoon Loneliness & Aimless Boredom', desc: 'Empty schedule leading to compulsive dopamine seeking.' },
                    { id: 'stress', title: 'Academic / Job Stress & Performance Anxiety', desc: 'Using masturbation as an escape from harsh reality.' },
                    { id: 'bed_morning', title: 'Lying in Bed Post-Awakening (Morning Wood)', desc: 'Lingering under the blanket after waking up.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTrigger(item.id as any)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                        trigger === item.id
                          ? 'bg-red-950/60 border-red-500 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.25)]'
                          : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs transition"
                  >
                    {t.aiMentor.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-shimmer w-2/3 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition cursor-pointer"
                  >
                    {t.aiMentor.continueScheduleBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    {t.aiMentor.step3Title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {t.aiMentor.step3Subtitle}
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'student', title: 'College / School Student', desc: 'Hostel or home, classes, semester exams, peer distractions.' },
                    { id: 'it_tech', title: 'Software Engineer / Desk Professional', desc: '8-10 hours in front of screens, sedentary pelvic posture.' },
                    { id: 'govt_aspirant', title: 'Competitive Exam Aspirant (UPSC / NEET / JEE)', desc: '10-12 hours solitary study, high pressure, long isolation.' },
                    { id: 'entrepreneur', title: 'Builder / Entrepreneur / Freelancer', desc: 'Flexible hours, requires supreme creative drive and stamina.' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSchedule(item.id as any)}
                      className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${
                        schedule === item.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                          : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-300 hover:border-zinc-750 hover:border-amber-500/30'
                      }`}
                    >
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-zinc-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-1/3 py-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs transition"
                  >
                    {t.aiMentor.backBtn}
                  </button>
                  <button
                    type="button"
                    onClick={generatePlan}
                    className="btn-shimmer w-2/3 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 fill-black" />
                    {t.aiMentor.generateBtn}
                  </button>
                </div>
              </div>
            )}

          </motion.div>

          {/* Output Dashboard (7 Cols) */}
          <div className="lg:col-span-7">
            {generatedRoutine ? (
              <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 shadow-2xl hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] relative animate-in fade-in space-y-5 transition-all duration-500">
                
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
                  <div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      {t.aiMentor.customBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black font-cinzel text-white mt-1.5">
                      {generatedRoutine.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 text-xs font-semibold text-zinc-200 transition cursor-pointer shadow-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t.aiMentor.copiedBtn}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-400" />
                          <span>{t.aiMentor.copyBtn}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setStep(1)}
                      className="p-1.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white transition"
                      title="Regenerate"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mantra Affirmation Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-950/25 border border-amber-500/30 flex items-center gap-2.5 shadow-md">
                  <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="text-xs font-sanskrit text-amber-300">
                    <strong>{t.aiMentor.dailyMantra}</strong> {generatedRoutine.sanskritAffirmation}
                  </div>
                </div>

                {/* Routine Sections Grid */}
                <div className="space-y-3 text-xs">
                  
                  {/* Morning */}
                  <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 transition">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5 mb-1.5">
                      <Sun className="w-4 h-4 text-amber-400" />
                      {t.aiMentor.morningBlock}
                    </div>
                    <ul className="space-y-1 text-zinc-300">
                      {generatedRoutine.morningProtocol.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Physical Transmutation */}
                  <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 transition">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1.5">
                      <Dumbbell className="w-4 h-4 text-amber-300" />
                      {t.aiMentor.physicalBlock}
                    </div>
                    <ul className="space-y-1 text-zinc-300">
                      {generatedRoutine.physicalTransmutation.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Focus & Deep Work */}
                  <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/40 transition">
                    <div className="font-bold text-yellow-300 flex items-center gap-1.5 mb-1.5">
                      <Clock className="w-4 h-4 text-yellow-300" />
                      {t.aiMentor.focusBlock}
                    </div>
                    <ul className="space-y-1 text-zinc-300">
                      {generatedRoutine.focusWorkStrategy.map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-yellow-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Evening & Night */}
                  <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-violet-400/40 transition">
                    <div className="font-bold text-violet-400 flex items-center gap-1.5 mb-1.5">
                      <Moon className="w-4 h-4 text-violet-400" />
                      {t.aiMentor.nightBlock}
                    </div>
                    <ul className="space-y-1 text-zinc-300">
                      {[...generatedRoutine.eveningDetox, ...generatedRoutine.nightCurfew].map((pt, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-violet-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Emergency Trigger Killswitch */}
                  <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-200 shadow-md">
                    <div className="font-bold text-red-400 flex items-center gap-1.5 mb-1">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      {t.aiMentor.killswitchBlock}
                    </div>
                    <p className="text-xs leading-relaxed text-zinc-200">
                      {generatedRoutine.emergencyKillswitch}
                    </p>
                  </div>

                </div>

              </div>
            ) : (
              /* Placeholder State Before Generation */
              <div className="p-10 rounded-3xl backdrop-blur-2xl bg-zinc-950/60 border border-dashed border-amber-500/20 text-center flex flex-col items-center justify-center min-h-[420px] shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 animate-pulse shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-cinzel text-white">
                  {t.aiMentor.placeholderTitle}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-sm">
                  {t.aiMentor.placeholderDesc}
                </p>
                <button
                  type="button"
                  onClick={generatePlan}
                  className="btn-shimmer mt-6 px-6 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                >
                  {t.aiMentor.quickDefaultBtn}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
