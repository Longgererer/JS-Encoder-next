<script lang="ts" setup>
import { ref, watch } from "vue"
import useClickOutside from "@hooks/useClickOutside"
import { SelectSize, ISelectOption } from "./custom-select.interface"

interface IProps {
  /** 内容 */
  modelValue: ISelectOption
  /** 数据列表, 如果不传label，就直接使用value代替label展示 */
  dataList: ISelectOption[]
  /** 尺寸 */
  size?: SelectSize
  customSelectStyle?: string
  customOptionListStyle?: string
  customSelectInnerStyle?: string
  customOptionStyle?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: "medium" as SelectSize,
})

const emits = defineEmits<{
  (event: "update:modelValue", state: ISelectOption): void,
}>()

const namespace = "custom-select"
/** 是否折叠 */
const isFoldOptions = ref<boolean>(true)
/** 是否高亮边框 */
const isHighlightBorder = ref<boolean>(false)
const selectRef = ref<HTMLElement | null>(null)
const isClickOutSide = useClickOutside(selectRef)

const handleClickSelect = (): void => {
  isFoldOptions.value = !isFoldOptions.value
  isHighlightBorder.value = true
}

const handleClickOption = (item: ISelectOption): void => {
  emits("update:modelValue", item)
  isFoldOptions.value = true
  isHighlightBorder.value = false
}

watch(isClickOutSide, () => {
  if (isClickOutSide.value) {
    isFoldOptions.value = true
    isHighlightBorder.value = false
  }
})

const getFinalLabel = (item: ISelectOption): string => {
  return String(item.label === undefined ? item.value : item.label)
}
</script>

<template>
  <div
    class="active-text relative bg-form-item code-font cursor-pointer"
    ref="selectRef"
    :class="`${namespace}-wrapper ${namespace}-wrapper--${size}`"
    :style="customSelectStyle"
    @click="handleClickSelect">
    <div
      class="fade-ease"
      :class="`${namespace} ${namespace}--${size} ${isHighlightBorder ? 'highlight' : ''}`"
      :style="customSelectInnerStyle">
      <span :class="`${namespace}-value`">{{getFinalLabel(modelValue)}}</span>
      <div class="icon-area flex-y-center absolute">
        <i
          class="icon iconfont icon-down font-xs line-h-unset flex-1 inline-flex font-active fade-ease p-x-s"
          :class="isFoldOptions ? '' : 'up'"
        ></i>
      </div>
    </div>
    <div
      v-if="!isFoldOptions"
      class="absolute fade-ease bg-form-item shadow"
      :class="`${namespace}-options ${namespace}-options--${size}`"
      :style="customOptionListStyle">
      <div
        class="cursor-pointer fade-ease fill-w"
        :class="`${namespace}-option ${modelValue.value === item.value ? 'selected' : ''}`"
        :style="customOptionStyle"
        v-for="(item, index) in dataList"
        :key="index"
        @click.stop="handleClickOption(item)"
      >{{getFinalLabel(item)}}</div>
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
$borderWidth: 2px;

.#{$namespace}-wrapper {
  width: 200px;
  .#{$namespace} {
    width: 100%;
    height: 100%;
    border: $borderWidth solid var(--color-form-item);
    box-sizing: border-box;
    border-radius: inherit;
    &.highlight {
      border-color: var(--color-primary1);
    }
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
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
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
  .#{$namespace}-wrapper--#{$size} {
    border-radius: $radius;
    .#{$namespace}--#{$size} {
      padding: $padding;
      font-size: $font-size;
    }
    .#{$namespace}-options--#{$size} {
      border-radius: $radius;
      padding: $padding 0;
      .#{$namespace}-option {
        padding: calc($padding + $borderWidth);
      }
    }
  }
}
</style>