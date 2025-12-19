import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function useOrbitingLight(lightRef) {
  useFrame(({ clock }) => {
    if (!lightRef.current) return;
    
    const t = clock.getElapsedTime();
    const radius = 8;
    lightRef.current.position.x = Math.sin(t * 0.4) * radius;
    lightRef.current.position.z = Math.cos(t * 0.5) * radius;
    lightRef.current.position.y = 3 + Math.sin(t * 0.6) * 2;
    
    // Color variation
    const hue = (t * 10) % 360;
    lightRef.current.color.setHSL(hue / 360, 0.7, 0.6);
  });
}
