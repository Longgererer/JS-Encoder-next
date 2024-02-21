<template>
  <transition-group name="drag">
    <div
      v-for="(item, index) in modelValue"
      :key="item[uniqueKey]"
      draggable="true"
      :class="dragIndex === index ? 'dragging' : ''"
      @dragstart="handleDragstart(index)"
      @dragend.prevent="handleDragend()"
      @dragenter.prevent="handleDragenter(index)"
      @dragover.prevent="() => {}">
      <!-- 外部传入的可拖拽项列表 -->
      <slot :name="`item-${item[uniqueKey]}`"></slot>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from "vue"
import { IEmits, IProps } from "./drag-sortable"
import { AnyArray } from "@type/interface"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

// eslint-disable-next-line vue/no-setup-props-destructure
let list: AnyArray = props.modelValue
watchEffect(() => {
  /** 浅复制一份传入的数组 */
  list = props.modelValue
})

const dragIndex = ref<number>(-1)
const handleDragstart = (index: number) => {
  dragIndex.value = index
}
const handleDragend = () => {
  dragIndex.value = -1
}
const handleDragenter = (index: number) => {
  if (dragIndex.value === index) { return }
  const dragItem = list[dragIndex.value]
  list.splice(dragIndex.value, 1)
  list.splice(index, 0, dragItem)
  dragIndex.value = index
  emits("update:modelValue", [...list])
}
</script>

<style lang="scss" scoped>
.drag-move {
  transition: transform 0.3s;
}
.dragging {
  opacity: 0.5;
}
</style>