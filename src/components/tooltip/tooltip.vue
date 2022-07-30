<script setup lang="ts">
interface IProps {
  /** 提示文字，如果使用slot#content则忽略此属性 */
  content: string
  /** 可见性 */
  value: boolean
  /** 提示展示位置：top|right|left|bottom|none */
  position?: string
  /** 偏移量 */
  offset?: number
  /** 延迟消失时间 */
  delay?: number
}

withDefaults(defineProps<IProps>(), {
  content: '',
  value: true,
  position: 'right',
  offset: 0,
  delay: 300,
})

defineOptions({
  name: 'tooltip',
})

const namespace = 'tooltip'
</script>
<template>
  <div class="relative inline-block" :class="`${namespace}`">
    <div class="p-y-s p-x-l absolute shadow" :class="`${namespace}-container ${namespace}-${position}`">
      <template v-if="$slots.content">
        <slot name="content"></slot>
      </template>
      <template v-else>
        <span class="font-xs text-nowrap">{{ content }}</span>
      </template>
      <span class="absolute" :class="`${namespace}-triangle triangle-${position}`"></span>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
$namespace: 'tooltip';
$border-width: 6;
.#{$namespace} {
  color: var(--color-tooltip-color);
  margin-left: 100px;
  .#{$namespace}-container {
    background-color: var(--color-main-bg-1);
    border-color: var(--color-main-bg-1);
    border-radius: 4px;
  }
  .#{$namespace}-bottom {
    top: calc(100% + #{$border-width}px);
    left: 50%;
    transform: translateX(-50%);
  }
  .#{$namespace}-left {
    top: 50%;
    right: calc(100% + #{$border-width}px);
    transform: translateY(-50%);
  }
  .#{$namespace}-right {
    left: calc(100% + #{$border-width}px);
    top: 50%;
    transform: translateY(-50%);
  }
  .#{$namespace}-top {
    bottom: calc(100% + #{$border-width}px);
    left: 50%;
    transform: translateX(-50%);
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
</style>
