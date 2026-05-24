import * as THREE from 'three';

export const CARD_TEXTURE_WIDTH = 512;
export const CARD_TEXTURE_HEIGHT = 720;
export const BACK_ICON_SIZE = 22;
export const BAND_REPEAT = 6.5;
export const MATHCO_PURPLE_DARK = '#232323';
export const MATHCO_PEACH = '#FFA781';
export const CARD_INK = '#222225';

export const FRONT_CARD_UV = {
  x: 0.0008521821000613272,
  y: 0.004251599311828613,
  width: 0.4980454597971402,
  height: 0.7505821585655212,
};

export const BACK_CARD_UV = {
  x: 0.5014492869377136,
  y: 0.0022884607315063477,
  width: 0.49848395586013794,
  height: 0.7548875207138062,
};

export function setupCardTexture(
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
