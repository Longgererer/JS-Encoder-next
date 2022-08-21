/** 原生和预处理语言列表 */
export enum Prep {
  HTML = 'HTML',
  MARKDOWN = 'Markdown',
  PUG = 'Pug',
  CSS = 'CSS',
  SASS = 'Sass',
  SCSS = 'Scss',
  LESS = 'Less',
  STYLUS = 'Stylus',
  JAVASCRIPT = 'JavaScript',
  TYPESCRIPT = 'TypeScript',
  COFFEESCRIPT = 'CoffeeScript',
  JSX = 'JSX',
  VUE2 = 'Vue2',
  VUE3 = 'Vue3',
}

/** 原生语言列表 */
export enum Origin {
  HTML = 'HTML',
  CSS = 'CSS',
  JAVASCRIPT = 'JAVASCRIPT',
}

/** 语言对应的文件后缀名 */
export enum MimeType {
  HTML = 'html',
  MARKDOWN = 'md',
  PUG = 'pug',
  CSS = 'css',
  SASS = 'sass',
  SCSS = 'scss',
  LESS = 'less',
  STYLUS = 'styl',
  JAVASCRIPT = 'js',
  TYPESCRIPT = 'ts',
  COFFEESCRIPT = 'coffee',
  JSX = 'jsx',
  VUE2 = 'vue',
  VUE3 = 'vue',
}

/** 语言对应的codemirror高亮配置 */
export enum ModeStyle {
  HTML = 'text/html',
  MARKDOWN = 'text/md-mix',
  PUG = 'text/x-pug',
  CSS = 'css',
  SASS = 'text/x-sass',
  SCSS = 'text/x-scss',
  LESS = 'text/x-less',
  STYLUS = 'text/x-styl',
  JavaScript = 'text/javascript',
  JAVASCRIPT = 'text/typescript',
  COFFEESCRIPT = 'text/coffeescript',
  JSX = 'text/jsx',
  VUE2 = 'text/x-vue',
  VUE3 = 'text/x-vue',
}