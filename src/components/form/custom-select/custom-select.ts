import { Size } from "@type/interface"

export type SelectSize = Exclude<Size, Size.MINI | Size.X_LARGE>

export interface ISelectOption {
  value: string | number | boolean
  label?: string | number
}

export interface IProps {
  /** 内容 */
  modelValue: ISelectOption["value"]
  /** 数据列表, 如果不传label，就直接使用value代替label展示 */
  dataList: ISelectOption[]
  /** 尺寸 */
  size?: SelectSize
  customSelectStyle?: string
  customOptionListStyle?: string
  customSelectInnerStyle?: string
  customOptionStyle?: string
  appendToBody?: boolean
}

export interface IEmits {
  (event: "update:modelValue", state: ISelectOption["value"]): void,
}