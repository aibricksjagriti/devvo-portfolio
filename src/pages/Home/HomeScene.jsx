import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PRIMARY_CYAN, PRIMARY_MAGENTA } from './colors';

function TechGrid() {
  const gridRef = useRef();
  
  useFrame((state) => {
    gridRef.current.position.z = (state.clock.getElapsedTime() * 2) % 20 - 10;
  });

  return (
    <group ref={gridRef}>
      <gridHelper args={[50, 50, PRIMARY_CYAN, PRIMARY_CYAN]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -10]} />
      <gridHelper args={[50, 50, PRIMARY_CYAN, PRIMARY_CYAN]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 10]} />
    </group>
  );
}

function DataParticles() {
  const particlesRef = useRef();
  const particleCount = 1000;

  const particles = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      velocities.push(Math.random() * 0.02 + 0.01);
    }

    return { positions, velocities };
  }, []);

  useFrame(() => {
    const positions = particlesRef.current.geometry.attributes.position.array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 2] += particles.velocities[i];

      if (positions[i * 3 + 2] > 15) {
        positions[i * 3 + 2] = -15;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color={PRIMARY_CYAN} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function FloatingCube({ position, scale, color, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * rotationSpeed[0];
    meshRef.current.rotation.y += delta * rotationSpeed[1];
    meshRef.current.rotation.z += delta * rotationSpeed[2];
    meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.002;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function TechRings() {
  const ringRef = useRef();

  useFrame((state) => {
    ringRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <group ref={ringRef}>
      {[3, 4, 5, 6].map((radius, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? PRIMARY_CYAN : PRIMARY_MAGENTA}
            emissive={i % 2 === 0 ? PRIMARY_CYAN : PRIMARY_MAGENTA}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function HomeScene() {
  return (
    <>
      <Environment preset="night" />
      <fog attach="fog" args={['#0a0a0a', 10, 30]} />
      
      <TechGrid />
      <DataParticles />
      <TechRings />
      
      <FloatingCube 
        position={[-4, 2, 0]} 
        scale={0.8} 
        color={PRIMARY_CYAN} 
        rotationSpeed={[0.3, 0.2, 0.1]} 
      />
      <FloatingCube 
        position={[4, -2, 0]} 
        scale={0.6} 
        color={PRIMARY_MAGENTA} 
        rotationSpeed={[0.2, 0.3, 0.2]} 
      />
      <FloatingCube 
        position={[0, 3, -3]} 
        scale={0.5} 
        color="#00ff88" 
        rotationSpeed={[0.1, 0.4, 0.1]} 
      />
    </>
  );
}
