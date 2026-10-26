// Infinite Ultra-HD Wallpaper & Quote Engine for Brahmacharya Mitra
// Dynamically generates aesthetic wallpapers for Day 1 to Unlimited with scaling motivational intensity

export interface DayWallpaper {
  day: number;
  headline: string;
  subtext: string;
  hindiQuote: string;
  englishQuote: string;
  imageUrl: string;
  accentColor: string;
  author: string;
  theme: string;
  intensityStage: string;
}

// Curated Master Wallpapers for Key Milestones & Early Days
export const CURATED_MILESTONES: Record<number, Omit<DayWallpaper, 'day'>> = {
  1: {
    headline: 'DREAMS REQUIRE SACRIFICES',
    subtext: 'STEP ONE INTO THE FIRE',
    hindiQuote: 'वीर्य रक्षा ही जीवन का असली बल और आत्म-नियंत्रण की कुंजी है।',
    englishQuote: 'The warrior who conquers his lower desire is greater than one who conquers a thousand battles.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Vedic Warrior Creed',
    theme: 'Dark Knight & Steel Resolve',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  2: {
    headline: 'WE ARE WHAT WE FOCUS ON',
    subtext: 'DIRECT YOUR ATTENTION',
    hindiQuote: 'जो अपने मन को जीतता है, वह सारे संसार पर विजय प्राप्त करता है।',
    englishQuote: 'Do not negotiate with a cheap impulse. Command the mind at will.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#a855f7',
    author: 'Marcus Aurelius & Gita',
    theme: 'Cosmic Mental Clarity',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  3: {
    headline: 'INVEST IN YOURSELF',
    subtext: 'WISDOM OVER IMPULSE',
    hindiQuote: 'अपनी ऊर्जा को भटकने न दें, इसे अपने सपनों को सच करने में लगाएं।',
    englishQuote: 'Every drop of life force saved today becomes intellectual genius tomorrow.',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#38bdf8',
    author: 'Ancient Vedic Sages',
    theme: 'Sacred Sanctuary of Knowledge',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  4: {
    headline: 'TRAIN INSANE',
    subtext: 'OR REMAIN THE SAME',
    hindiQuote: 'लोहे जैसा शरीर और वज्र जैसा संकल्प बनाओ।',
    englishQuote: 'Suffer the temporary burn of discipline or suffer the lifelong poison of regret.',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ef4444',
    author: 'Iron Sadhana',
    theme: 'Barbell & Relentless Effort',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  5: {
    headline: 'KEEP MOVING',
    subtext: 'DO NOT LOOK BACK',
    hindiQuote: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।',
    englishQuote: 'When your senses scream for cheap dopamine, take five deep breaths and climb higher.',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Swami Vivekananda',
    theme: 'Dawn Stairs Ascent',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  6: {
    headline: 'BUILD AN EMPIRE',
    subtext: 'CONQUER YOUR SENSES',
    hindiQuote: 'इंद्रियों के गुलाम मत बनो, अपनी चेतना के सम्राट बनो।',
    englishQuote: 'Men who squander their seed rarely achieve monumental greatness.',
    imageUrl: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fbbf24',
    author: 'Chanakya Niti & Gita',
    theme: 'Obsidian City Sovereignty',
    intensityStage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
  },
  7: {
    headline: 'SOAR ABOVE THE STORM',
    subtext: 'ONE FULL WEEK OF PURITY',
    hindiQuote: 'सात दिन की अखंड साधना ने तुम्हारे प्राणों में नई ज्वाला जला दी है।',
    englishQuote: 'One full week clean. The acute dopamine fog has started to clear.',
    imageUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e886?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#60a5fa',
    author: 'Sri Hanuman Stotram',
    theme: 'Supersonic Jet Above Clouds',
    intensityStage: 'Phase 1: Victory (7 Days Pure)',
  },
  8: {
    headline: 'AWAKEN YOUR AURA',
    subtext: 'THE POWER OF URDHVA-RETAS',
    hindiQuote: 'वीर्य जब ऊपर की ओर उठता है, तो वह ओजस में रूपांतरित हो जाता है।',
    englishQuote: 'Transmuted energy radiates through your eyes and magnetizes your presence.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ec4899',
    author: 'Patanjali Yoga Sutras',
    theme: 'Super Saiyan Energy Fire',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  9: {
    headline: 'CONQUER YOUR MIND',
    subtext: 'STILLNESS IS SUPREME STRENGTH',
    hindiQuote: 'मन को मित्र बना लो, अन्यथा वह तुम्हारा सबसे बड़ा शत्रु बन जाएगा।',
    englishQuote: 'Stillness of mind is the supreme fortress against all temptations.',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#8b5cf6',
    author: 'Bhagavad Gita 6.5',
    theme: 'Mountain Peak Meditation',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  10: {
    headline: 'DISCIPLINE EQUALS FREEDOM',
    subtext: 'DOUBLE DIGITS OF VICTORY',
    hindiQuote: 'अनुशासन ही वास्तविक स्वतंत्रता की सीढ़ी है।',
    englishQuote: 'Double digits reached. Your androgen receptors are actively re-sensitizing.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#06b6d4',
    author: 'Vedic Code',
    theme: 'Ocean Lighthouse Storm',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  11: {
    headline: 'THE LION NEVER RETREATS',
    subtext: 'UNSHAKEABLE SELF RESPECT',
    hindiQuote: 'सिंह कभी भेड़ की तरह कमजोर उत्तेजनाओं के पीछे नहीं भागता।',
    englishQuote: 'Walk like a lion on the solitary path of honor and purity.',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Lion Mindset',
    theme: 'Golden Apex Predator',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  12: {
    headline: 'SILENCE YOUR EXCUSES',
    subtext: 'THE FIGHT IS WON WITHIN',
    hindiQuote: 'बहाने बनाना बंद करो, युद्ध बाहर नहीं तुम्हारे भीतर है।',
    englishQuote: 'Every battle against an urge is won in the first five seconds of awareness.',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f97316',
    author: 'Championship Protocol',
    theme: 'Spotlight Boxing Ring',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  13: {
    headline: 'FORGE INNER STEEL',
    subtext: 'TEMPERED IN SOLITUDE',
    hindiQuote: 'एकांत में की गई साधना ही मनुष्य को अजेय बनाती है।',
    englishQuote: 'True character is who you are in private when no one is watching.',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fb923c',
    author: 'Vedic Blacksmith Creed',
    theme: 'Glowing Anvil & Flame',
    intensityStage: 'Phase 2: Agni (Neurochemical Rewiring)',
  },
  14: {
    headline: 'TWO WEEKS REBORN',
    subtext: 'NEUROCHEMICAL CLARITY',
    hindiQuote: 'चौदह दिन की पवित्रता से मस्तिष्क के न्यूरॉन्स पुनर्जीवित हो रहे हैं।',
    englishQuote: 'Fourteen days clean. Testosterone peak stabilized. Brain fog dissolving completely.',
    imageUrl: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Neuroscience of Celibacy',
    theme: 'Radiant Sunrise Dawn',
    intensityStage: 'Phase 2: Agni (2 Weeks Milestone)',
  },
  15: {
    headline: 'RISE LIKE A TITAN',
    subtext: 'STANDING TALL IN THE STORM',
    hindiQuote: 'विपरीत परिस्थितियों में भी पर्वत की तरह अडिग खड़े रहो।',
    englishQuote: 'A titan does not seek comfort; he seeks mastery over his mortal vehicle.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#e11d48',
    author: 'Titan Sadhana',
    theme: 'Electric Aura Surge',
    intensityStage: 'Phase 3: Tejas (Vital Radiance)',
  },
  21: {
    headline: 'HABIT REWIRED',
    subtext: 'OLD CHAINS ARE BROKEN',
    hindiQuote: 'इक्कीस दिन में पुराने संस्कार मिटकर नए दिव्य संस्कारों का जन्म होता है।',
    englishQuote: 'The old neural circuits of lust are starving. The warrior mind has taken command.',
    imageUrl: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#6366f1',
    author: 'Samurai Code of Bushido',
    theme: 'Moonlit Katana Blade',
    intensityStage: 'Phase 3: Tejas (3 Weeks Rewiring)',
  },
  30: {
    headline: 'OJAS MASTER',
    subtext: 'ONE MONTH OF DIVINE SHAKTI',
    hindiQuote: 'एक मास की अखंड साधना से ओजस का संचार सम्पूर्ण शरीर में होने लगता है।',
    englishQuote: 'One month of retention. Charaka Samhita states: 30 days builds divine radiance in the voice and eyes.',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#eab308',
    author: 'Charaka Samhita',
    theme: 'Sacred Temple Starlight',
    intensityStage: 'Phase 4: Ojas (Energy Transmutation)',
  },
  45: {
    headline: 'UNSHAKEABLE MAGNETISM',
    subtext: 'HALF-WAY TO CENTURY',
    hindiQuote: 'शांत मन और दिव्य ओजस से तुम्हारी उपस्थिति चुंबकीय बन जाती है।',
    englishQuote: 'Social anxiety has turned into natural commanding stillness and presence.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Vedic Raja Yoga',
    theme: 'Alpine High Mist',
    intensityStage: 'Phase 4: Ojas (Energy Transmutation)',
  },
  60: {
    headline: 'UNSHAKEABLE WILL',
    subtext: 'HIGHER CHAKRA AWAKENING',
    hindiQuote: 'ऊर्जा अब मूलाधार से उठकर अनाहत और आज्ञा चक्र की ओर प्रवाहित हो रही है।',
    englishQuote: 'Sixty days. Two months of purity. Transmuting animal desire into spiritual electricity.',
    imageUrl: 'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#8b5cf6',
    author: 'Kundalini Tantra',
    theme: 'Cosmic Horizon Lightning',
    intensityStage: 'Phase 4: Ojas (60 Days Deep Sadhana)',
  },
  90: {
    headline: 'REWRITE YOUR DESTINY',
    subtext: 'COMPLETE CELLULAR REBIRTH',
    hindiQuote: 'नब्बे दिन में मनुष्य का संपूर्ण न्यूरोकेमिकल ढांचा पुनर्जन्म ले लेता है।',
    englishQuote: 'Full 90-Day Reboot achieved. Cellular regeneration complete. You are no longer who you were.',
    imageUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Supreme Siddha',
    theme: 'Royal Crown on Obsidian',
    intensityStage: 'Phase 5: Urdhva-Retas (90-Day Mastery)',
  },
  100: {
    headline: 'CENTURY OF MASTERY',
    subtext: '100 DAYS OF AKHAND TEJAS',
    hindiQuote: 'शतकवीर ब्रह्मचारी का तेज सूर्य के समान प्रकाशमान होता है।',
    englishQuote: '100 Days clean. Unbreakable discipline has become your effortless nature.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fbbf24',
    author: 'Celestial Chariot',
    theme: 'Cosmic Earth Orbit & Starlight',
    intensityStage: 'Phase 5: Urdhva-Retas (Century of Fire)',
  },
  124: {
    headline: 'TRANSMUTED CONQUEROR',
    subtext: 'MASTERY OF THE HIGHER CENTURY',
    hindiQuote: 'कामवासना अब तुम्हारी दासी है, तुम अपनी चेतना के स्वामी हो।',
    englishQuote: 'Day 124: Channeling preserved life force into deep work and transcendent peace.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#ec4899',
    author: 'Yogic Siddhi',
    theme: 'Misty Alpine Citadel',
    intensityStage: 'Phase 5: Urdhva-Retas (Supreme Sovereignty)',
  },
  125: {
    headline: 'VIBRATIONAL DOMINANCE',
    subtext: 'ENERGY AT SUPREME FREQUENCY',
    hindiQuote: 'तुम्हारी आभा में वह शक्ति है जो दूसरों को भी पवित्रता की प्रेरणा देती है।',
    englishQuote: 'Day 125: Supreme frequency. Fearlessness and laser focus operate on auto-pilot.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#38bdf8',
    author: 'Super Saiyan Mindset',
    theme: 'Ultra Instinct Aura',
    intensityStage: 'Phase 5: Urdhva-Retas (Supreme Sovereignty)',
  },
  131: {
    headline: 'SUPREME SOVEREIGNTY',
    subtext: 'ABOVE ALL LOWER DISTRACTIONS',
    hindiQuote: 'संसार की कोई भी वासना अब तुम्हारे चित्त को विचलित नहीं कर सकती।',
    englishQuote: 'Day 131: Unshakeable equanimity in pleasure and pain, honor and dishonor.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#10b981',
    author: 'Himalayan Hermit',
    theme: 'Snow Summit Apex Peak',
    intensityStage: 'Phase 5: Urdhva-Retas (Supreme Sovereignty)',
  },
  141: {
    headline: 'AKHAND BRAHMACHARYA',
    subtext: 'THE GOLDEN IMMORTAL FORCE',
    hindiQuote: 'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — ब्रह्मचर्य से ही देवताओं ने मृत्यु को जीता।',
    englishQuote: 'Day 141: By virtue of Brahmacharya, the sages attained immortality and conquer of death.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#f59e0b',
    author: 'Atharva Veda 11.5.19',
    theme: 'Golden Cosmic Radiance',
    intensityStage: 'Phase 6: Divya Siddha (Immortal Will)',
  },
  365: {
    headline: 'ONE YEAR OF DIVINE FIRE',
    subtext: '365 DAYS OF UNBROKEN OJAS',
    hindiQuote: 'एक वर्ष का अखंड ब्रह्मचर्य मनुष्य को साक्षात देवतुल्य बना देता है।',
    englishQuote: '365 Days. Complete neuro-spiritual transmutation. You have attained true mastery of the vital essence.',
    imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80',
    accentColor: '#fbbf24',
    author: 'Rishi Patanjali & Gita',
    theme: 'Supernova Cosmic Galaxy',
    intensityStage: 'Phase 6: Divya Siddha (One Year Mastery)',
  },
};

// Infinite High-Resolution Aesthetic Image Pools for Infinite Scaling
const WARRIOR_IMAGES = [
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1080&q=80', // Dark Knight Statue
  'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1080&q=80', // Barbell & Relentless
  'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&w=1080&q=80', // Katana Blade
  'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&w=1080&q=80', // Boxing Fighter
  'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1080&q=80', // Anvil Fire
];

const GALAXY_AURA_IMAGES = [
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1080&q=80', // Electric Energy Aura
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1080&q=80', // Blue Cosmic Light
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1080&q=80', // Earth Orbit Nebula
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1080&q=80', // Deep Space Supernova
  'https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=1080&q=80', // Lightning Aurora
];

const NATURE_PEAK_IMAGES = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1080&q=80', // Himalayan Snow Peaks
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1080&q=80', // Misty Alpine Valley
  'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1080&q=80', // Dawn Stairs Ascent
  'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1080&q=80', // Mountain Sunset Meditation
  'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1080&q=80', // Ocean Waves & Lighthouse
];

const SOVEREIGNTY_IMAGES = [
  'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1080&q=80', // Obsidian Skyscrapers
  'https://images.unsplash.com/photo-1519074069444-1ba4ea16e886?auto=format&fit=crop&w=1080&q=80', // Supersonic Jet in Sky
  'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1080&q=80', // Golden Apex Lion
  'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1080&q=80', // Obsidian Crown
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1080&q=80', // Sacred Temple Shrine
];

// Rich Infinite Bilingual Motivational Quote Pool
const INFINITE_QUOTES = [
  {
    headline: 'RELENTLESS EXCELLENCE',
    subtext: 'TRANSMUTED WARRIOR',
    hindiQuote: 'वीर्य ही तुम्हारा असली बल है, इसे व्यर्थ मत बहाओ।',
    englishQuote: 'Great men do not seek short-lived pleasure; they build permanent monuments of character.',
    color: '#f59e0b',
    theme: 'Warrior Fire',
  },
  {
    headline: 'INVINCIBLE FOCUS',
    subtext: 'MASTERY OF RETENTION',
    hindiQuote: 'जो अपने मन और वीर्य को वश में करता है, वह संसार का विजेता है।',
    englishQuote: 'Invincible mental clarity and magnetic aura are the natural fruits of celibacy.',
    color: '#a855f7',
    theme: 'Cosmic Intellect',
  },
  {
    headline: 'UNBREAKABLE SPIRIT',
    subtext: 'NO COMPROMISE WITH URGES',
    hindiQuote: 'साधना की आग में तपो, कुंदन बनकर निकलो।',
    englishQuote: 'Do not negotiate with dopamine cravings. Breathe deep and claim your sovereignty.',
    color: '#10b981',
    theme: 'Prana Armor',
  },
  {
    headline: 'DIVINE MAGNETISM',
    subtext: 'OJAS ILLUMINATION',
    hindiQuote: 'अखंड ब्रह्मचर्य ही असीम ऊर्जा और प्रतिभा की जननी है।',
    englishQuote: 'Transmuted sexual fluid rises up the spinal column and lights up the higher brain centers.',
    color: '#fbbf24',
    theme: 'Solar Radiance',
  },
  {
    headline: 'SOVEREIGN WILLPOWER',
    subtext: 'BEYOND TEMPTATION',
    hindiQuote: 'इंद्रियों के दास मत बनो, अपनी आत्मा के स्वामी बनो।',
    englishQuote: 'When you conquer the seed, you conquer fear, lethargy, and mental defeat.',
    color: '#38bdf8',
    theme: 'Sky Conqueror',
  },
  {
    headline: 'STEEL DISCIPLINE',
    subtext: 'CONQUERING THE SENSES',
    hindiQuote: 'सिंह कभी भेड़ की तरह कमजोर उत्तेजनाओं के पीछे नहीं भागता।',
    englishQuote: 'Walk like a lion. The discipline of today creates the royalty of tomorrow.',
    color: '#ec4899',
    theme: 'Apex Predator',
  },
  {
    headline: 'THE LIGHT WITHIN',
    subtext: 'AWAKENED KUNDALINI TEJAS',
    hindiQuote: 'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत।',
    englishQuote: 'Through Brahmacharya and Tapasya, the divine sages conquered the illusion of death.',
    color: '#6366f1',
    theme: 'Sacred Temple',
  },
  {
    headline: 'TRANSMUTE TO GREATNESS',
    subtext: 'CREATIVE GENIUS UNLOCKED',
    hindiQuote: 'एक बूंद वीर्य चालीस बूंद रक्त का सार है।',
    englishQuote: 'Channel the primordial creative force into architecture, business, and enlightenment.',
    color: '#f97316',
    theme: 'Titan Sadhana',
  },
];

// Infinite Generator: Returns high-res wallpaper metadata for ANY day (Day 1 to Unlimited)
export function getWallpaperForDay(day: number): DayWallpaper {
  // If explicitly curated milestone exists, return it
  if (CURATED_MILESTONES[day]) {
    return { day, ...CURATED_MILESTONES[day] };
  }

  // Determine stage intensity dynamically based on streak day
  let intensityStage = 'Phase 1: Bhasma (Withdrawal Breakthrough)';
  if (day > 150) {
    intensityStage = 'Phase 6: Divya Siddha (Immortal Will)';
  } else if (day > 90) {
    intensityStage = 'Phase 5: Urdhva-Retas (Supreme Sovereignty)';
  } else if (day > 45) {
    intensityStage = 'Phase 4: Ojas (Energy Transmutation)';
  } else if (day > 21) {
    intensityStage = 'Phase 3: Tejas (Vital Radiance)';
  } else if (day > 7) {
    intensityStage = 'Phase 2: Agni (Neurochemical Rewiring)';
  }

  // Pick deterministic aesthetic image based on day modulo across 4 collections
  const imageCollections = [
    WARRIOR_IMAGES,
    GALAXY_AURA_IMAGES,
    NATURE_PEAK_IMAGES,
    SOVEREIGNTY_IMAGES,
  ];

  const colIdx = Math.floor(day / 7) % imageCollections.length;
  const col = imageCollections[colIdx];
  const imageUrl = col[day % col.length];

  // Pick quote deterministically
  const quote = INFINITE_QUOTES[day % INFINITE_QUOTES.length];

  return {
    day,
    headline: quote.headline,
    subtext: `${quote.subtext} • DAY ${day}`,
    hindiQuote: quote.hindiQuote,
    englishQuote: quote.englishQuote,
    imageUrl,
    accentColor: quote.color,
    author: 'Akhand Brahmacharya Mitra',
    theme: `${quote.theme} • Day ${day}`,
    intensityStage,
  };
}

// Ultra-HD Canvas Wallpaper Generator (1080x1920 Direct Download)
export function downloadCanvasWallpaper(item: DayWallpaper, onComplete?: () => void) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = item.imageUrl;

  const renderAndDownload = (withImage: boolean) => {
    if (withImage) {
      ctx.drawImage(img, 0, 0, 1080, 1920);

      // Dark cinematic vignette & contrast overlay
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(1, 'rgba(2, 4, 10, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);
    } else {
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, 1080, 1920);
    }

    // Top Stamped Day Badge
    ctx.fillStyle = item.accentColor;
    ctx.beginPath();
    ctx.roundRect(540 - 150, 260, 300, 64, [32]);
    ctx.fill();

    ctx.fillStyle = '#02040a';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`DAY ${item.day} UNLOCKED`, 540, 304);

    // Intensity Stage Sub-label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(item.intensityStage.toUpperCase(), 540, 360);

    // Hindi Quote Banner in Center
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`“${item.hindiQuote}”`, 540, 1220);

    // Bold English Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 64px "Cinzel", Impact, sans-serif';
    const words = item.headline.split(' ');
    let line = '';
    let y = 1340;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 920 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 80;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // English Subtext Quote
    ctx.fillStyle = item.accentColor;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(item.subtext, 540, y + 65);

    // Bottom Branding Footer
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '22px sans-serif';
    ctx.fillText('BRAHMACHARYA MITRA • ULTRA-HD MOTIVATIONAL ENGINE', 540, 1830);

    // Trigger instant download
    const link = document.createElement('a');
    link.download = `Brahmacharya-Day${item.day}-${item.headline.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (onComplete) onComplete();
  };

  img.onload = () => renderAndDownload(true);
  img.onerror = () => renderAndDownload(false);
}
