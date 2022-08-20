import { defineStore } from 'pinia'
import { ELogType } from '@type/interface'

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
  filter: ELogType
}

export const useStore = defineStore('console', {
  state: (): IConsoleStore => {
    return {
      setting: {
        autoClear: true,
        highlightLog: true,
      },
      filter: ELogType.ALL,
    }
  },
  actions: {
    updateSetting(newSetting: IConsoleSetting) {
      this.setting = Object.assign(this.setting, {
        ...newSetting,
      })
    },
    updateFilter(newType: ELogType) {
      this.filter = newType
    },
  },
})