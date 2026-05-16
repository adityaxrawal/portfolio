// @ts-nocheck - Legacy 3D physics implementation with complex Three.js and Rapier type interactions that require further refactoring.
/* eslint-disable react/no-unknown-property */
'use client';
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import type { RigidBody as RigidBodyType } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

import profilePic from '../../../assets/images/my/me-2.webp';

import cardGLB from './card.glb';
import lanyard from './lanyard.webp';
import mathcoLogoPic from './mathco_logo.webp';

import { useSharedState } from '@/app/providers/AppContext';

import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const CARD_TEXTURE_WIDTH = 512;
const CARD_TEXTURE_HEIGHT = 720;
const BACK_ICON_SIZE = 22;
const BAND_REPEAT = 6.5;
const MATHCO_PURPLE_DARK = '#260048';
const MATHCO_PEACH = '#FFA781'; // MathCo Peach accent color
const CARD_INK = '#222225';
const FRONT_CARD_UV = {
  x: 0.0008521821000613272,
  y: 0.004251599311828613,
  width: 0.4980454597971402,
  height: 0.7505821585655212,
};
const BACK_CARD_UV = {
  x: 0.5014492869377136,
  y: 0.0022884607315063477,
  width: 0.49848395586013794,
  height: 0.7548875207138062,
};

function setupCardTexture(
  texture: THREE.Texture,
  uvRect: { x: number; y: number; width: number; height: number },
) {
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.flipY = false;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1 / uvRect.width, 1 / uvRect.height);
  texture.offset.set(-uvRect.x / uvRect.width, -uvRect.y / uvRect.height);
  texture.needsUpdate = true;
  return texture;
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - safeRadius,
    y + height,
  );
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillStyle: string,
) {
  ctx.save();
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  strokeStyle: string,
  lineWidth: number,
) {
  ctx.save();
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.restore();
}

interface ExclusionZone {
  x: number;
  y: number;
  w: number;
  h: number;
}

