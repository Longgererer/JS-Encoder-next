import { createTheme } from "thememirror"
import { tags } from "@lezer/highlight"

const theme = createTheme({
  variant: "dark",
  settings: {
    background: "#121212",
    foreground: "#c8d3f5",
    caret: "#c8d3f5",
    selection: "#333333",
    lineHighlight: "#1f1f1f",
    gutterBackground: "#121212",
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
      tag: tags.atom,
      color: "#000",
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
    {
      tag: tags.definition(tags.typeName),
      color: "#ffc777",
    },
    {
      tag: tags.typeName,
      color: "#ff966c",
    },
    {
      tag: tags.angleBracket,
      color: "#86e1fc",
    },
    {
      tag: tags.tagName,
      color: "#ff6959",
    },
    {
      tag: tags.attributeName,
      color: "#c099ff",
    },
    {
      tag: tags.propertyName,
      color: "#c3e88d",
    },
    {
      tag: tags.function(tags.variableName),
      color: "#c3e88d",
    },
    // html标签属性值
    {
      tag: tags.attributeValue,
      color: "#c3e88d",
    },
  ],
})

export default theme