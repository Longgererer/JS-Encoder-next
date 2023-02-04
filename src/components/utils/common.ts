import { computed, ref } from 'vue'
import { Position } from '@type/interface'

/* 计算偏移样式 */
export function getOffsetStyle(offset: number | string, position: Position) {
  return computed<Record<string, string>>(() => {
    const posToStyleMap = {
      [Position.TOP]: { marginBottom: `${offset}px` },
      [Position.RIGHT]: { marginLeft: `${offset}px` },
      [Position.LEFT]: { marginRight: `${offset}px` },
      [Position.BOTTOM]: { marginTop: `${offset}px` },
    }
    return posToStyleMap[position]
  })
}