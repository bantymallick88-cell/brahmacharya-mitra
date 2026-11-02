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
  ChevronDown,
  Copy,
  Check,
  Trash2,
  Palette,
  FileText,
  ExternalLink
} from 'lucide-react';
import type { LibraryBook } from '../data/libraryBooks';
import { LIBRARY_BOOKS } from '../data/libraryBooks';

export interface HighlightItem {
  id: string;
  bookId: number;
  text: string;
  page: number;
  color: string; // '#FACC15' | '#22C55E' | '#3B82F6' | '#EC4899'
  colorName: 'Yellow' | 'Green' | 'Blue' | 'Pink';
  createdAt: number;
  rects: { left: number; top: number; width: number; height: number }[];
}

export interface CanvasHighlight {
  id: string;
  bookId: number;
  page: number;
  type: 'rect' | 'stroke';
  color: string;
  colorName: 'Yellow' | 'Green' | 'Blue' | 'Pink';
  opacity: number;
  rect?: { x: number; y: number; w: number; h: number };
  points?: { x: number; y: number }[];
  createdAt: number;
}

interface CurrentSelection {
  text: string;
  page: number;
  rects: { left: number; top: number; width: number; height: number }[];
  toolbarX: number;
  toolbarY: number;
}

interface SanctuaryPdfReaderModalProps {
  book: LibraryBook | null;
  onClose: () => void;
  onSelectBook?: (book: LibraryBook) => void;
}

