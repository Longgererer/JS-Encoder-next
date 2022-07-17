<script setup lang="ts">
import { ref } from 'vue'

interface IProps {
  /** 徽章的显隐 */
  value: boolean
  /** 徽章位置：top-left|top-right|bottom-left|bottom-right */
  position: string
  /** 徽章颜色 */
  color: string
  /** 徽章显示内容 */
  content: string
  /** 邀请徽章尺寸 sm|md|lg */
  size: string
}

const props = withDefaults(defineProps<IProps>(), {
  value: true,
  position: 'top-right',
  color: '#0085ff',
  content: '',
  size: 'md',
})
</script>

<template>
  <span class="badge-wrapper relative">
    <span
      class="badge circle relative high-layer flex-center"
      :class="`badge-${position} badge-${size}`"
      :style="{ backgroundColor: color }"
    >
      <span class="badge-content font-xs">{{ content }}</span>
    </span>
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
$namespace: 'badge';
$comp-size: (
  sm: 4,
  md: 8,
  lg: 12,
);

.#{$namespace}-wrapper {
  .#{$namespace} {
    .#{$namespace}-content {
      color: var(--color-badge-color);
    }
  }
  @each $name, $size in ($comp-size) {
    .#{$namespace}-#{$name} {
      width: #{$size}px;
      height: #{$size}px;
      color: var(--color-badge-color);
      &.#{$namespace}-top-left {
        inset: calc(#{$size}px / 2) calc(100% - #{$size}px / 2) 0 0;
      }
      &.#{$namespace}-top-right {
        inset: calc(#{$size}px / 2) 0 0 calc(100% - #{$size}px / 2);
      }
      &.#{$namespace}-bottom-left {
        inset: calc(100% - #{$size}px / 2) 0 calc(#{$size}px / 2) 0;
      }
      &.#{$namespace}-bottom-right {
        inset: calc(100% - #{$size}px / 2) 0 0 calc(100% - #{$size}px / 2);
      }
    }
  }
}
</style>
