import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Image as ImageIcon, Download, Eye, Sparkles, X,
  Check, Heart, Share2, Shield
} from 'lucide-react';

interface Wallpaper {
  id: string;
  title: string;
  subtitle: string;
  category: 'hanuman' | 'shiva' | 'warrior' | 'quotes';
  bgGradient: string;
  symbol: string;
  quote: string;
  author: string;
  accentColor: string;
}

const WALLPAPERS: Wallpaper[] = [
  {
    id: 'w1',
    title: 'Mahabali Hanuman Ji',
    subtitle: 'Supreme Celibate & Jitendriya',
    category: 'hanuman',
    bgGradient: 'from-amber-600 via-amber-900 to-black',
    symbol: '🔱',
    quote: 'मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्',
    author: 'Ramayana • Sri Hanuman',
    accentColor: '#f59e0b',
  },
  {
    id: 'w2',
    title: 'Mahadev Transmutation',
    subtitle: 'Lord of Ascetics & Third Eye',
    category: 'shiva',
    bgGradient: 'from-indigo-900 via-purple-950 to-black',
    symbol: '🌙',
    quote: 'The fire of celibacy burns the illusions of the senses into sacred ashes.',
    author: 'Shiva Purana',
    accentColor: '#818cf8',
  },
  {
    id: 'w3',
    title: 'Swami Vivekananda',
    subtitle: 'The Power of Pure Semen',
    category: 'warrior',
    bgGradient: 'from-orange-700 via-amber-950 to-black',
    symbol: '⚡',
    quote: 'Every boy should be trained to practice complete Brahmacharya. Then only will tremendous power come.',
    author: 'Swami Vivekananda',
    accentColor: '#fbbf24',
  },
  {
    id: 'w4',
    title: 'The Sacred Ojas Armor',
    subtitle: 'Invincible Spiritual Force',
    category: 'quotes',
    bgGradient: 'from-yellow-700 via-zinc-950 to-black',
    symbol: '🛡️',
    quote: 'शुक्रं हि परमं तेजः सर्वेन्द्रियसुखावहम् — Semen is the supreme radiance.',
    author: 'Charaka Samhita',
    accentColor: '#fef08a',
  },
  {
    id: 'w5',
    title: 'Urge Slayer & Mind Shield',
    subtitle: 'Conquer Lower Dopamine',
    category: 'warrior',
    bgGradient: 'from-red-950 via-zinc-950 to-black',
    symbol: '⚔️',
    quote: 'A lion does not graze grass for temporary hunger. A Sadhak does not waste life essence for 5 seconds of delusion.',
    author: 'Vedic Sutra',
    accentColor: '#ef4444',
  },
  {
    id: 'w6',
    title: 'Brahma Muhurta Dawn',
    subtitle: '4:00 AM Solar Rebirth',
    category: 'quotes',
    bgGradient: 'from-amber-500/80 via-zinc-900 to-black',
    symbol: '🌅',
    quote: 'He who conquers the morning hours conquers the temptations of the night.',
    author: 'Ancient Discipline',
    accentColor: '#f59e0b',
  },
];

export default function GalleryView() {
  const [filter, setFilter] = useState<'all' | 'hanuman' | 'shiva' | 'warrior' | 'quotes'>('all');
  const [previewItem, setPreviewItem] = useState<Wallpaper | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filtered = filter === 'all' ? WALLPAPERS : WALLPAPERS.filter(w => w.category === filter);

  const handleDownload = (item: Wallpaper) => {
    // Generate a high-contrast canvas image download
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw Dark Background
    ctx.fillStyle = '#02040a';
    ctx.fillRect(0, 0, 1080, 1920);

    // Radial gradient aura
    const grad = ctx.createRadialGradient(540, 700, 100, 540, 700, 700);
    grad.addColorStop(0, item.accentColor + '55');
    grad.addColorStop(1, '#02040a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1920);

    // Symbol Icon
    ctx.font = '140px serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.symbol, 540, 600);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 56px "Cinzel", Georgia, serif';
    ctx.fillText(item.title.toUpperCase(), 540, 750);

    // Subtitle
    ctx.fillStyle = item.accentColor;
    ctx.font = '36px sans-serif';
    ctx.fillText(item.subtitle, 540, 830);

    // Quote Box
    ctx.fillStyle = '#f4f4f6';
    ctx.font = 'italic 42px Georgia, serif';
    const words = item.quote.split(' ');
    let line = '';
    let y = 1050;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 860 && n > 0) {
        ctx.fillText(line, 540, y);
        line = words[n] + ' ';
        y += 60;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 540, y);

    // Author
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '32px sans-serif';
    ctx.fillText('— ' + item.author, 540, y + 80);

    // Branding Footer
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 30px "Cinzel", serif';
    ctx.fillText('BRAHMACHARYA MITRA • AKHAND SADHANA', 540, 1820);

    // Trigger download
    const link = document.createElement('a');
    link.download = `Brahmacharya-Mitra-${item.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-3.5 overflow-y-auto pr-1 pb-16">
      {/* ── Category Filters ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All' },
          { id: 'hanuman', label: 'Hanuman Ji' },
          { id: 'shiva', label: 'Mahadev' },
          { id: 'warrior', label: 'Warriors' },
          { id: 'quotes', label: 'Quotes' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
              filter === cat.id
                ? 'bg-amber-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Wallpapers Grid ── */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(item => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400/60 transition-all shadow-lg group bg-gradient-to-b ${item.bgGradient} flex flex-col justify-between p-3.5 min-h-[170px] cursor-pointer`}
            onClick={() => setPreviewItem(item)}
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl drop-shadow-md">{item.symbol}</span>
              <span className="p-1.5 rounded-lg bg-black/50 backdrop-blur-md text-zinc-300 group-hover:text-amber-400 transition">
                <Eye className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white leading-tight font-cinzel">{item.title}</h4>
              <p className="text-[10px] text-zinc-300 line-clamp-2 mt-1 italic">{item.quote}</p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <span className="text-[9px] text-zinc-400 truncate">{item.subtitle}</span>
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(item); }}
                className="p-1 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-400 hover:text-black transition"
                title="Download Wallpaper"
              >
                <Download className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Fullscreen HD Preview Modal ── */}
      <AnimatePresence>
        {previewItem && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`w-full max-w-sm rounded-3xl border border-amber-500/50 p-6 shadow-2xl relative bg-gradient-to-b ${previewItem.bgGradient} flex flex-col items-center text-center space-y-4`}
            >
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-5xl my-2 drop-shadow-xl">{previewItem.symbol}</span>

              <div>
                <h3 className="text-lg font-black font-cinzel text-white">{previewItem.title}</h3>
                <p className="text-xs text-amber-300 font-semibold">{previewItem.subtitle}</p>
              </div>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-sm max-w-xs">
                <p className="text-xs text-zinc-200 italic leading-relaxed">“{previewItem.quote}”</p>
                <span className="text-[11px] font-bold text-amber-400 block mt-2">— {previewItem.author}</span>
              </div>

              <div className="w-full flex items-center gap-2 pt-2">
                <button
                  onClick={() => setPreviewItem(null)}
                  className="flex-1 py-2.5 rounded-xl bg-zinc-900/80 text-xs font-bold text-zinc-300"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(previewItem)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Saved!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download HD</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
