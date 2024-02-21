import { AnyArray } from "@type/interface"

export interface IProps {
  modelValue: AnyArray
  /** 列表遍历和插槽需要用到的key */
  uniqueKey: string
}

export interface IEmits {
  (event: "update:modelValue", value: AnyArray): void
}