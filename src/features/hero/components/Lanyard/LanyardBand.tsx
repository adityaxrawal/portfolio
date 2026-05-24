/* eslint-disable react/no-unknown-property */
import { useGLTF, useTexture } from '@react-three/drei';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import type { RapierRigidBody as RapierBody } from '@react-three/rapier';
import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import profilePic from '@/assets/images/my/me-2.webp';
import mathcoLogoPic from '@/assets/images/companies/mathco_logo.webp';
import cardGLB from '@/assets/models/card.glb';
import { useSharedState } from '@/app';

import { drawBackCard, drawFrontCard } from './lanyardCardDrawing';
import { createCardFaceGeometry, useCardTexture } from './lanyardCardGeometry';
import { BACK_CARD_UV, FRONT_CARD_UV, MATHCO_PURPLE_DARK } from './lanyardConstants';
import type {
  LanyardCardNodes,
  LanyardDragOffset,
  LanyardRigidBody,
  MeshLineGeometryWithPoints,
} from './lanyardTypes';
import './lanyardSetup';

const asBodyRef = (ref: RefObject<RapierBody | null>) =>
  ref as RefObject<RapierBody>;

const getPointerElement = (event: ThreeEvent<PointerEvent>) =>
  event.nativeEvent.target as HTMLElement;

export interface LanyardBandProps {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
}

export function LanyardBand({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const { isDarkTheme } = useSharedState();
  const band = useRef<THREE.Mesh | null>(null),
    fixed = useRef<RapierBody | null>(null),
    j1 = useRef<LanyardRigidBody | null>(null),
    j2 = useRef<LanyardRigidBody | null>(null),
    j3 = useRef<RapierBody | null>(null),
    card = useRef<RapierBody | null>(null),
    cardVisual = useRef<THREE.Group | null>(null),
    pressState = useRef({
      active: false,
      pointerId: null as number | null,
      startX: 0,
      startY: 0,
      maxDistance: 0,
    });

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic' as const,
    canSleep: true,
    colliders: false as const,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(cardGLB) as unknown as { nodes: LanyardCardNodes };
  // const texture = useTexture(lanyard);
  const profileTexture = useTexture(profilePic);
  const mathcoLogoTexture = useTexture(mathcoLogoPic);

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
  const { frontGeometry, backGeometry } = useMemo(
    () => ({
      frontGeometry: createCardFaceGeometry(nodes.card.geometry, 1),
      backGeometry: createCardFaceGeometry(nodes.card.geometry, -1),
    }),
    [nodes.card.geometry],
  );

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState<LanyardDragOffset>(false);
  const [hovered, hover] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipTargetY = isFlipped ? Math.PI : 0;
  const clickThreshold = 8;

  useRopeJoint(asBodyRef(fixed), asBodyRef(j1), [[0, 0, 0], [0, 0, 0], 1.125]);
  useRopeJoint(asBodyRef(j1), asBodyRef(j2), [[0, 0, 0], [0, 0, 0], 1.125]);
  useRopeJoint(asBodyRef(j2), asBodyRef(j3), [[0, 0, 0], [0, 0, 0], 1.125]);
  useSphericalJoint(asBodyRef(j3), asBodyRef(card), [
    [0, 0, 0],
    [0, 2.25, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const clearPressState = useCallback(() => {
    pressState.current.active = false;
    pressState.current.pointerId = null;
    pressState.current.startX = 0;
    pressState.current.startY = 0;
    pressState.current.maxDistance = 0;
  }, []);

  const handlePointerDown = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      getPointerElement(e).setPointerCapture(e.pointerId);
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
    [drag, card, vec],
  );

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
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
    (e: ThreeEvent<PointerEvent>) => {
      const wasClick =
        pressState.current.active &&
        pressState.current.pointerId === e.pointerId &&
        pressState.current.maxDistance <= clickThreshold;

      getPointerElement(e).releasePointerCapture?.(e.pointerId);
      drag(false);
      clearPressState();

      if (wasClick) {
        setIsFlipped((prev) => !prev);
      }
    },
    [drag, clearPressState, clickThreshold],
  );

  const handlePointerCancel = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      getPointerElement(e).releasePointerCapture?.(e.pointerId);
      drag(false);
      clearPressState();
    },
    [drag, clearPressState],
  );

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      for (const ref of [j1, j2] as const) {
        const body = ref.current;
        if (!body) continue;
        if (!body.lerped) {
          body.lerped = new THREE.Vector3().copy(body.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, body.lerped.distanceTo(body.translation())),
        );
        body.lerped.lerp(
          body.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      }
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped!);
      curve.points[2].copy(j1.current.lerped!);
      curve.points[3].copy(fixed.current.translation());
      const bandGeometry = band.current?.geometry as MeshLineGeometryWithPoints | undefined;
      bandGeometry?.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel(
        { x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z },
        true,
      );
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
  // if (texture) {
  //   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  //   texture.anisotropy = 16;
  // }

  return (
    <>
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
              {/* ── FRONT FACE ───────────────────────────────────────── */}
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

              {/* ── BACK FACE ────────────────────────────────────────── */}
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

              {/* ── Clip & clamp (unchanged) ───────────────────────── */}
              <mesh geometry={nodes.clip.geometry}>
                <meshPhysicalMaterial
                  color="#ffffff"
                  metalness={1}
                  roughness={0.05}
                  clearcoat={1}
                  envMapIntensity={3}
                />
              </mesh>
              <mesh geometry={nodes.clamp.geometry}>
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

      {/* ── Lanyard strap ────────────────────────────────────────── */}
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
}
