/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "eslint4b-prebuilt"

declare class Sass {
  compile: (input: string, cb: (result: string) => void) => void
}

declare interface Window {
  stylelint: any
  less: GlobalType.lessJS
  stylus: GlobalType.stylusJS
  ts: GlobalType.typescript
  CoffeeScript: GlobalType.coffeescript
  Babel: GlobalType.babelStandalone
}

