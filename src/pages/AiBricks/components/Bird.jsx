import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere } from '@react-three/drei';
import colors from '../colors';

/**
 * Flying Bird Component - Animated bird with wing flapping
 */
export function Bird({ position, scale = 1 }) {
  const birdRef = useRef();
  const wingLeftRef = useRef();
  const wingRightRef = useRef();
  const offset = useMemo(() => Math.random() * 100, []);
  
  useFrame((state) => {
    if (!birdRef.current) return;
    
    const time = state.clock.getElapsedTime() + offset;
    
    // Flying path
    birdRef.current.position.x = Math.sin(time * 0.2) * 15;
    birdRef.current.position.z = Math.cos(time * 0.15) * 12;
    birdRef.current.position.y = position[1] + Math.sin(time * 0.3) * 2;
    
    // Rotation to face direction
    birdRef.current.rotation.y = Math.atan2(
      Math.cos(time * 0.2) * 15 * 0.2,
      -Math.sin(time * 0.15) * 12 * 0.15
    );
    
    // Wing flapping
    if (wingLeftRef.current && wingRightRef.current) {
      const flap = Math.sin(time * 5) * 0.5;
      wingLeftRef.current.rotation.z = flap;
      wingRightRef.current.rotation.z = -flap;
    }
  });
  
  return (
    <group ref={birdRef} position={position} scale={scale}>
      {/* Body */}
      <Sphere args={[0.15, 8, 8]}>
        <meshStandardMaterial color={colors.birdBody} />
      </Sphere>
      
      {/* Wings */}
      <group ref={wingLeftRef} position={[-0.15, 0, 0]}>
        <Box args={[0.4, 0.05, 0.15]}>
          <meshStandardMaterial color={colors.birdWing} />
        </Box>
      </group>
      <group ref={wingRightRef} position={[0.15, 0, 0]}>
        <Box args={[0.4, 0.05, 0.15]}>
          <meshStandardMaterial color={colors.birdWing} />
        </Box>
      </group>
    </group>
  );
}
