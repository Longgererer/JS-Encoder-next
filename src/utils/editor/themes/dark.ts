import { tags } from "@lezer/highlight"
import createTheme from "./create-theme"

const theme = createTheme({
  variant: "dark",
  settings: {
    background: "#121214",
    foreground: "#c8d3f5",
    caret: "#c8d3f5",
    selection: "#28282F",
    focusedSelection: "#28283F",
    selectionMatch: "#99ff7740",
    lineHighlight: "#33333944",
    gutterBackground: "#121214",
    gutterForeground: "#555555",
  },
  styles: [
    {
      tag: tags.comment,
      color: "#7a88cf",
    },
    {
      tag: tags.variableName,
      color: "#4fd6be",
    },
    {
      tag: [tags.string, tags.special(tags.brace)],
      color: "#c3e88d",
    },
    // 数字字面量
    {
      tag: tags.number,
      color: "#ff98a4",
    },
    // 布尔值字面量
    {
      tag: tags.bool,
      color: "#ff98a4",
    },
    // null字面量
    {
      tag: tags.null,
      color: "#7f85a3",
    },
    {
      tag: tags.punctuation,
      color: "#78dbff",
    },
    // 逻辑运算符
    {
      tag: tags.logicOperator,
      color: "#78dbff",
    },
    // 算术相关运算符
    {
      tag: tags.arithmeticOperator,
      color: "#78dbff",
    },
    // 单位
    {
      tag: tags.unit,
      color: "#fc7b7b",
    },
    // 充当运算符的关键字
    {
      tag: tags.operatorKeyword,
      color: "#78dbff",
    },
    // 关键字
    {
      tag: tags.keyword,
      color: "#c099ff",
    },
    // 运算符
    {
      tag: tags.operator,
      color: "#86e1fc",
    },
    // 类名
    {
      tag: tags.className,
      color: "#ffc777",
    },
    // 类型名称定义
    {
      tag: tags.definition(tags.typeName),
      color: "#ffc777",
    },
    // 类型名称
    {
      tag: tags.typeName,
      color: "#ff966c",
    },
    // `<` and `>`
    {
      tag: tags.angleBracket,
      color: "#86e1fc",
    },
    // 标签名
    {
      tag: tags.tagName,
      color: "#ff6959",
    },
    // html标签属性名
    {
      tag: tags.attributeName,
      color: "#c099ff",
    },
    // javascript属性名
    {
      tag: tags.propertyName,
      color: "#c3e88d",
    },
    // 函数内的变量名
    {
      tag: tags.function(tags.variableName),
      color: "#c3e88d",
    },
    // html标签属性值
    {
      tag: tags.attributeValue,
      color: "#c3e88d",
    },
    /** 标题 */
    {
      tag: tags.heading,
      fontWeight: "bold",
      color: "#ffc777",
    },
    {
      tag: tags.meta,
      color: "#78dbff",
    },
    /** 链接 */
    {
      tag: tags.link,
      color: "#7cafff",
    },
    /** 斜体 */
    {
      tag: tags.emphasis,
      fontStyle: "italic",
      color: "#ff757f",
    },
    /** 粗体 */
    {
      tag: tags.strong,
      fontWeight: "bold",
      color: "#ff757f",
    },
    /** 删除 */
    {
      tag: tags.strikethrough,
      textDecoration: "line-through",
      color: "#F00",
    },
    {
      tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
      color: "#FF966C",
    },
    {
      tag: tags.url,
      color: "#FF966C",
      textDecoration: "underline",
    },
    {
      tag: [tags.literal, tags.inserted],
      color: "#78dbff",
    },
    {
      tag: tags.deleted,
      color: "#F00",
    },
    {
      tag: [tags.regexp, tags.escape, tags.special(tags.string)],
      color: "#F00",
    },
    {
      tag: tags.definition(tags.variableName),
      color: "#F00",
    },
    {
      tag: tags.local(tags.variableName),
      color: "#F00",
    },
    {
      tag: [tags.namespace],
      color: "#F00",
    },
    {
      tag: [tags.special(tags.variableName), tags.macroName],
      color: "#F00",
    },
    {
      tag: tags.definition(tags.propertyName),
      color: "#F00",
    },
    {
      tag: tags.invalid,
      color: "#F00",
    },
  ],
})

export default theme