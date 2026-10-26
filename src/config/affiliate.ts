// Verified Affiliate Configuration & Recommended Books Catalogue
// Clean, high-converting metadata with quotes, persuasive descriptions, and masked store links

export interface RecommendedBook {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: string;
  badge: string;
  badgeColor: string;
  quote: string;
  description: string;
  amazonUrl: string;
  flipkartUrl: string;
}

export const RECOMMENDED_BOOKS: RecommendedBook[] = [
  {
    id: 'premanand_brahmacharya',
    title: 'Brahmacharya: Kab, Kyon Aur Kaise?',
    author: 'Shri Hit Premanand Ji Maharaj',
    category: 'Vedic Guidance',
    rating: '5.0/5',
    badge: 'Spiritual Classic',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    quote: 'वीर्य रक्षा ही जीवन का असली बल और आत्म-नियंत्रण की कुंजी है।',
    description: 'पूज्य प्रेमानंद जी महाराज का यह व्यावहारिक मार्गदर्शन ब्रह्मचर्य के सही अर्थ, महत्व और इसे जीवन में ढालने के अचूक नियम बताता है।',
    amazonUrl: 'https://www.amazon.in/s?k=Brahmacharya+Kab+Kyon+Aur+Kaise+Premanand+Ji&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/kjHm2DC',
  },
  {
    id: 'pratik_brahmacharya',
    title: 'Brahmacharya',
    author: 'Pratik Prajapati',
    category: 'Youth & Focus',
    rating: '4.9/5',
    badge: 'Modern Practical Guide',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    quote: 'अपनी ऊर्जा को भटकने न दें, इसे अपने सपनों को सच करने में लगाएं।',
    description: 'युवाओं के लिए लिखी गई यह एक मॉडर्न और प्रैक्टिकल गाइड है, जो आपको कामवासना से मुक्त होकर फोकस और स्टेमिना बढ़ाने में मदद करेगी।',
    amazonUrl: 'https://www.amazon.in/s?k=Brahmacharya+Pratik+Prajapati&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/viK2Sxs',
  },
  {
    id: 'sivananda_practice',
    title: 'Practice of Brahmacharya',
    author: 'Swami Sivananda (Divine Life Society)',
    category: 'Sacred Scripture & Science',
    rating: '4.9/5',
    badge: 'Foundational Masterwork',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    quote: 'Purity of mind leads to ultimate victory and supreme peace.',
    description: 'स्वामी शिवानंद जी का यह क्लासिक ग्रंथ ब्रह्मचर्य पालन के आध्यात्मिक और वैज्ञानिक तरीकों का खजाना है, जो मन को वश में करना सिखाता है।',
    amazonUrl: 'https://www.amazon.in/s?k=Practice+of+Brahmacharya+Swami+Sivananda&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/N9R1NDB',
  },
  {
    id: 'subconscious_mind',
    title: 'The Power of Your Subconscious Mind',
    author: 'Joseph Murphy',
    category: 'Mind Mastery',
    rating: '4.8/5',
    badge: 'Global Bestseller',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    quote: 'जैसा आप सोचेंगे, वैसा ही आप बनेंगे। अपने अवचेतन मन को बदलें।',
    description: 'बुरी आदतों को छोड़ने और मन पर नियंत्रण पाने के लिए अपने सबकॉन्शियस माइंड को री-वायर करने की सबसे बेस्ट सेलिंग गाइड।',
    amazonUrl: 'https://www.amazon.in/s?k=The+Power+of+Your+Subconscious+Mind&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/c5VRxrl',
  },
  {
    id: 'your_brain_on_porn',
    title: 'Your Brain on Porn',
    author: 'Gary Wilson',
    category: 'Neuroscience & Detox',
    rating: '4.9/5',
    badge: 'Addiction Recovery',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    quote: "Break the addiction, reclaim your brain's natural dopamine and vitality.",
    description: 'डिजिटल एडिक्शन और पोर्नोग्राफी के मस्तिष्क पर पड़ने वाले असर का साइंटिफिक विश्लेषण। यह पुस्तक आपको ब्रेन फॉग से बाहर निकालकर मानसिक स्पष्टता देती है।',
    amazonUrl: 'https://www.amazon.in/s?k=Your+Brain+on+Porn+Gary+Wilson&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/TkMhXQ2',
  },
  {
    id: 'practice_brahmacharya_alt',
    title: 'Practice of Brahmacharya (Alternate Edition)',
    author: 'Swami Sivananda & Ancient Acharyas',
    category: 'Self-Mastery & Ojas',
    rating: '4.8/5',
    badge: 'Deeper Sadhana',
    badgeColor: 'bg-amber-400/20 text-amber-200 border-amber-400/40',
    quote: 'Self-mastery is the highest form of power.',
    description: 'इंद्रिय निग्रह और ब्रह्मचर्य साधना की गहराई में जाने के लिए एक शानदार पुस्तक, जो मन की शक्ति और एकाग्रता को कई गुना बढ़ा देती है।',
    amazonUrl: 'https://www.amazon.in/s?k=Practice+of+Brahmacharya&tag=banty567-21',
    flipkartUrl: 'https://fktr.in/fcqbt8N',
  },
];
