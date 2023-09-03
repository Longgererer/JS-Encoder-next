<script setup lang="ts">
import MaskLayer from "@components/mask-layer/mask-layer.vue"
import CustomButton from "@components/custom-button/custom-button.vue"
import { toRef } from "vue"
import useEscClose from "@hooks/useEscClose"
import { BtnType, Size } from "@type/interface"

interface IProps {
  /* 是否显示 */
  modelValue?: boolean
  /* 标题 */
  title?: string
  /* 是否点击esc关闭 */
  escCloseable?: boolean
  /* 点击遮罩层关闭 */
  maskClosable?: boolean
  /* 距离顶部距离 */
  top?: number | string
  /* 距离底部距离 */
  bottom?: number | string
  /* modal宽度 */
  width?: number | string

  /**
   * 底部按钮相关属性
   */
  /* 取消按钮属性 */
  cancelBtnOpts?: object
  /* 确认按钮属性 */
  confirmBtnOpts?: object
  /* 确认按钮的文本 */
  okText?: string
  /* 是否显示取消按钮 */
  showCancel?: boolean
  /* 取消按钮文字 */
  cancelText?: string
  /* 是否显示底部 */
  showFooter?: boolean
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: true,
  title: "示例标题",
  escCloseable: true,
  maskClosable: true,
  okText: "确认",
  showCancel: false,
  cancelText: "取消",
  showFooter: true,
  top: 150,
  bottom: 150,
  cancelBtnOpts: () => ({
    type: "default" as BtnType,
    size: "medium" as Size,
    customClass: "",
  }),
  confirmBtnOpts: () => ({
    type: "primary" as BtnType,
    size: "medium" as Size,
    customClass: "",
  }),
})

const emits = defineEmits<{
  (event: "update:modelValue", state: boolean): void,
  (event: "confirm" | "cancel" | "close"): void,
}>()

const namespace = "modal"

const closeModal = (): void => {
  emits("close")
  emits("update:modelValue", false)
}

useEscClose(toRef(props, "escCloseable"), () => {
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
      <mask-layer v-show="modelValue" @click-mask="handleClickMask">
        <div
          class="p-xxl radius-l bg-main2 absolute shadow flex-col"
          :class="namespace"
          :style="{
            width: width ? `${width}px` : 'auto',
            top: `${top}px`,
            maxHeight: `calc(100vh - ${top}px - ${bottom}px)`
          }"
        >
          <div class="flex-y-center pb-l" :class="`${namespace}-header`">
            <span class="fw-bold no-select" :class="`${namespace}-title`">{{title}}</span>
            <div class="flex-1"></div>
            <i
              class="icon iconfont icon-close cursor-pointer fade-ease font-active"
              @click.stop="handleCloseModal"
            ></i>
          </div>
          <div class="over-y-auto flex-1" :class="`${namespace}-content`">
            <slot></slot>
          </div>
          <div class="pt-l text-right" :class="`${namespace}-footer`" v-if="showFooter">
            <custom-button
              v-if="showCancel"
              v-bind="cancelBtnOpts"
              @click="$emit('cancel')"
            >{{cancelText}}</custom-button>
            <custom-button
              v-bind="confirmBtnOpts"
              @click="$emit('confirm')"
            >{{okText}}</custom-button>
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
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid var(--color-modal-def-border);
  .#{$namespace}-header {
    .#{$namespace}-title {
      font-size: 18px;
      color: var(--color-active-color);
    }
  }
  .#{$namespace}-content {
    &::-webkit-scrollbar {
      width: 24px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      border-left: 16px solid transparent;
      background-clip: padding-box;
      background-color: var(--color-main-bg-1);
    }
    &::-webkit-scrollbar-track {
      background-color: var(--color-main-bg-2);
    }
  }
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