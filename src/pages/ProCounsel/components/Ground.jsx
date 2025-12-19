import React from 'react';
import { Plane } from '@react-three/drei';
import { BACKGROUND_DARK } from '../colors';

export default function Ground() {
  return (
    <Plane
      args={[100, 100]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.5, 0]}
      receiveShadow
    >
      <meshStandardMaterial color={BACKGROUND_DARK} roughness={1} />
    </Plane>
  );
}
