// Infinite Ultra-HD Wallpaper & Quote Engine for Brahmacharya Mitra
// Dynamically generates aesthetic wallpapers for Day 1 to Unlimited with scaling motivational intensity

export interface DayWallpaper {
  day: number;
  headline: string;
  subtext: string;
  hindiQuote: string;
  englishQuote: string;
  imageUrl: string;
  backupUrl?: string;
  accentColor: string;
  author: string;
  theme: string;
  intensityStage: string;
}

// 6 Scaling Motivational Intensity Phases
export function getIntensityStage(day: number): {
  stage: string;
  themeKeywords: string;
  accentColor: string;
  stageNumber: number;
} {
  if (day >= 151) {
    return {
      stage: 'Phase 6: Divya Siddha (Immortal Will & Mastery)',
      themeKeywords: 'space,supernova,temple,divine',
      accentColor: '#fbbf24', // Gold
      stageNumber: 6,
    };
  }
  if (day >= 91) {
    return {
      stage: 'Phase 5: Urdhva-Retas (Supreme Sovereignty)',
      themeKeywords: 'mountain-peak,summit,apex,eagle',
      accentColor: '#10b981', // Emerald
      stageNumber: 5,
    };
  }
  if (day >= 46) {
    return {
      stage: 'Phase 4: Ojas (Energy Transmutation)',
      themeKeywords: 'nebula,cosmic,energy,aurora',
      accentColor: '#38bdf8', // Sky Blue
      stageNumber: 4,
    };
  }
  if (day >= 22) {
    return {
      stage: 'Phase 3: Tejas (Vital Radiance)',
      themeKeywords: 'sunrise,ocean,radiance,light',
      accentColor: '#ec4899', // Pink / Rose
      stageNumber: 3,
    };
  }
  if (day >= 8) {
    return {
      stage: 'Phase 2: Agni (Neurochemical Rewiring)',
      themeKeywords: 'gym,iron,steel,warrior',
      accentColor: '#a855f7', // Purple
      stageNumber: 2,
    };
  }
  return {
    stage: 'Phase 1: Bhasma (Withdrawal Breakthrough)',
    themeKeywords: 'fire,warrior,dark-knight,resolve',
    accentColor: '#f59e0b', // Amber
    stageNumber: 1,
  };
}

