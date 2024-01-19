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
    gutterForeground: "#444a73",
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
    {
      tag: tags.number,
      color: "#ff98a4",
    },
    {
      tag: tags.bool,
      color: "#ff98a4",
    },
    {
      tag: tags.null,
      color: "#7f85a3",
    },
    {
      tag: tags.keyword,
      color: "#c099ff",
    },
    {
      tag: tags.operator,
      color: "#86e1fc",
    },
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
  ],
})

export default theme