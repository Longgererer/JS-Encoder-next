<template>
  <div
    class="editor-splitter"
    :class="editorSplitter?.direction === SplitDirection.HORIZONTAL ? 'flex' : ''"
    :style="{ width: `${width}px`, height: `${height}px` }"
  >
    <!--  children不为空，表示不为叶子节点，存在子splitter  -->
    <template v-if="editorSplitter?.children?.length">
      <template v-for="(item, index) in editorSplitter.children" :key="item">
        <!--  如果只有一个splitter，不需要分割线进行分割，如果有两个splitter，则需要根据方向来进行分割  -->
        <div
          v-if="index > 0"
          class="resize-line cursor-x-resize bg-main2 fade-ease"
          :class="editorSplitter.direction === SplitDirection.HORIZONTAL ? 'resize-x' : 'resize-y'"
          @mousedown="handleResizeSplitter"
        ></div>
        <editor-splitter
          :id="item"
          :parent-id="props.id"
          :width="childrenSizeMap[item]?.width"
          :height="childrenSizeMap[item]?.height"
        ></editor-splitter>
      </template>
    </template>
    <!--  children为空，表示其为叶子节点，下面包含着编辑视口  -->
    <template v-else>
      <editor-view
        v-if="editorSplitter?.editorId"
        :splitter-id="props.id"
        :id="editorSplitter.editorId"
        @select-split-position="handleSelectSplitPosition"
      ></editor-view>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEditorWrapperStore } from "@store/editorWrapper"
import { ref, watch } from "vue"
import { AreaPosition, IEditorSplitter, SplitDirection } from "@type/editor"
import { storeToRefs } from "pinia"
import { ISize } from "@type/interface"
import ModuleSizeService, { SPLITTER_MIN_HEIGHT, SPLITTER_MIN_WIDTH } from "@utils/services/module-size-service"
import EditorView from "@views/components/editor-view/editor-view.vue"
import EditorSplitter from "@views/components/editor-splitter/editor-splitter.vue"
import UtilService from "@utils/services/util-service"

const props = defineProps<{
  /** splitter id */
  id: number
  /** splitter宽度 */
  width: number
  /** splitter高度 */
  height: number
}>()

/** pinia */
const editorWrapperStore = useEditorWrapperStore()
const {
  createSplitter, createEditor, updateEditor, updateSplitter, updateDraggingTabInfo, deleteSplitter, deleteEditor,
} = editorWrapperStore
const { editorMap, editorSplitterMap, draggingTabInfo } = storeToRefs(editorWrapperStore)

/** service */
const moduleSizeService = new ModuleSizeService()
const utilService = new UtilService()

/** 当前splitter */
const editorSplitter = editorSplitterMap.value[props.id]
/** 存放子splitter size */
const childrenSizeMap = ref<Record<number, ISize>>({})

/**
 * 监听改变的宽高将改变均分到children中
 * 如果splitter下面有editor(意味着没有子splitter)，那么它不需要监听宽高，因为editor会自动占满100%
 */
watch(() => props.width, (newWidth, oldWidth = 0) => {
  const { children = [], editorId } = editorSplitter
  if (editorId || children.length < 2) { return }
  setChildrenSplitterSize(newWidth - oldWidth)
}, { immediate: true })
watch(() => props.height, (newHeight, oldHeight = 0) => {
  const { children = [], editorId } = editorSplitter
  if (editorId || children.length < 2) { return }
  setChildrenSplitterSize(newHeight - oldHeight)
}, { immediate: true })

/**
 * 监听editorId变化
 * 如果editorId不为空，说明有没子splitter，需要清空childrenSizeMap
 * 如果editorId为空，说明有子splitter，需要根据direction将宽高均分给两个子splitter
 */
watch(() => editorSplitter.editorId, (editorId) => {
  if (editorId) {
    childrenSizeMap.value = {}
    console.log(childrenSizeMap.value)
  } else {
    const { width, height } = props
    const { direction, children = [] } = editorSplitter
    const [splitterSize1, splitterSize2] = moduleSizeService.getHalfModuleSize(
      { width, height },
      direction === SplitDirection.HORIZONTAL,
    )
    console.log(editorSplitter, splitterSize1, splitterSize2, width, height, props)
    const [splitterId1, spliiterId2] = children
    childrenSizeMap.value = {
      [splitterId1]: splitterSize1,
      [spliiterId2]: splitterSize2,
    }
  }
})

/** 在改变宽高时设置子splitter的尺寸 */
const setChildrenSplitterSize = (changeSize: number) => {
  const { children = [], direction } = editorSplitter
  const [splitterId1, spliiterId2] = children
  const [splitterSize1, splitterSize2] = moduleSizeService.getNewModulesSize(
    childrenSizeMap.value[splitterId1],
    childrenSizeMap.value[spliiterId2],
    direction === SplitDirection.HORIZONTAL,
    changeSize,
  )
  childrenSizeMap.value = {
    [splitterId1]: splitterSize1 as ISize,
    [splitterId1]: splitterSize2 as ISize,
  }
}


const handleResizeSplitter = () => {

}

