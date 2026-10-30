import React, { useState, useEffect } from 'react';
import { SurpriseScreen } from '../types';
import { sound, MusicTrack } from '../utils/audio';
import { Cake, Sparkles, Volume2, VolumeX, Edit3 } from 'lucide-react';

interface Props {
  currentScreen: SurpriseScreen;
  onNavigate: (screen: SurpriseScreen) => void;
  onOpenEdit: () => void;
}

export const NavigationHeader: React.FC<Props> = ({ currentScreen, onNavigate, onOpenEdit }) => {
  const [muted, setMuted] = useState(sound.getMuted());
  const [isPlaying, setIsPlaying] = useState(sound.getBgmPlaying());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(sound.getTrack());

  useEffect(() => {
    const handleFirstClick = () => {
      if (!sound.getBgmPlaying() && !sound.getMuted()) {
        sound.startBgm();
        setIsPlaying(true);
      }
      window.removeEventListener('click', handleFirstClick);
    };

    window.addEventListener('click', handleFirstClick);
    return () => {
      window.removeEventListener('click', handleFirstClick);
    };
  }, []);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    setIsPlaying(sound.getBgmPlaying());
    if (!isNowMuted) {
      sound.playPop();
    }
  };

  const handleSwitchTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playPop();
    const nextTrack: MusicTrack = currentTrack === 'happy-birthday' ? 'romantic-lofi' : 'happy-birthday';
    sound.setTrack(nextTrack);
    setCurrentTrack(nextTrack);
    setIsPlaying(sound.getBgmPlaying());
  };

  const steps: { screen: SurpriseScreen; label: string; icon: string }[] = [
    { screen: 'welcome', label: 'Cover', icon: '🎂' },
    { screen: 'gift-intro', label: 'Gift', icon: '🎁' },
    { screen: 'love-question', label: 'Quiz', icon: '❓' },
    { screen: 'love-confirmed', label: 'Love', icon: '💕' },
    { screen: 'surprises-hub', label: 'Surprises', icon: '✨' },
    { screen: 'final-love', label: 'Baby!', icon: '📢' },
  ];

  const handleStepClick = (screen: SurpriseScreen) => {
    sound.playPop();
    onNavigate(screen);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#fff0f5]/95 backdrop-blur-md border-b border-pink-200 shadow-xs select-none">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2">
        {/* Top bar row on mobile, single flex row on desktop */}
        <div className="flex items-center justify-between gap-2">

          {/* Brand Logo / Home */}
          <button
            onClick={() => handleStepClick('welcome')}
            className="cursor-pointer flex items-center gap-1.5 text-[#702138] hover:text-pink-700 transition-colors font-bubble text-sm sm:text-base font-bold shrink-0"
            title="Go to Cover"
          >
            <span className="text-xl">🐱🌸</span>
            <span className="truncate max-w-[130px] sm:max-w-none">Faiz ur Rehman 🎂</span>
          </button>

          {/* Desktop Navigation Tabs (Hidden on small mobile, visible on md+) */}
          <nav className="hidden md:flex items-center gap-1.5">
            {steps.map((st) => {
              const isActive = currentScreen === st.screen;
              return (
                <button
                  key={st.screen}
                  onClick={() => handleStepClick(st.screen)}
                  className={`cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bubble transition-all duration-200 whitespace-nowrap ${isActive
                      ? 'bg-[#702138] text-white shadow-xs font-bold scale-105'
                      : 'bg-white/80 hover:bg-white text-stone-600 hover:text-pink-900 border border-pink-200/80'
                    }`}
                >
                  <span>{st.icon}</span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Integrated Audio & Controls Zone */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Music Song Switcher */}
            <button
              onClick={handleSwitchTrack}
              title="Click to switch music: Birthday Song / Romantic Melody"
              className="cursor-pointer flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-900 border border-pink-300 font-bubble text-[11px] sm:text-xs transition-all shadow-xs"
            >
              {currentTrack === 'happy-birthday' ? (
                <>
                  <Cake className="w-3.5 h-3.5 text-pink-600 animate-bounce" />
                  <span className="font-bold hidden xs:inline sm:inline">HBD Tune 🎂</span>
                  <span className="font-bold xs:hidden sm:hidden">HBD 🎂</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-pink-600" />
                  <span className="font-bold hidden xs:inline sm:inline">Melody 🎶</span>
                  <span className="font-bold xs:hidden sm:hidden">Tune 🎶</span>
                </>
              )}
            </button>

            {/* Mute / Unmute Button */}
            <button
              onClick={handleToggleMute}
              title={muted ? 'Unmute music & sounds' : 'Mute audio'}
              className="cursor-pointer flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-pink-900 font-bubble text-[11px] sm:text-xs shadow-xs transition-all"
            >
              <span className="relative flex h-2 w-2">
                {isPlaying && !muted && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying && !muted ? 'bg-pink-500' : 'bg-stone-300'}`}></span>
              </span>

              {muted ? (
                <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-pink-600" />
              )}
              <span className="hidden sm:inline font-semibold">{muted ? 'Muted' : 'Sound'}</span>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Strip (Second row exclusively for mobile screens, never overlapping!) */}
        <div className="md:hidden mt-2 pt-1.5 border-t border-pink-100 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth">
          {steps.map((st) => {
            const isActive = currentScreen === st.screen;
            return (
              <button
                key={st.screen}
                onClick={() => handleStepClick(st.screen)}
                className={`cursor-pointer flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bubble shrink-0 transition-all duration-200 ${isActive
                    ? 'bg-[#702138] text-white shadow-xs font-bold scale-102'
                    : 'bg-white/90 text-stone-600 border border-pink-200/90'
                  }`}
              >
                <span>{st.icon}</span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
