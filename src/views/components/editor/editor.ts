import { Extension } from "@codemirror/state"
import { Prep } from "@type/prep"
import { ShortcutMode } from "@type/settings"

export interface ICodemirrorEditorSettings {
  codeHinting: boolean
  codeLint: boolean
  lineWrapping: boolean
  useEmmet: boolean
  tabSize: number
  shortcutTemplate: ShortcutMode
  style: string
}

export interface IProps {
  prep: Prep,
  modelValue: string
  settings: ICodemirrorEditorSettings
  extensions?: Extension[]
}

export interface IEmits {
  (e: "change", code: string): void
}
