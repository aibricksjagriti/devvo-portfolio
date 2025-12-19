import React, { useState, useRef } from 'react';
import { Box, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { BuildingFloor } from './BuildingFloor';
import colors from '../colors';


/**
 * House Building Component with Roof
 */
export function HouseBuilding({ position, numFloors, scroll, startScroll, endScroll }) {
  const [buildProgress, setBuildProgress] = useState(0);
  const roofRef = useRef();
  
  // Update construction progress on each frame
  useFrame(() => {
    if (!scroll) return;
    const progress = Math.max(0, Math.min(1, 
      (scroll.offset - startScroll) / (endScroll - startScroll)
    ));
    setBuildProgress(progress);
  });
  
  const dimensions = {
    width: 2,
    depth: 2.5,
    height: 1.2,
    floors: 2
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
          buildingType="house"
        />
      ))}
      
      {/* Roof - only appears when construction is complete */}
      {buildProgress >= 0.95 && (
        <group position={[0, dimensions.floors * dimensions.height - 0.9, 0]} ref={roofRef}>
          {/* Simple pyramid roof */}
          <mesh 
            position={[0, 0.6, 0]} 
            rotation={[0, Math.PI / 4, 0]}
            castShadow
            receiveShadow
          >
            <coneGeometry args={[dimensions.width * 0.9, 1.2, 4]} />
            <meshStandardMaterial color={colors.roofShingle} roughness={0.75} />
          </mesh>
        </group>
      )}
    </group>
  );
}
