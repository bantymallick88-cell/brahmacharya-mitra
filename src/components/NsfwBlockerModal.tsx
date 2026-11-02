import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  X,
  Smartphone,
  Laptop,
  Globe,
  Copy,
  Check,
  ExternalLink,
  Lock,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Cpu,
  Radio,
  Server
} from 'lucide-react';

type DeviceTab = 'android' | 'ios' | 'windows' | 'browser';
type ProviderTab = 'nextdns' | 'adguard' | 'cleanbrowsing';

export default function NsfwBlockerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDevice, setActiveDevice] = useState<DeviceTab>('android');
  const [activeProvider, setActiveProvider] = useState<ProviderTab>('adguard');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    window.addEventListener('open-blocker-modal', handleOpen);
    window.addEventListener('close-blocker-modal', handleClose);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-blocker-modal', handleOpen);
      window.removeEventListener('close-blocker-modal', handleClose);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[125] flex items-center justify-center p-3 sm:p-5 overflow-y-auto select-none">
        {/* Pitch-Black OLED Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-[#000000]/95 backdrop-blur-2xl"
        />

        {/* 3D Glass OLED Shield Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 25 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#050505] border border-amber-500/40 rounded-3xl p-5 sm:p-8 shadow-[0_0_80px_rgba(245,158,11,0.25),0_20px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl z-10 my-6 overflow-hidden"
        >
          {/* Top Amber Radiant Flare */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-[radial-gradient(circle,rgba(245,158,11,0.25)_0%,rgba(16,185,129,0.15)_40%,transparent_75%)] blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-amber-400 text-zinc-400 hover:text-white transition cursor-pointer"
            aria-label="Close Blocker Guide"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title & Badge */}
          <div className="flex items-center gap-3 mb-6 text-left">
            <div className="p-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 tracking-wider">
                  Zero-Bypass Device Security
                </span>
                <span className="text-[10px] font-bold text-amber-400">100% Free</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-cinzel text-white mt-1">
                System-Wide NSFW Blocker Setup Wizard
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6 text-left">
            Browser extensions can be easily disabled in Incognito mode. A <strong>DNS-level blocker</strong> intercepts adult requests directly at the network operating system level across every app, browser, and secret tab on your device.
          </p>

          {/* ── Provider Selector (AdGuard Family vs NextDNS vs CleanBrowsing) ── */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 mb-6">
            <button
              onClick={() => setActiveProvider('adguard')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeProvider === 'adguard'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>AdGuard Family (Easiest)</span>
            </button>

            <button
              onClick={() => setActiveProvider('nextdns')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeProvider === 'nextdns'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>NextDNS (Customizable)</span>
            </button>

            <button
              onClick={() => setActiveProvider('cleanbrowsing')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                activeProvider === 'cleanbrowsing'
                  ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>CleanBrowsing Adult</span>
            </button>
          </div>

          {/* ── Device Selector Tabs ── */}
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6 overflow-x-auto scrollbar-none">
            {[
              { id: 'android', label: '📱 Android (Private DNS)', icon: Smartphone },
              { id: 'ios', label: '🍏 iPhone / iPad (iOS Profile)', icon: Smartphone },
              { id: 'windows', label: '💻 Windows 10/11 (OS Level)', icon: Laptop },
              { id: 'browser', label: '🌐 Chrome / Edge / Brave (DoH)', icon: Globe },
            ].map((tab) => {
              const active = activeDevice === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveDevice(tab.id as DeviceTab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shrink-0 ${
                    active
                      ? 'bg-amber-500/15 border border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                      : 'bg-zinc-900/60 hover:bg-zinc-850 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Device Step-by-Step Instructions Container ── */}
          <div className="space-y-4 text-left max-h-[50vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-zinc-800">
            
            {/* 1. ANDROID PRIVATE DNS */}
            {activeDevice === 'android' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">1</span>
                    Open Android Settings
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    Open <strong>Settings</strong> &gt; <strong>Network & Internet</strong> (or <strong>Connections / More Connection Settings</strong>).
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">2</span>
                    Select Private DNS Provider Hostname
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    Tap on <strong>Private DNS</strong>, choose <strong>"Private DNS provider hostname"</strong>, and paste the address below:
                  </p>
                  
                  {/* Copy Box */}
                  <div className="ml-7 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-950 border border-amber-500/40">
                    <span className="font-mono text-xs text-amber-300 select-all font-bold truncate">
                      {activeProvider === 'adguard'
                        ? 'family.adguard-dns.com'
                        : activeProvider === 'nextdns'
                        ? 'dns.nextdns.io'
                        : 'adult-filter-dot.cleanbrowsing.org'}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          activeProvider === 'adguard'
                            ? 'family.adguard-dns.com'
                            : activeProvider === 'nextdns'
                            ? 'dns.nextdns.io'
                            : 'adult-filter-dot.cleanbrowsing.org',
                          'android-dns'
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      {copiedKey === 'android-dns' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'android-dns' ? 'Copied' : 'Copy Hostname'}</span>
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Tap Save & Restart Browser
                  </h4>
                  <p className="text-xs text-zinc-400 pl-6">
                    Every app and browser on your phone now automatically routes adult queries into a dead void.
                  </p>
                </div>
              </div>
            )}

            {/* 2. APPLE iOS / IPHONE & IPAD */}
            {activeDevice === 'ios' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">1</span>
                    Method A: Native Encrypted Configuration Profile (Recommended)
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7 leading-relaxed">
                    Download Apple's official signed mobileconfig profile. It enforces encrypted DNS over cellular LTE/5G and all WiFi networks:
                  </p>
                  
                  <div className="ml-7 pt-1 flex flex-wrap gap-2">
                    <a
                      href="https://adguard-dns.io/en/public-dns.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-zinc-950 font-bold text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <span>Install AdGuard iOS Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://apple.nextdns.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-amber-300 font-bold text-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Apple NextDNS Generator</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">2</span>
                    Method B: Manual Wi-Fi DNS Setup
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7 leading-relaxed">
                    Open <strong>Settings</strong> &gt; <strong>Wi-Fi</strong> &gt; Tap <strong>(i)</strong> next to your network &gt; <strong>Configure DNS</strong> &gt; Select <strong>Manual</strong> &gt; Add Server:
                  </p>
                  
                  <div className="ml-7 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-950 border border-amber-500/40">
                    <span className="font-mono text-xs text-amber-300 font-bold">
                      94.140.14.15 (Primary) &bull; 94.140.15.16 (Secondary)
                    </span>
                    <button
                      onClick={() => copyToClipboard('94.140.14.15', 'ios-dns')}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      {copiedKey === 'ios-dns' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy IP</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. WINDOWS 10 / 11 */}
            {activeDevice === 'windows' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">1</span>
                    Windows 11 / 10 Settings
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    Press <strong>Win + I</strong> &gt; <strong>Network & Internet</strong> &gt; Click <strong>Wi-Fi</strong> or <strong>Ethernet</strong> &gt; Click <strong>Hardware properties</strong> &gt; <strong>DNS server assignment: Edit</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">2</span>
                    Input Family Shield IPv4 Addresses
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    Select <strong>Manual</strong> &gt; Toggle <strong>IPv4: On</strong> &gt; Set Preferred & Alternate DNS:
                  </p>
                  
                  <div className="ml-7 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-amber-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Preferred DNS</span>
                        <span className="font-mono text-xs text-amber-300 font-bold">94.140.14.15</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('94.140.14.15', 'win-p')}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400"
                        title="Copy"
                      >
                        {copiedKey === 'win-p' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-amber-500/40 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-zinc-500 block uppercase">Alternate DNS</span>
                        <span className="font-mono text-xs text-amber-300 font-bold">94.140.15.16</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard('94.140.15.16', 'win-a')}
                        className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-amber-400"
                        title="Copy"
                      >
                        {copiedKey === 'win-a' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. BROWSER DOH (CHROME, EDGE, BRAVE) */}
            {activeDevice === 'browser' && (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">1</span>
                    Open Browser Security Settings
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    In Chrome, Edge, or Brave: Go to <strong>Settings</strong> &gt; <strong>Privacy and security</strong> &gt; <strong>Security</strong> &gt; Scroll to <strong>"Use secure DNS"</strong>.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px] font-mono">2</span>
                    Select Custom & Paste DoH Endpoint
                  </h4>
                  <p className="text-xs text-zinc-300 pl-7">
                    Choose <strong>"Custom" (With provider)</strong> and paste the Secure DNS over HTTPS (DoH) URL:
                  </p>

                  <div className="ml-7 flex items-center justify-between gap-2 p-2.5 rounded-xl bg-zinc-950 border border-amber-500/40">
                    <span className="font-mono text-xs text-amber-300 select-all font-bold truncate">
                      https://dns-family.adguard.com/dns-query
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard('https://dns-family.adguard.com/dns-query', 'doh-url')
                      }
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      {copiedKey === 'doh-url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'doh-url' ? 'Copied' : 'Copy URL'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Test Your Shield Protection Status */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-zinc-900/90 to-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Test Your DNS Shield</span>
                  <span className="text-[10px] text-zinc-400">Verify if adult domain resolution is actively blocked</span>
                </div>
              </div>

              <a
                href="https://adguard-dns.io/en/public-dns.html#check"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition flex items-center gap-1.5 shrink-0 shadow-md cursor-pointer"
              >
                <span>Run Diagnostic Test</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
              </a>
            </div>

          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Protects smartphones, laptops & tablets against visual dopamine triggers.
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold transition cursor-pointer"
            >
              Done / Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

