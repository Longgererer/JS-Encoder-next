import { ISelectOption } from "@components/form/custom-select/custom-select"
import { LogType } from "@type/console"

export interface IEmits {
  (e: "resize", startY: number): void
}

/** 日志过滤选项列表 */
export const filterSelectOptions: ISelectOption[] = [
  { value: LogType.ALL },
  { value: LogType.MESSAGE },
  { value: LogType.INFO },
  { value: LogType.WARN },
  { value: LogType.ERROR },
]