import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Flame, 
  Sparkles, 
  Shield, 
  ChevronRight
} from 'lucide-react';
import { useTranslation } from '../i18n';

interface Deity {
  id: string;
  name: string;
  hindiName: string;
  archetype: string;
  auraClass: string;
  badgeColor: string;
  borderColor: string;
  iconSymbol: string;
  mantra: string;
  mantraMeaning: string;
  attributes: string[];
  transmutationLesson: string;
  quote: string;
}

const DEITIES: Deity[] = [
  {
    id: 'hanuman',
    name: 'Bhagwan Hanuman Ji',
    hindiName: 'महावीर श्री हनुमान जी',
    archetype: 'Supreme Brahmacharya, Unmatched Physical Prowess & Total Devotion',
    auraClass: 'divine-aura-hanuman',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    borderColor: 'border-amber-500/30 hover:border-amber-400/70',
    iconSymbol: '🔱',
    mantra: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् | वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ||',
    mantraMeaning: 'I take refuge in Lord Hanuman, whose mind moves swift as the wind, who has conquered all senses (Jitendriya), and who is the supreme amongst the wise.',
    attributes: [
      'Ashta Siddhi & Nav Nidhi Owner through Celibacy',
      'Zero Leakage of Prana (Bal Brahmachari)',
      'Sublimation of Lust into Boundless Ram Bhakti',
      'Unconquerable Physical Vitality & Fearlessness'
    ],
    transmutationLesson: 'Hanuman Ji demonstrates that pure Brahmacharya does not make one weak or passive; it generates cosmic physical power, unyielding endurance, and absolute mental invincibility. When lust strikes, chant the Hanuman Chalisa with full vocal roar.',
    quote: 'नासे रोग हरे सब पीरा, जपत निरंतर हनुमत बीरा |'
  },
  {
    id: 'shiva',
    name: 'Mahadev Shiva',
    hindiName: 'देवाधिदेव महादेव शिव',
    archetype: 'Urdhva Retas, Lord of Deep Meditation & Incinerator of Kamadeva',
    auraClass: 'divine-aura-shiva',
    badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
    borderColor: 'border-violet-500/40 hover:border-violet-400/80',
    iconSymbol: '🌙',
    mantra: 'ॐ नमः शिवाय | ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान् मृत्योर्मुक्षीय मामृतात् ||',
    mantraMeaning: 'We worship the Three-Eyed Lord who nourishes all living beings. May He liberate us from death and worldly bondage into immortality.',
    attributes: [
      'Incinerated Kamadeva (God of Lust) with the 3rd Eye',
      'Supreme Urdhva Retas — Prana flowing to Sahasrara',
      'Stillness of Chitta amidst Cosmic Dissolution',
      'Master of Yoga, Tapasya & Breath Retention'
    ],
    transmutationLesson: 'When Kamadeva tried to disturb Shiva’s meditation, Shiva opened His third eye (Viveka — spiritual discrimination) and reduced desire to ashes. Observe sexual desire without reacting, burn it with the fire of witness consciousness (Sakshi Bhav).',
    quote: 'चित्तवृत्तयः निरुद्धाः यस्य स एव शिवः |'
  },
  {
    id: 'parashurama',
    name: 'Bhagwan Parashurama',
    hindiName: 'भगवान परशुराम',
    archetype: 'Akhanda Pratigya, Martial Discipline & Unshakable Warrior Willpower',
    auraClass: 'divine-aura-parashurama',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    borderColor: 'border-red-500/40 hover:border-amber-400/70',
    iconSymbol: '🪓',
    mantra: 'ॐ जामदग्न्याय विद्महे महावीराय धीमहि तन्नः परशुरामः प्रचोदयात् ||',
    mantraMeaning: 'May we know the great sage-warrior son of Jamadagni. May that supreme hero inspire our intellect with fearless resolve.',
    attributes: [
      'Unwavering Oath & Lifelong Vow of Celibacy',
      'Combination of Brahmarshi Intellect & Kshatriya Might',
      'Zero Tolerance for Weakness or Moral Compromise',
      'Chiranjeevi (Immortal) Master of Martial Arts (Kalaripayattu)'
    ],
    transmutationLesson: 'Parashurama represents unyielding resolve. When your mind tempts you to relapse, invoke Parashurama’s battle-axe. Cut the thought at its very root. Do not negotiate with your weakness; conquer it with ruthless martial discipline.',
    quote: 'अखण्डं व्रतं, अविचलः सङ्कल्पः |'
  },
  {
    id: 'ram',
    name: 'Maryada Purushottam Shri Ram',
    hindiName: 'मर्यादा पुरुषोत्तम श्री राम',
    archetype: 'Dharma Incarnate, Mastery of Senses (Indriya Nigraha) & Sacred Dignity',
    auraClass: 'divine-aura-ram',
    badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
    borderColor: 'border-amber-400/40 hover:border-amber-300',
    iconSymbol: '🏹',
    mantra: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः | राजा सर्वस्य लोकस्य देवानामिव वासवः ||',
    mantraMeaning: 'Rama is the embodiment of Dharma, saintly, of righteous valor, sovereign of the worlds as Indra is of the Gods.',
    attributes: [
      'Ek-Patni Vrata — Supreme Model of Moral Purity',
      'Absolute Self-Restraint (Indriya Nigraha)',
      'Unshakable Poise in Palace or Forest Exile',
      'Noble Masculine Grace & Moral Authority'
    ],
    transmutationLesson: 'Shri Ram proves that self-control is the foundation of nobility and true kingship. A man who cannot control his private desires can never lead his family or society. Dignity, honor, and truth begin with conquering the senses.',
    quote: 'धर्मो रक्षति रक्षितः |'
  }
];

