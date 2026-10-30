/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BirthdayConfig, SurpriseScreen } from './types';
import { DEFAULT_CONFIG } from './data/defaultConfig';
import { FloatingHearts } from './components/FloatingHearts';
import { NavigationHeader } from './components/NavigationHeader';
import { EditSurpriseModal } from './components/EditSurpriseModal';

import { ScreenWelcome } from './components/screens/ScreenWelcome';
import { ScreenGiftIntro } from './components/screens/ScreenGiftIntro';
import { ScreenLoveQuestion } from './components/screens/ScreenLoveQuestion';
import { ScreenGunWarning } from './components/screens/ScreenGunWarning';
import { ScreenLoveConfirmed } from './components/screens/ScreenLoveConfirmed';
import { ScreenSurprisesHub } from './components/screens/ScreenSurprisesHub';
import { ScreenReadMe } from './components/screens/ScreenReadMe';
import { ScreenMemories } from './components/screens/ScreenMemories';
import { ScreenDinnerTicket } from './components/screens/ScreenDinnerTicket';
import { ScreenCakeBlow } from './components/screens/ScreenCakeBlow';
import { ScreenFinalLove } from './components/screens/ScreenFinalLove';

const STORAGE_KEY = 'bday_surprise_config_v5_clean_memories';

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Always ensure memories use the latest image paths defined in photos.ts
        parsed.memories = DEFAULT_CONFIG.memories.map((dm, idx) => ({
          ...dm,
          title: parsed.memories?.[idx]?.title || dm.title,
          caption: parsed.memories?.[idx]?.caption || dm.caption,
          date: parsed.memories?.[idx]?.date || dm.date,
          imageUrl: dm.imageUrl,
        }));
        return { ...DEFAULT_CONFIG, ...parsed };
      }
    } catch {
      // Ignore fallback
    }
    return DEFAULT_CONFIG;
  });

  const [currentScreen, setCurrentScreen] = useState<SurpriseScreen>('welcome');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [openedSurprises, setOpenedSurprises] = useState({
    readMe: false,
    memories: false,
    dinnerTicket: false,
    cake: false,
  });

  const handleSaveConfig = (newConfig: BirthdayConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch {
      // Ignore error
    }
  };

  const handleOpenSurprise = (screen: 'read-me' | 'fav-memories' | 'dinner-ticket' | 'cake-blow' | 'final-love') => {
    if (screen === 'read-me') {
      setOpenedSurprises((prev) => ({ ...prev, readMe: true }));
    } else if (screen === 'fav-memories') {
      setOpenedSurprises((prev) => ({ ...prev, memories: true }));
    } else if (screen === 'dinner-ticket') {
      setOpenedSurprises((prev) => ({ ...prev, dinnerTicket: true }));
    } else if (screen === 'cake-blow') {
      setOpenedSurprises((prev) => ({ ...prev, cake: true }));
    }
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fff0f5] text-[#582030] flex flex-col relative selection:bg-pink-200 selection:text-pink-900">
      {/* Floating background hearts in light pink */}
      <FloatingHearts />

      {/* Top navigation header with integrated audio controls & mobile row */}
      <NavigationHeader
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenEdit={() => setIsEditOpen(true)}
      />

      {/* Main Interactive Screen Content with Animated Transitions */}
      <main className="flex-1 flex flex-col justify-center relative z-20">
        <AnimatePresence mode="wait">
          {currentScreen === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenWelcome
                config={config}
                onNext={() => setCurrentScreen('gift-intro')}
              />
            </motion.div>
          )}

          {currentScreen === 'gift-intro' && (
            <motion.div
              key="gift-intro"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenGiftIntro
                onNext={() => setCurrentScreen('love-question')}
                onBack={() => setCurrentScreen('welcome')}
              />
            </motion.div>
          )}

          {currentScreen === 'love-question' && (
            <motion.div
              key="love-question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenLoveQuestion
                onSayYes={() => setCurrentScreen('love-confirmed')}
                onSayNo={() => setCurrentScreen('gun-warning')}
              />
            </motion.div>
          )}

          {currentScreen === 'gun-warning' && (
            <motion.div
              key="gun-warning"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', damping: 14 }}
            >
              <ScreenGunWarning
                onGoBack={() => setCurrentScreen('love-question')}
              />
            </motion.div>
          )}

          {currentScreen === 'love-confirmed' && (
            <motion.div
              key="love-confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenLoveConfirmed
                onShowSurprise={() => setCurrentScreen('surprises-hub')}
              />
            </motion.div>
          )}

          {currentScreen === 'surprises-hub' && (
            <motion.div
              key="surprises-hub"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenSurprisesHub
                config={config}
                openedSurprises={openedSurprises}
                onOpenSurprise={handleOpenSurprise}
              />
            </motion.div>
          )}

          {currentScreen === 'read-me' && (
            <motion.div
              key="read-me"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenReadMe
                config={config}
                onBackToHub={() => setCurrentScreen('surprises-hub')}
                onNextSurprise={() => {
                  setOpenedSurprises((prev) => ({ ...prev, memories: true }));
                  setCurrentScreen('fav-memories');
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'fav-memories' && (
            <motion.div
              key="fav-memories"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenMemories
                config={config}
                onBackToHub={() => setCurrentScreen('surprises-hub')}
                onNextSurprise={() => {
                  setOpenedSurprises((prev) => ({ ...prev, dinnerTicket: true }));
                  setCurrentScreen('dinner-ticket');
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'dinner-ticket' && (
            <motion.div
              key="dinner-ticket"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenDinnerTicket
                config={config}
                onBackToHub={() => setCurrentScreen('surprises-hub')}
                onNextSurprise={() => {
                  setOpenedSurprises((prev) => ({ ...prev, cake: true }));
                  setCurrentScreen('cake-blow');
                }}
              />
            </motion.div>
          )}

          {currentScreen === 'cake-blow' && (
            <motion.div
              key="cake-blow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenCakeBlow
                config={config}
                onBackToHub={() => setCurrentScreen('surprises-hub')}
                onNextSurprise={() => setCurrentScreen('final-love')}
              />
            </motion.div>
          )}

          {currentScreen === 'final-love' && (
            <motion.div
              key="final-love"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
            >
              <ScreenFinalLove
                config={config}
                onRestart={() => {
                  setCurrentScreen('welcome');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenEdit={() => setIsEditOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Edit Details Modal */}
      <EditSurpriseModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        config={config}
        onSave={handleSaveConfig}
      />
    </div>
  );
}
