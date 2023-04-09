import { defineStore } from 'pinia'
import { isUndefined } from '@utils/judge'

interface ISize {
  width?: number,
  height?: number,
}

export interface IModulesSize {
  /* 编辑器宽度 */
  editorWidth: number
  /* console高度 */
  consoleHeight: number
  /* 预览高度 */
  previewHeight: number
  /* 结果(预览和console)窗口尺寸 */
  resultWidth: number
}

interface ILayoutStore {
  /* 是否展示结果窗口(预览和console) */
  showResultView: boolean
  /* 各模块尺寸配置 */
  modulesSize: IModulesSize
}

export const useLayoutStore = defineStore('layout', {
  state: (): ILayoutStore => ({
    showResultView: true,
    modulesSize: {
      editorWidth: 0,
      consoleHeight: 0,
      previewHeight: 0,
      resultWidth: 0,
    },
  }),
  actions: {
    updateShowRightView(newState?: boolean) {
      this.showResultView = isUndefined(newState) ? !this.showResultView : newState!
    },
    updateModuleSize(newSizeConfig: Partial<IModulesSize>) {
      Object.assign(this.modulesSize, newSizeConfig)
    },
  },
})