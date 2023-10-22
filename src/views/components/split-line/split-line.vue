<template>
  <div
    class="split-line fade-ease"
    :class="[
      isActive ? 'active' : '',
      showCursor && direction === SplitDirection.HORIZONTAL ? 'cursor-x-resize' : 'cursor-y-resize',
    ]"
    :style="splitLineSizeStyle"
    @mouseenter="handleMouseenter"
    @mouseleave="handleMouseleave"
  ></div>
</template>

<script setup lang="ts">
/**
 * desc: 分割线，根据方向分割，在鼠标悬停的时候会高亮显示并扩大范围
 */
import { computed, ref } from "vue"
import { IProps } from "./split-line"
import { SplitDirection } from "@type/editor"

/** props */
const props = withDefaults(defineProps<IProps>(), {
  direction: SplitDirection.HORIZONTAL,
  showCursor: true,
})

/** 动态设置分割线宽高 */
const splitLineSizeStyle = computed(() => {
  const { size, direction, activeSize = size } = props
  const isHorizontal = direction === SplitDirection.HORIZONTAL
  if (isHorizontal) {
    return {
      width: `${activeSize}px`,
      height: "100%",
      borderBottom: 0,
      borderRight: `${size}px solid var(--color-main-bg-2)`,
      "--hover-width": `${activeSize}px`,
      "--hover-height": "100%",
    }
  } else {
    return {
      width: "100%",
      height: `${activeSize}px`,
      borderBottom: `${size}px solid var(--color-main-bg-2)`,
      borderRight: 0,
      "--hover-width": "100%",
      "--hover-height": `${activeSize}px`,
    }
  }
})

const isActive = ref<boolean>(false)
let timer: NodeJS.Timeout | null = null
/** 延迟置为活跃的时间(ms) */
const activeDelay = 100
/** 监听移入移出事件，移入500ms置为活跃高亮展示分割线 */
const handleMouseenter = (): void => {
  timer = setTimeout(() => {
    isActive.value = true
  }, activeDelay)
}
const handleMouseleave = (): void => {
  if (!timer) { return }
  clearTimeout(timer)
  isActive.value = false
}
</script>

<style lang="scss" scoped>
.split-line {
  &.active {
    width: var(--hover-width) !important;
    height: var(--hover-height) !important;
    border: 0 !important;
    background-color: var(--color-primary1);
  }
}
</style>