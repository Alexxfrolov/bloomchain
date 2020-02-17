/* eslint-disable */

declare interface NodeModule {
  hot?: {
    accept(path?: string, fn?: () => void, callback?: () => void): void
  }
}

declare module "*.png" {
  const value: any
  export = value
}

interface Window {
  intervals?: any
  queue?: any
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any
}

declare var window: Window & typeof globalThis
