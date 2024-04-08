<template>
  <table class="fill-w" :class="namespace">
    <thead :class="`${namespace}-header`">
      <tr>
        <th v-for="title in logInfo.data.headers" :key="title">{{ title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in logInfo.data.body" :key="index">
        <td v-for="(value, index) in row" :key="index">{{ value }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { IProps } from "./console-table"

const props = defineProps<IProps>()

const namespace = "console-table"


</script>

<style lang="scss" scoped>
$namespace: "console-table";

.#{$namespace} {
  border-collapse: collapse;
  th, td {
    border: 1px solid #FFF;
  }
}
</style>