import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import BookRecommendations from './components/BookRecommendations';
import FAQ from './components/FAQ';
import SEO from './components/SEO.tsx';
import Footer from './components/Footer';
import InstallPrompt from './components/InstallPrompt';
import PanicModal from './components/PanicModal';
import BrainFogModal from './components/BrainFogModal';
import CalculatorModal from './components/CalculatorModal';
import PrivacyModal from './components/PrivacyModal';

export default function App() {
  return (
    <div className="bg-[#02040a] text-zinc-100 min-h-screen relative selection:bg-amber-400 selection:text-black overflow-x-hidden antialiased w-full">
      {/* ── SEO Metadata & Structured Schema ── */}
      <SEO />

      {/* ── Navigation Header ── */}
      <Header />

      {/* ── PWA Install Prompt Banner ── */}
      <InstallPrompt />

      {/* ── Modals ── */}
      <PanicModal />
      <BrainFogModal />
      <CalculatorModal />
      <PrivacyModal />

      {/* ── Main Landing Content ── */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Real-time Streak Timer & Daily Habit Transformation Carousel */}
        <Dashboard />

        {/* Foundational Book Recommendations */}
        <BookRecommendations />

        {/* FAQ Section */}
        <section id="faq-section" className="py-12 px-4 max-w-4xl mx-auto">
          <FAQ />
        </section>
      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}
