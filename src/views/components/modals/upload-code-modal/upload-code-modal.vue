<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import HelpPopover from '@views/components/help-popover/help-popover.vue'
import CustomButton from '@components/custom-button/custom-button.vue'
import Checkbox from '@components/form/checkbox/checkbox.vue'
import { useCommonStore } from '@store/common'
import { ModalName, Position } from '@type/interface'
import { ref } from 'vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const bindVal = ref<boolean>(false)
</script>

<template>
  <modal
    title="上传文件"
    width="500"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.UPLOAD_CODE"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div class="font-s active-text code-font mt-s">
      <span>支持 HTML、CSS、JS、MD、PUG、SASS、SCSS、STYL、LESS、COFFEE、TS、VUE 及 JSX 格式的文件</span>
    </div>
    <div class="mt-xs">
      <div class="font-xs error-text flex-y-center renew-line-s">
        <span>注意: 上传相应格式的文件会覆盖对应窗口的代码</span>
        <help-popover
          appendToBody
          level="1001"
          describe="预处理语言对应着其编译后语言的窗口，如MD对应的窗口为HTML。"
          :position="Position.BOTTOM"
        ></help-popover>
      </div>
    </div>
    <div class="upload-btn relative cursor-pointer">
      <custom-button
        fill
        shadow
        size="xLarge"
        customClass="radius-l font-xs"
      >
        <input
          class="upload-input fill absolute"
          type="file"
          ref="fileInput"
          multiple="multiple"
          title=""
        />
        <span>选择要上传的文件</span>
      </custom-button>
    </div>

    <!-- start 已上传文件列表 -->
    <div class="file-list mt-l">
      <div class="file radius-l bg-main1 flex-center mb-s relative">
        <span class="file-name code-font active-text font-s flex-1 text-center">config.json</span>
        <div class="delete-btn cursor-pointer font-error fade-ease fill-h p-x-l flex-y-center absolute">
          <i class="icon iconfont icon-bin font-m"></i>
        </div>
      </div>
    </div>

    <custom-button
      fill
      shadow
      size="xLarge"
      customClass="radius-l font-xs"
    >上传文件</custom-button>
    <div class="mt-xs flex-x-center">
      <div class="active-text flex-y-center renew-line-s">
        <checkbox v-model="bindVal">分解HTML</checkbox>
        <help-popover
          appendToBody
          level="1002"
          describe="我们将分解HTML中的各部分的代码以及引入的外部链接，将他们配置到实例中。"
          :position="Position.TOP"
        ></help-popover>
      </div>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.upload-btn {
  margin-top: 32px;
  .upload-input {
    right: 0;
    top: 0;
    opacity: 0;
  }
}
.file-list {
  .file {
    height: 44px;
    border: 2px solid var(--color-form-item);
    &:hover {
      .delete-btn {
        opacity: 1;
      }
    }
    .delete-btn {
      right: 0;
      opacity: 0;
    }
  }
}
</style>