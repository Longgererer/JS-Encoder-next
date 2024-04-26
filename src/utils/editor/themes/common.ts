import { CodeFontFamily } from "@type/settings"

const commonStyle = {
  ".cm-selectionMatch": {
    height: "100%",
    display: "inline-block",
  },
  ".cm-scroller::-webkit-scrollbar": {
    width: "12px",
    height: "12px",
    cursor: "default",
  },
  ".cm-scroller::-webkit-scrollbar-thumb": {
    backgroundColor: "var(--color-main-bg-1)",
  },
  ".cm-scroller::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "var(--color-main-bg-4)",
  },
  ".cm-scroller::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  ".cm-scroller::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
  ".cm-panels": {
    position: "static",
  },
  ".cm-tooltip": {
    fontSize: "14px",
    fontFamily: CodeFontFamily.JET_BRAINS_MONO,
    boxShadow: "0 2px 2px var(--color-shadow)",
    backgroundColor: "var(--color-main-bg-4)",
  },
  ".cm-diagnostic": {
    borderLeftWidth: "2px",
  },
}

export default commonStyle