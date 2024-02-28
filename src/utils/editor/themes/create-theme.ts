import { EditorView } from "@codemirror/view"
import { HighlightStyle, TagStyle, syntaxHighlighting } from "@codemirror/language"
import { Extension } from "@codemirror/state"

interface Settings {
  background: string
  foreground: string
  caret: string
  selection: string
  focusedSelection: string
  selectionMatch: string
  lineHighlight: string
  gutterBackground: string
  gutterForeground: string
}

interface IThemeInfo {
  variant: string
  settings: Settings
  styles: TagStyle[]
}

const createTheme = ({ variant, settings, styles }: IThemeInfo): Extension => {
  const theme = EditorView.theme({
    "&": {
      backgroundColor: settings.background,
      color: settings.foreground,
    },
    ".cm-content": {
      caretColor: settings.caret,
    },
    ".cm-cursor, .cm-dropCursor": {
      borderLeftColor: settings.caret,
    },
    "&.cm-focused .cm-scroller .cm-selectionLayer .cm-selectionBackground": {
      backgroundColor: settings.focusedSelection,
    },
    "& .cm-scroller .cm-selectionLayer .cm-selectionBackground": {
      backgroundColor: settings.selection,
    },
    ".cm-selectionMatch": {
      backgroundColor: settings.selectionMatch,
    },
    ".cm-activeLine": {
      backgroundColor: settings.lineHighlight,
    },
    ".cm-gutters": {
      backgroundColor: settings.gutterBackground,
      color: settings.gutterForeground,
    },
    ".cm-activeLineGutter": {
      backgroundColor: settings.lineHighlight,
    },
  }, {
    dark: variant === "dark",
  })
  const highlightStyle = HighlightStyle.define(styles)
  const extension = [theme, syntaxHighlighting(highlightStyle)]
  return extension
}

export default createTheme