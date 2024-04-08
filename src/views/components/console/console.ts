import { ISelectOption } from "@components/form/custom-select/custom-select"
import { LogFilterType, LogType } from "@type/console"
import { reactive } from "vue"

export interface IEmits {
  (e: "resize", startY: number): void
}

/** 日志过滤选项列表 */
export const filterSelectOptions: ISelectOption[] = [
  { value: LogFilterType.ALL },
  { value: LogFilterType.MESSAGE },
  { value: LogFilterType.INFO },
  { value: LogFilterType.WARN },
  { value: LogFilterType.ERROR },
]

export const logType2IconMap: Partial<Record<LogType, string>> = {
  [LogType.ERROR]: "icon-error",
  [LogType.WARN]: "icon-warn",
  [LogType.INFO]: "icon-info",
}

/** 需要展示总数的日志类型列表 */
export const countLogTypeList: LogType[] = [
  LogType.ERROR,
  LogType.WARN,
  LogType.INFO,
]

export const logType2CountMap = reactive(countLogTypeList.reduce((acc, logType) => {
  acc[logType] = 0
  return acc
}, {} as Record<LogType, number>))