import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../../types';
import { REASONS_WHY_I_LOVE_YOU } from '../../data/defaultConfig';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, Heart, Sparkles, BookOpen, X, ChevronRight, ChevronLeft } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onBackToHub: () => void;
  onNextSurprise: () => void;
}

export const ScreenReadMe: React.FC<Props> = ({ config, onBackToHub, onNextSurprise }) => {
  const [hugCount, setHugCount] = useState(0);
  const [isReasonsModalOpen, setIsReasonsModalOpen] = useState(false);
  const [currentReasonIdx, setCurrentReasonIdx] = useState(0);

  const handleSendHug = () => {
    sound.playRomanticChime();
    setHugCount((prev) => prev + 1);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
    });
  };

  const handleCatMeow = () => {
    sound.playMeow();
  };

  const handleOpenReasons = () => {
    sound.playPop();
    setIsReasonsModalOpen(true);
  };

  const currentReason = REASONS_WHY_I_LOVE_YOU[currentReasonIdx];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-4 sm:p-8 select-none">
      {/* Top back button */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-4">
        <button
          onClick={onBackToHub}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-700 font-bubble text-sm border border-stone-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Surprises Hub</span>
        </button>

        <button
          onClick={onNextSurprise}
          className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-sm shadow-md transition-all font-semibold"
        >
          <span>Next: Our Memories</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Scrapbook Letter Canvas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-[#faf6f0] border-4 border-amber-900/10 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden paper-texture"
      >
        {/* Lace decorative border strip on the left */}
        <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-rose-200/40 via-red-100/20 to-transparent border-r-2 border-dashed border-red-300 pointer-events-none" />

        {/* Top Header Section with Kitten & Stickers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b-2 border-stone-200/80 pb-8 mb-8">
          
          {/* Custom Kitten with Cake and Roses */}
          <div className="md:col-span-5 flex flex-col items-center relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCatMeow}
              className="cursor-pointer relative w-60 sm:w-72 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group hover:shadow-2xl transition-all"
              title="Click the kitten for meow!"
            >
              <img
                src="/src/assets/images/cat_birthday_cake_roses_1792993741439.jpg"
                alt="Birthday kitten with cake and roses bouquet"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/95 text-rose-600 font-comic text-xs px-2.5 py-0.5 rounded-full shadow-sm">
                tap for meow 🐱
              </span>
            </motion.div>
          </div>

          {/* Title & Cute Stickers Header */}
          <div className="md:col-span-7 flex flex-col text-left pl-0 md:pl-4">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full font-bubble text-xs tracking-wider uppercase font-bold">
                Special Birthday Letter
              </span>
              <span className="text-sm">💌✨</span>
            </div>

            <h1 className="font-bubble text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#6d2520] tracking-wide leading-tight mb-2">
              {config.letterHeading}
            </h1>
            <p className="font-comic text-lg sm:text-xl text-[#7a3b30] font-semibold mb-4">
              For my favorite boy: {config.boyfriendName} 💕
            </p>

            {/* Virtual Hug & Reasons Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendHug}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bubble text-sm shadow-md transition-all font-bold"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Send Him a Tight Virtual Hug</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </motion.button>

              <button
                onClick={handleOpenReasons}
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bubble text-sm font-semibold transition-all shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>8 Reasons I Love You</span>
              </button>

              {hugCount > 0 && (
                <span className="font-comic text-rose-700 font-bold text-sm animate-bounce">
                  {hugCount} hugs sent! 🥰
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Romantic Letter Text in Beautiful Handwriting Font */}
        <div className="space-y-4 max-w-3xl mx-auto text-left px-2 sm:px-6">
          {config.letterContent.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="font-handwriting text-2xl sm:text-3xl text-[#4a2e2b] leading-relaxed tracking-wide"
            >
              {paragraph}
            </motion.p>
          ))}

          <div className="pt-6 border-t border-stone-200 flex justify-between items-end">
            <div>
              <p className="font-comic text-sm text-stone-500">With all my love,</p>
              <p className="font-script text-4xl text-[#7a251e] font-bold">
                {config.senderName} ❤️
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-3xl">🎂🎈🌹</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to next surprise */}
        <div className="mt-10 pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-comic text-stone-500 text-sm">
            Surprise 1 of 3 unlocked! Ready for the next one?
          </p>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNextSurprise}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-base shadow-md font-bold tracking-wide"
          >
            <span>Open Surprise 2: Our Memories</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive Reasons Why I Love You Modal */}
      <AnimatePresence>
        {isReasonsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-md w-full bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-900/10 text-center"
            >
              <button
                onClick={() => setIsReasonsModalOpen(false)}
                className="cursor-pointer absolute top-4 right-4 p-2 rounded-full hover:bg-stone-100 text-stone-500"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-xs font-bubble uppercase tracking-widest text-rose-600 font-bold bg-rose-50 px-3 py-1 rounded-full">
                Reason #{currentReasonIdx + 1} of {REASONS_WHY_I_LOVE_YOU.length}
              </span>

              <div className="text-6xl my-4 animate-bounce">
                {currentReason.emoji}
              </div>

              <h3 className="font-bubble text-2xl font-extrabold text-[#6d2520] mb-2">
                {currentReason.title}
              </h3>

              <p className="font-handwriting text-2xl text-[#4a2e2b] leading-relaxed mb-6">
                &ldquo;{currentReason.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={() => {
                    sound.playPop();
                    setCurrentReasonIdx((prev) => (prev > 0 ? prev - 1 : REASONS_WHY_I_LOVE_YOU.length - 1));
                  }}
                  className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bubble text-xs"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>

                <button
                  onClick={() => {
                    sound.playRomanticChime();
                    confetti({ particleCount: 30, spread: 50 });
                  }}
                  className="cursor-pointer p-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 shadow-sm"
                  title="Love this!"
                >
                  <Heart className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={() => {
                    sound.playPop();
                    setCurrentReasonIdx((prev) => (prev < REASONS_WHY_I_LOVE_YOU.length - 1 ? prev + 1 : 0));
                  }}
                  className="cursor-pointer inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-xs font-bold"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
