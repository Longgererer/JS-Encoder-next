<template>
  <div class="fill" ref="editorRef"></div>
</template>

<script setup lang="ts">
/**
 * desc: 编辑器实例
 */
import useCodemirrorEditor from "@hooks/use-codemirror-editor"
import { Prep } from "@type/prep"
import { onMounted, ref, watch } from "vue"
import { IEmits, IProps } from "./editor"
import { Extension } from "@codemirror/state"
import { getDefaultEditorExtensions } from "@utils/config/editor.config"
import { EditorView } from "codemirror"
/** props */
const props = defineProps<IProps>()
/** emits */
const emits = defineEmits<IEmits>()
/** service */
/** store */

const editorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  // 初始化编辑器
  const {
    view, getContent, setContent, setTabSize, tabIndentToggler,
  } = useCodemirrorEditor({
    parent: editorRef.value!,
    extensions: [
      getDefaultEditorExtensions(),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) {
          emits("change", update.state.doc.toString())
        }
      })
    ],
  })

  // 监听tabSize改变
  watch(() => props.settings.tabSize, (newTabSize) => {
    setTabSize(newTabSize)
  })
  // 监听是否使用tab缩进
  watch(() => props.settings.indentWithTab, (newStatus) => {
    tabIndentToggler(newStatus)
  })
})
</script>

<style lang="scss" scoped></style>