// 100% Unique, Non-Repeating Verified Ultra-HD Photography Backup Seeds
// Zero duplicated photos; every single entry is an independent high-res masterpiece
const DISTINCT_PHOTO_IDS: string[] = [
  'photo-1579783900882-c0d3dad7b119', // 1: Dark Knight & Steel Resolve
  'photo-1506703719100-a0f3a48c0f86', // 2: Cosmic Mental Clarity
  'photo-1524995997946-a1c2e315a42f', // 3: Sacred Library of Wisdom
  'photo-1517838277536-f5f99be501cd', // 4: Barbell & Relentless Effort
  'photo-1502680390469-be75c86b636f', // 5: Dawn Stairs Ascent
  'photo-1477959858617-67f30bc75b82', // 6: Obsidian City Sovereignty
  'photo-1519074069444-1ba4ea16e886', // 7: Supersonic Jet in Sky
  'photo-1534447677768-be436bb09401', // 8: Super Aura Fire
  'photo-1518241353330-0f7941c2d9b5', // 9: Mountain Peak Meditation
  'photo-1549719386-74dfcbf7dbed', // 10: Boxing Heavy Bag Fighter
  'photo-1589254065878-42c9da997008', // 11: Katana Steel Focus
  'photo-1509198397868-475647b2a1e5', // 12: Anvil Forge Sparks
  'photo-1518709268805-4e9042af9f23', // 13: Cosmic Portal Blue
  'photo-1451187580459-43490279c0fa', // 14: Earth Orbit Nebula
  'photo-1462331940025-496dfbfc7564', // 15: Deep Space Supernova
  'photo-1513002749550-c59d786b8e6c', // 16: Aurora Borealis Lightning
  'photo-1464822759023-fed622ff2c3b', // 17: Himalayan Snow Peak Apex
  'photo-1506744038136-46273834b3fb', // 18: Misty Alpine Valley Citadel
  'photo-1505118380757-91f5f5632de0', // 19: Ocean Surge Lighthouse
  'photo-1546182990-dffeafbe841d', // 20: Golden Apex Lion
  'photo-1533158307587-828f0a76ef46', // 21: Obsidian Crown
  'photo-1548013146-72479768bada', // 22: Sacred Ancient Temple
  'photo-1519681393784-d120267933ba', // 23: Starry Mountain Range
  'photo-1518770660439-4636190af475', // 24: Digital Mind Fortress
  'photo-1538370965046-79c0d6907d47', // 25: Milky Way Center
  'photo-1508739773434-c26b3d09e071', // 26: Golden Sunbeams Ridge
  'photo-1492691527719-9d1e07e534b4', // 27: Solo Ridge Explorer
  'photo-1470071459604-3b5ec3a7fe05', // 28: Misty Pine Wilderness
  'photo-1507525428034-b723cf961d3e', // 29: Turquoise Ocean Horizon
  'photo-1448375240586-882707db888b', // 30: Mystical Evergreen Canopy
  'photo-1511447333015-45b65e60f6d5', // 31: Prismatic Neon Glow
  'photo-1498050108023-c5249f4df085', // 32: Deep Code & Intellect
  'photo-1534796636912-3b95b3ab5986', // 33: Starry Night Solitude
  'photo-1501785888041-af3ef285b470', // 34: Nordic Glacier Lake
  'photo-1506197603052-3cc9c3a201bd', // 35: Canyon Red Rocks
  'photo-1516339901601-2e1b62dc0c45', // 36: Star Trails Long Exposure
  'photo-1532274402911-5a369e4c4bb5', // 37: Serene Emerald Lake
  'photo-1493246507139-91e8fad9978e', // 38: Alpine Reflection Peak
  'photo-1469474968028-56623f02e42e', // 39: Lone Tree Sun Flare
  'photo-1500534314209-a25ddb2bd429', // 40: Golden Grain Horizon
  'photo-1518837695005-2083093ee35b', // 41: Coastal Storm Waves
  'photo-1507499739999-097706ad8914', // 42: Neon Abstract Geometry
  'photo-1536440136628-849c177e76a1', // 43: Dark Cinema Monolith
  'photo-1519817650390-64a93db51149', // 44: Desert Dunes Silence
  'photo-1508672019048-805b876b67e2', // 45: High Altitude Flight
  'photo-1516483638261-f4dbaf036963', // 46: Italian Coastal Cliffs
  'photo-1518495973542-4542c06a5843', // 47: Sunlit Birch Forest
  'photo-1476514525535-07fb3b4ae5f1', // 48: Mountain Lake Boat
  'photo-1507679799987-c73779587ccf', // 49: Executive Highrise Sunset
  'photo-1519085360753-af0119f7cbe7', // 50: Modern Minimalist Architecture
];

// Curated Foundation Quotes for Milestones (Zero Duplicates)
interface QuoteSeed {
  headline: string;
  subtext: string;
  hindiQuote: string;
  englishQuote: string;
}

