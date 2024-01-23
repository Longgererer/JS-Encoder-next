<template>
  <button
    class="cursor-pointer flex-center no-select fade-ease"
    :class="[
      `${NAMESPACE}`,
      `${NAMESPACE}--${size}`,
      `${NAMESPACE}--${type}`,
      icon ? `${NAMESPACE}-only-icon` : '',
      isDisabled ? `${NAMESPACE}-disabled` : '',
      shadow ? `shadow` : '',
      outline ? `${NAMESPACE}-outline` : '',
      radius ? `${NAMESPACE}-radius` : '',
      fill ? 'flex fill-w' : 'inline-flex',
      customClass,
    ]"
    :disabled="isDisabled"
    @click.stop="$emit('click')"
  >
    <span class="loading-action" :class="`${NAMESPACE}-load`" v-show="loading">-</span>
    <span class="inline-block" :class="`${NAMESPACE}-content ${loading ? 'ml-s' : ''}`">
      <i v-if="icon || showIcon" :class="`${NAMESPACE}-icon icon iconfont ${iconClass}`"></i>
      <slot v-if="!icon"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { BtnType, Size } from "@type/interface"

interface IProps {
  /** 按钮尺寸 mini|small|medium|large|xLarge */
  size?: Size
  /** 是否禁用 */
  disabled?: boolean
  /** 是否只显示icon没有文字 */
  icon?: boolean
  /** icon类名 */
  iconClass?: string
  /** 按钮类型 */
  type?: BtnType
  /** 是否显示icon */
  showIcon?: boolean
  /** 是否有阴影 */
  shadow?: boolean
  /** 是否有外边框 */
  outline?: boolean
  /** 是否正在加载 */
  loading?: boolean
  /** 是否为全圆角按钮 */
  radius?: boolean
  /** 是否占满一整行 */
  fill?: boolean
  /** 自定义样式类名 */
  customClass?: string
}

const props = withDefaults(defineProps<IProps>(), {
  size: "medium" as Size,
  disabled: false,
  type: "primary" as BtnType,
  icon: false,
  iconClass: "",
  showIcon: false,
  shadow: false,
  outline: false,
  loading: false,
  radius: false,
  fill: false,
  customClass: "",
})

const emits = defineEmits<{
  (e: "click"): void
}>()

const isDisabled = computed(() => props.loading || props.disabled)

const NAMESPACE = "custom-button"
</script>

<style lang="scss" scoped>
$namespace: "custom-button";
$btn-theme: (
  default: transparent,
  default-hover: transparent,
  default-active: transparent,
  primary: var(--color-primary1),
  primary-hover: var(--color-primary2),
  primary-active: var(--color-primary0),
  success: var(--color-green1),
  success-hover: var(--color-green2),
  success-active: var(--color-green0),
  danger: var(--color-red1),
  danger-hover: var(--color-red2),
  danger-active: var(--color-red0),
);
$btn-font-size: (
  mini: 12px,
  small: 12px,
  medium: 14px,
  large: 16px,
  xLarge: 18px,
);
$round-padding: (
  mini: 2px,
  small: 4px,
  medium: 6px,
  large: 8px,
  xLarge: 10px,
);
$horizontal-padding: (
  mini: 12px,
  small: 16px,
  medium: 20px,
  large: 24px,
  xLarge: 28px,
);

.#{$namespace} {
  border: none;
  overflow: hidden;
  vertical-align: center;
  font-family: $def-font;
  .#{$namespace}-icon {
    font-size: inherit;
    margin-right: 10px;
    color: inherit;
  }
  .#{$namespace}-load {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid #fff;
    clip-path: inset(0 0 50% 0);
    transform: rotate(0);
    animation: spin .6s linear infinite;
    opacity: 0.3;
  }

  @keyframes spin {
    from {
      transform: rotate(0)
    }
    to {
      transform: rotate(1turn)
    }
  }
}

.#{$namespace}.#{$namespace}-disabled {
  pointer-events: none;
  box-shadow: none;
  color: var(--color-disabled-color);
  background-color: var(--color-disabled-bgc);
}

.#{$namespace}.#{$namespace}-only-icon {
  border-radius: 50%;
  .#{$namespace}-icon {
    margin-right: 0;
  }
}

@each $type in (default, primary, danger, success) {
  @if $type == default {
    .#{$namespace}--#{$type} {
      color: var(--color-no-active-color);
      &:hover {
        color: var(--color-active-color);
      }
    }
  } @else {
    .#{$namespace}--#{$type} {
      color: var(--color-active-color);
    }
  }
  .#{$namespace}--#{$type} {
    background-color: map.get($btn-theme, $type);
    &:hover {
      background-color: map.get($btn-theme, #{$type}-hover);
    }
    &:active {
      background-color: map.get($btn-theme, #{$type}-active) !important;
    }
    .#{$namespace}-content {
      color: inherit;
    }
  }
  .#{$namespace}--#{$type}.#{$namespace}-outline {
    color: map.get($btn-theme, $type);
    border: 2px solid map.get($btn-theme, $type);
    background-color: transparent;
    &:hover {
      color: map.get($btn-theme, #{$type}-hover);
      border-color: map.get($btn-theme, #{$type}-hover);
    }
  }
}

@each $size in (mini, small, medium, large, xLarge) {
  $font-size: map.get($btn-font-size, $size);
  $padding: map.get($round-padding, $size);
  .#{$namespace}--#{$size} {
    height: calc($font-size + 2.6 * $padding);
    border-radius: 4px;
    padding: 0 map.get($horizontal-padding, $size);
    font-size: $font-size;

    // line-height: $font-size;
  }
  .#{$namespace}--#{$size}.#{$namespace}-radius {
    border-radius: calc(($font-size + 2.6 * $padding) / 2);
  }
  .#{$namespace}--#{$size}.#{$namespace}-only-icon {
    padding: 0 calc(1.3 * $padding);
  }
}
</style>