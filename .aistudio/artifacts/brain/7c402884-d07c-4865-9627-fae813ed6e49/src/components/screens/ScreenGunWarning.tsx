import React from 'react';
import { motion } from 'motion/react';
import { sound } from '../../utils/audio';

interface Props {
  onGoBack: () => void;
}

export const ScreenGunWarning: React.FC<Props> = ({ onGoBack }) => {
  const handleBack = () => {
    sound.playPop();
    onGoBack();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden bg-rose-50/70">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 15 }}
        className="max-w-md w-full mx-auto flex flex-col items-center"
      >
        <motion.div
          animate={{ x: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 0.2 }}
        >
          <h2 className="font-comic text-2xl sm:text-3xl text-[#532620] tracking-widest font-bold">
            How. Dare. You.
          </h2>
          <h1 className="font-bubble text-3xl sm:text-5xl text-[#852c26] tracking-wider font-extrabold mb-4">
            CLICK YES! 😾💥
          </h1>
        </motion.div>

        {/* Custom Meme Cat with Gun and Glitter Pink Sunglasses */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="relative w-72 sm:w-84 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-300 mb-6 bg-white"
        >
          <img
            src="/src/assets/images/meme_cat_sunglasses_gun_1792993739054.jpg"
            alt="Cat with pink sunglasses and gun meme"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <p className="font-comic text-stone-700 text-base sm:text-lg mb-4 font-semibold">
          There is only one correct answer here mister... 😼🔫
        </p>

        {/* Go Back Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleBack}
          className="cursor-pointer px-10 py-3.5 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-lg sm:text-xl shadow-lg hover:shadow-2xl transition-all duration-200 border-2 border-rose-300 font-bold tracking-wide"
        >
          Go Back (and say YES) 🥺💕
        </motion.button>
      </motion.div>
    </div>
  );
};
