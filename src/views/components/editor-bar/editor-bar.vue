<template>
  <div class="editor-bar bg-main2 flex no-select" ref="editorBarRef">
    <!-- tab位置切换动画 -->
    <template v-for="(tabId, index) in editor.tabIds" :key="tabId">
      <!-- tab间的分隔线 -->
      <div class="split-line fill-h bg-main3" v-if="index > 0"></div>
      <!-- tab本身 -->
      <div
        class="editor-tab fill-h font-active cursor-pointer transition-all flex-y-center"
        :class="{
          'active': tabId === editor.displayTabId,
          'dragging': tabId === draggingTabInfo?.tabId,
          'highlight': tabId === currOverlapTabId,
        }"
        draggable="true"
        @mousedown="handleClickTab(tabId)"
        @dragstart="handleTabDragstart(tabId)"
        @dragend="handleTabDragend()"
        @drop.prevent="handleTabDrop(tabId)"
        @dragover.prevent="handleTabDragover(tabId)">
        <span class="editor-tab-title code-font">{{ (tabMap[tabId]).prep }}</span>
      </div>
    </template>
    <div
      class="flex flex-1 bg-main2 right-side pr-s"
      :class="isOverlapRightSide ? 'highlight' : ''"
      @dragover.prevent="handleTabDragOverRightSide()"
      @dragleave.prevent="handleTabDragLeaveRightSide()"
      @drop.prevent="handleTabDrop()">
      <!-- 占位 -->
      <div class="flex-1"></div>
      <!-- 直接展示出的选项 -->
      <div class="display-opts" v-if="sideOpts.displayOpts.length"></div>
      <!-- 更多选项菜单 -->
      <div class="more-opts">
        <dropdown v-model="showSideMenu" :align="Align.RIGHT">
          <div class="more-icon-wrapper flex-center">
            <icon-btn :size="IconBtnSize.MD" icon-class="icon-more"></icon-btn>
          </div>
          <template #options v-if="sideOpts.moreOpts.length">
            <dropdown-item v-for="(item, index) in sideOpts.moreOpts" :key="index">
              <span>{{ optionsListMap[item].text }}</span>
            </dropdown-item>
          </template>
        </dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/** modules */
import { ref } from "vue"
import { optionsListMap } from "@utils/config"
import { storeToRefs } from "pinia"
import { useEditorWrapperStore } from "@store/editorWrapper"
import { Align } from "@type/interface"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"
import { useSidemenu } from "./hooks/sideMenu"
import useDragleaveJudge from "@hooks/useDragleaveJudge"
import Dropdown from "@components/dropdown/dropdown.vue"
import DropdownItem from "@components/dropdown/dropdownItem.vue"
import IconBtn from "@components/icon-btn/icon-btn.vue"
import UtilService from "@utils/services/util-service"

const props = defineProps<{
  editorId: number
  splitterId: number
}>()

/** pinia */
const editorWrapperStore = useEditorWrapperStore()
const { updateEditor, updateDraggingTabInfo } = editorWrapperStore
const { editorMap, draggingTabInfo, tabMap } = storeToRefs(editorWrapperStore)

/** service */
const utilService = new UtilService()

/**
 * tab的拖动逻辑如下
 * 1. tab在拖动到其他tab上时，目标tab会高亮；此时释放鼠标，高亮消失，被拖动的tab移动到目标tab的左边
 * 2. tab在拖动到editor-bar的右侧空白位置时，右侧空白位置高亮；此时释放鼠标，高亮消失，被拖动的tab移动到editor-bar中所有tab的最右边
 */

/** 当前tab所在editor */
const editor = editorMap.value[props.editorId]
/** tab是否拖动到了右侧边栏 */
const isOverlapRightSide = ref<boolean>(false)
/** 当前被重叠(高亮)的tabId */
const currOverlapTabId = ref<number | null>(null)

