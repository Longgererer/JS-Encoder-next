import { Extension } from "@codemirror/state"
import { AreaPosition } from "@type/editor"
import { Theme } from "@type/interface"
import { Prep } from "@type/prep"
import { getDefaultEditorExtensions } from "@utils/editor/config/editor.config"

export interface IProps {
  splitterId: number
  id: number
}

export interface IEmits {
  (e: "selectSplitPosition", splitPosition: AreaPosition): void
}

const getEditorExtensions = (prep: Prep, theme: Theme): Extension => {
  return [
    getDefaultEditorExtensions(),
  ]
}