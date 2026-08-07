'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, AlertTriangle, RefreshCw, Cpu, BrainCircuit, BarChart3 } from 'lucide-react';
import { audio } from '@/lib/audio';
import { useWorldStore } from '@/store/useWorldStore';

// How long to wait after the score finishes calculating before auto-advancing
const AUTO_ADVANCE_DELAY_MS = 3000;

const FINAL_SCORE = 0.94;
const MODEL_RESULTS = [
  { label: 'XGBoost Tabular Model', score: 0.91, color: '#C29953', icon: <BarChart3 className="w-4 h-4" /> },
  { label: 'GNN Topological Model', score: 0.97, color: '#BD4C4C', icon: <BrainCircuit className="w-4 h-4" /> },
  { label: 'Ensemble Weighting', score: 0.992, label2: '99.2% Confidence', color: '#7A9282', icon: <Cpu className="w-4 h-4" /> },
];

function useRollingNumber(target: number, active: boolean, duration: number = 900) {
  const [value, setValue] = useState(0);
  const frame = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

  useEffect(() => {
    if (!active) { setValue(0); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) frame.current = requestAnimationFrame(animate);
      else setValue(target);
    };
    frame.current = requestAnimationFrame(animate);
    return () => { if (frame.current) cancelAnimationFrame(frame.current); };
  }, [active, target, duration]);

  return value;
}

export function Scene6_Stage3Scoring() {
  const [phase, setPhase] = useState<'idle' | 'calculating' | 'done'>('done');
  const [runCount, setRunCount] = useState(0);
  const nextScene = useWorldStore((state) => state.nextScene);
  const hasAutoRunRef = useRef(false);
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCalc = phase === 'calculating';
  const isDone = phase === 'done';

  const mainScore = useRollingNumber(FINAL_SCORE, isDone, 1100);
  const xgbScore = useRollingNumber(MODEL_RESULTS[0].score, isDone, 900);
  const gnnScore = useRollingNumber(MODEL_RESULTS[1].score, isDone, 1000);
  const ensScore = useRollingNumber(MODEL_RESULTS[2].score, isDone, 950);

  const scores = [xgbScore, gnnScore, ensScore];

  const recalculate = () => {
    if (phase === 'calculating') return;
    if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    audio.playAlert();
    setPhase('calculating');
    setTimeout(() => {
      setPhase('done');
      setRunCount(c => c + 1);
      audio.playSuccess?.();
    }, 2200);
  };

  // Run the risk calculation automatically as soon as this scene (page 6) is entered.
  useEffect(() => {
    if (hasAutoRunRef.current) return;
    hasAutoRunRef.current = true;
    recalculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Once the calculation finishes ('done'), auto-advance to the next scene after a short delay.
  useEffect(() => {
    if (phase !== 'done') return;
    advanceTimeoutRef.current = setTimeout(() => {
      nextScene();
    }, AUTO_ADVANCE_DELAY_MS);
    return () => {
      if (advanceTimeoutRef.current) clearTimeout(advanceTimeoutRef.current);
    };
  }, [phase, runCount, nextScene]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Activity className="w-4 h-4 text-[#C5A880]" />
            <span>Stage 03 — Ensemble Risk Scoring</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            Unified GNN + XGBoost Risk Inference
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Ensemble model maps the 450 extracted features into a single normalized risk score from 0.00 (Safe) to 1.00 (Critical Risk).
          </p>
        </div>

        {/* Dynamic Risk Gauge HUD Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-[#141414] border border-[#BD4C4C]/30 shadow-2xl space-y-6 text-center"
        >
          <div className="flex items-center justify-between border-b border-[#222222] pb-4">
            <div className="text-left">
              <div className="text-xs text-gray-400">Target Entity</div>
              <div className="font-mono font-bold text-white text-base">Tx-8809 (Cayman → Clearing)</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#BD4C4C]/10 border border-[#BD4C4C]/25 text-[#BD4C4C] text-xs font-mono font-bold flex items-center space-x-1.5 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-[#BD4C4C]" />
              <span>CRITICAL RISK THRESHOLD EXCEEDED</span>
            </div>
          </div>

          {/* Central Score Display */}
          <div className="space-y-3 py-4">
            <AnimatePresence mode="wait">
              {isCalc ? (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Pulsing "thinking" bars */}
                  <div className="flex items-end justify-center space-x-1.5 h-16">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 rounded-sm bg-[#BD4C4C]/60"
                        animate={{ height: ['16px', `${20 + Math.random() * 44}px`, '16px'] }}
                        transition={{
                          duration: 0.5 + Math.random() * 0.4,
                          repeat: Infinity,
                          delay: i * 0.07,
                          ease: 'easeInOut',
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-sm font-mono text-[#BD4C4C]/80 animate-pulse tracking-widest uppercase">
                    Running Ensemble Inference...
                  </div>
                  <div className="text-xs font-mono text-gray-600 tracking-widest">
                    XGBoost → 450 features ▸ GNN → 3-hop topology ▸ Calibration...
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={`result-${runCount}`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                >
                  <div className="text-7xl md:text-8xl font-mono font-extrabold text-[#BD4C4C] tracking-tight tabular-nums">
                    {mainScore.toFixed(2)}
                  </div>
                  <div className="text-sm font-semibold text-gray-300 uppercase tracking-widest mt-2">
                    Risk Severity: <span className="text-[#BD4C4C] font-bold">CRITICAL (0.94 / 1.00)</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Model Confidence Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left pt-2">
            {MODEL_RESULTS.map((m, i) => (
              <div key={m.label} className="p-3 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
                <div className="flex items-center space-x-1.5 text-[11px] text-gray-400">
                  <span style={{ color: m.color }}>{m.icon}</span>
                  <span>{m.label}</span>
                </div>
                <AnimatePresence mode="wait">
                  {isCalc ? (
                    <motion.div
                      key="calc"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                      className="text-sm font-mono font-bold text-gray-600"
                    >
                      ––––
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`val-${runCount}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.12 }}
                      className="text-sm font-mono font-bold tabular-nums"
                      style={{ color: m.color }}
                    >
                      {i === 2
                        ? `${(scores[i] * 100).toFixed(1)}% Confidence`
                        : `${scores[i].toFixed(2)} Score`}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button
            onClick={recalculate}
            disabled={isCalc}
            className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium text-xs flex items-center space-x-2 mx-auto transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isCalc ? 'animate-spin' : ''}`} />
            <span>{isCalc ? 'Running Model Inference...' : 'Simulate Recalculation'}</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
