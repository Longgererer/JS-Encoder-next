<script setup lang="ts">
import { Position, Trigger } from "@type/interface"
import { computed, onMounted, ref, toRef, useSlots, watch, reactive } from "vue"
import { getOffsetStyle, getPosStyle } from "@components/utils/common"
import useClickOutside from "@hooks/useClickOutside"

interface IProps {
  /** 提示展示位置 */
  position?: Position
  /** 偏移量，单位px */
  offset?: number | string
  /** 是否显示小三角 */
  showTriangle?: boolean
  /** 是否消失 */
  hidden?: boolean
  /** 是否挂载在body中，在一些父元素设置over-flow:hidden的情况下可能会导致popover显示不全，放在body中可解决 */
  appendToBody?: boolean
  /** 层级，对应z-index */
  level?: string
  /** 触发显示的行为 */
  trigger?: string
  /** 延迟消失时间，单位ms */
  delay?: number
}
const emits = defineEmits(["update:modelValue"])

const props = withDefaults(defineProps<IProps>(), {
  hidden: true,
  offset: 0,
  showTriangle: true,
  position: "right" as Position,
  appendToBody: false,
  level: "auto",
  trigger: "hover" as Trigger,
  delay: 300,
})

const hidden = ref<boolean>(true)

const namespace = "popover"
const popoverRef = ref<HTMLElement | null>(null)

const slots = useSlots()
/** 偏移样式 */
const offsetStyle = getOffsetStyle(props.offset, props.position)
/** 定位样式 */
const posStyle = ref<Record<string, string>>({})
const showPopover = (): void => {
  if (!hidden.value) { return }
  hidden.value = false
  if (props.appendToBody) {
    // 在appendToBody为true时获取点击元素的位置，计算popover显示的位置
    const relativeEle = popoverRef.value
    // 直接获取元素的offset和offLeft会受到祖先元素position的影响，不一定准确
    const {
      left = 0,
      top = 0,
      bottom = 0,
      right = 0,
      width = 0,
      height = 0,
    } = relativeEle?.getBoundingClientRect() || {}
    posStyle.value = getPosStyle(left, top, bottom, right, width, height, props.position)
  } else {
    posStyle.value = {}
  }
}

/**
 * trigger click
 */
const isClickOutSide = useClickOutside(popoverRef)
const handleClickTarget = (): void => {
  if (props.trigger !== Trigger.CLICK) { return }
  showPopover()
}
// 如果点击的是气泡卡片外部，就隐藏气泡卡片，并取消监听
watch(isClickOutSide, () => {
  if (props.trigger !== Trigger.CLICK) { return }
  if (isClickOutSide.value) {
    hidden.value = true
  }
})

/**
 * trigger hover
 */
let timer: NodeJS.Timeout | null = null
const handleOverTarget = (): void => {
  if (props.trigger !== Trigger.HOVER) { return }
  if (timer) {
    clearTimeout(timer)
  } else {
    showPopover()
  }
}
const handleLeaveTarget = (): void => {
  if (props.trigger !== Trigger.HOVER) { return }
  timer = setTimeout(() => {
    hidden.value = true
    timer = null
  }, props.delay)
}
</script>

<template>
  <div
    class="inline-block"
    :class="[
      appendToBody ? '' : 'relative',
    ]"
    @click="handleClickTarget"
    @mouseleave="handleLeaveTarget"
    @mouseover="handleOverTarget"
    ref="popoverRef"
  >
    <teleport to="body" :disabled="!appendToBody">
      <transition :name="namespace">
        <div
          v-show="!hidden"
          class="absolute pos-origin"
          :class="[
            namespace,
            appendToBody ? '' : 'absolute pos-origin no-append-to-body',
          ]"
          @mouseover="handleOverTarget"
          @mouseleave="handleLeaveTarget"
          :style="{ zIndex: level }"
        >
          <div
            class="p-x-l p-y-l absolute shadow radius-l"
            :class="`${namespace}-container ${namespace}-${position}`"
            :style="{...offsetStyle, ...posStyle}"
          >
            <slot name="content"></slot>
            <span
              v-if="showTriangle"
              class="absolute"
              :class="`${namespace}-triangle triangle-${position}`"
            ></span>
          </div>
        </div>
      </transition>
    </teleport>
    <slot></slot>
  </div>
</template>

<style lang="scss">
$namespace: 'popover';

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
  @include transition(all, 0.1s, ease);
}
</style>

<style lang="scss" scoped>
$namespace: popover;
$border-width: 6;

.#{$namespace} {
  color: var(--color-tooltip-color);
  &.no-append-to-body {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .#{$namespace}-container {
    background-color: var(--color-popover-bg);
    border-color: var(--color-popover-bg);
    min-width: 300px;
    max-width: 500px;
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
    inset: calc(-2 * #{$border-width}px) 0 0 calc(50% - #{$border-width}px);
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
</style>