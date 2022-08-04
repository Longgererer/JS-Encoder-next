<script setup lang="ts">
import tooltip from '@/components/tooltip/tooltip.vue'
import { SidebarType, SidebarTypeToText, SidebarTypeToIcon } from './sidebar'

defineOptions({ name: 'sidebar' })

/** 侧边栏选项列表，每个子列表之间用横线分割 */
const sidebarList: SidebarType[][] = [
  [SidebarType.TEMPLATE, SidebarType.SETTING, SidebarType.LIBRARY],
  [SidebarType.UPLOAD, SidebarType.DOWNLOAD],
  [SidebarType.SHORTCUT, SidebarType.UPDATE_LOG, SidebarType.GITHUB],
]
</script>

<template>
  <div class="sidebar bg-main1 fill-h flex-col-x-center">
    <template v-for="(list, index) in sidebarList" :key="index">
      <!-- 分割线 -->
      <div class="split-line" v-if="index > 0"></div>
      <!-- 子选项列表 -->
      <div class="sidebar-sub fill-w p-y-s">
        <div class="sidebar-item-wrapper flex-center" v-for="item in list" :key="item">
          <tooltip :content="SidebarTypeToText[item]" :showTriangle="false" offset="8">
            <div class="sidebar-item fade-ease cursor-pointer flex-center">
              <i class="fade-ease" :class="SidebarTypeToIcon[item]">❀</i>
            </div>
          </tooltip>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 48px;
  border-right: 1px solid var(--color-main-bg-3);
  .split-line {
    width: 36px;
    height: 1px;
    background-color: var(--color-main-bg-3);
  }
  .sidebar-sub {
    .sidebar-item-wrapper {
      width: 48px;
      height: 48px;
      .sidebar-item {
        width: 36px;
        height: 36px;
        border-radius: 8px;
        i {
          color: var(--color-no-active-color);
        }
        &:hover {
          background-color: var(--color-main-bg-3);
          i {
            color: var(--color-active-color);
          }
        }
      }
    }
  }
}
</style>
