import { defineStore } from 'pinia'
import {
  EditorSplitterId,
  EditorViewId,
  IEditor,
  IEditorSplitter,
  IEditorView,
  IEditorWrapper,
  SplitDirection,
} from '@type/editor'
import { Origin, Prep } from '@type/prep'

/**
 * 编辑器视图展示的数据结构如state所示
 * 结构以一个根视口分割器(splitter)开始，一个视口分割器至少有一个编辑视口(editorView)，至多有两个编辑视口
 */
export const useEditorWrapperStore = defineStore('editorWrapper', {
  state: (): IEditorWrapper => {
    return {
      editorViewIdCount: 1,
      editorSplitterIdCount: 1,
      isTabDragging: false,
      editorStructure: {
        isRoot: true,
        splitterId: 1,
        children: [],
      },
      editorViewMap: {
        [1]: {
          editorViewId: 1,
          fromSplitterId: 1,
          tabs: [{
            prep: Prep.HTML,
            origin: Origin.HTML,
          }, {
            prep: Prep.CSS,
            origin: Origin.CSS,
          }, {
            prep: Prep.JAVASCRIPT,
            origin: Origin.JAVASCRIPT,
          }],
          currEditorIndex: 0,
        },
      },
      editorSplitterMap: {
        [1]: {
          splitterId: 1,
          editorViewIds: [1],
        },
      },
    }
  },
  actions: {
    /* 更新编辑视口的任意属性 */
    updateEditorView(editorView: Partial<IEditorView> & Pick<IEditorView, 'editorViewId'>): void {
      const { editorViewId } = editorView
      Object.assign(this.editorViewMap[editorViewId], { ...editorView })
    },
    /* 创建编辑视口，分割视口的时候会用到 */
    createEditorView(editorView: Omit<IEditorView, 'editorViewId'>): void {
      const newId = this.editorViewIdCount ++
      this.editorViewMap[newId] = { editorViewId: newId, ...editorView }
    },
    /* 删除编辑器视口 */
    delEditorView(editorViewId: EditorViewId): void {
      const { editorViewMap } = this
      const { tabs } = editorViewMap[editorViewId]
      /* 删除映射关系 */
      Reflect.deleteProperty(editorViewMap, editorViewId)
    },
    /* 更新视口分割信息，分割视口的时候会用到 */
    updateEditorSplitter(editorSplitter: IEditorSplitter): void {
      const { splitterId } = editorSplitter
      Object.assign(this.editorSplitterMap[splitterId], { ...editorSplitter })
    },
    /* 创建视口分割器，如果原来的视口分割器已经包含两个编辑视口，那么在编辑视口分割时就会产生新的分割器 */
    createEditorSplitter(fromId: EditorSplitterId, viewId: EditorViewId, direction: SplitDirection): void {
      const newId = this.editorSplitterIdCount ++
      const editorSplitter = this.editorSplitterMap[fromId]
      const editorView = this.editorViewMap[viewId]
      /* 删除掉原来的分割器中包含的视口id */
      editorSplitter.editorViewIds = editorSplitter.editorViewIds.filter((item) => item !== viewId)
      /* 添加新的分割器 */
      this.editorSplitterMap[newId] = {
        splitterId: newId,
        splitDirection: direction,
        editorViewIds: [viewId],
      }
      /* 在结构中更新绑定信息 */
      const structures = [this.editorStructure]
      let len = structures.length
      for (let i = 0; i < len; i ++) {
        const structure = structures[i]
        if (structure.splitterId === fromId) {
          structure.children.push({
            splitterId: newId,
            children: [],
          })
          break
        } else {
          len = structures.push(...structure.children)
        }
      }
    },
    /* 更新编辑器的tab顺序 */
    updateTabs(tabsInfo: Pick<IEditorView, 'editorViewId' | 'tabs'>): void {
      const { editorViewId, tabs } = tabsInfo
      this.editorViewMap[editorViewId].tabs = tabs
    },
    /* 更新当前tab的预处理器 */
    updatePrep(info: { editorViewId: EditorViewId, prep: Prep, index: number }): void {
      const { editorViewId, prep, index } = info
      this.editorViewMap[editorViewId].tabs[index].prep = prep
    },
    updateTabDraggingState(newState: boolean): void {
      this.isTabDragging = newState
    },
  },
  getters: {
  },
})

const editorStructure1 = {
  isRoot: true,
  splitterId: 1,
  children: [],
}
const editorViewMap1 = {
  [1]: {
    editorViewId: 1,
    fromSplitterId: 1,
    tabs: [{
      prep: Prep.HTML,
      origin: Origin.HTML,
    }, {
      prep: Prep.CSS,
      origin: Origin.CSS,
    }, {
      prep: Prep.JAVASCRIPT,
      origin: Origin.JAVASCRIPT,
    }],
    currEditorIndex: 0,
    width: 1000,
    height: 1000,
  },
}



const editorStructure2 = {
  isRoot: true,
  splitterId: 1,
  children: [{
    isRoot: false,
    splitterId: 2,
    children: [],
  }, {
    isRoot: false,
    splitterId: 3,
    children: [],
  }],
}
const editorViewMap2 = {
  [1]: {
    editorViewId: 1,
    fromSplitterId: 1,
    tabs: [],
    currEditorIndex: 0,
    width: 1000,
    height: 1000,
  },
  [2]: {
    editorViewId: 2,
    fromSplitterId: 1,
    tabs: [{
      prep: Prep.HTML,
      origin: Origin.HTML,
    }, {
      prep: Prep.CSS,
      origin: Origin.CSS,
    }],
    currEditorIndex: 0,
    width: 500,
    height: 1000,
  },
  [3]: {
    editorViewId: 3,
    fromSplitterId: 1,
    tabs: [{
      prep: Prep.JAVASCRIPT,
      origin: Origin.JAVASCRIPT,
    }],
    currEditorIndex: 0,
    width: 500,
    height: 1000,
  },
}



const editorStructure3 = {
  isRoot: true,
  splitterId: 1,
  children: [{
    isRoot: false,
    splitterId: 2,
    children: [{
      isRoot: false,
      splitterId: 4,
      children: [],
    }, {
      isRoot: false,
      splitterId: 5,
      children: [],
    }],
  }, {
    isRoot: false,
    splitterId: 3,
    children: [],
  }],
}
const editorViewMap3 = {
  [1]: {
    editorViewId: 1,
    fromSplitterId: 1,
    tabs: [],
    currEditorIndex: 0,
    width: 1000,
    height: 1000,
  },
  [2]: {
    editorViewId: 2,
    fromSplitterId: 1,
    tabs: [],
    currEditorIndex: 0,
    width: 500,
    height: 1000,
  },
  [3]: {
    editorViewId: 3,
    fromSplitterId: 1,
    tabs: [{
      prep: Prep.JAVASCRIPT,
      origin: Origin.JAVASCRIPT,
    }],
    currEditorIndex: 0,
    width: 500,
    height: 1000,
  },
  [4]: {
    editorViewId: 4,
    fromSplitterId: 2,
    tabs: [{
      prep: Prep.HTML,
      origin: Origin.HTML,
    }],
    currEditorIndex: 0,
    width: 500,
    height: 500,
  },
  [5]: {
    editorViewId: 5,
    fromSplitterId: 2,
    tabs: [{
      prep: Prep.CSS,
      origin: Origin.CSS,
    }],
    currEditorIndex: 0,
    width: 500,
    height: 500,
  },
}
