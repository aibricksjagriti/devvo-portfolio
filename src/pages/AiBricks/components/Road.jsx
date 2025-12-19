import React from 'react';
import { Box } from '@react-three/drei';
import colors from '../colors';

/**
 * Road System with static lane markings
 */
export function Road() {
  return (
    <group position={[0, 0.01, 8]}>
      {/* Main road */}
      <Box args={[60, 0.02, 4]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color={colors.roadAsphalt} roughness={0.9} />
      </Box>
      
      {/* Road markings - STATIC */}
      <group>
        {Array.from({ length: 30 }).map((_, i) => (
          <Box 
            key={i} 
            args={[1, 0.03, 0.15]} 
            position={[i * 2 - 30, 0.01, 0]}
          >
            <meshStandardMaterial 
              color={colors.roadLine} 
              emissive={colors.roadLineEmissive} 
              emissiveIntensity={0.5} 
            />
          </Box>
        ))}
      </group>
      
      {/* Sidewalks */}
      <Box args={[60, 0.05, 0.5]} position={[0, 0.025, 2.25]} receiveShadow>
        <meshStandardMaterial color={colors.sidewalk} roughness={0.8} />
      </Box>
      <Box args={[60, 0.05, 0.5]} position={[0, 0.025, -2.25]} receiveShadow>
        <meshStandardMaterial color={colors.sidewalk} roughness={0.8} />
      </Box>
    </group>
  );
}
