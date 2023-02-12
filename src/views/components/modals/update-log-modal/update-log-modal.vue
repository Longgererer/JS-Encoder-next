<script lang="ts" setup>
import Modal from '@components/modal/modal.vue'
import { useCommonStore } from '@store/common'
import { ModalName } from '@type/interface'
import { ref } from 'vue'

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore
</script>

<template>
  <modal
    title="更新日志"
    width="730"
    top="80"
    bottom="80"
    v-if="commonStore.displayModal === ModalName.UPDATE_LOG"
    :showFooter="false"
    @close="updateDisplayModal(null)"
  >
    <div></div>
  </modal>
</template>

<style lang="scss" scoped>

</style>