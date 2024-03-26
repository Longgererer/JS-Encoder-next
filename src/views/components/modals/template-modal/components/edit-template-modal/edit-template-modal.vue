<template>
  <modal
    width="300"
    top="220"
    :mask-closable="false"
    :esc-closeable="false"
    :show-close="false"
    :title="`${isEdit ? '编辑' : '创建'}模板`"
    @cancel="handleCancelModal"
    @confirm="handleConfirmModal">
    <div class="active-text mt-l mb-xs code-font font-xs">模板名</div>
    <custom-input v-model="editTemplateForm.name"></custom-input>
  </modal>
</template>

<script setup lang="ts">
import Modal from "@components/modal/modal.vue"
import CustomInput from "@components/form/custom-input/custom-input.vue"
import { ref } from "vue"
import { IProps, IEmits, IEditTemplateForm } from "./edit-template-modal"

const props = defineProps<IProps>()
const emits = defineEmits<IEmits>()

const initFormValue: IEditTemplateForm = {
  name: "",
}
const editTemplateForm = ref<IEditTemplateForm>({ ...initFormValue })

const init = () => {
  const { isEdit, template } = props
  if (!isEdit) { return }
  editTemplateForm.value = { name: template?.name || "" }
}
init()

const handleCancelModal = () => {
  editTemplateForm.value = { ...initFormValue }
  emits("cancel")
}

const handleConfirmModal = () => {
  emits("confirm", editTemplateForm.value)
}
</script>

<style lang="scss" scoped></style>