import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Flame, Globe, Search, Crown, Medal,
  Sparkles, Filter, ChevronUp, UserCheck, Shield,
  Disc, MapPin, ArrowUpRight, Award, Zap
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
}

// Curated seed sadhaks from across India and the globe
const SEED_SADHAKS: Omit<LeaderboardEntry, 'rank'>[] = [
  { name: 'Aarav Sharma', country: 'India', countryFlag: '🇮🇳', city: 'Varanasi', streakDays: 365, japaCount: 152000, title: 'Paramhansa' },
  { name: 'Tenzing Norbu', country: 'Nepal', countryFlag: '🇳🇵', city: 'Kathmandu', streakDays: 320, japaCount: 124000, title: 'Paramhansa' },
  { name: 'Devendra Patel', country: 'India', countryFlag: '🇮🇳', city: 'Haridwar', streakDays: 280, japaCount: 98000, title: 'Ojasvi' },
  { name: 'Michael Harrison', country: 'United States', countryFlag: '🇺🇸', city: 'Austin, TX', streakDays: 245, japaCount: 65000, title: 'Ojasvi' },
  { name: 'Rohan Deshmukh', country: 'India', countryFlag: '🇮🇳', city: 'Pune', streakDays: 210, japaCount: 88000, title: 'Ojasvi' },
  { name: 'Priya Nambiar', country: 'India', countryFlag: '🇮🇳', city: 'Kochi', streakDays: 195, japaCount: 110000, title: 'Tejasvi' },
  { name: 'Liam Davies', country: 'United Kingdom', countryFlag: '🇬🇧', city: 'London', streakDays: 180, japaCount: 42000, title: 'Tejasvi' },
  { name: 'Keshav Bhattarai', country: 'Nepal', countryFlag: '🇳🇵', city: 'Pokhara', streakDays: 172, japaCount: 76000, title: 'Tejasvi' },
  { name: 'Gurpreet Singh', country: 'Canada', countryFlag: '🇨🇦', city: 'Vancouver', streakDays: 160, japaCount: 54000, title: 'Tejasvi' },
  { name: 'Ananya Verma', country: 'India', countryFlag: '🇮🇳', city: 'Ayodhya', streakDays: 150, japaCount: 92000, title: 'Tejasvi' },
  { name: 'Siddharth Iyer', country: 'India', countryFlag: '🇮🇳', city: 'Bengaluru', streakDays: 140, japaCount: 68000, title: 'Tejasvi' },
  { name: 'Vikramaditya Roy', country: 'India', countryFlag: '🇮🇳', city: 'Kolkata', streakDays: 125, japaCount: 45000, title: 'Tejasvi' },
  { name: 'Kunal Singhal', country: 'United Arab Emirates', countryFlag: '🇦🇪', city: 'Dubai', streakDays: 115, japaCount: 51000, title: 'Paramhansa' },
  { name: 'Alexander Schmidt', country: 'Germany', countryFlag: '🇩🇪', city: 'Munich', streakDays: 108, japaCount: 38000, title: 'Paramhansa' },
  { name: 'Rishi Mohan', country: 'Australia', countryFlag: '🇦🇺', city: 'Melbourne', streakDays: 98, japaCount: 41000, title: 'Ojasvi' },
  { name: 'Gaurav Kulkarni', country: 'India', countryFlag: '🇮🇳', city: 'Mumbai', streakDays: 92, japaCount: 49000, title: 'Ojasvi' },
  { name: 'Sagar Mehta', country: 'India', countryFlag: '🇮🇳', city: 'Ahmedabad', streakDays: 85, japaCount: 36000, title: 'Tejasvi' },
  { name: 'James Wilson', country: 'United States', countryFlag: '🇺🇸', city: 'Denver, CO', streakDays: 80, japaCount: 29000, title: 'Tejasvi' },
  { name: 'Nikhil Trivedi', country: 'India', countryFlag: '🇮🇳', city: 'Ujjain', streakDays: 75, japaCount: 43000, title: 'Tejasvi' },
  { name: 'Omkar Joshi', country: 'India', countryFlag: '🇮🇳', city: 'Nashik', streakDays: 70, japaCount: 31000, title: 'Tejasvi' },
  { name: 'Tanmay Das', country: 'India', countryFlag: '🇮🇳', city: 'Bhubaneswar', streakDays: 65, japaCount: 27000, title: 'Tejasvi' },
  { name: 'Daniel Miller', country: 'Canada', countryFlag: '🇨🇦', city: 'Toronto', streakDays: 60, japaCount: 22000, title: 'Tejasvi' },
  { name: 'Harish Choudhary', country: 'India', countryFlag: '🇮🇳', city: 'Jaipur', streakDays: 56, japaCount: 34000, title: 'Veerya Rakshak' },
  { name: 'Lucas Rossi', country: 'Australia', countryFlag: '🇦🇺', city: 'Sydney', streakDays: 52, japaCount: 19000, title: 'Veerya Rakshak' },
  { name: 'Aditya Srivastava', country: 'India', countryFlag: '🇮🇳', city: 'Lucknow', streakDays: 48, japaCount: 28000, title: 'Veerya Rakshak' },
  { name: 'Subhash Chandra', country: 'India', countryFlag: '🇮🇳', city: 'Delhi', streakDays: 45, japaCount: 24000, title: 'Veerya Rakshak' },
  { name: 'Balaram Thapa', country: 'Nepal', countryFlag: '🇳🇵', city: 'Lalitpur', streakDays: 42, japaCount: 21000, title: 'Veerya Rakshak' },
  { name: 'David Clark', country: 'United Kingdom', countryFlag: '🇬🇧', city: 'Manchester', streakDays: 39, japaCount: 16000, title: 'Veerya Rakshak' },
  { name: 'Deepak Varma', country: 'India', countryFlag: '🇮🇳', city: 'Indore', streakDays: 35, japaCount: 18000, title: 'Veerya Rakshak' },
  { name: 'Satyam Mishra', country: 'India', countryFlag: '🇮🇳', city: 'Prayagraj', streakDays: 32, japaCount: 25000, title: 'Veerya Rakshak' },
  { name: 'Ethan Taylor', country: 'United States', countryFlag: '🇺🇸', city: 'Seattle, WA', streakDays: 28, japaCount: 14000, title: 'Veerya Rakshak' },
  { name: 'Pranav Nair', country: 'India', countryFlag: '🇮🇳', city: 'Thiruvananthapuram', streakDays: 25, japaCount: 17000, title: 'Veerya Rakshak' },
  { name: 'Saurabh Pandey', country: 'India', countryFlag: '🇮🇳', city: 'Rishikesh', streakDays: 22, japaCount: 19000, title: 'Veerya Rakshak' },
  { name: 'Govind Krishna', country: 'India', countryFlag: '🇮🇳', city: 'Vrindavan', streakDays: 21, japaCount: 30000, title: 'Veerya Rakshak' },
  { name: 'Marcus Weber', country: 'Germany', countryFlag: '🇩🇪', city: 'Berlin', streakDays: 19, japaCount: 11000, title: 'Sankalpa' },
  { name: 'Rajeev Menon', country: 'Singapore', countryFlag: '🇸🇬', city: 'Singapore', streakDays: 17, japaCount: 15000, title: 'Sankalpa' },
  { name: 'Manish Rawat', country: 'India', countryFlag: '🇮🇳', city: 'Dehradun', streakDays: 15, japaCount: 12000, title: 'Sankalpa' },
  { name: 'Hemant Bisht', country: 'India', countryFlag: '🇮🇳', city: 'Nainital', streakDays: 12, japaCount: 9000, title: 'Sankalpa' },
  { name: 'Noah Brown', country: 'United States', countryFlag: '🇺🇸', city: 'San Diego, CA', streakDays: 10, japaCount: 8500, title: 'Sankalpa' },
  { name: 'Vivek Ranjan', country: 'India', countryFlag: '🇮🇳', city: 'Patna', streakDays: 8, japaCount: 6500, title: 'Sankalpa' },
];

