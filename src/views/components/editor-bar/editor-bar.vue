<script setup lang="ts">
import { IEditorBar } from '@type/editor'

defineProps<IEditorBar>()

const handleDragStart = () => {
  console.log('handleDragStart')
}
const handleDragOver = () => {
  console.log('handleDragOver')
}
const handleDragEnd = () => {
  console.log('handleDragEnd')
}
const handleClick = () => {
  console.log('handleClick')
}
</script>
<template>
  <div class="editor-bar bg-main2">
    <template v-for="tab in tabs" :key="tab.prep">
      <!-- tab间的分隔线 -->
      <div class="split-line fill-h bg-main3"></div>
      <div class="editor-tab p-x-max fill-h font-active cursor-pointer transition-all"
        :class="tab.isActive ? 'active' : ''" @dragstart="handleDragStart" @dragover="handleDragOver"
        @dragend="handleDragEnd" @click="handleClick">
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
    width: 1px;
  }
  .editor-tab {
    &.active {
      background-color: var(--color-main-bg-3);
      color: var(--color-active-color);
    }
  }
}
</style>