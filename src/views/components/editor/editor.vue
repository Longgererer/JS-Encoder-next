<template>
  <div class="fill over-hidden" ref="editorRef"></div>
</template>

<script setup lang="ts">
/**
 * desc: 编辑器实例
 */
import useCodemirrorEditor from "@hooks/use-codemirror-editor"
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from "vue"
import { IEmits, IProps } from "./editor"
import { EditorView } from "codemirror"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const editorRef = shallowRef<HTMLElement | null>(null)
const editorView = shallowRef<EditorView>()

onMounted(() => {
  // 初始化编辑器
  const editor = useCodemirrorEditor({
    parent: editorRef.value!,
    extensions: [
      ...(props.extensions || []),
      EditorView.updateListener.of((update) => {
        // 监听内容改变
        if (update.docChanged) {
          emits("codeChanged", update.state.doc.toString())
        }
      }),
    ],
  })
  editorView.value = editor.view
  /**
   * 监听各种编辑器状态设置
   */
  watch(
    () => props.code,
    (newContent) => {
      if (newContent === editor.getContent()) { return }
      editor.setContent(newContent)
    },
    { immediate: true },
  )
  watch(
    () => props.settings.tabSize,
    (newTabSize) => editor.setTabSize(newTabSize),
    { immediate: true },
  )
  watch(
    () => props.settings.indentWithTab,
    (newStatus) => editor.tabIndentToggler(newStatus),
    { immediate: true },
  )
  watch(
    () => props.settings.style,
    (newStyle) => {
      editor.setStyle(newStyle)
    },
    { immediate: true },
  )
  watch(
    () => props.extensions,
    (newExtensions) => {
      editor.extensionUpdater(newExtensions!)
    },
  )

  onBeforeUnmount(() => {
    editorView.value?.destroy()
  })
})

/** TODO: 设置编辑器的底部内边距 */
const setEditorBottomPadding = () => {
  if (!editorRef.value) { return }
  // 底部内边距 = 编辑器整体高度 - 编辑器行高度
  const editorHeight = editorRef.value.clientHeight || 0
  const lineHeight = (editorView.value?.lineBlockAt(1).height || 0) * 1.6
}
</script>

<style lang="scss" scoped></style>