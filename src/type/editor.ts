import { Origin, Prep } from '@type/prep'
import { IOption } from '@type/interface'

export interface IEditor {
  /* 当前tab对应编辑器使用的预处理语言 */
  prep: Prep
  /* 预处理语言对应的原生语言 */
  origin: Origin
}

export interface IEditorWrapper {
  /* 计数器，每新生成一个EditorView便自增，用来作为id */
  editorViewIdCount: number
  /* 计数器，每新生成一个EditorSplitter便自增，用来作为id */
  editorSplitterIdCount: number
  /* 是否正在拖拽tab（需要全局监听其拖动位置） */
  isTabDragging: boolean
  editorStructure: IEditorStructure
  editorViewMap: EditorViewMap
  editorSplitterMap: EditorSplitterMap
}

export enum SplitDirection {
  /* 横向分割 */
  HORIZON = 'horizon',
  /* 纵向分割 */
  VERTICAL = 'vertical',
}

export type EditorViewId = number
export type EditorSplitterId = number

/* 储存splitter包含结构，结构以一个初始的总体splitter为根 */
export interface IEditorStructure {
  /* 是否是根节点 */
  isRoot?: boolean
  splitterId: EditorSplitterId
  children: IEditorStructure[],
}

/* splitter，用来分隔编辑器视口，可横向或纵向分割 */
export interface IEditorSplitter {
  splitterId: EditorSplitterId
  /* 分割编辑视口的方式，横向或纵向 */
  splitDirection?: SplitDirection
  /* splitter里面包含的编辑视口id，最多有两个 */
  editorViewIds: EditorViewId[]
}

/* 包含当前编辑器视口的所有信息 */
export interface IEditorView {
  editorViewId: EditorViewId
  /* 该视口属于哪一个splitter的 */
  fromSplitterId: EditorSplitterId
  /* tab列表 */
  tabs: IEditor[]
  /* 当前展示的editor下标 */
  currEditorIndex: number
  /* 视口宽度 */
  width: number
  /* 视口高度 */
  height: number
}

/* EditorView的id对应的EditorView信息 */
export type EditorViewMap = Record<EditorViewId, IEditorView>

/* EditorSplitter的id对应的splitter信息 */
export type EditorSplitterMap = Record<EditorSplitterId, IEditorSplitter>