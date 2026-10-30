import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Flame, Globe, Search, Crown, Medal,
  Sparkles, Filter, ChevronUp, UserCheck, Shield,
  Disc, MapPin, ArrowUpRight, Award, Zap, Code, ShieldAlert
} from 'lucide-react';
import type { UserProfile } from './OnboardingWizard';

interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  countryFlag: string;
  city: string;
  streakDays: number;
  japaCount: number;
  title: string;
  isCurrentUser?: boolean;
  isDeveloper?: boolean;
}

// Strict Developer Profile Detector
export const isDeveloperProfile = (name: string): boolean => {
  if (!name) return false;
  const clean = name.trim().toLowerCase();
  return clean.includes('banty') || clean.includes('divyalochan');
};

export const LeaderboardView: React.FC = () => {
  const [metric, setMetric] = useState<'streak' | 'japa'>('streak');
  const [geoFilter, setGeoFilter] = useState<'all' | 'my_country'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [registeredSadhaks, setRegisteredSadhaks] = useState<any[]>([]);
  const [currentUserStreak, setCurrentUserStreak] = useState<number>(14);
  const [currentUserJapa, setCurrentUserJapa] = useState<number>(108);

  const loadDataFromLocalStorage = () => {
    if (typeof window === 'undefined') return;

    try {
      const savedProfile = localStorage.getItem('bm_user_profile');
      let parsedProfile: UserProfile | null = null;
      if (savedProfile) {
        parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
      }

      const savedStreak = localStorage.getItem('bm_active_streak');
      const streakVal = savedStreak ? parseInt(savedStreak, 10) || 1 : 14;
      setCurrentUserStreak(streakVal);

      const savedJapa = localStorage.getItem('bm_japa_counter');
      const japaVal = savedJapa ? parseInt(savedJapa, 10) || 0 : 108;
      setCurrentUserJapa(japaVal);

      // Load dynamically registered users from LocalStorage
      const savedSadhaksRaw = localStorage.getItem('bm_registered_sadhaks');
      let sadhaks: any[] = savedSadhaksRaw ? JSON.parse(savedSadhaksRaw) : [];

      // If user has a completed profile, ensure they are registered
      if (parsedProfile && parsedProfile.name) {
        const exists = sadhaks.some(
          (s) => s.name?.toLowerCase().trim() === parsedProfile?.name.toLowerCase().trim()
        );
        if (!exists) {
          sadhaks.push({
            name: parsedProfile.name,
            country: parsedProfile.country || 'India',
            countryFlag: parsedProfile.countryFlag || '🇮🇳',
            city: parsedProfile.city || parsedProfile.state || 'Kashi',
            streakDays: streakVal,
            japaCount: japaVal,
            targetDays: parsedProfile.targetDays || 90,
          });
        }
      }

      setRegisteredSadhaks(sadhaks);
    } catch (e) {
      console.warn('Error reading leaderboard from LocalStorage', e);
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();

    const handleUpdate = () => loadDataFromLocalStorage();
    window.addEventListener('bm_sadhaks_updated', handleUpdate);
    window.addEventListener('onboarding-completed', handleUpdate);
    window.addEventListener('bm_profile_updated', handleUpdate);

    return () => {
      window.removeEventListener('bm_sadhaks_updated', handleUpdate);
      window.removeEventListener('onboarding-completed', handleUpdate);
      window.removeEventListener('bm_profile_updated', handleUpdate);
    };
  }, []);

  // Compute developer profile vs public registered sadhaks
  const { developerEntries, publicList } = useMemo(() => {
    const devs: LeaderboardEntry[] = [];
    const publicEntries: Omit<LeaderboardEntry, 'rank'>[] = [];

    registeredSadhaks.forEach((item) => {
      const isCurrent =
        userProfile && userProfile.name
          ? item.name?.toLowerCase().trim() === userProfile.name.toLowerCase().trim()
          : false;

      const streak = isCurrent ? currentUserStreak : item.streakDays || 1;
      const japa = isCurrent ? currentUserJapa : item.japaCount || 0;

      const title =
        streak >= 108
          ? 'Paramhansa'
          : streak >= 90
          ? 'Ojasvi'
          : streak >= 60
          ? 'Tejasvi'
          : streak >= 21
          ? 'Veerya Rakshak'
          : 'Sankalpa';

      const entry: LeaderboardEntry = {
        rank: 0,
        name: item.name || 'Anonymous Sadhak',
        country: item.country || 'India',
        countryFlag: item.countryFlag || '🇮🇳',
        city: item.city || item.state || 'Dharma Kshetra',
        streakDays: streak,
        japaCount: japa,
        title,
        isCurrentUser: isCurrent,
        isDeveloper: isDeveloperProfile(item.name),
      };

      if (entry.isDeveloper) {
        devs.push(entry);
      } else {
        publicEntries.push(entry);
      }
    });

    // Sort public sadhaks by selected metric
    if (metric === 'streak') {
      publicEntries.sort((a, b) => b.streakDays - a.streakDays);
    } else {
      publicEntries.sort((a, b) => b.japaCount - a.japaCount);
    }

    // Assign strictly dynamic public ranks (1, 2, 3...)
    const rankedPublic: LeaderboardEntry[] = publicEntries.map((item, index) => ({
      ...item,
      rank: index + 1,
    }));

    return { developerEntries: devs, publicList: rankedPublic };
  }, [registeredSadhaks, userProfile, currentUserStreak, currentUserJapa, metric]);

  // Apply Search & Geo Filters on public sadhaks
  const filteredList = useMemo(() => {
    return publicList.filter((item) => {
      // Geo filter
      if (geoFilter === 'my_country' && userProfile?.country) {
        if (item.country.toLowerCase() !== userProfile.country.toLowerCase()) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCity = item.city.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        return matchesName || matchesCity || matchesCountry;
      }

      return true;
    });
  }, [publicList, geoFilter, userProfile, searchQuery]);

  // Top 3 Podium sadhaks
  const top1 = filteredList[0];
  const top2 = filteredList[1];
  const top3 = filteredList[2];

  // Current user entry in public ranks
  const myPublicEntry = publicList.find((i) => i.isCurrentUser);
  const myDevEntry = developerEntries.find((i) => i.isCurrentUser);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Dynamic Sadhak Tapasya Circle</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Global Sadhak <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 font-cinzel">Leaderboard</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-400">
          Rankings are strictly dynamic — populated exclusively by verified sadhaks who completed Onboarding Setup.
        </p>
      </div>

      {/* ── DEVELOPER / ADMIN EXCLUSION BADGE CARD ── */}
      {developerEntries.length > 0 && (
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-amber-950/30 border-2 border-purple-500/40 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-amber-500 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-xl">
                  🛠️
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-black text-white">
                    {developerEntries.map((d) => d.name).join(', ')}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-[10px] tracking-wide flex items-center gap-1">
                    <Code className="w-3 h-3 text-purple-400" />
                    <span>Developer / Admin</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-semibold text-[10px]">
                    Excluded from Public Ranks
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Brahmacharya Mitra Platform Architect • Sacred energy preserver & technical guardian.
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right flex-shrink-0">
              <span className="text-xs font-mono font-bold text-amber-300 block">
                {developerEntries[0]?.streakDays} Days Tapasya
              </span>
              <span className="text-[10px] text-zinc-500">Official Platform Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* Control Filters Bar */}
      <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/20 p-4 md:p-6 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Metric Switcher */}
        <div className="flex items-center bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 w-full md:w-auto">
          <button
            onClick={() => setMetric('streak')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              metric === 'streak'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Streak Days</span>
          </button>
          <button
            onClick={() => setMetric('japa')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              metric === 'japa'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 shadow-md shadow-amber-500/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Disc className="w-4 h-4" />
            <span>Naam Jap Count</span>
          </button>
        </div>

        {/* Geo Filter & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="flex items-center bg-zinc-950 p-1 rounded-xl border border-zinc-800 w-full sm:w-auto">
            <button
              onClick={() => setGeoFilter('all')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                geoFilter === 'all'
                  ? 'bg-zinc-800 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Countries 🌐
            </button>
            <button
              onClick={() => setGeoFilter('my_country')}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                geoFilter === 'my_country'
                  ? 'bg-zinc-800 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              My Country {userProfile?.countryFlag || '🇮🇳'}
            </button>
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sadhak or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 text-xs text-white pl-9 pr-3 py-2 rounded-xl border border-zinc-800 focus:border-amber-500/50 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Podium (Only shown when verified public sadhaks exist) */}
      {top1 ? (
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            {/* Rank #2 Silver (Left) */}
            {top2 ? (
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="relative mb-3 flex flex-col items-center">
                  <span className="text-2xl mb-1">{top2.countryFlag}</span>
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 border-2 border-slate-300/60 p-1 flex items-center justify-center text-slate-200 font-bold shadow-lg shadow-slate-500/10">
                    <Medal className="w-8 h-8 text-slate-300" />
                  </div>
                  <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-slate-200 text-zinc-950 text-[11px] font-black shadow">
                    #2
                  </span>
                </div>

                <div className="w-full rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-slate-400/30 p-5 text-center flex flex-col items-center backdrop-blur-xl">
                  <h3 className="font-bold text-white text-base truncate max-w-[180px]">
                    {top2.name}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{top2.city}, {top2.country}</span>
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-500/10 border border-slate-400/30 text-slate-200 font-extrabold text-sm">
                    {metric === 'streak' ? (
                      <>
                        <Flame className="w-4 h-4 text-slate-300 fill-slate-300" />
                        <span>{top2.streakDays} Days</span>
                      </>
                    ) : (
                      <>
                        <Disc className="w-4 h-4 text-slate-300" />
                        <span>{top2.japaCount.toLocaleString()} Jap</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 mt-2">
                    {top2.title}
                  </span>
                </div>
              </div>
            ) : (
              <div className="order-2 md:order-1 hidden md:flex flex-col items-center p-6 rounded-3xl border border-dashed border-zinc-800 text-center text-zinc-600 text-xs">
                <span>Rank #2 Spot Open</span>
                <span className="text-[10px] text-zinc-700 mt-1">Complete setup to claim</span>
              </div>
            )}

            {/* Rank #1 Saffron Gold Crown (Center, Tallest) */}
            <div className="order-1 md:order-2 flex flex-col items-center -mt-6">
              <div className="relative mb-3 flex flex-col items-center">
                <Crown className="w-8 h-8 text-amber-400 animate-bounce mb-1 drop-shadow-lg" />
                <span className="text-3xl mb-1">{top1.countryFlag}</span>
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 p-1 flex items-center justify-center text-zinc-950 font-black shadow-2xl shadow-amber-500/30">
                  <Trophy className="w-10 h-10 text-zinc-950 fill-zinc-950" />
                </div>
                <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 text-xs font-black shadow-lg shadow-amber-500/40">
                  #1 CHAMPION
                </span>
              </div>

              <div className="w-full rounded-3xl bg-gradient-to-b from-amber-950/40 via-zinc-900 to-zinc-950 border-2 border-amber-500/50 p-6 text-center flex flex-col items-center backdrop-blur-2xl shadow-2xl shadow-amber-500/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                  Divya Tejas Winner
                </span>
                <h3 className="font-extrabold text-white text-lg md:text-xl truncate max-w-[200px] mt-0.5">
                  {top1.name}
                </h3>
                <p className="text-xs text-zinc-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{top1.city}, {top1.country}</span>
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-black text-base shadow-lg shadow-amber-500/20">
                  {metric === 'streak' ? (
                    <>
                      <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
                      <span>{top1.streakDays} Days</span>
                    </>
                  ) : (
                    <>
                      <Disc className="w-5 h-5 text-amber-400" />
                      <span>{top1.japaCount.toLocaleString()} Jap</span>
                    </>
                  )}
                </div>
                <span className="text-xs font-bold text-amber-400 mt-2">
                  👑 {top1.title}
                </span>
              </div>
            </div>

            {/* Rank #3 Bronze (Right) */}
            {top3 ? (
              <div className="order-3 flex flex-col items-center">
                <div className="relative mb-3 flex flex-col items-center">
                  <span className="text-2xl mb-1">{top3.countryFlag}</span>
                  <div className="w-16 h-16 rounded-2xl bg-zinc-800 border-2 border-amber-700/60 p-1 flex items-center justify-center text-amber-600 font-bold shadow-lg shadow-amber-800/20">
                    <Medal className="w-8 h-8 text-amber-600" />
                  </div>
                  <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-amber-700 text-amber-100 text-[11px] font-black shadow">
                    #3
                  </span>
                </div>

                <div className="w-full rounded-3xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-700/30 p-5 text-center flex flex-col items-center backdrop-blur-xl">
                  <h3 className="font-bold text-white text-base truncate max-w-[180px]">
                    {top3.name}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{top3.city}, {top3.country}</span>
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-700/10 border border-amber-700/30 text-amber-300 font-extrabold text-sm">
                    {metric === 'streak' ? (
                      <>
                        <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span>{top3.streakDays} Days</span>
                      </>
                    ) : (
                      <>
                        <Disc className="w-4 h-4 text-amber-500" />
                        <span>{top3.japaCount.toLocaleString()} Jap</span>
                      </>
                    )}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-amber-600 mt-2">
                    {top3.title}
                  </span>
                </div>
              </div>
            ) : (
              <div className="order-3 hidden md:flex flex-col items-center p-6 rounded-3xl border border-dashed border-zinc-800 text-center text-zinc-600 text-xs">
                <span>Rank #3 Spot Open</span>
                <span className="text-[10px] text-zinc-700 mt-1">Complete setup to claim</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State when zero public sadhaks exist */
        <div className="rounded-3xl bg-zinc-900/60 border border-amber-500/20 p-10 text-center space-y-4 max-w-xl mx-auto backdrop-blur-xl shadow-xl">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto">
            🏆
          </div>
          <h3 className="text-xl font-bold text-white font-cinzel">
            No Public Sadhaks Ranked Yet
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Be the very first warrior to take the sacred Sankalpa and claim the <strong className="text-amber-400">#1 Saffron Gold</strong> position on the Global Leaderboard!
          </p>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-onboarding-wizard'));
              }
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Complete Setup to Claim Rank #1</span>
          </button>
        </div>
      )}

      {/* Current User Standing Sticky Bar */}
      {myPublicEntry && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-2 border-amber-500/40 p-4 backdrop-blur-xl flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shadow-lg">
              #{myPublicEntry.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">{myPublicEntry.name} (You)</span>
                <span className="text-xs">{myPublicEntry.countryFlag}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {myPublicEntry.title}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {myPublicEntry.city}, {myPublicEntry.country} • Keep going brother, honor your Sankalpa!
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-amber-400">
              {metric === 'streak' ? `${myPublicEntry.streakDays} Days` : `${myPublicEntry.japaCount.toLocaleString()} Jap`}
            </span>
            <span className="text-[10px] text-zinc-400 block">Personal Score</span>
          </div>
        </div>
      )}

      {/* Top Roll: Active Dynamic Sadhaks List */}
      {filteredList.length > 0 && (
        <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Verified Sadhak Ranks ({filteredList.length})</span>
            </h2>
            <span className="text-xs text-zinc-400">
              Dynamic LocalStorage Verification
            </span>
          </div>

          <div className="divide-y divide-zinc-800/60 max-h-[600px] overflow-y-auto custom-scrollbar">
            {filteredList.map((sadhak) => {
              const isSelf = sadhak.isCurrentUser;
              return (
                <div
                  key={`${sadhak.rank}-${sadhak.name}`}
                  className={`px-4 sm:px-6 py-3.5 flex items-center justify-between transition-colors ${
                    isSelf
                      ? 'bg-amber-500/10 border-l-4 border-amber-500'
                      : 'hover:bg-zinc-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Rank indicator */}
                    <span
                      className={`w-7 sm:w-8 text-center text-xs sm:text-sm font-extrabold ${
                        sadhak.rank === 1
                          ? 'text-amber-400'
                          : sadhak.rank === 2
                          ? 'text-slate-300'
                          : sadhak.rank === 3
                          ? 'text-amber-600'
                          : 'text-zinc-500'
                      }`}
                    >
                      #{sadhak.rank}
                    </span>

                    {/* Flag */}
                    <span className="text-xl sm:text-2xl">{sadhak.countryFlag}</span>

                    {/* Name and details */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-bold truncate ${isSelf ? 'text-amber-300' : 'text-zinc-200'}`}>
                          {sadhak.name}
                        </span>
                        {isSelf && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {sadhak.city}, {sadhak.country}
                      </p>
                    </div>
                  </div>

                  {/* Score & Badge */}
                  <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
                    <div className="hidden sm:block text-right">
                      <span className="text-[10px] uppercase font-bold text-zinc-500 block">Status</span>
                      <span className="text-xs font-semibold text-zinc-300">{sadhak.title}</span>
                    </div>

                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 font-black text-xs sm:text-sm text-amber-400">
                        {metric === 'streak' ? (
                          <>
                            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                            <span>{sadhak.streakDays} d</span>
                          </>
                        ) : (
                          <>
                            <Disc className="w-3.5 h-3.5 text-amber-400" />
                            <span>{sadhak.japaCount.toLocaleString()}</span>
                          </>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-500 block">
                        {metric === 'streak' ? 'Clean Streak' : 'Naam Jap'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardView;
