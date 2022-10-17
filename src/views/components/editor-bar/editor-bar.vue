<script setup lang="ts">
import { IOption } from '@type/interface'
import { EditorViewId, IEditor } from '@type/editor'
import { useEditorWrapperStore } from '@store/editorWrapper'
import { computed, ref, watch } from 'vue'
import Dropdown from '@components/dropdown/dropdown.vue'
import DropdownItem from '@components/dropdown/dropdownItem.vue'
import { editorSideOpts, optionsListMap } from '@utils/config'

interface IProps {
  editorViewId: EditorViewId
}
const props = defineProps<IProps>()
const emit = defineEmits<{
  (e: 'clickTab', index: number): void
}>()

const { editorViewMap } = useEditorWrapperStore()
const editorView = editorViewMap[props.editorViewId]

const currDragTab = ref<IEditor | null>(null)
const handleDragStart = (index: number) => {
  console.log('handleDragStart')
  currDragTab.value = editorView.tabs[index]
}
const handleDragOver = () => {
  console.log('handleDragOver')
}
const handleDragEnd = () => {
  console.log('handleDragEnd')
}

const showSideMenu = ref<boolean>(false)
watch(showSideMenu, () => {
  console.log('showSideMenu', showSideMenu)
})
const sideOpts = computed(() => {
  const tab = editorView.tabs[editorView.currEditorIndex]
  return editorSideOpts[tab.prep]
})
</script>

<template>
  <div class="editor-bar bg-main2 flex no-select pr-l">
    <template v-for="(tab, index) in editorView.tabs" :key="tab.prep">
      <!-- tab间的分隔线 -->
      <div class="split-line fill-h bg-main3" v-if="index > 0"></div>
      <div class="editor-tab p-x-max fill-h font-active cursor-pointer transition-all flex-y-center"
        :class="index === editorView.currEditorIndex ? 'active' : ''" draggable="true"
        @dragstart="handleDragStart(index)" @dragover="handleDragOver"
        @dragend="handleDragEnd" @click="$emit('clickTab', index)"
      >
        <i class="icon iconfont" :class="tab.icon"></i>
        <span class="editor-tab-title code-font">{{ tab.prep }}</span>
      </div>
    </template>
    <!-- 占位 -->
    <div class="flex-1"></div>
    <!-- 直接展示出的选项 -->
    <div class="display-opts" v-if="sideOpts.displayOpts.length"></div>
    <!-- 更多选项菜单 -->
    <div class="more-opts">
      <dropdown v-model="showSideMenu" align="right">
        <div class="more-opts-icon fade-ease cursor-pointer flex-center">
          <i class="fade-ease font-m icon iconfont icon-more"></i>
        </div>
        <template #options v-if="sideOpts.moreOpts.length">
          <dropdown-item v-for="(item, index) in sideOpts.moreOpts" :key="index">
            <span>{{optionsListMap[item].text}}</span>
          </dropdown-item>
        </template>
      </dropdown>
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
  }
  .more-opts {
    .more-opts-icon {
      height: 36px;
      i {
        color: var(--color-no-active-color);
      }
      &:hover {
        background-color: var(--color-main-bg-3);
        i {
          color: var(--color-active-color);
        }
      }
    }
  }
}
</style>