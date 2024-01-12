<script lang="ts" setup>
import { Size } from "@type/interface"
import { computed, ref } from "vue"

type InputSize = Exclude<Size, Size.MINI | Size.X_LARGE>

const inputFontSizeMap = {
  [Size.SMALL]: 12,
  [Size.MEDIUM]: 14,
  [Size.LARGE]: 16,
}

const inputPaddingMap = {
  [Size.SMALL]: 2,
  [Size.MEDIUM]: 5,
  [Size.LARGE]: 8,
}

enum InputType {
  /** 文本 */
  TEXT = "text",
  /** 数字 */
  NUMBER = "number",
  /** 文本区 */
  TEXTAREA = "textarea",
}

interface IProps {
  /** 内容 */
  modelValue?: string | number | undefined
  /** 是否禁用 */
  disabled?: boolean
  /** input类型 */
  type?: InputType
  /** 描述文字 */
  placeholder?: string
  /** input自定义class */
  inputClass?: string
  /** 尺寸 */
  size?: InputSize
  /** 最大长度 */
  maxLength?: number
  /** 宽度 */
  width?: string
  /** 圆角 */
  radius?: number

  /** number input 特有属性 */
  /** 最小值 */
  min?: number
  /** 最大值 */
  max?: number
  /** 步长 */
  step?: number

  /** textarea 特有属性 */
  /** 最小行数 */
  minRows?: number
  /** 最大行数 */
  maxRows?: number
  /** 是否可以自由改变尺寸 */
  resize?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: "",
  disabled: false,
  type: "text" as InputType,
  placeholder: "",
  inputClass: "",
  size: "medium" as InputSize,
  width: "200px",
  radius: 5,
  /** number input 特有属性 */
  min: -Infinity,
  max: Infinity,
  step: 1,
  /** textarea 特有属性 */
  minRows: 3,
  maxRows: 6,
  resize: false,
})

const emits = defineEmits<{
  (event: "update:modelValue", state: string | number): void,
}>()

const namespace = "custom-input"

const commonStyle = computed(() => {
  const radius = props.radius >= 0 ? props.radius : inputPaddingMap[props.size]
  const isNumberType = props.type === InputType.NUMBER
  return {
    borderRadius: `${radius} ${isNumberType ? radius : 0} ${isNumberType ? radius : 0} ${radius}`,
  }
})

/** type = text */
const handleInputTextChange = (e: InputEvent): void => {
  emits("update:modelValue", (e.target as HTMLInputElement)?.value)
}

/*
 * type = number
 */
/** 数字输入框失焦时检测输入框内容 */
const handleInputNumberBlur = (e: InputEvent): void => {
  let value = Number((e.target as HTMLInputElement)?.value)
  if (Number.isNaN(value) || value < props.min) {
    value = props.min
  } else if (value > props.max) {
    value = props.max
  } else {
    // do nothing
  }
  emits("update:modelValue", value)
}
/** 点击上箭头 */
const handleClickInputNumberUp = (): void => {
  const value = Number(props.modelValue) + props.step
  if (value > props.max) { return }
  emits("update:modelValue", value)
}
/** 点击下箭头 */
const handleClickInputNumberDown = (): void => {
  const value = Number(props.modelValue) + props.step
  if (value < props.min) { return }
  emits("update:modelValue", value)
}

/*
 * type = textarea
 */
const getTextAreaHeightRange = (): { minHeight: number, maxHeight: number } => {
  const { minRows, maxRows, size } = props
  const lineHeight = 1.5
  const fontSize = inputFontSizeMap[size]
  const padding = inputPaddingMap[size]
  const minHeight = Math.round(lineHeight * fontSize * minRows + padding * 2)
  const maxHeight = Math.round(lineHeight * fontSize * maxRows + padding * 2)
  return { minHeight, maxHeight }
}
const textAreaHeightRange = getTextAreaHeightRange()

const textareaRef = ref<HTMLElement | null>(null)
/** 一个虚拟盒子，用来计算文字高度 */
const virtualBoxRef = ref<HTMLElement | null>(null)

const textareaHeight = ref<number>(textAreaHeightRange.minHeight)

const handleInputTextAreaChange = (e: InputEvent): void => {
  const borderHeight = 4
  const value = (e.target as HTMLInputElement)?.value
  const scrollHeight = (textareaRef.value || {}).scrollHeight || 0
  let finHeight = scrollHeight < textAreaHeightRange.minHeight
    ? textAreaHeightRange.minHeight
    : scrollHeight + borderHeight

  // 在没有滚动条时需要根据文字内容高度来设置textarea高度
  if (finHeight <= textAreaHeightRange.maxHeight) {
    const virtualBoxHeight = (virtualBoxRef.value as HTMLElement).clientHeight + borderHeight
    if (virtualBoxHeight <= finHeight) {
      finHeight = virtualBoxHeight
    }
  }
  textareaHeight.value = finHeight
  emits("update:modelValue", value)
}
</script>

