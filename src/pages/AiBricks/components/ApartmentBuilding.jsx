import React from 'react';
import { Box } from '@react-three/drei';
import { BuildingFloor } from './BuildingFloor';
import colors from '../colors';

/**
 * Apartment Building Component
 */
export function ApartmentBuilding({ position, numFloors, scroll, startScroll, endScroll }) {
  const dimensions = {
    width: 4,
    depth: 3,
    height: 0.6,
    floors: Math.min(numFloors, 8)
  };

  return (
    <group position={position}>
      {/* Foundation */}
      <Box 
        args={[dimensions.width + 0.5, 0.3, dimensions.depth + 0.5]} 
        position={[0, 0.15, 0]}
        receiveShadow
      >
        <meshStandardMaterial color={colors.foundation} roughness={0.9} />
      </Box>
      
      {/* Building floors */}
      {Array.from({ length: dimensions.floors }).map((_, i) => (
        <BuildingFloor
          key={i}
          index={i}
          totalFloors={dimensions.floors}
          scroll={scroll}
          buildingWidth={dimensions.width}
          buildingDepth={dimensions.depth}
          floorHeight={dimensions.height}
          startScroll={startScroll}
          endScroll={endScroll}
          buildingType="apartment"
        />
      ))}
    </group>
  );
}
