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

<script setup lang="ts">
import { ref } from "vue"
import projectConfig from "../../../../package.json"

/** 是否显示结果窗口 */
const showResult = ref<boolean>(true)
const handleClickTogglePreview = (): void => {
  showResult.value = !showResult.value
}
</script>

<style src="./navbar.scss" lang="scss" scoped></style>
