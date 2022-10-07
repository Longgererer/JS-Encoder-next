<script lang="ts">
import { Position } from '@type/interface'

enum Trigger {
  HOVER = 'hover',
  CLICK = 'click',
}

/* 由于defineProps中无法引入本地定义变量，因此只能提到额外的script中了 */
export const initPosition = Position.BOTTOM
export const initTrigger = Trigger.CLICK
export default { name: 'dropdown' }
</script>

<script setup lang="ts">
interface IProps {
  /* 触发下拉的行为 */
  trigger: string
  /* 菜单显示的位置 */
  position: Position
  /* 是否显示下拉菜单 */
  value: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  position: initPosition,
  trigger: initTrigger,
  value: true,
})

const emits = defineEmits(['update:value'])

const namespace = 'dropdown'

const handleClickTrigger = (): void => {
  if (props.trigger !== Trigger.CLICK) { return void 0 }
  emits('update:value', true)
}
const handleClickOption = (): void => {
  emits('update:value', false)
}
</script>

<template>
  <div :class="namespace">
    <!--  触发菜单显示的元素  -->
    <div :class="`${namespace}-trigger-wrapper`" @click="handleClickTrigger">
      <slot></slot>
    </div>
    <!--  菜单项列表  -->
    <div class="shadow p-y-s" :class="`${namespace}-options-wrapper`" v-show="value">
      <div :class="`${namespace}-options`" @click="handleClickOption">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$namespace: 'dropdown';

.#{$namespace}-options-wrapper {
  background-color: var(--color-main-bg-1);
  border-radius: 8px;
}
</style>