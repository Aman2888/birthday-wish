import React from 'react';
import { motion } from 'motion/react';
import { Mail, Camera, Ticket, Cake, Sparkles, CheckCircle2 } from 'lucide-react';
import { sound } from '../../utils/audio';

interface Props {
  openedSurprises: {
    readMe: boolean;
    memories: boolean;
    dinnerTicket: boolean;
    cake: boolean;
  };
  onOpenSurprise: (surprise: 'read-me' | 'fav-memories' | 'dinner-ticket' | 'cake-blow' | 'final-love') => void;
}

export const ScreenSurprisesHub: React.FC<Props> = ({ openedSurprises, onOpenSurprise }) => {
  const handleSelect = (surprise: 'read-me' | 'fav-memories' | 'dinner-ticket' | 'cake-blow' | 'final-love') => {
    sound.playPop();
    onOpenSurprise(surprise);
  };

  const allMainOpened = openedSurprises.readMe && openedSurprises.memories && openedSurprises.dinnerTicket;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full mx-auto flex flex-col items-center"
      >
        <span className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#7a251e] tracking-wide">
          A Little Birthday Journey
        </span>
        <h1 className="font-bubble text-3xl sm:text-5xl font-extrabold text-[#532620] mb-2 tracking-wide">
          3 Little Surprises
        </h1>
        <p className="font-comic text-stone-600 text-lg sm:text-xl mb-10">
          Take your time.... and open them one by one ✨
        </p>

        {/* 3 Interactive Surprise Items */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-3xl mb-10">
          
          {/* 1. Read Me Envelope */}
          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('read-me')}
            className={`cursor-pointer relative p-6 rounded-3xl bg-white/80 backdrop-blur-sm border-2 ${
              openedSurprises.readMe ? 'border-emerald-300 shadow-md' : 'border-rose-200/80 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.readMe && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-xs font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}
            
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-rose-100 to-amber-50 flex items-center justify-center mb-4 group-hover:rotate-3 transition-transform shadow-inner">
              <span className="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">💌</span>
            </div>

            <span className="font-bubble text-xl sm:text-2xl text-[#6d2520] font-bold group-hover:text-rose-700 transition-colors underline decoration-rose-300 decoration-2 underline-offset-4">
              Read Me
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              A love letter from my heart
            </span>
          </motion.div>

          {/* 2. My Fav Memories Polaroid Camera */}
          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('fav-memories')}
            className={`cursor-pointer relative p-6 rounded-3xl bg-white/80 backdrop-blur-sm border-2 ${
              openedSurprises.memories ? 'border-emerald-300 shadow-md' : 'border-rose-200/80 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.memories && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-xs font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-50 flex items-center justify-center mb-4 group-hover:-rotate-3 transition-transform shadow-inner">
              <span className="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">📷</span>
            </div>

            <span className="font-bubble text-xl sm:text-2xl text-[#6d2520] font-bold group-hover:text-rose-700 transition-colors underline decoration-rose-300 decoration-2 underline-offset-4">
              My Fav Memories
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              Our cutest moments & polaroids
            </span>
          </motion.div>

          {/* 3. Your Gift / Dinner Ticket */}
          <motion.div
            whileHover={{ scale: 1.05, y: -6 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => handleSelect('dinner-ticket')}
            className={`cursor-pointer relative p-6 rounded-3xl bg-white/80 backdrop-blur-sm border-2 ${
              openedSurprises.dinnerTicket ? 'border-emerald-300 shadow-md' : 'border-rose-200/80 shadow-lg'
            } flex flex-col items-center group transition-all duration-300`}
          >
            {openedSurprises.dinnerTicket && (
              <span className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-xs font-bubble bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Opened
              </span>
            )}

            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-amber-100 to-red-50 flex items-center justify-center mb-4 group-hover:rotate-3 transition-transform shadow-inner">
              <span className="text-5xl drop-shadow-sm group-hover:scale-110 transition-transform">🎟️</span>
            </div>

            <span className="font-bubble text-xl sm:text-2xl text-[#6d2520] font-bold group-hover:text-rose-700 transition-colors underline decoration-rose-300 decoration-2 underline-offset-4">
              Your Gift
            </span>
            <span className="text-xs font-comic text-stone-500 mt-1">
              Dinner invite & love coupons
            </span>
          </motion.div>
        </div>

        {/* Bonus Activities Row */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('cake-blow')}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bubble text-base shadow-sm transition-all"
          >
            <Cake className="w-4 h-4 text-amber-600" />
            <span>Blow Candle & Cut Cake 🎂</span>
            {openedSurprises.cake && <span className="text-xs text-emerald-600 font-bold">✓ Done</span>}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelect('final-love')}
            className={`cursor-pointer inline-flex items-center gap-2 px-7 py-2.5 rounded-full font-bubble text-base shadow-md transition-all ${
              allMainOpened
                ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white animate-pulse-subtle border-2 border-rose-300'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Final Message for Baby ❤️</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
