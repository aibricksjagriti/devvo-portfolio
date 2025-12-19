import React from 'react';
import { Cylinder, Sphere } from '@react-three/drei';
import {
  OBSTACLE_RED,
  OBSTACLE_RED_DARK,
  OBSTACLE_YELLOW,
  OBSTACLE_YELLOW_DARK,
  OBSTACLE_BLUE,
  OBSTACLE_BLUE_DARK,
  OBSTACLE_PURPLE,
  OBSTACLE_PURPLE_DARK,
} from '../colors';

const OBSTACLE_COLORS = [
  { pillar: OBSTACLE_RED, sphere: OBSTACLE_RED_DARK },
  { pillar: OBSTACLE_YELLOW, sphere: OBSTACLE_YELLOW_DARK },
  { pillar: OBSTACLE_BLUE, sphere: OBSTACLE_BLUE_DARK },
  { pillar: OBSTACLE_PURPLE, sphere: OBSTACLE_PURPLE_DARK },
];

export default function Obstacle({ position, index }) {
  const colors = OBSTACLE_COLORS[index % OBSTACLE_COLORS.length];
  
  return (
    <group position={position}>
      <Cylinder args={[0.3, 0.3, 2, 8]} position={[0, 1, 0]} castShadow>
        <meshStandardMaterial 
          color={colors.pillar}
          metalness={0.4}
          roughness={0.6}
        />
      </Cylinder>
      <Sphere args={[0.4]} position={[0, 2.5, 0]} castShadow>
        <meshStandardMaterial 
          color={colors.sphere}
          emissive={colors.sphere}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </group>
  );
}
