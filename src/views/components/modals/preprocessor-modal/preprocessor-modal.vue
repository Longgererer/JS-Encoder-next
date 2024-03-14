<template>
  <modal
    v-if="commonStore.displayModal === ModalName.PREPROCESSOR"
    title="预处理"
    width="500"
    top="120"
    :mask-closable="false"
    :confirm-btn-opts="{ size: Size.LARGE }"
    @close="handleCloseModal"
    @confirm="handleConfirmModal">
    <div v-for="item in prepInfoList" :key="item.origin">
      <div class="active-text mt-l mb-xs code-font font-xs">{{item.title}}预处理</div>
      <custom-select
        select-style="width: 100%;"
        appendToBody
        v-model="cachePrepMap[item.origin]"
        :size="Size.LARGE"
        :data-list="item.prepList"
        @selected="($event) => handleSelectPrep($event, item.origin)">
      </custom-select>
    </div>
  </modal>
</template>

<script setup lang="ts">
import Modal from "@components/modal/modal.vue"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import { useCommonStore } from "@store/common"
import { ModalName, Size } from "@type/interface"
import { ref } from "vue"
import { prepInfoList } from "./preprocessor-modal"
import { OriginLang, Prep } from "@type/prep"
import { ISelectOption } from "@components/form/custom-select/custom-select"
import { useEditorConfigStore, initialPrepMap } from "@store/editor-config"
import { IEditorPrepMap } from "@type/settings"

const commonStore = useCommonStore()
const editorConfigStore = useEditorConfigStore()
const { updatePrepMap, prepMap } = editorConfigStore

const cachePrepMap = ref<IEditorPrepMap>({ ...initialPrepMap })

const handleSelectPrep = ({ value }: ISelectOption, origin: OriginLang) => {
  cachePrepMap.value[origin] = value as Prep
}

const handleCloseModal = () => {
  cachePrepMap.value = { ...prepMap }
  commonStore.updateDisplayModal(null)
}

const handleConfirmModal = () => {
  updatePrepMap(cachePrepMap.value)
  commonStore.updateDisplayModal(null)
}
</script>

<style lang="scss" scoped></style>