<script lang="ts">
export default { name: 'editor-splitter' }
</script>
<script setup lang="ts">
import { IEditorContainer } from '@type/editor'
import EditorContainer from '../editor-container/editor-container.vue'

interface IEditorSplitter {
  container?: IEditorContainer
  children?: IEditorSplitter[]
}
const props = defineProps<IEditorSplitter>()
</script>
<template>
  <div class="editor-splitter">
    <template v-if="children && children.length">
      <template v-for="(childSplitter, index) in children" :key="index">
        <editor-splitter v-bind="childSplitter"></editor-splitter>
      </template>
    </template>
    <template v-if="container">
      <editor-container v-bind="container"></editor-container>
    </template>
  </div>
</template>
<style lang="scss">

</style>