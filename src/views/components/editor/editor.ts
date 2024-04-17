import { Extension } from "@codemirror/state"
import { AnyObject } from "@type/interface"
import { Prep } from "@type/prep"
import { ShortcutMode } from "@type/settings"

export interface ICodemirrorEditorSettings {
  codeHinting?: boolean
  codeLint?: boolean
  lineWrapping?: boolean
  lineNumbers?: boolean
  useEmmet?: boolean
  indentWithTab?: boolean
  tabSize?: number
  shortcutTemplate?: ShortcutMode
  style?: Record<string, AnyObject>
}

export interface IProps {
  prep: Prep
  code?: string
  modelValue?: string
  settings: ICodemirrorEditorSettings
  extensions?: Extension[]
  minimal?: boolean
}

export interface IEmits {
  (e: "codeChanged" | "update:modelValue", code: string): void
  (e: "focus" | "blur"): void
}