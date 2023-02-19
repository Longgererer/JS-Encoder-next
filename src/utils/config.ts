/**
 * 该文件用于存放公共配置
 */
import { Prep } from '@type/prep'
import { IOption } from '@type/interface'

/* 选项列表 */
export const optionsListMap: Record<number, IOption> = {
  0: { text: 'Markdown工具栏', icon:'' },
  1: { text: '格式化代码' },
}

/* 存储各个预处理器所包含的选项id，分为直接展示出的选项和在菜单中展示的更多选项 */
export const editorSideOpts = {
  [Prep.HTML]: { displayOpts: [], moreOpts: [1] },
  [Prep.MARKDOWN]: { displayOpts: [0], moreOpts: [1] },
  [Prep.PUG]: { displayOpts: [], moreOpts: [1] },
  [Prep.CSS]: { displayOpts: [], moreOpts: [1] },
  [Prep.SASS]: { displayOpts: [], moreOpts: [1] },
  [Prep.SCSS]: { displayOpts: [], moreOpts: [1] },
  [Prep.LESS]: { displayOpts: [], moreOpts: [1] },
  [Prep.STYLUS]: { displayOpts: [], moreOpts: [1] },
  [Prep.JAVASCRIPT]: { displayOpts: [], moreOpts: [1] },
  [Prep.TYPESCRIPT]: { displayOpts: [], moreOpts: [1] },
  [Prep.COFFEESCRIPT]: { displayOpts: [], moreOpts: [1] },
  [Prep.JSX]: { displayOpts: [], moreOpts: [1] },
  [Prep.VUE2]: { displayOpts: [], moreOpts: [1] },
  [Prep.VUE3]: { displayOpts: [], moreOpts: [1] },
}

/* Github仓库的网址 */
export const GITHUB_REPO_URL = 'https://github.com/JS-Encoder/JS-Encoder'