'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Filter, DollarSign, XCircle } from 'lucide-react';
import { audio } from '@/lib/audio';

export function Scene1_Problem() {
  const [filterActive, setFilterActive] = useState(false);

  const toggleFilter = () => {
    audio.playClick();
    setFilterActive(!filterActive);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-5xl w-full space-y-8">
        {/* Title Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#BD4C4C]/5 border border-[#BD4C4C]/15 text-[#BD4C4C] text-xs font-mono uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 text-[#BD4C4C]" />
            <span>Legacy System Failure</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-medium font-serif text-white tracking-tight">
            The $2.4 Trillion Money Laundering Crisis
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Traditional rules-based engines rely on rigid thresholds, swamping compliance officers with 95% false alarms while missing sophisticated mule rings.
          </p>
        </div>

        {/* Counter & Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2 text-center">
            <div className="text-4xl font-mono font-bold text-[#BD4C4C] tracking-tight flex items-center justify-center space-x-1">
              <DollarSign className="w-8 h-8 text-[#BD4C4C]" />
              <span>2.4T</span>
            </div>
            <div className="text-sm font-semibold text-white">Laundered Annually</div>
            <div className="text-xs text-gray-400">Less than 1% seized by law enforcement</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2 text-center">
            <div className="text-4xl font-mono font-bold text-[#C29953] tracking-tight">
              95%
            </div>
            <div className="text-sm font-semibold text-white">False Positive Rate</div>
            <div className="text-xs text-gray-400">19 out of 20 alerts are harmless noise</div>
          </div>

          <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-2 text-center">
            <div className="text-4xl font-mono font-bold text-[#C5A880] tracking-tight">
              4.2 Hours
            </div>
            <div className="text-sm font-semibold text-white">Avg Investigation Time</div>
            <div className="text-xs text-gray-400">Manual review per alert card</div>
          </div>
        </div>

        {/* Interactive Noise Filter Matrix Simulator */}
        <div className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-semibold text-white">
                Rule Engine Alert Grid (100 Sample Alerts)
              </div>
              <div className="text-xs text-gray-400">
                {filterActive ? 'Sentinel AI Filter Applied: 95 False Positives Suppressed' : 'Showing all raw legacy rule triggers'}
              </div>
            </div>

            <button
              onClick={toggleFilter}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all ${
                filterActive
                  ? 'bg-[#7A9282] text-black shadow-lg shadow-[#7A9282]/10'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{filterActive ? 'Sentinel Filter ACTIVE' : 'Apply Sentinel Noise Filter'}</span>
            </button>
          </div>

          {/* Alert Grid Nodes */}
          <div className="grid grid-cols-10 gap-2 p-4 bg-black/30 rounded-2xl border border-white/5">
            {Array.from({ length: 50 }).map((_, idx) => {
              const isTruePositive = idx === 12 || idx === 37;
              const isSuppressed = filterActive && !isTruePositive;

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    opacity: isSuppressed ? 0.15 : 1,
                    scale: isSuppressed ? 0.8 : 1,
                  }}
                  className={`h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                    isTruePositive
                      ? 'bg-[#BD4C4C] text-white shadow-md shadow-[#BD4C4C]/30 animate-pulse'
                      : 'bg-[#C29953]/15 text-[#C29953] border border-[#C29953]/20'
                  }`}
                >
                  {isTruePositive ? 'RISK' : 'NOISE'}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
