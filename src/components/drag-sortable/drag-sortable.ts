import { AnyArray } from "@type/interface"

export interface IProps {
  modelValue: AnyArray
  /** 可拖拽的目标，可以为类名 */
  draggableTarget: string
}

export interface IEmits {
  (event: "update:modelValue", value: AnyArray): void
}