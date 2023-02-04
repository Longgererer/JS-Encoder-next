<script lang="ts" setup>
import { Size } from '@type/interface'
import { ref, watch } from 'vue'
import useClickOutside from '@hooks/useClickOutside'

type SelectSize = Exclude<Size, Size.MINI | Size.X_LARGE>

interface IOption {
  label: string | number
  value: string | number | boolean
}

interface IProps {
  /* 内容 */
  modelValue: IOption
  /* 数据列表 */
  dataList: IOption[]
  /* 尺寸 */
  size?: SelectSize
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'medium' as SelectSize,
})

const emits = defineEmits<{
  (event: 'update:modelValue', state: IOption): void,
}>()

const foldOptions = ref<boolean>(true)
const selectRef = ref<HTMLElement | null>(null)
const isClickOutSide = useClickOutside(selectRef)
const namespace = 'custom-select'

const handleClickSelect = (): void => {
  foldOptions.value = !foldOptions.value
}

const handleClickOption = (item: IOption): void => {
  emits('update:modelValue', item)
  foldOptions.value = true
}

watch(isClickOutSide, () => {
  if (isClickOutSide.value) {
    foldOptions.value = true
  }
})
</script>

<template>
  <div
    class="fade-ease active-text relative bg-form-item code-font cursor-pointer"
    ref="selectRef"
    :class="`${namespace} ${namespace}--${size}`"
    @click="handleClickSelect"
  >
    <span :class="`${namespace}-value`">{{modelValue.label}}</span>
    <div class="icon-area absolute">
      <i
        class="icon iconfont icon-down font-xs line-h-unset flex-1 inline-flex font-active fade-ease p-x-s"
        :class="foldOptions ? '' : 'up'"
      ></i>
    </div>
    <div
      class="absolute fade-ease bg-form-item shadow"
      :class="`${namespace}-options`"
      v-if="!foldOptions"
    >
      <div
        class="cursor-pointer fade-ease fill-w"
        :class="`${namespace}-option ${modelValue.value === item.value ? 'selected' : ''}`"
        v-for="item in dataList"
        :key="item.value"
        @click.stop="handleClickOption(item)"
      >{{item.label}}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$namespace: custom-select;
$select-padding: (
  small: 2px,
  medium: 5px,
  large: 8px,
);
$select-font-size: (
  small: 12px,
  medium: 14px,
  large: 16px,
);
$select-border-radius: (
  small: 2px,
  medium: 4px,
  large: 8px,
);

.#{$namespace} {
  width: 200px;
  border: 2px solid var(--color-form-item);
  &:focus {
    border-color: var(--color-primary);
  }
  .icon-area {
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    .up {
      &::before {
        display: inline-block;
        transform: rotate(180deg);
      }
    }
  }
  .#{$namespace}-options {
    top: calc(100% + 8px);
    left: -2px;
    z-index: 100;
    width: 200px;
    .#{$namespace}-option {
      color: var(--color-no-active-color);
      &:hover, &.selected {
        color: var(--color-active-color);
        background-color: var(--color-main-bg-3);
      }
    }
  }
}

@each $size in (small, medium, large) {
  $radius: map-get($select-border-radius, $size);
  $padding: map-get($select-padding, $size);
  $font-size: map-get($select-font-size, $size);
  .#{$namespace}--#{$size} {
    border-radius: $radius;
    padding: $padding;
    font-size: $font-size;
    .#{$namespace}-options {
      border-radius: $radius;
      padding: $padding 0;
      .#{$namespace}-option {
        padding: $padding;
      }
    }
  }
}
</style>