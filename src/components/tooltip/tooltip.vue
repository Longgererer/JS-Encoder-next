<script setup lang="ts">
import { Position } from "@type/interface"
import { computed, ref } from "vue"
import { getOffsetStyle } from "@components/utils/common"

interface IProps {
  /* 提示文字，如果使用slot#content则忽略此属性 */
  content?: string
  /* 提示展示位置 */
  position?: Position
  /* 偏移量，单位px */
  offset?: number | string
  /* 延迟消失时间，单位ms */
  delay?: number
  /* 是否禁用 */
  disable?: boolean
  /* 是否显示小三角 */
  showTriangle?: boolean
  /* 是否消失 */
  hidden?: boolean
  /* 层级，对应z-index */
  level?: string
}

const props = withDefaults(defineProps<IProps>(), {
  content: "",
  hidden: true,
  offset: 0,
  delay: 300,
  disable: false,
  showTriangle: true,
  position: "right" as Position,
  level: "auto",
})

const hidden = ref<boolean>(true)

const namespace = "tooltip"

/* 计算偏移样式 */
const offsetStyle = getOffsetStyle(props.offset, props.position)

let timer: NodeJS.Timeout | null = null

/* 鼠标移入显示tip */
const handleMouseover = (): void => {
  if (timer) {
    clearTimeout(timer)
  }
  hidden.value = false
}

/* 鼠标移出delay毫秒后提示消失 */
const handleMouseLeave = (): void => {
  timer = setTimeout(() => {
    hidden.value = true
  }, props.delay)
}
</script>

<template>
  <div
    class="relative inline-block"
    :class="namespace"
    @mouseleave="handleMouseLeave"
    @mouseover="handleMouseover"
  >
    <transition :name="namespace">
      <div
        v-show="!hidden && !disable"
        class="p-y-s p-x-l absolute shadow radius-m"
        :class="`${namespace}-container ${namespace}-${position}`"
        :style="{...offsetStyle, zIndex: level}"
      >
        <template v-if="$slots.content">
          <slot name="content"></slot>
        </template>
        <template v-else>
          <span class="font-xs text-nowrap">{{ content }}</span>
        </template>
        <span
          v-if="showTriangle"
          class="absolute"
          :class="`${namespace}-triangle triangle-${position}`"
        ></span>
      </div>
    </transition>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
$namespace: tooltip;
$border-width: 6;

.#{$namespace} {
  color: var(--color-tooltip-color);
  .#{$namespace}-container {
    background-color: var(--color-main-bg-1);
    border-color: var(--color-main-bg-1);
  }
  .#{$namespace}-bottom {
    top: calc(100% + #{$border-width}px);
    left: 50%;
    transform: scale(1) translateX(-50%);
  }
  .#{$namespace}-left {
    top: 50%;
    right: calc(100% + #{$border-width}px);
    transform: scale(1) translateY(-50%);
  }
  .#{$namespace}-right {
    left: calc(100% + #{$border-width}px);
    top: 50%;
    transform: scale(1) translateY(-50%);
  }
  .#{$namespace}-top {
    bottom: calc(100% + #{$border-width}px);
    left: 50%;
    transform: scale(1) translateX(-50%);
  }
  .triangle-bottom {
    inset: calc(-50% + #{$border-width}px) 0 0 calc(50% - #{$border-width}px);
  }
  .triangle-right {
    inset: calc(50% - #{$border-width}px) 0 0 calc(-2 * #{$border-width}px);
  }
  .triangle-left {
    inset: calc(50% - #{$border-width}px) 0 0 100%;
  }
  .triangle-top {
    inset: 100% 0 0 calc(50% - #{$border-width}px);
  }
}

.#{$namespace}-enter-from,
.#{$namespace}-leave-to {
  opacity: 0;
}

.#{$namespace}-enter-to,
.#{$namespace}-leave-from {
  opacity: 1;
}

.#{$namespace}-enter-active,
.#{$namespace}-leave-active {
  @include transition(all, 0.3s, ease);
}
</style>
