/* eslint-disable */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly PUBLIC_URL: string
  }
}

declare interface NodeModule {
  hot?: {
    accept(path?: string, fn?: () => void, callback?: () => void): void
  }
}

declare module "*.jpg" {
  const src: string
  export default src
}

declare module "*.jpeg" {
  const src: string
  export default src
}

declare module "*.png" {
  const src: string
  export default src
}

declare module "*.webp" {
  const src: string
  export default src
}

declare module "*.svg" {
  import * as React from "react"

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>

  const src: string
  export default src
}

interface Window {
  intervals?: any
  queue?: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

declare var window: Window & typeof globalThis
