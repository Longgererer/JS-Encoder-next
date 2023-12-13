export interface IEditorSettings {
  edit: {
    /* 智能提示 */
    codeHinting: boolean
    /* lint检查 */
    codeLint: boolean
    /* 编辑器是否换行 */
    lineWrapping: boolean
    /* 是否使用emmet */
    useEmmet: boolean
  },
  indent: {
    /* 使用制表符缩进 */
    indentWithTab: boolean
    /* 缩进长度 */
    tabsize: number
  },
  execute: {
    /* 自动执行代码 */
    autoExecute: boolean
    /* 延迟执行时间(ms) */
    delayTimeOfExecute: number
  },
  font: {
    /* 字号 */
    fontSize: number
    /* 字体 */
    fontFamily: string
  },
  other: {
    /* 头部标签 */
    headTags: string
    /* 快捷键模板 */
    shortcutTemplate: ShortcutMode
  }
}

export const enum ShortcutMode {
  VSCODE = "VSCode",
  SUBLIME = "Sublime",
}