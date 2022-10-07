<script setup lang="ts">
const namespace = 'dropdown-item'
</script>

<template>
  <div class="font-xs fill-w p-x-m fade-ease flex-aic cursor-pointer" :class="namespace">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-item {
  height: 36px;
  color: var(--color-no-active-color);
  &:hover {
    color: var(--color-active-color);
    background-color: var(--color-main-bg-3);
  }
}
</style>