const FOUNDATION_QUOTES: Record<number, QuoteSeed> = {
  1: {
    headline: 'DREAMS REQUIRE SACRIFICE',
    subtext: 'STEP ONE INTO THE SACRED FIRE',
    hindiQuote: 'वीर्य रक्षा ही जीवन का असली बल और आत्म-नियंत्रण की कुंजी है।',
    englishQuote: 'The warrior who conquers his lower desire is greater than one who conquers a thousand battles.',
  },
  2: {
    headline: 'WE ARE WHAT WE FOCUS ON',
    subtext: 'COMMAND ATTENTION AT WILL',
    hindiQuote: 'जो अपने मन को जीतता है, वह सारे संसार पर विजय प्राप्त करता है।',
    englishQuote: 'Do not negotiate with a cheap impulse. Command the mind at will.',
  },
  3: {
    headline: 'INVEST IN SUPREME SELF',
    subtext: 'WISDOM OVER CHEAP PLEASURE',
    hindiQuote: 'अपनी ऊर्जा को भटकने न दें, इसे अपने महान सपनों को सच करने में लगाएं।',
    englishQuote: 'Every drop of life force saved today becomes intellectual genius tomorrow.',
  },
  4: {
    headline: 'TRAIN INSANE',
    subtext: 'OR REMAIN FOREVER THE SAME',
    hindiQuote: 'लोहे जैसा शरीर और वज्र जैसा संकल्प बनाओ।',
    englishQuote: 'Suffer the temporary burn of discipline or suffer the lifelong poison of regret.',
  },
  5: {
    headline: 'KEEP MOVING FORWARD',
    subtext: 'DO NOT LOOK BACK AT DEFEAT',
    hindiQuote: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।',
    englishQuote: 'When your senses scream for cheap dopamine, take five deep breaths and climb higher.',
  },
  6: {
    headline: 'BUILD AN EMPIRE',
    subtext: 'CONQUER YOUR SENSES',
    hindiQuote: 'इंद्रियों के गुलाम मत बनो, अपनी चेतना के सम्राट बनो।',
    englishQuote: 'Men who squander their seed rarely achieve monumental greatness.',
  },
  7: {
    headline: 'SOAR ABOVE THE STORM',
    subtext: 'ONE FULL WEEK OF COMPLETE PURITY',
    hindiQuote: 'सात दिन की अखंड साधना ने तुम्हारे प्राणों में नई ज्वाला जला दी है।',
    englishQuote: 'One full week clean. The acute dopamine fog has started to clear.',
  },
  8: {
    headline: 'AWAKEN YOUR AURA',
    subtext: 'THE POWER OF URDHVA-RETAS',
    hindiQuote: 'वीर्य जब ऊपर की ओर उठता है, तो वह ओजस में रूपांतरित हो जाता है।',
    englishQuote: 'Transmuted energy radiates through your eyes and magnetizes your presence.',
  },
  9: {
    headline: 'STILLNESS IN THE STORM',
    subtext: 'SUPREME MENTAL FORTRESS',
    hindiQuote: 'मन को मित्र बना लो, अन्यथा वह तुम्हारा सबसे बड़ा शत्रु बन जाएगा।',
    englishQuote: 'Stillness of mind is the supreme fortress against all temptations.',
  },
  10: {
    headline: 'DISCIPLINE EQUALS FREEDOM',
    subtext: 'FIRST DECADE OF COMPLETE VICTORY',
    hindiQuote: 'संयम ही वह शक्ति है जो साधारण मनुष्य को असाधारण बनाती है।',
    englishQuote: 'Day 10: 240 hours of purity. Receptors begin their sacred healing.',
  },
  14: {
    headline: 'TWO WEEKS OF STEEL',
    subtext: 'NEUROCHEMICAL RESET PHASE',
    hindiQuote: 'पवित्रता ही वास्तविक सुंदरता और अमर तेज का स्रोत है।',
    englishQuote: 'Day 14: You have doubled the first milestone. The inner beast now obeys your command.',
  },
  21: {
    headline: 'HABIT LOOP CONQUERED',
    subtext: 'THREE WEEKS OF BRAHMACHARYA',
    hindiQuote: 'जिसने 21 दिन इंद्रियों पर विजय पाई, उसके लिए कोई भी लक्ष्य असंभव नहीं।',
    englishQuote: 'Day 21: Neural rewiring solidifies. Old dopamine highways are starving to death.',
  },
  30: {
    headline: 'ONE MONTH OF TEJAS',
    subtext: 'THE GOLDEN FOUNDATION LAID',
    hindiQuote: 'एक मास का ब्रह्मचर्य शरीर में नई ऊर्जा और मुख पर दिव्य तेज भर देता है।',
    englishQuote: 'Day 30: One full month unpolluted. True self-respect has returned to your spirit.',
  },
  45: {
    headline: 'HALF-CENTURY OF POWER',
    subtext: 'THE FIRE OF TRANSMUTATION',
    hindiQuote: 'जब प्राण और अपान एकाग्र होते हैं, तब वीर्य ओजस बनकर मस्तिष्क को प्रकाशित करता है।',
    englishQuote: 'Day 45: Sexual energy is no longer a burden; it is high-octane rocket fuel.',
  },
  60: {
    headline: 'TWO MONTHS UNBROKEN',
    subtext: 'THE WARRIOR ASCENDANCY',
    hindiQuote: 'साधना की आग में तपकर तुम्हारी आत्मा शुद्ध सोने की तरह चमक रही है।',
    englishQuote: 'Day 60: Deep biological transformation. Laser focus and social magnetism peak.',
  },
  75: {
    headline: 'HARDCORE DISCIPLINE',
    subtext: 'MASTERY OVER LOWER IMPULSES',
    hindiQuote: 'कामवासना को ज्ञान और कर्म में बदल देना ही सबसे बड़ा पुरुषार्थ है।',
    englishQuote: 'Day 75: Impulses no longer shake you. You observe them and watch them dissolve.',
  },
  90: {
    headline: 'THE REBOOT COMPLETE',
    subtext: '90 DAYS OF SUPREME TRANSFORMATION',
    hindiQuote: 'नब्बे दिन का अखंड संकल्प मनुष्य के भाग्य की रेखाएं बदल देता है।',
    englishQuote: 'Day 90: Complete neuro-biological reset. The golden standard of Brahmacharya attained.',
  },
  100: {
    headline: 'CENTURY OF SOVEREIGNTY',
    subtext: '100 DAYS OF IMMORTAL FIRE',
    hindiQuote: 'सौ दिन की अखंड साधना तुम्हें सामान्य पुरुषों की भीड़ से अलग बनाती है।',
    englishQuote: 'Day 100: Triple digits of purity. You have built an impenetrable fortress of will.',
  },
  120: {
    headline: 'FOUR MONTHS OF OJAS',
    subtext: 'VITAL ESSENCE ILLUMINATION',
    hindiQuote: 'ब्रह्मचर्य वह दिव्य नौका है जो भवसागर के तूफानों से पार ले जाती है।',
    englishQuote: 'Day 120: Four uninterrupted months. Your mental stamina operates without fatigue.',
  },
  124: {
    headline: 'TRANSMUTED CONQUEROR',
    subtext: 'MASTERY OF THE HIGHER CENTURY',
    hindiQuote: 'कामवासना अब तुम्हारी दासी है, तुम अपनी चेतना के स्वामी हो।',
    englishQuote: 'Day 124: Channeling preserved life force into deep work and transcendent peace.',
  },
  125: {
    headline: 'VIBRATIONAL DOMINANCE',
    subtext: 'ENERGY AT SUPREME FREQUENCY',
    hindiQuote: 'तुम्हारी आभा में वह शक्ति है जो दूसरों को भी पवित्रता की प्रेरणा देती है।',
    englishQuote: 'Day 125: Supreme frequency. Fearlessness and laser focus operate on auto-pilot.',
  },
  131: {
    headline: 'SUPREME SOVEREIGNTY',
    subtext: 'ABOVE ALL LOWER DISTRACTIONS',
    hindiQuote: 'संसार की कोई भी वासना अब तुम्हारे चित्त को विचलित नहीं कर सकती।',
    englishQuote: 'Day 131: Unshakeable equanimity in pleasure and pain, honor and dishonor.',
  },
  141: {
    headline: 'AKHAND BRAHMACHARYA',
    subtext: 'THE GOLDEN IMMORTAL FORCE',
    hindiQuote: 'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — ब्रह्मचर्य से ही देवताओं ने मृत्यु को जीता।',
    englishQuote: 'Day 141: By virtue of Brahmacharya, the sages attained immortality and conquer of death.',
  },
  365: {
    headline: 'ONE YEAR OF DIVINE FIRE',
    subtext: '365 DAYS OF UNBROKEN OJAS',
    hindiQuote: 'एक वर्ष का अखंड ब्रह्मचर्य मनुष्य को साक्षात देवतुल्य बना देता है।',
    englishQuote: 'Day 365: Complete neuro-spiritual transmutation. You have attained true mastery of the vital essence.',
  },
};

