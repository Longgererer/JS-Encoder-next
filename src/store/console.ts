import { defineStore } from "pinia"
import { LogFilterType } from "@type/console"

export interface IConsoleSetting {
  /** 每次执行代码前是否自动清空日志 */
  autoClear: boolean
  /** 控制台日志是否进行高亮 */
  highlightLog: boolean
}

export interface IConsoleStore {
  /** 控制台设置 */
  settings: IConsoleSetting
  /** 日志类型过滤选项 */
  filter: LogFilterType
  /** 各种日志类型数量 */
  logTypeCountMap: Partial<Record<LogFilterType, number>>
}

export const initSettings = {
  autoClear: true,
  highlightLog: true,
}

export const useConsoleStore = defineStore("console", {
  state: (): IConsoleStore => {
    return {
      settings: { ...initSettings },
      filter: LogFilterType.ALL,
      logTypeCountMap: {},
    }
  },
  actions: {
    updateSetting(newSetting: IConsoleSetting): void {
      this.$patch({ settings: { ...newSetting } })
    },
    updateFilter(newType: LogFilterType): void {
      this.filter = newType
    },
  },
})