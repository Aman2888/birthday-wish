import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MemoryItem, BirthdayConfig } from '../../types';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, Camera, Heart, X, Sparkles } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onBackToHub: () => void;
  onNextSurprise: () => void;
}

export const ScreenMemories: React.FC<Props> = ({ config, onBackToHub, onNextSurprise }) => {
  const [activeMemory, setActiveMemory] = useState<MemoryItem | null>(null);
  const [likedMemories, setLikedMemories] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

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
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-3 sm:p-6 select-none">
      {/* Top back & forward bar */}
      <div className="w-full max-w-6xl flex items-center justify-between gap-2 mb-6">
        <button
          onClick={onBackToHub}
          className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 hover:bg-white text-stone-700 font-bubble text-xs sm:text-sm border border-pink-200 shadow-xs transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Surprises Hub</span>
        </button>

        <button
          onClick={onNextSurprise}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#7a251e] hover:bg-[#912c24] text-white font-bubble text-xs sm:text-sm shadow-md transition-all font-semibold"
        >
          <span>Next: Dinner Invite</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 px-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-100 text-pink-800 rounded-full font-bubble text-xs tracking-wider uppercase font-bold mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>12 Sweet Memories with Faiz ur Rehman</span>
        </div>
        <h1 className="font-bubble text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#702138] tracking-wide mb-2">
          Our 12 Favorite Moments 💕
        </h1>
        <p className="font-comic text-stone-600 text-sm sm:text-base">
          Click any polaroid to take a closer look and hear the snapshot shutter! 📸✨
        </p>
      </div>

      {/* Polaroid Gallery Grid (12 Memories) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-6xl mb-12">
        {config.memories.map((mem, index) => {
          const isLiked = likedMemories[mem.id];
          const hasError = failedImages[mem.id];

          return (
            <motion.div
              key={mem.id}
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: (index % 4) * 0.08, duration: 0.35 }}
              whileHover={{ scale: 1.03, y: -5, rotate: 0 }}
              onClick={() => handlePolaroidClick(mem)}
              className={`cursor-pointer bg-white p-3.5 pb-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative border border-pink-200/90 ${mem.rotation || 'rotate-1'
                }`}
            >
              {/* Cute Washi Tape sticker */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-pink-200/80 -rotate-2 rounded-xs shadow-xs border-dashed border-t border-b border-pink-300 pointer-events-none" />

              {/* Memory Index Pill */}
              <div className="absolute top-2 left-2 z-10">
                <span className="font-bubble text-[10px] bg-pink-600/90 text-white px-2 py-0.5 rounded-full font-bold shadow-xs">
                  #{index + 1}
                </span>
              </div>

              {/* Photo Frame */}
              <div className="w-full aspect-square bg-pink-50 rounded-lg overflow-hidden mb-2.5 relative group/card flex items-center justify-center">
                {hasError ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-b from-pink-100/60 to-rose-50 border-2 border-dashed border-pink-300 rounded-lg">
                    <Camera className="w-7 h-7 text-pink-400 mb-1" />
                    <span className="font-bubble text-xs text-pink-800 font-bold">Memory #{index + 1}</span>
                    <span className="font-comic text-[10px] text-stone-500 mt-0.5">Your Photo Here</span>
                  </div>
                ) : (
                  <img
                    src={mem.imageUrl}
                    alt={mem.title}
                    onError={() => setFailedImages((prev) => ({ ...prev, [mem.id]: true }))}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover/card:scale-105 transition-transform duration-300" />
                )}

                {/* Like Button */}
                <button
                  onClick={(e) => handleLike(mem.id, e)}
                  title="Love this memory"
                  className={`cursor-pointer absolute bottom-2 right-2 p-1.5 rounded-full backdrop-blur-md shadow-md transition-all ${isLiked ? 'bg-pink-600 text-white' : 'bg-white/85 text-stone-600 hover:text-pink-600'
                    }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Caption and Title */}
              <div className="text-center px-1">
                <h3 className="font-comic text-base sm:text-lg font-bold text-[#6d2520] leading-snug">
                  {mem.title}
                </h3>
                <p className="font-handwriting text-base text-stone-600 line-clamp-2 mt-0.5">
                  {mem.caption}
                </p>
                {mem.date && (
                  <span className="inline-block mt-1 text-[10px] font-bubble uppercase tracking-widest text-pink-700 bg-pink-50 px-2 py-0.5 rounded-full">
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
              className="relative max-w-lg w-full bg-[#fff5f8] p-5 sm:p-7 rounded-3xl shadow-2xl border-4 border-pink-300 text-center"
            >
              <button
                onClick={() => setActiveMemory(null)}
                className="cursor-pointer absolute top-4 right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-4 bg-pink-100 relative flex items-center justify-center">
                {failedImages[activeMemory.id] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-b from-pink-100 to-rose-50 border-2 border-dashed border-pink-300">
                    <Camera className="w-10 h-10 text-pink-400 mb-2" />
                    <span className="font-bubble text-base text-pink-800 font-bold">{activeMemory.title}</span>
                    <span className="font-comic text-xs text-stone-500 mt-1">
                      Set in <code className="bg-white px-1.5 py-0.5 rounded text-pink-700">src/data/photos.ts</code>
                    </span>
                  </div>
                ) : (
                  <img
                    src={activeMemory.imageUrl}
                    alt={activeMemory.title}
                    onError={() => setFailedImages((prev) => ({ ...prev, [activeMemory.id]: true }))}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <span className="text-xs font-bubble uppercase tracking-widest text-pink-700 font-bold bg-pink-100 px-3 py-1 rounded-full">
                {activeMemory.date || 'Sweet Memory with Faiz ur Rehman'}
              </span>

              <h2 className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#702138] mt-2 mb-2">
                {activeMemory.title}
              </h2>

              <p className="font-handwriting text-xl sm:text-2xl text-[#582030] leading-relaxed mb-6">
                &ldquo;{activeMemory.caption}&rdquo;
              </p>

              <button
                onClick={() => setActiveMemory(null)}
                className="cursor-pointer px-6 py-2 rounded-full bg-[#7a251e] hover:bg-[#912c24] text-white font-bubble text-sm shadow-md font-bold"
              >
                Close Snapshot 📸
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl pt-6 border-t border-pink-200">
        <p className="font-comic text-stone-600 text-sm text-center sm:text-left">
          Now check out Faiz ur Rehman&apos;s custom Birthday Dinner invitation & love coupons!
        </p>
        <button
          onClick={onNextSurprise}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7a251e] hover:bg-[#912c24] text-white font-bubble text-sm sm:text-base shadow-md font-bold"
        >
          <span>Open Surprise 3: Dinner Invite & Gifts 🎟️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
