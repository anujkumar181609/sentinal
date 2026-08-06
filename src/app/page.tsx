'use client';

import dynamic from 'next/dynamic';
import { KeyboardController } from '@/engine/KeyboardController';
import { SceneManager } from '@/scenes/SceneManager';
import { PresenterOverlay } from '@/ui/PresenterOverlay';
import { HelpModal } from '@/ui/HelpModal';

// Dynamically import WebGL WorldCanvas to bypass SSR issues with 3D Canvas
const WorldCanvas = dynamic(
  () => import('@/world/WorldCanvas').then((mod) => mod.WorldCanvas),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#06070A] text-white overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Global Keyboard Listener */}
      <KeyboardController />

      {/* Persistent 3D WebGL Canvas Layer */}
      <WorldCanvas />

      {/* Animated 2D UI Overlay Layer */}
      <SceneManager />

      {/* Presenter Keynote Overlay HUD */}
      <PresenterOverlay />

      {/* Keyboard Shortcuts Cheatsheet Modal */}
      <HelpModal />
    </main>
  );
}
