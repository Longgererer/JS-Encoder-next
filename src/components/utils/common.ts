import { computed } from 'vue'
import { Position } from '@type/interface'

/* 计算偏移样式 */
export function getOffsetStyle(offset: number | string, position: Position): Record<string, string> {
  const posToStyleMap = {
    [Position.TOP]: { marginBottom: `${offset}px` },
    [Position.RIGHT]: { marginLeft: `${offset}px` },
    [Position.LEFT]: { marginRight: `${offset}px` },
    [Position.BOTTOM]: { marginTop: `${offset}px` },
  }
  return posToStyleMap[position]
}

/* 计算位置样式 */
export function getPosStyle(
  left: number,
  top: number,
  bottom: number,
  right: number,
  width: number,
  height: number,
  position: Position,
): Record<string, string> {
  const posToStyleMap = {
    [Position.TOP]: {
      left: `${left + width / 2}px`,
      top: 'unset',
      bottom: `-${bottom - height}px`,
      right: 'unset',
      transform: 'translateX(-50%)',
    },
    [Position.RIGHT]: {
      left: `${left + width}px`,
      top: `${top + height / 2}px`,
      bottom: 'unset',
      right: 'unset',
    },
    [Position.LEFT]: {
      left: 'unset',
      top: `${top + height / 2}px`,
      bottom: 'unset',
      right: `-${left}px`,
    },
    [Position.BOTTOM]: {
      left: `${left + width / 2}px`,
      top: `${bottom}px`,
      bottom: 'unset',
      right: 'unset',
      transform: 'translateX(-50%)',
    },
  }
  return posToStyleMap[position]
}