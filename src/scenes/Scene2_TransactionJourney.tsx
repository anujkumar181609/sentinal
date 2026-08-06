'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, ShieldAlert, Zap, Layers } from 'lucide-react';

export function Scene2_TransactionJourney() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Zap className="w-4 h-4 text-[#C5A880]" />
            <span>Target Payload Ingestion</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            Suspicious Payload: Tx-8809
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            A high-velocity $1.2M wire transfer originates from an offshore entity, routed through layered shell accounts towards a Tier-1 clearing rail.
          </p>
        </div>

        {/* Transaction Payload Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-[#C5A880]/5 border border-[#C5A880]/20 flex items-center justify-center text-[#C5A880] font-mono font-bold text-sm">
                TX
              </div>
              <div>
                <div className="font-mono font-bold text-white text-lg">Tx-8809-994X</div>
                <div className="text-xs text-gray-400">ISO 20022 `pacs.008.001.08` Credit Transfer</div>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#BD4C4C]/5 border border-[#BD4C4C]/25 text-[#BD4C4C] text-xs font-mono font-bold flex items-center space-x-1">
              <ShieldAlert className="w-3.5 h-3.5 text-[#BD4C4C]" />
              <span>Flagged Anomaly</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400">Transfer Amount</div>
              <div className="text-lg font-mono font-bold text-white">$1,200,000.00</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400">Origin Jurisdiction</div>
              <div className="text-sm font-semibold text-[#C29953] flex items-center space-x-1">
                <Globe className="w-3.5 h-3.5 text-[#C29953]" />
                <span>KY - Cayman Islands</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400">Velocity Signal</div>
              <div className="text-sm font-mono font-bold text-[#BD4C4C]">+840% vs Baseline</div>
            </div>

            <div className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-[11px] text-gray-400">Rail Network</div>
              <div className="text-sm font-semibold text-[#C5A880] flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>SWIFT gpi FedWire</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#C5A880]/5 border border-[#C5A880]/15 text-xs text-[#C5A880] flex items-center justify-between">
            <span>Payload traveling towards Sentinel Neural Intelligence Pipeline...</span>
            <ArrowUpRight className="w-4 h-4 animate-bounce text-[#C5A880]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
