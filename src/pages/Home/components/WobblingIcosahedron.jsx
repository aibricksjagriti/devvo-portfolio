import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { PRIMARY_CYAN } from '../colors';

export default function WobblingIcosahedron() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2, 2]} />
      <meshStandardMaterial 
        color={PRIMARY_CYAN} 
        roughness={0.2}
        metalness={0.9}
        envMapIntensity={1.5}
        emissive={PRIMARY_CYAN}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}
