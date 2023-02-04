<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import { useCommonStore } from '@store/common'
import { ModalName } from '@type/interface'
import CustomInput from '@components/form/custom-input/custom-input.vue'
import { ref } from 'vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const bindInputText = ref<string>('')
</script>

<template>
  <modal
    title="库"
    width="496"
    top="100"
    v-if="commonStore.displayModal === ModalName.LIBRARIES"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div>
      <div class="modal-sub-title">外部样式</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 CSS 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-input
          size="large"
          width="100%"
          placeholder="输入想查找的样式库..."
          v-model="bindInputText"
        />
      </div>
      <div class="mt-s flex">
        <custom-input
          :radius="0"
          size="large"
          width="100%"
          v-model="bindInputText"
        >
          <template v-slot:leftSide>
            <div class="fill-h cursor-pointer flex-col-center inline-flex">
              <div
                class="flex-1 flex-y-center"
              >
                <i class="icon iconfont icon-down font-s line-h-unset icon-rotate-180 flex-1
                  inline-flex font-active fade-ease p-x-s pt-xs"></i>
              </div>
              <div
                class="flex-1 flex-y-center"
              >
                <i class="icon iconfont icon-down font-s line-h-unset flex-1 inline-flex
                  font-active fade-ease p-x-s pb-xs"></i>
              </div>
            </div>
          </template>
          <template v-slot:rightSide>
            <div class="cursor-pointer flex-y-center fill-h">
              <i class="icon iconfont icon-close font-active fade-ease font-xs p-x-s"></i>
            </div>
          </template>
        </custom-input>
      </div>
      <div class="add-new-item no-active-text flex-center cursor-pointer mt-s fade-ease">
        <i class="icon iconfont icon-add font-s"></i>
        <span class="ml-s font-xs">添加新样式</span>
      </div>
      <div class="modal-sub-title">外部脚本</div>
      <div class="modal-small-desc-text">你所添加的外部样式，将按照顺序在本地 JavaScript 执行之前依次执行，支持 http 和 https 协议链接</div>
      <div class="mt-s">
        <custom-input
          size="large"
          width="100%"
          placeholder="输入想查找的脚本库..."
          v-model="bindInputText"
        />
      </div>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.add-new-item {
  height: 41px;
  border: 2px dashed var(--color-no-active-color);
  border-radius: 8px;
  &:hover {
    border-color: var(--color-describe);
    color: var(--color-describe);
  }
}
</style>