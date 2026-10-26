// Reactive, persistent Community Store for Brahmacharya Mitra
// Manages real user posts, YouTube-style comments, and likes in LocalStorage
import { getStoredStreak } from './streakStore';

export interface CommentItem {
  id: string;
  author: string;
  streak: number;
  badge: string;
  timeAgo: string;
  timestamp: number;
  content: string;
  likes: number;
  userLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  streak: number;
  badge: string;
  timeAgo: string;
  timestamp: number;
  content: string;
  likes: number;
  cheers: number;
  userLiked?: boolean;
  userCheered?: boolean;
  comments: CommentItem[];
}

const STORAGE_KEY = 'bm_community_real_posts';

// Helper to calculate human friendly time
export function formatTimeAgo(timestamp: number): string {
  const diffSec = Math.floor((Date.now() - timestamp) / 1000);
  if (diffSec < 60) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDays = Math.floor(diffHr / 24);
  return `${diffDays}d ago`;
}

// Retrieve posts from LocalStorage (defaults to EMPTY array, zero fake posts)
export function getStoredPosts(): CommunityPost[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: CommunityPost[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Save posts and dispatch reactive event
function savePosts(posts: CommunityPost[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('community-updated', { detail: { count: posts.length } }));
  } catch (err) {
    console.error('Failed to save community posts', err);
  }
}

// Add a real new user post
export function createCommunityPost(content: string, authorName?: string): CommunityPost {
  const current = getStoredStreak();
  const streak = current.days;
  const author = authorName?.trim() || 'You (Sadhak)';

  const badge = streak >= 90
    ? '👑 Urdhva-Retas Master'
    : streak >= 45
    ? '⚡ Ojas Transmuter'
    : streak >= 21
    ? '🔥 Tejas Warrior'
    : streak >= 7
    ? '🛡️ Agni Sadhak'
    : '🌱 Bhasma Seeker';

  const newPost: CommunityPost = {
    id: 'post_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    author,
    streak,
    badge,
    timeAgo: 'Just now',
    timestamp: Date.now(),
    content: content.trim(),
    likes: 1,
    cheers: 1,
    userLiked: true,
    userCheered: true,
    comments: [],
  };

  const existing = getStoredPosts();
  const updated = [newPost, ...existing];
  savePosts(updated);
  return newPost;
}

// Add a YouTube-style reply / comment to an existing post
export function addCommentToPost(postId: string, commentContent: string, authorName?: string): CommentItem | null {
  const current = getStoredStreak();
  const streak = current.days;
  const author = authorName?.trim() || 'You (Sadhak)';

  const badge = streak >= 30 ? '⚡ Tejas Sadhak' : '🔥 Fellow Sadhak';

  const newComment: CommentItem = {
    id: 'cmt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    author,
    streak,
    badge,
    timeAgo: 'Just now',
    timestamp: Date.now(),
    content: commentContent.trim(),
    likes: 0,
    userLiked: false,
  };

  const existing = getStoredPosts();
  const updated = existing.map(post => {
    if (post.id === postId) {
      return {
        ...post,
        comments: [...(post.comments || []), newComment],
      };
    }
    return post;
  });

  savePosts(updated);
  return newComment;
}

// Toggle like on a post
export function toggleLikePost(postId: string) {
  const existing = getStoredPosts();
  const updated = existing.map(post => {
    if (post.id === postId) {
      const isLiked = !!post.userLiked;
      return {
        ...post,
        likes: isLiked ? Math.max(0, post.likes - 1) : post.likes + 1,
        userLiked: !isLiked,
      };
    }
    return post;
  });
  savePosts(updated);
}

// Toggle cheer / pranam on a post
export function toggleCheerPost(postId: string) {
  const existing = getStoredPosts();
  const updated = existing.map(post => {
    if (post.id === postId) {
      const isCheered = !!post.userCheered;
      return {
        ...post,
        cheers: isCheered ? Math.max(0, post.cheers - 1) : post.cheers + 1,
        userCheered: !isCheered,
      };
    }
    return post;
  });
  savePosts(updated);
}

// Toggle like on a comment
export function toggleLikeComment(postId: string, commentId: string) {
  const existing = getStoredPosts();
  const updated = existing.map(post => {
    if (post.id === postId) {
      const updatedComments = (post.comments || []).map(cmt => {
        if (cmt.id === commentId) {
          const isLiked = !!cmt.userLiked;
          return {
            ...cmt,
            likes: isLiked ? Math.max(0, cmt.likes - 1) : cmt.likes + 1,
            userLiked: !isLiked,
          };
        }
        return cmt;
      });
      return { ...post, comments: updatedComments };
    }
    return post;
  });
  savePosts(updated);
}

// Delete post (user moderation)
export function deletePost(postId: string) {
  const existing = getStoredPosts();
  const updated = existing.filter(p => p.id !== postId);
  savePosts(updated);
}
