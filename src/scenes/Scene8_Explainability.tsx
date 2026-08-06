'use client';

import { motion } from 'framer-motion';
import { HelpCircle, BarChart3, ShieldCheck } from 'lucide-react';

export function Scene8_Explainability() {
  const shapFeatures = [
    { feature: 'Velocity Spike (10m)', impact: '+0.34', pct: 85, color: 'bg-[#BD4C4C]' },
    { feature: 'OFAC Sanction 1-Hop Proximity', impact: '+0.28', pct: 70, color: 'bg-[#BD4C4C]' },
    { feature: 'Structuring Index (Smurfing)', impact: '+0.18', pct: 45, color: 'bg-[#C29953]' },
    { feature: 'High-Risk Offshore Origin (KY)', impact: '+0.12', pct: 30, color: 'bg-[#C29953]' },
    { feature: 'Historical Account Longevity', impact: '-0.04', pct: 10, color: 'bg-[#7A9282]' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <BarChart3 className="w-4 h-4 text-[#C5A880]" />
            <span>Explainable AI (SHAP)</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            Mathematical Proof for Every Flag
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            No black-box decisions. Sentinel provides SHapley Additive exPlanations (SHAP) attributing exact mathematical contribution weights for audit & legal defense.
          </p>
        </div>

        {/* SHAP Waterfall Chart Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl space-y-6"
        >
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div>
              <h3 className="font-bold text-white text-base">SHAP Value Feature Attribution Waterfall</h3>
              <p className="text-xs text-gray-400">Baseline Score: 0.06 -&gt; Final Model Output: 0.94</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#C5A880]/10 text-[#C5A880] text-xs font-mono font-bold">
              Sum: +0.88 Δ
            </div>
          </div>

          {/* Bar chart list */}
          <div className="space-y-4">
            {shapFeatures.map((sf, idx) => (
              <div key={sf.feature} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-gray-200">{sf.feature}</span>
                  <span className="font-mono text-gray-300">{sf.impact}</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: `${sf.pct}%` }}
                     transition={{ duration: 0.8, delay: idx * 0.1 }}
                     className={`h-full ${sf.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#7A9282]/5 border border-[#7A9282]/15 text-xs text-[#7A9282] flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-[#7A9282]" />
            <span>Audit Proof Verified: Mathematical rationale saved to immutable compliance log.</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
