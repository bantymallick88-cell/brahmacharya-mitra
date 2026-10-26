import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FileText, CheckSquare, Clock, Plus,
  Trash2, Sparkles, Flame, Calendar, Check, X,
  Bell, BellRing, History, RotateCcw, Sun, Moon,
  ChevronRight, AlertCircle, ShieldCheck, CheckCircle2
} from 'lucide-react';

export interface TodoTask {
  id: string;
  title: string;
  details?: string;
  scheduleType: 'daily' | 'once';
  time: string;
  date?: string;
  getNotification: boolean;
  completed: boolean;
  completedAt?: string;
  category: 'sadhana' | 'mind' | 'body' | 'transmutation';
}

export interface ScheduleBlock {
  id: string;
  time: string;
  title: string;
  desc: string;
  icon?: string;
  isCustom?: boolean;
  completed?: boolean;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: 'victorious' | 'calm' | 'struggling' | 'transmuted';
  title: string;
  content: string;
  tags: string[];
}

export interface NoteEntry {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
}

const PRESET_SCHEDULE: ScheduleBlock[] = [
  {
    id: 'sch_1',
    time: '04:00 AM - 05:00 AM',
    title: 'Brahma Muhurta Awakening',
    desc: 'Pranayama, Meditation & Gayatri Japa before sunrise during high Sattvic hours.',
    icon: '🌅'
  },
  {
    id: 'sch_2',
    time: '05:00 AM - 06:15 AM',
    title: 'Cold Shower & Asanas',
    desc: 'Vigorous physical training and icy water to ground and circulate vital energy.',
    icon: '🧊'
  },
  {
    id: 'sch_3',
    time: '06:30 AM - 07:30 AM',
    title: 'Sadhana & Scripture Study',
    desc: 'Deep study of Bhagavad Gita, Swami Vivekananda, or Patanjali Yoga Sutras.',
    icon: '📖'
  },
  {
    id: 'sch_4',
    time: '08:30 AM - 12:30 PM',
    title: 'Deep Intellectual Work',
    desc: 'Peak cognitive output, study, or engineering focus with zero phone distractions.',
    icon: '⚡'
  },
  {
    id: 'sch_5',
    time: '01:00 PM - 01:45 PM',
    title: 'Sattvic Bhojan (Mindful Eating)',
    desc: 'Light, non-stimulating pure food free from excess chili, garlic, and heavy oils.',
    icon: '🥗'
  },
  {
    id: 'sch_6',
    time: '02:00 PM - 05:00 PM',
    title: 'Creative Execution & Craft',
    desc: 'Channeling high mental stamina into business, career, and creative projects.',
    icon: '🎯'
  },
  {
    id: 'sch_7',
    time: '06:00 PM - 07:00 PM',
    title: 'Evening Prana Transmutation',
    desc: 'Brisk walk in fresh air, Surya Namaskars, gym training, or deep urge surfing.',
    icon: '🏃‍♂️'
  },
  {
    id: 'sch_8',
    time: '07:30 PM - 08:30 PM',
    title: 'Evening Reflection & Satsang',
    desc: 'Chanting Hanuman Chalisa, logging urges, and meditating on the day’s victories.',
    icon: '🔱'
  },
  {
    id: 'sch_9',
    time: '09:00 PM - 09:45 PM',
    title: 'Night Digital Detox & Deep Sleep',
    desc: 'Complete screen blackout, phone placed outside room, gratitude and sleep.',
    icon: '🌙'
  },
];

const INITIAL_TODOS: TodoTask[] = [
  {
    id: 'td_1',
    title: 'Wake up at 4:30 AM (Brahma Muhurta)',
    details: 'Rise before dawn to seize pure Sattva energy before world wakes up.',
    scheduleType: 'daily',
    time: '04:30 AM',
    getNotification: true,
    completed: true,
    category: 'sadhana',
  },
  {
    id: 'td_2',
    title: 'Cold shower & 15 min Pranayama',
    details: 'Ice cold water shock to reset dopamine baseline and activate vagus nerve.',
    scheduleType: 'daily',
    time: '05:15 AM',
    getNotification: false,
    completed: true,
    category: 'body',
  },
  {
    id: 'td_3',
    title: 'Zero social media scroll before 12 PM',
    details: 'Protect dopamine circuits from cheap early morning algorithmic stimulation.',
    scheduleType: 'daily',
    time: '08:00 AM',
    getNotification: true,
    completed: false,
    category: 'mind',
  },
  {
    id: 'td_4',
    title: 'Read 1 Chapter of Sacred Scriptures',
    details: 'Study Gita Chapter 2 or Swami Sivananda on Brahmacharya.',
    scheduleType: 'daily',
    time: '06:30 PM',
    getNotification: false,
    completed: false,
    category: 'sadhana',
  },
  {
    id: 'td_5',
    title: 'Night Urge Surf & 108 Gayatri Japa',
    details: 'Chant with Japa mala and redirect lower energy into heart and Ajna chakra.',
    scheduleType: 'daily',
    time: '08:45 PM',
    getNotification: true,
    completed: false,
    category: 'transmutation',
  },
];

