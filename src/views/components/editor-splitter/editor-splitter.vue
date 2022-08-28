<script>
export default { name: 'editor-splitter' }
</script>
<script setup lang="ts">
import { IEditorSplitter } from '@type/editor'
import EditorContainer from '../editor-container'

defineProps<IEditorSplitter>()
</script>
<template>
  <div class="editor-splitter">
    <template v-if="children.length">
      <template v-for="(childSplitter, index) in children" :key="index">
        <editor-splitter v-bind="childSplitter"></editor-splitter>
      </template>
    </template>
    <template v-else>
      <editor-container v-bind="container"></editor-container>
    </template>
  </div>
</template>
<style lang="scss">

</style>