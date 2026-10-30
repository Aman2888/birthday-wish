import React from 'react';
import { motion } from 'motion/react';
import { Cake, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';
import { BirthdayBoyCard } from '../BirthdayBoyCard';
import { BirthdayConfig } from '../../types';

interface Props {
  config: BirthdayConfig;
  openedSurprises: {
    readMe: boolean;
    memories: boolean;
    dinnerTicket: boolean;
    cake: boolean;
  };
  onOpenSurprise: (surprise: 'read-me' | 'fav-memories' | 'dinner-ticket' | 'cake-blow' | 'final-love') => void;
}

export const ScreenSurprisesHub: React.FC<Props> = ({
  config,
  openedSurprises,
  onOpenSurprise,
}) => {
  const handleSelect = (surprise: 'read-me' | 'fav-memories' | 'dinner-ticket' | 'cake-blow' | 'final-love') => {
    sound.playPop();
    onOpenSurprise(surprise);
  };

  const allMainOpened = openedSurprises.readMe && openedSurprises.memories && openedSurprises.dinnerTicket;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-3 sm:p-6 text-center select-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mx-auto flex flex-col items-center"
      >
        <span className="font-bubble text-xl sm:text-2xl font-extrabold text-[#9d2449] tracking-wide">
          A Little Birthday Journey for
        </span>
        <h1 className="font-bubble text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#702138] mb-1 tracking-wide">
          {config.boyfriendName} 🎂
        </h1>
        <p className="font-comic text-stone-600 text-sm sm:text-lg mb-6">
          Take your time.... and open the surprises one by one ✨
        </p>

        {/* Dedicated Birthday Boy VIP Photo Spotlight Card (Clean static photo) */}
        <div className="w-full max-w-sm sm:max-w-md mb-8">
          <BirthdayBoyCard
            name={config.boyfriendName}
            photoUrl={config.birthdayBoyPhoto}
            caption={config.birthdayBoyCaption}
          />
        </div>

        {/* 3 Interactive Surprise Items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-3xl mb-8">
          
          {/* 1. Read Me Envelope */}
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('read-me')}
            className={`cursor-pointer relative p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 ${
              openedSurprises.readMe ? 'border-emerald-300 shadow-md' : 'border-pink-200 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.readMe && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-[11px] font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}
            
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 flex items-center justify-center mb-3 group-hover:rotate-3 transition-transform shadow-inner">
              <span className="text-4xl sm:text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">💌</span>
            </div>

            <span className="font-bubble text-lg sm:text-xl text-[#702138] font-bold group-hover:text-pink-700 transition-colors underline decoration-pink-300 decoration-2 underline-offset-4">
              Read Me
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              A heartfelt love letter
            </span>
          </motion.div>

          {/* 2. My 12 Fav Memories Polaroid Camera */}
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('fav-memories')}
            className={`cursor-pointer relative p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 ${
              openedSurprises.memories ? 'border-emerald-300 shadow-md' : 'border-pink-200 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.memories && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-[11px] font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-pink-200 to-pink-50 flex items-center justify-center mb-3 group-hover:-rotate-3 transition-transform shadow-inner">
              <span className="text-4xl sm:text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">📷</span>
            </div>

            <span className="font-bubble text-lg sm:text-xl text-[#702138] font-bold group-hover:text-pink-700 transition-colors underline decoration-pink-300 decoration-2 underline-offset-4">
              12 Memories
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              Our 12 sweetest polaroids
            </span>
          </motion.div>

          {/* 3. Your Gift / Dinner Ticket */}
          <motion.div
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('dinner-ticket')}
            className={`cursor-pointer relative p-5 sm:p-6 rounded-3xl bg-white/90 backdrop-blur-sm border-2 ${
              openedSurprises.dinnerTicket ? 'border-emerald-300 shadow-md' : 'border-pink-200 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.dinnerTicket && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-[11px] font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-rose-100 to-pink-50 flex items-center justify-center mb-3 group-hover:rotate-3 transition-transform shadow-inner">
              <span className="text-4xl sm:text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">🎟️</span>
            </div>

            <span className="font-bubble text-lg sm:text-xl text-[#702138] font-bold group-hover:text-pink-700 transition-colors underline decoration-pink-300 decoration-2 underline-offset-4">
              Your Gift
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              Dinner ticket & love coupons
            </span>
          </motion.div>
        </div>

        {/* Bonus Activities Row */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('cake-blow')}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-100/90 hover:bg-pink-200 text-pink-900 border border-pink-300 font-bubble text-sm sm:text-base shadow-xs transition-all"
          >
            <Cake className="w-4 h-4 text-pink-700" />
            <span>Blow Candle & Cut Cake 🎂</span>
            {openedSurprises.cake && <span className="text-xs text-emerald-600 font-bold">✓ Done</span>}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('final-love')}
            className={`cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bubble text-sm sm:text-base shadow-md transition-all ${
              allMainOpened
                ? 'bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white animate-pulse-subtle border-2 border-pink-300'
                : 'bg-white hover:bg-pink-50 text-stone-700 border border-pink-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Final Surprise for Faiz ❤️</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