function drawFrontDotField(
  ctx: CanvasRenderingContext2D,
  exclusionZones: ExclusionZone[] = [],
  isDarkTheme: boolean,
) {
  ctx.save();
  ctx.fillStyle = isDarkTheme ? '#151515' : 'rgba(230, 230, 230, 1)';

  for (let y = 78; y <= 676; y += 56) {
    for (let x = 34; x <= 462; x += 62) {
      const jitterX = Math.sin(x * 0.17 + y * 0.11) * 3.2;
      const jitterY = Math.cos(x * 0.13 - y * 0.09) * 2.6;
      const dotX = x + jitterX;
      const dotY = y + jitterY;

      let inExclusionZone = false;
      for (const zone of exclusionZones) {
        if (
          dotX >= zone.x &&
          dotX <= zone.x + zone.w &&
          dotY >= zone.y &&
          dotY <= zone.y + zone.h
        ) {
          inExclusionZone = true;
          break;
        }
      }

      if (!inExclusionZone) {
        const radius = 1.35 + (Math.sin((x + y) * 0.04) + 1) * 0.28;
        ctx.beginPath();
        ctx.arc(dotX, dotY, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();
}

function drawFrontCardDetails(
  ctx: CanvasRenderingContext2D,
  isDarkTheme: boolean,
) {
  const textColor = isDarkTheme ? CARD_INK : '#ffffff';
  const idColor = isDarkTheme ? '#343039' : 'rgba(255,255,255,0.7)';

  ctx.save();
  ctx.translate(40, 538);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = idColor;
  ctx.font = '600 10px "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
  ctx.letterSpacing = '0.4px';
  ctx.fillText('MATHCO ID #001223', 0, 0);
  ctx.restore();

  ctx.fillStyle = textColor;
  ctx.font = '500 30px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Aditya Rawal', 468, 653);

  ctx.fillStyle = textColor;
  ctx.font = '400 26px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Software Engineer', 468, 683);
  ctx.textAlign = 'left';
}

function drawFrontCard(
  ctx: CanvasRenderingContext2D,
  profileImage: HTMLImageElement | null,
  logoImage: HTMLImageElement | null,
  isDarkTheme: boolean,
) {
  // 1. Draw the base background
  if (isDarkTheme) {
    // Light mode base
    const paperGradient = ctx.createLinearGradient(
      0,
      0,
      CARD_TEXTURE_WIDTH,
      CARD_TEXTURE_HEIGHT,
    );
    paperGradient.addColorStop(0, '#fbfbf8');
    paperGradient.addColorStop(0.48, '#f4f3ef');
    paperGradient.addColorStop(1, '#ecebe6');
    ctx.fillStyle = paperGradient;
  } else {
    // Dark mode bottom section (base)
    ctx.fillStyle = '#262626';
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, CARD_TEXTURE_HEIGHT);

  // 2. Draw the top dual-tone section
  if (isDarkTheme) {
    // Light mode uses an explicit cool-grey to contrast with the warm bottom section
    ctx.fillStyle = '#b1b1b1ff';
    ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);
  } else {
    // Dark mode uses an explicit solid lighter grey
    ctx.fillStyle = '#737373';
    ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);
  }

  const exclusionZones = [
    { x: 20, y: 50, w: 280, h: 130 }, // Top-left text
    { x: 20, y: 400, w: 40, h: 150 }, // Bottom-rotated ID text
    { x: 150, y: 610, w: 330, h: 100 }, // Bottom-right name and title
  ];

  drawFrontDotField(ctx, exclusionZones, isDarkTheme);

  const textColor = isDarkTheme ? CARD_INK : '#ffffff';

  ctx.fillStyle = textColor;
  ctx.font = '400 45px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Own your', 34, 104);
  ctx.fillText('Intelligence', 34, 159);

  const imageX = 236;
  const imageY = 272;
  const imageSize = 238;
  fillRoundedRect(ctx, imageX, imageY, imageSize, imageSize, 8, '#deddd8');

  if (profileImage) {
    ctx.save();
    drawRoundedRectPath(ctx, imageX, imageY, imageSize, imageSize, 8);
    ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawImageCover(ctx, profileImage, imageX, imageY, imageSize, imageSize);
    ctx.restore();
  }

  if (logoImage) {
    ctx.save();

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = logoImage.naturalWidth || logoImage.width;
    tempCanvas.height = logoImage.naturalHeight || logoImage.height;
    const tCtx = tempCanvas.getContext('2d');

    tCtx.drawImage(logoImage, 0, 0);
    tCtx.globalCompositeOperation = 'source-in';
    tCtx.fillStyle = isDarkTheme ? MATHCO_PURPLE_DARK : MATHCO_PEACH;
    tCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    const logoSize = 106;
    const scale = Math.min(
      logoSize / tempCanvas.width,
      logoSize / tempCanvas.height,
    );
    const w = tempCanvas.width * scale;
    const h = tempCanvas.height * scale;
    ctx.drawImage(
      tempCanvas,
      195 + (logoSize - 1.5 * w) / 2,
      428 + (logoSize - 0.5 * h) / 2,
      w,
      h,
    );
    ctx.restore();
  }

  drawFrontCardDetails(ctx, isDarkTheme);
}

function drawInfoIcon(
  ctx: CanvasRenderingContext2D,
  icon: string,
  x: number,
  y: number,
  isDarkTheme: boolean,
) {
  ctx.fillStyle = isDarkTheme ? CARD_INK : '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, BACK_ICON_SIZE, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = isDarkTheme ? '#ffffff' : 'rgba(35, 35, 35, 1)';
  ctx.fillStyle = isDarkTheme ? '#ffffff' : 'rgba(35, 35, 35, 1)';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (icon === 'user') {
    ctx.beginPath();
    ctx.arc(x, y - 7, 5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y + 10, 11, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    return;
  }

  if (icon === 'mail') {
    ctx.strokeRect(x - 10, y - 7, 20, 14);
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 7);
    ctx.lineTo(x, y + 2);
    ctx.lineTo(x + 10, y - 7);
    ctx.stroke();
    return;
  }

  ctx.font = '700 10px Arial, Helvetica, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CO', x, y + 1);
  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
}

