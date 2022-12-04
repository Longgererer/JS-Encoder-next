import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { AreaPos } from '@type/editor'

/**
 * 由于拖拽元素进入或离开子元素的时候会触发父元素的dragenter和dragleave事件
 * 并且无法通过阻止冒泡来阻止事件触发，因此只能通过一个规律：
 * 只有在dragging为0时，即一个dragenter事件刚好对应一个dragleave的时候才会执行dragleave事件的内容
 * 加上setTimeout是为了兼容火狐会同时执行dragenter事件和dragleave事件的问题
 */
const useDragleaveJudge = (eleRef: Ref<HTMLElement | null>, callback: () => void) => {
  let dragging = 0
  onMounted(() => {
    const ele = eleRef.value
    ele?.addEventListener('dragenter', () => {
      console.log('dragenter')
      dragging++
    })
    ele?.addEventListener('dragleave', () => {
      console.log('dragleave')
      dragging--
      console.log(dragging)
      setTimeout(() => {
        if (dragging === 0) {
          callback()
        }
      }, 1)
    })
  })

  return () => {
    dragging = 0
  }
}

export default useDragleaveJudge