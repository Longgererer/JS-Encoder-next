<template>
  <div class="console flex-col fill-w code-font">
    <!-- 头部 -->
    <div class="console-header bg-main1 active-text font-xs flex pl-l pr-l no-select">
      <div class="console-title flex-y-center">
        <i class="icon iconfont icon-console font-s"></i>
        <span class="ml-s renew-line-xxs">Console</span>
        <!-- 总数计算 -->
        <div class="font-xxs bg-main3 p-x-xxs ml-xs describe-text radius-m">{{ consoleService.logs.length }}</div>
      </div>
      <!-- 占位 + 拖拽 -->
      <div class="flex-1 cursor-y-resize" @mousedown="emits('resize', $event.clientY)"></div>
      <!-- 展示总数的日志类型列表 -->
      <div class="flex-y-center font-xxs">
        <template v-for="logType in countLogTypeList" :key="logType">
          <div
            v-if="logType2CountMap[logType]"
            class="mr-m flex-y-center"
            :class="`${logType}-count`">
            <i class="icon iconfont mr-xs inline-block" :class="logType2IconMap[logType]"></i>
            <div class="renew-line-xxs">{{ logType2CountMap[logType] }}</div>
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
            @click="handleClearLogs"
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
    <div class="console-log-list-wrapper console-content relative flex-1">
      <!--日志列表-->
      <div class="console-log-list fill-h over-y-auto" ref="consoleLogListRef">
        <template v-for="(logInfo, index) in consoleService.logs" :key="index">
          <console-item :log-info="logInfo"></console-item>
        </template>
        <div class="console-commend-input-wrapper flex-y-center p-y-xs pl-xs">
          <i class="icon iconfont icon-chevron-right primary-text font-xxs"></i>
          <input
            class="console-commend-input bg-main3 font-xxs flex-1 p-x-xs active-text code-font"
            v-model="commend"
            type="text"
            @keypress="handleCommendChange($event)"
          />
        </div>
      </div>
      <!--设置-->
      <div v-show="isShowConsoleSettings" class="console-settings pt-m pl-m flex-col">
        <checkbox v-model="settings.autoClear">每次执行前自动清空日志</checkbox>
        <!-- <checkbox class="mt-s">控制台日志不进行高亮</checkbox> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { LogFilterType, ConsoleUpdateType } from "@type/console"
import { nextTick, onMounted, ref, shallowRef, watch } from "vue"
import { IconBtnSize } from "@components/icon-btn/icon-btn.interface"
import { Size } from "@type/interface"
import CustomSelect from "@components/form/custom-select/custom-select.vue"
import IconBtn from "@components/icon-btn/icon-btn.vue"
import Checkbox from "@components/form/checkbox/checkbox.vue"
import { IEmits, logType2CountMap, logType2IconMap, countLogTypeList, filterSelectOptions } from "./console"
import { useLayoutStore } from "@store/layout"
import { CONSOLE_MIN_HEIGHT } from "@utils/services/module-size-service"
import ConsoleService from "@utils/services/console-service"
import ConsoleItem from "./components/console-item/console-item.vue"
import { useConsoleStore, initSettings, IConsoleSetting } from "@store/console"

const emits = defineEmits<IEmits>()

const layoutStore = useLayoutStore()
const { updateIsFoldConsole, updateModuleSize } = layoutStore
const consoleStore = useConsoleStore()
const { updateSetting } = consoleStore

const consoleLogListRef = shallowRef<HTMLElement | null>(null)

/** 是否展示console设置 */
const isShowConsoleSettings = ref<boolean>(false)
const settings = ref<IConsoleSetting>({ ...initSettings })
watch(settings, () => {
  updateSetting(settings.value)
}, { deep: true })

/** 当前过滤日志类型选项 */
const filterType = ref<LogFilterType>(LogFilterType.ALL)
/** console命令 */
const commend = ref<string>("")

/** 收起console */
const handleClickToggleConsole = () => {
  const { modulesSize: { consoleHeight, previewHeight } } = layoutStore
  updateIsFoldConsole(true)
  updateModuleSize({
    consoleHeight: CONSOLE_MIN_HEIGHT,
    previewHeight: consoleHeight - CONSOLE_MIN_HEIGHT + previewHeight,
  })
}

const consoleService = new ConsoleService()

const handleCommendChange = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    // shift + enter换行，enter提交
    if (event.shiftKey) {

    } else {
      if (!commend.value) { return }
      consoleService.execute(commend.value)
      commend.value = ""
      nextTick(() => {
        if (!consoleLogListRef.value) { return }
        // 滚动到最底部
        consoleLogListRef.value.scrollTop = consoleLogListRef.value.scrollHeight
      })
    }
  }
}

consoleService.setOptions({
  // 监听日志列表变化，更新各类型统计数量（如果使用computed则会导致大量无意义的遍历）
  onLogsUpdated: (updateType, changeLog) => {
    if (changeLog && updateType === ConsoleUpdateType.ADD) {
      const { type } = changeLog || {}
      logType2CountMap[type] = ++logType2CountMap[type]
    } else {
      countLogTypeList.forEach((logType) => {
        // 数量全部重置
        logType2CountMap[logType] = 0
      })
    }
  },
})

/** 手动清除日志 */
const handleClearLogs = () => {
  consoleService.clear()
}
</script>

<style src="./console.scss" lang="scss" scoped></style>