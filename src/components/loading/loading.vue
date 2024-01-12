<script lang="ts" setup>
import { onUnmounted, ref } from "vue"

const NAME_SPACE = "loading"

const frames = [
  "[        ]",
  "[=       ]",
  "[==      ]",
  "[===     ]",
  "[====    ]",
  "[=====   ]",
  "[ =====  ]",
  "[  ===== ]",
  "[   =====]",
  "[    ====]",
  "[     ===]",
  "[      ==]",
  "[       =]",
  "[        ]",
]
/** 动画周期总时间 */
const CYCLE_TIME = 1000
const START_INDEX = 0
const timeGap = Math.floor(CYCLE_TIME / frames.length)
const currFrameIdx = ref<number>(START_INDEX)

const timer: NodeJS.Timer = setInterval(() => {
  currFrameIdx.value = currFrameIdx.value < frames.length - 1 ? ++ currFrameIdx.value : START_INDEX
}, timeGap)

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="font-m flex-col no-active-text fw-bold code-font" :class="NAME_SPACE">
    <span class="font-no-ligatures text-pre-wrap">{{frames[currFrameIdx]}} Loading</span>
  </div>
</template>

<style lang="scss" scoped>
$namespace: loading;

.#{$namespace} {
  animation: Shinning 2s ease infinite;
}

@keyframes Shinning {
  50% {
    color: var(--color-describe);
  }
}
</style>