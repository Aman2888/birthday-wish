import React, { useState } from 'react';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/audio';
import { X, Save, RotateCcw, Heart, Sparkles } from 'lucide-react';
import { DEFAULT_CONFIG } from '../data/defaultConfig';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSave: (newConfig: BirthdayConfig) => void;
}

export const EditSurpriseModal: React.FC<Props> = ({ isOpen, onClose, config, onSave }) => {
  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [activeTab, setActiveTab] = useState<'basics' | 'letter' | 'dinner'>('basics');

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-900/10 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <div>
              <h2 className="font-bubble text-2xl font-extrabold text-[#6d2520]">
                Personalize Your Surprise Website
              </h2>
              <p className="font-comic text-xs text-stone-500">
                Customize names, nickname, letter & date details for your boyfriend
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer p-2 rounded-full hover:bg-stone-100 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-200 mt-4 font-bubble text-sm">
          <button
            onClick={() => setActiveTab('basics')}
            className={`cursor-pointer px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'basics'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Boyfriend & Nickname
          </button>
          <button
            onClick={() => setActiveTab('dinner')}
            className={`cursor-pointer px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'dinner'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Dinner Date Ticket
          </button>
          <button
            onClick={() => setActiveTab('letter')}
            className={`cursor-pointer px-4 py-2 border-b-2 font-bold transition-all ${
              activeTab === 'letter'
                ? 'border-rose-600 text-rose-800'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Love Letter
          </button>
        </div>

        {/* Tab 1: Basics */}
        {activeTab === 'basics' && (
          <div className="space-y-4 py-5 font-comic text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Pet Nickname (Displayed on Cover & Title)
              </label>
              <input
                type="text"
                value={formData.petNickname}
                onChange={(e) => setFormData({ ...formData, petNickname: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="e.g. MY KUCHU PUCHU! / MY JAAN"
              />
              <span className="text-[11px] text-stone-400 mt-0.5 block">
                Shown right above &ldquo;Happy Birthday&rdquo; on the cover
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Boyfriend&apos;s Name
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
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-bubble text-stone-800"
                  placeholder="e.g. David, Ali, Zayn"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Name / Signature
                </label>
                <input
                  type="text"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-bubble text-stone-800"
                  placeholder="e.g. Your Girlfriend, Your Jaan"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Dinner Date Ticket */}
        {activeTab === 'dinner' && (
          <div className="space-y-4 py-5 font-comic text-left">
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
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-bubble text-stone-800 font-bold"
                placeholder="e.g. David Birthday Dinner"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Location / Restaurant
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
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white text-sm"
                  placeholder="e.g. Silver Spoon"
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
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white text-sm"
                  placeholder="e.g. 8:30 PM"
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
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white text-sm"
                  placeholder="e.g. Navy Blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Special Note on Ticket
              </label>
              <input
                type="text"
                value={formData.dinner.specialNote}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dinner: { ...formData.dinner, specialNote: e.target.value }
                  })
                }
                className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white text-sm"
                placeholder="e.g. Table reserved for two with candlelight ✨"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Love Letter */}
        {activeTab === 'letter' && (
          <div className="space-y-4 py-5 font-comic text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Letter Heading
              </label>
              <input
                type="text"
                value={formData.letterHeading}
                onChange={(e) => setFormData({ ...formData, letterHeading: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-bubble text-stone-800 font-bold"
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
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:outline-rose-500 bg-white font-handwriting text-lg text-stone-800 leading-relaxed"
                placeholder="Separate paragraphs with a blank line..."
              />
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-stone-200">
          <button
            onClick={handleReset}
            className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-stone-500 hover:text-stone-700 text-xs font-bubble hover:bg-stone-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-full text-stone-600 font-bubble text-sm hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6d2520] hover:bg-[#852c26] text-white font-bubble text-sm font-bold shadow-md"
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
