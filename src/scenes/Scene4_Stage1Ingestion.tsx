'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Database, CheckCircle2, Activity, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const LOG_LINES = [
  { text: '[00:00:00.04] CONNECT kafka://financial-rail-prod:9093 — Session OK', color: 'text-gray-400' },
  { text: '[00:00:00.09] RECEIVE pacs.008 | MsgId: SW-8809-994X | Channel: SWIFT_GPI', color: 'text-gray-400' },
  { text: '[00:00:00.12] INGEST Amt: $1,200,000 USD | Currency: USD | Rail: Correspondent', color: 'text-[#C5A880]/80' },
  { text: '[00:00:00.14] SANITIZE Debtor: ShellCorp_Alpha (KY) -> Creditor: Relay_B (SG)', color: 'text-[#C5A880]/80' },
  { text: '[00:00:00.17] VALIDATE ISO-20022 Schema: PASS | Field coverage: 100%', color: 'text-[#C5A880]/80' },
  { text: '[00:00:00.18] ENRICH GeoLocation: George Town, Cayman Islands (Risk tier: HIGH)', color: 'text-[#C29953]' },
  { text: '[00:00:00.20] ENRICH OFAC Screening: ShellCorp_Alpha -> WATCHLIST HIT (2 references)', color: 'text-[#BD4C4C]' },
  { text: '[00:00:00.22] FORWARD -> Stage 2 Feature Engine [LATENCY: 0.38ms ✓]', color: 'text-[#7A9282]' },
];

const COUNTER_INTERVAL = 80;

export function Scene4_Stage1Ingestion() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [counter, setCounter] = useState(0);

  // Stagger in log lines one by one
  useEffect(() => {
    if (visibleLines >= LOG_LINES.length) return;
    const t = setTimeout(() => setVisibleLines(v => v + 1), 420);
    return () => clearTimeout(t);
  }, [visibleLines]);

  // Animate TPS counter
  useEffect(() => {
    const t = setInterval(() => {
      setCounter(c => {
        const target = 124500;
        const step = Math.ceil((target - c) / 12);
        return c + step >= target ? target : c + step;
      });
    }, COUNTER_INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Database className="w-4 h-4 text-[#C5A880]" />
            <span>Stage 01 — Data Ingestion</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            High-Throughput Streaming Validation
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Normalizes heterogeneous financial messages (ISO 20022, SWIFT MT103, FedWire, crypto rails) into a clean, unified telemetry stream in under 0.4 milliseconds.
          </p>
        </div>

        {/* Live Ingestion Metrics Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-[#141414] border border-[#222222] shadow-2xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-xs text-gray-400">Ingestion Velocity</div>
              <div className="text-3xl font-mono font-bold text-[#C5A880] flex items-center space-x-2">
                <Activity className="w-6 h-6 animate-pulse text-[#C5A880]" />
                <motion.span
                  key={counter}
                  animate={{ opacity: [0.6, 1] }}
                  transition={{ duration: 0.15 }}
                >
                  {counter.toLocaleString()} TPS
                </motion.span>
              </div>
              <div className="text-[10px] text-[#7A9282]">Sub-ms Latency SLA</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-xs text-gray-400">Supported Protocols</div>
              <div className="text-xl font-bold text-white">ISO 20022 / SWIFT</div>
              <div className="text-[10px] text-gray-400">pacs.008 &amp; camt.053 validated</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 space-y-1">
              <div className="text-xs text-gray-400">Sanitization Status</div>
              <div className="text-xl font-bold text-[#7A9282] flex items-center space-x-1.5">
                <CheckCircle2 className="w-5 h-5 text-[#7A9282]" />
                <span>Zero Drops</span>
              </div>
              <div className="text-[10px] text-gray-400">100% Schema Conformance</div>
            </div>
          </div>

          {/* Animated Code Stream Log */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs space-y-1.5 overflow-hidden">
            <div className="flex items-center justify-between text-gray-500 text-[10px] pb-1 border-b border-white/5">
              <span>STREAM PARSER BUFFER LOG</span>
              <span className="flex items-center space-x-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7A9282] animate-pulse" />
                <span className="text-[#7A9282]">STATUS: INGESTING</span>
              </span>
            </div>
            <AnimatePresence>
              {LOG_LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${line.color} flex items-start space-x-2`}
                >
                  {i === visibleLines - 1 && (
                    <ArrowRight className="w-3 h-3 mt-0.5 shrink-0 text-[#C5A880] animate-pulse" />
                  )}
                  <span className={i < visibleLines - 1 ? 'pl-5' : ''}>{line.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Blinking cursor */}
            {visibleLines < LOG_LINES.length && (
              <motion.span
                className="inline-block w-2 h-3.5 bg-[#C5A880] ml-5"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
