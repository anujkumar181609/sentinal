'use client';

import { useWorldStore } from '@/store/useWorldStore';
import { SCENES } from '@/lib/constants';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  VolumeX,
  HelpCircle,
  ShieldAlert,
  Maximize2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function PresenterOverlay() {
  const {
    activeSceneIndex,
    totalScenes,
    nextScene,
    prevScene,
    jumpToScene,
    replayScene,
    ui,
    toggleSound,
    toggleHelpModal,
  } = useWorldStore();

  const currentScene = SCENES[activeSceneIndex];
  const progressPercent = ((activeSceneIndex + 1) / totalScenes) * 100;

  if (!ui.presenterMode) {
    return (
      <button
        onClick={() => useWorldStore.getState().togglePresenterMode()}
        className="fixed bottom-4 right-4 z-50 p-2.5 rounded-full bg-[#141414] border border-[#222222] text-white/70 hover:text-white transition-all hover:scale-105"
        title="Show Presenter HUD (P)"
      >
        <ShieldAlert className="w-5 h-5 text-[#C5A880]" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex flex-col justify-between p-6">
      {/* Top Header & Progress Bar */}
      <div className="w-full pointer-events-auto space-y-4">
        {/* Top Progress Line */}
        <div className="w-full h-1 bg-[#222222] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Brand Badge */}
          <div className="flex items-center space-x-3 bg-[#141414] border border-[#222222] px-4 py-2 rounded-2xl shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-[#C5A880] flex items-center justify-center font-bold text-black shadow-lg shadow-black/20">
              S
            </div>
            <div>
              <div className="text-xs font-semibold tracking-wider text-[#C5A880] uppercase">
                Sentinel AML
              </div>
              <div className="text-[10px] text-gray-400 tracking-wide">
                Intelligence Engine
              </div>
            </div>
          </div>

          {/* Current Category Pill */}
          <div className="hidden md:flex items-center space-x-2 bg-[#141414] border border-[#222222] px-4 py-2 rounded-2xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A9282]" />
            <span className="text-xs font-medium text-gray-300">
              {currentScene.category}
            </span>
            <span className="text-gray-600">•</span>
            <span className="text-xs text-gray-400">
              {currentScene.question}
            </span>
          </div>

          {/* Controls Bar (Right) */}
          <div className="flex items-center space-x-2 bg-[#141414] border border-[#222222] p-1.5 rounded-2xl">
            <button
              onClick={toggleSound}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Toggle Audio (M)"
            >
              {ui.soundMuted ? (
                <VolumeX className="w-4 h-4 text-[#BD4C4C]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#7A9282]" />
              )}
            </button>

            <button
              onClick={toggleHelpModal}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Keyboard Shortcuts (H)"
            >
              <HelpCircle className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              title="Fullscreen (F)"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Keynote Controls & Scene Timeline Selector */}
      <div className="w-full pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Scene Numbers Jump Bar */}
        <div className="flex items-center space-x-1 bg-[#141414] border border-[#222222] p-2 rounded-2xl overflow-x-auto max-w-full">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => jumpToScene(idx)}
              className={cn(
                'px-2.5 py-1 rounded-xl text-xs font-mono font-medium transition-all',
                activeSceneIndex === idx
                  ? 'bg-[#C5A880] text-black shadow-lg font-bold scale-105'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              )}
              title={scene.title}
            >
              {String(idx).padStart(2, '0')}
            </button>
          ))}
        </div>

        {/* Action Button Navigation Cluster */}
        <div className="flex items-center space-x-3 bg-[#141414] border border-[#222222] p-2 rounded-2xl">
          <button
            onClick={prevScene}
            disabled={activeSceneIndex === 0}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
            title="Previous Scene (Left Arrow)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={replayScene}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
            title="Replay Scene (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={nextScene}
            disabled={activeSceneIndex === totalScenes - 1}
            className="px-5 py-2.5 rounded-xl bg-[#C5A880] text-black font-semibold text-sm flex items-center space-x-2 shadow-lg shadow-black/25 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:pointer-events-none hover:bg-[#b89b73]"
            title="Next Scene (Space / Right Arrow)"
          >
            <span>Next Scene</span>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}
