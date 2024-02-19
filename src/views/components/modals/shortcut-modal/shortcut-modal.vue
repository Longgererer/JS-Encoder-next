<script lang="ts" setup>
import Modal from "@components/modal/modal.vue"
import CustomInput from "@components/form/custom-input/custom-input.vue"
import { useCommonStore } from "@store/common"
import { ModalName, Position } from "@type/interface"
import { ShortcutMapList, IShortcutMap } from "./shortcut-modal.interface"
import { ref } from "vue"

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const bindInputText = ref<string>("")
const searchResult = ref<IShortcutMap[]>(ShortcutMapList)
</script>

<template>
  <modal
    title="快捷键"
    width="500"
    top="85"
    bottom="85"
    v-if="commonStore.displayModal === ModalName.SHORTCUT"
    :show-footer="false"
    @close="updateDisplayModal(null)"
  >
    <div class="pt-s pb-l flex-ais sticky bg-main2" style="top:0">
      <custom-input
        size="large"
        width="100%"
        placeholder="查询快捷键..."
        v-model="bindInputText"
      ></custom-input>
    </div>
    <div class="shortcut-list-wrapper font-xs fill-h flex-1 common-scrollbar">
      <template v-for="(item, index) in ShortcutMapList" :key="index">
        <div class="shortcut-list-name active-text pb-s">
          <span>{{item.name}}</span>
        </div>
        <template v-for="shortcut in item.keymap" :key="shortcut.describe">
          <div class="flex-y-center mt-s">
            <span class="describe-text">{{shortcut.describe}}</span>
            <div class="flex-1"></div>
            <template v-for="key in shortcut.list" :key="key">
              <kbd class="key active-text code-font radius-l p-y-xs p-x-s">{{key}}</kbd>
            </template>
          </div>
        </template>
      </template>
    </div>
  </modal>
</template>

<style lang="scss" scoped>
.shortcut-list-name {
  height: 28px;
  border-bottom: 1px solid var(--color-form-item);
  &:not(:first-child) {
    margin-top: 16px;
  }
}
.key {
  border: 1px solid var(--color-describe);
  box-shadow: 0 2px var(--color-no-active-color);
  &:not(:last-child) {
    margin-right: 4px;
  }
}
</style>