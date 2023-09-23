import SingleInstance from "@utils/decorators/single-instance"
import { ISize } from "@type/interface"
import { IModulesSize } from "@store/layout"
import { SplitDirection } from "@type/editor"

/* 侧边栏宽度 */
export const SIDEBAR_WIDTH = 49
/* 预览窗口与编辑窗口分割线宽度 */
export const RESIZE_LINE_SIZE = 4
/* navbar高度 */
export const NAV_BAR_HEIGHT = 49
/* 结果(预览和console)窗口最小宽度 */
export const RESULT_MIN_WIDTH = 50
/* 编辑窗口最小宽度 */
export const EDITOR_MIN_WIDTH = 150
/* console最小高度 */
export const CONSOLE_MIN_HEIGHT = 28
/* 预览窗口最小高度 */
export const PREVIEW_MIN_HEIGHT = 36
/* splitter的最小宽度 */
export const SPLITTER_MIN_WIDTH = 50
/* splitter的最小高度 */
export const SPLITTER_MIN_HEIGHT = 50

interface IModuleInfo extends Partial<ISize> {
  minWidth?: number
  minHeight?: number
}

/**
 * 处理模块尺寸
 */
@SingleInstance
export default class ModuleSizeService {
  constructor() {}

  /* 获取整个窗口高度 */
  public getWindowSize(): ISize {
    return { width: window.innerWidth, height: window.innerHeight }
  }

  public getResizeAreaSize(): ISize {
    const { width, height } = this.getWindowSize()
    return {
      width: width - SIDEBAR_WIDTH - RESIZE_LINE_SIZE,
      height: height - NAV_BAR_HEIGHT,
    }
  }

  /**
   * 获取初始模块宽高
   * 编辑窗口高度占满，宽度与(预览窗口、console窗口)平分
   * 预览窗口和console窗口高度比为3:1
   */
  public getInitModulesSize(): IModulesSize {
    const { width, height } = this.getResizeAreaSize()
    const editorHeight = height
    const editorWidth = Math.floor(width / 2)
    const resultWidth = width - editorWidth
    const previewHeight = Math.floor(height / 2)
    const consoleHeight = height - previewHeight
    return {
      editorWidth,
      editorHeight,
      previewHeight,
      consoleHeight,
      resultWidth,
    }
  }

  /**
   * 在拖动分割线时更改相邻两个模块的尺寸
   * 当一个模块的尺寸达到了最小尺寸的限制，就停止改变
   * 注意：module1表示相对位置为左或上的module，module2表示相对位置为右或下的module
   */
  public getNewModulesSize(
    module1: IModuleInfo,
    module2: IModuleInfo,
    isHorizontal: boolean,
    changeSize: number,
  ): IModuleInfo[] {
    console.log(module1, module2)
    let finalChangeSize = changeSize
    // 根据分割方向判断要处理的key
    const sizeKey = isHorizontal ? "width" : "height"
    const minSizeKey = isHorizontal ? "minWidth" : "minHeight"
    // 如果对应的尺寸没有传，直接原样返回
    if (module1[sizeKey] === undefined || module2[sizeKey] === undefined) {
      return [module1, module2]
    }
    // 根据changeSize是否小于0判断拖动方向，小于0表示相对位置为右或下的module尺寸变小，反之则是相对位置为左或上的module尺寸变小
    // 如果任何一个module达到了最小的尺寸，就不再减小了
    if (changeSize < 0) {
      const module2RestSize = module2[sizeKey]! - (module2[minSizeKey] || 0)
      if (module2RestSize <= Math.abs(changeSize)) {
        finalChangeSize = -module2RestSize
      }
    } else {
      const module1RestSize = module1[sizeKey]! - (module1[minSizeKey] || 0)
      if (module1RestSize <= changeSize) {
        finalChangeSize = module1RestSize
      }
    }
    return [
      { ...module1, [sizeKey]: module1[sizeKey]! - finalChangeSize },
      { ...module2, [sizeKey]: module2[sizeKey]! + finalChangeSize },
    ]
  }

  /* 将尺寸分割成两半 */
  public getHalfModuleSize(module: ISize, isHorizontal: boolean): ISize[] {
    const sizeKey = isHorizontal ? "width" : "height"
    const halfSize = Math.floor(module[sizeKey] / 2)
    return [
      { ...module, [sizeKey]: halfSize },
      { ...module, [sizeKey]: module[sizeKey] - halfSize },
    ]
  }
}

/**
 * splitter本身没有尺寸，完全依赖内部的editor将其撑开，因此在拖动splitter的分割线的时候
 * 首先需要找到splitter内部的所有editor
 * 找出来所有editor之后需要根据分割的方向来决定是更改宽度还是高度
 * 可能需要用到递归
 * 需要更改editor尺寸的途径有如下几种：
 * 1. 新建splitter（拖动tab在已有splitter下创建新的splitter）
 * 这种情况下需要获取已有splitter(父splitter)
 *
 * 2. 删除splitter（拖动tab将splitter与另一个splitter合并）
 *
 *
 * 3. 拖动splitter分割线直接改变editor尺寸
 *
 */