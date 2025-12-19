import React from 'react';
import { Cylinder, Sphere } from '@react-three/drei';
import colors from '../colors';

/**
 * Tree Component - Realistic tree with trunk and foliage
 */
export function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <Cylinder args={[0.15, 0.2, 2, 16]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial 
          color={colors.treeTrunk} 
          roughness={0.95}
          metalness={0.0}
          normalScale={[0.5, 0.5]}
        />
      </Cylinder>
      
      {/* Foliage - layered for depth */}
      <Sphere args={[0.8, 16, 16]} position={[0, 2.5, 0]} castShadow>
        <meshStandardMaterial 
          color={colors.treeFoliageDark} 
          roughness={0.9}
          metalness={0.0}
        />
      </Sphere>
      <Sphere args={[0.7, 16, 16]} position={[0.3, 3, 0.2]} castShadow>
        <meshStandardMaterial 
          color={colors.treeFoliageMid} 
          roughness={0.88}
          metalness={0.0}
        />
      </Sphere>
      <Sphere args={[0.6, 16, 16]} position={[-0.2, 3.3, -0.1]} castShadow>
        <meshStandardMaterial 
          color={colors.treeFoliageLight} 
          roughness={0.87}
          metalness={0.0}
        />
      </Sphere>
    </group>
  );
}
