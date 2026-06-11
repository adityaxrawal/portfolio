import { useEffect, useMemo } from 'react';
import * as THREE from 'three';

import {
  CARD_TEXTURE_HEIGHT,
  CARD_TEXTURE_WIDTH,
  setupCardTexture,
} from './lanyardConstants';

export function useCardTexture(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawCard, uvRect, ...deps]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return texture;
}

export function createCardFaceGeometry(
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
