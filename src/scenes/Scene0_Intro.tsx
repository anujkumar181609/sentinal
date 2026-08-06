'use client';

import { motion } from 'framer-motion';
import { useWorldStore } from '@/store/useWorldStore';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export function Scene0_Intro() {
  const { nextScene } = useWorldStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-6 max-w-4xl"
      >
        {/* Version Pill */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15">
          <Sparkles className="w-4 h-4 text-[#C5A880]" />
          <span className="text-xs font-mono tracking-widest text-[#C5A880] uppercase">
            Sentinel AI v4.2 Keynote
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-8xl font-medium tracking-tight text-white font-serif">
          SENTINEL
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          AI-Powered Anti-Money Laundering Intelligence System
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 max-w-3xl mx-auto text-left">
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-white/5 text-[#C5A880] w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <div className="font-semibold text-white text-sm">Sub-ms Streaming</div>
            <div className="text-xs text-gray-400">100k+ TPS real-time ISO 20022 ingestion</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-white/5 text-[#C5A880] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="font-semibold text-white text-sm">Graph Neural Networks</div>
            <div className="text-xs text-gray-400">Multi-hop money mule ring detection</div>
          </div>

          <div className="p-5 rounded-2xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-white/5 text-[#C5A880] w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="font-semibold text-white text-sm">Automated SARs</div>
            <div className="text-xs text-gray-400">SHAP-proven regulatory compliance filing</div>
          </div>
        </div>

        {/* Start Keynote Button */}
        <div className="pt-8">
          <button
            onClick={nextScene}
            className="px-8 py-4 rounded-2xl bg-[#C5A880] hover:bg-[#b89b73] text-black font-semibold text-base shadow-xl shadow-black/20 flex items-center space-x-3 mx-auto transition-all hover:scale-105 active:scale-95 group"
          >
            <span>Initiate Keynote Presentation</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-black" />
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">Space</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">Right Arrow</kbd> to advance
          </p>
        </div>
      </motion.div>
    </div>
  );
}
