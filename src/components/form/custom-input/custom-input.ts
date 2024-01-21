import { Size } from "@type/interface"

export type InputSize = Exclude<Size, Size.MINI | Size.X_LARGE>

export enum InputType {
  /** 文本 */
  TEXT = "text",
  /** 数字 */
  NUMBER = "number",
  /** 文本区 */
  TEXTAREA = "textarea",
}
