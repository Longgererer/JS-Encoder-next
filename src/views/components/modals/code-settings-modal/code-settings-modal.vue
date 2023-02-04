<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import Checkbox from '@components/form/checkbox/checkbox.vue'
import CustomInput from '@components/form/custom-input/custom-input.vue'
import CustomSelect from '@components/form/custom-select/custom-select.vue'
import { computed, ref } from 'vue'
import { useCommonStore } from '@store/common'
import { ModalName } from '@type/interface'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const bindVal = ref<boolean>(false)
const bindInputText = ref<string>('')
const bindInputNumber = ref<number>(5)

const bindDataList = [
  { value: 0, label: 'JetBrains Mono1' },
  { value: 1, label: 'JetBrains Mono2' },
  { value: 2, label: 'JetBrains Mono3' },
  { value: 3, label: 'JetBrains Mono4' },
]
const bindSelectItem = ref<typeof bindDataList[number]>(bindDataList[0])
</script>

<template>
  <modal
    title="编码设置"
    width="730"
    top="100"
    v-if="commonStore.displayModal === ModalName.CODE_SETTINGS"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div class="flex">
      <div class="flex-col flex-1">
        <div class="modal-sub-title">编码</div>
        <div class="pt-xs"><checkbox v-model="bindVal" disabled>智能提示</checkbox></div>
        <div class="mt-xs"><checkbox v-model="bindVal">lint检查</checkbox></div>
        <div class="mt-xs"><checkbox v-model="bindVal" disabled>自动换行</checkbox></div>
        <div class="mt-xs"><checkbox v-model="bindVal">使用Emmet</checkbox></div>

        <div class="modal-sub-title">缩进</div>
        <div class="pt-xs"><checkbox v-model="bindVal">使用制表符缩进</checkbox></div>
        <div class="active-text font-xxs mt-m">缩进长度:</div>
        <div class="mt-s"><custom-input type="number" v-model="bindInputNumber"/></div>
        <!--<div class="mt-s"><custom-input v-model="bindInputText"/></div>-->
        <!--<div class="mt-s"><custom-input v-model="bindInputText" type="textarea"/></div>-->

        <div class="modal-sub-title">执行</div>
        <div class="pt-xs"><checkbox v-model="bindVal">自动执行</checkbox></div>
        <div class="font-xxs mt-m" :class="bindVal ? 'active-text' : 'no-active-text'">延迟(执行)时间(ms):</div>
        <div class="mt-s"><custom-input type="number" v-model="bindInputNumber"/></div>
      </div>
      <div class="flex-col flex-1">
        <div class="modal-sub-title">字体</div>
        <div class="active-text font-xxs mt-m">字号(px):</div>
        <div class="mt-s"><custom-input type="number" v-model="bindInputNumber"/></div>
        <div class="active-text font-xxs mt-m">字体:</div>
        <div class="mt-s"><custom-select :data-list="bindDataList" v-model="bindSelectItem"/></div>

        <div class="modal-sub-title">其他</div>
        <div class="active-text font-xxs mt-m">头部标签:</div>
        <div class="mt-s">
          <custom-input
            v-model="bindInputText"
            type="textarea"
            placeholder="输入你想在<head>中添加的标签如<meta...>"
            width="325px"
            :minRows="4"
          />
        </div>
      </div>
    </div>
  </modal>
</template>

<style lang="scss" scoped>

</style>