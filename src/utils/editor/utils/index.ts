import { Line, SelectionRange } from "@codemirror/state"
import { EditorView } from "@codemirror/view"

export interface IPosInfo {
  line: number
  ch: number
}

export interface ICursorBothSides {
  head: IPosInfo
  anchor: IPosInfo
}

/** 判断是否有文本被选中 */
export const somethingSelected = (view: EditorView): boolean => {
  return view.state.selection.ranges.some((r) => !r.empty)
}

/** 获取选中信息列表 */
export const getListSelections = (view: EditorView): readonly SelectionRange[] => {
  return view.state.selection.ranges
}

/** 获取光标位置 */
export const getCursorPos = (view: EditorView): IPosInfo => {
  return transOffset2Pos(view, view.state.selection.main.head)
}

/** 设置光标位置 */
export const setCursor = (view: EditorView, offset: number): void => {
  view.dispatch({ selection: { anchor: offset } })
}

/** 获取当前位置所在行数 */
export const getPosLine = (view: EditorView, offset: number): Line => {
  return view.state.doc.lineAt(offset)
}
//
export const getLine = (view: EditorView, lineNumber: number): Line => {
  return view.state.doc.line(lineNumber)
}

/** 获得范围内的文本 */
export const getRangeContent = (view: EditorView, from: IPosInfo, to: IPosInfo): string => {
  return view.state.sliceDoc(
    transPos2Offset(view, from),
    transPos2Offset(view, to),
  )
}

/** 获取选中的文本 */
export const getSelectionContent = (view: EditorView): string => {
  const { from, to } = view.state.selection.main
  return view.state.sliceDoc(from, to)
}

/** 替换范围内的文本 */
export const replaceRange = (
  view: EditorView,
  from: number,
  to?: number,
  insert: string = "",
): void => {
  view.dispatch({
    changes: { from, to, insert },
  })
}

/** 替换选择的文本 */
export const replaceSelection = (view: EditorView, insert: string = ""): void => {
  view.dispatch(view.state.replaceSelection(insert))
}

/** 将位置信息转换为偏移量 */
export const transPos2Offset = (view: EditorView, pos: IPosInfo): number => {
  return view.state.doc.line(pos.line + 1).from + pos.ch
}

/** 将偏移量转换为位置信息 */
export const transOffset2Pos = (view: EditorView, offset: number): IPosInfo => {
  const line = getPosLine(view, offset)
  return { line: line.number - 1, ch: offset - line.from }
}

/** 获得光标选中内容头尾位置 */
export const getCursorBothSides = (view: EditorView, selectInfo: SelectionRange): ICursorBothSides => {
  const { head, anchor } = selectInfo
  let headPos = transOffset2Pos(view, head)
  let anchorPos = transOffset2Pos(view, anchor)
  if (headPos.line > anchorPos.line || (headPos.line === anchorPos.line && headPos.ch > anchorPos.ch)) {
    [headPos, anchorPos] = [anchorPos, headPos]
  }
  return { head: headPos, anchor: anchorPos }
}