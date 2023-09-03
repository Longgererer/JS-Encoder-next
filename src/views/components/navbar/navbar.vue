<script setup lang="ts">
import { ref } from "vue"
import projectConfig from "../../../../package.json"

/* 是否显示结果窗口 */
const showResult = ref<boolean>(true)
const handleClickTogglePreview = (): void => {
  showResult.value = !showResult.value
}
</script>
<template>
  <div class="navbar fill-w pr-xl code-font flex-y-center bg-main1 no-select">
    <!-- logo信息 -->
    <div class="logo fill-h flex-center" title="logo">
      <img src="../../../assets/images/logo.svg" alt="logo" />
    </div>
    <span class="logo-text fw-bold mr-s primary-text" title="JS-Encoder">JS-Encoder</span>

    <!-- 版本 -->
    <span class="version font-xxs pt-xs describe-text" title="version">v{{ projectConfig.version }}</span>

    <!-- 占位 -->
    <div class="flex-1"></div>

    <!-- 右侧菜单 -->
    <div class="right-side-menu">
      <div
        class="menu-item cursor-pointer fade-ease"
        :title="showResult ? '隐藏预览窗口' : '显示预览窗口'"
        @click="handleClickTogglePreview">
        <i class="icon iconfont icon-move-right inline-block font-m" :class="showResult ? '' : 'rotate-180'"></i>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.navbar {
  height: 49px;
  border-bottom: 1px solid var(--color-main-bg-3);
  .logo {
    width: 48px;
    img {
      width: 20px;
    }
  }
  .logo-text {
    font-size: 1.125rem;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(135deg, var(--color-primary2), var(--color-primary1))
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
