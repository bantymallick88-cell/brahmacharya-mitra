import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Calendar, 
  Dumbbell, 
  Shield, 
  Sparkles, 
  Flame, 
  Sun, 
  Moon 
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface RebootRoadmap {
  id: '30' | '60' | '100';
  title: string;
  hindiTitle: string;
  duration: string;
  level: string;
  accent: string;
  borderAccent: string;
  overview: string;
  keyPhases: {
    days: string;
    phaseTitle: string;
    focus: string;
    strategy: string;
  }[];
  dayMilestones: {
    day: number;
    title: string;
    mantra: string;
    tasks: {
      morning: string;
      physical: string;
      mental: string;
      night: string;
    };
  }[];
}

const COURSES: RebootRoadmap[] = [
  {
    id: '30',
    title: '30-Day Beginner Reboot & Dopamine Detox',
    hindiTitle: '३० दिवसीय आरंभिक शोधन एवं विषहरण',
    duration: '30 Days',
    level: 'Beginner / First Step',
    accent: 'from-amber-400 via-amber-500 to-amber-600',
    borderAccent: 'border-amber-500/30',
    overview: 'The first 30 days are purely about physical and neurochemical damage control. The craving peaks between Days 3–7 and emotional flatline hits between Days 10–20.',
    keyPhases: [
      {
        days: 'Days 1 - 7',
        phaseTitle: 'The Crucible of Fire (अग्नि परीक्षा)',
        focus: 'Physical detox, severe dopamine withdrawals, urges.',
        strategy: 'No phone in bedroom after 9 PM. Freezing cold showers immediately upon waking.'
      },
      {
        days: 'Days 8 - 18',
        phaseTitle: 'The Flatline Valley (शून्य काल)',
        focus: 'Low libido, feelings of emptiness, brain trickery.',
        strategy: 'Do not test erections! Understand that flatline is neuroreceptors healing.'
      },
      {
        days: 'Days 19 - 30',
        phaseTitle: 'Dawn of Prefrontal Clarity (चित्त शुद्धि)',
        focus: 'Mental fog starts dissipating, eye contact strengthens.',
        strategy: 'Channel new morning energy into 30 minutes of deep study or calisthenics.'
      }
    ],
    dayMilestones: [
      {
        day: 1,
        title: 'Day 1: The Sacred Sankalpa & Device Purge',
        mantra: 'ॐ सं कल्पाय नमः | आज से मेरी ऊर्जा केवल निर्माण में लगेगी।',
        tasks: {
          morning: 'Wake before 6:00 AM, drink 1 liter of warm copper water, write your why in a journal.',
          physical: 'Drop and complete 20 crisp push-ups and 20 bodyweight squats.',
          mental: 'Delete all adult accounts, bookmark folders, and trigger subreddits/Instagram triggers.',
          night: 'Plug phone to charge in living room. Sleep with window open.'
        }
      },
      {
        day: 3,
        title: 'Day 3: The First Craving Shockwave',
        mantra: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियम् |',
        tasks: {
          morning: 'Ice cold shower for minimum 90 seconds. Notice mind going quiet instantly.',
          physical: 'Run 2 kilometers or perform 12 rounds of Surya Namaskar.',
          mental: 'When sexual flashback occurs, label it: "This is just cheap dopamine dying, not me."',
          night: '5 minutes of Anulom Vilom before bed. Read 5 pages of Swami Sivananda.'
        }
      },
      {
        day: 7,
        title: 'Day 7: The Testosterone Rebound Peak',
        mantra: 'अहं वीर्यवान् अस्मि | मेरी शक्ति मेरा गौरव है।',
        tasks: {
          morning: 'Notice androgen sensitivity peaking. Clean your room thoroughly.',
          physical: 'Heavy compound lift or intense bodyweight training. Transmute the spike.',
          mental: 'Beware of the "Just a quick peek" illusion. Peek is a relapse in disguise.',
          night: 'Reflect on 1 week clean: You preserved ~280 drops of vital energy!'
        }
      },
      {
        day: 14,
        title: 'Day 14: Navigating The Flatline',
        mantra: 'शान्तं शिवं अद्वैतम् |',
        tasks: {
          morning: '15 minutes of Pranayama (Kapalabhati + Mula Bandha root lock).',
          physical: 'Long brisk outdoor walk in sunlight for natural serotonin synthesis.',
          mental: 'Accept the temporary emotional numbness as brain tissue rebuilding.',
          night: 'Drink warm turmeric milk with crushed almonds. Screen off by 9:30 PM.'
        }
      },
      {
        day: 30,
        title: 'Day 30: The First Major Shield Unlocked',
        mantra: 'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत |',
        tasks: {
          morning: 'Celebrate 1 month milestone. Notice natural brightness in eye sclera.',
          physical: 'Perform your personal best workout. Notice strength endurance jump.',
          mental: 'Review your initial journal entry. Feel pride in your newly restored self-respect.',
          night: 'Dedicate the merit to Lord Hanuman. Commit to the next 60-Day Phase.'
        }
      }
    ]
  },
  {
    id: '60',
    title: '60-Day Habit Rewiring & Subconscious Reprogramming',
    hindiTitle: '६० दिवसीय स्वभाव परिवर्तन एवं संस्कार शुद्धि',
    duration: '60 Days',
    level: 'Intermediate / Warrior',
    accent: 'from-amber-400 via-amber-500 to-amber-600',
    borderAccent: 'border-amber-500/40',
    overview: 'At 60 days, physical abstinence transforms into permanent lifestyle architecture. You replace the porn void with intense creative productivity, high testosterone, and authentic social magnetism.',
    keyPhases: [
      {
        days: 'Days 31 - 45',
        phaseTitle: 'Social Magnetism Awakening (तेजस संचय)',
        focus: 'Deeper voice pitch, effortless charisma, no social stutter.',
        strategy: 'Practice looking people squarely in the eye. Hold physical upright posture.'
      },
      {
        days: 'Days 46 - 60',
        phaseTitle: 'Subconscious Repatterning (संस्कार परिशोधन)',
        focus: 'Eliminating subconscious lust in dreams and spontaneous thoughts.',
        strategy: 'Evening Swadhyaya (sacred reading) and Ashwini Mudra before sleep.'
      }
    ],
    dayMilestones: [
      {
        day: 40,
        title: 'Day 40: The Voice & Posture Shift',
        mantra: 'ॐ तेजस्विनावधीतमस्तु |',
        tasks: {
          morning: 'Brahma Muhurta wake-up (5:15 AM). Jala Neti or cold face immersion.',
          physical: 'Vocal cord humming + heavy back and trap workouts for upright posture.',
          mental: 'Watch how colleagues respond to your calm, grounded vocal resonance.',
          night: 'Meditation on Ajna chakra with silent Om recitation.'
        }
      },
      {
        day: 60,
        title: 'Day 60: Two Months of Transmutation',
        mantra: 'जितेन्द्रियस्य धीरस्य सर्वं जगत् वशे भवति |',
        tasks: {
          morning: 'Look in mirror: dark circles faded, prefrontal cortex laser sharp.',
          physical: '60 push-ups in single unbroken set or 5K continuous run.',
          mental: 'Notice how triggers that used to destroy you now seem completely ridiculous.',
          night: 'Prepare to enter the highest spiritual tier: 100-Day Ojas Transmutation.'
        }
      }
    ]
  },
  {
    id: '100',
    title: '100-Day Ojas & Transmutation Mastery (Urdhva Retas)',
    hindiTitle: '१०० दिवसीय ऊर्ध्वरेता एवं ओजस सिद्धि',
    duration: '100 Days',
    level: 'Advanced / Mahayogi',
    accent: 'from-yellow-300 via-amber-400 to-amber-600',
    borderAccent: 'border-amber-400/50',
    overview: 'The pinnacle of Vedic celibacy. Semen is no longer just stored; it is converted into subtle spiritual energy called Ojas, which fuels the brain (Medha Shakti), spiritual intuition, and indomitable courage.',
    keyPhases: [
      {
        days: 'Days 61 - 80',
        phaseTitle: 'The Alchemical Ascendance (ऊर्जा उत्थान)',
        focus: 'Channeling raw libido into career execution and intellectual mastery.',
        strategy: 'Use 4-hour morning deep work blocks without any digital interruption.'
      },
      {
        days: 'Days 81 - 100',
        phaseTitle: 'Akhand Brahmacharya (अखंड ओजस्वी जीवन)',
        focus: 'Attaining the state of Urdhva Retas — master of all ten senses.',
        strategy: 'Daily meditation, seva for other struggling youth, complete spiritual grounding.'
      }
    ],
    dayMilestones: [
      {
        day: 75,
        title: 'Day 75: Creative Explosion & Business Execution',
        mantra: 'ॐ ह्रीं श्रीं क्लीं |',
        tasks: {
          morning: 'Awaken with effortless vitality. 20 minutes Vipassana or breath awareness.',
          physical: 'Power athletics or martial arts training. Feeling boundless stamina.',
          mental: 'Dedicate 3 uninterrupted hours to your life mission or high-income skill.',
          night: 'Gratitude prayer to Lord Shiva and Hanuman Ji for breaking your chains.'
        }
      },
      {
        day: 100,
        title: 'Day 100: The Sovereign Ascendance (शतायु ओजस)',
        mantra: 'ॐ नमो भगवते महाबलाय वीर्यवते स्वाहा |',
        tasks: {
          morning: 'You are now an Urdhva Retas Sadhak. You have conquered modern culture’s greatest trap.',
          physical: 'Grand 108 Surya Namaskar challenge or full spiritual fast.',
          mental: 'Write a letter to yourself on Day 1. Share your wisdom with a struggling brother.',
          night: 'Lifelong Vow: You will never be a slave to pixels on a glass screen again.'
        }
      }
    ]
  }
];

