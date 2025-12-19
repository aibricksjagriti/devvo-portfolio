import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PRIMARY_MAGENTA } from '../colors';

export default function OrbitingShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.3;
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshStandardMaterial 
              color={PRIMARY_MAGENTA} 
              roughness={0.2} 
              metalness={0.8}
              emissive={PRIMARY_MAGENTA}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}
