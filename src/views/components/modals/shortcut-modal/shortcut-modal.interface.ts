export interface IShortcutMap {
  /** 集合名称 */
  name: string
  keymap: Array<{
    /** 功能描述 */
    describe: string
    /** 键位列表 */
    list: string[]
  }>
}

export const ShortcutMapList: IShortcutMap[] = [
  {
    name: "编码",
    keymap: [
      { describe: "缩进代码", list: ["Tab"] },
      { describe: "格式化代码", list: ["Shift", "Alt", "F"] },
      { describe: "智能提示", list: ["Ctrl / Cmd", "Alt"] },
      { describe: "收起代码", list: ["Ctrl / Cmd", "Q"] },
      { describe: "注释", list: ["Ctrl / Cmd", "/"] },
      { describe: "行复制", list: ["Ctrl / Cmd", "Shift", "D"] },
      { describe: "选择当前行", list: ["Ctrl / Cmd", "D"] },
      { describe: "向上互换行", list: ["Shift", "Ctrl / Cmd", "Up"] },
      { describe: "向下互换行", list: ["Shift", "Ctrl / Cmd", "Down"] },
      { describe: "左缩进代码", list: ["Ctrl / Cmd", "["] },
      { describe: "右缩进代码", list: ["Ctrl / Cmd", "]"] },
      { describe: "代码查询", list: ["Ctrl / Cmd", "F"] },
      { describe: "代码替换", list: ["Ctrl / Cmd", "Shift", "F"] },
      { describe: "跳至某行", list: ["Alt", "G"] },
    ],
  },
  {
    name: "MarkDown",
    keymap: [
      { describe: "加粗", list: ["Ctrl / Cmd", "B"] },
      { describe: "倾斜", list: ["Ctrl / Cmd", "I"] },
      { describe: "中划线", list: ["Ctrl / Cmd", "D"] },
      { describe: "链接", list: ["Ctrl / Cmd", "L"] },
      { describe: "图片", list: ["Ctrl / Cmd", "P"] },
      { describe: "引用", list: ["Ctrl / Cmd", "Shift", "Q"] },
      { describe: "代码块", list: ["Ctrl / Cmd", "K"] },
      { describe: "无序列表", list: ["Ctrl / Cmd", "U"] },
      { describe: "有序列表", list: ["Ctrl / Cmd", "O"] },
      { describe: "横线", list: ["Ctrl / Cmd", "H"] },
      { describe: "列表延伸", list: ["Ctrl / Cmd", "Enter"] },
    ],
  },
  {
    name: "其它",
    keymap: [],
  },
]