function drawBackCard(ctx: CanvasRenderingContext2D, isDarkTheme: boolean) {
  // 1. Draw the base background
  if (isDarkTheme) {
    const paperGradient = ctx.createLinearGradient(
      0,
      0,
      CARD_TEXTURE_WIDTH,
      CARD_TEXTURE_HEIGHT,
    );
    paperGradient.addColorStop(0, '#fbfbf8');
    paperGradient.addColorStop(0.48, '#f4f3ef');
    paperGradient.addColorStop(1, '#ecebe6');
    ctx.fillStyle = paperGradient;
  } else {
    ctx.fillStyle = '#262626'; // Match the front card's dark bottom
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, CARD_TEXTURE_HEIGHT);

  // 2. Draw the top dual-tone section
  if (isDarkTheme) {
    ctx.fillStyle = '#b1b1b1ff'; // Light mode top section
  } else {
    ctx.fillStyle = '#737373'; // Dark mode top section
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);

  const exclusionZones = [
    { x: 110, y: 240 - 60, w: 356, h: 120 }, // Employee ID row
    { x: 110, y: 395 - 60, w: 356, h: 120 }, // Email row
    { x: 110, y: 550 - 60, w: 356, h: 120 }, // Company row
  ];
  drawFrontDotField(ctx, exclusionZones, isDarkTheme);

  ctx.fillStyle = isDarkTheme ? MATHCO_PURPLE_DARK : MATHCO_PEACH;
  ctx.font = '700 88px Arial, Helvetica, sans-serif';
  ctx.save();
  ctx.translate(96, 390);
  ctx.rotate(-Math.PI / 2);
  ctx.globalAlpha = 0.5;
  ctx.fillText('mathco', 0, 0);
  ctx.restore();
  ctx.globalAlpha = 1;

  const rows = [
    { icon: 'user', label: 'EMPLOYEE ID', value: '#001223', y: 240 },
    { icon: 'mail', label: 'EMAIL', value: 'ar.adityarawal@gmail', y: 395 },
    { icon: 'company', label: 'COMPANY', value: 'MathCo', y: 550 },
  ];

  const textColor = isDarkTheme ? CARD_INK : '#ffffff';
  const rowBg = isDarkTheme ? 'rgba(0,0,0,0.03)' : 'rgba(255,255,255,0.05)';
  const rowBorder = isDarkTheme ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)';
  const divider = isDarkTheme ? '#000000' : '#ffffff';
  const valueColor = isDarkTheme ? MATHCO_PURPLE_DARK : '#ffffff';

  rows.forEach((row, index) => {
    fillRoundedRect(ctx, 120, row.y - 52, 336, 104, 26, rowBg);
    strokeRoundedRect(ctx, 120, row.y - 52, 336, 104, 26, rowBorder, 1);

    drawInfoIcon(ctx, row.icon, 168, row.y, isDarkTheme);

    ctx.fillStyle = textColor;
    ctx.font = '400 15px "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(row.label, 214, row.y - 14);

    ctx.fillStyle = valueColor;
    ctx.font = '400 22px "SF Pro Text", "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(row.value, 214, row.y + 16);

    if (index < rows.length - 1) {
      ctx.fillStyle = divider;
      ctx.globalAlpha = 0.08;
      ctx.fillRect(144, row.y + 76, 300, 2);
      ctx.globalAlpha = 1;
    }
  });
}

