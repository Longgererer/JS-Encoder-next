<script setup lang="ts">
import Navbar from '@views/components/navbar/navbar.vue'
import Sidebar from '@views/components/sidebar/sidebar.vue'
import Preview from '@views/components/preview/preview.vue'
import Console from '@views/components/console/console.vue'
import EditorWrapper from '@views/components/editor-wrapper/editor-wrapper.vue'
import TemplateModal from '@views/components/modals/template-modal/template-modal.vue'
import CodeSettingsModal from '@views/components/modals/code-settings-modal/code-settings-modal.vue'
import LibrariesModal from '@views/components/modals/libraries-modal/libraries-modal.vue'
import UploadCodeModal from '@views/components/modals/upload-code-modal/upload-code-modal.vue'
import DownloadCodeModal from '@views/components/modals/download-code-modal/download-code-modal.vue'
import ShortcutModal from '@views/components/modals/shortcut-modal/shortcut-modal.vue'
import UpdateLogModal from '@views/components/modals/update-log-modal/update-log-modal.vue'
import { onMounted, ref, watch } from 'vue'
import { getInitModulesSize, getModulesHeight, getModulesWidth } from '@views/container/container.util'
import { useLayoutStore } from '@store/layout'
import { storeToRefs } from 'pinia'
import useWindowResize from '@hooks/useWindowResize'

const { updateModuleSize, modulesSize } = useLayoutStore()
const { clientWidth, clientHeight } = useWindowResize()

onMounted(() => {
  // 设置初始模块尺寸
  updateModuleSize(getInitModulesSize())
  // 开始监听窗口尺寸变化更新对应模块尺寸
  startObserveWindowSize()
})

/* 监听窗口尺寸变化更新对应模块尺寸 */
function startObserveWindowSize(): void {
  watch(clientWidth, (newWidth: number, oldWidth: number) => {
    updateModuleSize(getModulesWidth(newWidth - oldWidth, modulesSize))
  })
  watch(clientHeight, (newHeight: number, oldHeight: number) => {
    updateModuleSize(getModulesHeight(newHeight - oldHeight, modulesSize))
  })
}
</script>

<template>
  <navbar></navbar>
  <div class="main-content flex">
    <sidebar></sidebar>
    <!--编辑-->
    <div :style="{ width: `${modulesSize.editorWidth}px` }">
      <editor-wrapper></editor-wrapper>
    </div>
    <!--分割线-->
    <div class="resize-line y cursor-x-resize bg-main2 fade-ease"></div>
    <!--结果-->
    <div :style="{ width: `${modulesSize.resultWidth}px` }">
      <preview :style="{ height: `${modulesSize.previewHeight}px` }"></preview>
      <!--<div class="resize-line x cursor-y-resize bg-main2 fade-ease"></div>-->
      <console :style="{ height: `${modulesSize.consoleHeight}px` }"></console>
    </div>
  </div>
  <!--modals-->
  <template-modal></template-modal>
  <code-settings-modal></code-settings-modal>
  <libraries-modal></libraries-modal>
  <upload-code-modal></upload-code-modal>
  <download-code-modal></download-code-modal>
  <shortcut-modal></shortcut-modal>
  <update-log-modal></update-log-modal>
</template>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 50px);
  .resize-line {
    &.x {
      height: 4px;
    }
    &.y {
      width: 4px;
    }
    &:hover {
      background-color: var(--color-primary1);
    }
  }
}
</style>