import cuteGiftBox from '../../assets/images/cute_gift_box_1792993737756.jpg';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

export const ScreenGiftIntro: React.FC<Props> = ({ onNext, onBack }) => {
  const [tapped, setTapped] = useState(false);

  const handleGiftClick = () => {
    sound.playPop();
    setTapped(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.45 },
      colors: ['#f43f5e', '#a3e635', '#fef08a'],
    });
  };

  const handleContinue = () => {
    sound.playRomanticChime();
    onNext();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Decorative Red String & Hearts on sides */}
      <div className="absolute left-6 top-1/4 bottom-1/4 w-12 hidden sm:flex flex-col items-center justify-between pointer-events-none opacity-60">
        <span className="text-3xl animate-float">❤️</span>
        <div className="w-0.5 h-32 bg-red-400 border-dashed border-l border-red-500"></div>
        <span className="text-2xl">💕</span>
      </div>
      <div className="absolute right-6 top-1/4 bottom-1/4 w-12 hidden sm:flex flex-col items-center justify-between pointer-events-none opacity-60">
        <span className="text-2xl">💕</span>
        <div className="w-0.5 h-32 bg-red-400 border-dashed border-l border-red-500"></div>
        <span className="text-3xl animate-float">❤️</span>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto flex flex-col items-center"
      >
        {/* Animated Custom 3D Gift Box */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGiftClick}
          className="cursor-pointer mb-6 relative group"
          title="Click the gift box for sparkles!"
        >
          <div className="w-56 sm:w-68 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group-hover:shadow-2xl transition-all duration-300">
            <img
              // src="/src/assets/images/cute_gift_box_1792993737756.jpg"
              src={cuteGiftBox}
              alt="Kawaii 3D gift box with green bow"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <span className="absolute -bottom-3 right-4 text-xs font-comic text-rose-600 bg-white/95 px-3 py-1 rounded-full shadow-md border border-rose-200">
            {tapped ? 'Ooh so curious! ✨' : 'tap me! 🎁'}
          </span>
        </motion.div>

        {/* Narrative text */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-comic text-2xl sm:text-3xl text-[#532620] mb-8 font-semibold tracking-wide"
        >
          I have a little surprise prepared for you... but
        </motion.h2>

        {/* Action Button: YES, obviously 😎 */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinue}
          className="cursor-pointer inline-flex items-center gap-2 px-9 py-3.5 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-amber-200/50 font-bold"
        >
          <span>YES, obviously</span>
          <span className="text-2xl">😎</span>
        </motion.button>

        <button
          onClick={onBack}
          className="mt-6 text-xs text-stone-400 hover:text-stone-600 font-comic cursor-pointer underline"
        >
          ← Back to cover
        </button>
      </motion.div>
    </div>
  );
};
