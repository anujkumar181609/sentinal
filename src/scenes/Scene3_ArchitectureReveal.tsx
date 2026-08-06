'use client';

import { useWorldStore } from '@/store/useWorldStore';
import { Layers, Database, Cpu, Activity, Share2 } from 'lucide-react';

export function Scene3_ArchitectureReveal() {
  const { jumpToScene } = useWorldStore();

  const stages = [
    {
      index: 4,
      num: '01',
      title: 'Stream Ingestion',
      icon: Database,
      desc: '100k+ TPS ISO 20022 parsing & sub-ms schema validation',
      color: 'bg-[#141414] border-[#222222] text-[#8A8A8A]',
    },
    {
      index: 5,
      num: '02',
      title: 'Feature Engineering',
      icon: Cpu,
      desc: '450+ real-time temporal, structuring & velocity vectors',
      color: 'bg-[#141414] border-[#222222] text-[#B49C7D]',
    },
    {
      index: 6,
      num: '03',
      title: 'Risk Scoring',
      icon: Activity,
      desc: 'GNN + XGBoost ensemble inference for risk quantification',
      color: 'bg-[#141414] border-[#222222] text-[#C29953]',
    },
    {
      index: 7,
      num: '04',
      title: 'Graph Intelligence',
      icon: Share2,
      desc: 'Multi-hop sub-network ring detection for money mule hubs',
      color: 'bg-[#141414] border-[#222222] text-[#BD4C4C]',
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 pointer-events-auto">
      <div className="max-w-5xl w-full space-y-8 text-center">
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#C5A880]/5 border border-[#C5A880]/15 text-[#C5A880] text-xs font-mono uppercase tracking-widest">
            <Layers className="w-4 h-4 text-[#C5A880]" />
            <span>Architecture Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-medium font-serif text-white tracking-tight">
            The 4-Stage Intelligence Engine
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
            Sentinel replaces batch legacy rules with a continuous four-tier streaming architecture.
          </p>
        </div>

        {/* 4 Pipeline Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
          {stages.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.num}
                onClick={() => jumpToScene(st.index)}
                className={`p-6 rounded-3xl ${st.color} border hover:scale-105 transition-all cursor-pointer space-y-4 shadow-xl group`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-extrabold opacity-60">
                    {st.num}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-white/80" />
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-white text-base group-hover:text-[#C5A880] transition-colors">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-300 font-light mt-1 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
