<template>
  <div class="fill" ref="editorRef"></div>
</template>

<script setup lang="ts">
/**
 * desc: 编辑器实例
 */
import useCodemirrorEditor from "@hooks/use-codemirror-editor"
import { onBeforeUnmount, onMounted, ref, watch } from "vue"
import { IEmits, IProps } from "./editor"
import { getDefaultEditorExtensions } from "@utils/config/editor.config"
import { EditorView } from "codemirror"
/** props */
const props = defineProps<IProps>()
/** emits */
const emits = defineEmits<IEmits>()

const editorRef = ref<HTMLElement | null>(null)
const editorView = ref<EditorView>()

onMounted(() => {
  // 初始化编辑器
  const editor = useCodemirrorEditor({
    parent: editorRef.value!,
    extensions: [
      getDefaultEditorExtensions(),
      EditorView.updateListener.of((update) => {
        // 监听内容改变
        if (update.docChanged) {
          emits("change", update.state.doc.toString())
        }
      })
    ],
  })
  editorView.value = editor.view

  /**
   * 监听各种编辑器状态设置
   */
  watch(
    () => props.modelValue,
    (newContent) => {
      if (newContent !== editor.getContent()) { return }
      editor.setContent(newContent)
    }
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
    (newStyle) => editor.setStyle(newStyle),
    { immediate: true },
  )

  onBeforeUnmount(() => {
    editorView.value?.destroy()
  })
})
</script>

<style lang="scss" scoped></style>