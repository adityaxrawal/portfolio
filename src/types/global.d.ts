/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly GITHUB_TOKEN?: string;
  readonly GITHUB_USERNAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}