<template>
  <div
    class="fade-ease active-text inline-flex relative"
    :class="`${namespace} ${namespace}--${type} ${namespace}--${size}`"
    :style="{ width }"
  >
    <!-- start 文本输入框 -->
    <template v-if="type === InputType.TEXT">
      <div class="bg-form-item left-side-slot">
        <slot name="leftSide"></slot>
      </div>
      <input
        class="fill-w bg-form-item fade-ease code-font"
        type="text"
        :class="`${inputClass}`"
        :style="{ ...commonStyle }"
        :value="modelValue"
        :placeholder="placeholder"
        :maxlength="maxLength || Infinity"
        @input="handleInputTextChange($event)"
      >
      <div class="bg-form-item right-side-slot">
        <slot name="rightSide"></slot>
      </div>
    </template>
    <!-- end 文本输入框 -->

    <!-- start 数字输入框 -->
    <template v-else-if="type === InputType.NUMBER">
      <input
        class="fill-w bg-form-item fade-ease code-font"
        type="text"
        :class="`${inputClass}}`"
        :style="{ ...commonStyle }"
        :value="modelValue"
        :placeholder="placeholder"
        @blur="handleInputNumberBlur"
      >
      <div
        class="cursor-pointer flex-col-center bg-form-item inline-flex"
        :class="`${namespace}-step-btn-wrapper`"
      >
        <div
          class="flex-1 flex-y-center"
          @click="handleClickInputNumberUp"
        >
          <i class="icon iconfont icon-down font-xs line-h-unset icon-rotate-180 flex-1 inline-flex
            font-active fade-ease p-x-s"></i>
        </div>
        <div
          class="flex-1 flex-y-center"
          @click="handleClickInputNumberDown"
        >
          <i class="icon iconfont icon-down font-xs line-h-unset flex-1 inline-flex font-active fade-ease p-x-s"></i>
        </div>
      </div>
    </template>
    <!-- end 数字输入框 -->

    <!-- start 多行文本输入框 -->
    <template v-else-if="type === InputType.TEXTAREA">
      <textarea
        class="fill-w bg-form-item fade-ease code-font common-scrollbar"
        ref="textareaRef"
        :class="[
          inputClass,
          resize ? '' : 'no-resize',
          textareaHeight < textAreaHeightRange.maxHeight? 'over-y-hidden' : '',
        ]"
        :style="{
          minHeight: `${textAreaHeightRange.minHeight}px`,
          maxHeight: `${textAreaHeightRange.maxHeight}px`,
          height: `${textareaHeight}px`,
          ...commonStyle,
        }"
        :maxlength="maxLength || Infinity"
        :placeholder="placeholder"
        :value="modelValue"
        @input="handleInputTextAreaChange($event)"
      >
      </textarea>
      <div
        class="absolute code-font fill-w break-all virtual-box text-pre-wrap"
        ref="virtualBoxRef"
      >{{modelValue}}</div>
    </template>
    <!-- end 多行文本输入框 -->

    <template v-else>
      <!-- do nothing -->
    </template>
  </div>
</template>

<style lang="scss" scoped>
$namespace: custom-input;
$input-padding: (
  small: 2px,
  medium: 5px,
  large: 8px,
);
$input-font-size: (
  small: 12px,
  medium: 14px,
  large: 16px,
);
$input-border-radius: (
  small: 2px,
  medium: 4px,
  large: 8px,
);

.#{$namespace} {
  textarea, .virtual-box {
    line-height: 1.5;
  }
  input, textarea {
    outline: none;
    color: inherit;
    border: 2px solid var(--color-form-item);
    &:focus {
      border-color: var(--color-primary1);
    }
  }
  .virtual-box {
    border: 2px solid transparent;
    z-index: -1;
  }
  .#{$namespace}-step-btn-wrapper {
    right: 0;
    top: 0;
  }
}

@each $size in (small, medium, large) {
  $radius: map-get($input-border-radius, $size);
  $padding: map-get($input-padding, $size);
  $font-size: map-get($input-font-size, $size);
  .#{$namespace}--#{$size} {
    input, textarea {
      border-radius: $radius;
      padding: $padding;
      font-size: $font-size;
    }
    &.#{$namespace}--text {
      .left-side-slot {
        border-radius: $radius 0 0 $radius;
      }
      .right-side-slot {
        border-radius: 0 $radius $radius 0;
      }
      .left-side-slot, .right-side-slot {
        background-color: var(--color-main-bg-1);
      }
    }
    &.#{$namespace}--number input {
      border-radius: $radius 0 0 $radius;
      & + .#{$namespace}-step-btn-wrapper {
        border-radius: 0 $radius $radius 0;
      }
    }
    &.#{$namespace}--textarea .virtual-box {
      padding: $padding;
      font-size: $font-size;
    }
  }
}
</style>