import { SplitDirection } from "@type/editor"

export interface IProps {
  size: number | string
  activeSize?: number | string
  direction?: SplitDirection
  showCursor?: boolean
  isActive?: boolean
}