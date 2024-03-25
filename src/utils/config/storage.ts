import { Theme } from "@type/interface"

export const enum LocalStorageKey {
  /** 主题 */
  THEME = "theme",
  /** 版本 */
  VERSION = "version",
  /** 是否隐藏了新人引导 */
  HAS_HIDED_NEW_USER_GUIDE = "hasHidedNewUserGuide",
}

export interface ILocalStorageData {
  [LocalStorageKey.THEME]: Theme
  [LocalStorageKey.VERSION]: string
  [LocalStorageKey.HAS_HIDED_NEW_USER_GUIDE]: boolean
}

export const enum SessionStorageKey {
  /** 状态存储 */
  JS_ENCODER_STORE = "js_encoder_store",
}

export interface ISessionStorageData {
  [SessionStorageKey.JS_ENCODER_STORE]: any
}