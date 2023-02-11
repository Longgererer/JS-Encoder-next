<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import CustomInput from '@components/form/custom-input/custom-input.vue'
import { useCommonStore } from '@store/common'
import { ModalName, Position } from '@type/interface'
import { ref } from 'vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const bindInputText = ref<string>('')
</script>

<template>
  <modal
    title="快捷键"
    width="500"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.SHORTCUT"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div class="mt-s">
      <custom-input
        size="large"
        width="100%"
        placeholder="查询快捷键..."
        v-model="bindInputText"
      ></custom-input>
    </div>
  </modal>
</template>

<style lang="scss" scoped>

</style>