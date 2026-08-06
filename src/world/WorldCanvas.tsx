'use client';

import { Canvas } from '@react-three/fiber';
import { CameraController } from '@/engine/CameraController';
import { AmbientBackground } from './persistent/AmbientBackground';
import { TransactionObject } from './persistent/TransactionObject';
import { PipelineObject } from './persistent/PipelineObject';
import { GraphNetworkObject } from './persistent/GraphNetworkObject';
import { RiskMeterObject } from './persistent/RiskMeterObject';

export function WorldCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0A0A0A] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 18], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <CameraController />
        <AmbientBackground />
        <TransactionObject />
        <PipelineObject />
        <GraphNetworkObject />
        <RiskMeterObject />
      </Canvas>
    </div>
  );
}
