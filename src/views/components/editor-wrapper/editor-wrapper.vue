<script setup lang="ts">
import { useEditorWrapperStore } from '@store/editorWrapper'
import EditorContainer from '@views/components/editor-container/editor-container.vue'
import EditorSplitter from '@views/components/editor-splitter/editor-splitter.vue'

const { editorStructure } = useEditorWrapperStore()
</script>

<template>
  <div class="editor-wrapper fill">
    <!--  根splitter  -->
    <editor-splitter :structure="editorStructure"></editor-splitter>
  </div>
</template>

<style lang="scss" scoped>

</style>
