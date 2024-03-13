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
    <template v-for="item in editor.tabIds" :key="item">
      <editor
        v-show="item === editor.displayTabId"
        :code="codeMap[item]"
        :prep="tabMap[item].prep"
        :settings="editorSettings"
        :extensions="prep2ExtensionsMap[tabMap[item].prep]"
        @code-changed="($event) => handleCodeChanged($event, item)"
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
import { computed, ref } from "vue"
import { ICodemirrorEditorSettings } from "../editor/editor"
import { debounce } from "@utils/tools/common"
import { AnyObject } from "@type/interface"
import { IEmits, IProps } from "./editor-view"
import { Extension } from "@codemirror/state"
import EditorExtensionsService from "@utils/editor/services/editor-extensions-service"
import { Prep } from "@type/prep"
import useTaskQueueControl from "@hooks/use-task-queue-control"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const editorWrapperStore = useEditorWrapperStore()
const editorConfigStore = useEditorConfigStore()
const commonStore = useCommonStore()
const editorConfigStoreRefs = storeToRefs(editorConfigStore)
const { editorMap, tabMap, codeMap } = storeToRefs(editorWrapperStore)
const { theme } = storeToRefs(commonStore)

/** 拖动tab分割窗口 */
const handleSelectSplitPosition = (splitPosition: AreaPosition): void => {
  emits("selectSplitPosition", splitPosition)
}

/** 当前视口editor */
const editor = ref<IEditor>(editorMap.value[props.id])

/** 编辑器内部设置 */
const editorSettings = computed<ICodemirrorEditorSettings>(() => {
  const { settings } = editorConfigStoreRefs
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
  const { settings } = editorConfigStoreRefs
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

/** 生成prep对应的拓展列表 */
const prep2ExtensionsMap = computed(() => {
  const prepList = Object.values(tabMap.value).map(({ prep }) => prep)
  return prepList.reduce((extensionsMap, currPrep) => {
    extensionsMap[currPrep] = editorExtensionsService.getEditorExtensions(currPrep, theme.value)
    return extensionsMap
  }, {} as Record<Prep, Extension[]>)
})

const { addTask, executeAndClearTaskQueue } = useTaskQueueControl()
/** 延迟存储 */
const saveDebounce = debounce(
  executeAndClearTaskQueue,
  editorConfigStoreRefs.settings.value.execute.delayTimeOfExecute,
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