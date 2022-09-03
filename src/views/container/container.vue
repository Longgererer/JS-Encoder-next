<script setup lang="ts">
import navbar from '../components/navbar/navbar.vue'
import sidebar from '../components/sidebar/sidebar.vue'
import editorWrapper from '../components/editor-wrapper/editor-wrapper.vue'
</script>

<template>
  <navbar></navbar>
  <div class="main-content flex">
    <sidebar></sidebar>
    <editor-wrapper></editor-wrapper>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  height: calc(100% - 50px);
}
</style>