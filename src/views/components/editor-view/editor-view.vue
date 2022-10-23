<script setup lang="ts">
import { useEditorWrapperStore } from '@store/editorWrapper'
import EditorBar from '@views/components/editor-bar/editor-bar.vue'
import OverlapMonitor from '@views/components/overlap-monitor/overlap-monitor.vue'
import { EditorViewId } from '@type/editor'

interface IProps {
  editorViewId: EditorViewId
}
const props = defineProps<IProps>()

const editorWrapperStore = useEditorWrapperStore()
const { editorViewMap } = editorWrapperStore
const editorView = editorViewMap[props.editorViewId]

const handleClickTab = (index: number) => {
  editorWrapperStore.updateEditorView({
    ...editorView,
    currEditorIndex: index,
  })
}
</script>

<template>
  <div class="editor-view fill flex-col">
    <editor-bar :editor-view-id="props.editorViewId" @click-tab="handleClickTab"></editor-bar>
    <overlap-monitor></overlap-monitor>
  </div>
</template>

<style lang="scss" scoped>

</style>