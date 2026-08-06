'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, UserCheck, CheckCircle2, Lock, Loader2, KeyRound, FileCheck2, ArrowRight } from 'lucide-react';
import { audio } from '@/lib/audio';
import { useWorldStore } from '@/store/useWorldStore';

type Stage = 'idle' | 'verifying' | 'signing' | 'complete';

const STAGE_STEPS: { stage: Stage; label: string; icon: React.ReactNode }[] = [
  { stage: 'verifying', label: 'Verifying dual-control credentials...', icon: <KeyRound className="w-5 h-5" /> },
  { stage: 'signing',   label: 'Applying cryptographic signature (RSA-4096)...', icon: <Lock className="w-5 h-5" /> },
  { stage: 'complete',  label: 'SAR Filing Authorized & Dispatched', icon: <FileCheck2 className="w-5 h-5" /> },
];

export function Scene11_SafetyOverride() {
  const [stage, setStage] = useState<Stage>('idle');
  const jumpToScene = useWorldStore(s => s.jumpToScene);

  const handleApprove = () => {
    if (stage !== 'idle') return;
    audio.playAlert();
    setStage('verifying');
    setTimeout(() => setStage('signing'), 1400);
    setTimeout(() => {
      audio.playSuccess?.();
      setStage('complete');
      // Auto-advance to Scene 12 (Finale) after showing the success state
      setTimeout(() => jumpToScene(12), 2200);
    }, 2900);
  };

  const isProcessing = stage === 'verifying' || stage === 'signing';
  const isComplete = stage === 'complete';
  const currentStep = STAGE_STEPS.find(s => s.stage === stage);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#7A9282]/5 border border-[#7A9282]/15 text-[#7A9282] text-xs font-mono uppercase tracking-widest">
            <UserCheck className="w-4 h-4 text-[#7A9282]" />
            <span>Human-in-the-Loop Governance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            Compliance Officer Final Sign-off
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            AI proposes intelligence; human officers maintain absolute final authority. Dual-control cryptographic signatures ensure compliance accountability.
          </p>
        </div>

        {/* Audit Sign-off Workspace Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`p-8 rounded-3xl bg-[#141414] border shadow-2xl space-y-6 text-center transition-all duration-700 ${isComplete ? 'border-[#7A9282]/50' : 'border-[#7A9282]/30'}`}
        >
          <div className="flex items-center justify-between border-b border-[#222222] pb-4 text-left">
            <div>
              <div className="text-xs text-gray-400">Compliance Audit Session</div>
              <div className="font-mono font-bold text-white text-base">Officer: Sarah Jenkins (BSA Officer #4492)</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#7A9282]/10 text-[#7A9282] text-xs font-mono font-bold flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#7A9282]" />
              <span>Dual-Control Enforced</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 space-y-5">
            <div className="text-sm text-gray-300">
              Review action for <span className="font-mono text-white font-bold">Tx-8809</span> ($1,200,000.00 USD)
            </div>

            {/* Step progress dots */}
            <div className="flex items-center justify-center space-x-3">
              {STAGE_STEPS.map((s, i) => {
                const idx = STAGE_STEPS.findIndex(x => x.stage === stage);
                const done = idx > i || isComplete;
                const active = idx === i && stage !== 'idle';
                return (
                  <div key={s.stage} className="flex items-center space-x-3">
                    <motion.div
                      animate={active ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center border text-xs font-mono transition-all duration-500
                        ${done ? 'bg-[#7A9282] border-[#7A9282] text-black' :
                          active ? 'border-[#7A9282]/80 bg-[#7A9282]/10 text-[#7A9282]' :
                          'border-white/10 bg-white/5 text-gray-500'}`}
                    >
                      {done ? <CheckCircle2 className="w-4 h-4" /> : <span>{i + 1}</span>}
                    </motion.div>
                    {i < STAGE_STEPS.length - 1 && (
                      <div className={`h-px w-8 transition-all duration-700 ${done ? 'bg-[#7A9282]' : 'bg-white/10'}`} />
                    )}
                  </div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              {stage === 'idle' && (
                <motion.button
                  key="button"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  onClick={handleApprove}
                  className="w-full py-4 rounded-2xl bg-[#7A9282] hover:bg-[#6c8273] text-black font-semibold text-base shadow-xl shadow-black/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <ShieldCheck className="w-5 h-5 text-black" />
                  <span>Sign &amp; Authorize FinCEN SAR Filing</span>
                </motion.button>
              )}

              {isProcessing && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="py-5 flex flex-col items-center space-y-3"
                >
                  <Loader2 className="w-8 h-8 text-[#7A9282] animate-spin" />
                  <motion.div
                    key={stage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-mono text-[#7A9282]"
                  >
                    {currentStep?.label}
                  </motion.div>
                  <motion.div
                    className="text-[10px] font-mono text-gray-600 tracking-widest"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  >
                    {stage === 'signing'
                      ? '0xA8F3...C291 ▪ 0x7B2E...F4A1 ▪ RSA-4096'
                      : 'LDAP://auth.sentinel.internal ▪ MFA-TOTP ✓'}
                  </motion.div>
                </motion.div>
              )}

              {isComplete && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  className="p-6 rounded-2xl bg-[#7A9282]/10 border border-[#7A9282]/20 text-[#7A9282] space-y-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 0.1 }}
                  >
                    <CheckCircle2 className="w-10 h-10 mx-auto text-[#7A9282]" />
                  </motion.div>
                  <div className="font-bold text-lg text-white">SAR Filing Authorized &amp; Dispatched</div>
                  <div className="text-xs font-mono text-[#7A9282]">
                    Signature Hash: 0x8f99a4c...e291 | {new Date().toLocaleTimeString()}
                  </div>
                  {/* Redirect countdown hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-500 font-mono pt-1"
                  >
                    <ArrowRight className="w-3 h-3 animate-pulse" />
                    <span>Redirecting to finale...</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
