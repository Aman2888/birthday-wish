import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { BirthdayConfig, LoveCoupon } from '../../types';
import { sound } from '../../utils/audio';
import { ArrowLeft, ArrowRight, MapPin, Clock, Shirt, Sparkles, Check, Gift } from 'lucide-react';

interface Props {
  config: BirthdayConfig;
  onBackToHub: () => void;
  onNextSurprise: () => void;
}

export const ScreenDinnerTicket: React.FC<Props> = ({ config, onBackToHub, onNextSurprise }) => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(config.coupons);
  const [ticketAccepted, setTicketAccepted] = useState(false);

  const handleAcceptTicket = () => {
    sound.playCelebrationFanfare();
    setTicketAccepted(true);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleRedeemCoupon = (couponId: string) => {
    sound.playPop();
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isRedeemed: !c.isRedeemed } : c))
    );
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-start p-4 sm:p-8 select-none">
      {/* Top back & forward navigation */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6">
        <button
          onClick={onBackToHub}
          className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-700 font-bubble text-sm border border-stone-200 shadow-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Surprises Hub</span>
        </button>

        <button
          onClick={onNextSurprise}
          className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-sm shadow-md transition-all font-semibold"
        >
          <span>Next: Birthday Cake & Finale</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center">
        
        {/* Title Tag */}
        <div className="inline-block px-6 py-2 rounded-2xl bg-white/90 border border-stone-200 shadow-xs mb-4">
          <h2 className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#7a251e] tracking-wide">
            Yeyy.!! You&apos;re Invited to
          </h2>
        </div>

        {/* Vintage Red Ticket (matching Screenshot 9) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-2xl bg-[#c0433b] text-white rounded-3xl shadow-2xl p-6 sm:p-8 my-4 overflow-hidden border-2 border-rose-300/40"
        >
          {/* Perforated semi-circle notches on ticket sides */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf5f0] border-r-2 border-stone-300/60 shadow-inner" />
          <div className="absolute top-1/2 -right-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#faf5f0] border-l-2 border-stone-300/60 shadow-inner" />

          {/* Heart Band-Aid sticker on top left */}
          <div className="absolute -top-1 left-8 w-16 h-7 bg-amber-100 rounded-md rotate-[-25deg] shadow-md border border-amber-300 flex items-center justify-center pointer-events-none">
            <span className="text-red-500 text-xs">❤️</span>
          </div>

          {/* Roses sticker on bottom right */}
          <div className="absolute bottom-2 right-4 text-3xl pointer-events-none select-none drop-shadow">
            💐
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left section: Event Details */}
            <div className="md:col-span-7 flex flex-col text-left pl-2 sm:pl-4">
              <h1 className="font-bubble text-3xl sm:text-4xl font-extrabold tracking-wide leading-tight mb-4 text-white drop-shadow-sm">
                {config.dinner.eventTitle}
              </h1>

              <div className="space-y-3 font-comic text-base sm:text-lg mb-6 text-rose-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-rose-200 block font-bubble">Where</span>
                    <span className="font-bold text-white text-lg">{config.dinner.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-rose-200 block font-bubble">When</span>
                    <span className="font-bold text-white text-lg">{config.dinner.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Shirt className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-rose-200 block font-bubble">Dress Code</span>
                    <span className="font-bold text-white text-lg">{config.dinner.dressCode}</span>
                  </div>
                </div>
              </div>

              {/* RSVP Action */}
              <button
                onClick={handleAcceptTicket}
                className={`cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bubble text-sm font-bold shadow-md transition-all ${
                  ticketAccepted
                    ? 'bg-emerald-500 text-white border-2 border-white'
                    : 'bg-white text-[#7a251e] hover:bg-rose-100 hover:scale-105'
                }`}
              >
                {ticketAccepted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Table Confirmed! I&apos;ll be ready 💕</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Click to RSVP & Accept Ticket 🥂</span>
                  </>
                )}
              </button>
            </div>

            {/* Right section: Ticket Perforation & Table Illustration */}
            <div className="md:col-span-5 flex flex-col items-center border-t-2 md:border-t-0 md:border-l-2 border-dashed border-rose-300/60 pt-4 md:pt-0 md:pl-6">
              <div className="w-36 h-36 rounded-2xl bg-white/10 p-2 flex flex-col items-center justify-center border border-white/20">
                <span className="text-5xl mb-2">🍽️</span>
                <span className="font-comic text-xs text-rose-100 text-center">
                  Romantic Candlelight Table for 2
                </span>
                <span className="text-xs font-mono tracking-widest text-white/80 mt-1">
                  NO. #BDAY-2026
                </span>
              </div>
              <span className="text-[11px] font-comic text-rose-200 text-center mt-3">
                {config.dinner.specialNote}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bonus Section: Love Coupons for Boyfriend */}
        <div className="w-full mt-10 pt-8 border-t border-stone-200">
          <div className="text-center mb-6">
            <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full font-bubble text-xs tracking-wider uppercase font-bold">
              Special Boyfriend Perks
            </span>
            <h2 className="font-bubble text-2xl sm:text-3xl font-extrabold text-[#6d2520] mt-1">
              Redeemable Love Coupons
            </h2>
            <p className="font-comic text-stone-500 text-sm">
              Click any coupon to redeem it whenever you want!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coupons.map((coupon) => (
              <motion.div
                key={coupon.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleRedeemCoupon(coupon.id)}
                className={`cursor-pointer p-4 rounded-2xl border-2 transition-all relative overflow-hidden text-left ${
                  coupon.isRedeemed
                    ? 'bg-stone-100 border-stone-300 opacity-70'
                    : 'bg-white border-rose-200 shadow-md hover:shadow-lg'
                }`}
              >
                {coupon.isRedeemed && (
                  <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-[1px] flex items-center justify-center z-10">
                    <span className="font-bubble text-lg font-extrabold text-rose-700 bg-white/95 px-4 py-1 rounded-full border-2 border-rose-600 rotate-[-8deg] shadow-lg">
                      CLAIMED / REDEEMED ✓
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bubble tracking-widest uppercase bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full font-bold">
                    {coupon.badge}
                  </span>
                  <Gift className="w-4 h-4 text-rose-400" />
                </div>

                <h3 className="font-bubble text-lg font-bold text-[#5a2722] mb-1 leading-snug">
                  {coupon.title}
                </h3>
                <p className="font-comic text-stone-500 text-xs leading-relaxed">
                  {coupon.description}
                </p>

                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-rose-700 font-comic font-semibold">
                  <span>{coupon.isRedeemed ? 'Tap to undo' : 'Tap to redeem ✨'}</span>
                  <span>🎟️</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA to cake blowing and final message */}
        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
          <p className="font-comic text-stone-500 text-sm">
            All 3 surprises opened! Now let&apos;s cut your birthday cake! 🎂
          </p>
          <button
            onClick={onNextSurprise}
            className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-base shadow-md font-bold"
          >
            <span>Blow Candle & Cut Cake 🎂</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