export default function RebootCourses() {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState<'30' | '60' | '100'>('30');
  const course = COURSES.find(c => c.id === selectedCourse) || COURSES[0];
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const activeMilestone = course.dayMilestones[activeDayIndex] || course.dayMilestones[0];

  return (
    <section id="courses" className="py-20 relative">
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
            <Compass className="w-4 h-4 text-amber-400" />
            {t.courses.badge}
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight text-balance break-words">
            {t.courses.title}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text">
              {t.courses.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 text-balance break-words">
            {t.courses.subtitle}
          </p>
        </motion.div>

        {/* Course Tier Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 w-full">
          {COURSES.map((c) => {
            const isSelected = selectedCourse === c.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCourse(c.id);
                  setActiveDayIndex(0);
                }}
                className={`btn-shimmer px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 sm:gap-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 shadow-[0_0_25px_rgba(245,158,11,0.35)] scale-105'
                    : 'bg-zinc-950/70 border border-zinc-800/80 text-zinc-300 hover:text-white hover:border-amber-500/40'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? 'fill-black' : 'text-amber-400'}`} />
                <span>{c.duration} {t.courses.dayRoadmap}</span>
                <span className={`text-[10px] sm:text-[11px] px-1.5 sm:px-2 py-0.5 rounded-full ${isSelected ? 'bg-black/20 text-black font-extrabold' : 'bg-zinc-900 text-zinc-400'}`}>
                  {c.level}
                </span>
              </button>
            );
          })}
        </div>

        {/* Course Content Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Course Overview & Key Phases (5 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className={`p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all duration-500 shadow-xl`}>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-1">
                {course.level}
              </div>
              <h3 className="text-2xl font-bold font-cinzel text-white">
                {course.title}
              </h3>
              <div className="text-xs font-sanskrit text-amber-300/90 mt-0.5">
                {course.hindiTitle}
              </div>
              <p className="mt-3 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {course.overview}
              </p>

              {/* Key Phases Accordion/Cards */}
              <div className="mt-6 space-y-3">
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  {t.courses.programPhases}
                </div>
                {course.keyPhases.map((phase, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-all">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                      <span>{phase.days}</span>
                      <span className="text-zinc-200">{phase.phaseTitle}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      <strong>Focus:</strong> {phase.focus}
                    </div>
                    <div className="text-[11px] text-amber-200/90 mt-1">
                      <strong>Strategy:</strong> {phase.strategy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Day-by-Day Milestone Inspector (7 Cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-5"
          >
            
            {/* Day Milestone Selector Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <span className="text-xs font-bold text-zinc-400 shrink-0 mr-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> {t.courses.milestoneDays}
              </span>
              {course.dayMilestones.map((m, idx) => {
                const isActive = activeDayIndex === idx;
                return (
                  <button
                    key={m.day}
                    onClick={() => setActiveDayIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.35)] scale-105' 
                        : 'bg-zinc-950/80 border border-zinc-800 text-zinc-300 hover:border-amber-500/40'
                    }`}
                  >
                    Day {m.day}
                  </button>
                );
              })}
            </div>

            {/* Active Day Task Dashboard */}
            <div className="p-6 sm:p-7 rounded-3xl backdrop-blur-3xl bg-zinc-950/70 border border-amber-500/25 hover:border-amber-400/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] relative shadow-2xl transition-all duration-500">
              
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 mb-5">
                <div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Day {activeMilestone.day} Protocol
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black font-cinzel text-white mt-2">
                    {activeMilestone.title}
                  </h4>
                </div>
              </div>

              {/* Vedic Mantra of the Day */}
              <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 mb-5 flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <div className="text-xs font-sanskrit text-amber-200 font-medium">
                  <strong className="text-amber-300">{t.courses.dailyMantra}</strong> {activeMilestone.mantra}
                </div>
              </div>

              {/* 4 Core Pillars of Daily Execution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Morning Habit */}
                <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>{t.courses.morningPillar}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeMilestone.tasks.morning}
                  </p>
                </div>

                {/* Physical Transmutation */}
                <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                    <Dumbbell className="w-4 h-4 text-amber-300" />
                    <span>{t.courses.physicalPillar}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeMilestone.tasks.physical}
                  </p>
                </div>

                {/* Mental Shield */}
                <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50 hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-bold text-yellow-300 mb-1">
                    <Shield className="w-4 h-4 text-yellow-300" />
                    <span>{t.courses.mentalPillar}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeMilestone.tasks.mental}
                  </p>
                </div>

                {/* Night Curfew */}
                <div className="p-4 rounded-2xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-violet-400/50 hover:shadow-[0_0_25px_rgba(109,40,217,0.15)] transition-all duration-300 glass-card-lift">
                  <div className="flex items-center gap-2 text-xs font-bold text-violet-400 mb-1">
                    <Moon className="w-4 h-4 text-violet-400" />
                    <span>{t.courses.nightPillar}</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeMilestone.tasks.night}
                  </p>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
                <span>{t.courses.microTaskCheck}</span>
                <span className="text-amber-400 font-semibold">{t.courses.freeBadge}</span>
              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
