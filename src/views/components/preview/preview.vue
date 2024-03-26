<template>
  <div class="flex-col fill-w" :class="namespace">
    <div class="bg-main2 flex no-select pr-l flex-sh" :class="`${namespace}-bar`">
      <!--tab-->
      <div
        class="fill-h text-hover-active cursor-pointer transition-all flex-y-center active"
        :class="`${namespace}-tab`">
        <span class="code-font">Output</span>
      </div>
      <!--占位-->
      <div class="flex-1"></div>
      <!--工具按钮-->
      <div
        class="flex-center"
        :class="`${namespace}-options`"
        v-for="option in previewOptions"
        :key="option.type">
        <icon-btn
          :size="IconBtnSize.MD"
          :icon-class="option.icon"
          :title="option.title"
          @click="handleClickOption(option.type)"
        ></icon-btn>
      </div>
    </div>
    <div class="flex-1 relative" :class="[isFullScreen ? 'fixed pos-full high-layer' : '']">
      <!--预览html-->
      <div class="fill-h relative no-select" :class="`${namespace}-iframe-wrapper`">
        <iframe
          title="output"
          id="iframe"
          name="iframe"
          ref="iframeElement"
          src="/src/assets/html/preview.html"
          class="fill no-border absolute pos-full"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups
                  allow-presentation allow-same-origin allow-scripts"
          allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope;
                payment; ambient-light-sensor; encrypted-media; fullscreen;"
          :class="`${namespace}-iframe`"
        ></iframe>
        <!--遮罩层-->
        <div
          v-show="isShowSize"
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
        class="flex-col-center code-font font-xxl active-text absolute pos-full bg-main3 over-hidden"
        :class="`${namespace}-guide`">
        <div class="first-title">首次使用<span class="primary-text p-x-s">JS-Encoder</span>?</div>
        <span class="font-r mt-xxl">查看帮助文档了解更多好用功能</span>
        <custom-button class="jump-btn flex-sh" :type="BtnType.PRIMARY" @click="handleJumpToHelp">前往文档</custom-button>
        <span
          class="text-hover-active fade-ease cursor-pointer mt-m font-xs"
          @click="handleSkipGuide"
        >跳过</span>
      </div>
      <!-- 全屏时顶部菜单 -->
      <div
        v-if="isFullScreen"
        class="top-bar bg-main1 p-y-xs absolute pos-origin pos-right high-layer flex-x-center fade-ease"
        :class="isFoldTopBar ? 'fold' : 'unfold'">
        <div class="flex-center p-x-xs" v-for="option in previewFullscreenOptions" :key="option.type">
          <icon-btn
            :size="IconBtnSize.MD"
            :icon-class="option.icon"
            :title="option.title"
            @click="handleClickOption(option.type)"
          ></icon-btn>
        </div>
        <div
          class="top-bar-folder absolute bg-main1 flex-center cursor-pointer fade-ease"
          @click="handleToggleFoldTopBar">
          <i class="icon iconfont icon-down active-text font-xs"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconBtn from "@components/icon-btn/icon-btn.vue"
import CustomButton from "@components/custom-button/custom-button.vue"
import { BtnType } from "@type/interface"
import { HELP_DOCS_URL } from "@utils/tools/config"
import { onMounted, ref } from "vue"
import { useLayoutStore } from "@store/layout"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"
import { IProps, previewFullscreenOptions, previewOptions, PreviewOptionType } from "./preview"
import { getLocalStorage, setLocalStorage } from "@utils/tools/storage"
import { LocalStorageKey } from "@utils/config/storage"
import PreviewService from "@utils/services/preview-service"

defineProps<IProps>()

/** 组件名 */
const namespace = "preview"
const { modulesSize } = useLayoutStore()

/**
 * 新手引导
 */
const hasHidedNewUserGuide = Boolean(getLocalStorage(LocalStorageKey.HAS_HIDED_NEW_USER_GUIDE))
const isShowNewUserGuide = ref<boolean>(!hasHidedNewUserGuide)
const handleSkipGuide = (): void => {
  // 隐藏引导
  isShowNewUserGuide.value = false
  // 存储状态
  setLocalStorage(LocalStorageKey.HAS_HIDED_NEW_USER_GUIDE, false)
}

const handleJumpToHelp = (): void => {
  window.open(HELP_DOCS_URL, "_blank")
}

const iframeElement = ref<HTMLIFrameElement | null>()
let previewService: PreviewService
onMounted(() => {
  previewService = new PreviewService(iframeElement.value!)
})

/** 是否全屏展示iframe */
const isFullScreen = ref<boolean>(false)
const handleClickOption = (type: PreviewOptionType) => {
  switch(type) {
    case PreviewOptionType.FULLSCREEN:
    case PreviewOptionType.EXIT_FULLSCREEN:
      isFullScreen.value = !isFullScreen.value
      break
    case PreviewOptionType.REFRESH:
      previewService.refreshIframe()
      break
    default:
      // do nothing
  }
}
const isFoldTopBar = ref<boolean>(false)
const handleToggleFoldTopBar = () => {
  isFoldTopBar.value = !isFoldTopBar.value
}
</script>

<style lang="scss" scoped>
$namespace: "preview";

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
      background-color: #fff;
    }
    .#{$namespace}-iframe-size {
      height: 24px;
      background-color: #f2f2f2;
      color: #999;
    }
  }
  .#{$namespace}-guide {
    .jump-btn {
      margin-top: 120px;
    }
  }

  .top-bar {
    .top-bar-folder {
      width: 100px;
      height: 16px;
      border-bottom-right-radius: 10px;
      border-bottom-left-radius: 10px;
      transform: perspective(20px) rotateX(-8deg) rotateY(0) translateZ(0);
      bottom: -16px;
    }
    &.fold {
      opacity: 0.1;
      top: -36px;
      &:hover {
        opacity: 1;
      }
    }
    &.unfold {
      opacity: 1;
      top: 0;
      i {
        transform: rotate(180deg);
      }
    }
  }
}
</style>