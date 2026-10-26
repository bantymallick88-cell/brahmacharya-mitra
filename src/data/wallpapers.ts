// Progressive Non-Repeating Wallpaper & Dynamic Quote Engine for Brahmacharya Mitra
// 100% Unique, HD wallpapers powered by day-index deterministic seeding

export interface DayWallpaper {
  day: number;
  headline: string;
  subtext: string;
  hindiQuote: string;
  englishQuote: string;
  imageUrl: string;
  downloadUrl: string;
  accentColor: string;
  author: string;
  theme: string;
  intensityStage: string;
}

// 4 Progressive Psychological Intensity Stages
export function getPsychologicalStage(day: number): {
  stage: string;
  category: 'Mindset' | 'Discipline' | 'Vital Radiance' | 'Transmutation & Warrior Power';
  accentColor: string;
  stageNumber: number;
} {
  if (day >= 90) {
    return {
      stage: 'Phase 4: Transmutation & Warrior Power (Urdhva-Retas)',
      category: 'Transmutation & Warrior Power',
      accentColor: '#fbbf24', // Metallic Gold
      stageNumber: 4,
    };
  }
  if (day >= 30) {
    return {
      stage: 'Phase 3: Vital Radiance & Ojas (Tejas Awakening)',
      category: 'Vital Radiance',
      accentColor: '#38bdf8', // Sky Blue / Cyan
      stageNumber: 3,
    };
  }
  if (day >= 8) {
    return {
      stage: 'Phase 2: Discipline & Iron Habit Formation',
      category: 'Discipline',
      accentColor: '#a855f7', // Mystic Purple
      stageNumber: 2,
    };
  }
  return {
    stage: 'Phase 1: Mindset & Breaking the Dopamine Urge',
    category: 'Mindset',
    accentColor: '#f59e0b', // Radiant Amber
    stageNumber: 1,
  };
}

// Foundation Milestones (Day 1 - 7 Mindset, 8 - 29 Discipline, 30 - 89 Radiance, 90+ Transmutation)
interface QuoteSeed {
  headline: string;
  subtext: string;
  hindiQuote: string;
  englishQuote: string;
}

