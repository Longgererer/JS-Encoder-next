<template>
  <div class="inline-block">
    <span v-if="type === 'number'" class="number">{{ data }}</span>
    <span v-else-if="type === 'string'" class="string">{{ data }}</span>
    <span v-else-if="type === 'boolean'" class="boolean">{{ data }}</span>
    <span v-if="type === 'number'" class="number">{{ data }}</span>
  </div>
</template>

<script setup lang="ts">
import { IProps } from "./console-value"
import { getType } from "@utils/tools"

const props = defineProps<IProps>()

const type = getType(props.data)


</script>

<style lang="scss" scoped></style>