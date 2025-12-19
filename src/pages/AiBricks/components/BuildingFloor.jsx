import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import { easeOutCubic } from '../../../utils/animations';
import colors from '../colors';

/**
 * Advanced Building Floor with construction animation
 */
export function BuildingFloor({ 
  index, 
  totalFloors, 
  scroll, 
  buildingWidth, 
  buildingDepth,
  floorHeight, 
  startScroll,
  endScroll,
  buildingType = 'skyscraper'
}) {
  const meshRef = useRef();
  const groupRef = useRef();
  const windowRefs = useRef([]);
  const scaffoldingRef = useRef();
  const concreteRef = useRef();

  // Create realistic window layout based on building type
  const windows = useMemo(() => {
    const positions = [];
    
    if (buildingType === 'skyscraper') {
      // Grid of windows on each face
      const cols = 6;
      const rows = 1;
      
      // Front and back faces
      for (let face = 0; face < 2; face++) {
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            positions.push({
              x: (col - cols / 2 + 0.5) * (buildingWidth / cols),
              y: 0,
              z: face === 0 ? buildingDepth / 2 + 0.01 : -buildingDepth / 2 - 0.01,
              rotY: 0,
              width: buildingWidth / (cols + 2),
              height: floorHeight * 0.5
            });
          }
        }
      }
      
      // Left and right faces
      const sideCols = Math.floor(cols * (buildingDepth / buildingWidth));
      for (let face = 0; face < 2; face++) {
        for (let col = 0; col < sideCols; col++) {
          positions.push({
            x: face === 0 ? buildingWidth / 2 + 0.01 : -buildingWidth / 2 - 0.01,
            y: 0,
            z: (col - sideCols / 2 + 0.5) * (buildingDepth / sideCols),
            rotY: Math.PI / 2,
            width: buildingDepth / (sideCols + 2),
            height: floorHeight * 0.5
          });
        }
      }
    } else if (buildingType === 'apartment') {
      // Fewer, larger windows for apartments
      const cols = 4;
      for (let face = 0; face < 2; face++) {
        for (let col = 0; col < cols; col++) {
          positions.push({
            x: (col - cols / 2 + 0.5) * (buildingWidth / cols),
            y: 0,
            z: face === 0 ? buildingDepth / 2 + 0.01 : -buildingDepth / 2 - 0.01,
            rotY: 0,
            width: buildingWidth / (cols + 1),
            height: floorHeight * 0.6
          });
        }
      }
    } else if (buildingType === 'house') {
      // Simple windows for house
      positions.push(
        { x: buildingWidth * 0.25, y: 0, z: buildingDepth / 2 + 0.01, rotY: 0, width: 0.4, height: 0.4 },
        { x: -buildingWidth * 0.25, y: 0, z: buildingDepth / 2 + 0.01, rotY: 0, width: 0.4, height: 0.4 }
      );
    }
    
    return positions;
  }, [buildingWidth, buildingDepth, floorHeight, buildingType]);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const finalY = index * floorHeight;
    const floorStart = startScroll + (index / totalFloors) * (endScroll - startScroll);
    const floorEnd = startScroll + ((index + 1) / totalFloors) * (endScroll - startScroll);
    const scrollProgress = THREE.MathUtils.clamp(
      (scroll.offset - floorStart) / (floorEnd - floorStart), 
      0, 
      1
    );
    
    // Construction phases: foundation -> structure -> finishing
    const phase1 = THREE.MathUtils.clamp(scrollProgress * 3, 0, 1); // Foundation
    const phase2 = THREE.MathUtils.clamp((scrollProgress - 0.33) * 3, 0, 1); // Structure
    const phase3 = THREE.MathUtils.clamp((scrollProgress - 0.66) * 3, 0, 1); // Finishing
    
    const eased = easeOutCubic(scrollProgress);
    
    // Position animation - floor rises from ground
    const y = THREE.MathUtils.lerp(-5, finalY, eased);
    groupRef.current.position.y = y;

    // Scale animation - starts small and grows
    const scaleProgress = easeOutCubic(phase1);
    const scale = THREE.MathUtils.lerp(0.1, 1, scaleProgress);
    groupRef.current.scale.set(1, scale, 1);

    // Opacity and material transition
    const opacity = THREE.MathUtils.lerp(0, 1, phase2);
    if (meshRef.current.material) {
      meshRef.current.material.opacity = opacity;
    }
    
    // Scaffolding visibility - only during construction
    if (scaffoldingRef.current) {
      const scaffoldOpacity = scrollProgress < 0.9 ? THREE.MathUtils.lerp(0.6, 0, scrollProgress / 0.9) : 0;
      scaffoldingRef.current.traverse((child) => {
        if (child.material) {
          child.material.opacity = scaffoldOpacity;
        }
      });
    }
    
    // Concrete pouring effect
    if (concreteRef.current) {
      const pourProgress = phase1;
      concreteRef.current.scale.y = pourProgress;
      concreteRef.current.material.opacity = pourProgress * 0.5;
    }

    // Animate windows - lighting effect
    windows.forEach((win, i) => {
      if (windowRefs.current[i]) {
        const delay = i * 0.1;
        const windowVisible = phase3 > 0.3;
        
        if (windowVisible) {
          // Random flickering lights
          const lightIntensity = (Math.sin(time * 2 + delay * 10) * 0.5 + 0.5) * 0.6 + 0.4;
          const shouldBeOn = Math.sin(time * 0.5 + i) > 0;
          
          if (windowRefs.current[i].material) {
            windowRefs.current[i].material.emissiveIntensity = shouldBeOn ? lightIntensity : 0.1;
            windowRefs.current[i].material.opacity = THREE.MathUtils.lerp(
              windowRefs.current[i].material.opacity,
              phase3 * 0.9,
              0.1
            );
          }
        }
      }
    });
  });

  const getFloorColor = () => {
    switch(buildingType) {
      case 'skyscraper': return colors.skyscraperBase;
      case 'apartment': return colors.apartmentBase;
      case 'house': return colors.houseBase;
      default: return colors.skyscraperBase;
    }
  };

  const getMetalness = () => {
    return buildingType === 'skyscraper' ? 0.7 : 0.3;
  };

  const getRoughness = () => {
    return buildingType === 'skyscraper' ? 0.2 : 0.6;
  };

  return (
    <group ref={groupRef}>
      {/* Main floor structure */}
      <Box 
        ref={meshRef} 
        args={[buildingWidth, floorHeight * 0.85, buildingDepth]}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={getFloorColor()}
          metalness={getMetalness()}
          roughness={getRoughness()}
          transparent
          opacity={0}
          envMapIntensity={1.5}
        />
      </Box>
      
      {/* Concrete pouring effect */}
      <Box
        ref={concreteRef}
        args={[buildingWidth * 0.95, floorHeight * 0.9, buildingDepth * 0.95]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial
          color={colors.concrete}
          transparent
          opacity={0}
          roughness={0.9}
        />
      </Box>

      {/* Windows */}
      {windows.map((win, i) => (
        <Box
          key={i}
          ref={el => windowRefs.current[i] = el}
          args={[win.width, win.height, 0.05]}
          position={[win.x, win.y, win.z]}
          rotation={[0, win.rotY, 0]}
        >
          <meshStandardMaterial
            color={colors.windowGlass}
            emissive={colors.windowGlassEmissive}
            emissiveIntensity={0}
            metalness={0.1}
            roughness={0.1}
            transparent
            opacity={0}
          />
        </Box>
      ))}

      {/* Floor separator/edge */}
      <Box
        args={[buildingWidth * 1.01, 0.05, buildingDepth * 1.01]}
        position={[0, -floorHeight * 0.425, 0]}
      >
        <meshStandardMaterial
          color={colors.floorEdge}
          metalness={0.8}
          roughness={0.2}
        />
      </Box>
      
      {/* Scaffolding */}
      <group ref={scaffoldingRef}>
        {/* Vertical poles */}
        {[
          [buildingWidth / 2, 0, buildingDepth / 2],
          [-buildingWidth / 2, 0, buildingDepth / 2],
          [buildingWidth / 2, 0, -buildingDepth / 2],
          [-buildingWidth / 2, 0, -buildingDepth / 2]
        ].map((pos, i) => (
          <Cylinder key={i} args={[0.03, 0.03, floorHeight, 8]} position={pos}>
            <meshStandardMaterial 
              color={colors.scaffolding} 
              transparent 
              opacity={0.6} 
              metalness={0.6} 
            />
          </Cylinder>
        ))}
        
        {/* Horizontal bars */}
        <Box args={[buildingWidth + 0.2, 0.03, 0.03]} position={[0, floorHeight / 2, buildingDepth / 2]}>
          <meshStandardMaterial color={colors.scaffolding} transparent opacity={0.6} />
        </Box>
        <Box args={[buildingWidth + 0.2, 0.03, 0.03]} position={[0, floorHeight / 2, -buildingDepth / 2]}>
          <meshStandardMaterial color={colors.scaffolding} transparent opacity={0.6} />
        </Box>
      </group>
    </group>
  );
}
