export function isUndefined(data: any): boolean {
  return data === undefined
}

export function isMac(): boolean {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

/** 把字符串第一位变成大写，其他为小写 */
export function firstUpper(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase()
}

/** 将字符串中的特殊字符转义，用于正则表达式中 */
export function escapeRegExp(str: string): string {
  const regexp = /[\\^$.*+?()[\]{}|]/g
  return str && new RegExp(regexp.source).test(str) ? str.replace(regexp, '\\$&') : str
}

export function getType(data: any): string {
  if (data === null) { return 'null' }
  let type: string = typeof data
  if (type === 'object') {
    type = Object.prototype.toString.call(data).slice(8, -1)
  }
  return type
}

/** 获取对象的所有键，包括不可枚举的键 */
export function getObjAllKeys(obj: any): Array<string | number> {
  const type = getType(obj)
  switch (type) {
    case 'Map': {
      const arr = []
      for (const key of obj) {
        arr.push(key[0])
      }
      return arr
    }
    case 'Array': {
      const arr: number[] = []
      obj.forEach((_: string, index: number) => {
        arr.push(index)
      })
      return arr
    }
    default: {
      if (type !== 'Object' && type !== 'Array') {
        return []
      } else {
        return Object.getOwnPropertyNames(obj).sort()
      }
    }
  }
}

/** 将dom转化为字符串 */
export function stringifyDOM(dom: HTMLElement): string {
  let eDiv: HTMLElement | null = document.createElement('div')
  eDiv.appendChild(dom.cloneNode(true))
  const domStr = eDiv.innerHTML
  eDiv = null
  return domStr
}

/** 判断对象是否为window */
export function judgeWindow(data: any): boolean {
  const type = getType(data)
  return type === 'global' || type === 'Window' || type === 'DOMWindow'
}

/**
 * 由于JSON.stringify固有问题（参考MDN）
 * 因此这里需要polyfill一下来避免
 */
// eslint-disable-next-line max-lines-per-function
export function JSONStringify(data: any): string {
  let prefix = ''; let suffix = ''
  const type = getType(data)

  /** 先根据类型判断需要采用何种格式 */
  switch (type) {
    case 'Object': {
      prefix = '{'
      suffix = '}'
      break
    }
    case 'Array': {
      prefix = '['
      suffix = ']'
      break
    }
    case 'Map': {
      prefix = `Map(${data.size}){`
      suffix = '}'
      break
    }
    case 'Set': {
      prefix = `Set(${data.size}){`
      suffix = '}'
      data = [...data]
      break
    }
    case 'Error': {
      return `Error: ${JSONStringify(data.message)}`
    }
    case 'RegExp': {
      return data.toString()
    }
    default: {
      return JSON.stringify(data)
    }
  }

  let str = prefix
  const keys = getObjAllKeys(data)

  for (const [index, key] of keys.entries()) {
    let value = data[key]
    if (type === 'Map') {
      value = data.get(key)
    }
    if (type !== 'Array') {
      const keyType = getType(key)
      switch (keyType) {
        case 'Object':
        case 'Array':
        case 'Set':
        case 'symbol':
          str += Object.prototype.toString.call(key)
          break
        default:
          str += key
      }
      str += ': '
    }

    let valueType = getType(value)
    if (/^HTML/.test(valueType)) { valueType = 'dom' }
    switch (valueType) {
      case 'Array':
      case 'Object':
        str += JSONStringify(value)
        break
      case 'RegExp':
        str += value.toString()
        break
      case 'function':
        str += String(value)
        break
      case 'symbol':
        str += String(value)
        break
      case 'dom':
        str += stringifyDOM(value)
        break
      case 'Error':
        str += `Error: ${JSONStringify(value.message)}`
        break
      case 'bigint':
        str += `${value.toString()}n`
        break
      case 'number':
        str += Object.is(NaN, value) ? 'NaN' : JSON.stringify(value)
        break
      default:
        str += JSON.stringify(value)
    }
    if (index < keys.length - 1) { str += ', ' }
  }
  str += suffix
  return str
}

export function JSONParse(data: string | null): any {
  try {
    if (data === null || data === 'undefined') {
      return undefined
    } else {
      return JSON.parse(data)
    }
  } catch (error) {
    console.log(error)
    return void 0
  }
}

/** 由于JSON.stringify固有问题，只能在确保可以直接转换时才可使用 */
export function deepCopy(data: any): any {
  return JSON.parse(JSON.stringify(data))
}

/** 判断对象中是否存在循环引用 */
export function isCyclic(obj: any): boolean {
  const stackSet = new Set()
  let detected = false
  const detect = (data: any) => {
    if (data && typeof data !== 'object') {
      return false
    }
    if (stackSet.has(data)) {
      return (detected = true)
    }
    stackSet.add(data)
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        detect(data[key])
      }
    }
    stackSet.delete(data)
    return false
  }
  detect(obj)
  return detected
}