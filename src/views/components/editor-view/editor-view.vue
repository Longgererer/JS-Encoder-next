<template>
  <div class="editor-view fill flex-col over-hidden">
    <editor-bar
      :editor-id="id"
      :splitter-id="splitterId"
    ></editor-bar>
    <overlap-monitor
      v-if="editorWrapperStore.draggingTabInfo"
      @select-position="handleSelectSplitPosition"
    ></overlap-monitor>
    <template v-for="tabId in editor.tabIds" :key="tabId">
      <editor
        v-show="tabId === editor.displayTabId"
        :code="codeMap[tabId] || ''"
        :prep="tabId2PrepMap[tabId]"
        :settings="editorSettings"
        :extensions="tabId2Extensions[tabId]"
        @code-changed="($event) => handleCodeChanged($event, tabId)"
      ></editor>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { useEditorConfigStore } from "@store/editor-config"
import { useCommonStore } from "@store/common"
import { AreaPosition, IEditor } from "@type/editor"
import { storeToRefs } from "pinia"
import EditorBar from "@views/components/editor-bar/editor-bar.vue"
import OverlapMonitor from "@views/components/overlap-monitor/overlap-monitor.vue"
import Editor from "@views/components/editor/editor.vue"
import { computed, ref, shallowRef, watch } from "vue"
import { ICodemirrorEditorSettings } from "../editor/editor"
import { debounce } from "@utils/tools/common"
import { AnyObject } from "@type/interface"
import { IEmits, IProps } from "./editor-view"
import EditorExtensionsService from "@utils/editor/services/editor-extensions-service"
import useTaskQueueControl from "@hooks/use-task-queue-control"
import { Extension } from "@codemirror/state"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const editorWrapperStore = useEditorWrapperStore()
const editorConfigStore = useEditorConfigStore()
const commonStore = useCommonStore()
const { settings } = storeToRefs(editorConfigStore)
const { editorMap, codeMap, tabId2PrepMap } = storeToRefs(editorWrapperStore)
const { theme } = storeToRefs(commonStore)

/** 拖动tab分割窗口 */
const handleSelectSplitPosition = (splitPosition: AreaPosition): void => {
  emits("selectSplitPosition", splitPosition)
}

/** 当前视口editor */
const editor = ref<IEditor>(editorMap.value[props.id])

/** 编辑器内部设置 */
const editorSettings = computed<ICodemirrorEditorSettings>(() => {
  const { edit, indent, other } = settings.value
  return {
    ...edit,
    ...indent,
    style: getEditorStyle(),
    shortcutTemplate: other.shortcutTemplate,
  }
})

/** 获取编辑器内部需要设置的样式 */
const getEditorStyle = (): Record<string, AnyObject> => {
  const { font } = settings.value
  return {
    ".cm-scroller": {
      fontSize: `${font.fontSize}px`,
      fontFamily: `${font.fontFamily}`,
      lineHeight: 1.6,
    },
    "&.cm-focused": {
      outline: "none",
    },
  }
}

/** editor扩展处理 */
const editorExtensionsService = new EditorExtensionsService()

const tabId2Extensions = shallowRef<Record<number, Extension[]>>({})

watch(tabId2PrepMap, (newMap, oldMap) => {
  Object.keys(newMap).forEach((item) => {
    const tabId = Number(item)
    if (!oldMap || newMap[tabId] !== oldMap[tabId]) {
      const prep = tabId2PrepMap.value[tabId]
      tabId2Extensions.value[tabId] = editorExtensionsService.getEditorExtensions(prep, theme.value)
    }
  })
}, { immediate: true })

const { addTask, executeAndClearTaskQueue } = useTaskQueueControl()
/** 延迟存储 */
const saveDebounce = debounce(
  executeAndClearTaskQueue,
  settings.value.execute.delayTimeOfExecute,
)
/** code改变存入store */
const handleCodeChanged = (code: string, tabId: number): void => {
  addTask(() => {
    editorWrapperStore.updateCodeMap(tabId, code)
  }, tabId)
  saveDebounce()
}
</script>

<style lang="scss" scoped></style>