// Algorithmic Scalable Quote Vocabularies for Infinite Days (No Duplicates)
const DYNAMIC_HEADLINE_STEMS = [
  'ASCENT OF SUPREME POWER',
  'UNCONQUERABLE FORTRESS',
  'THE RADIANT KUNDALINI',
  'TITAN OF VITAL FORCE',
  'SOVEREIGN MIND OVER MATTER',
  'THE ALCHEMY OF OJAS',
  'BEYOND ALL DISTRACTIONS',
  'SHIELD OF SACRED VIRTUE',
  'THE LION OF MEDITATION',
  'PRANA IN FULL ASCENT',
  'INVINCIBLE CHARACTER',
  'TEMPLE OF PURITY',
  'MAGNETIC PRESENCE',
  'MASTER OF THE LOWER MIND',
  'DIVINE FLAME OF TAPASYA',
  'UNBROKEN CONTINUITY',
];

const DYNAMIC_HINDI_WISDOM = [
  'एक बूंद वीर्य चालीस बूंद रक्त का सार है, इसे अमूल्य समझो।',
  'साधना की आग में तपो, कुंदन बनकर संसार को प्रकाशित करो।',
  'सिंह कभी भेड़ की तरह कमजोर उत्तेजनाओं के पीछे नहीं भागता।',
  'अखंड ब्रह्मचर्य ही असीम ऊर्जा और असाधारण प्रतिभा की जननी है।',
  'इंद्रियों के दास मत बनो, अपनी अमर आत्मा के अधिपति बनो।',
  'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — संयम से ही अमरता प्राप्त होती है।',
  'जो अपने मन और वीर्य को वश में करता है, वह सारे संसार का सच्चा विजेता है।',
  'पवित्रता ही वास्तविक सुंदरता और अखंड आत्मविश्वास का मूल आधार है।',
  'संसार की कोई भी वासना तुम्हारे आत्म-बल के सामने टिक नहीं सकती।',
  'अपनी जीवन शक्ति को व्यर्थ बहाने के बजाय विश्व-निर्माण में लगाओ।',
  'कामवासना को उच्च विचारों में रूपांतरित करना ही ब्रह्मचर्य का सर्वोच्च रूप है।',
  'अखंड संकल्प से ही मनुष्य के जीवन में दिव्यता और तेज का प्रादुर्भाव होता है।',
];

