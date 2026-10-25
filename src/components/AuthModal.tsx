import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ArrowRight, Loader2, CheckCircle, Shield, Sparkles } from 'lucide-react';

/* ── Google "G" SVG ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

type AuthStep = 'choose' | 'phone' | 'otp' | 'success';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<AuthStep>('choose');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('choose');
      setPhone('');
      setOtp(['', '', '', '', '', '']);
      setLoading(false);
      setCountdown(0);
    }
  }, [isOpen]);

  // OTP resend countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Placeholder — wire real Google OAuth here
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setStep('success');
  };

  const handleSendOtp = async () => {
    if (phone.replace(/\D/g, '').length < 10) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('otp');
    setCountdown(30);
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const handleOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      otpRefs.current[i - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.join('').length < 6) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setStep('success');
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={handleBackdrop}
          style={{ background: 'rgba(2, 4, 10, 0.85)', backdropFilter: 'blur(20px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm"
          >
            {/* Outer glow ring */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-amber-500/30 via-indigo-500/15 to-amber-400/25 blur-sm pointer-events-none" />

            {/* Glass card */}
            <div className="relative bg-zinc-950/95 border border-amber-500/20 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(109,40,217,0.2)]">

              {/* Top amber glow bar */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

              {/* Header */}
              <div className="px-7 pt-7 pb-5 text-center relative">
                {/* Close */}
                <button
                  onClick={onClose}
                  className="absolute top-5 right-5 p-1.5 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800/80 transition"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Emblem glow */}
                <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-zinc-900/80 border border-amber-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.3)]">
                  <span className="font-cinzel font-black text-3xl text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]">ॐ</span>
                </div>

                <AnimatePresence mode="wait">
                  {step === 'choose' && (
                    <motion.div key="choose" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h2 className="text-xl font-black text-white font-cinzel tracking-wide">Welcome Back, Sadhak</h2>
                      <p className="mt-1.5 text-xs text-zinc-400">Sign in to sync your streak & progress across devices</p>
                    </motion.div>
                  )}
                  {step === 'phone' && (
                    <motion.div key="phone" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h2 className="text-xl font-black text-white font-cinzel tracking-wide">Enter Your Number</h2>
                      <p className="mt-1.5 text-xs text-zinc-400">We'll send a one-time verification code</p>
                    </motion.div>
                  )}
                  {step === 'otp' && (
                    <motion.div key="otp" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h2 className="text-xl font-black text-white font-cinzel tracking-wide">Verify OTP</h2>
                      <p className="mt-1.5 text-xs text-zinc-400">6-digit code sent to <span className="text-amber-400">{phone}</span></p>
                    </motion.div>
                  )}
                  {step === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
                      <h2 className="text-xl font-black text-white font-cinzel tracking-wide">ब्रह्मचर्य यात्रा जारी है 🔱</h2>
                      <p className="mt-1.5 text-xs text-zinc-400">You are now signed in. Your streak is protected.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Body */}
              <div className="px-7 pb-7">
                <AnimatePresence mode="wait">

                  {/* ── Step: Choose ── */}
                  {step === 'choose' && (
                    <motion.div key="choose-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                      {/* Google */}
                      <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl bg-white/95 hover:bg-white text-zinc-900 font-bold text-sm transition-all hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GoogleIcon />}
                        <span>Continue with Google</span>
                      </button>

                      {/* Divider */}
                      <div className="flex items-center gap-3 py-1">
                        <div className="flex-1 h-px bg-zinc-800" />
                        <span className="text-xs text-zinc-600 font-medium">or</span>
                        <div className="flex-1 h-px bg-zinc-800" />
                      </div>

                      {/* Phone */}
                      <button
                        onClick={() => setStep('phone')}
                        className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-700/60 hover:border-amber-500/50 text-white font-semibold text-sm transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Phone className="w-4 h-4 text-amber-400" />
                        <span>Continue with Phone</span>
                      </button>

                      {/* Privacy note */}
                      <p className="text-center text-[10px] text-zinc-600 pt-1 flex items-center justify-center gap-1">
                        <Shield className="w-3 h-3" /> No data sold. 100% private. Sanatan Seva.
                      </p>
                    </motion.div>
                  )}

                  {/* ── Step: Phone Input ── */}
                  {step === 'phone' && (
                    <motion.div key="phone-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-zinc-400 text-sm font-semibold pointer-events-none">
                          <span>🇮🇳</span>
                          <span>+91</span>
                          <div className="w-px h-4 bg-zinc-700" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleSendOtp()}
                          placeholder="98765 43210"
                          maxLength={10}
                          className="w-full pl-24 pr-4 py-3.5 bg-zinc-900/80 border border-zinc-700/70 focus:border-amber-500/70 rounded-2xl text-white font-semibold text-sm placeholder:text-zinc-600 outline-none transition-all focus:shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        />
                      </div>
                      <button
                        onClick={handleSendOtp}
                        disabled={loading || phone.replace(/\D/g, '').length < 10}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-zinc-950 font-black text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Send OTP</span><ArrowRight className="w-4 h-4" /></>}
                      </button>
                      <button onClick={() => setStep('choose')} className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition pt-1">← Back</button>
                    </motion.div>
                  )}

                  {/* ── Step: OTP ── */}
                  {step === 'otp' && (
                    <motion.div key="otp-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                      {/* OTP boxes */}
                      <div className="flex gap-2 justify-center">
                        {otp.map((digit, i) => (
                          <input
                            key={i}
                            ref={el => { otpRefs.current[i] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={e => handleOtpChange(i, e.target.value)}
                            onKeyDown={e => handleOtpKeyDown(i, e)}
                            className="w-10 h-12 text-center text-lg font-black text-white bg-zinc-900/80 border border-zinc-700 focus:border-amber-400 rounded-xl outline-none transition-all focus:shadow-[0_0_12px_rgba(245,158,11,0.35)] caret-amber-400"
                          />
                        ))}
                      </div>

                      <button
                        onClick={handleVerifyOtp}
                        disabled={loading || otp.join('').length < 6}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-zinc-950 font-black text-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Verify & Sign In</span><ArrowRight className="w-4 h-4" /></>}
                      </button>

                      <div className="text-center text-xs text-zinc-500">
                        {countdown > 0 ? (
                          <span>Resend OTP in <span className="text-amber-400 font-bold">{countdown}s</span></span>
                        ) : (
                          <button onClick={handleSendOtp} className="text-amber-400 hover:text-amber-300 font-semibold transition">Resend OTP</button>
                        )}
                      </div>
                      <button onClick={() => setStep('phone')} className="w-full text-center text-xs text-zinc-500 hover:text-zinc-300 transition">← Change Number</button>
                    </motion.div>
                  )}

                  {/* ── Step: Success ── */}
                  {step === 'success' && (
                    <motion.div key="success-body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 text-center">
                      <div className="flex justify-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                          <CheckCircle className="w-8 h-8 text-emerald-400" />
                        </div>
                      </div>
                      <p className="text-sm text-zinc-300">Your journey continues. <span className="text-amber-400 font-bold">Stay strong, Sadhak!</span></p>
                      <button
                        onClick={onClose}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-zinc-950 font-black text-sm transition-all hover:scale-[1.02]"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Continue Sadhana</span>
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Bottom glow */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
