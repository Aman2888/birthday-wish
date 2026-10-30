import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../../types';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, Sparkles, Wind } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onBackToHub: () => void;
  onNextSurprise: () => void;
}

export const ScreenCakeBlow: React.FC<Props> = ({ config, onBackToHub, onNextSurprise }) => {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [cakeCut, setCakeCut] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const allBlownOut = candlesLit.every((c) => !c);

  const handleBlowSingle = (index: number) => {
    if (!candlesLit[index]) return;
    sound.playBlowCandle();
    const updated = [...candlesLit];
    updated[index] = false;
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      setWishMade(true);
      sound.playRomanticChime();
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.5 },
      });
    }
  };

  const handleBlowAll = () => {
    sound.playBlowCandle();
    setCandlesLit([false, false, false, false, false]);
    setWishMade(true);
    sound.playRomanticChime();
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  const handleCutCake = () => {
    sound.playCelebrationFanfare();
    setCakeCut(true);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.55 },
    });
  };

  const handleRelight = () => {
    sound.playPop();
    setCandlesLit([true, true, true, true, true]);
    setCakeCut(false);
    setWishMade(false);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-3 sm:p-8 select-none">
      {/* Top back bar */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-2 mb-4 sm:mb-6">
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
          <span>Grand Finale ❤️</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="max-w-xl w-full mx-auto flex flex-col items-center text-center">
        <span className="px-3.5 py-1 bg-amber-100 text-amber-900 rounded-full font-bubble text-xs tracking-wider uppercase font-bold mb-2">
          Make A Birthday Wish ✨
        </span>

        <h1 className="font-bubble text-3xl sm:text-5xl font-extrabold text-[#6d2520] mb-2 tracking-wide">
          {allBlownOut ? (cakeCut ? 'Cake Sliced & Shared! 🍰' : 'Wish Made! Now Cut The Cake! 🎂') : 'Blow Out The Candles!'}
        </h1>

        <p className="font-comic text-stone-600 text-base sm:text-lg mb-8 max-w-md">
          {allBlownOut
            ? (cakeCut
                ? 'May all your dreams and secret wishes come true this year, my love! 💕'
                : 'Now grab the birthday knife and cut the first slice! 🔪🍰')
            : 'Close your eyes, make a secret wish for this year, and click the candles to blow them out!'}
        </p>

        {/* Interactive Cake Illustration Canvas */}
        <div className="relative w-72 sm:w-88 h-64 sm:h-72 flex flex-col items-center justify-end mb-6 max-w-full">
          
          {/* Candles Row */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 z-20 mb-[-12px]">
            {candlesLit.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => handleBlowSingle(idx)}
                className="flex flex-col items-center cursor-pointer group"
                title={isLit ? "Click to blow out candle!" : "Blown out!"}
              >
                {/* Flame */}
                {isLit ? (
                  <motion.div
                    animate={{
                      scaleY: [1, 1.25, 0.9, 1.15, 1],
                      scaleX: [1, 0.9, 1.1, 0.95, 1],
                      y: [-1, -3, 0, -2, -1],
                    }}
                    transition={{ repeat: Infinity, duration: 0.9 + idx * 0.1 }}
                    className="w-3.5 sm:w-4 h-5 sm:h-6 rounded-full bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 shadow-[0_0_12px_#f59e0b] filter drop-shadow-md"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [1, 0], y: -15 }}
                    transition={{ duration: 0.8 }}
                    className="text-stone-400 text-xs font-mono select-none"
                  >
                    💨
                  </motion.div>
                )}

                {/* Candle Stick */}
                <div
                  className={`w-3 sm:w-3.5 h-10 sm:h-12 rounded-t-sm shadow-sm transition-colors ${
                    idx % 2 === 0
                      ? 'bg-gradient-to-b from-rose-300 to-rose-400'
                      : 'bg-gradient-to-b from-amber-200 to-amber-300'
                  }`}
                />
              </div>
            ))}
          </div>

          {/* Strawberry Shortcake Layers */}
          <div className="relative w-64 sm:w-80 flex flex-col items-center">
            
            {/* Top Tier Frosting */}
            <div className="relative w-52 sm:w-64 h-14 sm:h-16 bg-[#fff7ed] rounded-t-3xl border-3 border-amber-900/10 shadow-md flex items-center justify-around px-3 sm:px-4">
              <span className="text-lg sm:text-xl">🍓</span>
              <span className="text-xs sm:text-sm font-handwriting text-rose-500 font-bold truncate max-w-[150px] sm:max-w-none">
                Happy Bday {config.boyfriendName}
              </span>
              <span className="text-lg sm:text-xl">🍓</span>
            </div>

            {/* Middle Strawberry Cream Band */}
            <div className="w-56 sm:w-72 h-7 sm:h-8 bg-gradient-to-r from-rose-200 via-pink-200 to-rose-200 border-x-3 border-amber-900/10 flex items-center justify-center">
              <div className="w-full border-t border-dashed border-rose-300"></div>
            </div>

            {/* Bottom Tier Cake Base */}
            <div className="relative w-64 sm:w-80 h-16 sm:h-20 bg-[#fde8d0] rounded-b-2xl border-3 border-t-0 border-amber-900/10 shadow-xl flex items-center justify-between px-4 sm:px-6">
              <div className="w-full flex justify-around text-base sm:text-lg">
                <span>🍒</span>
                <span>🎂</span>
                <span>🍒</span>
                <span>✨</span>
                <span>🍒</span>
              </div>
            </div>

            {/* Plate */}
            <div className="w-72 sm:w-88 h-4 sm:h-5 bg-stone-100 rounded-full shadow-lg border-2 border-stone-200 -mt-1" />

            {/* Knife Cutting Animation Slice */}
            {cakeCut && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 90, y: -20 }}
                className="absolute right-0 top-10 bg-amber-50 border-2 border-rose-300 p-2 rounded-xl shadow-xl flex items-center gap-2"
              >
                <span className="text-2xl">🍰</span>
                <span className="font-comic text-xs text-rose-700 font-bold">
                  Sweet slice for you!
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
          {!allBlownOut ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBlowAll}
              className="cursor-pointer inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bubble text-lg shadow-md font-bold"
            >
              <Wind className="w-5 h-5" />
              <span>Blow All Candles At Once! 💨</span>
            </motion.button>
          ) : !cakeCut ? (
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCutCake}
              className="cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#7a251e] to-[#912c24] text-white font-bubble text-lg sm:text-xl shadow-lg font-bold border-2 border-amber-200"
            >
              <span>Cut The Birthday Cake! 🔪🍰</span>
              <Sparkles className="w-5 h-5 text-amber-200" />
            </motion.button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleRelight}
                className="cursor-pointer px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bubble text-sm"
              >
                Relight Candles 🕯️
              </button>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNextSurprise}
                className="cursor-pointer inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white font-bubble text-lg shadow-lg font-bold animate-pulse-subtle"
              >
                <span>Grand Finale for Baby! ❤️</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
