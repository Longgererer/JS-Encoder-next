<template>
  <div class="flex-col fill-w" :class="namespace">
    <!--头部-->
    <div class="bg-main1 active-text font-xxs flex p-x-l no-select" :class="`${namespace}-header`">
      <div class="flex-y-center" :class="`${namespace}-title`">
        <i class="icon iconfont icon-console font-s"></i>
        <span class="ml-s renew-line-xxs mt-xs code-font">Console</span>
      </div>
      <!--占位 + 拖拽-->
      <div class="flex-1 cursor-y-resize" :class="`${namespace}-resizer`" @mousedown="handleResize"></div>
      <div class="log-type-count-wrapper flex-y-center">
        <div class="error-count mr-m flex-y-center">
          <i class="icon iconfont icon-error mr-xs inline-block"></i>
          <div class="renew-line-xxs code-font mt-xs">2</div>
        </div>
        <div class="warn-count mr-m flex-y-center">
          <i class="icon iconfont icon-warn mr-xs inline-block"></i>
          <div class="renew-line-xxs code-font mt-xs">15</div>
        </div>
        <div class="info-count flex-y-center">
          <i class="icon iconfont icon-info mr-xs inline-block"></i>
          <div class="renew-line-xxs code-font mt-xs">23</div>
        </div>
      </div>
      <div class="fold-btn flex-center cursor-pointer font-active fade-ease ml-l" title="收起">
        <i class="icon iconfont icon-down"></i>
      </div>
    </div>
    <!--工具栏-->
    <div class="bg-main2 active-text font-xxs flex p-x-l code-font flex-sh no-select" :class="`${namespace}-toolbar`">
      <!--类型过滤-->
      <div class="filter flex-y-center">
        <span class="mr-s">Filter:</span>
        <custom-select
          v-model="filterType"
          :size="Size.SMALL"
          :data-list="filterSelectOptions"
          custom-select-style="height: 20px; border-radius: 4px; width: 100px;"
          custom-option-list-style="width: 100px;"
          custom-select-inner-style="padding: 0 8px;"
          custom-option-style="padding-left: 8px;"
        ></custom-select>
      </div>
      <!--操作按钮-->
      <div class="tool-btn-group flex-y-center">
        <div><icon-btn icon-class="icon-forbid" title="清空日志" :size="IconBtnSize.SM"></icon-btn></div>
        <div class="ml-s">
          <icon-btn
            icon-class="icon-console-setting"
            title="设置"
            highlight-style="color: var(--color-primary1);"
            :size="IconBtnSize.SM"
            :highlight="isShowConsoleSettings"
            @click="handleClickConsoleSettingsBtn"
          ></icon-btn>
        </div>
      </div>
    </div>
    <div class="relative flex-1">
      <!--日志列表-->
      <div class="" :class="`${namespace}-log-list-wrapper`"></div>
      <!--设置-->
      <div v-show="isShowConsoleSettings" class="pt-m pl-m flex-col" :class="`${namespace}-settings`">
        <checkbox>每次执行前自动清空日志</checkbox>
        <checkbox class="mt-s">控制台日志不进行高亮</checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogType } from "@type/console"
import { ISelectOption } from "@components/form/custom-select/custom-select"
import { ref, watch } from "vue"
import { useConsoleStore } from "@store/console"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"
import { Size } from "@type/interface"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import IconBtn from "@components/icon-btn/icon-btn.vue"
import Checkbox from "@components/form/checkbox/checkbox.vue"

const emits = defineEmits<{
  (e: "resize", startY: number): void
}>()

const namespace = "console"
const { updateFilter } = useConsoleStore()

/** 日志过滤选项列表 */
const filterSelectOptions: ISelectOption[] = [
  { value: LogType.ALL },
  { value: LogType.MESSAGE },
  { value: LogType.INFO },
  { value: LogType.WARN },
  { value: LogType.ERROR },
]
/** 当前过滤日志类型选项 */
const filterType = ref<LogType>(LogType.ALL)
watch(filterType, (newType) => {
  updateFilter(newType)
})

/** 是否展示console设置 */
const isShowConsoleSettings = ref<boolean>(false)
const handleClickConsoleSettingsBtn = (): void => {
  isShowConsoleSettings.value = !isShowConsoleSettings.value
}

/**
 * console拖拽
 */
const handleResize = (e: MouseEvent) => {
  emits("resize", e.clientY)
}
</script>

<style lang="scss" scoped>
$namespace: console;

.#{$namespace} {
  .#{$namespace}-header {
    height: 28px;
    .error-count,
    .warn-count,
    .info-count {
      height: 16px;
    }
    .error-count {
      color: var(--color-red2);
    }
    .warn-count {
      color: var(--color-amber2);
    }
    .info-count {
      color: var(--color-primary2);
    }
    .fold-btn {
      width: 28px;
      height: 28px;
    }
  }
  .#{$namespace}-toolbar {
    height: 28px;
    .tool-btn-group {
      margin-left: 22px;
    }
  }
}
</style>