<script setup lang="ts">
import { IEditorWrapper } from '@type/editor'
import { Origin, Prep } from '@type/prep'
import { IOption } from '@type/interface'
import EditorSplitter from '../editor-splitter'

withDefaults(defineProps<IEditorWrapper>(), {
  splitters: () => {
    return [{
      container: {
        width: 1000, height: 500,
        editorBar: {
          tabs: [
            { prep: Prep.HTML, origin: Origin.HTML, icon: '', isActive: false, isDragging: false },
            { prep: Prep.CSS, origin: Origin.CSS, icon: '', isActive: false, isDragging: false },
            { prep: Prep.JAVASCRIPT, origin: Origin.JAVASCRIPT, icon: '', isActive: false, isDragging: false },
          ],
          opts: [],
          moreOpts: [],
        },
        editor: { prep: Prep.HTML, origin: Origin.HTML },
      },
    }]
  },
})
</script>
<template>
  <div class="editor-wrapper">
    <template v-for="(splitter, index) in splitters" :key="index">
      <editor-splitter v-bind="splitter"></editor-splitter>
    </template>
  </div>
</template>
<style lang="scss">

</style>