/** 点击tab，设置editor下展示的tabId */
const handleClickTab = (tabId: number) => {
  updateEditor(props.editorId, { displayTabId: tabId })
}
/** 开始拖拽时上报拖拽tab信息 */
const handleTabDragstart = (tabId: number): void => {
  const { editorId, splitterId } = props
  updateDraggingTabInfo({ tabId, editorId, splitterId })
}
/* 处理tab重叠情况，设置被重叠的tab的index，这时会在被重叠的tab左边插入一个与移动tab大小一致的高亮占位 */
const handleTabDragover = (tabId: number): void => {
  if (currOverlapTabId.value === tabId) { return }
  currOverlapTabId.value = tabId
}
/** 处理tab在右侧工具栏的移入和移出*/
const handleTabDragOverRightSide = (): void => {
  currOverlapTabId.value = null
  isOverlapRightSide.value = true
}
const handleTabDragLeaveRightSide = (): void => {
  isOverlapRightSide.value = false
}
/** 处理拖拽移出(dragleave)事件 */
const editorBarRef = ref<HTMLElement | null>(null)
const resetHookState = useDragleaveJudge(editorBarRef, () => {
  resetDragState()
})
/** 拖动结束，清除数据 */
const handleTabDragend = (): void => {
  isOverlapRightSide.value = false
}
/**
 * 拖动释放，对tab位置进行处理
 * 如果是在右侧边栏释放tab，则tab放到最右边，若是放到其他tab上，则放到对应tab的左边
 * 如果没有传tabId表示是右侧工具栏
 */
const handleTabDrop = (tabId?: number): void => {
  const { editorId: fromEditorId, tabId: draggingTabId } = draggingTabInfo.value!
  const { tabIds: fromTabIds } = editorMap.value[fromEditorId]
  const { id: toEditorId, tabIds: toTabIds } = editor
  /** tab所释放的目标是否为当前editor */
  const isCurrEditor = props.editorId === fromEditorId
  /** 拖拽tab的index */
  const draggingTabIndex = fromTabIds.findIndex((id) => draggingTabId === id)
  if (isOverlapRightSide.value) {
    // tab拖到右侧工具栏
    // 将tab挪到最后
    const finalToTabIds = utilService.moveArrayItem(toTabIds, draggingTabIndex, toTabIds.length - 1)
    if (!isCurrEditor) {
      const finalFromTabIds = utilService.deleteFirstMatchArrayItem(fromTabIds, draggingTabId)
      // 更新tab起始editor的信息
      updateEditor(fromEditorId, {
        tabIds: finalFromTabIds,
        ...(finalFromTabIds.length ? { displayTabId: finalFromTabIds[0] } : null),
      })
    }
    updateEditor(toEditorId, { tabIds: finalToTabIds, displayTabId: draggingTabId })
  } else {
    // tab拖到其他tab上
    /** 当前被重叠(高亮)tab的index */
    const currOverlapTabIndex = toTabIds.findIndex((id) => currOverlapTabId.value === id)
    if (isCurrEditor) {
      // 如果是当前edior，直接将tab插入到高亮tab的左边
      const finalToTabIds = utilService.moveArrayItem(toTabIds, draggingTabIndex, currOverlapTabIndex)
      updateEditor(toEditorId, { tabIds: finalToTabIds, displayTabId: draggingTabId })
    } else {
      const finalFromTabIds = utilService.deleteFirstMatchArrayItem(fromTabIds, draggingTabId)
      updateEditor(fromEditorId, {
        tabIds: finalFromTabIds,
        ...(finalFromTabIds.length ? { displayTabId: finalFromTabIds[0] } : null),
      })
      const finalToTabIds = toTabIds.splice(currOverlapTabIndex, 0, draggingTabId)
      updateEditor(toEditorId, { tabIds: finalToTabIds, displayTabId: draggingTabId })
    }
  }
  updateDraggingTabInfo(null)
  // 清除drag计数
  resetHookState()
  // 清除数据，tab高亮消失
  resetDragState()
}

const resetDragState = () => {
  currOverlapTabId.value = null
  isOverlapRightSide.value = false
}

/** 右侧工具栏菜单 */
const { showSideMenu, sideOpts } = useSidemenu(editor, tabMap)
</script>

<style src="./editor-bar.scss" lang="scss" scoped></style>