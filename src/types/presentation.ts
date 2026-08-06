export type SceneId =
  | 'intro'
  | 'problem'
  | 'journey'
  | 'architecture'
  | 'stage1'
  | 'stage2'
  | 'stage3'
  | 'stage4'
  | 'shap'
  | 'fatf'
  | 'sar'
  | 'override'
  | 'finale';

export interface SceneMeta {
  id: SceneId;
  index: number;
  title: string;
  subtitle: string;
  question: string;
  category: 'Overview' | 'Problem' | 'Pipeline' | 'Intelligence' | 'Compliance' | 'Action' | 'Ecosystem';
}

export interface CameraTransform {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  duration?: number;
  ease?: string;
}

export interface TransactionState {
  position: [number, number, number];
  scale: number;
  glowIntensity: number;
  color: string; // hex or rgb
  velocity: number;
  anomalyScore: number;
  activeFeatures: string[];
  status: 'idle' | 'ingesting' | 'profiling' | 'scoring' | 'flagged' | 'reported' | 'cleared';
}

export interface PipelineStageState {
  id: string;
  name: string;
  subtitle: string;
  active: boolean;
  opacity: number;
  highlightColor: string;
  progress: number;
}

export interface PipelineState {
  visible: boolean;
  position: [number, number, number];
  scale: number;
  activeStageIndex: number;
  stages: PipelineStageState[];
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'transaction' | 'mule' | 'sanction' | 'bank' | 'shell_co';
  riskScore: number;
  position: [number, number, number];
  highlighted?: boolean;
}

export interface GraphEdge {
  source: string;
  target: string;
  amount: string;
  risk: 'low' | 'medium' | 'high' | 'critical';
}

export interface GraphState {
  visible: boolean;
  opacity: number;
  clustered: boolean;
  activeRingId?: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface RiskMeterState {
  visible: boolean;
  value: number; // 0.0 to 1.0
  targetValue: number;
  status: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  animating: boolean;
}

export interface UIState {
  presenterMode: boolean;
  showHelpModal: boolean;
  soundMuted: boolean;
  isFullscreen: boolean;
  autoPlay: boolean;
}
