import { Prep } from "@type/prep"
import { useEditorConfigStore } from "@store/editorConfig"
import { storeToRefs } from "pinia"
import { AnyObject } from "@type/interface"

export const editorConfigStore = useEditorConfigStore()
const { indent } = storeToRefs(editorConfigStore)

export interface ICodemirrorEditorSettings {
  /** 缩进长度 */
  tabSize: number
  /** 使用制表符缩进 */
  indentWithTab: boolean
  /** lint检查 */
  codeLint: boolean
  /** 智能提示 */
  codeHinting: boolean
  /** 是否使用emmet */
  useEmmet: boolean
  /** 编辑器内部样式 */
  style: Record<string, AnyObject>
}

export interface IProps {
  prep: Prep,
  modelValue: string
  settings: ICodemirrorEditorSettings
}

export interface IEmits {
  (e: "change", code: string): void
}
