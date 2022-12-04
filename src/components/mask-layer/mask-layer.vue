<script setup lang="ts">
const emits = defineEmits<{
  (event: 'clickMask'): void,
}>()

const handleClickMask = (): void => {
  emits('clickMask')
}
</script>

<template>
  <div class="mask-layer fixed fill high-layer" @click.self="handleClickMask">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.mask-layer {
  top: 0;
  left: 0;
  background-color: var(--color-mask-bgc);
}
</style>