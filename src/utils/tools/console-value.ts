import { IConsoleValue } from "@type/console"
import { getObjAllKeys, getType } from "."
import { isElement } from "./judge"

export const processConsoleValueList = (list: any[]) => {
  return list.map((value, index) => {
    const type = getType(value)
    const result = formatConsoleValue(value, type)
    if (!index && type === "string") {
      result.value = value
    }
    return result
  })
}

const listLengthLimit = { minLength: 9, maxLength: 99 }
const recordLengthLimit = { minLength: 5, maxLength: 99 }

// eslint-disable-next-line max-lines-per-function
export const formatConsoleValue = (value: any, type?: string): IConsoleValue => {
  if (!type) {
    type = getType(value)
  }
  let consoleValue: IConsoleValue = {
    type, value,
    toStringTag: value?.[Symbol.toStringTag],
  }

  switch (type) {
    case "string": {
      consoleValue.value = `'${value}'`
      break
    }
    case "undefined":
    case "null": {
      consoleValue.value = String(value)
      break
    }
    case "bigint": {
      consoleValue.value = String(value) + "n"
      break
    }
    case "Array": {
      consoleValue = {
        ...consoleValue,
        ...listLengthLimit,
        size: (value as any[]).length,
      }
      break
    }
    case "Object": {
      consoleValue = {
        ...consoleValue,
        ...recordLengthLimit,
        name: value?.constructor?.name,
        attrs: Object.keys(value).map((key) => ({ key, value: value[key] })),
      }
      break
    }
    case "Map": {
      consoleValue = {
        ...consoleValue,
        ...recordLengthLimit,
        size: (value as Map<any, any>).size,
        attrs: getObjAllKeys(value).map((key) => ({ key, value: value.get(key) })),
      }
      break
    }
    case "WeakMap": {
      consoleValue = {
        ...consoleValue,
        ...recordLengthLimit,
      }
      break
    }
    case "Set": {
      consoleValue = {
        ...consoleValue,
        ...listLengthLimit,
        size: (value as Set<any>).size,
        attrs: getObjAllKeys(value).map((item, index) => ({ key: index, value: item })),
      }
      break
    }
    case "WeakSet": {
      consoleValue = {
        ...consoleValue,
        ...listLengthLimit,
      }
      break
    }
    case "NodeList": {
      consoleValue = {
        ...consoleValue,
        ...listLengthLimit,
        size: (value as NodeList).length,
      }
      break
    }
    case "function": {
      consoleValue = {
        ...consoleValue,
        ...listLengthLimit,
        value: value.toString(),
      }
      break
    }
    default: {
      if (isElement(value)) {
        consoleValue = {
          ...consoleValue,
          ...listLengthLimit,
          type: "Element",
          value: value.toString(),
          name: (value as HTMLElement).nodeName.toLowerCase(),
          attrs: Array.from((value as HTMLElement).attributes).map((item) => ({ key: item.name, value: item.value })),
          suffix: `#${(value as HTMLElement).id}` + `.${Array.from((value as HTMLElement).classList).join(".")}`,
        }
      }
    }
  }
  return consoleValue
}