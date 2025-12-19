import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, Sphere } from '@react-three/drei';
import { STUDENT_CYAN, WHITE } from '../colors';
import * as THREE from 'three';

const StudentCharacter = forwardRef(function StudentCharacter(
  { pathRef, scroll, obstacles },
  ref
) {
  const groupRef = useRef();
  const bodyRef = useRef();
  const [currentPillarData, setCurrentPillarData] = useState(null);
  const frameCountRef = useRef(0);
  
  // Reusable vectors to reduce GC pressure
  const reusableVec = useRef(new THREE.Vector3());
  const obstacleVec = useRef(new THREE.Vector3());

  useImperativeHandle(ref, () => groupRef.current);

  useFrame((state) => {
    if (!pathRef.current || !groupRef.current) return;

    const s = scroll?.offset ?? 0;
    const basePos = pathRef.current.getPointAt(Math.min(s, 1));
    let studentPos = new THREE.Vector3(basePos.x, basePos.y, basePos.z);
    
    const pathTangent = pathRef.current.getTangentAt(Math.min(s, 1));

    const rightDir = new THREE.Vector3()
      .crossVectors(new THREE.Vector3(0, 1, 0), pathTangent)
      .normalize();
    const leftDir = rightDir.clone().negate();

    const DEFAULT_LEFT_OFFSET = 0.6;
    const defaultOffset = leftDir.multiplyScalar(DEFAULT_LEFT_OFFSET);
    studentPos.add(defaultOffset);

    if (obstacles && obstacles.length > 0) {
      const OBSTACLE_RADIUS = 0.3;
      const CLEARANCE = 0.5;
      const MIN_DISTANCE = OBSTACLE_RADIUS + CLEARANCE;
      
      obstacles.forEach((obstacle) => {
        const obstaclePos = new THREE.Vector3(...obstacle.position);
        const distance = studentPos.distanceTo(obstaclePos);
        
        if (distance < MIN_DISTANCE * 2) {
          const influenceRange = MIN_DISTANCE * 2.5;
          const influenceFactor = Math.pow(1 - distance / influenceRange, 2);
          const additionalOffsetAmount = MIN_DISTANCE * influenceFactor;

          const additionalOffset = leftDir.multiplyScalar(additionalOffsetAmount);
          studentPos.add(additionalOffset);
        }
      });
    }
    
    // Increased lerp from 0.15 to 0.2 for smoother motion
    groupRef.current.position.lerp(studentPos, 0.2);

    const nextPos = pathRef.current.getPointAt(Math.min(s + 0.05, 1));
    groupRef.current.lookAt(nextPos);

    // Throttle pillar detection to every 5 frames for better performance
    frameCountRef.current++;
    if (obstacles && obstacles.length > 0 && frameCountRef.current % 5 === 0) {
      reusableVec.current.copy(groupRef.current.position);
      let closestPillar = null;
      let minDistance = Infinity;
      const proximityThreshold = 3.0;

      obstacles.forEach((obstacle) => {
        obstacleVec.current.set(...obstacle.position);
        const distance = reusableVec.current.distanceTo(obstacleVec.current);

        if (distance < minDistance) {
          minDistance = distance;
          closestPillar = obstacle;
        }
      });

      if (s < 0.1 && obstacles[0]) {
        if (!currentPillarData || currentPillarData.index !== 0) {
          setCurrentPillarData(obstacles[0].data);
        }
      } else if (closestPillar && closestPillar.data) {
        if (minDistance < proximityThreshold) {
          if (!currentPillarData || currentPillarData.index !== closestPillar.index) {
            setCurrentPillarData(closestPillar.data);
          }
        }
      }
    }

    const time = state.clock.getElapsedTime();
    if (bodyRef.current) {
      bodyRef.current.position.y = 0.4 + Math.abs(Math.sin(time * 5)) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={bodyRef}>
        {/* Body */}
        <Cylinder args={[0.25, 0.25, 0.9, 16]} position={[0, 0.45, 0]} castShadow>
          <meshStandardMaterial color={STUDENT_CYAN} metalness={0.3} roughness={0.7} />
        </Cylinder>

        {/* Head */}
        <Sphere args={[0.3]} position={[0, 1.1, 0]} castShadow>
          <meshStandardMaterial color={WHITE} roughness={0.5} />
        </Sphere>

        {/* Arms */}
        <Cylinder
          args={[0.08, 0.08, 0.6, 8]}
          position={[-0.4, 0.6, 0]}
          rotation={[0, 0, Math.PI / 4]}
        >
          <meshStandardMaterial color={STUDENT_CYAN} />
        </Cylinder>
        <Cylinder
          args={[0.08, 0.08, 0.6, 8]}
          position={[0.4, 0.6, 0]}
          rotation={[0, 0, -Math.PI / 4]}
        >
          <meshStandardMaterial color={STUDENT_CYAN} />
        </Cylinder>
      </group>
    </group>
  );
});

export default StudentCharacter;
