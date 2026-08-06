'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertCircle, FileCheck } from 'lucide-react';

export function Scene9_Compliance() {
  const policies = [
    { title: 'FATF Recommendation 16', status: 'PASS', detail: 'Travel Rule complete originator/beneficiary payload verified' },
    { title: 'OFAC Sanctions Matrix', status: 'MATCH', detail: '1-Hop proximity to SDN list node #99481 detected' },
    { title: 'EU AMLD6 Directive', status: 'TRIGGERED', detail: 'Mandatory SAR filing required within 24-hour SLA' },
    { title: 'FinCEN Structuring Rule', status: 'TRIGGERED', detail: '31 CFR 1010.311 multi-branch smurfing pattern matched' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <FileCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Policy Engine Verification</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            FATF 40 & Travel Rule Compliance Matrix
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Automated verification against international regulatory frameworks guarantees institutional compliance across global jurisdictions.
          </p>
        </div>

        {/* Policy Verification Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-[#141414] border border-[#222222] space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{p.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${
                    p.status === 'PASS'
                      ? 'bg-[#7A9282]/10 text-[#7A9282] border border-[#7A9282]/20'
                      : 'bg-[#BD4C4C]/10 text-[#BD4C4C] border border-[#BD4C4C]/20'
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <p className="text-xs text-gray-300 font-light leading-relaxed">{p.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
