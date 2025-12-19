import React, { useRef, useMemo } from 'react';
import { useScroll, Cloud } from '@react-three/drei';
import { useCameraAnimation } from './hooks/useCameraAnimation';
import {
  Building,
  ConstructionCrane,
  ConstructionSite,
  Tree,
  Car,
  Bird,
  ConstructionDust,
  Road,
  Landscape,
} from './components';
import colors from './colors';

/**
 * Main AiBricks 3D Scene
 */
export default function AiBricksScene() {
  const scroll = useScroll();
  const groupRef = useRef();

  // Use camera animation hook
//   useCameraAnimation(scroll, groupRef);

  // Define construction timeline for different buildings - organized grid layout
  const buildings = useMemo(() => [
    // Row 1 (Front) - Left side of road
    { type: 'house', pos: [-12, 0, 3], floors: 3, start: 0.3, end: 0.6 },
    { type: 'apartment', pos: [-18, 0, 3], floors: 10, start: 0.2, end: 0.6 },
    { type: 'house', pos: [-24, 0, 3], floors: 2, start: 0.28, end: 0.58 },
    
    // Row 1 (Front) - Right side of road
    { type: 'house', pos: [12, 0, 3], floors: 3, start: 0.35, end: 0.65 },
    { type: 'apartment', pos: [18, 0, 3], floors: 11, start: 0.25, end: 0.62 },
    { type: 'house', pos: [24, 0, 3], floors: 2, start: 0.32, end: 0.63 },
    
    // Row 2 (Mid-front) - Left side
    { type: 'apartment', pos: [-12, 0, -3], floors: 14, start: 0.25, end: 0.65 },
    { type: 'apartment', pos: [-18, 0, -3], floors: 16, start: 0.4, end: 0.7 },
    { type: 'apartment', pos: [-24, 0, -3], floors: 12, start: 0.35, end: 0.75 },
    
    // Row 2 (Mid-front) - Right side
    { type: 'apartment', pos: [12, 0, -3], floors: 13, start: 0.3, end: 0.68 },
    { type: 'apartment', pos: [18, 0, -3], floors: 15, start: 0.2, end: 0.7 },
    { type: 'apartment', pos: [24, 0, -3], floors: 9, start: 0.4, end: 0.72 },
    
    // Row 3 (Center) - Main skyscrapers
    { type: 'skyscraper', pos: [-6, 0, -10], floors: 28, start: 0.3, end: 0.75 },
    { type: 'skyscraper', pos: [0, 0, -10], floors: 30, start: 0, end: 0.4 },
    { type: 'skyscraper', pos: [6, 0, -10], floors: 25, start: 0.5, end: 0.9 },
    
    // Row 4 (Back) - Mixed apartments
    { type: 'apartment', pos: [-18, 0, -17], floors: 18, start: 0.15, end: 0.85 },
    { type: 'apartment', pos: [-12, 0, -17], floors: 14, start: 0.25, end: 0.65 },
    { type: 'apartment', pos: [12, 0, -17], floors: 17, start: 0.35, end: 0.8 },
    { type: 'apartment', pos: [18, 0, -17], floors: 12, start: 0.35, end: 0.75 },
    
    // Row 5 (Far back) - Tallest skyscraper
    { type: 'skyscraper', pos: [0, 0, -24], floors: 32, start: 0.4, end: 0.85 },
  ], []);

  return (
    <>
      {/* Enhanced lighting setup for warm immersive feel */}
      <ambientLight intensity={0.6} color={colors.ambientFill} />
      
      {/* Sun light - golden hour */}
      <directionalLight
        position={[30, 40, 20]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
        color={colors.sunLight}
      />
      
      {/* Warm fill lights for cohesive atmosphere */}
      <pointLight 
        position={[0, 15, 0]} 
        intensity={1.2} 
        color={colors.ambientFill} 
        distance={60} 
        decay={1.8} 
      />
      <pointLight 
        position={[-20, 10, -15]} 
        intensity={0.8} 
        color={colors.warmFill} 
        distance={50} 
        decay={1.8} 
      />
      <pointLight 
        position={[20, 10, 15]} 
        intensity={0.7} 
        color={colors.warmFill} 
        distance={50} 
        decay={1.8} 
      />
      
      {/* Hemisphere light for warm ambient atmosphere */}
      <hemisphereLight args={[colors.sky, colors.hemisphereGround, 0.8]} />

      {/* Main scene group */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Construction site pavements under all buildings */}
        {buildings.map((building, index) => {
          // Calculate pavement size based on building type
          const pavementSize = building.type === 'skyscraper' 
            ? { width: 6, depth: 5 }
            : building.type === 'apartment'
            ? { width: 6.5, depth: 5.5 }
            : { width: 4.5, depth: 4.5 };
          
          return (
            <ConstructionSite
              key={`site-${index}`}
              position={building.pos}
              width={pavementSize.width}
              depth={pavementSize.depth}
            />
          );
        })}
        
        {/* All buildings with staggered construction */}
        {buildings.map((building, index) => (
          <Building
            key={`building-${index}`}
            position={building.pos}
            type={building.type}
            numFloors={building.floors}
            scroll={scroll}
            startScroll={building.start}
            endScroll={building.end}
          />
        ))}
        
        {/* Construction cranes - positioned near buildings */}
        <ConstructionCrane 
          position={[5, 0, 3]} 
          scroll={scroll} 
          startScroll={0} 
          endScroll={0.4} 
        />
        <ConstructionCrane 
          position={[10, 0, -10]} 
          scroll={scroll} 
          startScroll={0.5} 
          endScroll={0.9} 
        />
        <ConstructionCrane 
          position={[-10, 0, -16]} 
          scroll={scroll} 
          startScroll={0.3} 
          endScroll={0.75} 
        />

        <ConstructionCrane 
          position={[22, 0, -8]} 
          scroll={scroll} 
          startScroll={0.35} 
          endScroll={0.8} 
        />
        
        {/* Environment elements */}
        <Landscape />
        <Road />
        
        {/* Trees scattered around - removed from road area (z 6-10) */}
        <Tree position={[-20, 0, 3]} scale={0.9} />
        <Tree position={[20, 0, 3]} scale={0.8} />
        <Tree position={[-12, 0, -15]} scale={1.0} />
        <Tree position={[15, 0, -16]} scale={1.3} />
        <Tree position={[-8, 0, 12]} scale={0.9} />
        <Tree position={[12, 0, 13]} scale={1.1} />
        <Tree position={[5, 0, 14]} scale={0.85} />
        <Tree position={[-18, 0, -5]} scale={1.15} />
        
        {/* Moving cars on road - 2 cars in 2 lanes */}
        <Car position={[0, 0.3, 9]} speed={0.8} color={colors.carRed} />
        <Car position={[0, 0.3, 7]} speed={0.6} color={colors.carBlue} />
        
        {/* Flying birds */}
        <Bird position={[5, 15, 5]} scale={0.8} />
        <Bird position={[-8, 18, -3]} scale={1.0} />
        <Bird position={[12, 20, 8]} scale={0.7} />
        <Bird position={[-15, 16, 10]} scale={0.9} />
        <Bird position={[0, 22, -8]} scale={1.1} />
        
        {/* Construction dust particles */}
        <ConstructionDust scroll={scroll} />
      </group>

      {/* Ground plane - extends to horizon */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          color={colors.groundBase} 
          roughness={0.95}
          fog={true}
        />
      </mesh>
      
      {/* Clouds in the sky */}
      <Cloud 
        position={[10, 25, -20]} 
        opacity={0.3} 
        speed={0.1} 
        color={colors.cloudWhite} 
      />
      <Cloud 
        position={[-15, 28, -25]} 
        opacity={0.25} 
        speed={0.15} 
        color={colors.cloudWhite} 
      />
      <Cloud 
        position={[20, 30, -30]} 
        opacity={0.2} 
        speed={0.12} 
        color={colors.cloudWhite} 
      />
    </>
  );
}
