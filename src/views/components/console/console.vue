<template>
  <div class="console flex-col fill-w code-font">
    <!-- 头部 -->
    <div class="console-header bg-main1 active-text font-xs flex pl-l pr-l no-select">
      <div class="console-title flex-y-center">
        <i class="icon iconfont icon-console font-s"></i>
        <span class="ml-s renew-line-xxs">Console</span>
        <!-- 总数计算 -->
        <div class="font-xxs bg-main3 p-x-xxs ml-xs describe-text radius-m">12</div>
      </div>
      <!-- 占位 + 拖拽 -->
      <div class="flex-1 cursor-y-resize" @mousedown="emits('resize', $event.clientY)"></div>
      <!-- 展示总数的日志类型列表 -->
      <div class="flex-y-center font-xxs">
        <template v-for="item in countLogInfoList" :key="item.logType">
          <div
            v-if="!!item.count"
            class="mr-m flex-y-center"
            :class="`${item.logType}-count`">
            <i class="icon iconfont mr-xs inline-block" :class="item.icon"></i>
            <div class="renew-line-xxs">{{ item.count }}</div>
          </div>
        </template>
      </div>
      <!-- 最小化 -->
      <div class="flex-center ml-l">
        <icon-btn
          icon-class="icon-fold"
          title="收起"
          hover-bg="transparent"
          :size="IconBtnSize.SM"
          @click="handleClickToggleConsole"
        ></icon-btn>
      </div>
    </div>
    <!--工具栏-->
    <div class="console-toolbar bg-main2 active-text font-xxs flex p-x-l flex-sh no-select">
      <!--类型过滤-->
      <div class="filter flex-y-center">
        <span class="mr-s">过滤:</span>
        <custom-select
          v-model="filterType"
          :size="Size.SMALL"
          :data-list="filterSelectOptions"
          select-style="height: 20px; border-radius: 4px; width: 100px;"
          select-inner-style="padding: 0 8px;"
          option-style="padding-left: 8px;"
        ></custom-select>
      </div>
      <div class="flex-1"></div>
      <!--操作按钮-->
      <div class="tool-btn-group flex-y-center flex-sh">
        <div>
          <icon-btn
            icon-class="icon-forbid"
            title="清空日志"
            :size="IconBtnSize.SM"
          ></icon-btn>
        </div>
        <div class="ml-s">
          <icon-btn
            icon-class="icon-console-setting"
            title="设置"
            :highlight-style="{ color: 'var(--color-primary1)' }"
            :size="IconBtnSize.SM"
            :highlight="isShowConsoleSettings"
            @click="isShowConsoleSettings = !isShowConsoleSettings"
          ></icon-btn>
        </div>
      </div>
    </div>
    <div class="relative flex-1">
      <!--日志列表-->
      <div class="console-log-list-wrapper"></div>
      <!--设置-->
      <div v-show="isShowConsoleSettings" class="console-settings pt-m pl-m flex-col">
        <checkbox>每次执行前自动清空日志</checkbox>
        <checkbox class="mt-s">控制台日志不进行高亮</checkbox>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogType } from "@type/console"
import { ref, watch } from "vue"
import { useConsoleStore } from "@store/console"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"
import { Size } from "@type/interface"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import IconBtn from "@components/icon-btn/icon-btn.vue"
import Checkbox from "@components/form/checkbox/checkbox.vue"
import { IEmits, countLogInfoList, filterSelectOptions } from "./console"
import { useLayoutStore } from "@store/layout"
import { CONSOLE_MIN_HEIGHT } from "@utils/services/module-size-service"

const emits = defineEmits<IEmits>()

const { updateFilter } = useConsoleStore()
const layoutStyle = useLayoutStore()
const { updateIsFoldConsole, updateModuleSize } = layoutStyle

/** 当前过滤日志类型选项 */
const filterType = ref<LogType>(LogType.ALL)
// TODO: 使用computed
const filterLogTypeList = (logType: LogType) => {

}
watch(filterType, (newType) => {
  filterLogTypeList(newType)
})

/** 是否展示console设置 */
const isShowConsoleSettings = ref<boolean>(false)

/** 收起console */
const handleClickToggleConsole = () => {
  const { modulesSize: { consoleHeight, previewHeight } } = layoutStyle
  updateIsFoldConsole(true)
  updateModuleSize({
    consoleHeight: CONSOLE_MIN_HEIGHT,
    previewHeight: consoleHeight - CONSOLE_MIN_HEIGHT + previewHeight,
  })
}
</script>

<style lang="scss" scoped>
.console {
  .console-header {
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
  .console-toolbar {
    height: 28px;
    .tool-btn-group {
      margin-left: 22px;
    }
  }
}
</style>