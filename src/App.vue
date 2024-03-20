<template>
  <div class="fill over-hidden">
    <container></container>
  </div>
</template>

<script setup lang="ts">
import { DBService } from "@utils/services/indexed-db-service"
import container from "./views/container/container.vue"
import { dbConfig } from "@utils/config/indexed-db"

const initApp = () => {
  // 连接数据库
  new DBService(dbConfig).init()
}

initApp()
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  background-color: var(--color-main-bg-3);
}
</style>
