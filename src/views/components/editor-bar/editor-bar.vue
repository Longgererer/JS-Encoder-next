<script setup lang="ts">
import { IIconOption } from '@type/interface'
import { EditorViewId, IEditor } from '@type/editor'
import { useEditorWrapperStore } from '@store/editorWrapper'
import { computed, ref, watch, onMounted } from 'vue'
import Dropdown from '@components/dropdown/dropdown.vue'
import DropdownItem from '@components/dropdown/dropdownItem.vue'
import IconBtn from '@components/icon-btn/icon-btn.vue'
import { editorSideOpts, optionsListMap } from '@utils/config'
import useDragleaveJudge from '@hooks/useDragleaveJudge'

interface IProps {
  editorViewId: EditorViewId
}

const props = defineProps<IProps>()
const emits = defineEmits<{
  (e: 'clickTab', index: number): void
}>()

const { editorViewMap, updateTabs, updateTabDraggingState } = useEditorWrapperStore()
const editorView = editorViewMap[props.editorViewId]
/* 临时tabs列表，用来在拖拽的时候展示 */
let tempTabs: IEditor[] = []
/* 被拖拽的tab最后放入的位置 */
let finDragTabIndex: number = -1
/* 当前拖拽元素的index */
const currDragIndex = ref<number>(-1)
/* 当前拖拽tab与哪个index的tab重叠 */
const overlapIndex = ref<number>(-1)
/* tab bar右侧所表示的index，由于tab的数量不可能超过3个，因此这里使用3作为它的index */
const rightSideIndex = 3

const editorBarRef = ref<HTMLElement | null>(null)
const resetHookState = useDragleaveJudge(editorBarRef, () => {
  overlapIndex.value = -1
  tempTabs = []
})

const handleTabDragstart = (index: number): void => {
  currDragIndex.value = index
  updateTabDraggingState(true)
}
const handleTabDragover = (index: number): void => {
  if (currDragIndex.value === index) { return }
  // 拖拽过程中重叠位置的元素进行高亮显示
  overlapIndex.value = index
}
const handleTabDragend = (): void => {
  currDragIndex.value = -1
}
const handleTabDrop = (index: number): void => {
  if (currDragIndex.value !== index) {
    // 与其他tab进行位置交换
    const currDragTab = editorView.tabs[currDragIndex.value]
    tempTabs = [...editorView.tabs]
    tempTabs.splice(currDragIndex.value, 1)
    tempTabs.splice(index, 0, currDragTab)
    finDragTabIndex = index
  }
  updateTabDraggingState(false)
  currDragIndex.value = -1
  overlapIndex.value = -1
  resetHookState()
  if (!tempTabs.length) { return }
  updateTabs({ editorViewId: editorView.editorViewId, tabs: tempTabs })
  tempTabs = []
  if (finDragTabIndex > -1) {
    emits('clickTab', finDragTabIndex)
  }
}

/* 是否显示更多选项下拉菜单 */
const showSideMenu = ref<boolean>(false)

const sideOpts = computed(() => {
  const tab = editorView.tabs[editorView.currEditorIndex]
  return editorSideOpts[tab.prep]
})
</script>

<template>
  <div class="editor-bar bg-main2 flex no-select" ref="editorBarRef">
    <!-- tab位置切换动画 -->
    <transition-group name="list">
      <template v-for="(tab, index) in editorView.tabs" :key="tab.prep">
        <!-- tab间的分隔线 -->
        <div class="split-line fill-h bg-main3" v-if="index > 0"></div>
        <div class="editor-tab p-x-max fill-h font-active cursor-pointer transition-all flex-y-center"
          :class="{
            'active': index === editorView.currEditorIndex,
            'dragging': index === currDragIndex,
            'highlight': index === overlapIndex,
          }"
          draggable="true" @dragstart="handleTabDragstart(index)" @dragend="handleTabDragend"
          @mousedown="$emit('clickTab', index)" @drop.prevent="handleTabDrop(index)"
          @dragover.prevent="handleTabDragover(index)"
        >
          <i class="icon iconfont" :class="tab.icon"></i>
          <span class="editor-tab-title code-font">{{ tab.prep }}</span>
        </div>
      </template>
    </transition-group>
    <div
      class="flex flex-1 bg-main2 right-side pr-s"
      :class="overlapIndex === rightSideIndex ? 'highlight' : ''"
      @dragover.prevent="handleTabDragover(rightSideIndex)"
      @drop.prevent="handleTabDrop(editorView.tabs.length - 1)"
    >
      <!-- 占位 -->
      <div class="flex-1"></div>
      <!-- 直接展示出的选项 -->
      <div class="display-opts" v-if="sideOpts.displayOpts.length"></div>
      <!-- 更多选项菜单 -->
      <div class="more-opts">
        <dropdown v-model="showSideMenu" align="right">
          <div class="more-icon-wrapper flex-center">
            <IconBtn size="md" icon-class="icon-more"></IconBtn>
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

<style lang="scss" scoped>
.editor-bar {
  height: 36px;
  .split-line {
    border-right: 0.5px solid var(--color-main-bg-3);
  }
  .editor-tab {
    background-color: var(--color-main-bg-1);
    &.active {
      background-color: var(--color-main-bg-3);
      color: var(--color-active-color);
    }
    &.dragging {
      opacity: 0.3;
    }
    &.highlight {
      filter: brightness(1.5);
    }
  }
  .more-opts {
    .more-icon-wrapper {
      width: 36px;
      height: 36px;
    }
  }
  .right-side {
    &.highlight {
      filter: brightness(1.5);
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

</style>