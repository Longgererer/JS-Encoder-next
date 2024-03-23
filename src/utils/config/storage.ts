import { Theme } from "@type/interface"

export const enum LocalStorageKey {
  /** 主题 */
  THEME = "theme",
  /** 版本 */
  VERSION = "version",
}

export interface ILocalStorageData {
  [LocalStorageKey.THEME]: Theme
  [LocalStorageKey.VERSION]: string
}

export const enum SessionStorageKey {
  /** 状态存储 */
  JS_ENCODER_STORE = "js_encoder_store",
}

export interface ISessionStorageData {
  [SessionStorageKey.JS_ENCODER_STORE]: any
}