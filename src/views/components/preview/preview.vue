<script lang="ts" setup>
import IconBtn from '@components/icon-btn/icon-btn.vue'
import CustomButton from '@components/custom-button/custom-button.vue'
import { BtnType } from '@type/interface'
import { HELP_DOCS_URL } from '@utils/config'
import { ref } from 'vue'
import { useLayoutStore } from '@store/layout'
import { storeToRefs } from 'pinia'

interface IProps {
  isShowScreen?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  isShowScreen: false,
})

/* 组件名 */
const namespace = 'preview'
const { modulesSize } = useLayoutStore()

enum PreviewOptName {
  REFRESH = 'refresh',
  FULLSCREEN = 'fullscreen',
}

interface IPreviewOpt {
  icon: string
  name: PreviewOptName
  title: string
}

const previewOpts: IPreviewOpt[] = [
  { icon: 'icon-refresh', name: PreviewOptName.REFRESH, title: '刷新' },
  { icon: 'icon-magnify', name: PreviewOptName.FULLSCREEN, title: '全屏' },
]

/**
 * 新手引导
 */
const isShowNewUserGuide = ref<boolean>(false)
const handleJumpToHelp = () => {
  window.open(HELP_DOCS_URL, '_blank')
}
const handleSkipGuide = () => {
  // 隐藏引导
  isShowNewUserGuide.value = false
  // 存储状态
}
</script>

<template>
  <div class="flex-col fill-w" :class="namespace">
    <div class="bg-main2 flex no-select pr-s flex-sh" :class="`${namespace}-bar`">
      <!--tab-->
      <div
        class="fill-h font-active cursor-pointer transition-all flex-y-center active"
        :class="`${namespace}-tab`">
        <span class="code-font">Output</span>
      </div>
      <!--占位-->
      <div class="flex-1"></div>
      <!--工具按钮-->
      <div
        class="flex-center"
        :class="`${namespace}-options`"
        v-for="option in previewOpts"
        :key="option.name">
        <icon-btn size="md" :icon-class="option.icon" :title="option.title"></icon-btn>
      </div>
    </div>
    <div class="flex-1 relative" style="height: calc(100% - 36px)">
      <!--预览html-->
      <div class="fill-h relative no-select" :class="`${namespace}-iframe-wrapper`">
        <iframe
          title="output" id="iframe" name="iframe" ref="iframeBox"
          class="fill no-border absolute pos-full"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups
                  allow-presentation allow-same-origin allow-scripts"
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope;
                payment; ambient-light-sensor; encrypted-media; fullscreen;"
          :class="`${namespace}-iframe`"
          :src="`/src/assets/html/preview.html`"
        ></iframe>
        <!--遮罩层-->
        <div
          v-show="isShowScreen"
          class="fill absolute pos-full over-hidden no-select"
          :class="`${namespace}-iframe-screen`">
          <!--尺寸显示-->
          <div
            class="absolute pos-left pos-bottom font-xxs describe-text p-x-s flex-center"
            :class="`${namespace}-iframe-size`">
            <span class="flex-sh">{{modulesSize.resultWidth}}px * {{modulesSize.previewHeight - 36}}px</span>
          </div>
        </div>
      </div>
      <!--新手引导-->
      <div
        v-if="isShowNewUserGuide"
        class="flex-col-x-center code-font font-xxl active-text absolute pos-full bg-main3 over-hidden"
        :class="`${namespace}-guide`">
        <div class="first-title">首次使用<span class="primary-text p-x-s">JS-Encoder</span>?</div>
        <span class="font-r mt-xxl">查看帮助文档了解更多好用功能</span>
        <!--占位-->
        <div class="flex-1"></div>
        <custom-button class="flex-sh" :type="BtnType.PRIMARY" @click="handleJumpToHelp">前往文档</custom-button>
        <span class="font-active fade-ease cursor-pointer mt-m font-xs skip-help" @click="handleSkipGuide">跳过</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$namespace: preview;

.#{$namespace} {
  .#{$namespace}-bar {
    height: 36px;
    .#{$namespace}-tab {
      padding: 0 24px;
      background-color: var(--color-main-bg-1);
      &.active {
        background-color: var(--color-main-bg-3);
        color: var(--color-active-color);
      }
    }
    .#{$namespace}-options {
      &:not(:first-child) {
        padding-left: 8px;
      }
    }
  }
  .#{$namespace}-iframe-wrapper {
    .#{$namespace}-iframe {
      background-color: #ffffff;
    }
    .#{$namespace}-iframe-size {
      height: 24px;
      background-color: #f2f2f2;
      color: #999999;
    }
  }
  .#{$namespace}-guide {
    .first-title {
      margin-top: 36px;
    }
    .skip-help {
      margin-bottom: 80px;
    }
  }
}
</style>