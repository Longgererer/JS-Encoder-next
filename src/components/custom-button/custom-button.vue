<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /* 按钮尺寸 mini|small|medium|large|xLarge */
  size?: string
  /* 是否禁用 */
  disabled?: boolean
  /* 是否只显示icon没有文字 */
  icon?: boolean
  /* icon类名 */
  iconClass?: string
  /* 按钮类型 */
  type?: string
  /* 是否显示icon */
  showIcon?: boolean
  /* 是否有阴影 */
  shadow?: boolean
  /* 是否有外边框 */
  outline?: boolean
  /* 是否正在加载 */
  loading?: boolean
  /* 是否为全圆角按钮 */
  radius?: boolean
  /* 是否占满一整行 */
  fill?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  disabled: false,
  type: 'primary',
  icon: false,
  iconClass: '',
  showIcon: false,
  shadow: false,
  outline: false,
  loading: false,
  radius: false,
  fill: false,
})

const emits = defineEmits<{
  (e: 'click'): void
}>()

const isDisabled = computed(() => {
  if (props.loading) {
    return true
  } else {
    return props.disabled
  }
})

const namespace = 'custom-button'
</script>

<template>
  <button
    class="cursor-pointer flex-center no-select fade-ease"
    :class="[
      `${namespace}`,
      `${namespace}--${size}`,
      `${namespace}--${type}`,
      icon ? `${namespace}-only-icon` : '',
      isDisabled ? `${namespace}-disabled` : '',
      shadow ? `shadow` : '',
      outline ? `${namespace}-outline` : '',
      radius ? `${namespace}-radius` : '',
      fill ? 'flex fill-w' : 'inline-flex',
    ]"
    :disabled="isDisabled"
    @click.stop="$emit('click')"
  >
    <span class="loading-action" :class="`${namespace}-load`" v-show="loading">-</span>
    <span class="inline-block" :class="`${namespace}-content ${loading ? 'ml-s' : ''}`">
      <i v-if="icon || showIcon" :class="`${namespace}-icon icon iconfont ${iconClass}`"></i>
      <slot v-if="!icon"></slot>
    </span>
  </button>
</template>

<style lang="scss" scoped>
$namespace: custom-button;
$btn-theme: (
  default: transparent,
  default-active: transparent,
  primary: var(--color-primary),
  primary-active: var(--color-primary-active),
  success: var(--color-success),
  success-active: var(--color-success-active),
  danger: var(--color-error),
  danger-active: var(--color-error-active),
);
$btn-font-size: (
  mini: 12px,
  small: 12px,
  medium: 14px,
  large: 16px,
  xLarge: 18px,
);
$horizontal-padding: (
  mini: 2px,
  small: 4px,
  medium: 6px,
  large: 8px,
  xLarge: 10px,
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
    background-color: map-get($btn-theme, $type);
    &:hover {
      background-color: map-get($btn-theme, #{$type}-active);
    }
    .#{$namespace}-content {
      color: inherit;
    }
  }
  .#{$namespace}--#{$type}.#{$namespace}-outline {
    color: map-get($btn-theme, $type);
    border: 2px solid map-get($btn-theme, $type);
    background-color: transparent;
    &:hover {
      color: map-get($btn-theme, #{$type}-active);
      border-color: map-get($btn-theme, #{$type}-active);
    }
  }
}

@each $size in (mini, small, medium, large, xLarge) {
  $font-size: map-get($btn-font-size, $size);
  $padding: map-get($horizontal-padding, $size);
  .#{$namespace}--#{$size} {
    height: calc($font-size + 2.6 * $padding);
    border-radius: 4px;
    padding: 0 25px;
    font-size: $font-size;
  }
  .#{$namespace}--#{$size}.#{$namespace}-radius {
    border-radius: calc(($font-size + 2.6 * $padding) / 2);
  }
  .#{$namespace}--#{$size}.#{$namespace}-only-icon {
    padding: 0 calc(1.3 * $padding);
  }
}
</style>