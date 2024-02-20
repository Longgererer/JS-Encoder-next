<template>
  <div class="drag-sortable" ref="dragSortable">
    <!-- 外部传入的可拖拽项列表 -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { IEmits, IProps } from "./drag-sortable"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const handleDragstart = () => {

}
const handleDragend = () => {

}
const handleDragover = () => {

}
// https://juejin.cn/post/7231519213897875512
const dragSortable = ref<HTMLElement | null>(null)
onMounted(() => {
  // eslint-disable-next-line no-undef
  const draggableChildren: NodeListOf<HTMLElement> = dragSortable.value!.querySelectorAll(props.draggableTarget)
  draggableChildren.forEach((element) => {
    element.draggable = true
    // (element as HTMLElement).draggable
    element.addEventListener("dragstart", handleDragstart)
    element.addEventListener("dragend", handleDragend)
    element.addEventListener("dragover", handleDragover)
  })
})
</script>

<style lang="scss" scoped></style>