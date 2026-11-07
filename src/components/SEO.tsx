import React, { useEffect } from 'react';
import { useTranslation } from '../i18n';

export const SEO_CONFIG = {
  title: "Brahmacharya Mitra — Ultimate Sobriety & Habit Transformation Suite",
  description: "Master celibacy, track sobriety streaks, break urges with 4-7-8 breathwork, and access sacred Vedic scriptures.",
  keywords: "brahmacharya, celibacy, nofap, sobriety suite, habit transformation, porn addiction recovery, semen retention tracker, dopamine detox, brain fog recovery, ojas transmutation, quit porn, streak counter, swami sivananda brahmacharya, premanand ji maharaj brahmacharya, celibacy benefits 90 days, urge breaker 4-7-8 breathing",
  author: "Brahmacharya Mitra",
  siteUrl: "https://brahmacharya.fixeehub.com/",
  image: "logo.png",
  type: "website",
};

export default function SEO() {
  const { currentLang } = useTranslation();

  const titleByLang: Record<string, string> = {
    hi: "ब्रह्मचर्य मित्र — वीर्य रक्षा, ब्रह्मचर्य एवं NoFap साधना ट्रैकर",
    or: "ବ୍ରହ୍ମଚର୍ଯ୍ୟ ମିତ୍ର — ବୀର୍ଯ୍ୟ ରକ୍ଷା, ବ୍ରହ୍ମଚର୍ଯ୍ୟ ଓ NoFap ସାଧନା ଟ୍ରାକର୍",
    en: "Brahmacharya Mitra — Ultimate Sobriety & Habit Transformation Suite"
  };

  const descByLang: Record<string, string> = {
    hi: "ब्रह्मचर्य मित्र के साथ अश्लीलता की लत, ब्रेन फॉग और पतन चक्र पर विजय प्राप्त करें। अपनी ब्रह्मचर्य स्ट्रीक ट्रैक करें, ओजस रूपांतरण सीखें और 29 निःशुल्क पवित्र शास्त्र पढ़ें।",
    or: "ବ୍ରହ୍ମଚର୍ଯ୍ୟ ମିତ୍ର ସହିତ ଅଶ୍ଳୀଳତା, ବ୍ରେନ୍ ଫଗ୍ ଓ ପତନ ଚକ୍ରରୁ ମୁକ୍ତି ପାଆନ୍ତୁ। ଆପଣଙ୍କ ବ୍ରହ୍ମଚର୍ଯ୍ୟ ଷ୍ଟ୍ରିକ୍ ଟ୍ରାକ୍ କରନ୍ତୁ ଏବଂ ୨୯ଟି ମାଗଣା ପବିତ୍ର ପୁସ୍ତକ ପଢ଼ନ୍ତୁ।",
    en: "Master celibacy, track sobriety streaks, break urges with 4-7-8 breathwork, and access sacred Vedic scriptures."
  };

  const activeTitle = titleByLang[currentLang] || titleByLang.en;
  const activeDesc = descByLang[currentLang] || descByLang.en;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = activeTitle;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', activeDesc);
    }
  }, [activeTitle, activeDesc]);

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/')
    : '/';
  const ogImageUrl = `${SEO_CONFIG.siteUrl}${SEO_CONFIG.image}`;

  // 1. WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SEO_CONFIG.siteUrl}#website`,
    "name": "Brahmacharya Mitra",
    "alternateName": ["BrahmacharyaMitra", "ब्रह्मचर्य मित्र", "Brahmacharya Tracker", "NoFap Semen Retention Tracker"],
    "url": SEO_CONFIG.siteUrl,
    "description": SEO_CONFIG.description,
    "inLanguage": ["en", "hi", "sa"],
    "publisher": {
      "@type": "Organization",
      "name": "Brahmacharya Mitra",
      "url": SEO_CONFIG.siteUrl,
      "logo": ogImageUrl,
      "email": "bantyxyz13@gmail.com"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SEO_CONFIG.siteUrl}books/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // 2. WebApplication Schema
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SEO_CONFIG.siteUrl}#webapp`,
    "name": SEO_CONFIG.title,
    "description": SEO_CONFIG.description,
    "url": SEO_CONFIG.siteUrl,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All (PWA, Web, Android, iOS, Desktop)",
    "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-Time Reactive Celibacy & NoFap Streak Counter",
      "Emergency Urge Breaker (Panic Mode) with 4-7-8 Breathwork",
      "Dopamine Burnout & Brain Fog Diagnostic Tracker",
      "Relapse Cost Financial & Energy Diagnostic Calculator",
      "29 Protected Sacred Shastras & Research PDFs In-App Sanctuary Reader",
      "Daily Sadhana Dashboard with Speedometer Progress Dial & 108 Japa Mala",
      "Global Anonymous Sadhak Leaderboard with Saffron Gold Podium"
    ],
    "author": {
      "@type": "Organization",
      "name": "Brahmacharya Mitra",
      "url": SEO_CONFIG.siteUrl
    }
  };

  // 3. Curated Book ItemList Schema for AI Overviews & Google Books Rich Snippets
  const booksSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sacred Brahmacharya & Mind Mastery Literature Collection",
    "description": "Authentic foundational books and neuroscience papers on celibacy, semen retention, dopamine neuroplasticity, and mind control.",
    "numberOfItems": 6,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": {
          "@type": "Book",
          "name": "Brahmacharya: Kab, Kyon Aur Kaise?",
          "alternateName": "ब्रह्मचर्य: कब, क्यों और कैसे?",
          "author": { "@type": "Person", "name": "Pujya Shri Hit Premanand Govind Sharan Ji Maharaj" },
          "inLanguage": "Hindi",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Spiritual Sadhana & Celibacy",
          "isAccessibleForFree": true,
          "description": "Supreme spiritual discourse on the preservation of seminal energy (Virya Raksha), sacred Naam Jap, and transcending sensual cravings."
        }
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": {
          "@type": "Book",
          "name": "The Practice of Brahmacharya",
          "author": { "@type": "Person", "name": "Swami Sivananda Saraswati" },
          "inLanguage": "English",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Yoga Philosophy & Celibacy",
          "isAccessibleForFree": true,
          "description": "The monumental English handbook on celibacy, transmutation of sexual energy into divine Ojas, and physical and mental health mastery."
        }
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": {
          "@type": "Book",
          "name": "Your Brain on Porn: Internet Pornography and the Emerging Science of Addiction",
          "author": { "@type": "Person", "name": "Gary Wilson" },
          "inLanguage": "English",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Neuroscience & Addiction Recovery",
          "isAccessibleForFree": true,
          "description": "Groundbreaking neurological research detailing how high-speed internet pornography induces dopamine D2 receptor downregulation and prefrontal hypofrontality."
        }
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": {
          "@type": "Book",
          "name": "Viveka Chudamani (Crest-Jewel of Discrimination)",
          "alternateName": "विवेक चूडामणि",
          "author": { "@type": "Person", "name": "Adi Shankaracharya" },
          "inLanguage": "Sanskrit/Hindi",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Advaita Vedanta & Mind Mastery",
          "isAccessibleForFree": true,
          "description": "Timeless Advaita scripture outlining non-attachment, mastery over the five sheaths (Pancha Kosha), and supreme intellectual clarity."
        }
      },
      {
        "@type": "ListItem",
        "position": 5,
        "item": {
          "@type": "Book",
          "name": "Brahmacharya Sadhana Rahasya",
          "alternateName": "ब्रह्मचर्य साधना रहस्य",
          "author": { "@type": "Organization", "name": "Vedic Swadhyaya Parishad" },
          "inLanguage": "Hindi",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Vedic Wisdom",
          "isAccessibleForFree": true,
          "description": "Esoteric principles of seminal energy conservation, prana control, and mind transmutation into divine Ojas and Tejas."
        }
      },
      {
        "@type": "ListItem",
        "position": 6,
        "item": {
          "@type": "Book",
          "name": "Divya Prerana Prakash",
          "alternateName": "दिव्य प्रेरणा प्रकाश",
          "author": { "@type": "Person", "name": "Sant Shri Asharamji Bapu" },
          "inLanguage": "Hindi",
          "bookFormat": "https://schema.org/EBook",
          "genre": "Youth Character & Energy Conservation",
          "isAccessibleForFree": true,
          "description": "Essential guidance for students and youth to protect physical vitality, develop photographic memory, and conquer lust."
        }
      }
    ]
  };

  return (
    <>
      <title>{activeTitle}</title>
      <meta name="title" content={activeTitle} />
      <meta name="description" content={activeDesc} />
      <meta name="keywords" content={SEO_CONFIG.keywords} />
      <meta name="author" content={SEO_CONFIG.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

      {/* AI Overview / LLM Indexing Meta */}
      <meta name="classification" content="Health, Spirituality, Neuroscience, Celibacy, Mental Wellness" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={SEO_CONFIG.type} />
      <meta property="og:site_name" content="Brahmacharya Mitra" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="og:url" content={SEO_CONFIG.siteUrl} />
      <meta property="og:title" content={SEO_CONFIG.title} />
      <meta property="og:description" content={SEO_CONFIG.description} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter Cards */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@BrahmacharyaMitra" />
      <meta property="twitter:creator" content="@BrahmacharyaMitra" />
      <meta property="twitter:url" content={SEO_CONFIG.siteUrl} />
      <meta property="twitter:title" content={SEO_CONFIG.title} />
      <meta property="twitter:description" content={SEO_CONFIG.description} />
      <meta property="twitter:image" content={ogImageUrl} />
      <meta name="twitter:label1" content="Category" />
      <meta name="twitter:data1" content="Spiritual Wellness & Semen Retention" />
      <meta name="twitter:label2" content="Sanctuary Library" />
      <meta name="twitter:data2" content="29 Authentic Free Books" />

      {/* JSON-LD Structured Data: WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* JSON-LD Structured Data: WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* JSON-LD Structured Data: Books Collection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(booksSchema) }}
      />
    </>
  );
}
