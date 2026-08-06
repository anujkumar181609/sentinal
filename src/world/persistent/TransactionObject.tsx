'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '@/store/useWorldStore';

export function TransactionObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const activeSceneId = useWorldStore((state) => state.activeSceneId);
  const transaction = useWorldStore((state) => state.transaction);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 1.2;
      ringRef.current.rotation.y += delta * 0.6;
    }

    // Determine target 3D coordinates based on active scene
    let targetX = 0;
    let targetY = 0;
    let targetZ = 0;
    let targetColor = '#8C8070';
    let targetScale = 1.0;

    switch (activeSceneId) {
      case 'intro':
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetColor = '#8C8070'; // Champagne gold
        targetScale = 1.2;
        break;
      case 'problem':
        targetX = 0;
        targetY = 1.5;
        targetZ = 2;
        targetColor = '#BD4C4C'; // Rust red
        targetScale = 0.9;
        break;
      case 'journey':
        targetX = -4;
        targetY = 0;
        targetZ = 1;
        targetColor = '#8C8070';
        targetScale = 1.6;
        break;
      case 'architecture':
        targetX = -8;
        targetY = 0;
        targetZ = 0;
        targetColor = '#8C8070';
        targetScale = 0.8;
        break;
      case 'stage1':
        targetX = -7.5;
        targetY = 0;
        targetZ = 0;
        targetColor = '#8C8070';
        targetScale = 1.1;
        break;
      case 'stage2':
        targetX = -2.5;
        targetY = 0;
        targetZ = 0;
        targetColor = '#C29953'; // Muted amber/mustard
        targetScale = 1.3;
        break;
      case 'stage3':
        targetX = 2.5;
        targetY = 0;
        targetZ = 0;
        targetColor = '#BD4C4C'; // Rust red
        targetScale = 1.5;
        break;
      case 'stage4':
      case 'shap':
      case 'fatf':
      case 'sar':
      case 'override':
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetColor = '#BD4C4C';
        targetScale = 1.4;
        break;
      case 'finale':
        targetX = 0;
        targetY = 0;
        targetZ = 0;
        targetColor = '#7A9282'; // Sage green
        targetScale = 1.8;
        break;
    }

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.08);

      const currScale = meshRef.current.scale.x;
      const nextScale = THREE.MathUtils.lerp(currScale, targetScale, 0.08);
      meshRef.current.scale.set(nextScale, nextScale, nextScale);
    }
  });

  return (
    <group>
      {/* Central Transaction Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={transaction.color || '#8C8070'}
          roughness={0.65}
          metalness={0.85}
        />
      </mesh>

      {/* Orbital Glowing Anomaly Ring */}
      <mesh ref={ringRef} position={meshRef.current ? meshRef.current.position : [0, 0, 0]}>
        <torusGeometry args={[1.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#8C8070" wireframe transparent opacity={0.3} />
      </mesh>

      {/* Dynamic Point Light tracking node */}
      <pointLight
        position={meshRef.current ? meshRef.current.position : [0, 0, 0]}
        color={transaction.color || '#8C8070'}
        intensity={2.0}
        distance={8}
      />
    </group>
  );
}
