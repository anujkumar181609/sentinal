'use client';

import { useEffect } from 'react';
import { useWorldStore } from '@/store/useWorldStore';

export function KeyboardController() {
  const {
    nextScene,
    prevScene,
    replayScene,
    toggleHelpModal,
    togglePresenterMode,
    toggleSound,
  } = useWorldStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore key events if user is typing in an input field
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      switch (e.code) {
        case 'Space':
        case 'ArrowRight':
          e.preventDefault();
          nextScene();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevScene();
          break;
        case 'KeyR':
          e.preventDefault();
          replayScene();
          break;
        case 'KeyF':
          e.preventDefault();
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
          break;
        case 'KeyH':
          e.preventDefault();
          toggleHelpModal();
          break;
        case 'KeyP':
          e.preventDefault();
          togglePresenterMode();
          break;
        case 'KeyM':
          e.preventDefault();
          toggleSound();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScene, prevScene, replayScene, toggleHelpModal, togglePresenterMode, toggleSound]);

  return null;
}
