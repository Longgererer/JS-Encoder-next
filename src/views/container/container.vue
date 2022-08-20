<script setup lang="ts">
import navbar from '../components/navbar/navbar.vue'
import sidebar from '../components/sidebar/sidebar.vue'
</script>

<template>
  <navbar></navbar>
  <div class="main-content">
    <sidebar></sidebar>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 50px);
}
</style>