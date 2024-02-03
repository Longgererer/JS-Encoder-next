export interface IEditorSettings {
  edit: {
    /** 智能提示 */
    codeHinting: boolean
    /** lint检查 */
    codeLint: boolean
    /** 编辑器是否换行 */
    lineWrapping: boolean
    /** 是否使用emmet */
    useEmmet: boolean
  },
  indent: {
    /** 使用制表符缩进 */
    indentWithTab: boolean
    /** 缩进长度 */
    tabSize: number
  },
  execute: {
    /** 自动执行代码 */
    autoExecute: boolean
    /** 延迟执行时间(ms) */
    delayTimeOfExecute: number
  },
  font: {
    /** 字号 */
    fontSize: number
    /** 字体 */
    fontFamily: CodeFontFamily
  },
  other: {
    /** 头部标签 */
    headTags: string
    /** 快捷键模板 */
    shortcutTemplate: ShortcutMode
  }
}

/** 快捷键模式 */
export const enum ShortcutMode {
  VSCODE = "VSCode",
  EMACS = "EMACS",
  // SUBLIME = "Sublime",
}

/** 代码字体 */
export const enum CodeFontFamily {
  JET_BRAINS_MONO = "JetBrains Mono",
  FIRA_CODE = "Fira Code",
  HACK = "Hack",
  SOURCE_CODE_PRO = "Source Code Pro",
  MONACO = "Monaco",
  SPACE_MONO = "Space Mono",
  IBM_PLEX_MONO = "IBM Plex Mono",
  INCONSOLATA = "Inconsolata",
  COURIER_PRIME = "Courier Prime",
}