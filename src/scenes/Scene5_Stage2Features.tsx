'use client';

import { motion } from 'framer-motion';
import { Cpu, Zap, ShieldAlert, Clock, ArrowUpRight } from 'lucide-react';

export function Scene5_Stage2Features() {
  const features = [
    { label: 'Velocity (10 min)', val: '+840%', sub: 'Spike over baseline', alert: true },
    { label: 'Structuring Index', val: '0.91 / 1.00', sub: 'Smurfing pattern match', alert: true },
    { label: 'Sanction Distance', val: '1 Hop', sub: 'Direct link to OFAC hub', alert: true },
    { label: 'Entity Age', val: '4 Days', sub: 'Newly incorporated shell co', alert: false },
    { label: 'Cross-Border Multiplier', val: '4.8x', sub: 'High risk jurisdiction', alert: false },
    { label: 'Device Fingerprint', val: 'New IMEI', sub: 'Tor Exit Node IP', alert: true },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Cpu className="w-4 h-4 text-[#C5A880]" />
            <span>Stage 02 — Feature Engineering</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            450+ Real-Time Behavioral Features
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Sentinel computes dynamic temporal aggregation, velocity surges, structuring indicators, and graph topology features simultaneously.
          </p>
        </div>

        {/* Feature Vectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((ft, idx) => (
            <motion.div
              key={ft.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.08 }}
              className={`p-5 rounded-3xl bg-[#141414] border ${
                ft.alert ? 'border-[#C29953]/30 bg-[#C29953]/5' : 'border-[#222222]'
              } space-y-2 hover:scale-[1.02] transition-all`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">{ft.label}</span>
                {ft.alert && (
                  <div className="px-2 py-0.5 rounded-full bg-[#C29953]/10 text-[#C29953] text-[10px] font-mono font-bold flex items-center space-x-1">
                    <ShieldAlert className="w-3 h-3 text-[#C29953]" />
                    <span>ANOMALY</span>
                  </div>
                )}
              </div>
              <div className="text-2xl font-mono font-bold text-white">{ft.val}</div>
              <div className="text-[11px] text-gray-400">{ft.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
