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
import {
  EDITOR_MIN_WIDTH, getInitModulesSize, getModulesHeight, getModulesWidth, getNewResultModuleResize, RESULT_MIN_WIDTH,
} from '@views/container/container.util'
import { useLayoutStore } from '@store/layout'
import useWindowResize from '@hooks/useWindowResize'

const layoutStore = useLayoutStore()
const { updateModuleSize, updateIsModulesResizing, modulesSize } = layoutStore
const { clientWidth, clientHeight } = useWindowResize()

onMounted(() => {
  // 设置初始模块尺寸
  updateModuleSize(getInitModulesSize())
  // 开始监听窗口尺寸变化更新对应模块尺寸
  startObserveWindowSize()
})

/* 监听窗口尺寸变化更新对应模块尺寸 */
const startObserveWindowSize = (): void => {
  watch(clientWidth, (newWidth: number, oldWidth: number) => {
    updateModuleSize(getModulesWidth(newWidth - oldWidth, modulesSize))
  })
  watch(clientHeight, (newHeight: number, oldHeight: number) => {
    updateModuleSize(getModulesHeight(newHeight - oldHeight, modulesSize))
  })
}

const handleResizeEditorAndResult = (e: MouseEvent) => {
  const { resultWidth, editorWidth } = modulesSize
  // 拖动时在iframe上显示遮罩层避免鼠标划入iframe中导致事件失效
  updateIsModulesResizing(true)
  const startX = e.clientX
  const wholeWidth = resultWidth + editorWidth
  // 鼠标拖拉editor分隔栏改变editor和结果窗口的宽度
  document.onmousemove = (event: MouseEvent) => {
    const finishWidth = editorWidth + event.clientX - startX
    // 处理改变后的宽度没有低于两个窗口最小值的情况
    if (finishWidth >= EDITOR_MIN_WIDTH && wholeWidth - finishWidth >= RESULT_MIN_WIDTH) {
      updateModuleSize({
        editorWidth: finishWidth,
        resultWidth: wholeWidth - finishWidth,
      })
    }
    processFinishResize()
  }
}

const handleResizeConsoleAndPreview = (startY: number) => {
  const { consoleHeight, previewHeight } = modulesSize
  // 拖动时在iframe上显示遮罩层避免鼠标划入iframe中导致事件失效
  updateIsModulesResizing(true)
  // 鼠标拖拉console分隔栏改变console和iframe的高度
  document.onmousemove = (event: MouseEvent) => {
    const newModuleSize = getNewResultModuleResize(startY, event.clientY, consoleHeight, previewHeight)
    updateModuleSize(newModuleSize)
    processFinishResize()
  }
}

const processFinishResize = (): void => {
  document.onmouseup = () => {
    updateIsModulesResizing(false)
    document.onmouseup = null
    document.onmousemove = null
  }
}
</script>

<template>
  <navbar></navbar>
  <div class="main-content flex">
    <sidebar></sidebar>
    <!--编辑-->
    <div class="over-hidden" :style="{ width: `${modulesSize.editorWidth}px` }">
      <editor-wrapper></editor-wrapper>
    </div>
    <!--分割线-->
    <div class="resize-line y cursor-x-resize bg-main2 fade-ease" @mousedown="handleResizeEditorAndResult"></div>
    <!--结果-->
    <div :style="{ width: `${modulesSize.resultWidth}px` }">
      <preview
        :style="{ height: `${modulesSize.previewHeight}px` }"
        :isShowScreen="layoutStore.isModulesResizing"
      ></preview>
      <console
        :style="{ height: `${modulesSize.consoleHeight}px` }"
        @resize="handleResizeConsoleAndPreview"
      ></console>
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