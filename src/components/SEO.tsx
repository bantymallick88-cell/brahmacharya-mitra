import React from 'react';

export const SEO_CONFIG = {
  title: "Brahmacharya Mitra — Celibacy, NoFap & Semen Retention Tracker",
  description: "Overcome porn addiction, brain fog, and relapse cycles with Brahmacharya Mitra. Track your celibacy & NoFap streak, master semen retention, and transmute energy.",
  keywords: "brahmacharya, celibacy, nofap, porn addiction recovery, semen retention tracker, dopamine detox, brain fog recovery, ojas transmutation, quit porn, streak counter",
  author: "Brahmacharya Mitra",
  siteUrl: "https://bantymallick88-cell.github.io/brahmacharya-mitra/",
  image: "photo_mahadev.jpg",
  type: "website",
};

export default function SEO() {
  const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/';
  const ogImageUrl = `${baseUrl}${SEO_CONFIG.image}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": SEO_CONFIG.title,
    "description": SEO_CONFIG.description,
    "url": SEO_CONFIG.siteUrl,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "Brahmacharya Mitra",
      "url": SEO_CONFIG.siteUrl
    }
  };

  return (
    <>
      <title>{SEO_CONFIG.title}</title>
      <meta name="title" content={SEO_CONFIG.title} />
      <meta name="description" content={SEO_CONFIG.description} />
      <meta name="keywords" content={SEO_CONFIG.keywords} />
      <meta name="author" content={SEO_CONFIG.author} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={SEO_CONFIG.type} />
      <meta property="og:url" content={SEO_CONFIG.siteUrl} />
      <meta property="og:title" content={SEO_CONFIG.title} />
      <meta property="og:description" content={SEO_CONFIG.description} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={SEO_CONFIG.siteUrl} />
      <meta property="twitter:title" content={SEO_CONFIG.title} />
      <meta property="twitter:description" content={SEO_CONFIG.description} />
      <meta property="twitter:image" content={ogImageUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
