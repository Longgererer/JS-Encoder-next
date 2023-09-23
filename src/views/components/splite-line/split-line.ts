import { SplitDirection } from "@type/editor"

export interface IProps {
  size: number
  activeSize: number
  direction: SplitDirection
  showCursor?: boolean
}

export interface TriggerEvent {
  (e: "click"): void
}