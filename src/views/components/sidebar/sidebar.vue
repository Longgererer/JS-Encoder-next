<script setup lang="ts">
import Tooltip from '@components/tooltip/tooltip.vue'
import IconBtn from '@components/icon-btn/icon-btn.vue'
import { Theme } from '@type/interface'
import { GITHUB_REPO_URL } from '@utils/config'
import {
  SidebarList, SidebarType, SidebarTypeToIcon, SidebarTypeToModalNameMap, SidebarTypeToText, ThemeIcon,
} from './sidebar.interface'
import { useCommonStore } from '@store/common'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const NAMESPACE = 'sidebar'

const commonStore = useCommonStore()
const { updateDisplayModal, updateTheme } = commonStore
const { theme } = storeToRefs(commonStore)

const processThemeChanged = (): void => {
  updateTheme(theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK)
}

const handleClickItem = (type: SidebarType) => {
  switch (type) {
    case SidebarType.THEME: {
      processThemeChanged()
      break
    }
    case SidebarType.GITHUB: {
      window.open(GITHUB_REPO_URL, '_blank')
      break
    }
    default: {
      const modalName = SidebarTypeToModalNameMap.get(type)
      if (modalName) { updateDisplayModal(modalName) }
    }
  }
}

</script>

<template>
  <div class="bg-main1 fill-h flex-col-x-center" :class="NAMESPACE">
    <template v-for="(list, index) in SidebarList" :key="index">
      <!-- 分割线 -->
      <div class="split-line" v-if="index > 0 && index !== SidebarList.length - 1 && list.length"></div>
      <!-- 子选项列表 -->
      <div class="fill-w p-y-s" :class="`${NAMESPACE}-sub`" v-if="list.length">
        <div
          class="flex-center"
          :class="`${NAMESPACE}-item-wrapper`"
          v-for="item in list"
          :key="item"
        >
          <tooltip :content="SidebarTypeToText[item]" :show-triangle="false" offset="8" level="15">
            <icon-btn
              size="lg"
              :icon-class="item === SidebarType.THEME ? ThemeIcon[theme] : SidebarTypeToIcon[item]"
              @click="handleClickItem(item)"
            ></icon-btn>
          </tooltip>
        </div>
      </div>
      <div class="flex-1" v-else></div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
$namespace: sidebar;

.#{$namespace} {
  width: 49px;
  border-right: 1px solid var(--color-main-bg-3);
  .split-line {
    width: 36px;
    background-color: transparent;
    border-bottom: 1px solid var(--color-main-bg-3);
  }
  .#{$namespace}-sub {
    .#{$namespace}-item-wrapper {
      width: 48px;
      height: 48px;
    }
  }
}
</style>
