/* 日志类型 */
export enum LogType {
  ALL = 'All',
  LOG = 'Log',
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error',
}

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IOption {
  text?: string
  icon?: string
}
