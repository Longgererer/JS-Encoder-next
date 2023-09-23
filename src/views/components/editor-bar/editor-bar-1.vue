<script setup lang="ts">
import { useEditorWrapperStore } from "@store/editorWrapper"
import { computed, ref, toRefs } from "vue"
import Dropdown from "@components/dropdown/dropdown.vue"
import DropdownItem from "@components/dropdown/dropdownItem.vue"
import IconBtn from "@components/icon-btn/icon-btn.vue"
import { editorSideOpts, optionsListMap } from "@utils/config"
import useDragleaveJudge from "@hooks/useDragleaveJudge"
import { IEditorTab } from "@type/editor"
import UtilService from "@utils/services/util-service"
import { storeToRefs } from "pinia"
import { Align, Size } from "@type/interface"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"

interface IProps {
  editorId: number
  splitterId: number
}

const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: "clickTab", index: number): void
}>()

const utilService = new UtilService()
const editorWrapperStore = useEditorWrapperStore()
const { updateEditor, tabMap, updateDraggingTabInfo } = editorWrapperStore
const editorMap = toRefs(editorWrapperStore.editorMap)
const { draggingTabInfo } = storeToRefs(editorWrapperStore)
const editor = editorMap[props.editorId]

/* 临时tab id列表，用来在拖拽的时候展示 */
let tempTabIds: number[] = []
/* 当前拖拽元素的index，0表示没有 */
const currDragIndex = ref<number>(-1)
/* 当前拖拽tab与哪个index的tab重叠，0表示没有 */
const overlapIndex = ref<number>(-1)
/* tab bar右侧所表示的index，由于tab的数量不可能超过3个，因此这里使用3作为它的index */
const rightSideIndex = 3

/* 处理拖拽 */
const editorBarRef = ref<HTMLElement | null>(null)
const resetHookState = useDragleaveJudge(editorBarRef, () => {
  overlapIndex.value = -1
  tempTabIds = []
})

/* 开始拖拽时上报拖拽tab信息 */
const handleTabDragstart = (index: number, tabId: number): void => {
  currDragIndex.value = index
  const { editorId, splitterId } = props
  updateDraggingTabInfo({ tabId, editorId, splitterId })
}

/* 处理tab重叠情况，设置被重叠的tab的index，这时会在被重叠的tab左边插入一个与移动tab大小一致的高亮占位 */
const handleTabDragover = (index: number): void => {
  if (currDragIndex.value === index) { return }
  overlapIndex.value = index
}

/* 拖动结束，清除数据 */
const handleTabDragend = (): void => {
  currDragIndex.value = -1
}
const handleTabDrop = (index: number): void => {
  const dragTabId = editor.value.tabIds[currDragIndex.value]
  if (currDragIndex.value !== index) {
    // 与其他tab进行位置交换
    tempTabIds = [...editor.value.tabIds]
    utilService.swapArrayItem(tempTabIds, currDragIndex.value, index)
  }
  updateDraggingTabInfo(null)
  currDragIndex.value = -1
  overlapIndex.value = -1
  resetHookState()
  if (!tempTabIds.length) { return }
  updateEditor(props.editorId, { tabIds: tempTabIds })
  tempTabIds = []
  emits("clickTab", dragTabId)
}

/* 是否显示更多选项下拉菜单 */
const showSideMenu = ref<boolean>(false)

const sideOpts = computed(() => {
  const tab = tabMap[editor.value.displayTabId]
  return editorSideOpts[tab.prep]
})
</script>

<template>
  <div class="editor-bar bg-main2 flex no-select" ref="editorBarRef">
    <!-- tab位置切换动画 -->
    <template v-for="(tabId, index) in editor.tabIds" :key="tabId">
      <!-- tab间的分隔线 -->
      <div class="split-line fill-h bg-main3" v-if="index > 0"></div>
      <!-- 用于拖拽时占位 -->
      <div
        v-if="index === overlapIndex"
        class="editor-tab occupancy fill-h font-active cursor-pointer transition-all flex-y-center">
        <span class="code-font">{{ (tabMap[draggingTabInfo!.tabId]).prep }}</span>
      </div>
      <!-- tab本身 -->
      <div
        class="editor-tab fill-h font-active cursor-pointer transition-all flex-y-center"
        :class="{
          'active': tabId === editor.displayTabId,
          'dragging': index === currDragIndex,
        }"
        draggable="true"
        @dragstart="handleTabDragstart(index, tabId)"
        @dragend="handleTabDragend"
        @mousedown="$emit('clickTab', tabId)"
        @drop.prevent="handleTabDrop(index)"
        @dragover.prevent="handleTabDragover(index)">
        <span class="editor-tab-title code-font">{{ (tabMap[tabId]).prep }}</span>
      </div>
    </template>
    <div
      class="flex flex-1 bg-main2 right-side pr-s"
      :class="overlapIndex === rightSideIndex ? 'highlight' : ''"
      @dragover.prevent="handleTabDragover(rightSideIndex)"
      @drop.prevent="handleTabDrop(editor.tabIds.length - 1)">
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

<style lang="scss" scoped src="./editor-bar.scss"></style>