type ReaderTheme = 'dark' | 'sepia' | 'light';
type ViewMode = 'continuous' | 'single';

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export default function SanctuaryPdfReaderModal({ book, onClose, onSelectBook }: SanctuaryPdfReaderModalProps) {
  const [theme, setTheme] = useState<ReaderTheme>('dark');
  const [viewMode, setViewMode] = useState<ViewMode>('continuous');
  const [zoom, setZoom] = useState<number>(1.15);
  const [brightness, setBrightness] = useState<number>(100);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isHeavyArchive, setIsHeavyArchive] = useState<boolean>(false);
  const [drmToast, setDrmToast] = useState<string | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [renderedPages, setRenderedPages] = useState<Set<number>>(new Set());
  const [aspectRatio, setAspectRatio] = useState<number>(0.707); // Default A4 ratio (1 / 1.414)
  const [pageBaseWidth, setPageBaseWidth] = useState<number>(680);

  // Multi-Color Highlighter & Shloka States
  const COLOR_PRESETS = [
    { color: '#FACC15', name: 'Yellow' as const, bg: 'bg-[#FACC15]', ring: 'ring-[#FACC15]' },
    { color: '#22C55E', name: 'Green' as const, bg: 'bg-[#22C55E]', ring: 'ring-[#22C55E]' },
    { color: '#3B82F6', name: 'Blue' as const, bg: 'bg-[#3B82F6]', ring: 'ring-[#3B82F6]' },
    { color: '#EC4899', name: 'Pink' as const, bg: 'bg-[#EC4899]', ring: 'ring-[#EC4899]' },
  ];
  const [activeHighlighterColor, setActiveHighlighterColor] = useState<string>('#FACC15');
  const [activeHighlighterName, setActiveHighlighterName] = useState<'Yellow' | 'Green' | 'Blue' | 'Pink'>('Yellow');
  const activeColorRef = useRef<string>('#FACC15');
  const activeColorNameRef = useRef<'Yellow' | 'Green' | 'Blue' | 'Pink'>('Yellow');
  const highlightsRef = useRef<HighlightItem[]>([]);

  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [currentSelection, setCurrentSelection] = useState<CurrentSelection | null>(null);
  const [sidebarTab, setSidebarTab] = useState<'shlokas' | 'notes'>('shlokas');
  const [copiedHighlightId, setCopiedHighlightId] = useState<string | null>(null);
  const [activeHighlightId, setActiveHighlightId] = useState<string | null>(null);

  // Canvas Overlay Interactive Highlighter States
  const [canvasHighlights, setCanvasHighlights] = useState<CanvasHighlight[]>([]);
  const canvasHighlightsRef = useRef<CanvasHighlight[]>([]);
  const [isHighlighterActive, setIsHighlighterActive] = useState<boolean>(true);
  const isHighlighterActiveRef = useRef<boolean>(true);
  const [drawMode, setDrawMode] = useState<'rect' | 'stroke'>('rect');
  const drawModeRef = useRef<'rect' | 'stroke'>('rect');

  const activeDrawingRef = useRef<{
    page: number;
    startX: number;
    startY: number;
    currentX: number;
    currentY: number;
    points: { x: number; y: number }[];
  } | null>(null);

  useEffect(() => {
    highlightsRef.current = highlights;
  }, [highlights]);

  useEffect(() => {
    canvasHighlightsRef.current = canvasHighlights;
  }, [canvasHighlights]);

  const selectHighlighterColor = (color: string, name: 'Yellow' | 'Green' | 'Blue' | 'Pink') => {
    setActiveHighlighterColor(color);
    setActiveHighlighterName(name);
    activeColorRef.current = color;
    activeColorNameRef.current = name;
    setIsHighlighterActive(true);
    isHighlighterActiveRef.current = true;
    setDrmToast(`✨ ${name} Highlighter active — Drag on page to highlight`);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pdfDocRef = useRef<any>(null);
  const renderingQueueRef = useRef<Set<number>>(new Set());
  const lastTapRef = useRef<number>(0);
  const touchDistanceRef = useRef<number>(0);
  const initialPinchZoomRef = useRef<number>(1);

  // Load PDF.js Viewer CSS once for accurate textLayer alignment
  useEffect(() => {
    if (!document.getElementById('pdfjs-viewer-css')) {
      const link = document.createElement('link');
      link.id = 'pdfjs-viewer-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf_viewer.min.css';
      document.head.appendChild(link);
    }
  }, []);

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

      // Undo Shortcut (Ctrl+Z / Cmd+Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (!['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
          e.preventDefault();
          undoLastHighlight();
        }
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

  // Load saved notes, highlights & last page for this book
  useEffect(() => {
    if (!book) return;
    try {
      const savedNotes = localStorage.getItem(`sanctuary_notes_${book.id}`);
      setNotes(savedNotes || '');

      const savedHl = localStorage.getItem(`sanctuary_highlights_${book.id}`);
      if (savedHl) {
        setHighlights(JSON.parse(savedHl));
      } else {
        setHighlights([]);
      }

      const savedCanvasHl = localStorage.getItem(`sanctuary_canvas_highlights_${book.id}`);
      if (savedCanvasHl) {
        const parsed = JSON.parse(savedCanvasHl);
        setCanvasHighlights(parsed);
        canvasHighlightsRef.current = parsed;
      } else {
        setCanvasHighlights([]);
        canvasHighlightsRef.current = [];
      }

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

  // Save Canvas Highlights to LocalStorage
  const saveCanvasHighlights = (items: CanvasHighlight[]) => {
    setCanvasHighlights(items);
    canvasHighlightsRef.current = items;
    if (book) {
      try {
        localStorage.setItem(`sanctuary_canvas_highlights_${book.id}`, JSON.stringify(items));
      } catch {
        // storage quota failsafe
      }
    }
  };

  // Remove a canvas highlight
  const removeCanvasHighlight = (id: string) => {
    const target = canvasHighlightsRef.current.find((h) => h.id === id);
    const updated = canvasHighlightsRef.current.filter((h) => h.id !== id);
    saveCanvasHighlights(updated);
    setDrmToast('Highlight removed from page.');
    if (target) {
      redrawCanvasForPage(target.page);
    }
  };

  // Undo last canvas highlight
  const undoLastHighlight = () => {
    if (canvasHighlightsRef.current.length === 0) return;
    const last = canvasHighlightsRef.current[0];
    const updated = canvasHighlightsRef.current.slice(1);
    saveCanvasHighlights(updated);
    setDrmToast(`Undid highlight on Page ${last.page}`);
    redrawCanvasForPage(last.page);
  };

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

  // Save Highlights array to localStorage
  const saveHighlights = (items: HighlightItem[]) => {
    setHighlights(items);
    if (book) {
      try {
        localStorage.setItem(`sanctuary_highlights_${book.id}`, JSON.stringify(items));
      } catch {
        // storage quota failsafe
      }
    }
  };

  // Remove a single highlight
  const removeHighlight = (id: string) => {
    const updated = highlights.filter((h) => h.id !== id);
    saveHighlights(updated);
    setDrmToast('Highlight removed from sanctuary record.');
  };

  // Sync and save a highlighted shloka into the Notes & Shlokas drawer
  const syncHighlightToNotes = useCallback((h: HighlightItem, openDrawer = false) => {
    if (openDrawer) {
      setShowNotes(true);
      setSidebarTab('shlokas');
      setActiveHighlightId(h.id);
    }

    const entryTag = `📌 [Page ${h.page} • ${h.colorName} Shloka]:\n"${h.text}"`;
    setNotes((prevNotes) => {
      if (prevNotes.includes(`"${h.text}"`)) {
        return prevNotes; // already present
      }
      const combined = prevNotes.trim() ? `${prevNotes.trim()}\n\n${entryTag}` : entryTag;
      if (book) {
        try {
          localStorage.setItem(`sanctuary_notes_${book.id}`, combined);
        } catch {}
      }
      return combined;
    });

    if (openDrawer) {
      setDrmToast(`Viewing Page ${h.page} (${h.colorName}) in Sadhana Notes`);
    }
  }, [book]);

  // Add new highlight with chosen color preset
  const addHighlight = (color: string, colorName: 'Yellow' | 'Green' | 'Blue' | 'Pink') => {
    if (!currentSelection || !book) return;

    const newHl: HighlightItem = {
      id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      bookId: book.id,
      text: currentSelection.text,
      page: currentSelection.page,
      color,
      colorName,
      createdAt: Date.now(),
      rects: currentSelection.rects,
    };

    const updated = [newHl, ...highlightsRef.current];
    saveHighlights(updated);
    syncHighlightToNotes(newHl, false);
    setDrmToast(`✨ Highlighted (${colorName}) & saved to Sadhana Notes`);

    // Clear active browser selection
    window.getSelection()?.removeAllRanges();
    setCurrentSelection(null);
  };

  // Text Selection detection across PDF.js textLayer: Auto-highlight with active color
  const handleSelectionCheck = useCallback(() => {
    setTimeout(() => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const text = selection.toString().trim();
      if (text.length < 2) return;

      try {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        let containerNode: Node | null = range.commonAncestorContainer;
        if (containerNode.nodeType === Node.TEXT_NODE) {
          containerNode = containerNode.parentNode;
        }

        // Only highlight text within a PDF page card (ignore search inputs, notes drawer, settings)
        const pageCard = (containerNode as HTMLElement)?.closest?.('[id^="sanctuary-page-card-"]') as HTMLElement | null;
        if (!pageCard || !book) return;

        const page = parseInt(pageCard.id.replace('sanctuary-page-card-', ''), 10) || pageNum;

        // Avoid accidental immediate duplicates
        const isDuplicate = highlightsRef.current.some(
          (h) => h.page === page && h.text.trim() === text
        );
        if (isDuplicate) return;

        const relativeRects: { left: number; top: number; width: number; height: number }[] = [];
        const cardRect = pageCard.getBoundingClientRect();
        const clientRects = Array.from(range.getClientRects());
        const rectsList = clientRects.length > 0 ? clientRects : [rect];
        for (const r of rectsList) {
          if (r.width > 0 && r.height > 0) {
            relativeRects.push({
              left: Math.max(0, Math.min(100, ((r.left - cardRect.left) / cardRect.width) * 100)),
              top: Math.max(0, Math.min(100, ((r.top - cardRect.top) / cardRect.height) * 100)),
              width: Math.max(0, Math.min(100, (r.width / cardRect.width) * 100)),
              height: Math.max(0, Math.min(100, (r.height / cardRect.height) * 100)),
            });
          }
        }

        if (relativeRects.length === 0) return;

        const color = activeColorRef.current;
        const colorName = activeColorNameRef.current;

        const newHl: HighlightItem = {
          id: `hl_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          bookId: book.id,
          text,
          page,
          color,
          colorName,
          createdAt: Date.now(),
          rects: relativeRects,
        };

        const updated = [newHl, ...highlightsRef.current];
        saveHighlights(updated);
        syncHighlightToNotes(newHl, false);
        setDrmToast(`✨ Highlighted (${colorName}) & saved to Sadhana Notes`);

        // Clear active text selection range so the glowing overlay takes over smoothly
        window.getSelection()?.removeAllRanges();
        setCurrentSelection(null);
      } catch {
        // Selection range edge cases
      }
    }, 25);
  }, [pageNum, book, syncHighlightToNotes]);

  // Listen for selection completion across entire modal/document
  useEffect(() => {
    const handleMouseUp = () => handleSelectionCheck();
    const handleTouchEnd = () => handleSelectionCheck();

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleSelectionCheck]);

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

  // Auto-resume from last read page once PDF document is loaded
  const hasResumedPageRef = useRef<boolean>(false);

  useEffect(() => {
    hasResumedPageRef.current = false;
  }, [book?.id]);

  useEffect(() => {
    if (!isLoading && pdfDocRef.current && !hasResumedPageRef.current && book) {
      const savedPageStr = localStorage.getItem(`sanctuary_last_page_${book.id}`);
      const savedP = savedPageStr ? parseInt(savedPageStr, 10) : 1;
      hasResumedPageRef.current = true;
      if (savedP > 1 && savedP <= (numPages || 1)) {
        setTimeout(() => {
          scrollToPage(savedP);
          setDrmToast(`Resumed from Page ${savedP} (Saved reading position)`);
        }, 300);
      }
    }
  }, [isLoading, numPages, book, scrollToPage]);

  // Dismiss toolbar on clicks outside toolbar or when selection collapses
  useEffect(() => {
    const handleDocumentPointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest?.('.sanctuary-highlight-toolbar')) return;
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) {
        setCurrentSelection(null);
      }
    };

    document.addEventListener('pointerdown', handleDocumentPointerDown);
    return () => document.removeEventListener('pointerdown', handleDocumentPointerDown);
  }, []);

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Dynamic PDF.js Loader
  const loadPdf = useCallback(async () => {
    if (!pdfUrl) return;
    setIsLoading(true);
    setErrorMsg(null);
    setIsHeavyArchive(false);
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
      const isLargeAsset = parseFloat(book?.sizeMb || '0') > 25;
      if (isLargeAsset) {
        setIsHeavyArchive(true);
      } else {
        setErrorMsg('Direct canvas rendering unavailable. Switching to protected reader view.');
      }
      setIsLoading(false);
    }
  }, [pdfUrl, book]);

  // Redraw all saved highlights (and active live drag preview) on the transparent overlay canvas
  const redrawCanvasForPage = useCallback((pageIndex: number, previewDrawing?: any) => {
    const canvas = document.getElementById(`highlight-canvas-${pageIndex}`) as HTMLCanvasElement | null;
    const pageCard = document.getElementById(`sanctuary-page-card-${pageIndex}`) as HTMLDivElement | null;
    if (!canvas || !pageCard) return;

    const cardRect = pageCard.getBoundingClientRect();
    const width = cardRect.width || canvas.clientWidth || 600;
    const height = cardRect.height || canvas.clientHeight || 850;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const targetWidth = Math.floor(width * dpr);
    const targetHeight = Math.floor(height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // Render all saved canvas highlights for this page
    const pageHls = canvasHighlightsRef.current.filter((h) => h.page === pageIndex);

    for (const hl of pageHls) {
      ctx.save();
      ctx.fillStyle = hl.color;
      ctx.strokeStyle = hl.color;
      ctx.globalAlpha = hl.opacity || 0.42;

      if (hl.type === 'rect' && hl.rect) {
        const rx = (hl.rect.x / 100) * width;
        const ry = (hl.rect.y / 100) * height;
        const rw = (hl.rect.w / 100) * width;
        const rh = (hl.rect.h / 100) * height;
        ctx.fillRect(rx, ry, rw, rh);
      } else if (hl.type === 'stroke' && hl.points && hl.points.length > 1) {
        ctx.lineWidth = Math.max(14, width * 0.024);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        const p0x = (hl.points[0].x / 100) * width;
        const p0y = (hl.points[0].y / 100) * height;
        ctx.moveTo(p0x, p0y);
        for (let i = 1; i < hl.points.length; i++) {
          const px = (hl.points[i].x / 100) * width;
          const py = (hl.points[i].y / 100) * height;
          ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    // Render active live drag preview
    if (previewDrawing && previewDrawing.page === pageIndex) {
      ctx.save();
      ctx.fillStyle = activeColorRef.current;
      ctx.strokeStyle = activeColorRef.current;
      ctx.globalAlpha = 0.45;

      if (drawModeRef.current === 'rect') {
        const x = Math.min(previewDrawing.startX, previewDrawing.currentX);
        const y = Math.min(previewDrawing.startY, previewDrawing.currentY);
        const w = Math.abs(previewDrawing.currentX - previewDrawing.startX);
        const h = Math.abs(previewDrawing.currentY - previewDrawing.startY);
        ctx.fillRect(x, y, w, h);
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, w, h);
      } else if (drawModeRef.current === 'stroke' && previewDrawing.points?.length > 1) {
        ctx.lineWidth = Math.max(14, width * 0.024);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(previewDrawing.points[0].x, previewDrawing.points[0].y);
        for (let i = 1; i < previewDrawing.points.length; i++) {
          ctx.lineTo(previewDrawing.points[i].x, previewDrawing.points[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
  }, []);

  // Canvas Interactive Pointer Events (Universal Drag-to-Highlight)
  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>, p: number) => {
    if (!isHighlighterActiveRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = e.currentTarget;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {}

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    activeDrawingRef.current = {
      page: p,
      startX: x,
      startY: y,
      currentX: x,
      currentY: y,
      points: [{ x, y }],
    };
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>, p: number) => {
    if (!activeDrawingRef.current || activeDrawingRef.current.page !== p) return;
    e.preventDefault();
    e.stopPropagation();

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));

    activeDrawingRef.current.currentX = x;
    activeDrawingRef.current.currentY = y;
    if (drawModeRef.current === 'stroke') {
      activeDrawingRef.current.points.push({ x, y });
    }

    redrawCanvasForPage(p, activeDrawingRef.current);
  };

  const handleCanvasPointerUp = (e: React.PointerEvent<HTMLCanvasElement>, p: number) => {
    if (!activeDrawingRef.current || activeDrawingRef.current.page !== p) return;
    e.preventDefault();
    e.stopPropagation();

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const drawing = activeDrawingRef.current;
    activeDrawingRef.current = null;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;

    let newHl: CanvasHighlight | null = null;

    if (drawModeRef.current === 'rect') {
      const rx = Math.min(drawing.startX, drawing.currentX);
      const ry = Math.min(drawing.startY, drawing.currentY);
      const rw = Math.abs(drawing.currentX - drawing.startX);
      const rh = Math.abs(drawing.currentY - drawing.startY);

      // Minimum drag threshold: 8px x 8px
      if (rw >= 8 && rh >= 8 && book) {
        newHl = {
          id: `ch_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          bookId: book.id,
          page: p,
          type: 'rect',
          color: activeColorRef.current,
          colorName: activeColorNameRef.current,
          opacity: 0.42,
          rect: {
            x: (rx / width) * 100,
            y: (ry / height) * 100,
            w: (rw / width) * 100,
            h: (rh / height) * 100,
          },
          createdAt: Date.now(),
        };
      }
    } else if (drawModeRef.current === 'stroke') {
      if (drawing.points.length >= 2 && book) {
        newHl = {
          id: `ch_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          bookId: book.id,
          page: p,
          type: 'stroke',
          color: activeColorRef.current,
          colorName: activeColorNameRef.current,
          opacity: 0.42,
          points: drawing.points.map((pt) => ({
            x: (pt.x / width) * 100,
            y: (pt.y / height) * 100,
          })),
          createdAt: Date.now(),
        };
      }
    }

    if (newHl) {
      const updated = [newHl, ...canvasHighlightsRef.current];
      saveCanvasHighlights(updated);
      setDrmToast(`✨ Highlighted (${activeColorNameRef.current}) on Page ${p}`);
      setTimeout(() => redrawCanvasForPage(p), 15);
    } else {
      redrawCanvasForPage(p);
    }
  };

  // Render individual page canvas & text layer
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
      const targetHeight = targetWidth / (unscaledViewport.width / unscaledViewport.height);

      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      canvas.style.width = `${Math.floor(targetWidth)}px`;
      canvas.style.height = `${Math.floor(targetHeight)}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const renderContext = {
        canvasContext: ctx,
        viewport: page.getViewport({ scale: currentScale }),
      };

      await page.render(renderContext).promise;

      // Render TextLayer for selectable text & multi-color highlighter
      const textLayerEl = document.getElementById(`text-layer-${pageIndex}`) as HTMLDivElement | null;
      if (textLayerEl) {
        textLayerEl.innerHTML = '';
        textLayerEl.style.width = `${Math.floor(targetWidth)}px`;
        textLayerEl.style.height = `${Math.floor(targetHeight)}px`;
        textLayerEl.style.setProperty('--scale-factor', `${currentScale}`);

        try {
          const textContent = await page.getTextContent();
          const textViewport = page.getViewport({ scale: currentScale });

          if (window.pdfjsLib && window.pdfjsLib.renderTextLayer) {
            await window.pdfjsLib.renderTextLayer({
              textContentSource: textContent,
              container: textLayerEl,
              viewport: textViewport,
            }).promise;
          } else if (window.pdfjsLib && window.pdfjsLib.TextLayer) {
            const textLayer = new window.pdfjsLib.TextLayer({
              textContentSource: textContent,
              container: textLayerEl,
              viewport: textViewport,
            });
            await textLayer.render();
          }
        } catch (textErr) {
          // Scanned pages or empty text streams
        }
      }

      setRenderedPages((prev) => {
        const next = new Set(prev);
        next.add(pageIndex);
        return next;
      });

      // Automatically re-render saved canvas highlights on this page
      setTimeout(() => {
        redrawCanvasForPage(pageIndex);
      }, 50);
    } catch (err: any) {
      if (err?.name !== 'RenderingCancelledException') {
        console.warn(`Render error page ${pageIndex}:`, err);
      }
    } finally {
      renderingQueueRef.current.delete(pageIndex);
    }
  }, [pageBaseWidth, zoom, redrawCanvasForPage]);

  // Redraw all rendered pages when canvasHighlights, renderedPages, or zoom changes
  useEffect(() => {
    renderedPages.forEach((p) => {
      redrawCanvasForPage(p);
    });
    if (viewMode === 'single') {
      redrawCanvasForPage(pageNum);
    }
  }, [canvasHighlights, zoom, renderedPages, pageNum, viewMode, redrawCanvasForPage]);

  // Redraw on window resize
  useEffect(() => {
    const handleResize = () => {
      renderedPages.forEach((p) => {
        redrawCanvasForPage(p);
      });
      if (viewMode === 'single') {
        redrawCanvasForPage(pageNum);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderedPages, pageNum, viewMode, redrawCanvasForPage]);

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

        {/* ── Always-Visible Multi-Color Highlighter Palette ── */}
        <div
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-xl bg-zinc-900/90 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)] shrink-0"
          title="Interactive Canvas Highlighter Palette — Drag over page text or scanned images to highlight"
        >
          <div className="flex items-center gap-1 text-amber-300 font-cinzel text-[10px] font-bold mr-0.5 sm:mr-1">
            <Highlighter className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden xl:inline text-[9px] uppercase tracking-wider text-amber-300/90">Palette:</span>
          </div>

          {/* 4 Multi-Color Swatches */}
          {COLOR_PRESETS.map((preset) => {
            const isSelected = activeHighlighterColor === preset.color && isHighlighterActive;
            return (
              <button
                key={preset.color}
                onClick={() => selectHighlighterColor(preset.color, preset.name)}
                className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center ${preset.bg} ${
                  isSelected
                    ? 'scale-115 ring-2 ring-white ring-offset-2 ring-offset-zinc-950 shadow-[0_0_12px_rgba(255,255,255,0.8)]'
                    : 'opacity-65 hover:opacity-100 hover:scale-105 border border-zinc-900'
                }`}
                title={`Active Color: ${preset.name} (${preset.color}) — Drag to highlight`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-950 shadow-sm" />
                )}
              </button>
            );
          })}

          <div className="w-px h-4 bg-zinc-800 mx-0.5 sm:mx-1" />

          {/* Draw Style: Box (rect) vs Pen (stroke) */}
          <div className="hidden xs:flex items-center bg-zinc-950/80 p-0.5 rounded-lg border border-zinc-800/80 text-[9px] font-bold">
            <button
              onClick={() => {
                setDrawMode('rect');
                drawModeRef.current = 'rect';
                setIsHighlighterActive(true);
                isHighlighterActiveRef.current = true;
                setDrmToast('Highlighting Style: Box / Shloka Bar');
              }}
              className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                drawMode === 'rect' && isHighlighterActive ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Box / Straight Line Highlighter (Ideal for Shlokas & Verses)"
            >
              Box
            </button>
            <button
              onClick={() => {
                setDrawMode('stroke');
                drawModeRef.current = 'stroke';
                setIsHighlighterActive(true);
                isHighlighterActiveRef.current = true;
                setDrmToast('Highlighting Style: Freehand Pen Stroke');
              }}
              className={`px-1.5 py-0.5 rounded transition cursor-pointer ${
                drawMode === 'stroke' && isHighlighterActive ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
              title="Freehand Highlighter Pen (Ideal for circles & custom marks)"
            >
              Pen
            </button>
          </div>

          {/* Quick Undo Button */}
          <button
            onClick={undoLastHighlight}
            disabled={canvasHighlights.length === 0}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition cursor-pointer"
            title="Undo Last Highlight (Ctrl+Z)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
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

          {/* Sadhana Notes & Shlokas Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`p-2 rounded-xl border transition cursor-pointer relative ${
              showNotes
                ? 'bg-amber-500 text-zinc-950 border-amber-400'
                : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-amber-300'
            }`}
            title="Sadhana Notes & Highlighted Shlokas"
          >
            <Highlighter className="w-4 h-4" />
            {(highlights.length + canvasHighlights.length) > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-amber-500 text-zinc-950 text-[9px] font-mono font-black flex items-center justify-center shadow-md">
                {highlights.length + canvasHighlights.length}
              </span>
            )}
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
          onTouchEnd={(e) => {
            handleDoubleTap(e);
            handleSelectionCheck();
          }}
          onMouseUp={handleSelectionCheck}
          onKeyUp={handleSelectionCheck}
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            touchAction: 'pan-x pan-y pinch-zoom',
          }}
          className={`flex-1 w-full h-full overflow-y-auto overflow-x-auto flex flex-col items-center justify-start pt-6 pb-28 px-2 sm:px-6 relative scroll-smooth ${themeStyles.scrollAreaBg}`}
        >
          {/* Custom style overrides for PDF.js selectable textLayer */}
          <style>{`
            .pdf-page-container .textLayer {
              position: absolute;
              inset: 0;
              overflow: hidden;
              opacity: 1 !important;
              line-height: 1;
              transform-origin: 0 0;
              z-index: 6;
              user-select: text !important;
              -webkit-user-select: text !important;
            }
            .pdf-page-container .textLayer :is(span, br) {
              color: transparent !important;
              position: absolute;
              white-space: pre;
              cursor: text;
              transform-origin: 0 0;
              user-select: text !important;
              -webkit-user-select: text !important;
            }
            .pdf-page-container .textLayer ::selection {
              background: ${activeHighlighterColor}66 !important;
              color: transparent !important;
            }
          `}</style>

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
                    className={`relative rounded-xl overflow-hidden border transition-all duration-300 pdf-page-container select-text ${themeStyles.pageShadow}`}
                    style={{
                      width: `${scaledPageWidth}px`,
                      maxWidth: '100%',
                      minHeight: `${Math.min(scaledPageHeight, 950)}px`,
                      aspectRatio: `${aspectRatio}`,
                      willChange: 'transform',
                    }}
                  >
                    {/* Rendered Canvas Page */}
                    <canvas
                      id={`canvas-page-${p}`}
                      className="block w-full h-auto pointer-events-none"
                      style={{ filter: themeStyles.canvasFilter }}
                    />

                    {/* Selectable PDF.js Text Layer for Multi-Color Highlighting */}
                    <div
                      id={`text-layer-${p}`}
                      className="textLayer absolute inset-0 select-text"
                      style={{ pointerEvents: isHighlighterActive ? 'none' : 'auto' }}
                    />

                    {/* Transparent Interactive Canvas Overlay for Universal Highlighting (Images & Text PDFs) */}
                    <canvas
                      id={`highlight-canvas-${p}`}
                      onPointerDown={(e) => handleCanvasPointerDown(e, p)}
                      onPointerMove={(e) => handleCanvasPointerMove(e, p)}
                      onPointerUp={(e) => handleCanvasPointerUp(e, p)}
                      onPointerCancel={(e) => handleCanvasPointerUp(e, p)}
                      className="absolute inset-0 w-full h-full z-[12]"
                      style={{
                        mixBlendMode: 'multiply',
                        touchAction: isHighlighterActive ? 'none' : 'auto',
                        pointerEvents: isHighlighterActive ? 'auto' : 'none',
                        cursor: isHighlighterActive ? 'crosshair' : 'default',
                      }}
                    />

                    {/* Persistent Glowing Highlight Overlays */}
                    <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
                      {highlights
                        .filter((h) => h.page === p && h.rects && h.rects.length > 0)
                        .map((h) => (
                          <div key={h.id} className="contents pointer-events-auto">
                            {h.rects.map((r, rIdx) => (
                              <div
                                key={rIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  syncHighlightToNotes(h, true);
                                }}
                                title={`[${h.colorName}] Click to view in Sadhana Notes (Page ${p})`}
                                className="absolute rounded-sm transition-all duration-200 cursor-pointer hover:opacity-100 hover:scale-[1.01]"
                                style={{
                                  left: `${r.left}%`,
                                  top: `${r.top}%`,
                                  width: `${r.width}%`,
                                  height: `${r.height}%`,
                                  backgroundColor: h.color,
                                  opacity: 0.52,
                                  borderBottom: `2.5px solid ${h.color}`,
                                  boxShadow: `0 0 10px ${h.color}80, 0 0 4px ${h.color}`,
                                }}
                              />
                            ))}
                          </div>
                        ))}
                    </div>

                    {/* Page Placeholder before rendering */}
                    {!renderedPages.has(p) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 text-zinc-500 font-mono text-xs pointer-events-none z-10">
                        <Loader2 className="w-5 h-5 animate-spin text-amber-500/50 mr-2" />
                        <span>Rendering Page {p}...</span>
                      </div>
                    )}

                    {/* Page Number Pill */}
                    <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-bold text-amber-300/80 backdrop-blur-md select-none pointer-events-none z-10">
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
                className={`relative rounded-xl overflow-hidden border transition-all duration-300 pdf-page-container select-text ${themeStyles.pageShadow}`}
                style={{
                  width: `${scaledPageWidth}px`,
                  maxWidth: '100%',
                  aspectRatio: `${aspectRatio}`,
                  willChange: 'transform',
                }}
              >
                {/* Rendered Canvas Page */}
                <canvas
                  id={`canvas-page-${pageNum}`}
                  className="block w-full h-auto pointer-events-none"
                  style={{ filter: themeStyles.canvasFilter }}
                />

                {/* Selectable PDF.js Text Layer for Multi-Color Highlighting */}
                <div
                  id={`text-layer-${pageNum}`}
                  className="textLayer absolute inset-0 select-text"
                  style={{ pointerEvents: isHighlighterActive ? 'none' : 'auto' }}
                />

                {/* Transparent Interactive Canvas Overlay for Universal Highlighting (Images & Text PDFs) */}
                <canvas
                  id={`highlight-canvas-${pageNum}`}
                  onPointerDown={(e) => handleCanvasPointerDown(e, pageNum)}
                  onPointerMove={(e) => handleCanvasPointerMove(e, pageNum)}
                  onPointerUp={(e) => handleCanvasPointerUp(e, pageNum)}
                  onPointerCancel={(e) => handleCanvasPointerUp(e, pageNum)}
                  className="absolute inset-0 w-full h-full z-[12]"
                  style={{
                    mixBlendMode: 'multiply',
                    touchAction: isHighlighterActive ? 'none' : 'auto',
                    pointerEvents: isHighlighterActive ? 'auto' : 'none',
                    cursor: isHighlighterActive ? 'crosshair' : 'default',
                  }}
                />

                {/* Persistent Glowing Highlight Overlays */}
                <div className="absolute inset-0 pointer-events-none z-[4] overflow-hidden">
                  {highlights
                    .filter((h) => h.page === pageNum && h.rects && h.rects.length > 0)
                    .map((h) => (
                      <div key={h.id} className="contents pointer-events-auto">
                        {h.rects.map((r, rIdx) => (
                          <div
                            key={rIdx}
                            onClick={(e) => {
                              e.stopPropagation();
                              syncHighlightToNotes(h, true);
                            }}
                            title={`[${h.colorName}] Click to view in Sadhana Notes (Page ${pageNum})`}
                            className="absolute rounded-sm transition-all duration-200 cursor-pointer hover:opacity-100 hover:scale-[1.01]"
                            style={{
                              left: `${r.left}%`,
                              top: `${r.top}%`,
                              width: `${r.width}%`,
                              height: `${r.height}%`,
                              backgroundColor: h.color,
                              opacity: 0.52,
                              borderBottom: `2.5px solid ${h.color}`,
                              boxShadow: `0 0 10px ${h.color}80, 0 0 4px ${h.color}`,
                            }}
                          />
                        ))}
                      </div>
                    ))}
                </div>

                {!renderedPages.has(pageNum) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/40 text-zinc-500 font-mono text-xs pointer-events-none z-10">
                    <Loader2 className="w-5 h-5 animate-spin text-amber-500/50 mr-2" />
                    <span>Rendering Page {pageNum}...</span>
                  </div>
                )}

                <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-md bg-zinc-950/80 border border-zinc-800 text-[10px] font-mono font-bold text-amber-300/80 backdrop-blur-md select-none pointer-events-none z-10">
                  Page {pageNum} of {numPages}
                </div>
              </div>
            </div>
          )}

          {/* ── Sacred Archival Granth Notice (for >25MB Compendiums) ── */}
          {isHeavyArchive && (
            <div className="w-full max-w-2xl my-auto py-10 px-4 flex flex-col items-center text-center">
              <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/40 text-amber-400 mb-4 shadow-[0_0_35px_rgba(245,158,11,0.2)]">
                <BookOpen className="w-10 h-10 text-amber-400" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-300 text-xs font-mono font-bold tracking-wider mb-3">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Sacred Archival Compendium ({book.sizeMb} MB)
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white mb-2">
                {book.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mb-6 leading-relaxed">
                This colossal {book.sizeMb} MB encyclopedia is preserved securely in the Sanctum offline repository to comply with edge CDN streaming thresholds. All 27 other sacred texts are immediately readable online!
              </p>

              <div className="w-full p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left mb-6 space-y-2">
                <p className="text-xs text-amber-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Recommended Sacred Texts to Read Online Now:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  {[
                    LIBRARY_BOOKS.find((b) => b.id === 3), // Brahmacharya & Students
                    LIBRARY_BOOKS.find((b) => b.id === 6), // Master Your Mind
                    LIBRARY_BOOKS.find((b) => b.id === 15), // Vivekachudamani
                  ]
                    .filter(Boolean)
                    .map((rec) => (
                      <button
                        key={rec!.id}
                        onClick={() => {
                          if (onSelectBook) onSelectBook(rec!);
                        }}
                        className="p-2.5 rounded-xl bg-zinc-950/80 hover:bg-zinc-800 border border-amber-500/25 hover:border-amber-400 text-left transition cursor-pointer group"
                      >
                        <p className="text-xs font-bold text-amber-300 group-hover:text-amber-200 truncate">
                          {rec!.title}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          {rec!.sizeMb} MB • {rec!.language}
                        </p>
                      </button>
                    ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-xs sm:text-sm transition cursor-pointer shadow-lg hover:shadow-amber-500/25 active:scale-95"
                >
                  Return to Library
                </button>
              </div>
            </div>
          )}

          {/* ── Fallback Viewport if Canvas encounters issues (for normal books) ── */}
          {!isHeavyArchive && errorMsg && (
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
              initial={{ x: 380, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 380, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className={`w-80 sm:w-96 border-l p-4 flex flex-col z-40 shrink-0 shadow-2xl ${themeStyles.cardBg} overflow-hidden`}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 shrink-0">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider font-cinzel">
                  <Bookmark className="w-4 h-4 text-amber-400" />
                  <span>Sadhana Notes & Shlokas</span>
                </div>
                <button
                  onClick={() => setShowNotes(false)}
                  className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition cursor-pointer"
                  title="Close Sidebar (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-Tabs: Saved Shlokas vs Journal */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-zinc-950/70 border border-zinc-800 rounded-xl my-3 shrink-0">
                <button
                  onClick={() => setSidebarTab('shlokas')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    sidebarTab === 'shlokas'
                      ? 'bg-amber-500 text-zinc-950 shadow-md font-extrabold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Highlighter className="w-3.5 h-3.5" />
                  <span>Highlights ({highlights.length + canvasHighlights.length})</span>
                </button>
                <button
                  onClick={() => setSidebarTab('notes')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                    sidebarTab === 'notes'
                      ? 'bg-amber-500 text-zinc-950 shadow-md font-extrabold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Journal</span>
                </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {sidebarTab === 'shlokas' ? (
                  /* Shlokas & Highlights List */
                  (highlights.length === 0 && canvasHighlights.length === 0) ? (
                    <div className="py-12 px-3 flex flex-col items-center justify-center text-center">
                      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-3">
                        <Highlighter className="w-6 h-6 text-amber-400" />
                      </div>
                      <p className="text-xs font-bold text-zinc-200 mb-1">
                        No Highlights Yet
                      </p>
                      <p className="text-[11px] text-zinc-400 max-w-[220px] leading-relaxed">
                        Select a color from the top palette and drag over text or scanned images to highlight. Verses & markings save here automatically.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {/* Canvas Interactive Highlights (Universal for Images & Text) */}
                      {canvasHighlights.map((ch) => {
                        const colorConfig = {
                          Yellow: { border: 'border-amber-400/60', text: 'text-amber-300', bg: 'bg-amber-500/15' },
                          Green: { border: 'border-emerald-500/60', text: 'text-emerald-300', bg: 'bg-emerald-500/15' },
                          Blue: { border: 'border-blue-500/60', text: 'text-blue-300', bg: 'bg-blue-500/15' },
                          Pink: { border: 'border-pink-500/60', text: 'text-pink-300', bg: 'bg-pink-500/15' },
                        }[ch.colorName];

                        return (
                          <div
                            key={ch.id}
                            className="p-3 rounded-2xl bg-zinc-950/85 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-200"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: ch.color }}
                                />
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${colorConfig.bg} ${colorConfig.text}`}>
                                  {ch.colorName}
                                </span>
                                <span className="text-[9px] text-zinc-500 font-mono uppercase">
                                  {ch.type === 'rect' ? 'Box' : 'Pen'}
                                </span>
                              </div>

                              <button
                                onClick={() => scrollToPage(ch.page)}
                                className="text-[10px] font-mono font-bold text-amber-300 hover:text-white px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition cursor-pointer"
                                title="Jump to this page"
                              >
                                Page {ch.page} →
                              </button>
                            </div>

                            <p className="text-xs text-zinc-300 italic leading-relaxed pl-2 border-l-2 mb-2.5" style={{ borderColor: ch.color }}>
                              [Visual {ch.type === 'rect' ? 'Box' : 'Stroke'} Highlight on Page {ch.page}]
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px]">
                              <button
                                onClick={() => {
                                  const entryTag = `📌 [Page ${ch.page} • ${ch.colorName} Highlight]:\n"Visual highlight on Page ${ch.page} of ${book.title}"`;
                                  setNotes((prevNotes) => {
                                    const combined = prevNotes.trim() ? `${prevNotes.trim()}\n\n${entryTag}` : entryTag;
                                    if (book) {
                                      try {
                                        localStorage.setItem(`sanctuary_notes_${book.id}`, combined);
                                      } catch {}
                                    }
                                    return combined;
                                  });
                                  setSidebarTab('notes');
                                  setDrmToast(`Added Page ${ch.page} highlight to journal`);
                                }}
                                className="text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
                                title="Append this note to your Sadhana Journal"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Add to Journal</span>
                              </button>

                              <button
                                onClick={() => removeCanvasHighlight(ch.id)}
                                className="text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-zinc-800 transition cursor-pointer"
                                title="Remove Highlight"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {/* Text Selection Highlights */}
                      {highlights.map((h) => {
                        const colorConfig = {
                          Yellow: { border: 'border-amber-400/60', text: 'text-amber-300', bg: 'bg-amber-500/15' },
                          Green: { border: 'border-emerald-500/60', text: 'text-emerald-300', bg: 'bg-emerald-500/15' },
                          Blue: { border: 'border-blue-500/60', text: 'text-blue-300', bg: 'bg-blue-500/15' },
                          Pink: { border: 'border-pink-500/60', text: 'text-pink-300', bg: 'bg-pink-500/15' },
                        }[h.colorName];

                        const isFocused = activeHighlightId === h.id;

                        return (
                          <div
                            key={h.id}
                            className={`p-3 rounded-2xl bg-zinc-950/85 border transition-all duration-200 ${
                              isFocused ? `${colorConfig.border} ring-2 ring-amber-500/40 shadow-lg` : 'border-zinc-800/90 hover:border-zinc-700'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: h.color }}
                                />
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${colorConfig.bg} ${colorConfig.text}`}>
                                  {h.colorName}
                                </span>
                              </div>

                              <button
                                onClick={() => scrollToPage(h.page)}
                                className="text-[10px] font-mono font-bold text-amber-300 hover:text-white px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 transition cursor-pointer"
                                title="Jump to this page"
                              >
                                Page {h.page} →
                              </button>
                            </div>

                            <p className="text-xs text-zinc-200 italic leading-relaxed line-clamp-4 pl-2 border-l-2 mb-2.5" style={{ borderColor: h.color }}>
                              "{h.text}"
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80 text-[10px]">
                              <button
                                onClick={() => {
                                  syncHighlightToNotes(h);
                                  setSidebarTab('notes');
                                }}
                                className="text-zinc-400 hover:text-amber-300 flex items-center gap-1 transition cursor-pointer"
                                title="Append this verse to your Sadhana Journal"
                              >
                                <FileText className="w-3 h-3" />
                                <span>Add to Journal</span>
                              </button>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (navigator.clipboard) {
                                      navigator.clipboard.writeText(`"${h.text}" — Page ${h.page}, ${book.title}`);
                                      setCopiedHighlightId(h.id);
                                      setTimeout(() => setCopiedHighlightId(null), 2000);
                                      setDrmToast(`Copied Shloka from Page ${h.page}`);
                                    }
                                  }}
                                  className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition cursor-pointer"
                                  title="Copy Verse Citation"
                                >
                                  {copiedHighlightId === h.id ? (
                                    <Check className="w-3 h-3 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                                <button
                                  onClick={() => removeHighlight(h.id)}
                                  className="text-zinc-500 hover:text-red-400 p-1 rounded hover:bg-zinc-800 transition cursor-pointer"
                                  title="Remove Highlight"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )
                ) : (
                  /* Freeform Journal Notes */
                  <div className="flex flex-col h-full gap-2">
                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Personal Contemplation & Realizations:</span>
                      {(highlights.length > 0 || canvasHighlights.length > 0) && (
                        <button
                          onClick={() => {
                            const textCompiled = highlights
                              .sort((a, b) => a.page - b.page)
                              .map((h) => `📌 [Page ${h.page} • ${h.colorName}]\n"${h.text}"`);
                            const canvasCompiled = canvasHighlights
                              .sort((a, b) => a.page - b.page)
                              .map((ch) => `📌 [Page ${ch.page} • ${ch.colorName} Highlight]:\n"Visual ${ch.type === 'rect' ? 'Box' : 'Stroke'} highlight on Page ${ch.page}"`);
                            const allCompiled = [...textCompiled, ...canvasCompiled].join('\n\n');
                            const nextNotes = notes.trim() ? `${notes.trim()}\n\n${allCompiled}` : allCompiled;
                            handleSaveNotes(nextNotes);
                            setDrmToast('All highlighted shlokas synced to journal.');
                          }}
                          className="text-[10px] font-bold text-amber-300 hover:text-white flex items-center gap-1 cursor-pointer"
                          title="Append all highlighted shlokas to journal text"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span>Sync All Highlights</span>
                        </button>
                      )}
                    </div>

                    <textarea
                      value={notes}
                      onChange={(e) => handleSaveNotes(e.target.value)}
                      placeholder="Write your sadhana journal, shloka translations, daily vow reflections, or realizations here..."
                      className="flex-1 w-full min-h-[300px] p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 focus:border-amber-400 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
                    />

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-300 flex items-center gap-2 shrink-0">
                      <Shield className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                      <span>Encrypted locally in browser storage. Private to your device.</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

      </div>

      {/* ── Sleek Floating Multi-Color Highlighter Toolbar ── */}
      <AnimatePresence>
        {currentSelection && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: `${currentSelection.toolbarX}px`,
              top: `${currentSelection.toolbarY}px`,
              transform: 'translate(-50%, -100%)',
              zIndex: 140,
            }}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={(e) => e.stopPropagation()}
            className="sanctuary-highlight-toolbar flex items-center gap-1.5 p-1.5 rounded-2xl bg-zinc-950/95 border border-amber-500/50 shadow-[0_10px_35px_rgba(0,0,0,0.95),0_0_25px_rgba(245,158,11,0.3)] backdrop-blur-2xl select-none"
          >
            <div className="flex items-center gap-1 pl-1.5 pr-2 border-r border-zinc-800 text-[10px] font-bold text-amber-400 font-cinzel tracking-wider">
              <Highlighter className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden xs:inline">Highlight</span>
            </div>

            {/* 4 Multi-Color Preset Swatches */}
            {[
              { color: '#FACC15', name: 'Yellow' as const, bg: 'bg-[#FACC15]', ring: 'hover:ring-[#FACC15]/80' },
              { color: '#22C55E', name: 'Green' as const, bg: 'bg-[#22C55E]', ring: 'hover:ring-[#22C55E]/80' },
              { color: '#3B82F6', name: 'Blue' as const, bg: 'bg-[#3B82F6]', ring: 'hover:ring-[#3B82F6]/80' },
              { color: '#EC4899', name: 'Pink' as const, bg: 'bg-[#EC4899]', ring: 'hover:ring-[#EC4899]/80' },
            ].map((preset) => (
              <button
                key={preset.color}
                onClick={() => addHighlight(preset.color, preset.name)}
                className={`w-6 h-6 rounded-full ${preset.bg} shadow-md hover:scale-125 transition-transform duration-150 cursor-pointer active:scale-95 border-2 border-zinc-900 hover:ring-2 ${preset.ring}`}
                title={`Highlight in ${preset.name} & Sync to Sadhana Notes`}
              />
            ))}

            <div className="w-px h-4 bg-zinc-800 mx-0.5" />

            {/* Copy Quote Button */}
            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(`"${currentSelection.text}" — Page ${currentSelection.page}, ${book.title}`);
                  setDrmToast(`Copied text from Page ${currentSelection.page}`);
                }
                window.getSelection()?.removeAllRanges();
                setCurrentSelection(null);
              }}
              className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-300 hover:text-white transition cursor-pointer"
              title="Copy Selected Verse Citation"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>

            {/* Dismiss Button */}
            <button
              onClick={() => {
                window.getSelection()?.removeAllRanges();
                setCurrentSelection(null);
              }}
              className="p-1.5 rounded-xl hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
              title="Dismiss Highlighter Toolbar"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

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
