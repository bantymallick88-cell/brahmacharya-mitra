export type LanguageCode = 
  | 'en' // English (Default)
  | 'hi' // Hindi (हिंदी)
  | 'or' // Odia (ଓଡ଼ିଆ)
  | 'bn' // Bengali (বাংলা)
  | 'mr' // Marathi (मराठी)
  | 'te' // Telugu (తెలుగు)
  | 'ta' // Tamil (தமிழ்)
  | 'gu' // Gujarati (ગુજરાતી)
  | 'kn' // Kannada (ಕನ್ನಡ)
  | 'pa' // Punjabi (ਪੰਜਾਬੀ)
  | 'ru' // Russian (Русский)
  | 'es' // Spanish (Español)
  | 'fr' // French (Français)
  | 'de' // German (Deutsch)
  | 'ar'; // Arabic (العربية - RTL)

export interface LanguageMeta {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  group: 'Indian' | 'Global';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  // Indian Languages
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr', group: 'Indian' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', dir: 'ltr', group: 'Indian' },
  // Global Languages
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺', dir: 'ltr', group: 'Global' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸', dir: 'ltr', group: 'Global' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr', group: 'Global' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪', dir: 'ltr', group: 'Global' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', group: 'Global' },
];

export interface TranslationDictionary {
  nav: {
    calculator: string;
    brainFog: string;
    aiMentor: string;
    courses: string;
    deities: string;
    books: string;
    supportUs: string;
    panicMode: string;
    streakDay: string;
    donate: string;
    language: string;
    currentStreak: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    title3: string;
    subheadlineHindi: string;
    description: string;
    startStreakBtn: string;
    panicBtn: string;
    brainFogBtn: string;
    calculatorBtn: string;
    stat1Number: string;
    stat1Label: string;
    stat2Number: string;
    stat2Label: string;
    stat3Number: string;
    stat3Label: string;
    stat4Number: string;
    stat4Label: string;
  };
  streak: {
    badge: string;
    akhandStreak: string;
    daysClean: string;
    minus1Day: string;
    plus1Day: string;
    customDaysPlaceholder: string;
    save: string;
    resetPrompt: string;
    pledgeTaken: string;
    takePledge: string;
    currentStageLabel: string;
    chakraLabel: string;
    progressTo90: string;
    veeryaDropsSaved: string;
    veeryaDesc: string;
    hoursReclaimed: string;
    hoursDesc: string;
    shlokaHighlight: string;
    shlokaText: string;
  };
  brainFog: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    clarityScoreLabel: string;
    clarityLevel: string;
    recommendedAction: string;
    resetAssessment: string;
    timelineTitle: string;
    timeline1Title: string;
    timeline1Desc: string;
    timeline2Title: string;
    timeline2Desc: string;
    timeline3Title: string;
    timeline3Desc: string;
  };
  calculator: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    paramsTitle: string;
    addictionDuration: string;
    yearsUnit: string;
    wastedTime: string;
    hoursPerDayUnit: string;
    hoursPerDayDesc: string;
    directSpend: string;
    directSpendDesc: string;
    truthQuote: string;
    youthVanishedTitle: string;
    hoursUnit: string;
    wakingYearsText: string;
    veeryaLostTitle: string;
    dischargesText: string;
    dropsText: string;
    careerLossTitle: string;
    careerLossDesc: string;
    nervousDamageTitle: string;
    nervousDamageDesc: string;
    socialDamageTitle: string;
    damagePoint1: string;
    damagePoint2: string;
    damagePoint3: string;
    stopLossTitle: string;
    stopLossDesc: string;
    initializeBtn: string;
  };
  courses: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    dayRoadmap: string;
    programPhases: string;
    milestoneDays: string;
    dailyMantra: string;
    morningPillar: string;
    physicalPillar: string;
    mentalPillar: string;
    nightPillar: string;
    microTaskCheck: string;
    freeBadge: string;
  };
  aiMentor: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    stepOf: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    continueTriggerBtn: string;
    continueScheduleBtn: string;
    generateBtn: string;
    backBtn: string;
    customBadge: string;
    copyBtn: string;
    copiedBtn: string;
    dailyMantra: string;
    morningBlock: string;
    physicalBlock: string;
    focusBlock: string;
    nightBlock: string;
    killswitchBlock: string;
    placeholderTitle: string;
    placeholderDesc: string;
    quickDefaultBtn: string;
  };
  panic: {
    badge: string;
    stopTitle: string;
    stepBackTitle: string;
    quote: string;
    pranayamaTitle: string;
    pauseBtn: string;
    resumeBtn: string;
    breathBelly: string;
    breathChin: string;
    breathTension: string;
    breathStillness: string;
    kumbhakaDesc: string;
    shockProtocolTitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    pushupReps: string;
    add5Btn: string;
    waveReminder: string;
    victoriousBtn: string;
  };
  deities: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    exploreLesson: string;
    sacredMantra: string;
    lessonForYouth: string;
    keyVirtues: string;
    divineQuote: string;
  };
  books: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    keyLessons: string;
    getOnAmazon: string;
    affiliateNotice: string;
  };
  donate: {
    badge: string;
    title: string;
    titleHighlight: string;
    subtitleHindi: string;
    description: string;
    selectAmountLabel: string;
    customAmountPlaceholder: string;
    officialUpiLabel: string;
    copyUpiBtn: string;
    upiCopiedBtn: string;
    payViaUpiBtn: string;
    fastServers: string;
    aiTokens: string;
    youthOutreach: string;
    scanQrLabel: string;
    scanQrDesc: string;
  };
  footer: {
    vedicRef: string;
    shlokaQuote: string;
    shlokaMeaning: string;
    panicShieldBtn: string;
    trackStreakBtn: string;
    brandDesc: string;
    coreToolsTitle: string;
    curriculumTitle: string;
    missionTitle: string;
    missionDesc: string;
    contributeSevaBtn: string;
    copyright: string;
    backToTop: string;
    medicalDisclaimer: string;
  };
}
