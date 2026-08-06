'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useWorldStore } from '@/store/useWorldStore';

export function GraphNetworkObject() {
  const groupRef = useRef<THREE.Group>(null);
  const activeSceneId = useWorldStore((state) => state.activeSceneId);
  const graph = useWorldStore((state) => state.graph);

  const isVisible = ['stage4', 'shap', 'fatf', 'sar', 'override', 'finale'].includes(activeSceneId);

  useFrame((state, delta) => {
    if (groupRef.current) {
      const targetY = isVisible ? (activeSceneId === 'stage4' ? 0 : -0.5) : -30;
      const targetScale = isVisible ? 1.0 : 0.001;

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);

      const currentS = groupRef.current.scale.x;
      const nextS = THREE.MathUtils.lerp(currentS, targetScale, 0.08);
      groupRef.current.scale.set(nextS, nextS, nextS);

      // Slow orbital rotation for cinematic effect
      if (isVisible) {
        groupRef.current.rotation.y += delta * 0.15;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -30, 0]}>
      {/* Network Edges (Connections) */}
      {graph.edges.map((edge, idx) => {
        const sourceNode = graph.nodes.find((n) => n.id === edge.source);
        const targetNode = graph.nodes.find((n) => n.id === edge.target);
        if (!sourceNode || !targetNode) return null;

        const isCritical = edge.risk === 'critical';
        const color = isCritical ? '#BD4C4C' : edge.risk === 'high' ? '#C29953' : '#8A8A8A';

        return (
          <group key={`edge-${idx}`}>
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(geo) => {
                  geo.setFromPoints([
                    new THREE.Vector3(...sourceNode.position),
                    new THREE.Vector3(...targetNode.position),
                  ]);
                }}
              />
              <lineBasicMaterial
                attach="material"
                color={color}
                transparent
                opacity={isCritical ? 0.6 : 0.2}
                linewidth={isCritical ? 2 : 1}
              />
            </line>
          </group>
        );
      })}

      {/* Network Nodes */}
      {graph.nodes.map((node) => {
        const isAnomaly = node.id === 'Tx-8809';
        const isSanction = node.type === 'sanction';
        const color = isAnomaly
          ? '#BD4C4C'
          : isSanction
          ? '#BD4C4C'
          : node.type === 'shell_co'
          ? '#C29953'
          : node.type === 'mule'
          ? '#C29953'
          : '#8A8A8A';

        const size = isAnomaly ? 0.5 : isSanction ? 0.45 : 0.35;

        return (
          <group key={node.id} position={node.position}>
            <mesh>
              <sphereGeometry args={[size, 24, 24]} />
              <meshStandardMaterial
                color={color}
                roughness={0.7}
                metalness={0.15}
              />
            </mesh>

            {/* Glowing Ring around highlighted nodes */}
            {(node.highlighted || isAnomaly || isSanction) && (
              <mesh rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[size * 1.5, 0.015, 16, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
