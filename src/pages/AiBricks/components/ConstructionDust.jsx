import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import colors from '../colors';

/**
 * Construction Dust Particles - Minimal and realistic
 */
export function ConstructionDust({ scroll }) {
  const particlesRef = useRef();
  const particles = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 40;
      positions[i3 + 1] = Math.random() * 15;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;
      
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = Math.random() * 0.04 + 0.01;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      sizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    return { positions, velocities, sizes, count };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current?.geometry) return;
    
    const positions = particlesRef.current.geometry.attributes.position;
    const posArray = positions.array;
    const scrollIntensity = scroll.offset * 1.5;
    
    for (let i = 0; i < particles.count; i++) {
      const i3 = i * 3;
      
      // Update position
      posArray[i3] += particles.velocities[i3] * (1 + scrollIntensity * 0.3);
      posArray[i3 + 1] += particles.velocities[i3 + 1] * (1 + scrollIntensity * 0.2);
      posArray[i3 + 2] += particles.velocities[i3 + 2] * (1 + scrollIntensity * 0.3);
      
      // Wrap particles
      if (posArray[i3 + 1] > 15) {
        posArray[i3 + 1] = 0;
        posArray[i3] = (Math.random() - 0.5) * 40;
        posArray[i3 + 2] = (Math.random() - 0.5) * 40;
      }
      
      // Boundary wrap
      if (Math.abs(posArray[i3]) > 20) posArray[i3] *= -0.9;
      if (Math.abs(posArray[i3 + 2]) > 20) posArray[i3 + 2] *= -0.9;
    }
    
    positions.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.count}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={colors.constructionDust}
        transparent
        opacity={0.25}
        sizeAttenuation
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}
