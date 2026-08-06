'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '@/store/useWorldStore';

export function RiskMeterObject() {
  const groupRef = useRef<THREE.Group>(null);
  const needleRef = useRef<THREE.Mesh>(null);
  const activeSceneId = useWorldStore((state) => state.activeSceneId);

  const isVisible = ['stage3', 'shap', 'override'].includes(activeSceneId);

  // Target risk value based on scene
  const targetValue = ['stage3', 'shap', 'override'].includes(activeSceneId) ? 0.94 : 0.12;

  const currentVal = useRef(0.12);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = isVisible ? (activeSceneId === 'stage3' ? 0.8 : 2.5) : -25;
      const targetScale = isVisible ? 1.0 : 0.001;

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

      const currS = groupRef.current.scale.x;
      const nextS = THREE.MathUtils.lerp(currS, targetScale, 0.08);
      groupRef.current.scale.set(nextS, nextS, nextS);
    }

    if (isVisible && needleRef.current) {
      currentVal.current = THREE.MathUtils.lerp(currentVal.current, targetValue, 0.05);

      // Map 0.0..1.0 to -Math.PI/2 .. Math.PI/2 angle
      const angle = (currentVal.current - 0.5) * Math.PI;
      needleRef.current.rotation.z = -angle;
    }
  });

  return (
    <group ref={groupRef} position={[2.5, -25, 0]}>
      {/* Semi-circular Ring Gauge Geometry */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.8, 2.1, 64, 1, 0, Math.PI]} />
        <meshStandardMaterial
          color={targetValue > 0.7 ? '#BD4C4C' : targetValue > 0.4 ? '#C29953' : '#7A9282'}
          roughness={0.6}
          metalness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Center Pivot Hub */}
      <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
        <meshStandardMaterial color="#C5A880" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Needle Pivot Indicator */}
      <mesh ref={needleRef} position={[0, 0, 0.15]}>
        <boxGeometry args={[0.04, 1.6, 0.04]} />
        <meshStandardMaterial color="#BD4C4C" roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}
