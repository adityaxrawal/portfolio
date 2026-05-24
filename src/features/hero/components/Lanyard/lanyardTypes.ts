import type { RapierRigidBody } from '@react-three/rapier';
import type * as THREE from 'three';

/** Rapier body with optional smoothed translation used for the lanyard curve. */
export type LanyardRigidBody = RapierRigidBody & { lerped?: THREE.Vector3 };

export type LanyardDragOffset = false | THREE.Vector3;

export interface LanyardCardNodes {
  card: { geometry: THREE.BufferGeometry };
  clip: { geometry: THREE.BufferGeometry };
  clamp: { geometry: THREE.BufferGeometry };
}

export interface MeshLineGeometryWithPoints extends THREE.BufferGeometry {
  setPoints: (points: THREE.Vector3[]) => void;
}