export default function DeitiesSection() {
  const { t } = useTranslation();
  const [activeDeityId, setActiveDeityId] = useState('hanuman');
  const activeDeity = DEITIES.find(d => d.id === activeDeityId) || DEITIES[0];

  return (
    <section id="deities" className="py-24 relative overflow-hidden">
      
      {/* Background Ambient Deep Cosmic Purple & Indigo Aura (21st.dev / Godly aesthetic) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[650px] bg-[radial-gradient(circle,rgba(109,40,217,0.22)_0%,rgba(99,102,241,0.18)_40%,rgba(245,158,11,0.12)_70%,transparent_100%)] blur-3xl pointer-events-none -z-10 animate-aura-pulse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
            <Flame className="w-4 h-4 text-amber-400" />
            {t.deities.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight">
            {t.deities.title}{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 bg-clip-text text-transparent metallic-gold-text drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]">
              {t.deities.titleHighlight}
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-300">
            {t.deities.subtitle}
          </p>
        </motion.div>

        {/* 4 Deity Cards Grid with Floating Ambient Aura Pulses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {DEITIES.map((deity) => {
            const isActive = activeDeityId === deity.id;
            return (
              <div
                key={deity.id}
                onClick={() => setActiveDeityId(deity.id)}
                className={`p-5 rounded-3xl backdrop-blur-3xl transition-all duration-500 cursor-pointer relative overflow-hidden flex flex-col justify-between glass-card-lift ${
                  isActive 
                    ? 'border-2 border-amber-400 bg-zinc-950/85 shadow-[0_0_35px_rgba(245,158,11,0.35),0_0_25px_rgba(109,40,217,0.25)] scale-[1.03]' 
                    : 'border border-amber-500/25 hover:border-amber-400/70 bg-zinc-950/70 hover:shadow-[0_0_35px_rgba(245,158,11,0.3)]'
                }`}
              >
                {/* Floating ambient aura pulse behind backdrop card */}
                <div className={`absolute -right-12 -top-12 w-36 h-36 rounded-full ${deity.auraClass} blur-2xl pointer-events-none opacity-80 animate-aura-pulse`} />

                <div className="flex items-center justify-between mb-3 relative z-10">
                  <span className="text-2xl drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]">{deity.iconSymbol}</span>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${deity.badgeColor}`}>
                    {deity.id.toUpperCase()}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-cinzel text-white">
                    {deity.name}
                  </h3>
                  <div className="text-xs font-sanskrit text-amber-300 mt-0.5">
                    {deity.hindiName}
                  </div>
                  <p className="text-xs text-zinc-300 mt-2 line-clamp-2 leading-relaxed">
                    {deity.archetype}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-amber-400 relative z-10">
                  <span>{t.deities.exploreLesson}</span>
                  <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? 'translate-x-1 text-white' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* In-Depth Deity Spotlight Panel */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeDeity.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`relative rounded-3xl p-6 sm:p-10 border border-amber-500/25 hover:border-amber-400/70 backdrop-blur-3xl bg-zinc-950/70 shadow-[0_0_40px_rgba(245,158,11,0.25),0_0_30px_rgba(109,40,217,0.2)] overflow-hidden transition-all duration-500`}
          >
            
            {/* Deity Ambient Aura Glow Effect with Floating Motion */}
            <div className={`absolute top-0 right-0 w-[550px] h-[550px] ${activeDeity.auraClass} rounded-full blur-3xl pointer-events-none -z-10 animate-aura-pulse`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left 7 Columns: Scripture, Mantra & Transmutation Guidance */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeDeity.badgeColor} shadow-md`}>
                    {activeDeity.archetype}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-white">
                    {activeDeity.name}
                  </h3>
                  <div className="text-sm font-sanskrit text-amber-300 mt-0.5">
                    {activeDeity.hindiName}
                  </div>
                </div>

                {/* Authentic Sanskrit Mantra Box */}
                <div className="p-5 rounded-2xl backdrop-blur-2xl bg-zinc-950/85 border border-amber-500/30 shadow-xl">
                  <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    {t.deities.sacredMantra}
                  </div>
                  <div className="text-sm sm:text-base font-sanskrit text-zinc-100 font-medium leading-relaxed">
                    {activeDeity.mantra}
                  </div>
                  <p className="text-xs text-zinc-300 italic mt-2.5 border-t border-zinc-800/80 pt-2.5">
                    &ldquo;{activeDeity.mantraMeaning}&rdquo;
                  </p>
                </div>

                {/* Energy Transmutation Practical Guidance */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    {t.deities.lessonForYouth}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed bg-zinc-950/70 p-4 rounded-2xl border border-zinc-800/80">
                    {activeDeity.transmutationLesson}
                  </p>
                </div>

              </div>

              {/* Right 5 Columns: Core Divine Attributes & Shloka Quote */}
              <div className="lg:col-span-5 space-y-4">
                
                <div className="p-5 rounded-3xl backdrop-blur-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/30 transition-all shadow-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3.5 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-amber-400" />
                    {t.deities.keyVirtues}
                  </h4>

                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    {activeDeity.attributes.map((attr, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shloka Emblem Box */}
                <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/40 via-violet-950/30 to-zinc-950 border border-amber-500/30 text-center shadow-xl">
                  <div className="text-xs text-amber-400 font-bold mb-1">
                    {t.deities.divineQuote}
                  </div>
                  <div className="text-base sm:text-lg font-sanskrit font-bold text-amber-200">
                    {activeDeity.quote}
                  </div>
                </div>

              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