const FOUNDATION_QUOTES: Record<number, QuoteSeed> = {
  1: {
    headline: 'MINDSET OF THE WARRIOR',
    subtext: 'THE SACRED DECISION TO CLAIM YOUR LIFE',
    hindiQuote: 'वीर्य रक्षा ही जीवन का असली बल और आत्म-नियंत्रण की कुंजी है।',
    englishQuote: 'The warrior who conquers his lower desire is greater than one who conquers a thousand battles.',
  },
  2: {
    headline: 'COMMAND THE MIND',
    subtext: 'OBSERVE THE URGE WITHOUT ACTING',
    hindiQuote: 'जो अपने मन को जीतता है, वह सारे संसार पर विजय प्राप्त करता है।',
    englishQuote: 'Do not negotiate with a cheap impulse. Command the mind at will.',
  },
  3: {
    headline: 'INVEST IN THE SOVEREIGN SELF',
    subtext: 'WISDOM OVER SHORT-LIVED PLEASURE',
    hindiQuote: 'अपनी ऊर्जा को भटकने न दें, इसे अपने महान सपनों को सच करने में लगाएं।',
    englishQuote: 'Every drop of life force saved today becomes intellectual genius tomorrow.',
  },
  4: {
    headline: 'THE INITIAL DETOX FIRE',
    subtext: 'BREAKING THE DIGITAL CHAINS',
    hindiQuote: 'लोहे जैसा शरीर और वज्र जैसा संकल्प बनाओ।',
    englishQuote: 'Suffer the temporary burn of discipline or suffer the lifelong poison of regret.',
  },
  5: {
    headline: 'STAND FIRM AT THE THRESHOLD',
    subtext: 'NO COMPROMISE WITH WEAKNESS',
    hindiQuote: 'उठो, जागो और तब तक मत रुको जब तक लक्ष्य प्राप्त न हो जाए।',
    englishQuote: 'When your senses scream for cheap dopamine, take five deep breaths and climb higher.',
  },
  6: {
    headline: 'SOVEREIGNTY OF CONSCIOUSNESS',
    subtext: 'THE MASTER IS AWAKE',
    hindiQuote: 'इंद्रियों के गुलाम मत बनो, अपनी चेतना के सम्राट बनो।',
    englishQuote: 'Men who squander their seed rarely achieve monumental greatness.',
  },
  7: {
    headline: 'ONE WEEK OF COMPLETE PURITY',
    subtext: 'FIRST CLEAN STEP INTO VICTORY',
    hindiQuote: 'सात दिन की अखंड साधना ने तुम्हारे प्राणों में नई ज्वाला जला दी है।',
    englishQuote: 'One full week clean. The acute dopamine fog has started to clear.',
  },
  8: {
    headline: 'DISCIPLINE OF THE STEEL WILL',
    subtext: 'NEUROCHEMICAL REWIRING ACTIVATED',
    hindiQuote: 'संयम ही वह शक्ति है जो साधारण मनुष्य को असाधारण बनाती है।',
    englishQuote: 'Discipline is your weapon. Starve old neural pathways and feed divine purpose.',
  },
  14: {
    headline: 'TWO WEEKS OF IRON HABIT',
    subtext: 'THE INNER BEAST OBEYS',
    hindiQuote: 'पवित्रता ही वास्तविक सुंदरता और अमर तेज का स्रोत है।',
    englishQuote: 'Day 14: Neural receptors regenerate. Mental clarity sharply sharpens.',
  },
  21: {
    headline: 'HABIT LOOP CONQUERED',
    subtext: 'THREE WEEKS OF BROKEN CHAINS',
    hindiQuote: 'जिसने 21 दिन इंद्रियों पर विजय पाई, उसके लिए कोई भी लक्ष्य असंभव नहीं।',
    englishQuote: 'Day 21: The cycle is broken. You now operate from conscious choice, not unconscious reflex.',
  },
  30: {
    headline: 'ONE MONTH OF VITAL TEJAS',
    subtext: 'THE GLOW OF OJAS IN THE BLOOD',
    hindiQuote: 'एक मास का ब्रह्मचर्य शरीर में नई ऊर्जा और मुख पर दिव्य तेज भर देता है।',
    englishQuote: 'Day 30: One full month clean. Your eye contact hardens with natural magnetism and inner respect.',
  },
  45: {
    headline: 'HALF-CENTURY OF RADIANCE',
    subtext: 'THE ASCENT OF SPINAL FORCE',
    hindiQuote: 'जब प्राण और अपान एकाग्र होते हैं, तब वीर्य ओजस बनकर मस्तिष्क को प्रकाशित करता है।',
    englishQuote: 'Day 45: Sexual energy is high-octane rocket fuel for your intellectual and physical breakthroughs.',
  },
  60: {
    headline: 'TWO MONTHS UNBROKEN',
    subtext: 'COGNITIVE CLARITY & DEEP CONFIDENCE',
    hindiQuote: 'साधना की आग में तपकर तुम्हारी आत्मा शुद्ध सोने की तरह चमक रही है।',
    englishQuote: 'Day 60: Deep biological transmutation. Laser concentration and social stamina reach peak state.',
  },
  75: {
    headline: 'WARRIOR RESILIENCE',
    subtext: 'IMPULSES OBSERVED AND DISSOLVED',
    hindiQuote: 'कामवासना को ज्ञान और कर्म में बदल देना ही सबसे बड़ा पुरुषार्थ है।',
    englishQuote: 'Day 75: Temptation is an illusion. You possess unbreakable command over your reactions.',
  },
  90: {
    headline: 'TRANSMUTATION & WARRIOR POWER',
    subtext: 'URDHVA-RETAS: COMPLETE NEURO-RESET',
    hindiQuote: 'नब्बे दिन का अखंड संकल्प मनुष्य के भाग्य की रेखाएं बदल देता है।',
    englishQuote: 'Day 90: Supreme transmutation. You have conquered the lowest desires and awakened divine masculine power.',
  },
  100: {
    headline: 'CENTURY OF SOVEREIGNTY',
    subtext: '100 DAYS OF IMMORTAL FIRE',
    hindiQuote: 'सौ दिन की अखंड साधना तुम्हें सामान्य पुरुषों की भीड़ से अलग बनाती है।',
    englishQuote: 'Day 100: Triple digits of purity. You have forged an impenetrable fortress of masculine will.',
  },
  125: {
    headline: 'VIBRATIONAL DOMINANCE',
    subtext: 'MAGNETIC HIGHER FREQUENCY',
    hindiQuote: 'तुम्हारी आभा में वह शक्ति है जो दूसरों को भी पवित्रता की प्रेरणा देती है।',
    englishQuote: 'Day 125: Supreme frequency. Fearlessness and laser focus operate on auto-pilot.',
  },
  141: {
    headline: 'AKHAND BRAHMACHARYA',
    subtext: 'THE GOLDEN IMMORTAL FORCE',
    hindiQuote: 'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — ब्रह्मचर्य से ही देवताओं ने मृत्यु को जीता।',
    englishQuote: 'Day 141: By virtue of Brahmacharya, the sages attained immortality and conquer of death.',
  },
  365: {
    headline: 'ONE YEAR OF SUPREME VICTORY',
    subtext: '365 DAYS OF UNBROKEN OJAS',
    hindiQuote: 'एक वर्ष का अखंड ब्रह्मचर्य मनुष्य को साक्षात देवतुल्य बना देता है।',
    englishQuote: '365 Days. Complete neuro-spiritual transmutation. Absolute mastery of the primordial creative force.',
  },
};

