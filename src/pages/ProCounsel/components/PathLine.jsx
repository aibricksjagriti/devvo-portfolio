import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function PathLine({ path, scroll }) {
  const lineRef = useRef();
  const points = path.getPoints(100);

  useFrame(() => {
    const s = scroll?.offset ?? 0;
    const pathProgress = Math.min(s * 1.2, 1);
    const visiblePoints = Math.floor(pathProgress * points.length);
    
    if (lineRef.current && lineRef.current.geometry) {
      const positions = lineRef.current.geometry.attributes.position.array;
      for (let i = 0; i < visiblePoints * 3; i += 3) {
        const point = points[Math.floor(i / 3)];
        positions[i] = point.x;
        positions[i + 1] = point.y + 0.1;
        positions[i + 2] = point.z;
      }
      lineRef.current.geometry.setDrawRange(0, visiblePoints);
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(p => [p.x, p.y + 0.1, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#818cf8" linewidth={2} transparent opacity={0.6} />
    </line>
  );
}
