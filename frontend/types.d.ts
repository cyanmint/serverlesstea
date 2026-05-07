// Global type augmentations for the frontend application.
// Kept intentionally minimal; add declarations here as needed.

// Allow importing .vue single-file components from TypeScript.
// This covers both project-local SFC imports and Gitea-compat feature files
// that reference components which may not be present in this repo.
declare module '*.vue' {
  import type {DefineComponent} from 'vue';
  const component: DefineComponent;
  export default component;
}

// Third-party packages that ship without TypeScript declarations
// and are used in Gitea-compatible feature files bundled with this project.
declare module '@citation-js/core';
declare module '@citation-js/plugin-bibtex';
declare module '@citation-js/plugin-csl';
declare module '@citation-js/plugin-software-formats';
declare module 'asciinema-player';
declare module 'idiomorph' {
  export const Idiomorph: {
    morph: (oldNode: Element, newContent: string | Element | Document, config?: Record<string, unknown>) => void;
  };
}
declare module 'swagger-ui-dist/swagger-ui-es-bundle.js' {
  interface SwaggerUIType {
    (config: Record<string, unknown>): unknown;
    presets: Record<string, unknown>;
    plugins: Record<string, unknown>;
  }
  const SwaggerUI: SwaggerUIType;
  export default SwaggerUI;
}
