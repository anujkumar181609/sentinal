'use client';

import { useWorldStore } from '@/store/useWorldStore';
import { X, Keyboard } from 'lucide-react';

export function HelpModal() {
  const { ui, toggleHelpModal } = useWorldStore();

  if (!ui.showHelpModal) return null;

  const shortcuts = [
    { key: 'Space / Right Arrow', label: 'Advance to Next Scene' },
    { key: 'Left Arrow', label: 'Return to Previous Scene' },
    { key: 'R', label: 'Replay Current Scene Animations' },
    { key: 'F', label: 'Toggle Fullscreen Mode' },
    { key: 'P', label: 'Toggle Presenter Overlay HUD' },
    { key: 'M', label: 'Mute / Unmute Audio Synthesizer' },
    { key: 'H', label: 'Open / Close Shortcuts Help' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#141414] border border-[#222222] rounded-3xl p-6 shadow-2xl space-y-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#C5A880]/10 text-[#C5A880]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg font-serif">Keyboard Shortcuts</h3>
              <p className="text-xs text-gray-400">Keynote navigation controls</p>
            </div>
          </div>
          <button
            onClick={toggleHelpModal}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {shortcuts.map((sc) => (
            <div
              key={sc.key}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/[0.04]"
            >
              <span className="text-sm text-gray-300">{sc.label}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-semibold bg-white/5 border border-white/10 rounded-lg text-[#C5A880]">
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={toggleHelpModal}
          className="w-full py-3 rounded-2xl bg-[#C5A880] hover:bg-[#b89b73] text-black font-semibold text-sm transition-all shadow-lg shadow-black/25"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
