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

