<template>
  <modal
    title="模板"
    width="730"
    top="85"
    bottom="85"
    okText="使用该模板"
    :esc-closeable="false"
    :confirm-btn-opts="{
      customClass: 'p-l',
      disabled: !currTemplate,
    }"
    @close="updateDisplayModal(null)">
    <div class="modal-sub-title">内置模板</div>
    <div class="modal-desc-text">选择你想使用的模板</div>
    <!--内置模板列表-->
    <div class="template-list pb-l">
      <template-card
        v-for="(item, index) in inbuiltTemplateList"
        :key="index"
        :template="item"
        :active="item.id === currTemplate?.id"
        @choose="handleChooseTemplate(item)"
      ></template-card>
    </div>
    <div class="modal-sub-title flex-y-center">
      <span>自定义模板</span>
      <help-popover class="ml-s" describe="你可以编写好模板代码添加相关配置并点击创建模板按钮即可创建自定义模板。"></help-popover>
      <div class="flex-1"></div>
      <custom-button :size="Size.SMALL" @click="handleClickCreateBtn">
        <i class="icon iconfont icon-add font-xxs mr-xs"></i>
        <span>以当前代码创建</span>
      </custom-button>
    </div>
    <div v-if="isTemplateLoading" class="mt-l">
      <loading></loading>
    </div>
    <!--自定义模板列表-->
    <div v-else-if="customTemplateList.length" class="template-list">
      <template-card
        v-for="(item, index) in customTemplateList"
        :key="index"
        :template="item"
        :active="item.id === currTemplate?.id"
        @choose="handleChooseTemplate(item)"
        @edit="handleClickEditTemplate(item)"
      ></template-card>
    </div>
    <template v-else>
      <div class="flex-col flex-center bg-main3 radius-l blank-tip-area">
        <span class="no-active-text font-xxs mb-s">当前未创建任何自定义模板</span>
      </div>
    </template>
    <!-- 创建/编辑模板 -->
    <edit-template-modal
      v-if="isShowEditModal"
      :isEdit="!!currEditTemplate"
      :template="currEditTemplate"
      :confirm-loading="isEditModalLoading"
      @confirm="handleUpdateTemplate"
      @cancel="handleCancelUpdateTemplate"
    ></edit-template-modal>
  </modal>
</template>

<script setup lang="ts">
import Modal from "@components/modal/modal.vue"
import HelpPopover from "@views/components/help-popover/help-popover.vue"
import CustomButton from "@components/custom-button/custom-button.vue"
import Loading from "@components/loading/loading.vue"
import TemplateCard from "./components/template-card/template-card.vue"
import EditTemplateModal from "./components/edit-template-modal/edit-template-modal.vue"
import { IEditTemplateForm } from "./components/edit-template-modal/edit-template-modal"
import { ref } from "vue"
import { useCommonStore } from "@store/common"
import { Size } from "@type/interface"
import { inbuiltTemplateList } from "./template-modal"
import { ITemplateInfo } from "@utils/config/indexed-db"
import useTemplate from "./hooks/use-template"
import { useEditorWrapperStore } from "@store/editor-wrapper"
import message from "@components/message-list/message-list"

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore
const editorWrapperStore = useEditorWrapperStore()

/** 当前选中的自定义模板id */
const currTemplate= ref<ITemplateInfo>()

const handleChooseTemplate = (template: ITemplateInfo) => {
  currTemplate.value = template
}

const { getCustomTemplateList, createTemplate, updateTemplate } = useTemplate()
const customTemplateList = ref<ITemplateInfo[]>([])
const isTemplateLoading = ref<boolean>(false)
/** 设置自定义模板 */
const setCustomTemplateList = () => {
  customTemplateList.value = []
  isTemplateLoading.value = true
  getCustomTemplateList().then(({ success, data = [] }) => {
    if (!success) { return }
    isTemplateLoading.value = false
    customTemplateList.value = data
  })
}
setCustomTemplateList()

const isShowEditModal = ref<boolean>(false)
const isEditModalLoading = ref<boolean>(false)
const currEditTemplate = ref<ITemplateInfo | undefined>(undefined)
/** 点击编辑模板 */
const handleClickEditTemplate = (template: ITemplateInfo) => {
  currEditTemplate.value = template
  isShowEditModal.value = true
}
const processCloseEditModal = () => {
  currEditTemplate.value = undefined
  isShowEditModal.value = false
}
/** 创建/更新模板 */
const handleUpdateTemplate = async (info: IEditTemplateForm) => {
  if (currEditTemplate.value) {
    processUpdateTemplate(info)
  } else {
    processCreateTemplate(info)
  }
}
/** 取消创建/更新模板 */
const handleCancelUpdateTemplate = () => {
  processCloseEditModal()
}

const handleClickCreateBtn = () => {
  const { isCodeEmpty } = editorWrapperStore
  if (isCodeEmpty) {
    message.notice("请先编写代码再创建模板")
    return
  }
  isShowEditModal.value = true
}
/** 更新模板信息 */
const processUpdateTemplate = async (info: IEditTemplateForm) => {
  const { id } = currEditTemplate.value!
  const editIndex = customTemplateList.value.findIndex((template) => id === template.id)
  const newTemplate = {
    ...customTemplateList.value[editIndex],
    name: info.name,
  }
  isEditModalLoading.value = true
  const { success } = await updateTemplate(newTemplate)
  if (success) {
    message.success("模板更新成功")
    customTemplateList.value[editIndex] = newTemplate
    processCloseEditModal()
  } else {
    message.error("模板更新失败")
  }
  isEditModalLoading.value = false
}
/** 创建新模板 */
const processCreateTemplate = async (info: IEditTemplateForm) => {
  isEditModalLoading.value = true
  const { success, data } = await createTemplate(info.name)
  if (success) {
    message.success("模板创建成功")
    customTemplateList.value.push(data!)
    processCloseEditModal()
  } else {
    message.error("模板创建失败")
  }
  isEditModalLoading.value = false
}
</script>

<style lang="scss" scoped>
.template-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.blank-tip-area {
  height: 100px;
}
</style>