"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Plus, X, MessageSquareQuote } from "lucide-react";

export type RoleCategory = "organizer" | "coordinator" | "subcoordinator";

export interface Memory {
  id: string;
  author: string;
  role: string;
  roleCategory: RoleCategory;
  quote: string;
  likes: number;
  rotation: number;
}

const ROLE_FILTERS = [
  { id: "all", label: "All" },
  { id: "organizer", label: "Organizer" },
  { id: "coordinator", label: "Coordinator" },
  { id: "subcoordinator", label: "Subcoordinator" },
];

const INITIAL_MEMORIES: Memory[] = [
  {
    id: "mem-1",
    author: "Ananya Sharma",
    role: "Lead Organizer",
    roleCategory: "organizer",
    quote:
      "Watching months of intense planning, late-night curation meetings, and endless rehearsals converge into a single unforgettable day was magical. The silence before the first speaker walked out gave us all goosebumps.",
    likes: 48,
    rotation: -2,
  },
  {
    id: "mem-2",
    author: "Rohan Kumar",
    role: "Production Coordinator",
    roleCategory: "coordinator",
    quote:
      "3:00 AM backstage chai sessions while perfecting the lighting cues and audio checks. When the stage lights turned TEDx red for the opening sequence, every single sleepless night felt worth it!",
    likes: 52,
    rotation: 1.5,
  },
  {
    id: "mem-3",
    author: "Priya Mehta",
    role: "Design Subcoordinator",
    roleCategory: "subcoordinator",
    quote:
      "Designing the kaleidoscopic interludes stage backdrop and seeing attendees stop to take photos with it all day long. It truly felt like art and technology blending into one.",
    likes: 31,
    rotation: -1,
    date_unused: "",
  } as Memory,
  {
    id: "mem-4",
    author: "Vikram Das",
    role: "Sponsorship Coordinator",
    roleCategory: "coordinator",
    quote:
      "The energy in the networking lounge during interludes was electric. Attendees, speakers, and coordinators exchanging ideas on how small pauses shape our future.",
    likes: 39,
    rotation: 2,
  },
  {
    id: "mem-5",
    author: "Aditi Rao",
    role: "Curation Organizer",
    roleCategory: "organizer",
    quote:
      "When Dr. Mehta spoke about 'the quiet transformations in between', you could hear a pin drop in the auditorium. Proud of this TEDxIIT Patna team forever.",
    likes: 64,
    rotation: -1.5,
  },
  {
    id: "mem-6",
    author: "Siddharth N.",
    role: "Hospitality Subcoordinator",
    roleCategory: "subcoordinator",
    quote:
      "Welcoming speakers from across the country and seeing their excitement before stepping onto the red circle. The standing ovation at the closing ceremony still gives me chills!",
    likes: 43,
    rotation: 2.5,
  },
];

