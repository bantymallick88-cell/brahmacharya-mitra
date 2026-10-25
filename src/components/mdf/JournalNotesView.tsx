import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FileText, CheckSquare, Clock, Plus,
  Trash2, Sparkles, Flame, Calendar, Tag, Check, X,
  AlertCircle, ShieldCheck
} from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  mood: 'victorious' | 'calm' | 'struggling' | 'transmuted';
  title: string;
  content: string;
  tags: string[];
}

interface NoteEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  category: 'sadhana' | 'mind' | 'body';
}

const DEFAULT_TODOS: TodoItem[] = [
  { id: '1', text: 'Wake up at 4:30 AM (Brahma Muhurta)', completed: true, category: 'sadhana' },
  { id: '2', text: 'Cold shower & 15 min Pranayama', completed: true, category: 'sadhana' },
  { id: '3', text: '20 Surya Namaskars / Physical Workout', completed: false, category: 'body' },
  { id: '4', text: 'Zero social media scroll before 12 PM', completed: true, category: 'mind' },
  { id: '5', text: 'Read 1 Chapter of Sacred Scriptures', completed: false, category: 'sadhana' },
  { id: '6', text: 'Evening Urge Surf & 108 Gayatri Japa', completed: false, category: 'sadhana' },
];

const DEFAULT_SCHEDULE = [
  { time: '04:00 AM - 05:00 AM', title: 'Brahma Muhurta Awakening', desc: 'Pranayama, Meditation & Gayatri Japa before sunrise' },
  { time: '05:00 AM - 06:15 AM', title: 'Cold Shower & Asanas', desc: 'Vigorous physical training to ground sexual energy' },
  { time: '08:30 AM - 12:30 PM', title: 'Deep Intellectual Sadhana', desc: 'Peak cognitive work with supreme focus' },
  { time: '01:00 PM - 01:45 PM', title: 'Sattvic Bhojan (Mindful Eating)', desc: 'Light, non-stimulating food free from excess spice' },
  { time: '06:00 PM - 07:00 PM', title: 'Evening Prana Transmutation', desc: 'Walking in nature, breathwork, or gym workout' },
  { time: '09:00 PM - 09:45 PM', title: 'Night Reflection & Digital Detox', desc: 'Phone away from bed, Hanuman Chalisa, deep sleep' },
];

const DEFAULT_JOURNALS: JournalEntry[] = [
  {
    id: 'j1',
    date: 'Today, Day 7',
    mood: 'transmuted',
    title: 'Surfed intense Day 7 urges — channeled into workout',
    content: 'Around 4 PM felt the classic dopamine crave. Immediately did 30 pushups, stepped outside in fresh air and practiced Box Breathing. Urge vanished after 8 minutes. Ojas preserved.',
    tags: ['#UrgeSurfing', '#Transmutation', '#ColdShower'],
  },
  {
    id: 'j2',
    date: 'Yesterday, Day 6',
    mood: 'calm',
    title: 'Mind clarity returning noticeably',
    content: 'Woke up at 5:00 AM without grogginess. Finished 3 hours of focused reading. Eye contact felt natural and confident today.',
    tags: ['#Clarity', '#Confidence', '#BrahmaMuhurta'],
  }
];

const DEFAULT_NOTES: NoteEntry[] = [
  {
    id: 'n1',
    title: 'Swami Vivekananda on Urdhva-Retas',
    content: '“The mind is shaped by the quality of semen. If preserved, it transforms into Ojas Shakti — creating supreme intellect, memory, and magnetic personality.”',
    category: 'Sacred Wisdom',
    date: 'Saved'
  },
  {
    id: 'n2',
    title: 'The 10-Minute Urge Rule',
    content: 'Neurochemically, a physical urge spikes for only 7–12 minutes. Change posture, drink ice water, and move muscles. Do not negotiate with the dopamine loop.',
    category: 'Neuroscience',
    date: 'Strategy'
  }
];

