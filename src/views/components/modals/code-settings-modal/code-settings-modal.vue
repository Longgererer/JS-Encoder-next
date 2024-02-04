<template>
  <modal
    title="编码设置"
    width="730"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.CODE_SETTINGS"
    :show-footer="false"
    @close="handleCloseModal"
  >
    <div class="flex">
      <div class="flex-col flex-1">
        <div class="modal-sub-title">编码</div>
        <div class="pt-xs"><checkbox v-model="settings.edit.codeHinting" disabled>智能提示</checkbox></div>
        <div class="mt-xs"><checkbox v-model="settings.edit.codeLint">lint检查</checkbox></div>
        <div class="mt-xs"><checkbox v-model="settings.edit.lineWrapping" disabled>自动换行</checkbox></div>
        <div class="mt-xs"><checkbox v-model="settings.edit.useEmmet">使用Emmet</checkbox></div>

        <div class="modal-sub-title">缩进</div>
        <div class="pt-xs"><checkbox v-model="settings.indent.indentWithTab">使用制表符缩进</checkbox></div>
        <div class="active-text font-xxs mt-m">缩进长度:</div>
        <div class="mt-s"><custom-input :type="InputType.NUMBER" v-model="settings.indent.tabSize"/></div>

        <div class="modal-sub-title">执行</div>
        <div class="pt-xs"><checkbox v-model="settings.execute.autoExecute">自动执行</checkbox></div>
        <!-- 暂时不需要这个选项 -->
        <!-- <div
          class="font-xxs mt-m"
          :class="settings.execute.autoExecute ? 'active-text' : 'no-active-text'"
        >延迟(执行)时间(ms):</div> -->
        <!-- <div class="mt-s">
          <custom-input :type="InputType.NUMBER" v-model="settings.execute.delayTimeOfExecute"/>
        </div> -->
      </div>
      <div class="flex-col flex-1">
        <div class="modal-sub-title">字体</div>
        <div class="active-text font-xxs mt-m">字号(px):</div>
        <div class="mt-s"><custom-input :type="InputType.NUMBER" v-model="settings.font.fontSize"/></div>
        <div class="active-text font-xxs mt-m">字体:</div>
        <div class="mt-s"><custom-select :data-list="codeFontFamilyOptions" v-model="settings.font.fontFamily"/></div>

        <div class="modal-sub-title">其他</div>
        <div class="active-text font-xxs mt-m">头部标签:</div>
        <div class="mt-s">
          <custom-input
            v-model="settings.other.headTags"
            :type="InputType.TEXTAREA"
            placeholder="输入你想在<head>中添加的标签如<meta...>"
            width="325px"
            :minRows="4"
          />
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts" setup>
import Modal from "@components/modal/modal.vue"
import Checkbox from "@components/form/checkbox/checkbox.vue"
import CustomInput from "@components/form/custom-input/custom-input.vue"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import { reactive } from "vue"
import { useCommonStore } from "@store/common"
import { ModalName } from "@type/interface"
import { InputType } from "@components/form/custom-input/custom-input"
import { useEditorConfigStore, initialSettings } from "@store/editor-config"
import { deepCopy } from "@utils/common"
import { CodeFontFamily } from "@type/settings"

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const editorConfigStore = useEditorConfigStore()
const { updateSettings } = editorConfigStore

/** 复制store中的设置下来 */
const settings = reactive(deepCopy(initialSettings))

/** 关闭modal保存设置 */
const handleCloseModal = (): void => {
  updateDisplayModal(null)
  updateSettings(settings)
}

const codeFontFamilyList = [
  CodeFontFamily.JET_BRAINS_MONO,
  CodeFontFamily.FIRA_CODE,
  CodeFontFamily.HACK,
  CodeFontFamily.SOURCE_CODE_PRO,
  CodeFontFamily.MONACO,
  CodeFontFamily.SPACE_MONO,
  CodeFontFamily.IBM_PLEX_MONO,
  CodeFontFamily.INCONSOLATA,
  CodeFontFamily.COURIER_PRIME,
]
const codeFontFamilyOptions = codeFontFamilyList.map((codeFontFamily) => ({ value: codeFontFamily }))
</script>

<style lang="scss" scoped></style>