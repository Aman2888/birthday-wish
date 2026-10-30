import cuteCats from '../../assets/images/cute_cats_cuddle_1792993737764.jpg';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BirthdayConfig } from '../../types';
import { sound } from '../../utils/audio';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  config: BirthdayConfig;
  onNext: () => void;
}

export const ScreenWelcome: React.FC<Props> = ({ config, onNext }) => {
  const [clickCount, setClickCount] = useState(0);

  const handleCatClick = () => {
    sound.playMeow();
    setClickCount((prev) => prev + 1);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.4 },
      colors: ['#f43f5e', '#fb7185', '#fda4af'],
    });
  };

  const handleStart = () => {
    sound.playRomanticChime();
    sound.startBgm();
    onNext();
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Decorative Red String of Fate Background Curves */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full opacity-35"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
      >
        <path
          d="M -50,300 C 150,150 250,50 350,150 C 450,250 300,450 150,420 C 50,400 80,220 220,180 C 400,120 700,50 850,250 C 950,380 750,550 650,400 C 580,300 750,100 1050,280"
          fill="none"
          stroke="#b93b3b"
          strokeWidth="3.5"
          strokeDasharray="6,4"
        />
        <circle cx="230" cy="180" r="10" fill="#b93b3b" />
        <circle cx="750" cy="200" r="9" fill="#e11d48" />
      </svg>

      {/* Main Card Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative max-w-2xl w-full mx-auto flex flex-col items-center"
      >
        {/* Custom High-Res Cartoon Cats Illustration */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCatClick}
          className="relative cursor-pointer mb-4 group"
          title="Click the cute cats for purr and meow!"
        >
          <div className="relative w-64 sm:w-76 md:w-84 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white/90 bg-white group-hover:shadow-2xl transition-all duration-300">
            <img
              src={cuteCats}
              alt="Cute cartoon cats cuddling"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-3 -right-2 bg-rose-500 text-white rounded-full p-2.5 shadow-lg border-2 border-white"
          >
            <Heart className="w-5 h-5 fill-current" />
          </motion.div>

          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white/95 text-rose-700 font-comic text-xs px-3 py-0.5 rounded-full shadow-md border border-rose-200">
            {clickCount > 0 ? `Loved ${clickCount} times! 💕` : 'Click to hear meow! 🐾'}
          </span>
        </motion.div>

        {/* Subtitle / Nickname Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-3 mb-2 mt-4"
        >
          <span className="h-[2px] w-8 sm:w-16 bg-rose-800/40 rounded-full"></span>
          <span className="font-bubble text-rose-900 tracking-wider text-lg sm:text-2xl font-bold uppercase">
            {config.petNickname}
          </span>
          <span className="h-[2px] w-8 sm:w-16 bg-rose-800/40 rounded-full"></span>
        </motion.div>

        {/* Big Romantic Happy Birthday Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <div className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold text-[#4a2420] tracking-tight leading-none mb-[-0.2em]">
            HAPPY
          </div>
          <div className="font-script text-6xl sm:text-8xl md:text-9xl text-[#7c3a2e] -mt-2 sm:-mt-4 leading-none transform -rotate-2 drop-shadow-sm">
            Birthday
          </div>
        </motion.div>

        {/* Romantic Interactive Start Button */}
        <motion.button
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleStart}
          className="cursor-pointer group relative inline-flex items-center gap-3 px-8 sm:px-11 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#7a2822] via-[#8c2e26] to-[#6d201c] text-white font-bubble text-lg sm:text-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200/50 font-bold"
        >
          <Sparkles className="w-5 h-5 text-amber-200 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Open Birthday Surprise</span>
          <span className="group-hover:translate-x-1.5 transition-transform text-2xl">🎁</span>
        </motion.button>

        <p className="mt-3.5 text-xs sm:text-sm font-comic text-stone-500">
          (Psst! Turn on sound in the top-right corner for cute music & sound effects 🎵)
        </p>
      </motion.div>
    </div>
  );
};
