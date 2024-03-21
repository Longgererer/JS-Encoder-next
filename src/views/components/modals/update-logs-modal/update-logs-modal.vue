<template>
  <modal
    title="更新日志"
    width="730"
    top="85"
    bottom="85"
    :show-footer="false"
    @close="updateDisplayModal(null)">
    <div class="flex mt-m active-text code-font">
      <div class="version-list">
        <div class="version mb-m cursor-pointer flex-y-center">
          <span class="font-xs text-hover-active fade-ease">v4.0.0</span>
          <span class="version-tag font-xxs ml-m">Latest</span>
        </div>
        <div class="version mb-m cursor-pointer flex-y-center">
          <span class="font-xs text-hover-active fade-ease">v4.0.0</span>
        </div>
      </div>
      <div class="log-detail flex-col">
        <span class="log-title font-r">JS-Encoder v4.0.0 更新事项</span>
        <span class="log-time no-active-text font-xxs mt-s">2023-02-12</span>
        <div class="log-content">
          <div style="padding-bottom: 10px">
            <div style="border-left: 4px solid #9246FF;padding-left: 8px;font-size: 12px;margin-bottom: 12px;">
              <span>Feature</span>
            </div>
            <div style="margin-bottom: 8px;font-size: 14px;">1. 这是一个更新事项描述。</div>
          </div>
          <div style="padding-bottom: 10px">
            <div style="border-left: 4px solid #73D13D;padding-left: 8px;font-size: 12px;margin-bottom: 12px;">
              <span>Optimize</span>
            </div>
            <div style="margin-bottom: 8px;font-size: 14px;">1. 这是一个优化事项描述。</div>
          </div>
          <div style="padding-bottom: 10px">
            <div style="border-left: 4px solid #E53935;padding-left: 8px;font-size: 12px;margin-bottom: 12px;">
              <span>Fix</span>
            </div>
            <div style="margin-bottom: 8px;font-size: 14px;">1. 这是一个修复事项描述。</div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script lang="ts" setup>
import Modal from "@components/modal/modal.vue"
import { useCommonStore } from "@store/common"
import { ref } from "vue"

interface IUpdateLog {
  version: string
  time: string
  title: string
  /** 是否最新版本 */
  isLatest: boolean
  content: string
}

const commonStore = useCommonStore()
const { updateDisplayModal } = commonStore

const updateLogs = ref<IUpdateLog[]>([])
</script>

<style lang="scss" scoped>
.version-list {
  width: 160px;
  .version-tag {
    padding: 1px 9px;
    border-radius: 9px;
    background-color: var(--color-primary1);
  }
}
.log-detail {
  margin-left: 40px;
  .log-content {
    margin-top: 24px;
  }
}
</style>