<template>
  <modal
    title="模板"
    width="730"
    top="85"
    bottom="85"
    okText="使用该模板"
    :confirm-btn-opts="{
      customClass: 'p-l',
      disabled: !currTemplate,
    }"
    @close="updateDisplayModal(null)">
    <div class="modal-sub-title">内置模板</div>
    <div class="modal-desc-text">选择你想使用的模板</div>
    <!--内置模板列表-->
    <div class="template-list pb-l">
      <div
        class="template flex code-font p-l radius-l cursor-pointer fade-ease"
        :class="item.id === currTemplate?.id ? 'active' : ''"
        v-for="(item, index) in inbuiltTemplateList"
        :key="index"
        @mousedown="handleChooseTemplate(item)">
        <svg class="lang-icon" aria-hidden="true">
          <use :xlink:href="`#${getTemplateIcon(item)}`"></use>
        </svg>
        <div class="flex-col flex-jcb">
          <div class="active-text font-xs template-lang">{{item.lang}}</div>
          <div
            class="font-xxs template-type"
            :class="item.isComponent ? 'golden-text' : 'describe-text'"
          >{{item.isComponent ? "component" : "default"}}</div>
        </div>
      </div>
    </div>
    <div class="modal-sub-title flex-y-center">
      <span>自定义模板</span>
      <help-popover describe="你可以编写好模板代码添加相关配置并点击创建模板按钮即可创建自定义模板。"></help-popover>
    </div>
    <div v-if="isTemplateLoading" class="mt-l">
      <loading content="加载中"></loading>
    </div>
    <!--自定义模板列表-->
    <div v-else-if="customTemplateList.length" class="template-list">
      <div
        class="template flex code-font p-l radius-l cursor-pointer fade-ease"
        :class="item.id === currTemplate?.id ? 'active' : ''"
        v-for="(item, index) in customTemplateList"
        :key="index"
        @mousedown="handleChooseTemplate(item)">
        <svg class="lang-icon" aria-hidden="true">
          <use :xlink:href="`#${getTemplateIcon(item)}`"></use>
        </svg>
        <div class="flex-col flex-jcb">
          <div class="active-text font-xs template-lang">{{item.lang}}</div>
          <div
            class="font-xxs template-type"
            :class="item.isComponent ? 'golden-text' : 'describe-text'"
          >{{item.isComponent ? "component" : "default"}}</div>
        </div>
      </div>
    </div>
    <template v-else>
      <div class="flex-col flex-center bg-main3 radius-l blank-tip-area">
        <span class="no-active-text font-xxs mb-s">当前未创建任何自定义模板</span>
        <custom-button :size="Size.SMALL" @click="handleCreateTemplate">+ 以当前代码创建</custom-button>
      </div>
    </template>
    <div>
    </div>
  </modal>
</template>

<script setup lang="ts">
import modal from "@components/modal/modal.vue"
import helpPopover from "@views/components/help-popover/help-popover.vue"
import customButton from "@components/custom-button/custom-button.vue"
import loading from "@components/loading/loading.vue"
import { ref } from "vue"
import { useCommonStore } from "@store/common"
import { Size } from "@type/interface"
import { inbuiltTemplateList, getTemplateIcon } from "./template-modal"
import { ITemplateInfo } from "@utils/config/indexed-db"
import useTemplate from "./hooks/use-template"

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

/** 当前选中的自定义模板id */
const currTemplate= ref<ITemplateInfo>()

const handleChooseTemplate = (template: ITemplateInfo) => {
  currTemplate.value = template
}

const { getCustomTemplateList, createTemplate } = useTemplate()
const customTemplateList = ref<ITemplateInfo[]>([])
const isTemplateLoading = ref<boolean>(false)
/** 设置自定义模板 */
const setCustomTemplateList = () => {
  customTemplateList.value = []
  isTemplateLoading.value = true
  getCustomTemplateList().then(({ success, data = [] }) => {
    if (!success) { return }
    console.log(data)
    isTemplateLoading.value = false
    customTemplateList.value = data
  })
}
setCustomTemplateList()

/** 更新模板 */
const handleUpdateTemplate = () => {

}

/** 创建新模板 */
const handleCreateTemplate = () => {
  createTemplate().then(({ success, data }) => {
    if (success) {
      console.log("添加成功")
    }
  })
}
</script>

<style lang="scss" scoped>
.template-list {
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