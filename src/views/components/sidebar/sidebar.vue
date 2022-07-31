<script setup lang="ts">
import tooltip from '@/components/tooltip/tooltip.vue'
defineOptions({
  name: 'sidebar',
})

</script>
<template>
  <div class="sidebar">
    <tooltip content="这是提示文字">
      <div class="cursor-pointer" style="height: 100px;width: 200px;background-color: red;">
      </div>
    </tooltip>
  </div>
</template>
<style lang="scss" scoped>
</style>