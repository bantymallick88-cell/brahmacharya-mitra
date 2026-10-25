import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Flame, MessageSquare, Heart, Send, Sparkles,
  Share2, Shield, Award, CheckCircle
} from 'lucide-react';

interface Post {
  id: string;
  author: string;
  badge: string;
  streak: number;
  timeAgo: string;
  content: string;
  likes: number;
  cheers: number;
  userLiked?: boolean;
  userCheered?: boolean;
}

const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Sadhak Arjun',
    badge: '👑 Urdhva-Retas Warrior',
    streak: 64,
    timeAgo: '15m ago',
    content: 'Day 64: The brain fog is 100% gone. Memorizing verses and solving complex engineering algorithms feels effortless. If you are struggling on Day 3 or Day 7, DO NOT GIVE UP. Your future self is waiting.',
    likes: 48,
    cheers: 27
  },
  {
    id: 'p2',
    author: 'Veerya Rakshak',
    badge: '🔥 Bhasma Destroyer',
    streak: 18,
    timeAgo: '1h ago',
    content: 'Surfed a massive urge spike after returning from work exhausted. Used the MDF Breathe module for 5 minutes + cold shower. Energy completely rerouted to my upper chakras.',
    likes: 35,
    cheers: 19
  },
  {
    id: 'p3',
    author: 'Vedic Bramhachari',
    badge: '⚡ Tejas Transmuter',
    streak: 30,
    timeAgo: '3h ago',
    content: 'Hit 30 Days clean today! 30 days ago I was numb, depressed, and exhausted from screens. Today I woke up at 4:30 AM singing Hanuman Chalisa. Jai Bajrangbali! 🚩',
    likes: 82,
    cheers: 56
  }
];

export default function CommunityView() {
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem('bm_mdf_community_posts');
      return saved ? JSON.parse(saved) : INITIAL_POSTS;
    } catch {
      return INITIAL_POSTS;
    }
  });

  const [newText, setNewText] = useState('');
  const [currentStreak, setCurrentStreak] = useState(7);

  useEffect(() => {
    try {
      const savedStreak = localStorage.getItem('bm_streak_days');
      if (savedStreak) setCurrentStreak(parseInt(savedStreak, 10));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('bm_mdf_community_posts', JSON.stringify(posts));
    } catch {}
  }, [posts]);

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.userLiked ? p.likes - 1 : p.likes + 1,
          userLiked: !p.userLiked
        };
      }
      return p;
    }));
  };

  const handleCheer = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          cheers: p.userCheered ? p.cheers - 1 : p.cheers + 1,
          userCheered: !p.userCheered
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You (Sadhak)',
      badge: currentStreak >= 30 ? '⚡ Tejas Warrior' : '🔥 Bhasma Seeker',
      streak: currentStreak,
      timeAgo: 'Just now',
      content: newText.trim(),
      likes: 1,
      cheers: 1,
      userLiked: true
    };

    setPosts([newPost, ...posts]);
    setNewText('');
  };

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-4 overflow-y-auto pr-1 pb-16">
      {/* ── Community Banner ── */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-zinc-950 to-zinc-950 border border-amber-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white">Akhand Brotherhood Feed</h3>
            <p className="text-[10px] text-zinc-400">50,000+ Sadhaks preserving vitality together</p>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Live
        </span>
      </div>

      {/* ── Post Composer ── */}
      <form onSubmit={handleCreatePost} className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 space-y-2.5">
        <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-400">
          <span>Share your realization, urge victory, or question:</span>
          <span className="text-amber-400 font-bold">🔥 Day {currentStreak}</span>
        </div>
        <textarea
          value={newText}
          onChange={e => setNewText(e.target.value)}
          rows={2}
          placeholder="Inspire your brothers... e.g. Just defeated a heavy Day 14 urge with Surya Namaskar!"
          className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
        />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] text-zinc-500">Anonymous & 100% sacred space</span>
          <button
            type="submit"
            disabled={!newText.trim()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.3)] disabled:opacity-50 cursor-pointer"
          >
            <span>Post</span>
            <Send className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* ── Public Feed ── */}
      <div className="space-y-3">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-2.5 shadow-md"
          >
            {/* Author Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-bold text-amber-300">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{post.author}</span>
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-400/10 px-1.5 py-0.2 rounded">
                      Day {post.streak}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500">{post.badge} • {post.timeAgo}</div>
                </div>
              </div>
            </div>

            {/* Post Content */}
            <p className="text-xs text-zinc-300 leading-relaxed">{post.content}</p>

            {/* Interaction Row */}
            <div className="flex items-center gap-3 pt-1 border-t border-zinc-900 text-xs">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                  post.userLiked
                    ? 'bg-red-500/20 border-red-500/40 text-red-300'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-red-400 text-red-400' : ''}`} />
                <span>{post.likes}</span>
              </button>

              <button
                onClick={() => handleCheer(post.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition ${
                  post.userCheered
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                    : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                <Flame className={`w-3.5 h-3.5 ${post.userCheered ? 'fill-amber-400 text-amber-400' : ''}`} />
                <span>{post.cheers} Pranam</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
