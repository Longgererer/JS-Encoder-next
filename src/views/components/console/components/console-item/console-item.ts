import { LogInfo, LogType } from "@type/console"

export interface IProps {
  logInfo: LogInfo
}

export const logType2Icon = {
  [LogType.MESSAGE]: "",
  [LogType.INFO]: "icon-info",
  [LogType.WARN]: "icon-warn",
  [LogType.ERROR]: "icon-error",
  [LogType.COMMEND]: "icon-chevron-left-dot",
  [LogType.RESULT]: "icon-chevron-right",
}