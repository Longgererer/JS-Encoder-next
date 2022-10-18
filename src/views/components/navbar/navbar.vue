<script setup lang="ts">
import { ref } from 'vue'
import projectConfig from '../../../../package.json'

defineOptions({
  name: 'navbar',
})

/* 是否显示preview窗口 */
const showPreview = ref<boolean>(true)

const handleClickTogglePreview = (): void => {
  showPreview.value = !showPreview.value
}
</script>
<template>
  <div class="navbar fill-w pl-m pr-l code-font flex-y-center bg-main1 no-select">
    <!-- logo信息 -->
    <div class="logo flex-y-center">
      <img src="../../../assets/images/logo.svg" alt="logo" />
    </div>
    <span class="logo-text fw-bold ml-l mr-s primary-text" title="JS-Encoder">JS-Encoder</span>
    <span class="version font-xxs pt-xs describe-text">v{{ projectConfig.version }}</span>

    <!-- 占位 -->
    <div class="flex-1"></div>

    <!-- 右侧菜单 -->
    <div class="right-side-menu">
      <div
        class="menu-item cursor-pointer fade-ease"
        :title="showPreview ? '隐藏预览窗口' : '显示预览窗口'"
        @click="handleClickTogglePreview"
      >
        <i class="icon iconfont icon-move-right inline-block font-m" :class="showPreview ? '' : 'rotate-180'"></i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  height: 49px;
  border-bottom: 1px solid var(--color-main-bg-3);

  .logo img {
    width: 20px;
  }

  .logo-text {
    font-size: 1.125rem;
  }

  .right-side-menu {
    .menu-item {
      color: var(--color-no-active-color);

      &:hover {
        color: var(--color-active-color);
      }
    }
  }
}
</style>
