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
/** props */
const props = defineProps<IProps>()
/** emits */
const emits = defineEmits<IEmits>()
/** service */
/** store */

const editorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const initConfig = {
    
  }
  const {
    view, getContent, setContent, setTabSize, tabIndentToggler,
  } = useCodemirrorEditor({
    
  })

  watch(() => props.settings.tabSize, () => {
    
  })
})
</script>

<style lang="scss" scoped></style>