<template>
  <div
    class="console-item pl-l pr-xxl p-y-xs font-xxs flex"
    :class="[`console-${logInfo.type}`]">
    <!-- icon -->
    <i class="console-item-icon icon iconfont" :class="logType2Icon[logInfo.type]"></i>
    <!-- value -->
    <console-table
      v-if="logInfo.method === ConsoleMethods.TABLE"
      :log-info="logInfo"
    ></console-table>
    <div v-else>
      <template v-for="(item, index) in logInfo.data" :key="index">
        <span v-if="index">&nbsp;</span>
        <console-value v-bind="item"></console-value>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ConsoleMethods } from "@type/console"
import ConsoleTable from "../console-table/console-table.vue"
import { IProps, logType2Icon } from "./console-item"
import ConsoleValue from "../console-value/console-value.vue"

const props = defineProps<IProps>()

const init = () => {
  const { logInfo: { type, method, data = [] } } = props
}
init()
</script>

<style src="./console-item.scss" lang="scss" scoped></style>