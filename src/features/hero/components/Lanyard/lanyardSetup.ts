import { extend } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

export function initMeshLine() {
  extend({ MeshLineGeometry, MeshLineMaterial });
}

declare module '@react-three/fiber' {
  interface ThreeElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meshLineGeometry: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meshLineMaterial: any;
  }
}
