import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Search, Download, ExternalLink, Sparkles,
  Filter, Tag, ArrowLeft, BookMarked, Globe, Layers,
  CheckCircle2, Share2, Flame, ShieldCheck
} from 'lucide-react';
import { LIBRARY_BOOKS, LIBRARY_CATEGORIES, type LibraryBook } from '../data/libraryBooks';

const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
  ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/')
  : '/';

export default function LibraryView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Books');
  const [selectedLanguage, setSelectedLanguage] = useState<'All' | 'Hindi' | 'English'>('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredBooks = useMemo(() => {
    return LIBRARY_BOOKS.filter((book) => {
      // Category filter
      if (selectedCategory !== 'All Books' && book.category !== selectedCategory) {
        return false;
      }

      // Language filter
      if (selectedLanguage !== 'All') {
        if (selectedLanguage === 'Hindi' && !book.language.includes('Hindi')) return false;
        if (selectedLanguage === 'English' && !book.language.includes('English')) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = book.title.toLowerCase().includes(q);
        const matchesHindi = book.hindiTitle?.toLowerCase().includes(q);
        const matchesAuthor = book.author.toLowerCase().includes(q);
        const matchesDesc = book.description.toLowerCase().includes(q);
        const matchesCategory = book.category.toLowerCase().includes(q);
        const matchesTags = book.tags.some((t) => t.toLowerCase().includes(q));
        const matchesFileName = book.fileName.toLowerCase().includes(q);

        return (
          matchesTitle ||
          matchesHindi ||
          matchesAuthor ||
          matchesDesc ||
          matchesCategory ||
          matchesTags ||
          matchesFileName
        );
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedLanguage]);

  const handleShareBook = (book: LibraryBook) => {
    const bookUrl = `${window.location.origin}${baseUrl}book/${encodeURIComponent(book.fileName)}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${book.title} - Free Brahmacharya & Mind Mastery PDF: ${bookUrl}`);
      setCopiedId(book.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const getPdfUrl = (fileName: string) => `${baseUrl}book/${encodeURIComponent(fileName)}`;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* ── Top Breadcrumb & Navigation Bar ── */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <a
          href={baseUrl}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 hover:bg-zinc-850 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white text-xs font-bold transition shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Back to Home</span>
        </a>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <BookMarked className="w-3.5 h-3.5 text-amber-400" />
            <span>29 Sacred Books Online</span>
          </span>
        </div>
      </div>

      {/* ── Hero Showcase Banner ── */}
      <div className="relative rounded-3xl bg-zinc-950/85 border border-amber-500/30 p-6 sm:p-10 mb-10 overflow-hidden backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] text-center">
        {/* Ambient Aurora Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(245,158,11,0.18)_0%,rgba(109,40,217,0.12)_50%,transparent_100%)] blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Grand Sanatan & Modern Library</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white tracking-tight leading-tight">
            The Sacred{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-600 bg-clip-text text-transparent">
              Brahmacharya Library
            </span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
            Explore 29 complete, transformative PDF books and research papers spanning classical Vedic scriptures,
            neuroscience of porn recovery, seminal energy transmutation into Ojas, and youth habit mastery. 100% free for all sadhaks.
          </p>

          {/* Quick Stats Pill Row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" /> 29 Full PDF Books
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-amber-400" /> Hindi, Sanskrit & English
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Instant In-Browser Reading & Download
            </span>
          </div>
        </div>
      </div>

      {/* ── Interactive Search & Filter Controls ── */}
      <div className="bg-zinc-950/80 border border-amber-500/25 rounded-2xl p-4 sm:p-5 mb-8 backdrop-blur-xl shadow-lg space-y-4">
        {/* Search Bar & Language Switcher */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400/80" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title, author, keyword, shastra, or language..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 focus:border-amber-400 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none transition shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500 hover:text-white px-1.5 py-0.5 rounded bg-zinc-800"
              >
                Clear
              </button>
            )}
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 shrink-0 w-full sm:w-auto justify-center">
            {(['All', 'Hindi', 'English'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lang === 'All' ? '🌐 All Lang' : lang === 'Hindi' ? '🇮🇳 Hindi' : '🇬🇧 English'}
              </button>
            ))}
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0 hidden sm:block" />
          {LIBRARY_CATEGORIES.map((cat) => {
            const count =
              cat === 'All Books'
                ? LIBRARY_BOOKS.length
                : LIBRARY_BOOKS.filter((b) => b.category === cat).length;
            const isSelected = selectedCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-md shadow-amber-500/25'
                    : 'bg-zinc-900/70 hover:bg-zinc-850 text-zinc-400 hover:text-amber-200 border border-zinc-800/80 hover:border-amber-500/40'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? 'bg-zinc-950/30 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Results Count Indicator ── */}
      <div className="flex items-center justify-between mb-6 px-1 text-xs text-zinc-400">
        <span>
          Showing <span className="text-amber-400 font-bold">{filteredBooks.length}</span> of 29 Books
          {selectedCategory !== 'All Books' && (
            <span className="text-zinc-500"> in "{selectedCategory}"</span>
          )}
          {searchQuery && (
            <span className="text-zinc-500"> matching "{searchQuery}"</span>
          )}
        </span>

        {(searchQuery || selectedCategory !== 'All Books' || selectedLanguage !== 'All') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedLanguage('All');
            }}
            className="text-amber-400 hover:underline cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* ── 29 Books Grid ── */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-16 bg-zinc-950/60 border border-zinc-800 rounded-3xl p-8">
          <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white font-cinzel">No Books Found</h3>
          <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto">
            No scriptures or books matched your search query. Try clearing filters or searching for different keywords.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Books');
              setSelectedLanguage('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold hover:bg-amber-500/30 transition cursor-pointer"
          >
            View All 29 Books
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredBooks.map((book) => {
            const pdfUrl = getPdfUrl(book.fileName);

            return (
              <div
                key={book.id}
                className="group relative rounded-3xl bg-zinc-950/85 border border-amber-500/25 hover:border-amber-400/70 p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle Amber Beam on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Badges & Meta */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/35">
                      {book.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400">
                        {book.language}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-amber-400/90">
                        {book.sizeMb} MB
                      </span>
                    </div>
                  </div>

                  {/* Book Title & Hindi Title */}
                  <div className="mb-2">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-cinzel leading-snug">
                      {book.title}
                    </h3>
                    {book.hindiTitle && book.hindiTitle !== book.title && (
                      <p className="text-xs text-amber-400/80 font-sanskrit mt-0.5">
                        {book.hindiTitle}
                      </p>
                    )}
                  </div>

                  {/* Author Line */}
                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-3">
                    <span className="text-amber-500 font-bold">By:</span>
                    <span className="text-zinc-300 font-medium truncate">{book.author}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                    {book.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {book.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-900/80 text-zinc-400 border border-zinc-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-2">
                  {/* Direct Read / Open PDF Button */}
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs transition flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
                    title={`Read ${book.title} Online`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read / Open PDF</span>
                    <ExternalLink className="w-3 h-3 text-zinc-900" />
                  </a>

                  {/* Direct Download Button */}
                  <a
                    href={pdfUrl}
                    download={book.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-white transition cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                    title={`Download ${book.fileName}`}
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                  </a>

                  {/* Share Link Button */}
                  <button
                    onClick={() => handleShareBook(book)}
                    className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/30 text-zinc-400 hover:text-amber-300 transition cursor-pointer active:scale-95 flex items-center justify-center shrink-0"
                    title="Copy Book Link"
                  >
                    {copiedId === book.id ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
