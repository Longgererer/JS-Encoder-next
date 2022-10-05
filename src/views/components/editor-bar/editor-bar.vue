<script setup lang="ts">
import { IOption } from '@type/interface'
import { IEditor } from '@type/editor'

interface IEditorBar {
  /* tab所属splitter的id，方便查找 */
  splitterId: number
  tabs: IEditor[]
  /* 平铺显示的菜单列表 */
  opts: IOption[]
  /* 更多选项列表 */
  moreOpts: IOption[]
}

const props = defineProps<IEditorBar>()

const emit = defineEmits<{
  (e: 'clickTab', splitterId: number, tab: IEditor): void
  (e: 'a', tab: IEditor): void
}>()

const handleDragStart = () => {
  console.log('handleDragStart')
}
const handleDragOver = () => {
  console.log('handleDragOver')
}
const handleDragEnd = () => {
  console.log('handleDragEnd')
}
</script>
<template>
  <div class="editor-bar bg-main2 flex">
    <template v-for="(tab, index) in tabs" :key="tab.prep">
      <!-- tab间的分隔线 -->
      <div class="split-line fill-h bg-main3" v-if="index > 0"></div>
      <div class="editor-tab p-x-max fill-h font-active cursor-pointer transition-all flex-y-center"
        :class="tab.isActive ? 'active' : ''" @dragstart="handleDragStart" @dragover="handleDragOver"
        @dragend="handleDragEnd" @click="$emit('clickTab', splitterId, tab)">
        <i class="icon iconfont" :class="tab.icon"></i>
        <span class="editor-tab-title code-font">{{ tab.prep }}</span>
      </div>
    </template>
  </div>
</template>
<style lang="scss">
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
}
</style>