<template>
  <div class="editor-view fill flex-col over-hidden">
    <editor-bar
      :editor-id="id"
      :splitter-id="splitterId"
      @click-tab="handleClickTab"
    ></editor-bar>
    <overlap-monitor
      v-if="editorWrapperStore.draggingTabInfo"
      @selectPosition="handleSelectSplitPosition"
    ></overlap-monitor>
  </div>
</template>

<script setup lang="ts">
/** modules */
import { useEditorWrapperStore } from "@store/editorWrapper"
import { AreaPosition } from "@type/editor"
import { storeToRefs } from "pinia"
import EditorBar from "@views/components/editor-bar/editor-bar.vue"
import OverlapMonitor from "@views/components/overlap-monitor/overlap-monitor.vue"

/** props */
const props = defineProps<{
  splitterId: number
  id: number
}>()
/** emits */
const emits = defineEmits<{
  (e: "selectSplitPosition", splitPosition: AreaPosition): void
}>()

/** store */
const editorWrapperStore = useEditorWrapperStore()
const { updateEditor } = editorWrapperStore
const { editorMap } = storeToRefs(editorWrapperStore)
const editor = editorMap.value[props.id]

const handleClickTab = (tabId: number) => {
  updateEditor(props.id, { displayTabId: tabId })
}

/* 拖动tab分割窗口 */
const handleSelectSplitPosition = (splitPosition: AreaPosition) => {
  emits("selectSplitPosition", splitPosition)
}
</script>

<style lang="scss" scoped>
.editor-view {
  background: #000;
}
</style>