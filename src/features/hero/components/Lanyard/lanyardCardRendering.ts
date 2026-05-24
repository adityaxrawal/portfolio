/**
 * Card rendering utilities for Lanyard component.
 *
 * Extracted from Lanyard.tsx to improve maintainability and enable
 * reusability of card texture generation and geometry functions.
 */
import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import { THEME_COLORS } from '@/config';
import {
  BACK_ICON_SIZE,
  CARD_INK,
  CARD_TEXTURE_HEIGHT,
  CARD_TEXTURE_WIDTH,
  MATHCO_PEACH,
  MATHCO_PURPLE_DARK,
  setupCardTexture,
} from './lanyardConstants';

/**
 * Drawing helper: Covers an area with an image using proper scaling.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
): void {
  const imageWidth = image.naturalWidth || image.width;
  const imageHeight = image.naturalHeight || image.height;
  const scale = Math.max(width / imageWidth, height / imageHeight);
  const drawWidth = imageWidth * scale;
  const drawHeight = imageHeight * scale;
  const drawX = x + (width - drawWidth) / 2;
  const drawY = y + (height - drawHeight) / 2;

  ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
}

/**
 * Path helper: Creates a rounded rectangle path.
 */
export function drawRoundedRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
): void {
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

/**
 * Fill a rounded rectangle.
 */
export function fillRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillStyle: string,
): void {
  ctx.save();
  drawRoundedRectPath(ctx, x, y, width, height, radius);
  ctx.fillStyle = fillStyle;
  ctx.fill();
  ctx.restore();
}

/**
 * Stroke a rounded rectangle.
 */
export function strokeRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  strokeStyle: string,
  lineWidth: number,
): void {
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

/**
 * Draw dot field pattern on card front/back (with exclusion zones).
 */
export function drawFrontDotField(
  ctx: CanvasRenderingContext2D,
  exclusionZones: ExclusionZone[] = [],
  isDarkTheme: boolean,
): void {
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

/**
 * Draw front card details (ID, name, title).
 */
export function drawFrontCardDetails(
  ctx: CanvasRenderingContext2D,
  isDarkTheme: boolean,
): void {
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

/**
 * Draw front card (profile side).
 */
export function drawFrontCard(
  ctx: CanvasRenderingContext2D,
  profileImage: HTMLImageElement | null,
  logoImage: HTMLImageElement | null,
  isDarkTheme: boolean,
): void {
  // Draw base background
  if (isDarkTheme) {
    const paperGradient = ctx.createLinearGradient(
      0,
      0,
      CARD_TEXTURE_WIDTH,
      CARD_TEXTURE_HEIGHT,
    );
    paperGradient.addColorStop(0, THEME_COLORS.LIGHT_BG);
    paperGradient.addColorStop(0.48, THEME_COLORS.LIGHT_BG);
    paperGradient.addColorStop(1, THEME_COLORS.LIGHT_BG);
    ctx.fillStyle = paperGradient;
  } else {
    ctx.fillStyle = '#262626';
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, CARD_TEXTURE_HEIGHT);

  // Draw top dual-tone section
  if (isDarkTheme) {
    ctx.fillStyle = '#b1b1b1ff';
    ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);
  } else {
    ctx.fillStyle = '#737373';
    ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);
  }

  const exclusionZones = [
    { x: 20, y: 50, w: 280, h: 130 },
    { x: 20, y: 400, w: 40, h: 150 },
    { x: 150, y: 610, w: 330, h: 100 },
  ];

  drawFrontDotField(ctx, exclusionZones, isDarkTheme);

  const textColor = isDarkTheme ? CARD_INK : '#ffffff';

  ctx.fillStyle = textColor;
  ctx.font = '400 45px "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
  ctx.fillText('Own your', 34, 104);
  ctx.fillText('Intelligence', 34, 159);

  const imageX = 236;
  const imageY = 272;
  const imageWidth = 238;
  const imageHeight = 310;
  fillRoundedRect(ctx, imageX, imageY, imageWidth, imageHeight, 8, '#deddd8');

  if (profileImage) {
    ctx.save();
    drawRoundedRectPath(ctx, imageX, imageY, imageWidth, imageHeight, 8);
    ctx.clip();
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    drawImageCover(ctx, profileImage, imageX, imageY, imageWidth, imageHeight);
    ctx.restore();
  }

  if (logoImage) {
    ctx.save();

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = logoImage.naturalWidth || logoImage.width;
    tempCanvas.height = logoImage.naturalHeight || logoImage.height;
    const tCtx = tempCanvas.getContext('2d');
    if (!tCtx) return;

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
      428 + (logoSize + 1 * h) / 2,
      w,
      h,
    );
    ctx.restore();
  }

  drawFrontCardDetails(ctx, isDarkTheme);
}

/**
 * Draw info icon on back card.
 */
export function drawInfoIcon(
  ctx: CanvasRenderingContext2D,
  icon: string,
  x: number,
  y: number,
  isDarkTheme: boolean,
): void {
  ctx.fillStyle = isDarkTheme ? CARD_INK : '#ffffff';
  ctx.beginPath();
  ctx.arc(x, y, BACK_ICON_SIZE, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = isDarkTheme ? '#ffffff' : THEME_COLORS.DARK_GRID;
  ctx.fillStyle = isDarkTheme ? '#ffffff' : THEME_COLORS.DARK_GRID;
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

/**
 * Draw back card (company info side).
 */
export function drawBackCard(
  ctx: CanvasRenderingContext2D,
  isDarkTheme: boolean,
): void {
  // Draw base background
  if (isDarkTheme) {
    const paperGradient = ctx.createLinearGradient(
      0,
      0,
      CARD_TEXTURE_WIDTH,
      CARD_TEXTURE_HEIGHT,
    );
    paperGradient.addColorStop(0, THEME_COLORS.LIGHT_BG);
    paperGradient.addColorStop(0.48, THEME_COLORS.LIGHT_BG);
    paperGradient.addColorStop(1, THEME_COLORS.LIGHT_BG);
    ctx.fillStyle = paperGradient;
  } else {
    ctx.fillStyle = '#262626';
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, CARD_TEXTURE_HEIGHT);

  // Draw top dual-tone section
  if (isDarkTheme) {
    ctx.fillStyle = '#b1b1b1ff';
  } else {
    ctx.fillStyle = '#737373';
  }
  ctx.fillRect(0, 0, CARD_TEXTURE_WIDTH, 180);

  const exclusionZones = [
    { x: 110, y: 240 - 60, w: 356, h: 120 },
    { x: 110, y: 395 - 60, w: 356, h: 120 },
    { x: 110, y: 550 - 60, w: 356, h: 120 },
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

/**
 * Hook: Create and manage card texture (canvas-based texture with proper cleanup).
 */
export function useCardTexture(
  drawCard: (ctx: CanvasRenderingContext2D) => void,
  uvRect: { x: number; y: number; width: number; height: number },
  deps: unknown[] = [],
): THREE.Texture | null {
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

/**
 * Extract one side of a card geometry based on normal direction.
 */
export function createCardFaceGeometry(
  geometry: THREE.BufferGeometry,
  normalDirection: number,
): THREE.BufferGeometry {
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
