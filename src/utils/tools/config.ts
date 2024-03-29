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

/**
 * 库
 */
/** 获取cdn列表的json请求地址 */
export const BOOT_CDN_URL = "https://api.bootcdn.cn/libraries?output=human"

/**
 * 编译
 */
/** sass编译sass.js */
export const SASS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/sass.js/0.11.1/sass.min.js"
/** sass编译sass.worker.js */
export const SASS_WORKER_JS_URL = "https://cdn.bootcdn.net/ajax/libs/sass.js/0.11.1/sass.worker.min.js"
/** less编译 */
export const LESS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/less.js/4.2.0/less.min.js"
/** stylus编译 */
export const STYLUS_JS_URL = "https://cdn.bootcdn.net/ajax/libs/stylus/0.32.1/stylus.min.js"
/** typescript编译 */
export const TYPESCRIPT_URL = "https://cdn.bootcdn.net/ajax/libs/typescript/5.2.2/typescript.min.js"
/** coffeescript编译 */
export const COFFEESCRIPT_URL = "https://cdn.bootcdn.net/ajax/libs/coffee-script/2.7.0/coffeescript.min.js"
/** babel编译jsx */
export const BABEL_URL = "https://cdn.bootcdn.net/ajax/libs/babel-standalone/7.22.17/babel.min.js"

/**
 * markdown
 */
/** markdown github风格主题 */
export const MD_STYLE_URL = "https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css"
/** katex公式渲染样式 */
export const KATEX_STYLE_URL = "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.8/katex.min.css"
/** katex公式渲染脚本 */
export const KATEX_RENDER_URL = "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.8/contrib/auto-render.min.js"
/** 流程图渲染 */
export const FLOW_CHART_URLS = [
  "https://cdn.bootcdn.net/ajax/libs/raphael/2.3.0/raphael.min.js",
  "https://cdn.bootcdn.net/ajax/libs/flowchart/1.17.1/flowchart.min.js",
]


/**
 * 更新日志
 */
/** github releases */
export const GITHUB_RELEASES_URL = "https://api.github.com/repos/Longgererer/JS-Encoder-next/releases"
/** github latest release */
export const GITHUB_LATEST_RELEASE_URL = "https://api.github.com/repos/Longgererer/JS-Encoder-next/releases/latest"
