<script setup lang="ts">
/** module */
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { Origin, Prep } from "@type/prep"
import EditorSplitter from "@views/components/editor-splitter/editor-splitter.vue"
import { IEditorSplitter } from "@type/editor"
import { useLayoutStore } from "@store/layout"
import { ref, shallowRef, watch } from "vue"

/** store */
const editorWrapperStore = useEditorWrapperStore()
const layoutStore = useLayoutStore()
const { modulesSize } = layoutStore
const { createTab, createSplitter, createEditor, updateSplitter, updateEditor } = editorWrapperStore

/** 根splitter */
const rootSplitter = ref<IEditorSplitter | null>(null)

/** 初始化编辑窗口结构 */
const initEditorWrapperConfig = (): void => {
  // 先创建一个splitter根节点
  rootSplitter.value = createSplitter({})
  const tabHTML = createTab(Prep.HTML, Origin.HTML)
  const tabCSS = createTab(Prep.CSS, Origin.CSS)
  const tabJavaScript = createTab(Prep.JAVASCRIPT, Origin.JAVASCRIPT)
  const editor = createEditor({
    displayTabId: tabHTML.id,
    parentId: rootSplitter.value.id,
    tabIds: [ tabHTML.id, tabCSS.id, tabJavaScript.id ],
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

<style lang="scss" scoped>

</style>