export default function WallOfMemories() {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [mounted, setMounted] = useState(false);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  // New Memory Form State
  const [newAuthor, setNewAuthor] = useState("");
  const [newRoleTitle, setNewRoleTitle] = useState("");
  const [newRoleCategory, setNewRoleCategory] =
    useState<RoleCategory>("organizer");
  const [newQuote, setNewQuote] = useState("");

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("tedx_ki_memories_2025_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMemories(parsed);
        }
      } catch (e) {
        console.error("Failed to parse memories", e);
      }
    }
    const savedLikes = localStorage.getItem("tedx_ki_likes_2025");
    if (savedLikes) {
      try {
        setLikedIds(JSON.parse(savedLikes));
      } catch (e) {
        console.error("Failed to parse likes", e);
      }
    }
  }, []);

  const saveMemories = (updated: Memory[]) => {
    setMemories(updated);
    localStorage.setItem("tedx_ki_memories_2025_v2", JSON.stringify(updated));
  };

  const handleLike = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const isLiked = likedIds[id];
    const updatedLikes = { ...likedIds, [id]: !isLiked };
    setLikedIds(updatedLikes);
    localStorage.setItem("tedx_ki_likes_2025", JSON.stringify(updatedLikes));

    const updated = memories.map((mem) => {
      if (mem.id === id) {
        const nextLikes = isLiked ? mem.likes - 1 : mem.likes + 1;
        if (selectedMemory && selectedMemory.id === id) {
          setSelectedMemory({ ...mem, likes: nextLikes });
        }
        return {
          ...mem,
          likes: nextLikes,
        };
      }
      return mem;
    });
    saveMemories(updated);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim() || !newAuthor.trim()) return;

    const roleTitleMap: Record<RoleCategory, string> = {
      organizer: "Organizer",
      coordinator: "Coordinator",
      subcoordinator: "Subcoordinator",
    };

    const newMem: Memory = {
      id: "mem-" + Date.now(),
      author: newAuthor.trim(),
      role: newRoleTitle.trim() || roleTitleMap[newRoleCategory],
      roleCategory: newRoleCategory,
      quote: newQuote.trim(),
      likes: 1,
      rotation: Math.random() * 4 - 2,
    };

    const updated = [newMem, ...memories];
    saveMemories(updated);
    setNewAuthor("");
    setNewRoleTitle("");
    setNewQuote("");
    setIsAddModalOpen(false);
  };

  const filteredMemories = memories.filter(
    (mem) => activeFilter === "all" || mem.roleCategory === activeFilter
  );

  if (!mounted) return null;

  const MAX_PREVIEW_LEN = 130;

  return (
    <section className="w-full mb-24 px-4 sm:px-8">
      {/* Header Banner */}
      <div className="flex flex-col items-center text-center mb-16">
        <h1 className="font-bebas text-[45px] sm:text-[70px] md:text-[85px] lg:text-[105px] tracking-wide uppercase text-white drop-shadow-[0_4px_20px_rgba(235,0,40,0.5)] leading-none">
          Wall of <span className="text-[#EB0028]">Memories</span>
        </h1>
        <p className="font-space text-gray-300 max-w-3xl text-base sm:text-xl md:text-2xl mt-4 leading-relaxed">
          Glance back at the moments, stories, and kaleidoscopic fragments of TEDxIIT Patna 2025.
        </p>

        {/* Role Filters & Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="ml-2 inline-flex items-center gap-2 bg-white text-black hover:bg-red-600 hover:text-white font-bold py-2.5 px-6 rounded-full transition-colors duration-200 cursor-pointer text-xs sm:text-sm md:text-base"
          >
            <Plus className="w-4 h-4" />
            <span>Pin a Memory</span>
          </button>
        </div>
      </div>

      {/* Polaroid Memories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 max-w-7xl mx-auto py-4">
        <AnimatePresence mode="popLayout">
          {filteredMemories.map((mem) => {
            const isLiked = !!likedIds[mem.id];
            const isTruncated = mem.quote.length > MAX_PREVIEW_LEN;
            const quoteDisplay = isTruncated
              ? mem.quote.slice(0, MAX_PREVIEW_LEN) + "..."
              : mem.quote;

            return (
              <motion.div
                key={mem.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                transition={{ duration: 0.3 }}
                style={{ rotate: `${mem.rotation}deg` }}
                onClick={() => setSelectedMemory(mem)}
                className="group relative flex flex-col justify-between bg-[#181314] hover:bg-[#201718] border-[2px] border-[#EB0028]/35 hover:border-[#EB0028] rounded-2xl p-7 shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_12px_40px_rgba(235,0,40,0.25)] transition-all duration-300 cursor-pointer"
              >
                {/* Visual Pin / Tape top center (no glow) */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-3.5 bg-[#EB0028] rounded-sm transition-colors" />

                {/* Memory Quote (no date at top) */}
                <div className="my-4 pt-2">
                  <p className="font-space text-white/90 text-base sm:text-lg leading-relaxed italic">
                    &ldquo;{quoteDisplay}&rdquo;
                  </p>
                  {isTruncated && (
                    <span className="inline-block mt-2 text-xs font-semibold text-red-500 hover:text-red-400 underline transition-colors">
                      Read more →
                    </span>
                  )}
                </div>

                {/* Footer: Author, Role & Like Counter OUTSIDE of pill container */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-zinc-800/80">
                  <div className="flex flex-col">
                    <span className="font-semibold text-white text-base">
                      {mem.author}
                    </span>
                    <span className="text-xs sm:text-sm text-red-400 font-medium uppercase tracking-wide">
                      {mem.role}
                    </span>
                  </div>

                  {/* Like Counter - Clean without pill container */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(mem.id, e)}
                    className="inline-flex items-center gap-1.5 p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-5 h-5 transition-transform duration-200 ${
                        isLiked ? "fill-red-500 text-red-500 scale-110" : ""
                      }`}
                    />
                    <span
                      className={`text-sm font-bold ${
                        isLiked ? "text-red-500" : "text-gray-400"
                      }`}
                    >
                      {mem.likes}
                    </span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Full Memory Dialog Modal (when quote is clicked / too long) */}
      <AnimatePresence>
        {selectedMemory && (
          <div
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161213] border-2 border-[#EB0028] rounded-3xl p-6 sm:p-8 md:p-10 my-auto"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <MessageSquareQuote className="w-8 h-8 text-[#EB0028]" />
                <span className="text-xs sm:text-sm font-bold text-red-500 uppercase tracking-widest bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
                  {selectedMemory.role}
                </span>
              </div>

              <div className="my-6">
                <p className="font-space text-white text-lg sm:text-2xl leading-relaxed italic">
                  &ldquo;{selectedMemory.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 mt-6 border-t border-zinc-800">
                <div>
                  <h4 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    {selectedMemory.author}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400 font-space">
                    TEDxIIT Patna 2025 Edition
                  </p>
                </div>

                {/* Like button in modal */}
                <button
                  type="button"
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 hover:border-red-500 text-gray-300 hover:text-red-500 transition-all cursor-pointer"
                >
                  <Heart
                    className={`w-6 h-6 transition-transform duration-200 ${
                      likedIds[selectedMemory.id]
                        ? "fill-red-500 text-red-500 scale-110"
                        : ""
                    }`}
                  />
                  <span
                    className={`text-lg font-bold ${
                      likedIds[selectedMemory.id]
                        ? "text-red-500"
                        : "text-gray-300"
                    }`}
                  >
                    {selectedMemory.likes}
                  </span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Memory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-zinc-950 border border-red-600/40 rounded-2xl p-6 sm:p-8 my-auto"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-bebas text-3xl uppercase tracking-wide text-white mb-1">
                Pin a <span className="text-[#EB0028]">Memory</span>
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-6 font-space">
                Share your favorite moment from TEDxIIT Patna 2025.
              </p>

              <form onSubmit={handleAddMemory} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Ananya Sharma"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                      Role Category *
                    </label>
                    <select
                      value={newRoleCategory}
                      onChange={(e) =>
                        setNewRoleCategory(e.target.value as RoleCategory)
                      }
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                    >
                      <option value="organizer">Organizer</option>
                      <option value="coordinator">Coordinator</option>
                      <option value="subcoordinator">Subcoordinator</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                      Custom Role Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Lead Organizer"
                      value={newRoleTitle}
                      onChange={(e) => setNewRoleTitle(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3.5 py-2.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
                    Your Memory *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the moment, story, or feeling that stayed with you..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3.5 text-white text-sm focus:outline-none focus:border-red-500 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-5 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg text-sm font-bold bg-[#EB0028] hover:bg-red-600 text-white transition-colors cursor-pointer"
                  >
                    Pin Memory
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
