import { JSONParse } from './common'

export const enum LocalStorageKey {
  /* 主题 */
  THEME = 'theme',
  /* 自定义模板 */
  CUSTOM_TEMPLATE = 'custom_template',
}

export const enum SessionStorageKey {
  /* 状态存储 */
  JS_ENCODER_STORE = 'js_encoder_store',
}

export function setLocalStorage(key: LocalStorageKey, val: any): void {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getLocalStorage(key: LocalStorageKey): any {
  return JSONParse(localStorage.getItem(key))
}

export function setSessionStorage(key: SessionStorageKey, val: any): void {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function getSessionStorage(key: SessionStorageKey): any {
  return JSONParse(sessionStorage.getItem(key))
}