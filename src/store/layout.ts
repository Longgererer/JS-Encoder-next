import { isUndefined } from '@utils/common'
import { defineStore } from 'pinia'

interface ISize {
  width?: number,
  height?: number,
  minWidth?: number,
  minHeight?: number,
}

interface ILayoutStore {
  /* 是否展示预览窗口和console */
  showRightView: boolean
  /* 控制台窗口尺寸 */
  console: ISize,
  /* 预览窗口尺寸 */
  preview: ISize,
  /* 编辑区域窗口尺寸 */
  editorWrapper: ISize,
  /* 侧边栏宽度 */
  sidebarWidth: number,
  /* 头部高度 */
  navbarHeight: number,
}

export const useStore = defineStore('layout', {
  state: (): ILayoutStore => {
    return {
      showRightView: true,
      console: {
        minHeight: 28,
        minWidth: 200,
      },
      preview: {
        minHeight: 49,
        minWidth: 200,
      },
      editorWrapper: {},
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