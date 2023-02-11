<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import CustomButton from '@components/custom-button/custom-button.vue'
import Checkbox from '@components/form/checkbox/checkbox.vue'
import CustomInput from '@components/form/custom-input/custom-input.vue'
import { useCommonStore } from '@store/common'
import { ModalName, Position } from '@type/interface'
import { ref } from 'vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const enum DownloadType {
  SINGLE,
  MULTIPLE,
}
const activeType = ref<DownloadType>(DownloadType.SINGLE)

const bindVal = ref<boolean>(false)
const bindInputText = ref<string>('')
</script>

<template>
  <modal
    title="下载文件"
    width="500"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.DOWNLOAD_CODE"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div class="download-type flex code-font">
      <div
        class="single-file-type full-h radius-xxl flex-1 mr-l cursor-pointer"
        :class="activeType === DownloadType.SINGLE ? 'active' : ''"
      >
        <div class="flex-y-center">
          <i class="icon iconfont icon-single-file"></i>
          <span class="type-title ml-s">单文件</span>
        </div>
        <div class="font-xs mt-m">将编译后的 HTML、CSS 和 JS 代码整合成一个 HTML 文件</div>
      </div>
      <div
        class="single-file-type full-h radius-xxl flex-1 mr-l cursor-pointer"
        :class="activeType === DownloadType.MULTIPLE ? 'active' : ''"
      >
        <div class="flex-y-center">
          <i class="icon iconfont icon-multiple-file"></i>
          <span class="type-title ml-s">多文件</span>
        </div>
        <div class="font-xs mt-m">生成一个包含编译后的 HTML、CSS 和 JS 文件的文件夹压缩包</div>
      </div>
    </div>
    <div class="download-pre-compile-file">
      <div class="flex-ais"><checkbox v-model="bindVal">下载编译前的文件</checkbox></div>
      <div class="font-xxs mt-s no-active-text">如果你使用了预处理语言，选中此选项将会连带下载未编译的文件</div>
    </div>
    <div class="flex-col flex-ais mt-l">
      <span class="mb-s font-xs active-text">下载文件/文件夹名：</span>
      <custom-input
        type="text"
        width="100%"
        placeholder="输入下载文件/文件夹名，默认名是JSEncoder"
        v-model="bindInputText"
      />
    </div>
    <div class="download-btn">
      <custom-button
        fill
        size="xLarge"
        customClass="radius-l font-s"
      >下载文件</custom-button>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.download-type {
  .single-file-type,
  .multiple-file-type {
    border: 2px solid var(--color-form-item);
    padding: 24px;
    color: var(--color-no-active-color);
    &.active {
      color: var(--color-active-color);
      border-color: var(--color-primary-active);
      background-color: var(--color-primary);
    }

    .icon {
      font-size: 42px;
    }
    .type-title {
      font-size: 18px;
    }
  }
}
.download-pre-compile-file {
  margin-top: 36px;
}
.download-btn {
  margin-top: 36px;
}
</style>