/** tab拖动所导致的splitter分割 */
// eslint-disable-next-line max-lines-per-function
const handleSelectSplitPosition = (splitPosition: AreaPosition) => {
  // 获取拖动tab的信息
  const { tabId, editorId: fromEditorId, splitterId: fromSplitterId } = draggingTabInfo.value!
  // 获取释放tab所在splitter的信息
  const { editorId: toEditorId, id: toSplitterId, parentId } = editorSplitter
  /** 是否是fromEditor内的唯一tab */
  const isUniqueTab = editorMap.value[fromEditorId].tabIds.length === 1
  /** fromEditorId和toEditorId是否同一个 */
  const isCurrEditor = fromEditorId === toEditorId
  /** 两个splitter是否来自同一个父splitter */
  const isSameParent = checkIsSameParent(fromSplitterId, toSplitterId)
  /** 释放位置是否是中间 */
  const isMiddleArea = splitPosition === AreaPosition.MIDDLE
  // 先判断哪些情况是不需要处理的
  // 释放的editor和tab之前所在的editor是同一个 && (当前tab释放区域为中间 || fromEditor只有一个tab)
  if (isCurrEditor && (isMiddleArea || isUniqueTab)) {
    return updateDraggingTabInfo(null)
  }
  // 获取下双方的tabId列表
  const { tabIds: toTabIds } = editorMap.value[toEditorId!]
  const { tabIds: fromTabIds } = editorMap.value[fromEditorId]
  // 然后需要根据释放位置进行判断
  if (isMiddleArea) {
    // 前面已经过滤过了，这里只处理isCurrEditor为false的情况即可
    if (isUniqueTab) {
      // 如果拖动的tab是所在editor的唯一tab，那就需要删掉旧的editor，然后将新的tab放到目标editor中
      const newToTabIds = [...toTabIds, tabId]
      updateEditor(toEditorId!, {
        tabIds: newToTabIds,
        displayTabId: tabId,
      })
      /**
       * 删除fromSplitter
       * 如果fromSplitterId和toSplitter在同一个splitter下面，就删除这两个splitter
       * 将toSplitter的editor设置给parentSplitter，parentSplitter清空children和childrenSizeMap
       */
      if (isSameParent) {
        deleteSplitter(fromSplitterId, true)
        deleteSplitter(toSplitterId)
        updateSplitter(parentId!, {
          children: [],
          editorId: toEditorId,
        })
      }
    } else {
      // 如果不是唯一的tab，那就要把被拖动的tab从toEditor移动到fromEditor中
      const [newFromTabIds, newToTabIds] = utilService.moveArrItemToOtherArr({
        fromArr: fromTabIds,
        toArr: toTabIds,
        fromIndex: fromTabIds.findIndex((item) => item === tabId),
      })
      updateEditor(fromEditorId, {
        tabIds: newFromTabIds,
        displayTabId: newFromTabIds[0],
      })
      updateEditor(toEditorId!, {
        tabIds: newToTabIds,
        displayTabId: tabId,
      })
    }
  } else {
    if (isCurrEditor) {
      // 需要将释放tab所在的splitter下面新增两个子splitter
      processSpliteArea(toSplitterId, tabId, splitPosition)
      const newFromTabIds = utilService.deleteFirstMatchArrayItem(fromTabIds, tabId)
      updateEditor(fromEditorId, {
        tabIds: newFromTabIds,
        displayTabId: newFromTabIds[0],
      })
    } else {
      if (isUniqueTab) {
        console.log(123123123123123)
        deleteEditor(fromEditorId)
      } else {
      }
    }
  }
  updateDraggingTabInfo(null)
}

/** 分割splitter区域 */
const processSpliteArea = (splitterId: number, tabId: number, splitPosition: AreaPosition) => {
  // 判断分割方向
  const spliteDirectionInfo = getSpliteDirectionInfo(splitPosition)
  if (!spliteDirectionInfo) { return }
  const { isFirst, isHorizontal } = spliteDirectionInfo
  const { editorId: toEditorId } = editorSplitter
  // 创建新的editor，将tab放到editor中设置为当前展示
  const newEditor = createEditor({ displayTabId: tabId, tabIds: [tabId] })
  // 创建两个新的splitter，一个splitter放新的editor，另一个放原splitter的editor
  const newSplitter1 = createSplitter({
    parentId: splitterId,
    editorId: isFirst ? newEditor.id : toEditorId,
  })
  const newSplitter2 = createSplitter({
    parentId: splitterId,
    editorId: isFirst ? toEditorId : newEditor.id,
  })
  updateEditor(newEditor.id, { parentId: isFirst ? newSplitter1.id : newSplitter2.id })
  updateEditor(toEditorId!, { parentId: isFirst ? newSplitter2.id : newSplitter1.id })
  // 修改旧splitter的分割方向以及子splitter，移除原有的editorId
  updateSplitter(splitterId, {
    direction: isHorizontal ? SplitDirection.HORIZONTAL : SplitDirection.VERTICAL,
    children: [newSplitter1.id, newSplitter2.id],
    editorId: undefined,
  })
}

/** 获取分割方向信息 */
const getSpliteDirectionInfo = (
  splitPosition: AreaPosition,
): { isFirst: boolean, isHorizontal: boolean } | null => {
  return {
    [AreaPosition.UP]: { isFirst: true, isHorizontal: false },
    [AreaPosition.DOWN]: { isFirst: false, isHorizontal: false },
    [AreaPosition.LEFT]: { isFirst: true, isHorizontal: true },
    [AreaPosition.RIGHT]: { isFirst: false, isHorizontal: true },
    [AreaPosition.MIDDLE]: null,
    [AreaPosition.NULL]: null,
  }[splitPosition]
}

/** 检查两个splitter的父splitter是否同一个 */
const checkIsSameParent = (splitterId1: number, splitterId2: number): boolean => {
  const splitter1 = editorSplitterMap.value[splitterId1]
  const splitter2 = editorSplitterMap.value[splitterId2]
  return splitter1.parentId === splitter2.parentId
}
</script>

<style src="./editor-splitter.scss" lang="scss" scoped></style>