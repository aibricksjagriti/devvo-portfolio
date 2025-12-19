import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder, RoundedBox } from '@react-three/drei';
import colors from '../colors';

/**
 * Moving Car Component - Realistic modern car with proper proportions
 */
export function Car({ position, speed = 0.02, color = colors.carRed }) {
  const carRef = useRef();
  const wheelsRef = useRef([]);
  
  useFrame((state) => {
    if (!carRef.current) return;
    const distance = (state.clock.getElapsedTime() * speed) % 40;
    carRef.current.position.x = distance - 20;
    
    // Rotate wheels based on distance traveled (proper rolling)
    // Wheel circumference = 2 * PI * radius = 2 * PI * 0.25 ≈ 1.57
    const wheelRotation = (distance / 1.57) * Math.PI * 2;
    wheelsRef.current.forEach(wheel => {
      if (wheel) wheel.rotation.y = wheelRotation;
    });
  });
  
  return (
    <group ref={carRef} position={position}>
      {/* Main body - lower chassis */}
      <RoundedBox args={[2.2, 0.6, 1.2]} radius={0.08} position={[0, 0.4, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </RoundedBox>
      
      {/* Car cabin/roof */}
      <RoundedBox args={[1.3, 0.7, 1.1]} radius={0.1} position={[-0.1, 1.05, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial 
          color={color} 
          metalness={0.95} 
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </RoundedBox>
      
      {/* Front windshield */}
      <Box args={[0.65, 0.55, 1.05]} position={[0.5, 1.05, 0]} rotation={[0, 0, 0.15]}>
        <meshPhysicalMaterial 
          color={colors.carWindowGlass} 
          transparent 
          opacity={0.2}
          transmission={0.95}
          metalness={0} 
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </Box>
      
      {/* Rear windshield */}
      <Box args={[0.5, 0.55, 1.05]} position={[-0.7, 1.05, 0]} rotation={[0, 0, -0.1]}>
        <meshPhysicalMaterial 
          color={colors.carWindowGlass} 
          transparent 
          opacity={0.2}
          transmission={0.95}
          metalness={0} 
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </Box>
      
      {/* Side windows */}
      <Box args={[1.25, 0.5, 0.02]} position={[-0.1, 1.05, 0.55]}>
        <meshPhysicalMaterial 
          color={colors.carWindowGlass} 
          transparent 
          opacity={0.2}
          transmission={0.95}
          metalness={0} 
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </Box>
      <Box args={[1.25, 0.5, 0.02]} position={[-0.1, 1.05, -0.55]}>
        <meshPhysicalMaterial 
          color={colors.carWindowGlass} 
          transparent 
          opacity={0.2}
          transmission={0.95}
          metalness={0} 
          roughness={0.02}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          ior={1.5}
        />
      </Box>
      
      {/* Headlights */}
      <Box args={[0.15, 0.2, 0.3]} position={[1.1, 0.45, 0.45]} castShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffcc"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>
      <Box args={[0.15, 0.2, 0.3]} position={[1.1, 0.45, -0.45]} castShadow>
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffcc"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </Box>
      
      {/* Taillights */}
      <Box args={[0.1, 0.15, 0.25]} position={[-1.1, 0.4, 0.45]}>
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      <Box args={[0.1, 0.15, 0.25]} position={[-1.1, 0.4, -0.45]}>
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Wheels with proper tire details */}
      {[
        [-0.7, 0.65],  // Front left
        [0.6, 0.65],   // Front right
        [-0.7, -0.65], // Rear left
        [0.6, -0.65]   // Rear right
      ].map((pos, i) => (
        <group key={i} position={[pos[0], 0.25, pos[1]]} rotation={[Math.PI / 2, 0, 0]} ref={(el) => wheelsRef.current[i] = el}>
          {/* Tire */}
          <Cylinder 
            args={[0.25, 0.25, 0.2, 32]} 
            castShadow
          >
            <meshStandardMaterial 
              color={colors.carTire} 
              metalness={0.2} 
              roughness={0.95}
            />
          </Cylinder>
          
          {/* Rim/Hub */}
          <Cylinder 
            args={[0.15, 0.15, 0.22, 32]}
          >
            <meshStandardMaterial 
              color="#c0c0c0" 
              metalness={0.95} 
              roughness={0.15}
            />
          </Cylinder>
        </group>
      ))}
      
      {/* Undercarriage */}
      <Box args={[2, 0.1, 1]} position={[0, 0.05, 0]} receiveShadow>
        <meshStandardMaterial 
          color="#1a1a1a" 
          metalness={0.5} 
          roughness={0.8}
        />
      </Box>
    </group>
  );
}
