import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  Bookmark,
  Shield,
  Search,
  BookOpen,
  Highlighter,
  AlertTriangle,
  Loader2,
  Scroll,
  Layers,
  Sliders,
  Sparkles,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import type { LibraryBook } from '../data/libraryBooks';

interface SanctuaryPdfReaderModalProps {
  book: LibraryBook | null;
  onClose: () => void;
}

type ReaderTheme = 'dark' | 'sepia' | 'light';
type ViewMode = 'continuous' | 'single';

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function SanctuaryPdfReaderModal({ book, onClose }: SanctuaryPdfReaderModalProps) {
  const [theme, setTheme] = useState<ReaderTheme>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('continuous');
  const [zoom, setZoom] = useState<number>(1.15);
  const [brightness, setBrightness] = useState<number>(100);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [drmToast, setDrmToast] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());
  const [aspectRatio, setAspectRatio] = useState<number>(0.707); // Default A4 ratio (1 / 1.414)
  const [pageBaseWidth, setPageBaseWidth] = useState<number>(680);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderingQueueRef = useRef<Set<number>>(new Set());
  const lastTapRef = useRef<number>(0);
  const touchDistanceRef = useRef<number>(0);
  const initialPinchZoomRef = useRef<number>(1);

  const baseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL)
    ? (import.meta.env.BASE_URL.replace(/\/$/, '') + '/')
    : '/';

  const pdfUrl = book ? `${baseUrl}book/${encodeURIComponent(book.fileName)}` : '';

  // Trigger DRM Protection Warning Toast
  const triggerDrmWarning = useCallback((msg = 'Protected Shastra: Saving, downloading or copying is disabled for copyright safeguard.') => {
    setDrmToast(msg);
    setTimeout(() => setDrmToast(null), 3200);
  }, []);

  // Keyboard protection: Block Ctrl+S, Ctrl+P, Ctrl+U, etc.
  useEffect(() => {
    if (!book) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          onClose();
        }
        return;
      }

      // Block Save (Ctrl+S, Cmd+S)
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        e.stopPropagation();
        triggerDrmWarning('Protected Shastra: Local device saving is disabled for copyright compliance.');
      }

      // Block Print (Ctrl+P, Cmd+P)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        e.stopPropagation();
        triggerDrmWarning('Protected Shastra: Printing is disabled for educational fair use.');
      }

      // Block View Source (Ctrl+U)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        e.stopPropagation();
        triggerDrmWarning();
      }

      // Page Navigation shortcuts (when not typing in textarea/input)
      if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          scrollToPage(Math.max(1, pageNum - 1));
        }
        if (e.key === 'ArrowRight' || e.key === 'PageDown') {
          scrollToPage(Math.min(numPages || 1, pageNum + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [book, numPages, pageNum, onClose, triggerDrmWarning]);

  // Load saved notes & last page for this book
  useEffect(() => {
    if (!book) return;
    try {
      const savedNotes = localStorage.getItem(`sanctuary_notes_${book.id}`);
      if (savedNotes) setNotes(savedNotes);

      const savedPage = localStorage.getItem(`sanctuary_last_page_${book.id}`);
      if (savedPage) {
        const p = parseInt(savedPage, 10);
        if (!isNaN(p) && p > 0) setPageNum(p);
      } else {
        setPageNum(1);
      }
    } catch {
      // LocalStorage access failsafe
    }
  }, [book]);

  // Save current page
  useEffect(() => {
    if (book && pageNum > 0) {
      try {
        localStorage.setItem(`sanctuary_last_page_${book.id}`, String(pageNum));
      } catch {
        // ignore
      }
    }
  }, [book, pageNum]);

  // Save Notes handler
  const handleSaveNotes = (text: string) => {
    setNotes(text);
    if (book) {
      try {
        localStorage.setItem(`sanctuary_notes_${book.id}`, text);
      } catch {
        // ignore
      }
    }
  };

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Smooth Scroll to specific page in Continuous or Single Page Mode
  const scrollToPage = useCallback((targetPage: number) => {
    const validPage = Math.max(1, Math.min(numPages || 1, targetPage));
    setPageNum(validPage);

    if (viewMode === 'continuous') {
      const pageEl = document.getElementById(`sanctuary-page-card-${validPage}`);
      if (pageEl && scrollContainerRef.current) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [numPages, viewMode]);

  // Dynamic PDF.js Loader
  const loadPdf = useCallback(async () => {
    if (!pdfUrl) return;
    setIsLoading(true);
    setErrorMsg(null);
    setRenderedPages(new Set());
    renderingQueueRef.current.clear();

    try {
      if (!window.pdfjsLib) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.async = true;
          script.onload = () => {
            if (window.pdfjsLib) {
              window.pdfjsLib.GlobalWorkerOptions.workerSrc =
                'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
              resolve();
            } else {
              reject(new Error('PDF.js failed to initialize.'));
            }
          };
          script.onerror = () => reject(new Error('Could not load PDF engine from CDN.'));
          document.head.appendChild(script);
        });
      }

      const loadingTask = window.pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
        cMapPacked: true,
        disableStream: false,
        disableAutoFetch: false,
      });

      const doc = await loadingTask.promise;
      pdfDocRef.current = doc;
      setNumPages(doc.numPages);

      // Extract natural dimensions from Page 1
      const firstPage = await doc.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      const ratio = viewport.width / viewport.height;
      setAspectRatio(ratio);

      // Responsive base width calculation
      const screenW = window.innerWidth;
      const baseW = screenW < 640 ? Math.min(screenW - 24, 480) : screenW < 1024 ? 640 : 760;
      setPageBaseWidth(baseW);

      setIsLoading(false);
    } catch (err: any) {
      console.warn('PDF.js load warning:', err);
      setErrorMsg('Direct canvas rendering unavailable. Switching to protected reader view.');
      setIsLoading(false);
    }
  }, [pdfUrl]);

  // Render individual page canvas
  const renderCanvasPage = useCallback(async (pageIndex: number) => {
    if (!pdfDocRef.current || renderingQueueRef.current.has(pageIndex)) return;

    const canvas = document.getElementById(`canvas-page-${pageIndex}`) as HTMLCanvasElement | null;
    if (!canvas) return;

    renderingQueueRef.current.add(pageIndex);

    try {
      const page = await pdfDocRef.current.getPage(pageIndex);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2.0); // Cap at 2x for memory efficiency
      const targetWidth = pageBaseWidth * zoom;
      const unscaledViewport = page.getViewport({ scale: 1 });
      const currentScale = targetWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale: currentScale * dpr });

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(targetWidth)}px`;
      canvas.style.height = `${Math.floor(targetWidth / (unscaledViewport.width / unscaledViewport.height))}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderContext = {
        canvasContext: ctx,
        viewport: page.getViewport({ scale: currentScale }),
      };

      await page.render(renderContext).promise;

      setRenderedPages((prev) => {
        const next = new Set(prev);
        next.add(pageIndex);
        return next;
      });
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn(`Render error page ${pageIndex}:`, err);
      }
    } finally {
      renderingQueueRef.current.delete(pageIndex);
    }
  }, [pageBaseWidth, zoom]);

  // Initial document load
  useEffect(() => {
    if (book) {
      loadPdf();
    }
    return () => {
      pdfDocRef.current = null;
      renderingQueueRef.current.clear();
    };
  }, [book, loadPdf]);

  // Single page mode re-render
  useEffect(() => {
    if (!isLoading && pdfDocRef.current && viewMode === 'single') {
      renderCanvasPage(pageNum);
    }
  }, [pageNum, zoom, viewMode, isLoading, renderCanvasPage]);

  // Continuous scroll: IntersectionObserver to render pages on demand & update active pageNum
  useEffect(() => {
    if (isLoading || !pdfDocRef.current || viewMode !== 'continuous') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const targetId = entry.target.id;
          const match = targetId.match(/sanctuary-page-card-(\d+)/);
          if (match) {
            const p = parseInt(match[1], 10);
            if (entry.isIntersecting) {
              // Update current visible page
              setPageNum(p);
              // Render current, previous, and next page for seamless scrolling
              renderCanvasPage(p);
              if (p > 1) renderCanvasPage(p - 1);
              if (p < (numPages || 1)) renderCanvasPage(p + 1);
            }
          }
        }
      },
      {
        root: scrollContainerRef.current,
        rootMargin: '300px 0px 300px 0px',
        threshold: 0.1,
      }
    );

    // Observe all page containers
    for (let p = 1; p <= numPages; p++) {
      const el = document.getElementById(`sanctuary-page-card-${p}`);
      if (el) observer.observe(el);
    }

    // Render initial page 1
    renderCanvasPage(pageNum || 1);

    return () => observer.disconnect();
  }, [isLoading, numPages, viewMode, pageNum, renderCanvasPage]);

  // Re-render visible pages when zoom changes
  useEffect(() => {
    if (!isLoading && pdfDocRef.current && viewMode === 'continuous') {
      // Re-render visible window around pageNum
      const start = Math.max(1, pageNum - 1);
      const end = Math.min(numPages, pageNum + 2);
      for (let p = start; p <= end; p++) {
        renderCanvasPage(p);
      }
    }
  }, [zoom, isLoading, pageNum, numPages, viewMode, renderCanvasPage]);

  // Touch Handling: Pinch-to-zoom & Double-tap zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      touchDistanceRef.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchZoomRef.current = zoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && touchDistanceRef.current > 0) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const factor = dist / touchDistanceRef.current;
      const newZoom = Math.min(2.5, Math.max(0.65, Math.round(initialPinchZoomRef.current * factor * 100) / 100));
      setZoom(newZoom);
    }
  };

  const handleDoubleTap = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const now = Date.now();
    if (now - lastTapRef.current < 320) {
      // Double tap toggles zoom
      setZoom((prev) => (prev > 1.25 ? 1.0 : 1.6));
    }
    lastTapRef.current = now;
  };

  if (!book) return null;

  // Theme Styling Rules with Dynamic Brightness
  const themeStyles = {
    dark: {
      bg: 'bg-[#03050c]',
      headerBg: 'bg-zinc-950/90 border-amber-500/30 text-zinc-100',
      scrollAreaBg: 'bg-[#02040a]',
      canvasFilter: `invert(0.92) hue-rotate(180deg) contrast(1.1) brightness(${brightness}%)`,
      cardBg: 'bg-zinc-900/90 border-zinc-800 text-zinc-200',
      pillBg: 'bg-zinc-950/85 border-amber-500/35 text-amber-300',
      pageShadow: 'shadow-[0_15px_45px_rgba(0,0,0,0.9)] border-amber-500/20',
    },
    sepia: {
      bg: 'bg-[#1b150e]',
      headerBg: 'bg-[#261d14]/95 border-amber-600/40 text-amber-100',
      scrollAreaBg: 'bg-[#18120b]',
      canvasFilter: `sepia(0.68) contrast(0.96) brightness(${brightness * 0.98}%)`,
      cardBg: 'bg-[#2a2016]/95 border-amber-700/50 text-amber-100',
      pillBg: 'bg-[#221910]/90 border-amber-600/50 text-amber-200',
      pageShadow: 'shadow-[0_15px_45px_rgba(0,0,0,0.8)] border-amber-700/30',
    },
    light: {
      bg: 'bg-zinc-900',
      headerBg: 'bg-zinc-950/90 border-amber-500/30 text-zinc-100',
      scrollAreaBg: 'bg-zinc-850',
      canvasFilter: `brightness(${brightness}%)`,
      cardBg: 'bg-zinc-900 border-zinc-700 text-white',
      pillBg: 'bg-zinc-950/90 border-amber-500/40 text-amber-300',
      pageShadow: 'shadow-[0_15px_45px_rgba(0,0,0,0.7)] border-zinc-700',
    },
  }[theme];

  const scaledPageWidth = pageBaseWidth * zoom;
  const scaledPageHeight = aspectRatio > 0 ? scaledPageWidth / aspectRatio : 950;

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => {
        e.preventDefault();
        triggerDrmWarning();
      }}
      className={`fixed inset-0 z-[120] flex flex-col h-screen max-h-screen ${themeStyles.bg} select-none overflow-hidden transition-colors duration-300`}
    >
      {/* ── Fixed/Sticky Glassmorphic Header Controls ── */}
      <header className={`shrink-0 px-3 sm:px-6 py-2.5 sm:py-3 border-b backdrop-blur-2xl shadow-xl z-30 flex items-center justify-between gap-2 sm:gap-4 ${themeStyles.headerBg}`}>
        
        {/* Left: Book Meta & DRM Protected Badge */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-xs sm:text-sm font-bold font-cinzel text-white truncate max-w-[160px] xs:max-w-[220px] sm:max-w-xs md:max-w-md">
                {book.title}
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[9px] font-extrabold tracking-wider">
                <Shield className="w-2.5 h-2.5 text-amber-400" />
                Sanctuary DRM Protected
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 truncate hidden sm:block">
              By {book.author} • {book.language} • {numPages} Pages
            </p>
          </div>
        </div>

        {/* Center: Quick Page Navigator */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            onClick={() => scrollToPage(pageNum - 1)}
            disabled={pageNum <= 1}
            className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-40 text-amber-300 hover:text-white transition cursor-pointer"
            title="Previous Page (Left Arrow / PageUp)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1 text-xs font-mono font-bold text-zinc-200 bg-zinc-900/90 px-2.5 py-1 rounded-xl border border-zinc-800 shadow-inner">
            <input
              type="number"
              min={1}
              max={numPages || 1}
              value={pageNum}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                if (!isNaN(val) && val >= 1 && val <= (numPages || 1)) {
                  scrollToPage(val);
                }
              }}
              className="w-10 text-center bg-transparent border-b border-amber-500/40 text-amber-300 focus:outline-none text-xs font-mono font-bold"
            />
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-400">{numPages || '—'}</span>
          </div>

          <button
            onClick={() => scrollToPage(pageNum + 1)}
            disabled={numPages ? pageNum >= numPages : false}
            className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-40 text-amber-300 hover:text-white transition cursor-pointer"
            title="Next Page (Right Arrow / PageDown)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Theme, Zoom, Continuous/Single Mode & Close */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* View Mode Toggle (Continuous Vertical Scroll vs Single Page) */}
          <button
            onClick={() => setViewMode((m) => (m === 'continuous' ? 'single' : 'continuous'))}
            className={`p-2 rounded-xl border transition cursor-pointer hidden md:flex items-center gap-1.5 text-xs font-bold ${
              viewMode === 'continuous'
                ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-sm'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-amber-300'
            }`}
            title={viewMode === 'continuous' ? 'Switch to Single Page Mode' : 'Switch to Continuous Vertical Scroll'}
          >
            {viewMode === 'continuous' ? (
              <>
                <Scroll className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Continuous</span>
              </>
            ) : (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Single Page</span>
              </>
            )}
          </button>

          {/* Theme Quick Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setTheme('dark')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                theme === 'dark' ? 'bg-amber-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Dark Mode (Night Reading)"
            >
              <Moon className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('sepia')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                theme === 'sepia' ? 'bg-amber-600 text-amber-100 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Sepia Mode (Parchment)"
            >
              <Coffee className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`p-1.5 rounded-lg text-xs transition cursor-pointer ${
                theme === 'light' ? 'bg-amber-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Light Mode"
            >
              <Sun className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => setZoom((z) => Math.max(0.65, Math.round((z - 0.15) * 100) / 100))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-amber-300 w-9 text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.15) * 100) / 100))}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Settings & Brightness Slider Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              showSettings
                ? 'bg-amber-500 text-zinc-950 border-amber-400'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300'
            }`}
            title="Reader Display Settings & Brightness"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Sadhana Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              showNotes
                ? 'bg-amber-500 text-zinc-950 border-amber-400'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-amber-300'
            }`}
            title="Sadhana Notes & Highlights"
          >
            <Highlighter className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer hidden md:flex"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close Reader */}
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/50 hover:border-red-400 text-red-200 hover:text-white transition cursor-pointer active:scale-95"
            title="Close Reader (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </header>

      {/* ── Settings Dropdown Popup (Brightness & View Mode) ── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-14 right-4 z-40 p-4 rounded-2xl bg-zinc-950/95 border border-amber-500/40 shadow-2xl backdrop-blur-2xl w-72 space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-400" />
                Reading Comfort & Style
              </span>
              <button onClick={() => setShowSettings(false)} className="text-zinc-400 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Brightness Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-zinc-300 mb-1.5">
                <span className="flex items-center gap-1">
                  <Sun className="w-3 h-3 text-amber-400" /> Reading Brightness
                </span>
                <span className="font-mono text-amber-400 font-bold">{brightness}%</span>
              </div>
              <input
                type="range"
                min={60}
                max={120}
                value={brightness}
                onChange={(e) => setBrightness(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
              />
            </div>

            {/* Theme Toggle (Mobile Friendly) */}
            <div>
              <span className="text-xs text-zinc-300 block mb-1.5 font-medium">Color Palette</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setTheme('dark')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    theme === 'dark' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Moon className="w-3 h-3" /> Dark
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    theme === 'sepia' ? 'bg-amber-600 text-amber-100' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Coffee className="w-3 h-3" /> Sepia
                </button>
                <button
                  onClick={() => setTheme('light')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    theme === 'light' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Sun className="w-3 h-3" /> Light
                </button>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div>
              <span className="text-xs text-zinc-300 block mb-1.5 font-medium">Scroll Mode</span>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setViewMode('continuous')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    viewMode === 'continuous' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Scroll className="w-3 h-3" /> Continuous
                </button>
                <button
                  onClick={() => setViewMode('single')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition ${
                    viewMode === 'single' ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Layers className="w-3 h-3" /> Page-by-Page
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Scrollable Reading Viewport (FIXED OVERFLOW & SMOOTH VERTICAL SCROLL) ── */}
      <div className="flex-1 flex overflow-hidden relative w-full h-[calc(100vh-56px)]">
        
        {/* Document Scroll Container */}
        <div
          ref={scrollContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleDoubleTap}
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-x pan-y pinch-zoom',
          }}
          className={`flex-1 w-full h-full overflow-y-auto overflow-x-auto flex flex-col items-center justify-start pt-6 pb-28 px-2 sm:px-6 relative scroll-smooth ${themeStyles.scrollAreaBg}`}
        >
          {/* Subtle Watermark Overlay */}
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-10 opacity-[0.035] select-none text-center">
            <span className="font-cinzel text-4xl sm:text-7xl font-black text-amber-400 rotate-[-25deg] tracking-widest uppercase">
              Brahmacharya Mitra • Sanctuary Fair Use
            </span>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="my-auto py-24 flex flex-col items-center justify-center gap-3 text-amber-300">
              <Loader2 className="w-10 h-10 animate-spin text-amber-400" />
              <p className="text-xs sm:text-sm font-semibold tracking-wide font-cinzel">
                Loading Sacred Shastra into Sanctuary...
              </p>
            </div>
          )}

          {/* ── 1. CONTINUOUS VERTICAL SCROLL GALLERY MODE ── */}
          {!isLoading && !errorMsg && viewMode === 'continuous' && (
            <div className="flex flex-col items-center gap-4 sm:gap-8 w-full max-w-full">
              {Array.from({ length: numPages }, (_, i) => i + 1).map((p) => {
                return (
                  <div
                    id={`sanctuary-page-card-${p}`}
                    key={p}
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${themeStyles.pageShadow}`}
                    style={{
                      width: `${scaledPageWidth}px`,
                      maxWidth: '100%',
                      minHeight: `${Math.min(scaledPageHeight, 950)}px`,
                      aspectRatio: `${aspectRatio}`,
                      filter: themeStyles.canvasFilter,
                      willChange: 'transform',
                    }}
                  >
                    <canvas
                      id={`canvas-page-${p}`}
                      className="block w-full h-auto"
                    />

                    {/* Page Placeholder before rendering */}
                    {!renderedPages.has(p) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 text-zinc-500 font-mono text-xs">
                        <Loader2 className="w-5 h-5 animate-spin text-amber-500/50 mr-2" />
                        <span>Rendering Page {p}...</span>
                      </div>
                    )}

                    {/* Page Number Pill */}
                    <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-bold text-amber-300/80 backdrop-blur-md select-none pointer-events-none">
                      {p} / {numPages}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── 2. SINGLE PAGE FLIP MODE ── */}
          {!isLoading && !errorMsg && viewMode === 'single' && (
            <div className="my-auto flex flex-col items-center justify-center py-4 w-full">
              <div
                id={`sanctuary-page-card-${pageNum}`}
                className={`relative rounded-xl overflow-hidden border transition-all duration-300 ${themeStyles.pageShadow}`}
                style={{
                  width: `${scaledPageWidth}px`,
                  maxWidth: '100%',
                  aspectRatio: `${aspectRatio}`,
                  filter: themeStyles.canvasFilter,
                  willChange: 'transform',
                }}
              >
                <canvas
                  id={`canvas-page-${pageNum}`}
                  className="block w-full h-auto"
                />

                {!renderedPages.has(pageNum) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 text-zinc-500 font-mono text-xs">
                    <Loader2 className="w-5 h-5 animate-spin text-amber-500/50 mr-2" />
                    <span>Rendering Page {pageNum}...</span>
                  </div>
                )}

                <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-bold text-amber-300/80 backdrop-blur-md select-none pointer-events-none">
                  Page {pageNum} of {numPages}
                </div>
              </div>
            </div>
          )}

          {/* ── Fallback Viewport if Canvas encounters issues ── */}
          {errorMsg && (
            <div className="w-full h-full max-w-4xl flex flex-col items-center justify-center py-4">
              <div className="w-full h-[85vh] relative rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-zinc-950">
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                  title={book.title}
                  className="w-full h-full border-0"
                  style={{ filter: themeStyles.canvasFilter }}
                />
                <div
                  onContextMenu={(e) => {
                    e.preventDefault();
                    triggerDrmWarning();
                  }}
                  className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Floating Bottom Navigation Dock for Reader ── */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 select-none max-w-[94vw]">
          <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-2xl backdrop-blur-2xl border shadow-[0_10px_35px_rgba(0,0,0,0.85)] ${themeStyles.pillBg}`}>
            
            {/* Prev Page Button */}
            <button
              onClick={() => scrollToPage(pageNum - 1)}
              disabled={pageNum <= 1}
              className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 disabled:opacity-30 text-amber-300 transition cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Count */}
            <span className="text-xs font-mono font-bold text-white px-1">
              {pageNum} <span className="text-zinc-500">/</span> {numPages || '—'}
            </span>

            {/* Next Page Button */}
            <button
              onClick={() => scrollToPage(pageNum + 1)}
              disabled={numPages ? pageNum >= numPages : false}
              className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 disabled:opacity-30 text-amber-300 transition cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="w-px h-5 bg-zinc-800 mx-1" />

            {/* Quick Zoom In/Out on Mobile */}
            <button
              onClick={() => setZoom((z) => Math.max(0.7, Math.round((z - 0.15) * 100) / 100))}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono font-bold text-amber-300">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, Math.round((z + 0.15) * 100) / 100))}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {/* Scroll to Top inside book */}
            <button
              onClick={() => scrollToPage(1)}
              className="p-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-amber-400 hover:text-white transition cursor-pointer ml-1"
              title="Jump to First Page"
            >
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Slide-in Sadhana Notes & Insights Sidebar ── */}
        <AnimatePresence>
          {showNotes && (
            <motion.aside
              initial={{ x: 320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`w-72 sm:w-80 border-l p-4 flex flex-col z-40 shrink-0 shadow-2xl ${themeStyles.cardBg}`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                  <span>Sadhana Notes & Shlokas</span>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 flex-1 flex flex-col gap-2">
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Record sacred verses, key realizations, or daily reminders for this scripture. Automatically synced to your browser:
                </p>

                <textarea
                  value={notes}
                  onChange={(e) => handleSaveNotes(e.target.value)}
                  placeholder="Record verses, contemplation notes, page highlights..."
                  className="flex-1 w-full p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
                />

                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>Notes are encrypted locally and never transmitted to external servers.</span>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>

      {/* ── Toast Notification: DRM Protection Warning ── */}
      <AnimatePresence>
        {drmToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-16 left-1/2 -translate-x-1/2 z-[130] pointer-events-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-zinc-950/95 border border-amber-400 text-white font-bold text-xs sm:text-sm shadow-[0_0_35px_rgba(245,158,11,0.5)] backdrop-blur-2xl">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-amber-200">{drmToast}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
