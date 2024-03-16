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

export const countLogInfoList = countLogTypeList.map((logType) => ({
  logType,
  count: 0,
  icon: logType2IconMap[logType],
}))