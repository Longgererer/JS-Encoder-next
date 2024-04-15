<template>
  <div class="inline-flex flex-wrap console-common cursor-default">
    <div v-if="basicTypes.includes(type)" :class="`console-${type}`">
      <span>{{ value }}</span>
    </div>
    <div v-else-if="type === 'Array'">
      <!-- ▶ (6) [{...}, 1, "123", true, ƒ, Array(0)] -->
      <span v-if="simple">Array({{ size }})</span>
      <console-fold v-else v-model="isFold">
        <template #default>
          <span v-if="size">({{ size }}) </span>
          <span>[</span>
          <template v-for="(item, index) in value" :key="index">
            <template v-if="index < minLength">
              <span v-if="index">,&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item)" simple></console-value>
            </template>
          </template>
          <span v-if="minLength < size!"> ...</span>
          <span>]</span>
        </template>
        <template #content>
          <template v-for="(item, index) in value" :key="index">
            <div v-if="index < maxLength">
              <span class="console-attribute-name">{{ index }}</span>
              <span>:&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item)"></console-value>
            </div>
          </template>
          <div v-if="maxLength < size!">{{ size! - maxLength }} more...</div>
        </template>
      </console-fold>
    </div>
    <div v-else-if="type === 'Object'">
      <span v-if="simple">{{ name === 'Object' ? "{...}" : name }}</span>
      <console-fold v-else v-model="isFold">
        <template #default>
          <span v-if="name">{{ name === 'Object' ? "" : name }} </span>
          <span>{&nbsp;</span>
          <template v-for="(item, index) in attrs" :key="index">
            <template v-if="index < minLength">
              <span v-if="index">,&nbsp;</span>
              <span class="console-attribute-name">{{ item.key }}</span>
              <span>:&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item.value)" simple></console-value>
            </template>
          </template>
          <span v-if="minLength < attrs!.length">&nbsp;...</span>
          <span>&nbsp;}</span>
        </template>
        <template #content>
          <template v-for="(item, index) in attrs" :key="item.key">
            <div v-if="index < maxLength">
              <span class="console-attribute-name">{{ item.key }}</span>
              <span>:&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item.value)"></console-value>
            </div>
          </template>
          <div v-if="maxLength < size!">{{ size! - maxLength }} more...</div>
        </template>
      </console-fold>
    </div>
    <div v-else-if="type === 'function'" class="fs-italic">
      <!-- ƒ a(){} -->
      <span class="console-function-prefix">ƒ&nbsp;</span>
      <span class="console-function-code">{{ value }}</span>
    </div>
    <div v-else-if="type === 'Map' || type === 'WeakMap'">
      <template v-if="simple">
        <span>{{ toStringTag }}</span>
        <span v-if="size">({{ size }})</span>
      </template>
      <console-fold v-else v-model="isFold">
        <template #default>
          <span>{{ toStringTag }}</span>
          <span v-if="size">({{ size }})</span>
          <span>{&nbsp;</span>
          <template v-for="(item, index) in attrs" :key="item.key">
            <template v-if="index < minLength">
              <span v-if="index">,&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item.key)" simple></console-value>
              <span>&nbsp;=>&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item.value)" simple></console-value>
            </template>
          </template>
          <span v-if="minLength < (attrs?.length || 0)">&nbsp;...</span>
          <span>&nbsp;}</span>
        </template>
        <template #content>
          <template v-for="(item, index) in attrs" :key="item.key">
            <div v-if="index < maxLength">
              <span class="console-attribute-name">{{ index }}</span>
              <span>:&nbsp;</span>
              <span>{</span>
              <console-value v-bind="formatConsoleValue(item.key)"></console-value>
              <span>&nbsp;=>&nbsp;</span>
              <console-value v-bind="formatConsoleValue(item.value)"></console-value>
              <span>}</span>
            </div>
          </template>
          <div v-if="maxLength < size!">{{ size! - maxLength }} more...</div>
        </template>
      </console-fold>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProps, basicTypes } from "./console-value"
import ConsoleFold from "../console-fold/console-fold.vue"
import { ref, shallowRef, watch } from "vue"
import { processConsoleValueList, formatConsoleValue } from "@utils/tools/console-value"
import { IConsoleValue } from "@type/console"

const props = withDefaults(defineProps<IProps>(), {
  minLength: Infinity,
  maxLength: Infinity,
  simple: false,
})
const isFold = ref<boolean>(false)
</script>

<style src="./console-value.scss" lang="scss" scoped></style>