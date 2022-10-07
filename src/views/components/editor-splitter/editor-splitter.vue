<script lang="ts">
export default { name: 'editor-splitter' }
</script>

<script setup lang="ts">
import { useEditorWrapperStore } from '@store/editorWrapper'
import { IEditorStructure } from '@type/editor'
import { toRef } from 'vue'
import EditorView from '@views/components/editor-view/editor-view.vue'

interface IProps {
  structure: IEditorStructure
}
const props = defineProps<IProps>()
const structure = toRef(props, 'structure')
console.log(structure.value)

const { editorStructure, editorSplitterMap } = useEditorWrapperStore()
const editorSplitter = editorSplitterMap[structure.value.splitterId]
</script>

<template>
  <div class="editor-splitter">
    <!--  children不为空，表示不为叶子节点，划分成了两个子视口分割器  -->
    <template v-if="structure.children.length">
      <template v-for="item in structure.children" :key="item.splitterId">
        <editor-splitter :structure="item"></editor-splitter>
      </template>
    </template>
    <!--  children为空，表示其为叶子节点，下面包含着编辑视口  -->
    <template v-else>
      <template v-for="item in editorSplitter.editorViewIds" :key="item">
        <editor-view :editor-view-id="item"></editor-view>
      </template>
    </template>
  </div>
</template>

<style lang="scss" scoped>

</style>