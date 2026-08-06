'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useWorldStore } from '@/store/useWorldStore';
import { ShieldCheck, RotateCcw, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import { audio } from '@/lib/audio';

export function Scene12_Finale() {
  const { jumpToScene } = useWorldStore();

  useEffect(() => {
    audio.playSuccess();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#E2E8F0', '#8C8070', '#8A8A8A'],
      });
    } catch {
      // Fallback if canvas-confetti environment issues
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#C5A880]" />
            <span>Autonomous Financial Integrity</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-medium font-serif text-white tracking-tight">
            Protected by Sentinel AI
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Continuous 24/7 neural monitoring safeguarding global financial rails with sub-millisecond precision.
          </p>
        </motion.div>

        {/* Global Impact Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-[#C5A880]/5 text-[#C5A880] w-fit">
              <Activity className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">1,240,000</div>
            <div className="text-xs text-gray-400">Transactions Monitored Per Sec</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-[#7A9282]/5 text-[#7A9282] w-fit">
              <CheckCircle2 className="w-5 h-5 text-[#7A9282]" />
            </div>
            <div className="text-3xl font-mono font-bold text-[#7A9282]">99.4%</div>
            <div className="text-xs text-gray-400">Precision Rate (0.6% False Positives)</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2">
            <div className="p-2 rounded-xl bg-[#C5A880]/5 text-[#C5A880] w-fit">
              <ShieldCheck className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div className="text-3xl font-mono font-bold text-[#C5A880]">1.2 Sec</div>
            <div className="text-xs text-gray-400">End-to-End SAR Generation Time</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex items-center justify-center space-x-4">
          <button
            onClick={() => jumpToScene(0)}
            className="px-6 py-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-semibold text-sm flex items-center space-x-2 transition-all hover:scale-105"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Keynote Presentation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
