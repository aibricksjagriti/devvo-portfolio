import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Custom hook for camera animation in AiBricks scene
 * @param {Object} scroll - Scroll object from useScroll
 * @param {Object} groupRef - Reference to main scene group
 */
export const useCameraAnimation = (scroll, groupRef) => {
  const { camera } = useThree();

  useFrame((state) => {
    const scrollProgress = scroll.offset;
    const time = state.clock.getElapsedTime();
    
    // Target camera position based on scroll - closer view
    const targetZ = 28 - scrollProgress * 8;
    const targetY = 18 + scrollProgress * 10;
    const targetX = Math.sin(scrollProgress * Math.PI * 0.5) * 4;
    
    // Smooth camera position with mouse interaction
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x, 
      targetX + state.mouse.x * 2, 
      0.05
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y, 
      targetY - state.mouse.y * 1.5, 
      0.05
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z, 
      targetZ, 
      0.05
    );
    
    // // Look at center of scene, slightly adjusted based on scroll
    // const lookAtY = scrollProgress * 10;
    // camera.lookAt(0, lookAtY, 0);
  });
};
