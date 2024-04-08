/** 过滤日志类型 */
export const enum LogFilterType {
  /** 所有日志 */
  ALL = "all",
  /** 普通日志 */
  MESSAGE = "message",
  /** 提示日志 */
  INFO = "info",
  /** 警告日志 */
  WARN = "warn",
  /** 错误日志 */
  ERROR = "error",
}

/** 日志类型 */
export const enum LogType {
  /** 普通日志 */
  MESSAGE = "message",
  /** 提示日志 */
  INFO = "info",
  /** 警告日志 */
  WARN = "warn",
  /** 错误日志 */
  ERROR = "error",
  /** 执行指令输入日志 */
  COMMEND = "comment",
  /** 执行指令输出日志 */
  RESULT = "result",
}

export enum ConsoleMethods {
  LOG = "log",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
  ASSERT = "assert",
  TIME = "time",
  TIME_LOG = "timeLog",
  TIME_END = "timeEnd",
  CLEAR = "clear",
  TABLE = "table",
}

export const ConsoleMethod2LogType = {
  [ConsoleMethods.LOG]: LogType.MESSAGE,
  [ConsoleMethods.INFO]: LogType.INFO,
  [ConsoleMethods.WARN]: LogType.WARN,
  [ConsoleMethods.ERROR]: LogType.ERROR,
}

/** 所有支持的console方法 */
export const enableConsoleMethods = Object.values(ConsoleMethods)

export type LogInfo = IBasicLogInfo | ITableLogInfo

export type BasicLogMethod = "log" | "info" | "warn" | "error"

export const basicLogMethods = ["log", "info", "warn", "error"]

export interface IBasicLogInfo {
  type: LogType
  method: BasicLogMethod
  data: any[]
}

export interface ITableLogInfo {
  type: LogType
  method: ConsoleMethods.TABLE
  data: { headers: string[], body: any[][] }
}

export enum ConsoleUpdateType {
  CLEAR = "clear",
  ADD = "add",
}

export interface IConsoleValue {
  type: string
  value: any
  /** 是否展开，默认不展开，若不展开则展示缩写 */
  unfold?: boolean
  /** 名字，比如函数名 */
  name?: string
  size?: number
  /** Symbol(Symbol.toStringTag) */
  tag?: string
  attrs: IConsoleValue[]
}