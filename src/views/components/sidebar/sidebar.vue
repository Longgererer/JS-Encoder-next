<script setup lang="ts">
import Tooltip from '@components/tooltip/tooltip.vue'
import IconBtn from '@components/icon-btn/icon-btn.vue'
import { LogType } from '@type/interface'
import { SidebarType, SidebarTypeToText, SidebarTypeToIcon } from './sidebar.interface'

defineOptions({ name: 'sidebar' })

/* 侧边栏选项列表，每个子列表之间用横线分割 */
const sidebarList: SidebarType[][] = [
  [SidebarType.TEMPLATE, SidebarType.SETTING, SidebarType.LIBRARY],
  [SidebarType.UPLOAD, SidebarType.DOWNLOAD],
  [SidebarType.SHORTCUT, SidebarType.UPDATE_LOG],
  [],
  [SidebarType.THEME, SidebarType.GITHUB],
]

const handleClickItem = () => {
  console.log('handleClickItem')
}
</script>

<template>
  <div class="sidebar bg-main1 fill-h flex-col-x-center">
    <template v-for="(list, index) in sidebarList" :key="index">
      <!-- 分割线 -->
      <div class="split-line" v-if="index > 0 && index !== sidebarList.length - 1 && list.length"></div>
      <!-- 子选项列表 -->
      <div class="sidebar-sub fill-w p-y-s" v-if="list.length">
        <div class="sidebar-item-wrapper flex-center" v-for="item in list" :key="item">
          <tooltip :content="SidebarTypeToText[item]" :showTriangle="false" offset="8" level="15">
            <template v-if="item === SidebarType.THEME">
              <!-- 主题类型特殊处理 -->
              <icon-btn size="lg" :icon-class="SidebarTypeToIcon[SidebarType.DARK]" @click="handleClickItem"></icon-btn>
            </template>
            <template v-else>
              <icon-btn size="lg" :icon-class="SidebarTypeToIcon[item]" @click="handleClickItem"></icon-btn>
            </template>
          </tooltip>
        </div>
      </div>
      <div class="flex-1" v-else></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 49px;
  border-right: 1px solid var(--color-main-bg-3);
  .split-line {
    width: 36px;
    background-color: transparent;
    border-bottom: 1px solid var(--color-main-bg-3);
  }
  .sidebar-sub {
    .sidebar-item-wrapper {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
