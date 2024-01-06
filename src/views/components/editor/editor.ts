import { Extension } from "@codemirror/state"
import { Prep } from "@type/prep"
import { ShortcutMode } from "@type/settings"

export interface ICodemirrorEditorSettings {
  codeHinting: boolean
  codeLint: boolean
  lineWrapping: boolean
  useEmmet: boolean
  tabSize: number
  indentWithTab: boolean
  shortcutTemplate: ShortcutMode
  style: string
}

export interface IProps {
  prep: Prep,
  settings: ICodemirrorEditorSettings
  extensions?: Extension[]
}

export interface IEmits {
  (e: "change", index: number): void
}