export const LeaderboardView: React.FC = () => {
  const [metric, setMetric] = useState<'streak' | 'japa'>('streak');
  const [geoFilter, setGeoFilter] = useState<'all' | 'my_country'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentUserStreak, setCurrentUserStreak] = useState<number>(14);
  const [currentUserJapa, setCurrentUserJapa] = useState<number>(108);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedProfile = localStorage.getItem('bm_user_profile');
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

      const savedStreak = localStorage.getItem('bm_active_streak');
      if (savedStreak) {
        setCurrentUserStreak(parseInt(savedStreak, 10) || 1);
      }

      const savedJapa = localStorage.getItem('bm_japa_counter');
      if (savedJapa) {
        setCurrentUserJapa(parseInt(savedJapa, 10) || 0);
      }
    } catch (e) {}
  }, []);

  // Build combined list including current user
  const combinedList = useMemo(() => {
    const list: Omit<LeaderboardEntry, 'rank'>[] = [...SEED_SADHAKS];

    if (userProfile && userProfile.name) {
      list.push({
        name: userProfile.name,
        country: userProfile.country || 'India',
        countryFlag: userProfile.countryFlag || '🇮🇳',
        city: userProfile.city || userProfile.state || 'My City',
        streakDays: currentUserStreak,
        japaCount: currentUserJapa,
        title:
          currentUserStreak >= 108
            ? 'Paramhansa'
            : currentUserStreak >= 90
            ? 'Ojasvi'
            : currentUserStreak >= 60
            ? 'Tejasvi'
            : currentUserStreak >= 21
            ? 'Veerya Rakshak'
            : 'Sankalpa',
        isCurrentUser: true,
      });
    }

    // Sort by metric
    if (metric === 'streak') {
      list.sort((a, b) => b.streakDays - a.streakDays);
    } else {
      list.sort((a, b) => b.japaCount - a.japaCount);
    }

    // Assign rank
    return list.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [metric, userProfile, currentUserStreak, currentUserJapa]);

  // Apply filters
  const filteredList = useMemo(() => {
    return combinedList.filter((item) => {
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
  }, [combinedList, geoFilter, userProfile, searchQuery]);

  // Top 3 Podium sadhaks (from filtered or total list)
  const top1 = filteredList[0];
  const top2 = filteredList[1];
  const top3 = filteredList[2];
  const remainingList = filteredList.slice(3);

  // Find current user's rank
  const myEntry = combinedList.find((i) => i.isCurrentUser);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Brahmacharya Global Tapasya Circle</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Global Sadhak <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 font-cinzel">Leaderboard</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-400">
          Unite with brave brothers & sisters preserving sacred vital force worldwide. Every day of continence lights up the divine flame.
        </p>
      </div>

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

      {/* Top 3 Podium (Only shown when not heavily filtered) */}
      {top1 && (
        <div className="pt-8 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto">
            {/* Rank #2 Silver (Left) */}
            {top2 && (
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
            {top3 && (
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
            )}
          </div>
        </div>
      )}

      {/* Current User Standing Sticky Bar */}
      {myEntry && (
        <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-900 to-amber-500/20 border-2 border-amber-500/40 p-4 backdrop-blur-xl flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-zinc-950 font-black text-sm flex items-center justify-center shadow-lg">
              #{myEntry.rank}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">{myEntry.name} (You)</span>
                <span className="text-xs">{myEntry.countryFlag}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                  {myEntry.title}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {myEntry.city}, {myEntry.country} • Keep going brother, honor your Sankalpa!
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-amber-400">
              {metric === 'streak' ? `${myEntry.streakDays} Days` : `${myEntry.japaCount.toLocaleString()} Jap`}
            </span>
            <span className="text-[10px] text-zinc-400 block">Personal Score</span>
          </div>
        </div>
      )}

      {/* Top 100 Scrollable Table/List */}
      <div className="rounded-3xl bg-zinc-900/80 border border-amber-500/20 backdrop-blur-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Honorable Sadhak Roll (Top 100)</span>
          </h2>
          <span className="text-xs text-zinc-400">
            Showing {filteredList.length} Sadhaks
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
    </div>
  );
};

export default LeaderboardView;
