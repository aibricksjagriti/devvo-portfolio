import React from 'react';
import { Box } from '@react-three/drei';
import { BuildingFloor } from './BuildingFloor';
import colors from '../colors';

/**
 * Skyscraper Building Component
 */
export function SkyscraperBuilding({ position, numFloors, scroll, startScroll, endScroll }) {
  const dimensions = {
    width: 3,
    depth: 2.5,
    height: 0.5,
    floors: numFloors
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
          buildingType="skyscraper"
        />
      ))}
    </group>
  );
}
