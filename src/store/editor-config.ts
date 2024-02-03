import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode, CodeFontFamily } from "@type/settings"

export const useEditorConfigStore = defineStore("editorSetting", {
  state: (): IEditorSettings => {
    return {
      edit: {
        codeHinting: true,
        codeLint: true,
        lineWrapping: true,
        useEmmet: true,
      },
      indent: {
        indentWithTab: true,
        tabSize: 2,
      },
      execute: {
        autoExecute: true,
        delayTimeOfExecute: 500,
      },
      font: {
        fontSize: 14,
        fontFamily: CodeFontFamily.JET_BRAINS_MONO,
      },
      other: {
        headTags: "",
        shortcutTemplate: ShortcutMode.VSCODE,
      },
    }
  },

})