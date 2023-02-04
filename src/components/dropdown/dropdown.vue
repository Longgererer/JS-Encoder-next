<script lang="ts">
import { Position, Trigger } from '@type/interface'

enum Align {
  LEFT = 'left',
  RIGHT = 'right',
  MIDDLE = 'middle',
}

/* 由于defineProps中无法引入本地定义变量，因此只能提到额外的script中了 */
export const initPosition = Position.BOTTOM
export const initAlign = Align.LEFT
export const initTrigger = Trigger.CLICK
export default { name: 'dropdown' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useClickOutside from '@hooks/useClickOutside'

interface IProps {
  /* 触发下拉的行为 */
  trigger?: string
  /* 菜单显示的位置 */
  position?: Position
  /* 菜单沿着哪一边对齐 */
  align?: Align
  /* 是否显示下拉菜单 */
  modelValue: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  position: initPosition,
  align: initAlign,
  trigger: initTrigger,
  modelValue: false,
})
const emits = defineEmits(['update:modelValue'])

const namespace = 'dropdown'
const dropdownOptsRef = ref<HTMLElement | null>(null)
const isClickOutSide = useClickOutside(dropdownOptsRef)

const handleClickTrigger = (): void => {
  if (props.trigger !== Trigger.CLICK) { return }
  emits('update:modelValue', !props.modelValue)
}
const handleClickOption = (): void => {
  emits('update:modelValue', false)
}

/* 如果点击的是菜单外部，就隐藏菜单，并取消监听 */
watch(isClickOutSide, () => {
  if (isClickOutSide.value) {
    emits('update:modelValue', false)
  }
})
</script>

<template>
  <div class="relative" :class="namespace" ref="dropdownOptsRef">
    <!--  触发菜单显示的元素  -->
    <div :class="`${namespace}-trigger-wrapper`" @click="handleClickTrigger">
      <slot></slot>
    </div>
    <!--  菜单项列表  -->
    <div class="shadow p-y-s absolute radius-l" :class="`${namespace}-options-wrapper ${namespace}-align-${align}`"
      v-show="modelValue">
      <div :class="`${namespace}-options`" @click="handleClickOption">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$namespace: dropdown;

.#{$namespace}-options-wrapper {
  z-index: 100;
  background-color: var(--color-main-bg-1);
}

.#{$namespace}-align-left {
  left: 0;
}
.#{$namespace}-align-right {
  right: 0;
}
.#{$namespace}-align-middle {
  left: 50%;
  transform: translateX(-50%);
}
</style>