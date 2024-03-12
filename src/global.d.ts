import type less from "less"
import type stylus from "stylus"
import type ts from "typescript"
import type coffee from "coffeescript"
import type babel from "@babel/standalone"

declare namespace GlobalType {
  interface lessJS extends less {}
  type stylusJS = typeof stylus
  type typescript = typeof ts
  type coffeescript = typeof coffee
  type babelStandalone = typeof babel
}

export = GlobalType
export as namespace GlobalType