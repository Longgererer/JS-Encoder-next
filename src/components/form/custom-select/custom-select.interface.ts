import { Size } from '@type/interface'

export type SelectSize = Exclude<Size, Size.MINI | Size.X_LARGE>

export interface ISelectOption {
  value: string | number | boolean
  label?: string | number
}