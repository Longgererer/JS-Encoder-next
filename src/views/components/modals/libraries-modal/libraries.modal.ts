import { ISelectOption } from "@components/form/custom-select/custom-select"

/** 选中的外部库 */
export interface ISelectedLibraryItem {
  /** 自增字段，表唯一 */
  id: number
  url: string
}

export interface IMatchLibraryItem extends ISelectOption {
  url: string
}