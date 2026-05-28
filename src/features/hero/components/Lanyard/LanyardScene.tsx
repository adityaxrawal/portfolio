/* eslint-disable react/no-unknown-property */
'use client';

import { Environment, Lightformer } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { motion, useReducedMotion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import * as THREE from 'three';

import { LanyardBand } from './LanyardBand';
import { initMeshLine } from './lanyardSetup';

initMeshLine();
import './Lanyard.css';

export interface LanyardSceneProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

type LanyardState = 'entering' | 'dropped' | 'retracting' | 'retracted';

export default function LanyardScene({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}: LanyardSceneProps) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 1024,
  );

  const prefersReducedMotion = useReducedMotion();
  const [lanyardState, setLanyardState] = useState<LanyardState>('entering');
  const [isUserTriggered, setIsUserTriggered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setLanyardState('retracted');
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile || prefersReducedMotion) return;

    let timeout: ReturnType<typeof setTimeout>;

    if (lanyardState === 'entering') {
      if (!isUserTriggered) {
        timeout = setTimeout(() => {
          setLanyardState('retracting');
        }, 2400); // 900ms animation + 1500ms pause
      } else {
        timeout = setTimeout(() => {
          setLanyardState('dropped');
        }, 900);
      }
    } else if (lanyardState === 'retracting') {
      timeout = setTimeout(() => {
        setLanyardState('retracted');
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [lanyardState, isMobile, prefersReducedMotion, isUserTriggered]);

  const handlePullTabClick = () => {
    setIsUserTriggered(true);
    setLanyardState('entering');
  };

  const handleDismissClick = () => {
    setLanyardState('retracting');
  };

  const getTransition = () => {
    if (lanyardState === 'entering' || lanyardState === 'dropped') {
      return {
        type: 'tween' as const,
        duration: 0.9,
        ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
      };
    }
    return {
      type: 'tween' as const,
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    };
  };

  const isLanyardDown =
    lanyardState === 'entering' || lanyardState === 'dropped';

  return (
    <>
      {isMobile && (
        <motion.div
          className="lanyard-pull-tab"
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: lanyardState === 'retracted' ? 1 : 0,
            y: lanyardState === 'retracted' ? 0 : -20,
            pointerEvents: lanyardState === 'retracted' ? 'auto' : 'none',
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          role="button"
          tabIndex={lanyardState === 'retracted' ? 0 : -1}
          aria-label="Show ID card"
          onClick={handlePullTabClick}
          onKeyDown={(e) =>
            (e.key === 'Enter' || e.key === ' ') && handlePullTabClick()
          }
        >
          <HiChevronDown size={20} />
        </motion.div>
      )}

      <motion.div
        className="lanyard-container"
        animate={isMobile ? { y: isLanyardDown ? 0 : '-120%' } : { y: 0 }}
        transition={
          isMobile && !prefersReducedMotion ? getTransition() : { duration: 0 }
        }
        aria-hidden="true"
        style={{
          pointerEvents: isMobile ? (isLanyardDown ? 'auto' : 'none') : 'auto',
        }}
      >
        <div className="lanyard-wrapper">
          <Canvas
            camera={{ position: position, fov: fov }}
            dpr={[1, isMobile ? 1.5 : 2]}
            gl={{ alpha: transparent }}
            onCreated={({ gl }) =>
              gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
            }
          >
            <ambientLight intensity={Math.PI} />
            <Suspense fallback={null}>
              <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
                <LanyardBand isMobile={isMobile} />
              </Physics>
            </Suspense>
            <Environment blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Canvas>
        </div>

        {isMobile && (
          <motion.div
            className="lanyard-dismiss-btn"
            initial={{ opacity: 0 }}
            animate={{
              opacity: lanyardState === 'dropped' ? 1 : 0,
              pointerEvents: lanyardState === 'dropped' ? 'auto' : 'none',
            }}
            transition={{
              duration: lanyardState === 'dropped' ? 0.25 : 0.15,
              ease: lanyardState === 'dropped' ? 'easeOut' : 'easeIn',
            }}
            role="button"
            tabIndex={lanyardState === 'dropped' ? 0 : -1}
            aria-label="Hide ID card"
            onClick={handleDismissClick}
            onKeyDown={(e) =>
              (e.key === 'Enter' || e.key === ' ') && handleDismissClick()
            }
          >
            <span>Snap up</span>
            <HiChevronUp size={16} />
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
