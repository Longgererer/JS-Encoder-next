import { isUndefined } from '@utils/tool'
import { defineStore } from 'pinia'

interface ISize {
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
}

interface ILayoutStore {
  /** 是否展示预览窗口和console */
  showRightView: boolean
  console: ISize,
  preview: ISize,
  editor: ISize,
  /** 侧边栏宽度 */
  sidebarWidth: number,
  /** 头部高度 */
  navbarHeight: number,
}

export const useStore = defineStore('layout', {
  state: (): ILayoutStore => {
    return {
      showRightView: true,
      console: {},
      preview: {},
      editor: {},
      sidebarWidth: 49,
      navbarHeight: 49,
    }
  },
  actions: {
    updateShowRightView(newState?: boolean) {
      this.showRightView = isUndefined(newState) ? !this.showRightView : newState!
    },
  },
})