function useCardTexture(
  drawCard: (ctx: CanvasRenderingContext2D) => void,
  uvRect: { x: number; y: number; width: number; height: number },
  deps: unknown[] = [],
) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = CARD_TEXTURE_WIDTH;
    canvas.height = CARD_TEXTURE_HEIGHT;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    drawCard(ctx);
    return setupCardTexture(new THREE.CanvasTexture(canvas), uvRect);
  }, [drawCard, uvRect, ...deps]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

function createCardFaceGeometry(
  geometry: THREE.BufferGeometry,
  normalDirection: number,
) {
  const source = geometry.index
    ? Array.from(geometry.index.array)
    : Array.from({ length: geometry.attributes.position.count }, (_, i) => i);
  const normals = geometry.attributes.normal;
  const indices = [];

  for (let i = 0; i < source.length; i += 3) {
    const a = source[i];
    const b = source[i + 1];
    const c = source[i + 2];
    const averageNormalZ =
      (normals.getZ(a) + normals.getZ(b) + normals.getZ(c)) / 3;

    if (averageNormalZ * normalDirection > 0.9) {
      indices.push(a, b, c);
    }
  }

  const faceGeometry = geometry.clone();
  faceGeometry.setIndex(indices);
  faceGeometry.clearGroups();
  faceGeometry.computeBoundingSphere();
  return faceGeometry;
}

// ─────────────────────────────────────────────────────────────────
// Root export — unchanged except for the card mesh section
// ─────────────────────────────────────────────────────────────────
export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
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
        <React.Suspense fallback={null}>
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
            <Band isMobile={isMobile} />
          </Physics>
        </React.Suspense>
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
  );
}

// ─────────────────────────────────────────────────────────────────
// Band — rope joints + card physics (card meshes updated below)
// ─────────────────────────────────────────────────────────────────
function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const { isDarkTheme } = useSharedState();
  const band = useRef<any>(),
    fixed = useRef<RigidBodyType | null>(null),
    j1 = useRef<RigidBodyType | null>(null),
    j2 = useRef<RigidBodyType | null>(null),
    j3 = useRef<RigidBodyType | null>(null),
    card = useRef<RigidBodyType | null>(null),
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
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const profileTexture = useTexture(profilePic);
  const mathcoLogoTexture = useTexture(mathcoLogoPic);

  const frontTexture = useCardTexture(
    (ctx) =>
      drawFrontCard(
        ctx,
        profileTexture.image,
        mathcoLogoTexture.image,
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
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipTargetY = isFlipped ? Math.PI : 0;
  const clickThreshold = 8;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.5]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.5]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.5]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 2.25, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  const clearPressState = () => {
    pressState.current.active = false;
    pressState.current.pointerId = null;
    pressState.current.startX = 0;
    pressState.current.startY = 0;
    pressState.current.maxDistance = 0;
  };

  const handlePointerDown = (e) => {
    e.target.setPointerCapture(e.pointerId);
    pressState.current.active = true;
    pressState.current.pointerId = e.pointerId;
    pressState.current.startX = e.clientX;
    pressState.current.startY = e.clientY;
    pressState.current.maxDistance = 0;
    drag(
      new THREE.Vector3()
        .copy(e.point)
        .sub(vec.copy(card.current.translation())),
    );
  };

  const handlePointerMove = (e) => {
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
  };

  const handlePointerUp = (e) => {
    const wasClick =
      pressState.current.active &&
      pressState.current.pointerId === e.pointerId &&
      pressState.current.maxDistance <= clickThreshold;

    e.target.releasePointerCapture?.(e.pointerId);
    drag(false);
    clearPressState();

    if (wasClick) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handlePointerCancel = (e) => {
    e.target.releasePointerCapture?.(e.pointerId);
    drag(false);
    clearPressState();
  };

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
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
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
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 16;

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
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[BAND_REPEAT, 1]}
          lineWidth={3.5}
        />
      </mesh>
    </>
  );
}
