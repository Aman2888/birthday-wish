import React from 'react';
import { SurpriseScreen } from '../types';
import { sound } from '../utils/audio';
import { Sparkles, Edit3, Home, Gift } from 'lucide-react';

interface Props {
  currentScreen: SurpriseScreen;
  onNavigate: (screen: SurpriseScreen) => void;
  onOpenEdit: () => void;
}

export const NavigationHeader: React.FC<Props> = ({ currentScreen, onNavigate, onOpenEdit }) => {
  const steps: { screen: SurpriseScreen; label: string; icon: string }[] = [
    { screen: 'welcome', label: 'Cover', icon: '🎂' },
    { screen: 'gift-intro', label: 'Gift', icon: '🎁' },
    { screen: 'love-question', label: 'Quiz', icon: '❓' },
    { screen: 'love-confirmed', label: 'Love', icon: '💕' },
    { screen: 'surprises-hub', label: '3 Surprises', icon: '✨' },
    { screen: 'final-love', label: 'Baby!', icon: '📢' },
  ];

  const handleStepClick = (screen: SurpriseScreen) => {
    sound.playPop();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-2.5 bg-[#faf5f0]/85 backdrop-blur-md border-b border-rose-200/50 shadow-xs">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand / Home */}
        <button
          onClick={() => handleStepClick('welcome')}
          className="cursor-pointer flex items-center gap-1.5 text-[#6d2520] hover:text-rose-700 transition-colors font-bubble text-sm sm:text-base font-bold"
          title="Back to cover"
        >
          <span className="text-xl">🐱❤️</span>
          <span className="hidden sm:inline">Birthday Surprise</span>
        </button>

        {/* Step dots */}
        <div className="flex items-center gap-1 sm:gap-2">
          {steps.map((st) => {
            const isActive = currentScreen === st.screen;
            return (
              <button
                key={st.screen}
                onClick={() => handleStepClick(st.screen)}
                title={st.label}
                className={`cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bubble transition-all duration-200 ${
                  isActive
                    ? 'bg-[#6d2520] text-white shadow-sm font-bold scale-105'
                    : 'bg-white/70 hover:bg-white text-stone-600 hover:text-rose-900 border border-stone-200/60'
                }`}
              >
                <span>{st.icon}</span>
                <span className="hidden md:inline">{st.label}</span>
              </button>
            );
          })}
        </div>

        {/* Edit / Personalize Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playPop();
              onOpenEdit();
            }}
            className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 hover:bg-amber-100 text-amber-900 font-bubble text-xs sm:text-sm border border-amber-300/80 shadow-xs transition-all hover:scale-102"
            title="Personalize names, nickname & dinner details"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-700" />
            <span className="font-semibold">Edit Details</span>
          </button>
        </div>

      </div>
    </header>
  );
};
