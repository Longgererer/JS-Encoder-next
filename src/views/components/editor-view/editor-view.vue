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
    <editor
      :prep="displayTabInfo.prep"
      :settings="editorSettings"
    ></editor>
  </div>
</template>

<script setup lang="ts">
/** modules */
import { useEditorWrapperStore } from "@store/editorWrapper"
import { AreaPosition, IEditorTab } from "@type/editor"
import { storeToRefs } from "pinia"
import EditorBar from "@views/components/editor-bar/editor-bar.vue"
import OverlapMonitor from "@views/components/overlap-monitor/overlap-monitor.vue"
import Editor from "@views/components/editor/editor.vue"
import { useEditorConfigStore } from "@store/editorConfig"
import { computed } from "vue"
import { ICodemirrorEditorSettings } from "../editor/editor"

/** props */
const props = defineProps<{
  splitterId: number
  id: number
}>()
/** emits */
const emits = defineEmits<{
  (e: "selectSplitPosition", splitPosition: AreaPosition): void
}>()

const editorWrapperStore = useEditorWrapperStore()
const editorConfigStore = useEditorConfigStore()
const { updateEditor } = editorWrapperStore
const editorConfigStoreRefs = storeToRefs(editorConfigStore)
const { editorMap, tabMap } = storeToRefs(editorWrapperStore)
// const editor = editorMap.value[props.id]

/** 点击tab处理 */
const handleClickTab = (tabId: number) => {
  updateEditor(props.id, { displayTabId: tabId })
}

/* 拖动tab分割窗口 */
const handleSelectSplitPosition = (splitPosition: AreaPosition) => {
  emits("selectSplitPosition", splitPosition)
}

/** 获取当前editor展示tab的信息 */
const displayTabInfo = computed<IEditorTab>(() => {
  const { displayTabId } = editorMap.value[props.id]
  return tabMap.value[displayTabId]
})

/** 编辑器内部设置 */
const editorSettings = computed<ICodemirrorEditorSettings>(() => {
  const { edit, indent, other } = editorConfigStoreRefs
  return {
    ...edit.value,
    ...indent.value,
    style: getEditorStyle(),
    shortcutTemplate: other.value.shortcutTemplate,
  }
})

/** 获取编辑器内部需要设置的样式 */
const getEditorStyle = (): string => {
  const { font } = editorConfigStoreRefs
  return [
    `font-size: ${font.value.fontSize}px`,
    `font-family: ${font.value.fontFamily}`,
  ].join(";")
}
</script>

<style lang="scss" scoped>
.editor-view {
}
</style>