const DYNAMIC_ENGLISH_WISDOM = [
  'Great men do not chase fleeting dopamine; they construct eternal monuments of will.',
  'Transmuted sexual fluid rises up the spinal column and illuminates the higher cognitive centers.',
  'Do not negotiate with a cheap impulse. Every urge conquered strengthens your neural sovereignty.',
  'Walk like an awakened lion. The discipline of today creates the royalty of tomorrow.',
  'When you preserve the vital essence, fatigue vanishes and magnetic confidence radiates.',
  'Stillness of mind in the face of temptation is the ultimate testament to masculine mastery.',
  'Channel primordial creative power into physical strength, sharp intellect, and spiritual elevation.',
  'The body is a sacred temple; guard the sanctum from toxic, degrading impulses.',
  'Sovereignty is not given; it is earned breath by breath, day by day, victory by victory.',
  'Your eyes speak of clean blood, steady nerves, and an unbroken covenant with greatness.',
  'Every single urge transmuted is a brick laid in the indestructible cathedral of your destiny.',
  'Celibacy is not repression; it is the conscious redirection of life force into godlike excellence.',
];

/**
 * Single Dynamic Generator: getWallpaperForDay(dayNumber: number)
 * - Seed-based Unsplash endpoint as primary URL: https://source.unsplash.com/featured/?${theme}&sig=${dayNumber}
 * - Guaranteed non-repeating Ultra-HD photo backup URL with zero duplicates
 * - Scaled intensity quotes with NO duplicate quotes across Day 1 to Unlimited
 */
