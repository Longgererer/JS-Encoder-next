import { defineStore } from "pinia"
import { isUndefined } from "@utils/judge"

export interface IModulesSize {
  /** 编辑器窗口宽度 */
  editorWidth: number
  /** 编辑器窗口宽度 */
  editorHeight: number
  /** console高度 */
  consoleHeight: number
  /** 预览高度 */
  previewHeight: number
  /** 结果(预览和console)窗口尺寸 */
  resultWidth: number
}

interface ILayoutStore {
  /** 是否展示结果窗口(预览和console) */
  showResultView: boolean
  /** 各模块尺寸配置 */
  modulesSize: IModulesSize
  /** 是否正在拖动改变模块宽高 */
  isModulesResizing: boolean
  /** 是否展示结果窗口 */
  isShowResult: boolean
  /** 是否已经初始化了模块的尺寸 */
  hasInitModulesSize: boolean
}

export const useLayoutStore = defineStore("layout", {
  state: (): ILayoutStore => ({
    showResultView: true,
    modulesSize: {
      editorWidth: 0,
      editorHeight: 0,
      consoleHeight: 0,
      previewHeight: 0,
      resultWidth: 0,
    },
    isModulesResizing: false,
    isShowResult: true,
    hasInitModulesSize: false,
  }),
  actions: {
    updateShowRightView(newState?: boolean): void {
      this.showResultView = isUndefined(newState) ? !this.showResultView : newState!
    },
    updateModuleSize(newSizeConfig: Partial<IModulesSize>): void {
      Object.assign(this.modulesSize, newSizeConfig)
    },
    updateIsModulesResizing(newState: boolean): void {
      this.isModulesResizing = newState
    },
    updateHasInitModulesSize(): void {
      this.hasInitModulesSize = true
    },
  },
})