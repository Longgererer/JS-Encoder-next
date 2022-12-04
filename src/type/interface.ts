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

export enum Position {
  TOP = 'top',
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
}

export enum ModalName {
  TEMPLATE = 'template',
  CODE_SETTINGS = 'codeSettings',
  LIBRARIES = 'libraries',
  UPLOAD_CODE = 'uploadCode',
  DOWNLOAD_CODE = 'downloadCode',
  SHORTCUT = 'shortcut',
  UPDATE_LOG = 'updateLog',
}