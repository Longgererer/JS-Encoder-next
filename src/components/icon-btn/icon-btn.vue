<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  /* 三种尺寸：sm|md|lg */
  size: string
  /* icon类名 */
  iconClass: string
}
const props = withDefaults(defineProps<IProps>(), {
  size: 'md',
})
const emits = defineEmits<{
  (e: 'click'): void
}>()

const enum Size {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}
const sizeMap = {
  [Size.SM]: 'font-s',
  [Size.MD]: 'font-m',
  [Size.LG]: 'font-l',
}

const namespace = 'icon-btn'

const handleClick = () => {
  emits('click')
}
</script>

<template>
  <div class="fade-ease cursor-pointer flex-center" :class="`${namespace} ${namespace}-${size}`" @click="handleClick">
    <i class="fade-ease icon iconfont" :class="[iconClass, sizeMap[size]]"></i>
  </div>
</template>

<style lang="scss" scoped>
$namespace: 'icon-btn';
$comp-size: (
  sm: 24,
  md: 28,
  lg: 36,
);

.#{$namespace} {
  border-radius: 8px;
  i {
    color: var(--color-no-active-color);
  }
  &:hover {
    background-color: var(--color-main-bg-3);
    i {
      color: var(--color-active-color);
    }
  }
}

@each $name, $size in ($comp-size) {
  .#{$namespace}-#{$name} {
    width: #{$size}px;
    height: #{$size}px;
  }
}
</style>