import React from 'react';
import { Box, Text, Sparkles } from '@react-three/drei';
import { ACCENT_YELLOW, ACCENT_YELLOW_DARK, WHITE } from '../colors';

export default function EndBuilding({ t }) {
  return (
    <group position={[12, 0, 12]}>
      <Box args={[4, 5, 4]} castShadow receiveShadow>
        <meshStandardMaterial color={ACCENT_YELLOW} metalness={0.7} roughness={0.4} />
      </Box>
      <Box args={[3.5, 3, 0.2]} position={[0, 2.5, 2.1]}>
        <meshStandardMaterial color={ACCENT_YELLOW_DARK} />
      </Box>
      <Text 
        position={[0, 3.2, 2.1]} 
        fontSize={0.5} 
        color={WHITE} 
        anchorX="center"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {t('proCounselEnd')}
      </Text>
      <Sparkles count={150} scale={[6, 6, 6]} position={[0, 2.5, 0]} color={ACCENT_YELLOW} />
    </group>
  );
}
