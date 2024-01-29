<script setup lang="ts">
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"

interface IProps {
  /** icon类名 */
  iconClass: string
  /** 三种尺寸：sm|md|lg */
  size?: IconBtnSize
  title?: string
  highlight?: boolean
  highlightStyle?: string
}
const props = withDefaults(defineProps<IProps>(), {
  size: "md" as IconBtnSize,
  title: "",
})
const emits = defineEmits<{
  (e: "click"): void
}>()

const namespace = "icon-btn"
const size2ClassMap = {
  [IconBtnSize.SM]: "font-s",
  [IconBtnSize.MD]: "font-m",
  [IconBtnSize.LG]: "font-l",
}

const handleClick = (): void => {
  emits("click")
}
</script>

<template>
  <div
    class="fade-ease cursor-pointer flex-center radius-l"
    :class="`${namespace} ${namespace}-${size}`"
    :style="`${highlight ? highlightStyle : ''}`"
    :title="title"
    @click="handleClick">
    <i class="fade-ease icon iconfont" :class="[iconClass, size2ClassMap[size]]"></i>
  </div>
</template>

<style lang="scss" scoped>
$namespace: icon-btn;
$comp-size: (
  sm: 24,
  md: 28,
  lg: 36,
);

.#{$namespace} {
  color: var(--color-no-active-color);
  &:hover {
    background-color: var(--color-main-bg-3);
    color: var(--color-active-color);
  }
}

@each $name, $size in ($comp-size) {
  .#{$namespace}-#{$name} {
    width: #{$size}px;
    height: #{$size}px;
  }
}
</style>