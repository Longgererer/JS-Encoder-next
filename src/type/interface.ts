/* 日志类型 */
export const enum LogType {
  ALL = 'All',
  LOG = 'Log',
  INFO = 'Info',
  WARN = 'Warn',
  ERROR = 'Error',
}

export const enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface IOption {
  text?: string
  icon?: string
}

export const enum Position {
  TOP = 'top',
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom',
}

export const enum Trigger {
  HOVER = 'hover',
  CLICK = 'click',
}

export const enum ModalName {
  TEMPLATE = 'template',
  CODE_SETTINGS = 'codeSettings',
  LIBRARIES = 'libraries',
  UPLOAD_CODE = 'uploadCode',
  DOWNLOAD_CODE = 'downloadCode',
  SHORTCUT = 'shortcut',
  UPDATE_LOG = 'updateLog',
}

export const enum Size {
  MINI = 'mini',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  X_LARGE = 'xLarge',
}