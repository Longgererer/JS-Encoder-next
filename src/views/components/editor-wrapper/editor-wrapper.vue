<template>
  <div class="editor-wrapper fill">
    <!--  根splitter  -->
    <editor-splitter
      v-if="rootSplitter?.id"
      :id="rootSplitter.id"
      :width="modulesSize.editorWidth"
      :height="modulesSize.editorHeight"
    ></editor-splitter>
  </div>
</template>

<script setup lang="ts">
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { OriginLang } from "@type/prep"
import EditorSplitter from "@views/components/editor-splitter/editor-splitter.vue"
import { IEditorSplitter } from "@type/editor"
import { useLayoutStore } from "@store/layout"
import { ref, watch } from "vue"

const editorWrapperStore = useEditorWrapperStore()
const layoutStore = useLayoutStore()
const { modulesSize } = layoutStore
const { createTab, updateCodeMap, createSplitter, createEditor, updateSplitter, updateEditor } = editorWrapperStore

/** 根splitter */
const rootSplitter = ref<IEditorSplitter | null>(null)

/** 初始化编辑窗口结构 */
const initEditorWrapperConfig = (): void => {
  // 先创建一个splitter根节点
  rootSplitter.value = createSplitter({})
  // 创建tab
  const tabHTML = createTab(OriginLang.HTML)
  const tabCSS = createTab(OriginLang.CSS)
  const tabJavaScript = createTab(OriginLang.JAVASCRIPT)
  // 初始化编辑器内容
  updateCodeMap(tabHTML.id, "")
  updateCodeMap(tabCSS.id, "")
  updateCodeMap(tabJavaScript.id, "")
  // 创建编辑器
  const editor = createEditor({
    displayTabId: tabHTML.id,
    parentId: rootSplitter.value.id,
    tabIds: [tabHTML.id, tabCSS.id, tabJavaScript.id],
  })
  updateSplitter(rootSplitter.value.id, { editorId: editor.id })
  const { editorWidth, editorHeight } = layoutStore.modulesSize
  updateEditor(editor.id, {
    size: { width: editorWidth, height: editorHeight },
  })
}

watch(() => layoutStore.hasInitModulesSize, () => {
  /** 初始化编辑窗口结构 */
  initEditorWrapperConfig()
})
</script>

<style lang="scss" scoped></style>