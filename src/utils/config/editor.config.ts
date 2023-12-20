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
import { cssLinter, htmlLinter, javascriptLinter, lessLinter, scssLinter, stylusLinter, typeScriptLinter } from "@utils/editor/linter"
import { Extension } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap"
import { autocompletion } from "@codemirror/autocomplete"
import { emmetConfig, abbreviationTracker } from "@emmetio/codemirror6-plugin"

/** 获取编辑器通用默认配置 */
export const getDefaultEditorExtensions = (): Extension => {
  return [
    basicSetup,
    autocompletion({ defaultKeymap: false }),
    keymap.of(vscodeKeymap),
  ]
}

const Prep2DefaultExtensionMap = {
  [Prep.HTML]: () => [
    emmetConfig.of({
      syntax: "css",
      preview: {
        // html: yourCustomHighlighter
      },
    }),
    abbreviationTracker(),
  ],
  [Prep.MARKDOWN]: () => [],
  [Prep.PUG]: () => [],
  [Prep.CSS]: () => [emmetConfig.of({ syntax: "css" })],
  [Prep.SASS]: () => [emmetConfig.of({ syntax: "sass" })],
  [Prep.SCSS]: () => [emmetConfig.of({ syntax: "scss" })],
  [Prep.LESS]: () => [],
  [Prep.STYLUS]: () => [emmetConfig.of({ syntax: "stylus" })],
  [Prep.JAVASCRIPT]: () => [],
  [Prep.TYPESCRIPT]: () => [],
  [Prep.JSX]: () => [emmetConfig.of({ syntax: "jsx" })],
  [Prep.COFFEESCRIPT]: () => [],
  [Prep.VUE2]: () => [emmetConfig.of({ syntax: "vue" })],
  [Prep.VUE3]: () => [emmetConfig.of({ syntax: "vue" })],
}

/** 获取每个预处理器的默认配置 */
export const getDefaultEditorConfigByPrep = (prep: Prep): Extension => {
  return Prep2DefaultExtensionMap[prep]()
}

const Prep2LanguageExtensionMap = {
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

/** 获取语言对应的基础扩展 */
export const getPrepBaseExtension = (prep: Prep) => {
  return {
    ...Prep2LanguageExtensionMap,
    ...Prep2LegacyExtensionMap,
  }[prep]()
}

const Prep2LinterExtensionMap = {
  [Prep.HTML]: htmlLinter,
  [Prep.MARKDOWN]: () => {},
  [Prep.PUG]: () => {},
  [Prep.CSS]: cssLinter,
  [Prep.SASS]: scssLinter,
  [Prep.SCSS]: scssLinter,
  [Prep.LESS]: lessLinter,
  [Prep.STYLUS]: stylusLinter,
  [Prep.JAVASCRIPT]: javascriptLinter,
  [Prep.TYPESCRIPT]: typeScriptLinter,
  [Prep.JSX]: () => {},
  [Prep.COFFEESCRIPT]: () => {},
  [Prep.VUE2]: () => {},
  [Prep.VUE3]: () => {},
}

/** 获取语言对应的linter扩展 */
export const getPrepLintExtension = (prep: Prep) => {
  return Prep2LinterExtensionMap[prep]
}