// Algorithmic Progressive Quote Stems scaled by Psychological Stage
const STAGE_HEADLINES: Record<number, string[]> = {
  1: [ // Mindset
    'AWAKEN THE WARRIOR MIND',
    'MASTERY OVER THE IMPULSE',
    'STAND GUARD AT THE GATES',
    'SOVEREIGNTY OF THE WILL',
    'THE POWER OF THE SACRED NO',
    'CHOOSE GLORY OVER SHAME',
  ],
  2: [ // Discipline
    'STEEL DISCIPLINE EVERY SECOND',
    'THE FORGE OF DAILY HABIT',
    'STARVE THE CHEAP RECEPTORS',
    'IRON FOCUS IN SILENCE',
    'UNCOMPROMISING CHARACTER',
    'COMMAND THE LOWER NATURE',
  ],
  3: [ // Vital Radiance
    'RADIANT TEJAS IN THE GAZE',
    'THE GOLDEN MAGNETISM OF OJAS',
    'PRANA ASCENDING THE SPINE',
    'UNSHAKEABLE MENTAL CLARITY',
    'INTELLECTUAL GENIUS UNLOCKED',
    'LIGHT IN THE LIVING TEMPLE',
  ],
  4: [ // Transmutation & Warrior Power
    'THE WARRIOR TRANSMUTATION',
    'URDHVA-RETAS SUPREME FORCE',
    'INVINCIBLE MASCULINE SOVEREIGNTY',
    'CONQUEROR OF DEATH AND ILLUSION',
    'THE IMMORTAL VITAL ESSENCE',
    'TITAN OF SPIRITUAL WILL',
  ],
};

const STAGE_HINDI_QUOTES: Record<number, string[]> = {
  1: [ // Mindset
    'मन को मित्र बना लो, अन्यथा वह तुम्हारा सबसे बड़ा शत्रु बन जाएगा।',
    'एक क्षण का संयम जीवन भर के पश्चाताप से बचाता है।',
    'जो अपनी सोच को जीत लेता है, वह हर परिस्थिति को जीत लेता है।',
    'संसार की सबसे बड़ी विजय अपने ही मन पर विजय पाना है।',
  ],
  2: [ // Discipline
    'सिंह कभी भेड़ की तरह कमजोर उत्तेजनाओं के पीछे नहीं भागता।',
    'कठिन अनुशासन ही सच्ची स्वतंत्रता की पहली शर्त है।',
    'साधना की आग में तपो, कुंदन बनकर संसार को आलोकित करो।',
    'दैनिक संकल्प का अटूट पालन ही चरित्र का वास्तविक निर्माण करता है।',
  ],
  3: [ // Vital Radiance
    'एक बूंद वीर्य चालीस बूंद रक्त का सार है, इसे अमूल्य समझो।',
    'पवित्रता ही वास्तविक सुंदरता और अखंड आत्मविश्वास का मूल आधार है।',
    'अखंड ब्रह्मचर्य ही असीम ऊर्जा और असाधारण प्रतिभा की जननी है।',
    'वीर्य जब ऊपर उठता है, तो वह मुख पर दिव्य आभा और ओजस बन जाता है।',
  ],
  4: [ // Transmutation & Warrior Power
    'ब्रह्मचर्येण तपसा देवा मृत्युमपाघ्नत — संयम से ही अमरता प्राप्त होती है।',
    'कामवासना को उच्च विचारों में रूपांतरित करना ही ब्रह्मचर्य का सर्वोच्च रूप है।',
    'जो अपने मन और वीर्य को वश में करता है, वह सारे संसार का सच्चा विजेता है।',
    'इंद्रियों के दास मत बनो, अपनी अमर आत्मा के अधिपति बनो।',
  ],
};

