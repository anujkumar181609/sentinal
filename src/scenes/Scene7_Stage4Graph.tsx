'use client';

import { motion } from 'framer-motion';
import { Share2, Network, ShieldAlert, AlertOctagon } from 'lucide-react';

export function Scene7_Stage4Graph() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Share2 className="w-4 h-4 text-[#C5A880]" />
            <span>Stage 04 — Graph Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            Uncovering Money Mule Rings & Sanction Hubs
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Individual transactions appear benign in isolation. Sentinel’s 3D Graph Intelligence uncovers hidden topological clusters connecting 6 mule accounts and 1 OFAC-sanctioned hub.
          </p>
        </div>

        {/* Graph Cluster Telemetry Overlay Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-3xl bg-[#141414] border border-[#BD4C4C]/30 space-y-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-[#BD4C4C]/10 text-[#BD4C4C]">
                <Network className="w-5 h-5 text-[#BD4C4C]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Detected Mule Cluster: Ring-994</h3>
                <p className="text-xs text-gray-400">6 Inter-connected nodes | $1.2M Total Layering Volume</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#BD4C4C]/10 text-[#BD4C4C] text-xs font-mono font-bold flex items-center space-x-1">
              <AlertOctagon className="w-3.5 h-3.5 text-[#BD4C4C]" />
              <span>Multi-Hop Ring Matched</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400 font-medium">Shell Entity Node</div>
              <div className="text-sm font-semibold text-[#C29953]">Shell Corp Alpha (KY)</div>
              <div className="text-[10px] text-gray-400">Layering Hub | Risk: 0.88</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400 font-medium">Target Sanction Hub</div>
              <div className="text-sm font-semibold text-[#BD4C4C]">OFAC Sanctioned Node</div>
              <div className="text-[10px] text-[#BD4C4C]/80 font-mono">1-Hop Connection</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400 font-medium">Graph Centrality</div>
              <div className="text-sm font-mono font-bold text-[#C5A880]">Eigenvector: 0.98</div>
              <div className="text-[10px] text-gray-400">High network influence</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
