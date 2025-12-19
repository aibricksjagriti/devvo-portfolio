import React, { useMemo, useRef } from 'react';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import {
  StudentCharacter,
  Obstacle,
  PathLine,
  Ground,
} from './components';
import { useCameraFollow } from './hooks/useAnimations';
import { PRIMARY_INDIGO } from './colors';

// Pillar data mapping - simplified for obstacle display
const PILLAR_DATA = [
  { timePeriod: 'Dec–Jan', keyEvent: 'Exam Preps & Pre-Boards' },
  { timePeriod: 'Feb–Mar', keyEvent: 'Board Exams' },
  { timePeriod: 'Mar–Apr', keyEvent: 'Entrance Exams (JEE, NEET, CET, etc.)' },
  { timePeriod: 'May–Jun', keyEvent: 'Registration' },
  { timePeriod: 'Jun–Jul', keyEvent: 'Document Verification' },
  { timePeriod: 'Jul–Aug', keyEvent: 'Seat Allotments / CAP Rounds' },
  { timePeriod: 'Aug–Sep', keyEvent: 'Non-CAP / SPOT / IL Rounds' },
  { timePeriod: 'Sep–Oct', keyEvent: 'Start of Academic Year' },
  { timePeriod: 'Oct–Forever', keyEvent: 'Beyond Admission: Hostel, Loans, Internships, Placements & Further Studies' },
];

export default function ProCounselScene({ scrollProgress = 0 }) {
  const studentRef = useRef();
  
  // Create a mock scroll object for compatibility
  const scroll = useMemo(() => ({
    offset: scrollProgress,
    delta: 0,
    range: [0, 1],
    curve: [0, 1],
    visible: true,
  }), [scrollProgress]);

  // Calculate obstacle positions first (on a base path)
  const basePath = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-12, 0, 12),
    new THREE.Vector3(-8, 0, 0),
    new THREE.Vector3(-4, 0, -6),
    new THREE.Vector3(0, 0, -8),
    new THREE.Vector3(4, 0, -6),
    new THREE.Vector3(8, 0, 0),
    new THREE.Vector3(12, 0, 12),
  ]), []);

  // Calculate obstacle positions
  const obstacles = useMemo(() => {
    const numObstacles = 9;
    const startT = 0.15; // Start later to give space before first pole
    const endT = 0.95;
    const step = (endT - startT) / (numObstacles - 1);
    
    return Array.from({ length: numObstacles }, (_, i) => {
      const t = startT + (i * step);
      const point = basePath.getPointAt(t);
      return {
        position: [point.x, 0, point.z],
        t: t,
        index: i,
        data: PILLAR_DATA[i],
      };
    });
  }, [basePath]);

  // Path goes straight through obstacles (no curving)
  const path = basePath;

  // Custom hooks for animations
  useCameraFollow(studentRef);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={2} castShadow />
      <pointLight position={[0, 10, 0]} intensity={1.5} color={PRIMARY_INDIGO} />

      {/* Path visualization */}
      <PathLine path={path} scroll={scroll} />

      <StudentCharacter 
        ref={studentRef}
        pathRef={{ current: path }} 
        scroll={scroll} 
        obstacles={obstacles}
      />

      {/* Obstacles */}
      {obstacles.map((obstacle, i) => (
        <Obstacle key={`obstacle-${i}`} position={obstacle.position} index={obstacle.index} />
      ))}

      {/* Ground */}
      <Ground />

      {/* Ambient particles - reduced count for better performance */}
      <Sparkles count={100} scale={30} size={1.5} speed={0.3} color={PRIMARY_INDIGO} opacity={0.5} />
    </>
  );
}
