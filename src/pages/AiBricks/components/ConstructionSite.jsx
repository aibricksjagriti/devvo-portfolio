import React from 'react';
import { Box } from '@react-three/drei';
import colors from '../colors';

/**
 * Construction Site Pavement/Foundation Platform
 * Creates a concrete platform under buildings being constructed
 */
export function ConstructionSite({ position, width = 5, depth = 4 }) {
  return (
    <group position={position}>
      {/* Main concrete platform */}
      <Box 
        args={[width, 0.15, depth]} 
        position={[0, 0.075, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={colors.concrete} 
          roughness={0.95}
          metalness={0.1}
        />
      </Box>
      
      {/* Border/edge of pavement - slightly raised */}
      {/* Front edge */}
      <Box 
        args={[width, 0.2, 0.15]} 
        position={[0, 0.1, depth / 2 - 0.075]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={colors.sidewalk} 
          roughness={0.9}
        />
      </Box>
      
      {/* Back edge */}
      <Box 
        args={[width, 0.2, 0.15]} 
        position={[0, 0.1, -depth / 2 + 0.075]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={colors.sidewalk} 
          roughness={0.9}
        />
      </Box>
      
      {/* Left edge */}
      <Box 
        args={[0.15, 0.2, depth - 0.3]} 
        position={[-width / 2 + 0.075, 0.1, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={colors.sidewalk} 
          roughness={0.9}
        />
      </Box>
      
      {/* Right edge */}
      <Box 
        args={[0.15, 0.2, depth - 0.3]} 
        position={[width / 2 - 0.075, 0.1, 0]}
        receiveShadow
        castShadow
      >
        <meshStandardMaterial 
          color={colors.sidewalk} 
          roughness={0.9}
        />
      </Box>
    </group>
  );
}
