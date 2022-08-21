import { JSONParse } from './common'

export function setLocalStorage(key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val))
}

export function getLocalStorage(key: string): any {
  return JSONParse(localStorage.getItem(key))
}

export function setSessionStorage(key: string, val: any): void {
  sessionStorage.setItem(key, JSON.stringify(val))
}

export function getSessionStorage(key: string): any {
  return JSONParse(sessionStorage.getItem(key))
}