const INITIAL_JOURNALS: JournalEntry[] = [
  {
    id: 'j1',
    date: 'Today, Day 8',
    mood: 'transmuted',
    title: 'Surfed intense Day 8 urges — channeled into workout',
    content: 'Around 4 PM felt the classic dopamine crave. Immediately did 30 pushups, stepped outside in fresh air and practiced Box Breathing. Urge vanished after 8 minutes. Ojas preserved.',
    tags: ['#UrgeSurfing', '#Transmutation', '#ColdShower'],
  },
  {
    id: 'j2',
    date: 'Yesterday, Day 7',
    mood: 'calm',
    title: 'Mind clarity returning noticeably',
    content: 'Woke up at 5:00 AM without grogginess. Finished 3 hours of focused reading. Eye contact felt natural and confident today.',
    tags: ['#Clarity', '#Confidence', '#BrahmaMuhurta'],
  }
];

const INITIAL_NOTES: NoteEntry[] = [
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

interface Props {
  initialTab?: 'journal' | 'notes' | 'todo' | 'schedule';
}

export default function JournalNotesView({ initialTab = 'journal' }: Props) {
  // Top Navigation Tabs: Journal, Notes, Todo, Schedule
  const [activeTab, setActiveTab] = useState<'journal' | 'notes' | 'todo' | 'schedule'>(initialTab);

  // Todo State & Task History
  const [todos, setTodos] = useState<TodoTask[]>(() => {
    try {
      const saved = localStorage.getItem('bm_sadhana_todos_v2');
      return saved ? JSON.parse(saved) : INITIAL_TODOS;
    } catch {
      return INITIAL_TODOS;
    }
  });

  const [taskHistory, setTaskHistory] = useState<TodoTask[]>(() => {
    try {
      const saved = localStorage.getItem('bm_sadhana_history_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Schedule State (Preset Dinacharya + User Custom additions)
  const [scheduleItems, setScheduleItems] = useState<ScheduleBlock[]>(() => {
    try {
      const saved = localStorage.getItem('bm_sadhana_schedule_v2');
      return saved ? JSON.parse(saved) : PRESET_SCHEDULE;
    } catch {
      return PRESET_SCHEDULE;
    }
  });

  // Journal & Notes State
  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bm_sadhana_journals_v2');
      return saved ? JSON.parse(saved) : INITIAL_JOURNALS;
    } catch {
      return INITIAL_JOURNALS;
    }
  });

  const [notes, setNotes] = useState<NoteEntry[]>(() => {
    try {
      const saved = localStorage.getItem('bm_sadhana_notes_v2');
      return saved ? JSON.parse(saved) : INITIAL_NOTES;
    } catch {
      return INITIAL_NOTES;
    }
  });

  // Create Todo Modal Form State
  const [createTodoModalOpen, setCreateTodoModalOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDetails, setTodoDetails] = useState('');
  const [todoScheduleType, setTodoScheduleType] = useState<'daily' | 'once'>('daily');
  const [todoTime, setTodoTime] = useState('06:00 AM');
  const [todoDate, setTodoDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [todoGetNotification, setTodoGetNotification] = useState(true);

  // General Quick Add Modal for Journal & Notes
  const [journalModalOpen, setJournalModalOpen] = useState(false);
  const [generalTitle, setGeneralTitle] = useState('');
  const [generalContent, setGeneralContent] = useState('');
  const [journalMood, setJournalMood] = useState<'victorious' | 'calm' | 'struggling' | 'transmuted'>('transmuted');
  const [generalTag, setGeneralTag] = useState('');

  // Persist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('bm_sadhana_todos_v2', JSON.stringify(todos));
    } catch {}
  }, [todos]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_sadhana_history_v2', JSON.stringify(taskHistory));
    } catch {}
  }, [taskHistory]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_sadhana_schedule_v2', JSON.stringify(scheduleItems));
    } catch {}
  }, [scheduleItems]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_sadhana_journals_v2', JSON.stringify(journals));
    } catch {}
  }, [journals]);

  useEffect(() => {
    try {
      localStorage.setItem('bm_sadhana_notes_v2', JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // Toggle Todo completion
  const handleToggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => {
      if (t.id === id) {
        const nextCompleted = !t.completed;
        const updated = {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        };
        // If completed, also archive a copy into task history
        if (nextCompleted) {
          setTaskHistory(hist => [updated, ...hist.filter(h => h.id !== id)]);
        }
        return updated;
      }
      return t;
    }));
  };

  // Delete Todo
  const handleDeleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Toggle Schedule Block completion
  const handleToggleScheduleBlock = (id: string) => {
    setScheduleItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    }));
  };

  // Save new Todo Task
  const handleSaveTodoTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!todoTitle.trim()) return;

    if (todoGetNotification && typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }

    const newTask: TodoTask = {
      id: 'task_' + Date.now(),
      title: todoTitle.trim(),
      details: todoDetails.trim() || undefined,
      scheduleType: todoScheduleType,
      time: todoTime || '06:00 AM',
      date: todoScheduleType === 'once' ? todoDate : undefined,
      getNotification: todoGetNotification,
      completed: false,
      category: 'sadhana',
    };

    setTodos(prev => [newTask, ...prev]);

    // If on Schedule tab, also create a corresponding schedule entry
    if (activeTab === 'schedule') {
      const newBlock: ScheduleBlock = {
        id: 'sch_custom_' + Date.now(),
        time: todoTime,
        title: todoTitle.trim(),
        desc: todoDetails.trim() || 'Custom Sadhana Discipline',
        icon: '⚡',
        isCustom: true,
        completed: false,
      };
      setScheduleItems(prev => [...prev, newBlock]);
    }

    // Reset Form
    setTodoTitle('');
    setTodoDetails('');
    setTodoScheduleType('daily');
    setTodoTime('06:00 AM');
    setTodoGetNotification(true);
    setCreateTodoModalOpen(false);
  };

  // Save Journal / Note Entry
  const handleSaveJournalNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generalTitle.trim() && !generalContent.trim()) return;

    if (activeTab === 'journal') {
      const newJournal: JournalEntry = {
        id: 'j_' + Date.now(),
        date: 'Today, Just Now',
        mood: journalMood,
        title: generalTitle.trim() || 'Daily Sadhana Reflection',
        content: generalContent.trim(),
        tags: generalTag
          ? generalTag.split(',').map(t => t.trim().startsWith('#') ? t.trim() : `#${t.trim()}`)
          : ['#Brahmacharya', '#Ojas'],
      };
      setJournals([newJournal, ...journals]);
    } else if (activeTab === 'notes') {
      const newNote: NoteEntry = {
        id: 'n_' + Date.now(),
        title: generalTitle.trim() || 'Sadhana Note',
        content: generalContent.trim(),
        category: generalTag.trim() || 'Personal Wisdom',
        date: 'Saved Today',
      };
      setNotes([newNote, ...notes]);
    }

    setGeneralTitle('');
    setGeneralContent('');
    setGeneralTag('');
    setJournalModalOpen(false);
  };

  const completedTodosCount = todos.filter(t => t.completed).length;

  return (
    <div className="relative flex flex-col h-full text-zinc-100 w-full max-w-full">
      {/* ── 1. Top Tab Switching: Journal, Notes, Todo, and Schedule ── */}
      <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 mb-4 shadow-lg">
        {[
          { id: 'journal', label: 'Journal', icon: BookOpen },
          { id: 'notes', label: 'Notes', icon: FileText },
          { id: 'todo', label: 'Todo', icon: CheckSquare },
          { id: 'schedule', label: 'Schedule', icon: Clock },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/25 via-purple-600/20 to-amber-500/25 border border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 border border-transparent'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Content Panes ── */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 pb-20">

        {/* ─────────────────────────────────────────────────────────────
            TAB 1: JOURNAL
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'journal' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel">Personal Journal & Urge Logs</h3>
                <p className="text-[10px] text-zinc-400">Track reflections, mood & daily transmutation</p>
              </div>
              <button
                onClick={() => setJournalModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Entry</span>
              </button>
            </div>

            {journals.length === 0 ? (
              <div className="p-8 rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-800 text-center text-zinc-500 text-xs space-y-2">
                <BookOpen className="w-8 h-8 text-amber-500/40 mx-auto" />
                <p>No journal entries yet. Tap "+ Log Entry" to record your victory over urges.</p>
              </div>
            ) : (
              journals.map(entry => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-amber-500/40 transition-all shadow-md space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-300">{entry.date}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 capitalize font-medium">
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
                  <p className="text-xs text-zinc-300 leading-relaxed break-words">{entry.content}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {entry.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 2: NOTES
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'notes' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel">Sacred Wisdom & Battle Rules</h3>
                <p className="text-[10px] text-zinc-400">Save quotes, neuroscience insights & emergency tactics</p>
              </div>
              <button
                onClick={() => setJournalModalOpen(true)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </div>

            {notes.length === 0 ? (
              <div className="p-8 rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-800 text-center text-zinc-500 text-xs space-y-2">
                <FileText className="w-8 h-8 text-purple-500/40 mx-auto" />
                <p>No notes saved. Record verses and dopamine detox rules here.</p>
              </div>
            ) : (
              notes.map(note => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-purple-500/40 transition-all shadow-md space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
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
              ))
            )}
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 3: TODO TAB (With + Add new task & Task History buttons)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'todo' && (
          <div className="space-y-3.5">
            {/* Top Action Header with Progress & Dual Action Buttons */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-950 to-purple-950/20 border border-amber-500/30 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-amber-400" />
                    <span>Daily Sadhana Tasks</span>
                  </h3>
                  <p className="text-[10px] text-zinc-400">Transform vital energy through daily discipline</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2.5 py-1 rounded-full">
                  {completedTodosCount} / {todos.length} Done
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-purple-500 transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.5)]"
                  style={{ width: `${(completedTodosCount / (todos.length || 1)) * 100}%` }}
                />
              </div>

              {/* ── Dual Prominent Action Buttons: "+ Add new task" & "Task History" ── */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {/* Button 1: + Add new task */}
                <button
                  onClick={() => setCreateTodoModalOpen(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-zinc-950 text-xs font-black shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>+ Add new task</span>
                </button>

                {/* Button 2: Task History */}
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 hover:border-purple-400 text-purple-200 text-xs font-bold transition shadow-sm cursor-pointer"
                >
                  <History className="w-4 h-4 text-purple-400" />
                  <span>Task History ({taskHistory.length})</span>
                </button>
              </div>
            </div>

            {/* Todo List */}
            <div className="space-y-2.5">
              {todos.length === 0 ? (
                <div className="p-8 rounded-3xl bg-zinc-950/60 border border-dashed border-zinc-800 text-center text-zinc-500 text-xs space-y-2">
                  <CheckSquare className="w-8 h-8 text-amber-500/40 mx-auto" />
                  <p>All tasks cleared! Tap "+ Add new task" to establish your next sadhana discipline.</p>
                </div>
              ) : (
                todos.map(todo => (
                  <motion.div
                    key={todo.id}
                    layout
                    className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all ${
                      todo.completed
                        ? 'bg-zinc-950/50 border-emerald-500/30 text-zinc-400'
                        : 'bg-zinc-950/80 border-zinc-800/90 hover:border-amber-500/50 text-zinc-200 shadow-md'
                    }`}
                  >
                    <div
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex items-start gap-3 flex-1 min-w-0 cursor-pointer select-none"
                    >
                      {/* Checkbox Ring */}
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 mt-0.5 ${
                        todo.completed
                          ? 'bg-emerald-500 border-emerald-400 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                          : 'border-zinc-700 hover:border-amber-400'
                      }`}>
                        {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="flex-1 min-w-0 pr-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-xs sm:text-sm font-bold ${todo.completed ? 'line-through text-zinc-500' : 'text-white'}`}>
                            {todo.title}
                          </span>
                        </div>

                        {todo.details && (
                          <p className={`text-[11px] mt-0.5 leading-relaxed line-clamp-2 ${todo.completed ? 'text-zinc-600 line-through' : 'text-zinc-400'}`}>
                            {todo.details}
                          </p>
                        )}

                        {/* Metadata Tag Row */}
                        <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-400">
                          <span className="flex items-center gap-1 text-amber-400/90 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                            <Clock className="w-3 h-3" />
                            <span>{todo.scheduleType === 'daily' ? 'Daily at:' : 'Starts at:'} {todo.time}</span>
                          </span>

                          {todo.getNotification && (
                            <span className="flex items-center gap-1 text-purple-300 font-semibold bg-purple-500/10 px-1.5 py-0.5 rounded-md border border-purple-500/20">
                              <Bell className="w-3 h-3 text-purple-400" />
                              <span className="hidden sm:inline">Alert</span>
                            </span>
                          )}

                          {todo.completed && todo.completedAt && (
                            <span className="text-emerald-400 font-medium ml-auto">
                              ✓ {todo.completedAt}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="p-1.5 text-zinc-600 hover:text-red-400 transition rounded-lg hover:bg-zinc-900 flex-shrink-0"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            TAB 4: SCHEDULE TAB (Ideal Dinacharya Preset Time Blocks)
        ───────────────────────────────────────────────────────────── */}
        {activeTab === 'schedule' && (
          <div className="space-y-4">
            {/* Header with "+ Add new task" button */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-zinc-950 to-purple-950/20 border border-amber-500/30 flex items-center justify-between shadow-md">
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white font-cinzel flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Ideal Dinacharya (Vedic Routine)</span>
                </h3>
                <p className="text-[10px] text-zinc-400">
                  Chronobiological routine from 04:00 AM to 09:00 PM for Ojas retention
                </p>
              </div>

              {/* "+ Add new task" Button under Schedule tab */}
              <button
                onClick={() => setCreateTodoModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.35)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer flex-shrink-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>+ Add new task</span>
              </button>
            </div>

            {/* Timeline Blocks */}
            <div className="relative pl-5 border-l-2 border-amber-500/30 space-y-4 my-2">
              {scheduleItems.map((item, i) => (
                <div key={item.id} className="relative group">
                  {/* Timeline Node Dot */}
                  <div
                    onClick={() => handleToggleScheduleBlock(item.id)}
                    className={`absolute -left-[27px] top-3 w-4 h-4 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                      item.completed
                        ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.8)]'
                        : 'bg-zinc-950 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                    }`}
                    title="Click to mark block done"
                  >
                    {item.completed && <Check className="w-2.5 h-2.5 stroke-[4] text-black" />}
                  </div>

                  {/* Schedule Card */}
                  <div
                    className={`p-3.5 rounded-2xl border transition-all ${
                      item.completed
                        ? 'bg-zinc-950/50 border-emerald-500/30 opacity-75'
                        : 'bg-zinc-950/80 border-zinc-800/80 hover:border-amber-400/60 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400">
                        <span>{item.icon || '⏰'}</span>
                        <span>{item.time}</span>
                      </div>
                      {item.isCustom ? (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                          Custom
                        </span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold">
                          Dinacharya
                        </span>
                      )}
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-white mt-1">
                      {item.title}
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Add Task Button in Schedule */}
            <div className="text-center pt-2">
              <button
                onClick={() => setCreateTodoModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-bold transition shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add custom routine block to schedule</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ── 3. Floating Quick-Add Button (+) (Bottom-Right Glow) ── */}
      <div className="absolute bottom-3 right-3 z-30">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (activeTab === 'todo' || activeTab === 'schedule') {
              setCreateTodoModalOpen(true);
            } else {
              setJournalModalOpen(true);
            }
          }}
          className="w-13 h-13 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-purple-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.6)] border border-amber-300/40 cursor-pointer"
          aria-label="Add new entry"
          title="Quick Add Task"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </motion.button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. "CREATE TODO TASK" MODAL / FORM
          (Title, Details optional, Starts at / Daily at, Notification, Save)
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {createTodoModalOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-amber-500/50 p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(245,158,11,0.2)] space-y-4"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-cinzel">Create Todo Task</h3>
                    <p className="text-[10px] text-zinc-400">Set daily discipline & schedule time</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreateTodoModalOpen(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveTodoTask} className="space-y-3.5">
                {/* 1. Title Input */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">
                    Task Title <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={todoTitle}
                    onChange={e => setTodoTitle(e.target.value)}
                    placeholder="e.g. 108 Gayatri Mantra Japa / Cold Shower"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition"
                    autoFocus
                  />
                </div>

                {/* 2. Details (Optional) Input */}
                <div>
                  <label className="text-xs font-semibold text-zinc-400 block mb-1">
                    Details (optional)
                  </label>
                  <textarea
                    value={todoDetails}
                    onChange={e => setTodoDetails(e.target.value)}
                    rows={2}
                    placeholder="e.g. Practice right after waking up before touching phone..."
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none transition"
                  />
                </div>

                {/* 3. Schedule Type & Date/Time Picker ("Starts at:" / "Daily at:") */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 block">
                    Routine Frequency & Time
                  </label>

                  {/* Switcher: Daily at vs Starts at */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTodoScheduleType('daily')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        todoScheduleType === 'daily'
                          ? 'bg-amber-400 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Daily at:</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTodoScheduleType('once')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        todoScheduleType === 'once'
                          ? 'bg-purple-500 text-white shadow-[0_0_12px_rgba(168,85,247,0.4)]'
                          : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Starts at:</span>
                    </button>
                  </div>

                  {/* Time Input / Select */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={todoTime}
                      onChange={e => setTodoTime(e.target.value)}
                      placeholder="e.g. 05:00 AM"
                      className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-amber-300 font-mono font-bold focus:outline-none focus:border-amber-400"
                    />

                    {todoScheduleType === 'once' && (
                      <input
                        type="date"
                        value={todoDate}
                        onChange={e => setTodoDate(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    )}
                  </div>
                </div>

                {/* 4. "Get Notification" Toggle */}
                <div className="p-3 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      todoGetNotification ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      <BellRing className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">Get Notification</span>
                      <span className="text-[10px] text-zinc-400">Receive alert when time arrives</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTodoGetNotification(!todoGetNotification)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      todoGetNotification ? 'bg-gradient-to-r from-amber-400 to-purple-500' : 'bg-zinc-800'
                    }`}
                  >
                    <motion.div
                      animate={{ x: todoGetNotification ? 22 : 2 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="w-5 h-5 rounded-full bg-white shadow-md top-0.5 absolute"
                    />
                  </button>
                </div>

                {/* 5. Save & Cancel Buttons */}
                <div className="flex items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setCreateTodoModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-400 hover:text-white transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 text-white text-xs font-black shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          TASK HISTORY MODAL
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showHistoryModal && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-purple-500/50 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                    <History className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-cinzel">Task History</h3>
                    <p className="text-[10px] text-zinc-400">Completed Sadhana disciplines</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHistoryModal(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {taskHistory.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    No task history recorded yet. Complete tasks on the Todo list to build your record!
                  </div>
                ) : (
                  taskHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-semibold text-zinc-200 line-through">{item.title}</div>
                        <div className="text-[10px] text-emerald-400 mt-0.5">
                          ✓ Completed {item.completedAt || 'Today'}
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {item.time}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {taskHistory.length > 0 && (
                <div className="pt-2 border-t border-zinc-800 flex items-center justify-between flex-shrink-0">
                  <button
                    onClick={() => setTaskHistory([])}
                    className="text-[11px] text-zinc-500 hover:text-red-400 transition"
                  >
                    Clear History
                  </button>
                  <button
                    onClick={() => setShowHistoryModal(false)}
                    className="px-4 py-1.5 rounded-xl bg-zinc-900 text-xs font-bold text-zinc-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          QUICK ADD MODAL FOR JOURNAL & NOTES
      ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {journalModalOpen && (
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl bg-zinc-950 border border-amber-500/40 p-5 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Add to {activeTab === 'journal' ? 'Journal' : 'Notes'}</span>
                </h3>
                <button
                  onClick={() => setJournalModalOpen(false)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveJournalNote} className="space-y-3">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Title / Focus
                  </label>
                  <input
                    type="text"
                    required
                    value={generalTitle}
                    onChange={e => setGeneralTitle(e.target.value)}
                    placeholder="e.g. Surfed 4 PM Urge Spike"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Details / Reflection
                  </label>
                  <textarea
                    value={generalContent}
                    onChange={e => setGeneralContent(e.target.value)}
                    rows={3}
                    placeholder="Write your reflection, trigger awareness, or wisdom..."
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                {activeTab === 'journal' && (
                  <div>
                    <label className="text-[11px] font-semibold text-zinc-400 block mb-1">State of Mind</label>
                    <div className="grid grid-cols-4 gap-1 text-[10px]">
                      {(['victorious', 'transmuted', 'calm', 'struggling'] as const).map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setJournalMood(m)}
                          className={`py-1.5 px-1 rounded-lg capitalize border font-medium cursor-pointer ${
                            journalMood === m
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
                    value={generalTag}
                    onChange={e => setGeneralTag(e.target.value)}
                    placeholder="e.g. #UrgeSurf, #ColdShower"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setJournalModalOpen(false)}
                    className="flex-1 py-2 rounded-xl bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 text-xs font-black shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
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
