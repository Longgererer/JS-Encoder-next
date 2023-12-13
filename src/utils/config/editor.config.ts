import { basicSetup } from "codemirror"
import { StreamLanguage } from "@codemirror/language"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { less } from "@codemirror/lang-less"
import { vue } from "@codemirror/lang-vue"
import { sass } from "@codemirror/lang-sass"
import { markdown } from "@codemirror/lang-markdown"
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript"
import { stylus } from "@codemirror/legacy-modes/mode/stylus"
import { Prep } from "@type/prep"

const Prep2ExtensionMap = {
  [Prep.HTML]: html,
  [Prep.MARKDOWN]: () => markdown({ extensions: [] }),
  [Prep.PUG]: () => {},
  [Prep.CSS]: css,
  [Prep.SASS]: () => sass({ indented: true }),
  [Prep.SCSS]: sass,
  [Prep.LESS]: less,
  [Prep.JAVASCRIPT]: javascript,
  [Prep.TYPESCRIPT]: () => javascript({ typescript: true }),
  [Prep.JSX]: () => javascript({ jsx: true }),
  // maybe should support tsx :)
  [Prep.VUE2]: () => vue({ base: html() }),
  [Prep.VUE3]: () => vue({ base: html() }),
}

/** legacy-modes 下面的语言扩展 */
const Prep2LegacyExtensionMap = {
  [Prep.STYLUS]: () => StreamLanguage.define(stylus),
  [Prep.COFFEESCRIPT]: () => StreamLanguage.define(coffeeScript),
}

/** 获取语言对应的扩展 */
export const getPrepBaseExtension = (prep: Prep) => {
  return {
    ...Prep2ExtensionMap,
    ...Prep2LegacyExtensionMap,
  }[prep]()
}

export const getPrepLintExtension = (prep: Prep) => {

}