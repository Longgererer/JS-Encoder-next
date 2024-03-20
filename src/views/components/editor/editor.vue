<template>
  <div class="fill over-hidden" ref="editorRef"></div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, shallowRef, watch } from "vue"
import { IEmits, IProps } from "./editor"
import { EditorView, basicSetup } from "codemirror"
import { EditorState } from "@codemirror/state"
import { CodemirrorBase } from "@utils/editor/utils/codemirror-base"
import { CodemirrorExtensionsUpdater } from "@utils/editor/utils/codemirror-extensions-updater"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const editorRef = shallowRef<HTMLElement | null>(null)
const editorState = shallowRef<EditorState>()
const editorView = shallowRef<EditorView>()

// eslint-disable-next-line max-lines-per-function
onMounted(() => {
  // 初始化编辑器
  editorState.value = EditorState.create({
    doc: props.code,
    extensions: [
      basicSetup,
      EditorView.updateListener.of((update) => {
        // 监听内容改变
        if (update.docChanged) {
          emits("codeChanged", update.state.doc.toString())
        }
      }),
    ],
  })
  editorView.value = new EditorView({
    state: editorState.value,
    parent: editorRef.value!,
  })

  const baseUtil = new CodemirrorBase(editorView.value)
  const extensionsUpdater = new CodemirrorExtensionsUpdater(editorView.value)
  /**
   * 监听各种编辑器状态设置
   */
  watch(
    () => props.code,
    (newContent) => {
      if (newContent === baseUtil.getContent()) { return }
      baseUtil.setContent(newContent)
    },
  )
  watch(
    () => props.settings.tabSize,
    (newTabSize) => extensionsUpdater.setTabSize(newTabSize),
    { immediate: true },
  )
  watch(
    () => props.settings.indentWithTab,
    (newStatus) => extensionsUpdater.tabIndentToggler(newStatus),
    { immediate: true },
  )
  watch(
    () => props.settings.style,
    (newStyle) => extensionsUpdater.setStyle(newStyle),
    { immediate: true },
  )
  watch(
    () => props.extensions,
    (newExtensions) => {
      extensionsUpdater.extensionUpdater(newExtensions!)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    editorView.value?.destroy()
  })
})
</script>

<style lang="scss" scoped></style>