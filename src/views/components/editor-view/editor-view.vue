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
      :code="currEditorCode"
      :prep="displayTabInfo.prep"
      :settings="editorSettings"
      @codeChanged="handleCodeChanged"
    ></editor>
  </div>
</template>

<script setup lang="ts">
/** modules */
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { useEditorConfigStore } from "@store/editor-config"
import { AreaPosition, IEditorTab } from "@type/editor"
import { storeToRefs } from "pinia"
import EditorBar from "@views/components/editor-bar/editor-bar.vue"
import OverlapMonitor from "@views/components/overlap-monitor/overlap-monitor.vue"
import Editor from "@views/components/editor/editor.vue"
import { computed } from "vue"
import { ICodemirrorEditorSettings } from "../editor/editor"
import { debounce } from "@utils/common"

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
const editorConfigStoreRefs = storeToRefs(editorConfigStore)
const { editorMap, tabMap, codeMap } = storeToRefs(editorWrapperStore)
// const editor = editorMap.value[props.id]

/**
 * tab事件
 */

/** 点击tab处理 */
const handleClickTab = (tabId: number) => {
  editorWrapperStore.updateEditor(props.id, { displayTabId: tabId })
}

/** 拖动tab分割窗口 */
const handleSelectSplitPosition = (splitPosition: AreaPosition) => {
  emits("selectSplitPosition", splitPosition)
}

/**
 * editor组件所需
 */

/** 获取当前editor展示tab的信息 */
const displayTabInfo = computed<IEditorTab>(() => {
  const { displayTabId } = editorMap.value[props.id]
  return tabMap.value[displayTabId]
})

/** 获取当前editor中展示tab下的code */
const currEditorCode = computed(() => {
  return codeMap.value[displayTabInfo.value.id]
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
const getEditorStyle = () => {
  const { font } = editorConfigStoreRefs
  return {
    "&": {
      fontSize: `${font.value.fontSize}px`,
      fontFamily: `${font.value.fontFamily}`,
    },
  }
}

/** code改变存入store */
const handleCodeChanged = (newCode: string) => {
  const { execute } = editorConfigStoreRefs
  /** 延迟同步store，进而延迟编译 */
  debounce(() => {
    editorWrapperStore.updateCodeMap(displayTabInfo.value.id, newCode)
  }, execute.value.delayTimeOfExecute)()
}
</script>

<style lang="scss" scoped>
.editor-view {
}
</style>