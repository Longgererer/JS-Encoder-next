<script setup lang="ts">
import Modal from '@components/modal/modal.vue'
import HelpPopover from '@views/components/help-popover/help-popover.vue'
import { computed, ref } from 'vue'
import { useCommonStore } from '@store/common'
import { ModalName, Position } from '@type/interface'
import { TemplateLang, TemplateType } from '@type/editor'
import { inbuiltTemplateList, TemplateLang2IconMap } from './template-modal.interface'
import { getCustomTemplateList } from './template-modal.util'
import CustomButton from '@components/custom-button/custom-button.vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const selectInbuiltIndex = ref<number>(-1)

const handleClickInbuiltTemplate = (index: number): void => {
  selectInbuiltIndex.value = index
}

const customTemplateList = getCustomTemplateList()
</script>

<template>
  <modal
    title="模板"
    width="730"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.TEMPLATE"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div class="modal-sub-title">内置模板</div>
    <div class="modal-desc-text">选择你想使用的模板</div>
    <!--内置模板列表-->
    <div class="inbuilt-template-list pb-l">
      <div
        class="template flex code-font p-l radius-l cursor-pointer fade-ease"
        :class="index === selectInbuiltIndex ? 'active' : ''"
        v-for="(item, index) in inbuiltTemplateList"
        :key="index"
        @mousedown="handleClickInbuiltTemplate(index)"
      >
        <svg class="lang-icon" aria-hidden="true">
          <use :xlink:href="`#${TemplateLang2IconMap[item.lang]}`"></use>
        </svg>
        <div class="flex-col flex-jcb">
          <div class="active-text font-xs template-lang">{{item.lang}}</div>
          <div
            class="font-xxs template-type"
            :class="item.type === TemplateType.COMPONENT ? 'golden-text' : 'describe-text'"
          >{{item.type}}</div>
        </div>
      </div>
    </div>
    <div class="modal-sub-title flex-y-center">
      <span>自定义模板</span>
      <help-popover describe="你可以编写好模板代码添加相关配置并点击创建模板按钮即可创建自定义模板。"></help-popover>
    </div>
    <template v-if="customTemplateList.length">
      <div>

      </div>
    </template>
    <template v-else>
      <div class="flex-center bg-main3 radius-l blank-tip-area">
        <span class="no-active-text font-xxs">当前未创建任何自定义模板</span>
        <custom-button>以当前代码创建自定义模板</custom-button>
      </div>
    </template>
    <!--自定义模板列表-->
    <div>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.inbuilt-template-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  .template {
    background-color: var(--color-main-bg-1);
    border: 2px solid var(--color-main-bg-1);
    &:hover {
      border: 2px solid var(--color-primary1);
    }
    &.active {
      background-color: var(--color-primary1);
      border: 2px solid var(--color-primary2);
    }
    .lang-icon {
      width: 40px;
      height: 40px;
      margin-right: 32px;
    }
    .template-lang {
      line-height: 18px;
    }
    .template-type {
      line-height: 16px;
    }
  }
}
.blank-tip-area {
  height: 100px;
}
</style>