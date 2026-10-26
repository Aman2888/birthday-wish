import React from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface Props {
  onShowSurprise: () => void;
}

export const ScreenLoveConfirmed: React.FC<Props> = ({ onShowSurprise }) => {
  const handleClick = () => {
    sound.playCelebrationFanfare();
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.6 },
    });
    onShowSurprise();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-3"
        >
          <p className="font-comic text-stone-700 text-xl font-bold">
            Thanks! I Knew it!
          </p>
          <h2 className="font-bubble text-3xl sm:text-4xl font-extrabold text-[#7a251e] tracking-wide mt-0.5">
            I LOVE YOU too! 💕
          </h2>
        </motion.div>

        {/* Custom Cute Bears Hugging Illustration */}
        <motion.div
          animate={{ rotate: [-1, 1, -1], y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="relative w-64 sm:w-76 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white mb-6 cursor-pointer group hover:shadow-2xl transition-all"
          onClick={() => sound.playRomanticChime()}
          title="Bears hugging! Click for chimes"
        >
          <img
            src="/src/assets/images/cute_bears_hugging_1792993739765.jpg"
            alt="Cute cartoon bears hugging and laughing"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-rose-600 font-comic text-xs px-2.5 py-0.5 rounded-full shadow-sm">
            click for music ✨
          </span>
        </motion.div>

        <p className="font-comic text-stone-700 text-lg sm:text-xl font-semibold mb-6 max-w-xs">
          Now that we&apos;ve cleared that up, I have something for you...
        </p>

        {/* Action Button: SHOW ME THE SURPRISE */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClick}
          className="cursor-pointer px-9 py-3.5 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-lg sm:text-xl shadow-lg hover:shadow-2xl transition-all duration-200 border-2 border-amber-200/50 font-bold tracking-wider"
        >
          SHOW ME THE SURPRISE 🎁✨
        </motion.button>
      </motion.div>
    </div>
  );
};
