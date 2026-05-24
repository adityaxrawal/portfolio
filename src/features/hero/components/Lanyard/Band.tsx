/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from '@react-three/drei';
import { type RootState, type ThreeEvent, useFrame } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import type { RapierRigidBody } from '@react-three/rapier';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

import {
  createCardFaceGeometry,
  drawBackCard,
  drawFrontCard,
  useCardTexture,
} from './lanyardCardRendering';
import {
  BACK_CARD_UV,
  FRONT_CARD_UV,
  MATHCO_PURPLE_DARK,
} from './lanyardConstants';

import { useSharedState } from '@/app';
import mathcoLogoPic from '@/assets/images/companies/mathco_logo.webp';
import profilePic from '@/assets/images/my/me-2.webp';
import cardGLB from '@/assets/models/card.glb';

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

/**
 * Band component: Manages rope physics, card interaction, and rendering.
 *
 * Responsibilities:
 * - Physics simulation (rope joints, card collider)
 * - Pointer interaction handling (drag, flip)
 * - Card texture and geometry management
 * - 3D rendering (card meshes, lanyard strap)
 *
 * This component is extracted from Lanyard.tsx to improve maintainability.
 */
export const Band = React.memo(
  ({ maxSpeed = 50, minSpeed = 0, isMobile = false }: BandProps) => {
    const { isDarkTheme } = useSharedState();

    // ─────────────────────────────────────────────────────────────
    // Physics refs
    // ─────────────────────────────────────────────────────────────
    const band = useRef<THREE.Mesh | null>(null);
    const fixed = useRef<RapierRigidBody>(null!);
    const j1 = useRef<RapierRigidBody>(null!);
    const j2 = useRef<RapierRigidBody>(null!);
    const j3 = useRef<RapierRigidBody>(null!);
    const card = useRef<RapierRigidBody>(null!);
    const cardVisual = useRef<THREE.Group>(null!);

    // WeakMap to store lerped Vector3 per rigid body — avoids runtime property
    // injection on foreign objects (replaces the previous `as any` pattern).
    const lerpedMap = useRef(new WeakMap<RapierRigidBody, THREE.Vector3>());

    // ─────────────────────────────────────────────────────────────
    // Pointer state tracking
    // ─────────────────────────────────────────────────────────────
    const pressState = useRef({
      active: false,
      pointerId: null as number | null,
      startX: 0,
      startY: 0,
      maxDistance: 0,
    });

    // ─────────────────────────────────────────────────────────────
    // Reusable Three.js vectors
    // ─────────────────────────────────────────────────────────────
    const vec = useMemo(() => new THREE.Vector3(), []);
    const ang = useMemo(() => new THREE.Vector3(), []);
    const rot = useMemo(() => new THREE.Vector3(), []);
    const dir = useMemo(() => new THREE.Vector3(), []);

    // ─────────────────────────────────────────────────────────────
    // Physics segment properties
    // ─────────────────────────────────────────────────────────────
    const segmentProps = useMemo(
      () => ({
        type: 'dynamic' as const,
        canSleep: true,
        colliders: false as const,
        angularDamping: 4,
        linearDamping: 4,
      }),
      [],
    );

    // ─────────────────────────────────────────────────────────────
    // Asset loading
    // ─────────────────────────────────────────────────────────────
    const { nodes } = useGLTF(cardGLB);
    const profileTexture = useTexture(profilePic);
    const mathcoLogoTexture = useTexture(mathcoLogoPic);

    // ─────────────────────────────────────────────────────────────
    // Card textures
    // ─────────────────────────────────────────────────────────────
    const frontTexture = useCardTexture(
      (ctx) =>
        drawFrontCard(
          ctx,
          profileTexture.image as HTMLImageElement,
          mathcoLogoTexture.image as HTMLImageElement,
          isDarkTheme,
        ),
      FRONT_CARD_UV,
      [profileTexture.image, mathcoLogoTexture.image, isDarkTheme],
    );

    const backTexture = useCardTexture(
      (ctx) => drawBackCard(ctx, isDarkTheme),
      BACK_CARD_UV,
      [isDarkTheme],
    );

    // ─────────────────────────────────────────────────────────────
    // Card geometries
    // ─────────────────────────────────────────────────────────────
    const { frontGeometry, backGeometry } = useMemo(
      () => ({
        frontGeometry: createCardFaceGeometry((nodes.card as THREE.Mesh).geometry, 1),
        backGeometry: createCardFaceGeometry((nodes.card as THREE.Mesh).geometry, -1),
      }),
      [nodes.card],
    );

    // ─────────────────────────────────────────────────────────────
    // Rope curve
    // ─────────────────────────────────────────────────────────────
    const [curve] = useState(
      () =>
        new THREE.CatmullRomCurve3([
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
          new THREE.Vector3(),
        ]),
    );

    // ─────────────────────────────────────────────────────────────
    // Card interaction state
    // ─────────────────────────────────────────────────────────────
    const [dragged, drag] = useState<THREE.Vector3 | false>(false);
    const [hovered, hover] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipTargetY = isFlipped ? Math.PI : 0;
    const clickThreshold = 8;

    // ─────────────────────────────────────────────────────────────
    // Physics joints
    // ─────────────────────────────────────────────────────────────
    useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.125]);
    useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.125]);
    useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.125]);
    useSphericalJoint(j3, card, [
      [0, 0, 0],
      [0, 2.25, 0],
    ]);

    // ─────────────────────────────────────────────────────────────
    // Cursor management
    // ─────────────────────────────────────────────────────────────
    useEffect(() => {
      if (hovered) {
        document.body.style.cursor = dragged ? 'grabbing' : 'grab';
        return () => void (document.body.style.cursor = 'auto');
      }
    }, [hovered, dragged]);

    // ─────────────────────────────────────────────────────────────
    // Pointer event handlers
    // ─────────────────────────────────────────────────────────────
    const clearPressState = useCallback(() => {
      pressState.current.active = false;
      pressState.current.pointerId = null;
      pressState.current.startX = 0;
      pressState.current.startY = 0;
      pressState.current.maxDistance = 0;
    }, []);

    type PointerEventWithPoint = ThreeEvent<PointerEvent> & {
      point: THREE.Vector3;
    };

    const handlePointerDown = useCallback(
      (e: PointerEventWithPoint) => {
        const target = e.target as EventTarget & {
          setPointerCapture?: (id: number) => void;
          releasePointerCapture?: (id: number) => void;
        };

        target.setPointerCapture?.(e.pointerId);
        pressState.current.active = true;
        pressState.current.pointerId = e.pointerId;
        pressState.current.startX = e.clientX;
        pressState.current.startY = e.clientY;
        pressState.current.maxDistance = 0;
        drag(
          new THREE.Vector3()
            .copy(e.point)
            .sub(vec.copy(card.current?.translation() || new THREE.Vector3())),
        );
      },
      [drag, vec],
    );

    const handlePointerMove = useCallback((e: PointerEvent) => {
      if (
        !pressState.current.active ||
        pressState.current.pointerId !== e.pointerId
      ) {
        return;
      }

      const distance = Math.hypot(
        e.clientX - pressState.current.startX,
        e.clientY - pressState.current.startY,
      );
      pressState.current.maxDistance = Math.max(
        pressState.current.maxDistance,
        distance,
      );
    }, []);

    const handlePointerUp = useCallback(
      (e: PointerEvent) => {
        const wasClick =
          pressState.current.active &&
          pressState.current.pointerId === e.pointerId &&
          pressState.current.maxDistance <= clickThreshold;

        (e.target as Element | null)?.releasePointerCapture?.(e.pointerId);
        drag(false);
        clearPressState();

        if (wasClick) {
          setIsFlipped((prev) => !prev);
        }
      },
      [drag, clearPressState],
    );

    const handlePointerCancel = useCallback(
      (e: PointerEvent) => {
        (e.target as Element | null)?.releasePointerCapture?.(e.pointerId);
        drag(false);
        clearPressState();
      },
      [drag, clearPressState],
    );

    // ─────────────────────────────────────────────────────────────
    // Physics animation loop
    // ─────────────────────────────────────────────────────────────
    useFrame((state: RootState, delta: number) => {
      if (dragged) {
        const dragVector = dragged as THREE.Vector3;
        vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
        dir.copy(vec).sub(state.camera.position).normalize();
        vec.add(dir.multiplyScalar(state.camera.position.length()));
        [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
        card.current?.setNextKinematicTranslation({
          x: vec.x - dragVector.x,
          y: vec.y - dragVector.y,
          z: vec.z - dragVector.z,
        });
      }

      if (fixed.current) {
        [j1, j2].forEach((ref) => {
          const body = ref.current;
          if (!body) return;
          // Retrieve or initialise the lerped position for this body
          if (!lerpedMap.current.has(body)) {
            lerpedMap.current.set(
              body,
              new THREE.Vector3().copy(body.translation()),
            );
          }
          const lerped = lerpedMap.current.get(body)!;
          const clampedDistance = Math.max(
            0.1,
            Math.min(1, lerped.distanceTo(body.translation())),
          );
          lerped.lerp(
            body.translation(),
            delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
          );
        });

        const j2Lerped = j2.current ? lerpedMap.current.get(j2.current) : null;
        const j1Lerped = j1.current ? lerpedMap.current.get(j1.current) : null;

        curve.points[0].copy(j3.current!.translation());
        if (j2Lerped) curve.points[1].copy(j2Lerped);
        if (j1Lerped) curve.points[2].copy(j1Lerped);
        curve.points[3].copy(fixed.current.translation());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (band.current!.geometry as any).setPoints(curve.getPoints(isMobile ? 16 : 32));

        ang.copy(card.current!.angvel());
        rot.copy(card.current!.rotation());
        card.current!.setAngvel({
          x: ang.x,
          y: ang.y - rot.y * 0.25,
          z: ang.z,
        }, true);
      }

      if (cardVisual.current) {
        cardVisual.current.rotation.y = THREE.MathUtils.damp(
          cardVisual.current.rotation.y,
          flipTargetY,
          10,
          delta,
        );
      }
    });

    curve.curveType = 'chordal';

    return (
      <>
        {/* Physics rope and card */}
        <group position={[0, 6, 0]}>
          <RigidBody ref={fixed} {...segmentProps} type="fixed" />
          <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
            <BallCollider args={[0.1]} />
          </RigidBody>
          <RigidBody
            position={[2, 0, 0]}
            ref={card}
            {...segmentProps}
            type={dragged ? 'kinematicPosition' : 'dynamic'}
          >
            <CuboidCollider args={[1.2, 1.6875, 0.015]} />
            <group
              scale={3.375}
              position={[0, -1.8, -0.075]}
              onPointerOver={() => hover(true)}
              onPointerOut={() => hover(false)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <group ref={cardVisual}>
                {/* Front face */}
                <mesh geometry={frontGeometry}>
                  <meshPhysicalMaterial
                    map={frontTexture}
                    clearcoat={1}
                    clearcoatRoughness={0.08}
                    roughness={0.2}
                    metalness={0}
                    reflectivity={0.85}
                    ior={1.45}
                    side={THREE.FrontSide}
                  />
                </mesh>

                {/* Back face */}
                <mesh geometry={backGeometry}>
                  <meshPhysicalMaterial
                    map={backTexture}
                    clearcoat={1}
                    clearcoatRoughness={0.08}
                    roughness={0.2}
                    metalness={0}
                    reflectivity={0.85}
                    ior={1.45}
                    side={THREE.FrontSide}
                  />
                </mesh>

                {/* Clip and clamp */}
                <mesh geometry={(nodes.clip as THREE.Mesh).geometry}>
                  <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.05}
                    clearcoat={1}
                    envMapIntensity={3}
                  />
                </mesh>
                <mesh geometry={(nodes.clamp as THREE.Mesh).geometry}>
                  <meshPhysicalMaterial
                    color="#ffffff"
                    metalness={1}
                    roughness={0.05}
                    clearcoat={1}
                    envMapIntensity={3}
                  />
                </mesh>
              </group>
            </group>
          </RigidBody>
        </group>

        {/* Lanyard strap */}
        <mesh ref={band}>
          <meshLineGeometry />
          <meshLineMaterial
            color={MATHCO_PURPLE_DARK}
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            lineWidth={1}
          />
        </mesh>
      </>
    );
  },
);

Band.displayName = 'Band';
