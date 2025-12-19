import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PRIMARY_LIGHT_BLUE, PRIMARY_PINK, PRIMARY_LIGHT_YELLOW } from '../colors';

export default function BreathingSphere({ innerGlowRef }) {
  const sphereRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Breathing animation with more variation
    if (sphereRef.current) {
      const breath = 1 + Math.sin(t * 0.6) * 0.15 + Math.sin(t * 1.2) * 0.05;
      sphereRef.current.scale.setScalar(breath);
      
      // Gentle rotation
      sphereRef.current.rotation.y += 0.01;
      sphereRef.current.rotation.x += 0.005;
    }

    // Inner glow pulse
    if (innerGlowRef.current) {
      const pulse = 0.3 + Math.sin(t * 0.8) * 0.2;
      innerGlowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Inner glow */}
        <Sphere ref={innerGlowRef} args={[0.8, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color={PRIMARY_PINK}
            emissive={PRIMARY_PINK}
            emissiveIntensity={2}
            transparent
            opacity={0.4}
          />
        </Sphere>

        {/* Main distorted sphere */}
        <Sphere ref={sphereRef} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color={PRIMARY_LIGHT_BLUE}
            distort={0.5}
            speed={2.5}
            roughness={0.1}
            metalness={0.3}
            transparent
            opacity={0.95}
          />
        </Sphere>

        {/* Outer glow ring */}
        <Sphere args={[1.7, 32, 32]}>
          <meshStandardMaterial
            color={PRIMARY_LIGHT_YELLOW}
            emissive={PRIMARY_LIGHT_YELLOW}
            emissiveIntensity={0.5}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </Sphere>
      </group>
    </Float>
  );
}
