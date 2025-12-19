import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';
import colors from '../colors';

/**
 * Realistic Construction Crane Component with lattice tower
 */
export function ConstructionCrane({ position, scroll, startScroll, endScroll }) {
  const groupRef = useRef();
  const hookRef = useRef();
  const cableRef = useRef();
  const armRef = useRef();
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const progress = THREE.MathUtils.clamp(
      (scroll.offset - startScroll) / (endScroll - startScroll), 
      0, 
      1
    );
    
    // Crane rotation - slower, more realistic
    if (armRef.current) {
      armRef.current.rotation.y = progress * Math.PI * 0.3 + Math.sin(state.clock.getElapsedTime() * 0.08) * 0.1;
    }
    
    // Hook movement - oscillates between -3 and -8
    if (hookRef.current && cableRef.current) {
      const hookY = Math.sin(state.clock.getElapsedTime() * 0.3 + progress * 3) * 2.5 - 5.5;
      hookRef.current.position.y = hookY;
      
      // Dynamically adjust cable length and position
      const trolleyY = -0.25; // Adjusted for new arm height
      const cableLength = Math.abs(trolleyY - hookY);
      const cableMiddleY = (trolleyY + hookY) / 2;
      
      // Update cable geometry and position
      cableRef.current.scale.y = cableLength / 5; // 5 is the base length
      cableRef.current.position.y = cableMiddleY;
    }
  });
  
  // Lattice tower segments
  const TowerSegment = ({ y }) => (
    <group position={[0, y, 0]}>
      {/* Vertical corner posts */}
      {[[-0.5, 0.5], [0.5, 0.5], [0.5, -0.5], [-0.5, -0.5]].map(([x, z], i) => (
        <Cylinder key={`post-${i}`} args={[0.08, 0.08, 3, 8]} position={[x, 0, z]} castShadow>
          <meshStandardMaterial color={colors.craneOrange} metalness={0.9} roughness={0.2} />
        </Cylinder>
      ))}
      
      {/* Horizontal cross beams */}
      <Box args={[1.1, 0.06, 0.06]} position={[0, 1.2, 0.5]} castShadow>
        <meshStandardMaterial color={colors.craneOrange} metalness={0.85} roughness={0.25} />
      </Box>
      <Box args={[1.1, 0.06, 0.06]} position={[0, 1.2, -0.5]} castShadow>
        <meshStandardMaterial color={colors.craneOrange} metalness={0.85} roughness={0.25} />
      </Box>
      <Box args={[0.06, 0.06, 1.1]} position={[0.5, 1.2, 0]} castShadow>
        <meshStandardMaterial color={colors.craneOrange} metalness={0.85} roughness={0.25} />
      </Box>
      <Box args={[0.06, 0.06, 1.1]} position={[-0.5, 1.2, 0]} castShadow>
        <meshStandardMaterial color={colors.craneOrange} metalness={0.85} roughness={0.25} />
      </Box>
      
      {/* Diagonal bracing */}
      <Box args={[1.4, 0.05, 0.05]} position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <meshStandardMaterial color={colors.craneBright} metalness={0.85} roughness={0.25} />
      </Box>
      <Box args={[1.4, 0.05, 0.05]} position={[0, 0.5, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <meshStandardMaterial color={colors.craneBright} metalness={0.85} roughness={0.25} />
      </Box>
    </group>
  );
  
  return (
    <group ref={groupRef} position={position}>
      {/* Lattice tower - 5 segments reaching to top */}
      {[0, 3, 6, 9, 12].map((y, i) => (
        <TowerSegment key={i} y={y} />
      ))}
      
      {/* Tower top platform - sits on top of last segment */}
      <Box args={[1.4, 0.3, 1.4]} position={[0, 13.65, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={colors.craneOrange} metalness={0.8} roughness={0.3} />
      </Box>
      
      {/* Rotating arm assembly - mounted on platform */}
      <group ref={armRef} position={[0, 13.95, 0]}>
        {/* Main jib (boom) - lattice structure */}
        <group position={[6, 0, 0]}>
          {/* Top chord */}
          <Box args={[12, 0.12, 0.12]} position={[0, 0.3, 0]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
          {/* Bottom chord */}
          <Box args={[12, 0.12, 0.12]} position={[0, -0.3, 0]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
          {/* Side chords */}
          <Box args={[12, 0.12, 0.12]} position={[0, 0, 0.3]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
          <Box args={[12, 0.12, 0.12]} position={[0, 0, -0.3]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
          
          {/* Cross bracing on jib */}
          {[-4, -2, 0, 2, 4].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <Box args={[0.05, 0.7, 0.05]} rotation={[0, 0, Math.PI / 4]} castShadow>
                <meshStandardMaterial color={colors.craneBright} metalness={0.85} roughness={0.25} />
              </Box>
              <Box args={[0.05, 0.7, 0.05]} rotation={[0, 0, -Math.PI / 4]} castShadow>
                <meshStandardMaterial color={colors.craneBright} metalness={0.85} roughness={0.25} />
              </Box>
            </group>
          ))}
        </group>
        
        {/* Counter jib */}
        <group position={[-3, 0, 0]}>
          <Box args={[6, 0.12, 0.12]} position={[0, 0.2, 0]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
          <Box args={[6, 0.12, 0.12]} position={[0, -0.2, 0]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Box>
        </group>
        
        {/* Operator cabin */}
        <Box args={[0.8, 0.7, 0.8]} position={[0.5, -0.5, 0]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color="#e8d4b0" 
            metalness={0.6} 
            roughness={0.3}
            clearcoat={0.5}
          />
        </Box>
        <Box args={[0.7, 0.5, 0.7]} position={[0.5, -0.5, 0]}>
          <meshPhysicalMaterial 
            color="#5a7a9a" 
            transparent 
            opacity={0.4}
            transmission={0.6}
            metalness={0.1} 
            roughness={0.1}
          />
        </Box>
        
        {/* Counter weight - realistic concrete blocks */}
        <group position={[-6, -0.5, 0]}>
          <Box args={[1.2, 1.2, 1.2]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color={colors.concrete} metalness={0.1} roughness={0.9} />
          </Box>
          <Box args={[1.0, 1.0, 1.0]} position={[0, 1.1, 0]} castShadow receiveShadow>
            <meshStandardMaterial color={colors.concrete} metalness={0.1} roughness={0.9} />
          </Box>
        </group>
        
        {/* Trolley on jib */}
        <Box args={[0.4, 0.3, 0.4]} position={[8, -0.25, 0]} castShadow>
          <meshStandardMaterial color={colors.craneOrange} metalness={0.85} roughness={0.25} />
        </Box>
        
        {/* Dynamic cable - stretches with hook movement */}
        <Cylinder 
          ref={cableRef}
          args={[0.03, 0.03, 5, 16]} 
          position={[8, -3, 0]}
          castShadow
        >
          <meshStandardMaterial 
            color="#3a3a2a" 
            metalness={0.95} 
            roughness={0.15}
          />
        </Cylinder>
        
        {/* Hook assembly - moves up and down */}
        <group ref={hookRef} position={[8, -5.5, 0]}>
          {/* Hook top shackle - connects cable to hook */}
          <Cylinder args={[0.15, 0.15, 0.3, 16]} position={[0, 0.15, 0]} castShadow>
            <meshStandardMaterial color={colors.craneBright} metalness={0.9} roughness={0.2} />
          </Cylinder>
          
          {/* Hook body */}
          <Cylinder args={[0.08, 0.12, 0.6, 16]} position={[0, -0.3, 0]} castShadow>
            <meshStandardMaterial color="#d4a864" metalness={0.9} roughness={0.2} />
          </Cylinder>
          
          {/* Hook curved part */}
          <Box args={[0.3, 0.08, 0.08]} position={[0, -0.7, 0]} castShadow>
            <meshStandardMaterial color="#d4a864" metalness={0.9} roughness={0.2} />
          </Box>
        </group>
      </group>
      
      {/* Base support structure */}
      <Box args={[2, 0.5, 2]} position={[0, 0.25, 0]} receiveShadow>
        <meshStandardMaterial color={colors.concrete} metalness={0.2} roughness={0.8} />
      </Box>
    </group>
  );
}