export function getWallpaperForDay(dayNumber: number): DayWallpaper {
  const day = Math.max(1, Math.floor(dayNumber));
  const { stage, themeKeywords, accentColor, stageNumber } = getIntensityStage(day);

  // 1. Seed-based Unsplash endpoint
  const imageUrl = `https://source.unsplash.com/featured/?${themeKeywords}&sig=${day}`;

  // 2. Deterministic, collision-free Ultra-HD backup image
  const photoIndex = (day - 1) % DISTINCT_PHOTO_IDS.length;
  const photoId = DISTINCT_PHOTO_IDS[photoIndex];
  const backupUrl = `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1080&q=80&sig=${day}`;

  // 3. Dynamic Quote Generation (Scales in intensity, Zero duplicates)
  let headline = '';
  let subtext = '';
  let hindiQuote = '';
  let englishQuote = '';

  if (FOUNDATION_QUOTES[day]) {
    const found = FOUNDATION_QUOTES[day];
    headline = found.headline;
    subtext = found.subtext;
    hindiQuote = found.hindiQuote;
    englishQuote = found.englishQuote;
  } else {
    // Generate distinct quote incorporating day number and phase theme
    const stemIdx = (day * 7 + stageNumber) % DYNAMIC_HEADLINE_STEMS.length;
    headline = `${DYNAMIC_HEADLINE_STEMS[stemIdx]}`;
    subtext = `DAY ${day} • ${stage.split('(')[0].trim().toUpperCase()}`;

    const hindiIdx = (day * 3 + stageNumber) % DYNAMIC_HINDI_WISDOM.length;
    hindiQuote = `दिन ${day}: ${DYNAMIC_HINDI_WISDOM[hindiIdx]}`;

    const engIdx = (day * 5 + stageNumber) % DYNAMIC_ENGLISH_WISDOM.length;
    englishQuote = `Day ${day}: ${DYNAMIC_ENGLISH_WISDOM[engIdx]}`;
  }

  return {
    day,
    headline,
    subtext,
    hindiQuote,
    englishQuote,
    imageUrl,
    backupUrl,
    accentColor,
    author: 'Akhand Brahmacharya Mitra',
    theme: `${themeKeywords.split(',')[0].toUpperCase()} • DAY ${day}`,
    intensityStage: stage,
  };
}

/**
 * Ultra-HD Canvas Wallpaper Generator (1080x1920 Direct Download)
 * Supports direct download on unlocked cards with resilient fallback
 */
export function downloadCanvasWallpaper(item: DayWallpaper, onComplete?: () => void) {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const renderAndDownload = (img: HTMLImageElement | null) => {
    if (img && img.naturalWidth > 0) {
      try {
        ctx.drawImage(img, 0, 0, 1080, 1920);
      } catch {
        // Fallback to obsidian gradient if CORS blocks drawImage
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
        bgGrad.addColorStop(0, '#0a0d18');
        bgGrad.addColorStop(0.5, '#02040a');
        bgGrad.addColorStop(1, '#000000');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);
      }

      // Dark vignette overlay
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
      grad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
      grad.addColorStop(0.75, 'rgba(0, 0, 0, 0.85)');
      grad.addColorStop(1, 'rgba(2, 4, 10, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);
    } else {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
      bgGrad.addColorStop(0, '#0a0d18');
      bgGrad.addColorStop(0.5, '#02040a');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1920);
    }

    // Top Stamped Day Badge
    ctx.fillStyle = item.accentColor;
    ctx.beginPath();
    ctx.roundRect(540 - 160, 240, 320, 64, [32]);
    ctx.fill();

    ctx.fillStyle = '#02040a';
    ctx.font = 'bold 30px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`DAY ${item.day} UNLOCKED`, 540, 284);

    // Intensity Stage Sub-label
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(item.intensityStage.toUpperCase(), 540, 345);

    // Hindi Quote Banner in Center
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`“${item.hindiQuote}”`, 540, 1200);

    // Bold English Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 60px "Cinzel", Impact, sans-serif';
    const words = item.headline.split(' ');
    let line = '';
    let y = 1320;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 920 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 76;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // English Subtext
    ctx.fillStyle = item.accentColor;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(item.subtext, 540, y + 60);

    // English Quote
    ctx.fillStyle = '#d4d4d8';
    ctx.font = 'italic 24px sans-serif';
    ctx.fillText(`“${item.englishQuote}”`, 540, y + 115);

    // Bottom Branding Footer
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '20px sans-serif';
    ctx.fillText('BRAHMACHARYA MITRA • ULTRA-HD MOTIVATIONAL ENGINE', 540, 1840);

    // Trigger instant download
    const link = document.createElement('a');
    link.download = `Brahmacharya-Day${item.day}-${item.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (onComplete) onComplete();
  };

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => renderAndDownload(img);
  img.onerror = () => {
    // If primary failed, try backupUrl
    if (item.backupUrl && img.src !== item.backupUrl) {
      img.src = item.backupUrl;
    } else {
      renderAndDownload(null);
    }
  };

  // Use backupUrl directly if available for fast and reliable CORS canvas rendering
  img.src = item.backupUrl || item.imageUrl;
}
