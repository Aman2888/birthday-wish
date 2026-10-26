import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem, BirthdayConfig } from '../../types';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, Camera, Heart, Sparkles, X, Plus } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onBackToHub: () => void;
  onNextSurprise: () => void;
}

export const ScreenMemories: React.FC<Props> = ({ config, onBackToHub, onNextSurprise }) => {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});

  const handlePolaroidClick = (mem: MemoryItem) => {
    sound.playCameraShutter();
    setActiveMemory(mem);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playRomanticChime();
    setLikedMemories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-4 sm:p-8 select-none">
      {/* Top back & forward bar */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
        <button
          onClick={onBackToHub}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-700 font-bubble text-sm border border-stone-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Surprises Hub</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-bubble text-sm text-stone-500 hidden sm:inline">Surprise 2 of 3</span>
          <button
            onClick={onNextSurprise}
            className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-sm shadow-md transition-all font-semibold"
          >
            <span>Next: Dinner Invite</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-800 rounded-full font-bubble text-xs tracking-wider uppercase font-bold mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Polaroid Scrapbook</span>
        </div>
        <h1 className="font-bubble text-3xl sm:text-5xl font-extrabold text-[#6d2520] tracking-wide mb-2">
          My Favorite Memories With You
        </h1>
        <p className="font-comic text-stone-600 text-base sm:text-lg">
          Click any polaroid to take a closer look and hear the snap! 📸✨
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl mb-12">
        {config.memories.map((mem, index) => {
          const isLiked = likedMemories[mem.id];
          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -8, rotate: 0 }}
              onClick={() => handlePolaroidClick(mem)}
              className={`cursor-pointer bg-white p-4 pb-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 relative border border-stone-200/60 ${
                mem.rotation || 'rotate-1'
              }`}
            >
              {/* Washi tape sticker at top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-200/70 -rotate-2 rounded-xs shadow-xs border-dashed border-t border-b border-rose-300/50 pointer-events-none" />

              {/* Photo Frame */}
              <div className="w-full aspect-square bg-stone-100 rounded overflow-hidden mb-3 relative group">
                <img
                  src={mem.imageUrl}
                  alt={mem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(mem.id, e)}
                  title="Love this memory"
                  className={`cursor-pointer absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-md transition-all ${
                    isLiked ? 'bg-rose-500 text-white' : 'bg-white/80 text-stone-600 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Caption and Title */}
              <div className="text-center px-1">
                <h3 className="font-comic text-xl font-bold text-[#5a2722] leading-tight">
                  {mem.title}
                </h3>
                <p className="font-handwriting text-lg text-stone-500 line-clamp-2 mt-0.5">
                  {mem.caption}
                </p>
                {mem.date && (
                  <span className="inline-block mt-1 text-[11px] font-bubble uppercase tracking-widest text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full">
                    {mem.date}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Memory Detail Modal */}
      <AnimatePresence>
        {activeMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              className="relative max-w-lg w-full bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-900/10 text-center"
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-4 bg-stone-100">
                <img
                  src={activeMemory.imageUrl}
                  alt={activeMemory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-xs font-bubble uppercase tracking-widest text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full">
                {activeMemory.date || 'Sweet Memory'}
              </span>

              <h2 className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#6d2520] mt-2 mb-2">
                {activeMemory.title}
              </h2>

              <p className="font-handwriting text-2xl text-[#4a2e2b] leading-relaxed mb-6">
                &ldquo;{activeMemory.caption}&rdquo;
              </p>

              <button
                onClick={() => setActiveMemory(null)}
                className="cursor-pointer px-6 py-2 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-sm shadow-md"
              >
                Close Snapshot 📸
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-3xl pt-6 border-t border-stone-200">
        <p className="font-comic text-stone-500 text-sm">
          Now check out your custom Birthday Dinner invitation & love coupons!
        </p>
        <button
          onClick={onNextSurprise}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-base shadow-md font-bold"
        >
          <span>Open Surprise 3: Dinner Invite & Gifts 🎟️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
