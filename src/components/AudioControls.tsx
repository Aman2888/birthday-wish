import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export const AudioControls: React.FC = () => {
  const [muted, setMuted] = useState(sound.getMuted());
  const [isPlaying, setIsPlaying] = useState(sound.getBgmPlaying());

  useEffect(() => {
    // Attempt gentle start on first user click anywhere
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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
    setIsPlaying(sound.getBgmPlaying());
    if (!isNowMuted) {
      sound.playPop();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        title={muted ? "Unmute romantic music & sounds" : "Mute audio"}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-md hover:shadow-lg border border-rose-200/60 text-rose-700 hover:bg-rose-50 transition-all duration-300 font-comic text-sm cursor-pointer group"
      >
        <span className="relative flex h-3 w-3">
          {isPlaying && !muted && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isPlaying && !muted ? 'bg-rose-500' : 'bg-stone-300'}`}></span>
        </span>
        
        {muted ? (
          <>
            <VolumeX className="w-4 h-4 text-stone-500" />
            <span className="text-stone-500 font-medium">Sound Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-rose-600 animate-pulse-subtle" />
            <Music className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold text-rose-800">Sweet Music</span>
          </>
        )}
      </button>
    </div>
  );
};
