import React from 'react';
import { motion } from 'motion/react';
import { Crown, Sparkles, Heart } from 'lucide-react';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  photoUrl?: string;
  name: string;
  caption?: string;
}

export const BirthdayBoyCard: React.FC<Props> = ({ photoUrl, name, caption }) => {
  const handleClickCard = () => {
    sound.playRomanticChime();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#f472b6', '#fb7185', '#fbbf24'],
    });
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={handleClickCard}
      className="relative w-full max-w-sm sm:max-w-md mx-auto p-5 sm:p-6 bg-gradient-to-b from-white via-pink-50/70 to-rose-50/60 rounded-3xl border-3 border-pink-200/90 shadow-xl cursor-pointer group select-none text-center"
      title="Click for sparkles & romantic chime!"
    >
      {/* Decorative Crown */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
        <motion.div
          animate={{ rotate: [-4, 4, -4], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="bg-amber-100 text-amber-600 p-2 rounded-full border-2 border-amber-300 shadow-md"
        >
          <Crown className="w-6 h-6 fill-amber-400 text-amber-600" />
        </motion.div>
      </div>

      <div className="pt-2">
        <span className="text-[11px] font-bubble uppercase tracking-widest text-pink-700 bg-pink-100/90 px-3 py-1 rounded-full font-bold">
          The Birthday Boy 👑
        </span>

        <h3 className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#702138] mt-2 mb-3">
          {name}
        </h3>

        {/* Photo Container */}
        <div className="relative w-56 sm:w-64 h-80 sm:h-96 mx-auto rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-pink-100 mb-3 flex items-center justify-center">          <img
          src={photoUrl || '/images/birthday-boy.jpg'}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        </div>

        {caption && (
          <p className="font-handwriting text-xl text-[#582030] leading-snug max-w-xs mx-auto mb-1">
            &ldquo;{caption}&rdquo;
          </p>
        )}

        <div className="flex items-center justify-center gap-1 text-xs font-comic text-pink-600 mt-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Wishing you the happiest birthday ever!</span>
          <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
        </div>
      </div>
    </motion.div>
  );
};
