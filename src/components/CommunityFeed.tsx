import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Flame, MessageSquare, Heart, Send, Sparkles,
  Share2, Shield, Award, CheckCircle, Trash2, CornerDownRight,
  Smile, Clock, ChevronDown, ChevronUp, UserCheck
} from 'lucide-react';
import type { CommunityPost, CommentItem } from '../communityStore';
import {
  getStoredPosts,
  createCommunityPost,
  addCommentToPost,
  toggleLikePost,
  toggleCheerPost,
  toggleLikeComment,
  deletePost,
  formatTimeAgo,
} from '../communityStore';
import { getStoredStreak } from '../streakStore';

export default function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [newText, setNewText] = useState('');
  const [authorName, setAuthorName] = useState('You (Sadhak)');
  const [currentStreak, setCurrentStreak] = useState(8);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load posts and streak from real reactive store
  useEffect(() => {
    const loadData = () => {
      setPosts(getStoredPosts());
      setCurrentStreak(getStoredStreak().days);
    };

    loadData();

    window.addEventListener('community-updated', loadData);
    window.addEventListener('streak-updated', loadData);

    return () => {
      window.removeEventListener('community-updated', loadData);
      window.removeEventListener('streak-updated', loadData);
    };
  }, []);

  // Handle creating a real post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    createCommunityPost(newText.trim(), authorName);
    setNewText('');
    setIsSubmitting(false);
  };

  // Handle submitting a YouTube-style reply / comment
  const handleAddComment = (postId: string) => {
    const text = replyTextMap[postId];
    if (!text || !text.trim()) return;

    addCommentToPost(postId, text.trim(), authorName);
    setReplyTextMap(prev => ({ ...prev, [postId]: '' }));
  };

  // Toggle comments section visibility for a post
  const toggleCommentsSection = (postId: string) => {
    setActiveCommentPostId(prev => (prev === postId ? null : postId));
  };

  return (
    <div className="flex flex-col h-full text-zinc-100 space-y-4 overflow-y-auto pr-1 pb-16 w-full max-w-full">
      {/* ── Community Banner (With Real Live Counter) ── */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-950 to-zinc-950 border border-amber-500/30 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel">
              Akhand Brotherhood Feed
            </h3>
            <p className="text-[10px] sm:text-xs text-zinc-400">
              Live Sadhak Community • <strong className="text-amber-300">{posts.length} Realizations Shared</strong>
            </p>
          </div>
        </div>

        <span className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Live Feed</span>
        </span>
      </div>

      {/* ── Real Post Composer ── */}
      <form
        onSubmit={handleCreatePost}
        className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-500/40 transition-colors shadow-md space-y-3"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Share your realization, urge victory, or question:</span>
          </span>
          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
            🔥 Day {currentStreak}
          </span>
        </div>

        <textarea
          value={newText}
          onChange={e => setNewText(e.target.value)}
          rows={3}
          placeholder="Inspire your brothers... e.g. Just transmuted a Day 14 urge using Pranayama and Surya Namaskar!"
          className="w-full p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none transition"
        />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="text-zinc-500">Posting as:</span>
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-md text-[11px] text-amber-300 font-semibold focus:outline-none focus:border-amber-400 w-32"
              placeholder="Your Alias"
            />
          </div>

          <button
            type="submit"
            disabled={!newText.trim() || isSubmitting}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 text-xs font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-40 transition cursor-pointer"
          >
            <span>Post Realization</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* ── Clean Empty State when No Real Posts Exist ── */}
      {posts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-800 text-center flex flex-col items-center justify-center space-y-3 my-4 shadow-sm"
        >
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <MessageSquare className="w-7 h-7" />
          </div>

          <div className="space-y-1 max-w-sm">
            <h4 className="text-sm sm:text-base font-bold text-white font-cinzel">
              Be the first Sadhak to share your realization today!
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every master was once a beginner. Share how you conquered an urge, channeled your Ojas into creative work, or chanted today. Your words can save a brother from relapse.
            </p>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-bold text-amber-400/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              100% Authentic • Local Storage Encrypted
            </span>
          </div>
        </motion.div>
      )}

      {/* ── Real User Posts Feed ── */}
      <div className="space-y-3.5">
        {posts.map(post => {
          const isCommentsOpen = activeCommentPostId === post.id;
          const commentsCount = post.comments?.length || 0;

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all space-y-3 shadow-md"
            >
              {/* Author & Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-500/20 border border-amber-500/40 flex items-center justify-center text-xs font-black text-amber-300 shadow-sm">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 flex-wrap">
                      <span>{post.author}</span>
                      <span className="text-[10px] font-black text-amber-300 bg-amber-400/15 border border-amber-400/30 px-2 py-0.2 rounded-full">
                        🔥 Day {post.streak}
                      </span>
                    </div>
                    <div className="text-[10px] text-zinc-400 flex items-center gap-1.5 mt-0.5">
                      <span>{post.badge}</span>
                      <span>•</span>
                      <span>{formatTimeAgo(post.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Delete button (for user's post) */}
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-1 rounded-lg text-zinc-600 hover:text-red-400 transition"
                  title="Remove post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Post Content */}
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed break-words whitespace-pre-wrap">
                {post.content}
              </p>

              {/* Interaction Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-900 text-xs flex-wrap">
                {/* Heart / Like Button */}
                <button
                  onClick={() => toggleLikePost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                    post.userLiked
                      ? 'bg-red-500/20 border-red-500/40 text-red-300 shadow-[0_0_12px_rgba(239,68,68,0.25)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.userLiked ? 'fill-red-400 text-red-400' : ''}`} />
                  <span className="font-bold">{post.likes}</span>
                </button>

                {/* Pranam / Cheer Flame Button */}
                <button
                  onClick={() => toggleCheerPost(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                    post.userCheered
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Flame className={`w-3.5 h-3.5 ${post.userCheered ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span className="font-bold">{post.cheers} Pranam</span>
                </button>

                {/* YouTube-Style Comment / Reply Button */}
                <button
                  onClick={() => toggleCommentsSection(post.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                    isCommentsOpen
                      ? 'bg-purple-500/20 border-purple-500/40 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.25)]'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="font-bold">{commentsCount} {commentsCount === 1 ? 'Reply' : 'Replies'}</span>
                  {isCommentsOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* ── YouTube-Style Nested Comments & Replies Thread ── */}
              <AnimatePresence>
                {isCommentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-3 border-t border-zinc-800/80 space-y-3"
                  >
                    {/* Inline Response / Reply Composer */}
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-900/90 border border-zinc-800">
                      <CornerDownRight className="w-4 h-4 text-purple-400 flex-shrink-0 ml-1" />
                      <input
                        type="text"
                        value={replyTextMap[post.id] || ''}
                        onChange={e => setReplyTextMap({ ...replyTextMap, [post.id]: e.target.value })}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddComment(post.id);
                          }
                        }}
                        placeholder="Add a respectful reply or brotherly encouragement..."
                        className="flex-1 bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        disabled={!replyTextMap[post.id]?.trim()}
                        className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs transition cursor-pointer"
                      >
                        Reply
                      </button>
                    </div>

                    {/* Replies List */}
                    {post.comments && post.comments.length > 0 ? (
                      <div className="space-y-2 pl-3 border-l-2 border-purple-500/30">
                        {post.comments.map(cmt => (
                          <div
                            key={cmt.id}
                            className="p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-[10px] font-black text-purple-300">
                                  {cmt.author.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-xs font-bold text-zinc-200">{cmt.author}</span>
                                <span className="text-[9px] font-bold text-amber-300 bg-amber-500/10 px-1.5 py-0.2 rounded">
                                  Day {cmt.streak}
                                </span>
                              </div>
                              <span className="text-[10px] text-zinc-500">{formatTimeAgo(cmt.timestamp)}</span>
                            </div>

                            <p className="text-xs text-zinc-300 pl-8 leading-relaxed">
                              {cmt.content}
                            </p>

                            <div className="flex items-center justify-end pl-8">
                              <button
                                onClick={() => toggleLikeComment(post.id, cmt.id)}
                                className={`flex items-center gap-1 text-[10px] font-semibold transition cursor-pointer ${
                                  cmt.userLiked ? 'text-red-400' : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                              >
                                <Heart className={`w-3 h-3 ${cmt.userLiked ? 'fill-red-400 text-red-400' : ''}`} />
                                <span>{cmt.likes > 0 ? cmt.likes : ''}</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-[11px] text-zinc-500 italic pl-3 py-1">
                        No replies yet. Be the first to encourage this brother!
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
