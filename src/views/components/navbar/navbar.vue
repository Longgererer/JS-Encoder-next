<script setup lang="ts">
import { ref } from 'vue'
import projectConfig from '../../../../package.json'

/* 是否显示preview窗口 */
const showPreview = ref<boolean>(true)

const handleClickTogglePreview = (): void => {
  showPreview.value = !showPreview.value
}

const NAMESPACE = 'navbar'
</script>
<template>
  <div class="fill-w pr-l code-font flex-y-center bg-main1 no-select" :class="NAMESPACE">
    <!-- logo信息 -->
    <div class="logo fill-h flex-center" title="logo">
      <img src="../../../assets/images/logo.svg" alt="logo" />
    </div>
    <span class="logo-text fw-bold mr-s primary-text" title="JS-Encoder">JS-Encoder</span>
    <span class="version font-xxs pt-xs describe-text" title="version">v{{ projectConfig.version }}</span>

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
$namespace: 'navbar';

.#{$namespace} {
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
