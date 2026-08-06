import { create } from 'zustand';
import { SCENES } from '@/lib/constants';
import {
  SceneId,
  TransactionState,
  PipelineState,
  GraphState,
  RiskMeterState,
  UIState,
} from '@/types/presentation';
import { audio } from '@/lib/audio';

interface WorldStore {
  activeSceneIndex: number;
  activeSceneId: SceneId;
  totalScenes: number;
  isPlaying: boolean;

  // Persistent Objects
  transaction: TransactionState;
  pipeline: PipelineState;
  graph: GraphState;
  riskMeter: RiskMeterState;
  ui: UIState;

  // Actions
  nextScene: () => void;
  prevScene: () => void;
  jumpToScene: (index: number) => void;
  replayScene: () => void;
  togglePlayPause: () => void;

  // Partial State Modifiers
  updateTransaction: (partial: Partial<TransactionState>) => void;
  updatePipeline: (partial: Partial<PipelineState>) => void;
  updateGraph: (partial: Partial<GraphState>) => void;
  updateRiskMeter: (partial: Partial<RiskMeterState>) => void;
  toggleSound: () => void;
  toggleHelpModal: () => void;
  togglePresenterMode: () => void;
}

export const useWorldStore = create<WorldStore>((set, get) => ({
  activeSceneIndex: 0,
  activeSceneId: SCENES[0].id,
  totalScenes: SCENES.length,
  isPlaying: false,

  transaction: {
    position: [0, 0, 0],
    scale: 1,
    glowIntensity: 0.5,
    color: '#8C8070', // Primary Champagne Gold
    velocity: 1.0,
    anomalyScore: 0.12,
    activeFeatures: [],
    status: 'idle',
  },

  pipeline: {
    visible: false,
    position: [0, 0, 0],
    scale: 1,
    activeStageIndex: -1,
    stages: [
      { id: 's1', name: 'Stage 1', subtitle: 'Data Ingestion', active: false, opacity: 0.7, highlightColor: '#8A8A8A', progress: 0 },
      { id: 's2', name: 'Stage 2', subtitle: 'Feature Engineering', active: false, opacity: 0.7, highlightColor: '#B49C7D', progress: 0 },
      { id: 's3', name: 'Stage 3', subtitle: 'Ensemble Risk Scoring', active: false, opacity: 0.7, highlightColor: '#C29953', progress: 0 },
      { id: 's4', name: 'Stage 4', subtitle: 'Graph Intelligence', active: false, opacity: 0.7, highlightColor: '#BD4C4C', progress: 0 },
    ],
  },

  graph: {
    visible: false,
    opacity: 0,
    clustered: false,
    nodes: [
      { id: 'Tx-8809', label: 'Tx-8809 (Primary Anomaly)', type: 'transaction', riskScore: 0.94, position: [0, 0, 0], highlighted: true },
      { id: 'Mule-1', label: 'Shell Corp Alpha (Cayman)', type: 'shell_co', riskScore: 0.88, position: [-2.5, 1.8, -1] },
      { id: 'Mule-2', label: 'Intermediary Relay B', type: 'mule', riskScore: 0.82, position: [2.2, 1.5, 0.5] },
      { id: 'Mule-3', label: 'Crypto Off-Ramp Node', type: 'mule', riskScore: 0.91, position: [-1.8, -2.0, 1] },
      { id: 'Sanction-1', label: 'OFAC Sanctioned Entity Hub', type: 'sanction', riskScore: 0.99, position: [3.0, -1.8, -1.5], highlighted: true },
      { id: 'Bank-1', label: 'Tier-1 Clearing Institution', type: 'bank', riskScore: 0.15, position: [0, 3.2, -2] },
    ],
    edges: [
      { source: 'Tx-8809', target: 'Mule-1', amount: '$420,000', risk: 'critical' },
      { source: 'Tx-8809', target: 'Mule-2', amount: '$380,000', risk: 'high' },
      { source: 'Mule-1', target: 'Sanction-1', amount: '$400,000', risk: 'critical' },
      { source: 'Mule-2', target: 'Mule-3', amount: '$350,000', risk: 'high' },
      { source: 'Bank-1', target: 'Tx-8809', amount: '$1,200,000', risk: 'medium' },
    ],
  },

  riskMeter: {
    visible: false,
    value: 0.12,
    targetValue: 0.12,
    status: 'LOW',
    animating: false,
  },

  ui: {
    presenterMode: true,
    showHelpModal: false,
    soundMuted: false,
    isFullscreen: false,
    autoPlay: false,
  },

  nextScene: () => {
    const { activeSceneIndex, totalScenes } = get();
    if (activeSceneIndex < totalScenes - 1) {
      const newIndex = activeSceneIndex + 1;
      audio.playTransition();
      set({
        activeSceneIndex: newIndex,
        activeSceneId: SCENES[newIndex].id,
      });
    }
  },

  prevScene: () => {
    const { activeSceneIndex } = get();
    if (activeSceneIndex > 0) {
      const newIndex = activeSceneIndex - 1;
      audio.playTransition();
      set({
        activeSceneIndex: newIndex,
        activeSceneId: SCENES[newIndex].id,
      });
    }
  },

  jumpToScene: (index: number) => {
    const { totalScenes } = get();
    if (index >= 0 && index < totalScenes) {
      audio.playTransition();
      set({
        activeSceneIndex: index,
        activeSceneId: SCENES[index].id,
      });
    }
  },

  replayScene: () => {
    audio.playClick();
    const current = get().activeSceneIndex;
    set({ activeSceneIndex: current });
  },

  togglePlayPause: () => {
    audio.playClick();
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  updateTransaction: (partial) => set((state) => ({ transaction: { ...state.transaction, ...partial } })),
  updatePipeline: (partial) => set((state) => ({ pipeline: { ...state.pipeline, ...partial } })),
  updateGraph: (partial) => set((state) => ({ graph: { ...state.graph, ...partial } })),
  updateRiskMeter: (partial) => set((state) => ({ riskMeter: { ...state.riskMeter, ...partial } })),

  toggleSound: () => {
    const nextMuted = !get().ui.soundMuted;
    audio.setMuted(nextMuted);
    if (!nextMuted) audio.playClick();
    set((state) => ({ ui: { ...state.ui, soundMuted: nextMuted } }));
  },

  toggleHelpModal: () => {
    audio.playClick();
    set((state) => ({ ui: { ...state.ui, showHelpModal: !state.ui.showHelpModal } }));
  },

  togglePresenterMode: () => {
    audio.playClick();
    set((state) => ({ ui: { ...state.ui, presenterMode: !state.ui.presenterMode } }));
  },
}));
