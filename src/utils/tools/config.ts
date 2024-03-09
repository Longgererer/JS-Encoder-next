/**
 * 公共配置存储
 */
import { Prep } from "@type/prep"
import { IIconOption } from "@type/interface"

/** 选项列表 */
export const optionsListMap: Record<number, IIconOption> = {
  0: { text: "Markdown工具栏", icon:"" },
  1: { text: "格式化代码" },
}

/** 存储各个预处理器所包含的选项id，分为直接展示出的选项和在菜单中展示的更多选项 */
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
  [Prep.VUE]: { displayOpts: [], moreOpts: [1] },
}

/** Github仓库的网址 */
export const GITHUB_REPO_URL = "https://github.com/JS-Encoder/JS-Encoder"
/** 帮助文档的网址 */
export const HELP_DOCS_URL = "http://docs.lliiooiill.cn/"
/** 获取cdn列表的json请求地址 */
export const BOOT_CDN_URL = "https://api.bootcdn.cn/libraries?output=human"
/** katex公式渲染样式 */
export const KATEX_STYLE_URL = "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.8/katex.min.css"
/** sass编译sass.js */
export const SASS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/sass.js/0.11.1/sass.min.js"
/** sass编译sass.worker.js */
export const SASS_WORKER_JS_URL = "https://cdn.bootcdn.net/ajax/libs/sass.js/0.11.1/sass.worker.min.js"
/** less编译less.js */
export const LESS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/less.js/4.2.0/less.min.js"
/** stylus编译stylus.js */
export const STYLUS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/stylus/0.32.1/stylus.min.js"
/** typescript编译typescript.js */
export const TYPESCRIPT_URL = "https://cdn.bootcdn.net/ajax/libs/typescript/5.2.2/typescript.min.js"
/** coffeescript编译coffeescript.js */
export const COFFEESCRIPT_URL = "https://cdn.bootcdn.net/ajax/libs/coffee-script/2.7.0/coffeescript.min.js"
/** babel编译jsx */
export const BABEL_URL = "https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.min.js"