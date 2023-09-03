import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode } from "@type/settings"

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
        indentSpace: 2,
      },
      execute: {
        autoExecute: true,
        delayTimeOfExecute: 200,
      },
      font: {
        fontSize: 14,
        fontFamily: "JetBrains Mono",
      },
      other: {
        headTags: "",
        shortcutTemplate: ShortcutMode.VSCODE,
      },
    }
  },
})