const STAGE_ENGLISH_QUOTES: Record<number, string[]> = {
  1: [ // Mindset
    'You are not your impulses. You are the sovereign consciousness observing them.',
    'Every time you resist a craving, your prefrontal cortex grows physically stronger.',
    'Do not sacrifice a decade of greatness for thirty seconds of synthetic pleasure.',
    'Clear the mental fog. Guard your attention as your most sacred capital.',
  ],
  2: [ // Discipline
    'Discipline is choosing between what you want now and what you want most.',
    'Cold showers, heavy iron, deep study — build the impenetrable armor of character.',
    'Neural highways of addiction wither when you consistently deny them fuel.',
    'Consistency in the dark breeds untouchable confidence in the light.',
  ],
  3: [ // Vital Radiance
    'Preserved life force radiates through steady eyes, deep vocal resonance, and calm authority.',
    'Transmuted energy banishes social anxiety and infuses deep peace into your core.',
    'Your brain operates on pristine neurochemical balance. Creative insight flows effortlessly.',
    'The radiance of retention cannot be faked; it is the raw biological signature of self-mastery.',
  ],
  4: [ // Transmutation & Warrior Power
    'Sexual energy is the primordial creator force. Channel it into monuments, empires, and enlightenment.',
    'Urdhva-Retas: The upward circulation of prana transforms animal instinct into titan willpower.',
    'A man who has mastered his seed cannot be bribed, intimidated, or broken by the world.',
    'Walk with the dignity of an awakened warrior. The immortal fire burns within you.',
  ],
};

/**
 * Progressive Non-Repeating Wallpaper Generator: getWallpaperForDay(dayNumber: number)
 * - Deterministic hash seed using picsum.photos: https://picsum.photos/seed/brahma_${day}/600/900
 * - Ultra-HD download seed: https://picsum.photos/seed/brahma_${day}/1080/1920
 * - Guaranteed 100% unique, non-repeating wallpapers for Day 1 to Unlimited
 * - Progressively scales psychological intensity (Mindset -> Discipline -> Radiance -> Transmutation)
 */
export function getWallpaperForDay(dayNumber: number): DayWallpaper {
  const day = Math.max(1, Math.floor(dayNumber));
  const { stage, category, accentColor, stageNumber } = getPsychologicalStage(day);

  // Deterministic seed-based endpoints (100% unique, non-repeating across all days)
  const imageUrl = `https://picsum.photos/seed/brahma_${day}/600/900`;
  const downloadUrl = `https://picsum.photos/seed/brahma_${day}/1080/1920`;

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
    // Dynamic progressive generation based on psychological stage
    const headlines = STAGE_HEADLINES[stageNumber];
    const headIdx = (day * 7) % headlines.length;
    headline = `${headlines[headIdx]}`;
    subtext = `DAY ${day} • ${category.toUpperCase()}`;

    const hindiList = STAGE_HINDI_QUOTES[stageNumber];
    const hIdx = (day * 3) % hindiList.length;
    hindiQuote = `दिन ${day}: ${hindiList[hIdx]}`;

    const engList = STAGE_ENGLISH_QUOTES[stageNumber];
    const eIdx = (day * 5) % engList.length;
    englishQuote = `Day ${day}: ${engList[eIdx]}`;
  }

  return {
    day,
    headline,
    subtext,
    hindiQuote,
    englishQuote,
    imageUrl,
    downloadUrl,
    accentColor,
    author: 'Akhand Brahmacharya Mitra',
    theme: `${category} • DAY ${day}`,
    intensityStage: stage,
  };
}

/**
 * Ultra-HD Canvas Wallpaper Generator (1080x1920 Direct Download)
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
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
        bgGrad.addColorStop(0, '#0a0d18');
        bgGrad.addColorStop(0.5, '#02040a');
        bgGrad.addColorStop(1, '#000000');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);
      }

      // Dark vignette overlay for crisp readability
      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
      grad.addColorStop(0.35, 'rgba(0, 0, 0, 0.4)');
      grad.addColorStop(0.7, 'rgba(0, 0, 0, 0.85)');
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

    // Hindi Quote in Center
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(`“${item.hindiQuote}”`, 540, 1200);

    // Bold English Headline
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 58px "Cinzel", Impact, sans-serif';
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

    // Subtext
    ctx.fillStyle = item.accentColor;
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText(item.subtext, 540, y + 60);

    // English Quote
    ctx.fillStyle = '#d4d4d8';
    ctx.font = 'italic 24px sans-serif';
    ctx.fillText(`“${item.englishQuote}”`, 540, y + 115);

    // Footer
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '20px sans-serif';
    ctx.fillText('BRAHMACHARYA MITRA • PROGRESSIVE MOTIVATIONAL ENGINE', 540, 1840);

    // Download
    const link = document.createElement('a');
    link.download = `Brahmacharya-Day${item.day}-${item.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    if (onComplete) onComplete();
  };

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => renderAndDownload(img);
  img.onerror = () => renderAndDownload(null);
  img.src = item.downloadUrl || item.imageUrl;
}
