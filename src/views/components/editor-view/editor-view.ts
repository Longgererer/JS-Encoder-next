import { Extension } from "@codemirror/state"
import { AreaPosition } from "@type/editor"
import { Theme } from "@type/interface"
import { Prep } from "@type/prep"
import { getDefaultEditorConfigByPrep, getDefaultEditorExtensions, getEditorThemeExtension, getPrepBaseExtension, getPrepLintExtension } from "@utils/editor/config/editor.config"

export interface IProps {
  splitterId: number
  id: number
}

export interface IEmits {
  (e: "selectSplitPosition", splitPosition: AreaPosition): void
}

/** 获取预处理相关拓展 */
export const getEditorExtensionsByPrep = (prep: Prep): Extension => {
  return [
    getDefaultEditorConfigByPrep(prep),
    getPrepBaseExtension(prep),
    getPrepLintExtension(prep),
  ]
}

/** 获取当前编辑器所需扩展 */
export const getEditorExtensions = (prep: Prep, theme: Theme): Extension => {
  return [
    getDefaultEditorExtensions(),
    getEditorExtensionsByPrep(prep),
    getEditorThemeExtension(theme),
  ]
}
