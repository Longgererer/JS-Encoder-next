import { Origin, Prep } from '@type/prep'
import { IOption } from '@type/interface'

export interface IMoreOpts extends IOption {
  opts: IOption[]
}

export interface IEditorTab {
  /* 当前tab对应编辑器使用的预处理语言 */
  prep: Prep
  /* 预处理语言对应的原生语言 */
  origin: Origin
  icon: string
  /* 是否被选中 */
  isActive: boolean
  /* 是否正在被拖动 */
  isDragging: boolean
}

export interface IEditorBar {
  tabs: IEditorTab[]
  /* 平铺显示的菜单列表 */
  opts: IOption[]
  /* 更多选项列表 */
  moreOpts: IMoreOpts
}