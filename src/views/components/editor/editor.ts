import { Extension } from "@codemirror/state"
import { Prep } from "@type/prep"
import { getDefaultEditorExtensions } from "@utils/config/editor.config"
import { useEditorConfigStore } from "@store/editorConfig"
import { storeToRefs } from "pinia"

export const editorConfigStore = useEditorConfigStore()
const { indent } = storeToRefs(editorConfigStore)

export interface ICodemirrorEditorSettings {
  tabSize: number
  indentWithTab: boolean
}

export interface IProps {
  prep: Prep,
  settings: ICodemirrorEditorSettings
}

export interface IEmits {
  (e: "change", code: string): void
}
