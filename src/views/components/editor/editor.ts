import { Extension } from "@codemirror/state"
import { AnyObject } from "@type/interface"
import { Prep } from "@type/prep"
import { ShortcutMode } from "@type/settings"

export interface ICodemirrorEditorSettings {
  codeHinting: boolean
  codeLint: boolean
  lineWrapping: boolean
  useEmmet: boolean
  indentWithTab: boolean
  tabSize: number
  shortcutTemplate: ShortcutMode
  style: Record<string, AnyObject>
}

export interface IProps {
  prep: Prep,
  code: string
  settings: ICodemirrorEditorSettings
  extensions?: Extension[]
}

export interface IEmits {
  (e: "codeChanged", code: string): void
}
