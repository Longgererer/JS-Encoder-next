export interface IShortcutMap {
  /** 集合类型 */
  type: string
  keymap: Array<{
    /** 功能名称 */
    name: string
    /** 键位列表 */
    keys: string[]
  }>
}

export const ShortcutMapList: IShortcutMap[] = [
  {
    type: "编码",
    keymap: [
      { name: "缩进代码", keys: ["Tab"] },
      { name: "格式化代码", keys: ["Shift", "Alt", "F"] },
      { name: "智能提示", keys: ["Ctrl / Cmd", "Alt"] },
      { name: "收起代码", keys: ["Ctrl / Cmd", "Q"] },
      { name: "注释", keys: ["Ctrl / Cmd", "/"] },
      { name: "行复制", keys: ["Ctrl / Cmd", "Shift", "D"] },
      { name: "选择当前行", keys: ["Ctrl / Cmd", "D"] },
      { name: "向上互换行", keys: ["Shift", "Ctrl / Cmd", "Up"] },
      { name: "向下互换行", keys: ["Shift", "Ctrl / Cmd", "Down"] },
      { name: "左缩进代码", keys: ["Ctrl / Cmd", "["] },
      { name: "右缩进代码", keys: ["Ctrl / Cmd", "]"] },
      { name: "代码查询", keys: ["Ctrl / Cmd", "F"] },
      { name: "代码替换", keys: ["Ctrl / Cmd", "Shift", "F"] },
      { name: "跳至某行", keys: ["Alt", "G"] },
    ],
  },
  {
    type: "MarkDown",
    keymap: [
      { name: "加粗", keys: ["Ctrl / Cmd", "B"] },
      { name: "倾斜", keys: ["Ctrl / Cmd", "I"] },
      { name: "中划线", keys: ["Ctrl / Cmd", "D"] },
      { name: "链接", keys: ["Ctrl / Cmd", "L"] },
      { name: "图片", keys: ["Ctrl / Cmd", "P"] },
      { name: "引用", keys: ["Ctrl / Cmd", "Shift", "Q"] },
      { name: "代码块", keys: ["Ctrl / Cmd", "K"] },
      { name: "无序列表", keys: ["Ctrl / Cmd", "U"] },
      { name: "有序列表", keys: ["Ctrl / Cmd", "O"] },
      { name: "横线", keys: ["Ctrl / Cmd", "H"] },
      { name: "列表延伸", keys: ["Ctrl / Cmd", "Enter"] },
    ],
  },
  {
    type: "其它",
    keymap: [],
  },
]