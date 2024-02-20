<template>
  <div class="drag-sortable" ref="dragSortable">
    <!-- 外部传入的可拖拽项列表 -->
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import { IEmits, IProps } from "./drag-sortable"
import { AnyArray } from "@type/interface"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const list = [...props.modelValue]

let dragIndex = -1
const handleDragstart = (event: DragEvent, index: number) => {
  console.log("handleDragstart")
  event.stopPropagation()
  dragIndex = index
  ;(event.target as HTMLElement)?.classList.add("dragging")
}
const handleDragend = (event: DragEvent, index: number) => {
  event.preventDefault()
  dragIndex = -1
  ;(event.target as HTMLElement)?.classList.remove("dragging")
}
const handleDragenter = (event: DragEvent, index: number) => {
  event.preventDefault()

}
const handleDragover = (event: DragEvent, index: number) => {
  event.preventDefault()
  if (dragIndex === index) { return }
  console.log("handleDragover")
  const dragItem = list[dragIndex]
  list.splice(dragIndex, 1)
  list.splice(index, 0, dragItem)
  console.log(dragIndex, index, dragItem)
  dragIndex = index
  listenDrag()
  console.log(list)
  emits("update:modelValue", [...list])
}

const dragSortable = ref<HTMLElement | null>(null)
onMounted(() => {
  listenDrag()
})

const listenDrag = () => {
  // eslint-disable-next-line no-undef
  const draggableChildren: NodeListOf<HTMLElement> = dragSortable.value!.querySelectorAll(props.draggableTarget)
  draggableChildren.forEach((element, index) => {
    element.draggable = true
    element.addEventListener("dragstart", (event) => handleDragstart(event, index))
    element.addEventListener("dragend", (event) => handleDragend(event, index))
    element.addEventListener("dragenter", (event) => handleDragenter(event, index))
    element.addEventListener("dragover", (event) => handleDragover(event, index))
  })
}
</script>

<style lang="scss" scoped>
.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}
.dragging {
  opacity: 0.5;
}
</style>