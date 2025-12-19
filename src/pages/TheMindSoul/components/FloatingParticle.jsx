import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

export default function FloatingParticle({ position, color, speed }) {
  const meshRef = useRef();
  const initialPos = useMemo(() => position, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.x = initialPos[0] + Math.sin(t) * 2;
    meshRef.current.position.y = initialPos[1] + Math.cos(t * 0.7) * 1.5;
    meshRef.current.position.z = initialPos[2] + Math.cos(t * 0.5) * 2;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <Sphere ref={meshRef} args={[0.05, 16, 16]} position={position}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
}
