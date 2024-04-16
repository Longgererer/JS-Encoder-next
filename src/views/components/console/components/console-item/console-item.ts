import { LogInfo, LogType } from "@type/console"

export interface IProps {
  logInfo: LogInfo
}

export const logType2Icon = {
  [LogType.MESSAGE]: "",
  [LogType.INFO]: "icon-info",
  [LogType.WARN]: "icon-warn",
  [LogType.ERROR]: "icon-error",
  [LogType.COMMEND]: "icon-chevron-right",
  [LogType.RESULT]: "icon-chevron-left-dot",
}

const testCode = () => {
  console.log(123)
  console.log("string")
  console.log(true)
  console.log(Symbol(123))
  console.log(12n)
  console.log(undefined)
  console.log(null)
  console.log({ a: 123 })
  console.log({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7 })
  console.log([123, "string", true])
  console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  console.log(() => {})
  console.log(async () => {})
  console.log(function a(){})
  console.log(function * a(){})
  console.log(async function a(){})
  const v = function() {
    console.log(112323)
  }
  console.log(v)
  const map = new Map()
  map.set({ name: "something" }, "value associated with obj")
  map.set( () => { console.log("hello world") }, "a function")
  map.set("hello", "world")
  map.set("nested", { val1: "val1", val2: "val2" })
  console.log(map)
  const dd = new WeakMap()
  dd.set({}, {})
  console.log(dd)
  console.log({ a: { b: { c: {} } } })
  console.log(new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
  console.log(new Set([async function a(){}, [], {}, new Set([1, 2, 3])]))
  console.log(new Promise(() => {}))
  // <div id="123" class="a b">123</div>
  console.log(document.querySelectorAll("div"))
  console.log(document.querySelector("div"))
  console.log(123, { a: { b: { c: {} } } })
  console.warn(123, { a: { b: { c: {} } } })
  console.error(123, { a: { b: { c: {} } } })
  console.info(123, { a: { b: { c: {} } } })
}