import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function useDegreeAnimation(scroll, degreeRef) {
  const { camera } = useThree();
  const lastEmissive = useRef(-1);
  
  useFrame((state, delta) => {
    const s = scroll.offset;
    
    if (degreeRef.current) {
      // Make degree card visible from the start
      degreeRef.current.visible = true;
      
      // Keep degree card big from start to end
      const scale = 2.0; // Constant large scale
      degreeRef.current.scale.setScalar(scale);
      degreeRef.current.position.y = 2.5; // Fixed position above head
      
      // Make card face the camera (billboard effect)
      degreeRef.current.lookAt(camera.position);
      
      // Glow effect - only update when changed significantly (reduce material updates)
      const smoothP = Math.min(s, 1);
      const targetEmissive = smoothP * 1.5;
      if (degreeRef.current.children[0]?.material && Math.abs(targetEmissive - lastEmissive.current) > 0.05) {
        degreeRef.current.children[0].material.emissiveIntensity = targetEmissive;
        lastEmissive.current = targetEmissive;
      }
    }
  });
}

export function useCameraFollow(studentRef) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3());
  
  useFrame(() => {
    if (studentRef.current) {
      const studentPos = studentRef.current.position;
      
      // Camera follows student from left to right
      // Position camera behind and above the student
      const targetX = studentPos.x;
      const targetY = studentPos.y + 3; // Keep camera elevated
      const targetZ = studentPos.z + 8; // Keep camera behind the student
      
      // Smoothly lerp camera position - increased from 0.05 to 0.1 for smoother motion
      camera.position.x += (targetX - camera.position.x) * 0.1;
      camera.position.y += (targetY - camera.position.y) * 0.1;
      camera.position.z += (targetZ - camera.position.z) * 0.1;
      
      // Smoothly lerp lookAt target to avoid jitter
      targetLookAt.current.x += (studentPos.x - targetLookAt.current.x) * 0.1;
      targetLookAt.current.y += (studentPos.y + 1 - targetLookAt.current.y) * 0.1;
      targetLookAt.current.z += (studentPos.z - targetLookAt.current.z) * 0.1;
      
      camera.lookAt(targetLookAt.current);
    }
  });
}
