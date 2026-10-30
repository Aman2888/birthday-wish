import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Cake, Sparkles } from 'lucide-react';
import { sound, MusicTrack } from '../utils/audio';

export const AudioControls: React.FC = () => {
  const [muted, setMuted] = useState(sound.getMuted());
  const [isPlaying, setIsPlaying] = useState(sound.getBgmPlaying());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(sound.getTrack());

  useEffect(() => {
    // Attempt gentle start on first user interaction
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

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
      {/* Switch Track Button */}
      <button
        onClick={handleSwitchTrack}
        title="Switch between Happy Birthday Song & Romantic Tune"
        className="cursor-pointer flex items-center gap-1.5 px-3 py-2 rounded-full bg-pink-50/95 hover:bg-pink-100 text-pink-800 border border-pink-200/90 shadow-md backdrop-blur-md font-bubble text-xs transition-all hover:scale-102"
      >
        {currentTrack === 'happy-birthday' ? (
          <>
            <Cake className="w-3.5 h-3.5 text-pink-600 animate-bounce" />
            <span className="font-bold">Birthday Tune 🎂</span>
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span className="font-bold">Romantic Melody 🎶</span>
          </>
        )}
      </button>

      {/* Mute/Play Button */}
      <button
        onClick={handleToggleMute}
        title={muted ? "Unmute music & sound effects" : "Mute audio"}
        className="cursor-pointer flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-md hover:shadow-lg border border-pink-200 text-pink-800 hover:bg-pink-50 transition-all font-bubble text-xs group"
      >
        <span className="relative flex h-2.5 w-2.5">
          {isPlaying && !muted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isPlaying && !muted ? 'bg-pink-500' : 'bg-stone-300'}`}></span>
        </span>
        
        {muted ? (
          <>
            <VolumeX className="w-4 h-4 text-stone-400" />
            <span className="text-stone-500 font-medium">Muted</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-pink-600 animate-pulse-subtle" />
            <span className="font-semibold text-pink-900 hidden sm:inline">Sound On</span>
          </>
        )}
      </button>
    </div>
  );
};
