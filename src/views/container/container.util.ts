/* 侧边栏宽度 */
import { IModulesSize } from '@store/layout'

/* 侧边栏宽度 */
export const SIDEBAR_WIDTH = 49
/* 预览窗口与编辑窗口分割线宽度 */
export const RESIZER_WIDTH_BETWEEN_PREVIEW_AND_EDITOR = 4
/* navbar高度 */
export const NAV_BAR_HEIGHT = 49
/* 结果(预览和console)窗口最小宽度 */
export const RESULT_MIN_WIDTH = 50
/* 编辑窗口最小宽度 */
export const EDITOR_MIN_WIDTH = 100
/* console最小高度 */
export const CONSOLE_MIN_HEIGHT = 28
/* 预览窗口最小高度 */
export const PREVIEW_MIN_HEIGHT = 36

const getWindowSize = (): { windowWidth: number, windowHeight: number } => ({
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
})

/**
 * 获取初始模块宽高
 * 编辑窗口高度占满，宽度与(预览窗口、console窗口)平分
 * 预览窗口和console窗口高度比为3:1
 */
export const getInitModulesSize = (): IModulesSize => {
  const { windowWidth, windowHeight } = getWindowSize()
  const resizeAreaWidth = windowWidth - SIDEBAR_WIDTH - RESIZER_WIDTH_BETWEEN_PREVIEW_AND_EDITOR
  const resizeAreaHeight = windowHeight - NAV_BAR_HEIGHT
  const editorWidth = Math.floor(resizeAreaWidth / 2)
  const resultWidth = resizeAreaWidth - editorWidth
  const previewHeight = Math.floor(resizeAreaHeight / 2)
  const consoleHeight = resizeAreaHeight - previewHeight
  return {
    editorWidth,
    previewHeight,
    consoleHeight,
    resultWidth,
  }
}

/**
 * 获取各模块宽度
 * 当可见窗口宽度改变时，更改编辑窗口和结果(预览和console)窗口的宽度
 * 如果任意一个窗口宽度达到了最小值，只改变另一个窗口的宽度
 * changedWidth < 0 表示宽度变小，> 0 则为宽度变大
 */
export const getModulesWidth = (changedWidth: number, modulesSize: IModulesSize): Partial<IModulesSize> => {
  const { editorWidth, resultWidth } = modulesSize
  const isReachEditorMinWidth = editorWidth <= EDITOR_MIN_WIDTH
  const isReachResultMinWidth = resultWidth <= RESULT_MIN_WIDTH
  const isWindowWidthDecreased = changedWidth < 0
  // 处理两个窗口宽度达到最小值的情况
  if (isReachEditorMinWidth && isReachResultMinWidth && isWindowWidthDecreased) {
    return {}
  }
  if (isReachEditorMinWidth && isWindowWidthDecreased) {
    return { resultWidth: resultWidth + changedWidth }
  }
  if (isReachResultMinWidth && isWindowWidthDecreased) {
    return { editorWidth: editorWidth + changedWidth }
  }
  // 如果两个窗口宽度都没有达到最小值，均分改变的宽度
  const averageWidth = changedWidth / 2
  return {
    editorWidth: editorWidth + averageWidth,
    resultWidth: resultWidth + averageWidth,
  }
}

/**
 * 获取各模块高度
 * 当可见窗口高度改变时，更改预览和console窗口的高度
 * 如果任意一个窗口高度达到了最小值，只改变另一个窗口的高度
 * changedHeight < 0 表示高度变小，> 0 则为高度变大
 */
export const getModulesHeight = (changedHeight: number, modulesSize: IModulesSize): any => {
  const { previewHeight, consoleHeight } = modulesSize
  const isReachPreviewMinHeight = previewHeight <= PREVIEW_MIN_HEIGHT
  const isReachConsoleMinHeight = consoleHeight <= CONSOLE_MIN_HEIGHT
  const isWindowHeightDecreased = changedHeight < 0
  // 处理两个窗口高度达到最小值的情况
  if (isReachPreviewMinHeight && isReachConsoleMinHeight && isWindowHeightDecreased) {
    return {}
  }
  if (isReachPreviewMinHeight && isWindowHeightDecreased) {
    return { consoleHeight: consoleHeight + changedHeight }
  }
  if (isReachConsoleMinHeight && isWindowHeightDecreased) {
    return { previewHeight: previewHeight + changedHeight }
  }
  // 如果两个窗口高度都没有达到最小值，均分改变的高度
  const averageHeight = changedHeight / 2
  return {
    previewHeight: previewHeight + averageHeight,
    consoleHeight: consoleHeight + averageHeight,
  }
}