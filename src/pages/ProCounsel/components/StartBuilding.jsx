import React from 'react';
import { Box, Text, Sparkles } from '@react-three/drei';
import { ACCENT_GREEN, ACCENT_GREEN_DARK, WHITE } from '../colors';

export default function StartBuilding({ t }) {
  return (
    <group position={[-12, 0, 12]}>
      <Box args={[3, 4, 3]} castShadow receiveShadow>
        <meshStandardMaterial color={ACCENT_GREEN} metalness={0.5} roughness={0.6} />
      </Box>
      <Box args={[2.5, 2.5, 0.2]} position={[0, 2, 1.6]}>
        <meshStandardMaterial color={ACCENT_GREEN_DARK} />
      </Box>
      <Text 
        position={[0, 2.5, 1.6]} 
        fontSize={0.4} 
        color={WHITE} 
        anchorX="center"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {t('proCounselStart')}
      </Text>
      <Sparkles count={100} scale={[5, 5, 5]} position={[0, 2, 0]} color={ACCENT_GREEN} />
    </group>
  );
}
