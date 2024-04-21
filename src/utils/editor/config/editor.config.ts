import { StreamLanguage } from "@codemirror/language"
import { javascript, javascriptLanguage } from "@codemirror/lang-javascript"
import { css, cssLanguage } from "@codemirror/lang-css"
import { html, htmlLanguage } from "@codemirror/lang-html"
import { less } from "@codemirror/lang-less"
import { vue } from "@codemirror/lang-vue"
import { sass } from "@codemirror/lang-sass"
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { coffeeScript } from "@codemirror/legacy-modes/mode/coffeescript"
import { stylus } from "@codemirror/legacy-modes/mode/stylus"
import { Prep } from "@type/prep"
import { cssLinter, htmlLinter, javascriptLinter, lessLinter, scssLinter, stylusLinter, typeScriptLinter } from "@utils/editor/linter"
import { Extension } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { vscodeKeymap } from "@replit/codemirror-vscode-keymap"
import { autocompletion } from "@codemirror/autocomplete"
import { emmetConfig, abbreviationTracker } from "@emmetio/codemirror6-plugin"
import { emacsStyleKeymap } from "@codemirror/commands"
import { ShortcutMode } from "@type/settings"
import { Theme } from "@type/interface"
import themes from "@utils/editor/themes"
import { scrollPastEnd } from "@codemirror/view"
import { search } from "@codemirror/search"
import { createSearchPanel } from "../panels/search"
import { markdownToolsState } from "../panels/markdown-tools"

/** 快捷键模式对应的按键映射扩展 */
export const ShortCutMode2ExtensionMap = {
  [ShortcutMode.VSCODE]: vscodeKeymap,
  [ShortcutMode.EMACS]: emacsStyleKeymap,
}

/** 获取编辑器通用默认配置 */
export const getDefaultEditorExtensions = (): Extension[] => {
  return [
    autocompletion({ defaultKeymap: false }),
    keymap.of(vscodeKeymap),
    scrollPastEnd(),
  ]
}

const Prep2DefaultExtensionMap: Record<Prep, () => Extension[]> = {
  [Prep.HTML]: () => [
    emmetConfig.of({ syntax: "html" }),
    abbreviationTracker({ syntax: "html" }),
  ],
  [Prep.MARKDOWN]: () => [markdownToolsState],
  [Prep.PUG]: () => [],
  [Prep.CSS]: () => [emmetConfig.of({ syntax: "css" })],
  [Prep.SASS]: () => [emmetConfig.of({ syntax: "sass" })],
  [Prep.SCSS]: () => [emmetConfig.of({ syntax: "scss" })],
  [Prep.LESS]: () => [],
  [Prep.STYLUS]: () => [emmetConfig.of({ syntax: "stylus" })],
  [Prep.JAVASCRIPT]: () => [],
  [Prep.TYPESCRIPT]: () => [],
  [Prep.BABEL]: () => [
    emmetConfig.of({ syntax: "jsx" }),
    abbreviationTracker({ syntax: "jsx" }),
  ],
  [Prep.COFFEESCRIPT]: () => [],
  [Prep.VUE]: () => [emmetConfig.of({ syntax: "vue" })],
}

/** 获取每个预处理器的默认配置 */
export const getDefaultEditorConfigByPrep = (prep: Prep): Extension[] => {
  return Prep2DefaultExtensionMap[prep]()
}

const markdownCodeLanguages = (info: string) => {
  switch (info) {
    case "javascript":
    case "js":
    case "ts":
    case "typescript":
    case "tsx":
    case "jsx":
      return javascriptLanguage
    case "css":
      return cssLanguage
    case "html":
      return htmlLanguage
    case "markdown":
    case "md":
      return markdownLanguage
    default:
      return null
  }
}

const Prep2LanguageExtensionMap: Record<Prep, () => Extension | StreamLanguage<unknown>> = {
  [Prep.HTML]: () => html(),
  [Prep.MARKDOWN]: () => markdown({
    base: markdownLanguage,
    codeLanguages: markdownCodeLanguages,
  }),
  [Prep.PUG]: () => [],
  [Prep.CSS]: () => css(),
  [Prep.SASS]: () => sass({ indented: true }),
  [Prep.SCSS]: () => sass(),
  [Prep.LESS]: () => less(),
  [Prep.JAVASCRIPT]: () => javascript({ typescript: false, jsx: false }),
  [Prep.TYPESCRIPT]: () => javascript({ typescript: true }),
  [Prep.BABEL]: () => javascript({ jsx: true }),
  // maybe should support tsx :)
  [Prep.VUE]: () => vue({ base: html() }),
  // legacy-modes 下面的语言扩展
  [Prep.STYLUS]: () => StreamLanguage.define(stylus),
  [Prep.COFFEESCRIPT]: () => StreamLanguage.define(coffeeScript),
}

/** 获取语言对应的基础扩展 */
export const getPrepBaseExtension = (prep: Prep): Extension => {
  return Prep2LanguageExtensionMap[prep]()
}

/** 语言对应的linter扩展 */
const Prep2LinterExtensionMap: Record<Prep, () => Extension> = {
  [Prep.HTML]: () => htmlLinter,
  [Prep.MARKDOWN]: () => [],
  [Prep.PUG]: () => [],
  [Prep.CSS]: () => cssLinter,
  [Prep.SASS]: () => scssLinter,
  [Prep.SCSS]: () => scssLinter,
  [Prep.LESS]: () => lessLinter,
  [Prep.STYLUS]: () => stylusLinter,
  [Prep.JAVASCRIPT]: () => javascriptLinter,
  [Prep.TYPESCRIPT]: () => typeScriptLinter,
  [Prep.BABEL]: () => [],
  [Prep.COFFEESCRIPT]: () => [],
  [Prep.VUE]: () => [],
}

/** 获取语言对应的linter扩展 */
export const getPrepLintExtension = (prep: Prep): Extension => {
  // return Prep2LinterExtensionMap[prep]()
  return []
}

/** 主题对应的编辑器样式拓展 */
const theme2EditorStyleMap: Record<Theme, () => Extension> = {
  [Theme.DARK]: () => themes.darkTheme,
  [Theme.LIGHT]: () => themes.lightTheme,
}

export const getEditorThemeExtension = (theme: Theme): Extension => {
  return theme2EditorStyleMap[theme]()
}

export const getPanelExtension = (): Extension => {
  return [
    search({ top: true, createPanel: createSearchPanel }),
  ]
}