<script setup lang="ts">
/**
 * overlap-monitor组件用于监听拖拽的tab与其是否重叠，若重叠则判断是否分割视口，具体逻辑如下：
 * 首先，如果tab的50%以上与overlap-monitor重叠，那么将会进行窗口分割，tab拖动到overlap-monitor中的不同位置将会产生不同的分割结果。
 * 分割结果分别是：左分割、右分割、上分割、下分割和中分割（相当于占满，等于没有分割），这些结果的判定位置如下：
 * ┌——————————————————————————————————————————————————————————————————┐
 * │  上  │  上  │  上  │  上  │  上  │  上  │  上  │  上  │  上  │  上  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  上  │  上  │  上  │  上  │  上  │  上  │  上  │  上  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  左  │  中  │  中  │  中  │  中  │  中  │  中  │  右  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  左  │  下  │  下  │  下  │  下  │  下  │  下  │  下  │  下  │  右  │
 * │——————————————————————————————————————————————————————————————————│
 * │  下  │  下  │  下  │  下  │  下  │  下  │  下  │  下  │  下  │  下  │
 * └——————————————————————————————————————————————————————————————————┙
 * 相当于对整个窗口做了一百等分，如果tab的50%以上进入某一个区域，那么就会按照该区域的分割结果进行窗口分割
 */
import { watch, ref, computed } from 'vue'
import { useEditorWrapperStore } from '@store/editorWrapper'
import { AreaPos } from '@type/editor'

const emits = defineEmits<{
  (e: 'selectPos', pos: AreaPos): void
}>()

const editorWrapperStore = useEditorWrapperStore()
const overlapMonitor = ref<HTMLElement | null>(null)
let monitorWidth = 0
let monitorHeight = 0

/* 监听tab拖拽状态变化 */
watch(() => editorWrapperStore.isTabDragging, (newState) => {
  if (newState) {
    /* 初始化overlap-monitor宽高 */
    const { clientWidth, clientHeight } = overlapMonitor.value!
    monitorWidth = clientWidth
    monitorHeight = clientHeight
  } else {
    currPos.value = AreaPos.NULL
  }
})

/**
 * 由于拖拽元素进入或离开子元素的时候会触发父元素的dragenter和dragleave事件
 * 并且无法通过阻止冒泡来阻止事件触发，因此只能通过一个规律：
 * 只有在dragging为0时，即一个dragenter事件刚好对应一个dragleave的时候才会执行dragleave事件的内容
 * 加上setTimeout是为了兼容火狐会同时执行dragenter事件和dragleave事件的问题
 */
let dragging = 0
const handleDragleave = (): void => {
  setTimeout(() => {
    dragging --
    if (dragging === 0) {
      currPos.value = AreaPos.NULL
    }
  }, 50)
}
const handleDragover= (e: DragEvent): void => {
  e.preventDefault()
}

const currPos = ref<AreaPos>(AreaPos.MIDDLE)
const handleEnterArea = (e: DragEvent): void => {
  dragging ++
  currPos.value = ((e.target as HTMLElement).dataset.pos as AreaPos)
}

const highlightAreaStyle = computed((): Record<string, any> => {
  /* 各种位置的高亮区域样式 */
  const posStyleMap = {
    [AreaPos.UP]: { left: 0, top: 0, width: `${monitorWidth}px`, height: `${monitorHeight / 2}px` },
    [AreaPos.DOWN]: {
      left: 0, top: `${monitorHeight / 2}px`, width: `${monitorWidth}px`, height: `${monitorHeight / 2}px`,
    },
    [AreaPos.LEFT]: { left: 0, top: 0, width: `${monitorWidth / 2}px`, height: `${monitorHeight}px` },
    [AreaPos.RIGHT]: {
      left: `${monitorWidth / 2}px`, top: 0, width: `${monitorWidth / 2}px`, height: `${monitorHeight}px`,
    },
    [AreaPos.MIDDLE]: { left: 0, top: 0, width: `${monitorWidth}px`, height: `${monitorHeight}px` },
    [AreaPos.NULL]: { left: 0, top: 0, width: 0, height: 0 },
  }
  return posStyleMap[currPos.value]
})
</script>

<template>
  <div
    class="overlap-monitor fill flex-1 relative"
    ref="overlapMonitor"
    @dragleave="handleDragleave"
  >
    <!-- 专门用于监听元素拖动具体位置的区域 -->
    <!-- 直接事件委托监听所有区域的进入和离开 -->
    <div class="position-capture fill relative" @dragenter="handleEnterArea" @dragleave.prevent="">
      <!-- 上 -->
      <div class="up1-area" :data-pos="AreaPos.UP"></div>
      <div class="up2-area" :data-pos="AreaPos.UP"></div>
      <!-- 左 -->
      <div class="left1-area" :data-pos="AreaPos.LEFT"></div>
      <div class="left2-area" :data-pos="AreaPos.LEFT"></div>
      <!-- 下 -->
      <div class="down1-area" :data-pos="AreaPos.DOWN"></div>
      <div class="down2-area" :data-pos="AreaPos.DOWN"></div>
      <!-- 右 -->
      <div class="right1-area" :data-pos="AreaPos.RIGHT"></div>
      <div class="right2-area" :data-pos="AreaPos.RIGHT"></div>
      <!-- 中 -->
      <div class="middle-area" :data-pos="AreaPos.MIDDLE"></div>
    </div>
    <!-- 高亮区域 -->
    <div class="highlight-area fade-ease absolute" :style="highlightAreaStyle"></div>
  </div>
</template>

<style lang="scss" scoped>
.position-capture {
  overflow: hidden;
  display: grid;
  grid-template-areas:
    "up1 up1 up1 up1 up1 up1 up1 up1 up1 up1"
    "lf1 up2 up2 up2 up2 up2 up2 up2 up2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 lf2 md md md md md md rt2 rt1"
    "lf1 dw2 dw2 dw2 dw2 dw2 dw2 dw2 dw2 rt1"
    "dw1 dw1 dw1 dw1 dw1 dw1 dw1 dw1 dw1 dw1";
  z-index: 10;
  .up1-area {
    grid-area: up1;
  }
  .up2-area {
    grid-area: up2;
  }
  .down1-area {
    grid-area: dw1;
  }
  .down2-area {
    grid-area: dw2;
  }
  .middle-area {
    grid-area: md;
  }
  .right1-area {
    grid-area: rt1;
  }
  .right2-area {
    grid-area: rt2;
  }
  .left1-area {
    grid-area: lf1;
  }
  .left2-area {
    grid-area: lf2;
  }
}

.highlight-area {
  background-color: var(--color-main-bg-1);
  z-index: 5;
  opacity: 0.7;
}
</style>