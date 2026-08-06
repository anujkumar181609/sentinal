'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { useWorldStore } from '@/store/useWorldStore';
import { CAMERA_KEYFRAMES } from '@/lib/constants';

export function CameraController() {
  const { camera } = useThree();
  const activeSceneId = useWorldStore((state) => state.activeSceneId);
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    const keyframe = CAMERA_KEYFRAMES[activeSceneId];
    if (!keyframe) return;

    const [px, py, pz] = keyframe.position;
    const [tx, ty, tz] = keyframe.target;
    targetLookAt.current.set(tx, ty, tz);

    const perspectiveCam = camera as THREE.PerspectiveCamera;

    gsap.to(perspectiveCam.position, {
      x: px,
      y: py,
      z: pz,
      duration: keyframe.duration || 2.0,
      ease: keyframe.ease || 'power3.inOut',
    });

    gsap.to(perspectiveCam, {
      fov: keyframe.fov,
      duration: keyframe.duration || 2.0,
      ease: keyframe.ease || 'power3.inOut',
      onUpdate: () => perspectiveCam.updateProjectionMatrix(),
    });

    gsap.to(currentLookAt.current, {
      x: tx,
      y: ty,
      z: tz,
      duration: keyframe.duration || 2.0,
      ease: keyframe.ease || 'power3.inOut',
    });
  }, [activeSceneId, camera]);

  useFrame(() => {
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
