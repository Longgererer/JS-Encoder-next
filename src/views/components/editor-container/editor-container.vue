<script setup lang="ts">
import { IEditor, IEditorBar } from '@type/editor'
import EditorBar from '../editor-bar/editor-bar.vue'

interface IEditorContainer {
  width: number
  height: number
  editorBar: IEditorBar
  editor: IEditor
}

defineProps<IEditorContainer>()
</script>
<template>
  <div class="editor-container" :style="{width: `${width}px`, height: `${height}px`}">
    <editor-bar v-bind="editorBar"></editor-bar>
  </div>
</template>
<style lang="scss">

</style>