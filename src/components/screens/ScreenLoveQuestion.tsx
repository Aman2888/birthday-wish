
import shyKitten from '../../assets/images/shy_white_kitten_1792993738478.jpg';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { sound } from '../../utils/audio';

interface Props {
  onSayYes: () => void;
  onSayNo: () => void;
}

export const ScreenLoveQuestion: React.FC<Props> = ({ onSayYes, onSayNo }) => {
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

  const handleYes = () => {
    sound.playRomanticChime();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffd166'],
    });
    onSayYes();
  };

  const handleNoClick = () => {
    sound.playDramaticNo();
    onSayNo();
  };

  const handleNoHover = () => {
    if (noHoverCount < 4) {
      sound.playPop();
      const randomX = (Math.random() - 0.5) * 140;
      const randomY = (Math.random() - 0.5) * 90;
      setNoBtnPos({ x: randomX, y: randomY });
      setNoHoverCount((prev) => prev + 1);
    }
  };

  const noPhrases = [
    'NO',
    'Wait, NO?? 🥺',
    'Think twice! 🤨',
    'Careful now... 🔫',
    'NO (Danger!) 😈',
  ];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      {/* Soft watercolor heart background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-rose-100/40 via-amber-50/50 to-pink-100/30 -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto flex flex-col items-center"
      >
        <p className="font-comic text-stone-600 text-lg sm:text-xl mb-1">
          One important question before you continue.....
        </p>

        <h1 className="font-bubble text-3xl sm:text-5xl font-extrabold text-[#6d2520] mb-4 tracking-wide">
          Do You Love Me?
        </h1>

        {/* Custom Shy White Kitten Twiddling Paws */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="relative w-64 sm:w-72 aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white mb-8 cursor-pointer group hover:shadow-2xl transition-all"
          onClick={() => sound.playMeow()}
          title="Click the shy kitten!"
        >
          <img
            src={shyKitten}
            alt="Shy cartoon cat asking Do you love me"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-rose-600 font-comic text-xs px-2.5 py-0.5 rounded-full shadow-sm">
            tap me 🐾
          </span>
        </motion.div>

        {/* Buttons: YES / NO */}
        <div className="flex items-center justify-center gap-6 relative min-h-[60px] w-full">
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="cursor-pointer px-10 py-3 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-lg sm:text-xl shadow-lg hover:shadow-2xl transition-all duration-200 border-2 border-amber-200/50 font-bold tracking-wider"
          >
            YES 💕
          </motion.button>

          <motion.button
            animate={{ x: noBtnPos.x, y: noBtnPos.y }}
            transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            onMouseEnter={handleNoHover}
            onClick={handleNoClick}
            className="cursor-pointer px-9 py-3 rounded-full bg-[#52211c] hover:bg-rose-900 text-white/90 font-bubble text-lg sm:text-xl shadow-md transition-all duration-200 border border-stone-400/30 font-bold tracking-wider"
          >
            {noPhrases[Math.min(noHoverCount, noPhrases.length - 1)]}
          </motion.button>
        </div>

        {noHoverCount > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-xs font-comic text-rose-600 font-semibold"
          >
            {noHoverCount >= 4 ? "Okay you asked for it... click NO if you dare! 😈" : "Hehe, are you sure about that? 😜"}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};
