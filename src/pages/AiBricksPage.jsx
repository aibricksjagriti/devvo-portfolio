import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, ScrollControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
import AiBricksScene from '../scenes/AiBricksScene.jsx';

export default function AiBricksPage() {
  const { t } = useTranslation();
  const numPages = 5;
  
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div className="relative w-full h-screen">
      <Canvas 
        camera={{ position: [0, 25, 40], fov: 70 }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#b4d4ff']} />
        <Suspense fallback={null}>
          <ScrollControls pages={numPages} damping={prefersReducedMotion ? 1 : 0.2}>
            <AiBricksScene />
            <Html fullscreen style={{ pointerEvents: 'none', color: 'white' }}>
              <div className="flex flex-col items-center justify-center w-full h-screen p-4 text-center" style={{ top: '0vh' }}>
                <motion.h2 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
                  className="text-4xl font-bold md:text-6xl"
                >
                  {t('aiBricksTitle')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.8 }}
                  viewport={{ amount: 0.5 }} 
                  className="max-w-lg mt-4 text-lg text-gray-300"
                >
                  {t('aiBricksIntro')}
                </motion.p>
              </div>
              <div className="flex items-center w-full h-screen" style={{ top: `${100 * (numPages / 5)}vh` }}>
                <div className="w-1/2 p-8 ml-auto">
                  <motion.h3 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="text-3xl font-bold text-cyan-400"
                  >
                    {t('aiBricksFeature1Title')}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="mt-2 text-gray-300"
                  >
                    {t('aiBricksFeature1Desc')}
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center w-full h-screen" style={{ top: `${200 * (numPages / 5)}vh` }}>
                <div className="w-1/2 p-8 mr-auto">
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="text-3xl font-bold text-cyan-400"
                  >
                    {t('aiBricksFeature2Title')}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="mt-2 text-gray-300"
                  >
                    {t('aiBricksFeature2Desc')}
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center w-full h-screen" style={{ top: `${300 * (numPages / 5)}vh` }}>
                <div className="w-1/2 p-8 ml-auto">
                  <motion.h3 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="text-3xl font-bold text-cyan-400"
                  >
                    Sustainable Development
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, x: 20 }} 
                    whileInView={{ opacity: 1, x: 0 }} 
                    transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0 : 0.6 }}
                    className="mt-2 text-gray-300"
                  >
                    Integrating green spaces, efficient infrastructure, and eco-friendly construction practices for a better tomorrow.
                  </motion.p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center w-full h-screen p-4 text-center" style={{ top: `${400 * (numPages / 5)}vh` }}>
                <motion.h2 
                  initial={{ opacity: 0, scale: 0.5 }} 
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
                  className="text-4xl font-bold md:text-6xl"
                >
                  {t('aiBricksFinal')}
                </motion.h2>
              </div>
            </Html>
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
