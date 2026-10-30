import React, { useState } from 'react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { X, Save, RotateCcw, Heart, Sparkles, FolderHeart } from 'lucide-react';
import { DEFAULT_CONFIG } from '../data/defaultConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const EditSurpriseModal: React.FC<Props> = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [activeTab, setActiveTab] = useState<'basics' | 'photos-guide' | 'dinner' | 'letter'>('basics');

  if (!isOpen) return null;

  const handleSave = () => {
    sound.playRomanticChime();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    sound.playPop();
    setFormData(DEFAULT_CONFIG);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#fff5f8] p-5 sm:p-8 rounded-3xl shadow-2xl border-4 border-pink-200 my-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-pink-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <div>
              <h2 className="font-bubble text-xl sm:text-2xl font-extrabold text-[#702138]">
                Personalize Details for {formData.boyfriendName}
              </h2>
              <p className="font-comic text-xs text-stone-600">
                Customize names, love letter, dinner date & photo guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-pink-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap border-b border-pink-200 mt-3 font-bubble text-xs sm:text-sm">
          <button
            onClick={() => setActiveTab('basics')}
            className={`cursor-pointer px-3 sm:px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'basics'
                ? 'border-pink-600 text-pink-900 bg-pink-100/60 rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Name & Nickname
          </button>
          <button
            onClick={() => setActiveTab('photos-guide')}
            className={`cursor-pointer px-3 sm:px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'photos-guide'
                ? 'border-pink-600 text-pink-900 bg-pink-100/60 rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            📸 12 Photos Guide
          </button>
          <button
            onClick={() => setActiveTab('dinner')}
            className={`cursor-pointer px-3 sm:px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'dinner'
                ? 'border-pink-600 text-pink-900 bg-pink-100/60 rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Dinner Date
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`cursor-pointer px-3 sm:px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'letter'
                ? 'border-pink-600 text-pink-900 bg-pink-100/60 rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Love Letter
          </button>
        </div>

        {/* Tab 1: Basics */}
        {activeTab === 'basics' && (
          <div className="space-y-4 py-4 font-comic text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Boyfriend&apos;s Full Name
              </label>
              <input
                type="text"
                value={formData.boyfriendName}
                onChange={(e) => {
                  const name = e.target.value;
                  setFormData({
                    ...formData,
                    boyfriendName: name,
                    dinner: { ...formData.dinner, eventTitle: `${name} Birthday Dinner` }
                  });
                }}
                className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="Faiz ur Rehman"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Pet Nickname (Cover Title)
              </label>
              <input
                type="text"
                value={formData.petNickname}
                onChange={(e) => setFormData({ ...formData, petNickname: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="MY KUCHU PUCHU!"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Your Signature / Name
              </label>
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-bubble text-stone-800"
                placeholder="Your Girlfriend ❤️"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Photos Guide (Where to place your 12 pictures in code) */}
        {activeTab === 'photos-guide' && (
          <div className="space-y-3 py-4 font-comic text-left text-stone-700 max-h-[50vh] overflow-y-auto pr-1">
            <div className="p-3.5 bg-white rounded-2xl border border-pink-300 shadow-xs">
              <div className="flex items-center gap-2 mb-1.5 text-[#702138] font-bubble font-bold text-sm">
                <FolderHeart className="w-4 h-4 text-pink-600" />
                <span>Live Website Photo Storage (Laptop Code Setup)</span>
              </div>
              <p className="text-xs leading-relaxed text-stone-600">
                Aapki photos direct website ke codebase se load ho rahi hain, taake jab aap kisi ko live link send karein, to photos har kisi ko hamesha nazar aayen!
              </p>
            </div>

            {/* Birthday Boy Photo path */}
            <div className="p-3 bg-pink-100/70 rounded-xl border border-pink-200">
              <span className="font-bubble text-xs text-pink-900 font-bold block mb-1">
                👑 1 Photo for Birthday Boy (Faiz ur Rehman):
              </span>
              <code className="text-xs font-mono bg-white px-2 py-1 rounded text-pink-800 border border-pink-200 block">
                /public/images/birthday-boy.jpg
              </code>
            </div>

            {/* 12 Memories photos path */}
            <div className="p-3 bg-pink-100/70 rounded-xl border border-pink-200">
              <span className="font-bubble text-xs text-pink-900 font-bold block mb-1">
                📸 12 Photos for Memories:
              </span>
              <p className="text-xs mb-1.5 text-stone-600">
                Apni 12 photos ko is folder mein in names se save kar lein:
              </p>
              <div className="grid grid-cols-2 gap-1 text-[11px] font-mono">
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-1.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-2.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-3.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-4.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-5.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-6.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-7.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-8.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-9.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-10.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-11.jpg</span>
                <span className="bg-white px-1.5 py-0.5 rounded border border-pink-100 truncate">/images/memories/memory-12.jpg</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Dinner Date */}
        {activeTab === 'dinner' && (
          <div className="space-y-3 py-4 font-comic text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Ticket Event Title
              </label>
              <input
                type="text"
                value={formData.dinner.eventTitle}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dinner: { ...formData.dinner, eventTitle: e.target.value }
                  })
                }
                className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="Faiz ur Rehman Birthday Dinner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.dinner.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dinner: { ...formData.dinner, location: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-pink-300 bg-white text-sm"
                  placeholder="Silver Spoon"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={formData.dinner.time}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dinner: { ...formData.dinner, time: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-pink-300 bg-white text-sm"
                  placeholder="8:30 PM"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Dress Code
                </label>
                <input
                  type="text"
                  value={formData.dinner.dressCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dinner: { ...formData.dinner, dressCode: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-pink-300 bg-white text-sm"
                  placeholder="Navy Blue"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Love Letter */}
        {activeTab === 'letter' && (
          <div className="space-y-3 py-4 font-comic text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Letter Heading
              </label>
              <input
                type="text"
                value={formData.letterHeading}
                onChange={(e) => setFormData({ ...formData, letterHeading: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="HUGGING YOU Through My Phone"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Love Letter Content (Paragraphs)
              </label>
              <textarea
                rows={5}
                value={formData.letterContent.join('\n\n')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    letterContent: e.target.value.split('\n\n').filter((p) => p.trim().length > 0)
                  })
                }
                className="w-full px-4 py-2.5 rounded-xl border border-pink-300 focus:outline-pink-500 bg-white font-handwriting text-lg text-stone-800 leading-relaxed"
                placeholder="Separate paragraphs with a blank line..."
              />
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-pink-200">
          <button
            onClick={handleReset}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-stone-500 hover:text-stone-700 text-xs font-bubble hover:bg-pink-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-1.5 rounded-full text-stone-600 font-bubble text-xs sm:text-sm hover:bg-pink-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bubble text-xs sm:text-sm font-bold shadow-md hover:scale-102 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply ✨</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
