import SingleInstance from "@utils/decorators/single-instance"
import { reactive } from "vue"
import { getArrayIntersection, getType } from "@utils/tools"
import { AnyArray, AnyObject } from "@type/interface"
import { ConsoleMethods, ConsoleUpdateType, IConsoleValue, ITableLogInfo, LogInfo, LogType, enableConsoleMethods } from "@type/console"
import { processConsoleValueList } from "@utils/tools/console-value"

export interface IConsoleOptions {
  /** 刷新前回调 */
  onLogsUpdated?: (updateType: ConsoleUpdateType, changeLogs?: LogInfo) => void
}

@SingleInstance
export default class ConsoleService {
  /** 日志列表 */
  public logs = reactive<LogInfo[]>([])
  /** iframe元素 */
  private iframe!: HTMLIFrameElement
  /** iframe中的window */
  private window!: Window & typeof globalThis
  private timeStamps: Record<string, number> = {}
  private consoleOptions: IConsoleOptions = {}

  constructor(iframe?: HTMLIFrameElement) {
    if (iframe) {
      this.iframe = iframe
      this.window = this.iframe!.contentWindow as Window & typeof globalThis
      this.setConsole()
    } else {
      if (!this.iframe) {
        throw new Error("初始化Console服务配置缺失！")
      }
    }
  }

  public setOptions(options: IConsoleOptions) {
    this.consoleOptions = options
  }

  public log(...args: any[]) {
    this.logs.push({ type: LogType.MESSAGE, method: "log", data: processConsoleValueList(args) })
  }

  public info(...args: any[]) {
    this.logs.push({ type: LogType.INFO, method: "info", data: processConsoleValueList(args) })
  }

  public warn(...args: any[]) {
    this.logs.push({ type: LogType.WARN, method: "warn", data: processConsoleValueList(args) })
  }

  public error(...args: any[]) {
    this.logs.push({ type: LogType.ERROR, method: "error", data: processConsoleValueList(args) })
  }

  public time(label: string = "default") {
    this.timeStamps[label] = performance.now()
  }

  public timeLog(label: string = "default", ...args: any[]) {
    this.log(this.getTimeDurationStr(label), ...args)
  }

  public timeEnd(label: string = "default") {
    this.log(this.getTimeDurationStr(label))
    Reflect.deleteProperty(this.timeStamps, label)
  }

  public getTimeDurationStr(label: string = "default") {
    const startTime = this.timeStamps[label]
    const duration = performance.now() - startTime
    return `${label}: ${duration}ms`
  }

  public assert(...args: AnyArray) {
    const [assertion, ...restArgs] = args
    const result = this.window.eval(assertion)
    if (result) { return }
    this.error("Assertion failed: ", ...restArgs)
  }

  public table(data: AnyObject | AnyArray, properties: string[] = []) {
    const headers: string[] = ["(index)"]
    const body: any[][] = []
    if (getType(data) === "Object") {
      // 如果data是对象，就取出对象的key和value作为表格的index和value即可
      headers.push("value")
      body.push(...Object.entries(data))
    } else if (getType(data) === "Array") {
      // 如果columns确为data中的属性名，便作为头部，否则仍然用value作为头部
      const keys = Object.keys(data)
      const intersection = getArrayIntersection(keys, properties)
      headers.push(...intersection)
      const rows = (data as AnyArray).map((item: any, index) => {
        return [String(index), intersection.map((key) => item[key])]
      })
      body.push(...rows)
    }
    const logInfo: ITableLogInfo = {
      type: LogType.MESSAGE,
      method: ConsoleMethods.TABLE,
      data: { headers, body: body.map((list) => processConsoleValueList(list)) },
    }
    this.logs.push(logInfo)
    this.consoleOptions.onLogsUpdated?.(ConsoleUpdateType.ADD, logInfo)
  }

  public clear() {
    this.logs.splice(0)
    this.consoleOptions.onLogsUpdated?.(ConsoleUpdateType.CLEAR)
  }

  private setConsole() {
    enableConsoleMethods.forEach((method) => {
      // @ts-expect-error: method为console内部方法
      this.window.console[method] = (...args) => {
        // @ts-expect-error: 同上
        // 在浏览器控制台打印日志
        window.console[method](...args)
        this.getMethodMap(...args)[method]()
      }
    })
  }

  private getMethodMap(...args: any[]) {
    return {
      [ConsoleMethods.LOG]: () => this.log(...args),
      [ConsoleMethods.INFO]: () => this.info(...args),
      [ConsoleMethods.WARN]: () => this.warn(...args),
      [ConsoleMethods.ERROR]: () => this.error(...args),
      [ConsoleMethods.TIME]: () => this.time(...args),
      [ConsoleMethods.TIME_LOG]: () => this.timeLog(...args),
      [ConsoleMethods.TIME_END]: () => this.timeEnd(args[0]),
      [ConsoleMethods.ASSERT]: () => this.assert(...args),
      [ConsoleMethods.CLEAR]: () => this.clear(),
      [ConsoleMethods.TABLE]: () => this.table(args[0], args[1]),
    }
  }
}