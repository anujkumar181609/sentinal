'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '@/store/useWorldStore';

const PIPELINE_STAGES = [
  { id: 'stage1', name: '01. Ingestion', x: -7.5, color: '#8A8A8A' }, // Muted silver
  { id: 'stage2', name: '02. Feature Eng', x: -2.5, color: '#B49C7D' }, // Muted sand
  { id: 'stage3', name: '03. Risk Scoring', x: 2.5, color: '#C29953' }, // Muted amber
  { id: 'stage4', name: '04. Graph Intel', x: 7.5, color: '#BD4C4C' }, // Rust red
];

export function PipelineObject() {
  const groupRef = useRef<THREE.Group>(null);
  const activeSceneId = useWorldStore((state) => state.activeSceneId);

  // Show pipeline in architecture & stage 1-4 scenes
  const isVisible = ['architecture', 'stage1', 'stage2', 'stage3', 'stage4'].includes(activeSceneId);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = isVisible ? 0 : -20;
      const targetScale = isVisible ? 1 : 0.001;

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      
      const currentS = groupRef.current.scale.x;
      const nextS = THREE.MathUtils.lerp(currentS, targetScale, 0.08);
      groupRef.current.scale.set(nextS, nextS, nextS);
    }
  });

  return (
    <group ref={groupRef} position={[0, -20, 0]}>
      {PIPELINE_STAGES.map((stage) => {
        const isCurrentActive = activeSceneId === stage.id;
        return (
          <group key={stage.id} position={[stage.x, 0, 0]}>
            {/* Glass Cylinder Pillar */}
            <mesh>
              <cylinderGeometry args={[1.5, 1.5, 4, 32]} />
              <meshPhysicalMaterial
                color={stage.color}
                transparent
                opacity={isCurrentActive ? 0.35 : 0.08}
                roughness={0.7}
                transmission={0.9}
                thickness={1.5}
                wireframe={!isCurrentActive}
              />
            </mesh>

            {/* Stage Laser Gate Ring */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[1.52, 0.03, 16, 64]} />
              <meshBasicMaterial
                color={stage.color}
                transparent
                opacity={isCurrentActive ? 0.6 : 0.15}
              />
            </mesh>

            {/* Inner Core Pulse Beam */}
            {isCurrentActive && (
              <mesh>
                <cylinderGeometry args={[0.2, 0.2, 4.1, 16]} />
                <meshBasicMaterial color={stage.color} transparent opacity={0.4} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Connecting Flow Beam edge lines across stages */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geo) => {
            const points = [
              new THREE.Vector3(-7.5, 0, 0),
              new THREE.Vector3(-2.5, 0, 0),
              new THREE.Vector3(2.5, 0, 0),
              new THREE.Vector3(7.5, 0, 0),
            ];
            geo.setFromPoints(points);
          }}
        />
        <lineBasicMaterial attach="material" color="#8C8070" transparent opacity={0.3} linewidth={1} />
      </line>
    </group>
  );
}
