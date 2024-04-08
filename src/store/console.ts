import { defineStore } from "pinia"
import { LogFilterType } from "@type/console"

interface IConsoleSetting {
  /** 每次执行代码前是否自动清空日志 */
  autoClear: boolean
  /** 控制台日志是否进行高亮 */
  highlightLog: boolean
}

interface IConsoleStore {
  /** 控制台设置 */
  setting: IConsoleSetting
  /** 日志类型过滤选项 */
  filter: LogFilterType
  /** 各种日志类型数量 */
  logTypeCountMap: Partial<Record<LogFilterType, number>>
}

export const useConsoleStore = defineStore("console", {
  state: (): IConsoleStore => {
    return {
      setting: {
        autoClear: true,
        highlightLog: true,
      },
      filter: LogFilterType.ALL,
      logTypeCountMap: {},
    }
  },
  actions: {
    updateSetting(newSetting: IConsoleSetting): void {
      this.setting = Object.assign(this.setting, {
        ...newSetting,
      })
    },
    updateFilter(newType: LogFilterType): void {
      this.filter = newType
    },
  },
})