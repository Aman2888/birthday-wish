
import screamingCat from '../../assets/images/screaming_cat_baby_1792993741092.jpg';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../../types';
import { sound } from '../../utils/audio';
import { RotateCcw, Heart, Sparkles, Edit3 } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onRestart: () => void;
  onOpenEdit: () => void;
}

export const ScreenFinalLove: React.FC<Props> = ({ config, onRestart, onOpenEdit }) => {
  const [kissCount, setKissCount] = useState(0);

  const handleScreamingCatClick = () => {
    sound.playCelebrationFanfare();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#ffe4e6', '#fbbf24'],
    });
  };

  const handleKissShower = () => {
    sound.playRomanticChime();
    setKissCount((prev) => prev + 1);
    confetti({
      particleCount: 80,
      spread: 85,
      origin: { y: 0.65 },
      colors: ['#ff0055', '#ff5080', '#ffaacc'],
    });
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-3 sm:p-8 select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full bg-[#fff5f8] border-4 border-pink-200 rounded-3xl shadow-2xl p-5 sm:p-10 relative overflow-hidden paper-texture my-2 sm:my-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Touching Romantic Birthday Message */}
          <div className="md:col-span-7 flex flex-col text-left space-y-4">
            <div>
              <span className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#7a251e] tracking-wide">
                And That&apos;s everything....
              </span>
              <h2 className="font-bubble text-3xl sm:text-4xl font-extrabold text-[#52211c] tracking-wide">
                for now. ❤️
              </h2>
            </div>

            <p className="font-comic text-xl sm:text-2xl text-[#532620] font-bold">
              I hope you like your little Birthday Surprise.
            </p>

            <p className="font-handwriting text-2xl sm:text-3xl text-[#4a2e2b] leading-relaxed">
              I wish I could be there to celebrate with you, annoy you, make you laugh, and give you all of this in person.
            </p>

            <p className="font-comic text-2xl sm:text-3xl text-[#7a251e] font-bold">
              I love you and Miss you so much.
            </p>

            <div className="pt-2">
              <span className="font-serif-display text-3xl sm:text-4xl font-extrabold text-[#8c2e26] tracking-widest uppercase">
                HAPPY BIRTHDAY {config.boyfriendName}! 🎂✨
              </span>
            </div>

            {/* Interactive Shower Kisses Button */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleKissShower}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bubble text-sm shadow-md font-bold"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Shower Him With Kisses 💋</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </motion.button>

              {kissCount > 0 && (
                <span className="font-comic text-rose-700 font-bold text-sm animate-pulse">
                  {kissCount * 10} kisses showered! 😘
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Custom Screaming Cat */}
          <div className="md:col-span-5 flex flex-col items-center">
            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleScreamingCatClick}
              className="cursor-pointer relative w-72 sm:w-80 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group hover:shadow-2xl transition-all"
              title="Click the screaming baby cat!"
            >
              <img
                src={screamingCat}
                alt="Cute cat screaming BABYYYY I love you"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-comic bg-rose-500 text-white px-3 py-1 rounded-full shadow-md">
                click me! 📢❤️
              </span>
            </motion.div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-6 border-t-2 border-stone-200/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onRestart}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bubble text-sm transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Surprise from Start</span>
            </button>

            <button
              onClick={onOpenEdit}
              className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bubble text-sm shadow-xs transition-all"
            >
              <Edit3 className="w-4 h-4 text-amber-600" />
              <span>Personalize Details (Names, Letter, Date)</span>
            </button>
          </div>

          <div className="text-right">
            <span className="font-script text-3xl text-rose-800 font-bold">
              Forever & Always Yours ❤️
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
