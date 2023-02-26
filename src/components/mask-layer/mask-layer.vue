<script setup lang="ts">
const emits = defineEmits<{
  (event: 'clickMask'): void,
}>()

const handleClickMask = (): void => {
  emits('clickMask')
}

const namespace = 'mask-layer'
</script>

<template>
  <div class="fixed fill high-layer" :class="namespace" @click.self="handleClickMask">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
$namespace: mask-layer;

.#{$namespace} {
  top: 0;
  left: 0;
  background-color: var(--color-mask-bgc);
}
</style>