export default function JournalNotesView() {
  const [activeTab, setActiveTab] = useState<'journal' | 'notes' | 'todo' | 'schedule'>('journal');
  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bm_mdf_journals');
      return saved ? JSON.parse(saved) : DEFAULT_JOURNALS;
    } catch {
      return DEFAULT_JOURNALS;
    }
  });

  const [notes, setNotes] = useState<NoteEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bm_mdf_notes');
      return saved ? JSON.parse(saved) : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [todos, setTodos] = useState<TodoItem[]>(() => {
    try {
      const saved = localStorage.getItem('bm_mdf_todos');
      return saved ? JSON.parse(saved) : DEFAULT_TODOS;
    } catch {
      return DEFAULT_TODOS;
    }
  });

  // Modal for quick adding
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newMood, setNewMood] = useState<'victorious' | 'calm' | 'struggling' | 'transmuted'>('transmuted');
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('bm_mdf_journals', JSON.stringify(journals));
    } catch {}
  }, [journals]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_mdf_notes', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_mdf_todos', JSON.stringify(todos));
    } catch {}
  }, [todos]);

  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() && !newContent.trim()) return;

    if (activeTab === 'journal') {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: 'Today, Just Now',
        mood: newMood,
        title: newTitle || 'Daily Sadhana Log',
        content: newContent,
        tags: newTag ? newTag.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`) : ['#Brahmacharya'],
      };
      setJournals([newEntry, ...journals]);
    } else if (activeTab === 'notes') {
      const newNote: NoteEntry = {
        id: Date.now().toString(),
        title: newTitle || 'Insight Note',
        content: newContent,
        category: newTag || 'Personal Sadhana',
        date: 'Saved Today'
      };
      setNotes([newNote, ...notes]);
    } else if (activeTab === 'todo') {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTitle || newContent,
        completed: false,
        category: 'sadhana'
      };
      setTodos([...todos, newTodo]);
    }

    setNewTitle('');
    setNewContent('');
    setNewTag('');
    setAddModalOpen(false);
  };

  const completedTodosCount = todos.filter(t => t.completed).length;

  return (
    <div className="relative flex flex-col h-full text-zinc-100">
      {/* ── Sub Navigation Tabs ── */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 mb-4">
        {[
          { id: 'journal', label: 'Journal', icon: BookOpen },
          { id: 'notes', label: 'Notes', icon: FileText },
          { id: 'todo', label: 'Sadhana', icon: CheckSquare },
          { id: 'schedule', label: 'Schedule', icon: Clock },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/25 to-yellow-500/20 border border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Content Panes ── */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 pb-16">

        {/* 1. JOURNAL TAB */}
        {activeTab === 'journal' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-400">Personal Reflections & Urge Logs</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {journals.length} Entries
              </span>
            </div>

            {journals.map(entry => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all shadow-md space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-amber-300">{entry.date}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800 capitalize">
                      {entry.mood}
                    </span>
                  </div>
                  <button
                    onClick={() => setJournals(journals.filter(j => j.id !== entry.id))}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{entry.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{entry.content}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {entry.tags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-medium text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* 2. NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-400">Sacred Wisdom & Battle Rules</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                {notes.length} Notes
              </span>
            </div>

            {notes.map(note => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all shadow-md space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                    {note.category}
                  </span>
                  <button
                    onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4 className="text-sm font-bold text-white">{note.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed italic">{note.content}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* 3. TODO TAB */}
        {activeTab === 'todo' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-400">Daily Sadhana Checklist</span>
              <span className="text-xs font-bold text-amber-300">
                {completedTodosCount} / {todos.length} Done
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                style={{ width: `${(completedTodosCount / (todos.length || 1)) * 100}%` }}
              />
            </div>

            <div className="space-y-2 pt-1">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                    todo.completed
                      ? 'bg-zinc-950/50 border-emerald-500/30 text-zinc-400'
                      : 'bg-zinc-950/80 border-zinc-800/90 hover:border-amber-500/40 text-zinc-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
                      todo.completed
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-zinc-700 hover:border-amber-400'
                    }`}>
                      {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs font-medium truncate ${todo.completed ? 'line-through text-zinc-500' : ''}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setTodos(todos.filter(t => t.id !== todo.id)); }}
                    className="p-1 text-zinc-600 hover:text-red-400 transition ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SCHEDULE TAB */}
        {activeTab === 'schedule' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-zinc-400">Ideal Dinacharya (Vedic Routine)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                Transmutation Mode
              </span>
            </div>

            <div className="relative pl-4 border-l border-amber-500/30 space-y-4 my-2">
              {DEFAULT_SCHEDULE.map((item, i) => (
                <div key={i} className="relative group">
                  <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                  <div className="p-3 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-400/50 transition">
                    <div className="text-[10px] font-bold text-amber-400">{item.time}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{item.title}</div>
                    <div className="text-[11px] text-zinc-400 mt-1">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── Floating Quick-Add Button (+) ── */}
      {activeTab !== 'schedule' && (
        <div className="absolute bottom-3 right-3 z-30">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setAddModalOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-zinc-950 flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.6)] cursor-pointer"
            aria-label="Add entry"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </motion.button>
        </div>
      )}

      {/* ── Quick Add Modal ── */}
      <AnimatePresence>
        {addModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-amber-500/40 p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    Add to {activeTab === 'journal' ? 'Journal' : activeTab === 'notes' ? 'Notes' : 'Sadhana Todo'}
                  </span>
                </h3>
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    {activeTab === 'todo' ? 'Todo Task' : 'Title / Focus'}
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder={activeTab === 'todo' ? 'e.g. 108 Gayatri Mantra Japa' : 'e.g. Surfed 4 PM Urge Spike'}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                </div>

                {activeTab !== 'todo' && (
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Details / Thoughts</label>
                    <textarea
                      value={newContent}
                      onChange={e => setNewContent(e.target.value)}
                      rows={3}
                      placeholder="Write your reflection, trigger awareness, or wisdom..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                    />
                  </div>
                )}

                {activeTab === 'journal' && (
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">State of Mind</label>
                    <div className="grid grid-cols-4 gap-1 text-[10px]">
                      {(['victorious', 'transmuted', 'calm', 'struggling'] as const).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setNewMood(m)}
                          className={`py-1.5 px-1 rounded-lg capitalize border font-medium ${
                            newMood === m
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                              : 'border-zinc-800 bg-zinc-900 text-zinc-400'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Tags / Category</label>
                  <input
                    type="text"
                    value={newTag}
                    onChange={e => setNewTag(e.target.value)}
                    placeholder="e.g. #UrgeSurf, #ColdShower"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setAddModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
