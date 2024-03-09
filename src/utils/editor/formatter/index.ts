import { Prep } from "@type/prep"
import prettier, { BuiltInParserName, RequiredOptions } from "prettier"

const prep2ParserNameMap: Partial<Record<Prep, BuiltInParserName>> = {
  [Prep.HTML]: "html",
  [Prep.MARKDOWN]: "markdown",
  [Prep.CSS]: "css",
  [Prep.SASS]: "scss",
  [Prep.SCSS]: "scss",
  [Prep.LESS]: "less",
  [Prep.JAVASCRIPT]: "babel",
  [Prep.TYPESCRIPT]: "typescript",
  [Prep.JSX]: "babel",
  [Prep.VUE]: "vue",
}

/** 初始格式化风格配置 */
export const initialFormatStyleOptions: Partial<RequiredOptions> = {
  /** 分号 */
  semi: true,
  /** 单引号 */
  singleQuote: false,
  /** jsx中使用单引号 */
  jsxSingleQuote: false,
  /** 尾随逗号 */
  trailingComma: "all",
  /** 对象大括号内部空格 */
  bracketSpacing: true,
  /** 将多行 HTML（HTML、JSX、Vue）元素的“>”放在最后一行的末尾，而不是单独放在下一行（不适用于自闭合元素）。 */
  bracketSameLine: false,
  /** 强制一行只能放一个属性(HTML、JSX、Vue) */
  singleAttributePerLine: false,
}

export const format = async (code: string, prep: Prep, options: Partial<RequiredOptions>) => {
  return prettier.format(code, {
    parser: prep2ParserNameMap[prep],
    ...initialFormatStyleOptions,
    ...options,
  })
}