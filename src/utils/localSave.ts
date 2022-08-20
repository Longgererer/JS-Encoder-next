export function setLocalStorage(key: string, val: any): void {
  localStorage.setItem(key, JSON.stringify(val))
}