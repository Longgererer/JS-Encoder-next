<script setup lang="ts">
import MaskLayer from '@components/mask-layer/mask-layer.vue'
import CustomButton from '@components/custom-button/custom-button.vue'
import { defineEmits, toRef } from 'vue'
import useEscClose from '@hooks/useEscClose'

interface IProps {
  /* 是否显示 */
  modelValue?: boolean
  /* 标题 */
  title?: string
  /* 是否点击esc关闭 */
  escCloseable?: boolean
  /* 点击遮罩层关闭 */
  maskClosable?: boolean
  /* 确认按钮的文本 */
  okText?: string
  /* 确认按钮的类型 */
  okType?: string
  /* modal宽度 */
  width?: number | string
  /* 是否显示取消按钮 */
  showCancel?: boolean
  /* 取消按钮文字 */
  cancelText?: string
  /* 取消按钮的类型 */
  cancelType?: string
  /* 是否显示底部 */
  showFooter?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: true,
  title: '示例标题',
  escCloseable: true,
  maskClosable: true,
  okText: '确认',
  okType: 'primary',
  showCancel: false,
  cancelText: '取消',
  cancelType: 'default',
  showFooter: true,
})

const emits = defineEmits<{
  (event: 'update:modelValue', state: boolean): void,
  (event: 'confirm' | 'cancel' | 'close'): void,
}>()

const namespace = 'modal'

const closeModal = (): void => {
  emits('close')
  emits('update:modelValue', false)
}

useEscClose(toRef(props, 'escCloseable'), () => {
  if (!props.modelValue) { return }
  closeModal()
})

const handleClickMask = (): void => {
  if (!props.maskClosable) { return }
  closeModal()
}

const handleCloseModal = (): void => {
  closeModal()
}
</script>

<template>
  <teleport to="body">
    <transition :name="namespace">
      <mask-layer v-show="modelValue" @clickMask="handleClickMask">
        <div class="p-xxl radius-l bg-main2 absolute shadow" :class="namespace"
          :style="{ width: width ? `${width}px` : 'auto' }"
        >
          <div :class="`${namespace}-header`" class="flex-aic pb-l">
            <span class="fw-bold no-select" :class="`${namespace}-title`">{{title}}</span>
            <div class="flex-1"></div>
            <i class="icon iconfont icon-close cursor-pointer fade-ease font-active"
              @click.stop="handleCloseModal"
            ></i>
          </div>
          <div :class="`${namespace}-content`">
            <slot></slot>
          </div>
          <div class="pt-l text-right" :class="`${namespace}-footer`" v-if="showFooter">
            <custom-button :type="cancelType" v-if="showCancel" @click="$emit('cancel')">{{cancelText}}</custom-button>
            <custom-button :type="okType" @click="$emit('confirm')">{{okText}}</custom-button>
          </div>
        </div>
      </mask-layer>
    </transition>
  </teleport>
</template>

<style lang="scss" scoped>
$namespace: 'modal';

.#{$namespace} {
  min-width: 500px;
  top: 150px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid var(--color-modal-def-border);
  .#{$namespace}-header {
    .#{$namespace}-title {
      font-size: 18px;
      color: var(--color-active-color);
    }
  }
  .#{$namespace}-content {}
  .#{$namespace}-footer {}
}

.#{$namespace}-enter-from,
.#{$namespace}-leave-to {
  opacity: 0;
}

.#{$namespace}-enter-to,
.#{$namespace}-leave-from {
  opacity: 1;
}

.#{$namespace}-enter-active,
.#{$namespace}-leave-active {
  @include transition(all, 0.3s, ease);
}
</style>