import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode, CodeFontFamily } from "@type/settings"
import { DeepPartial } from "@type/types"

export const initialSettings: IEditorSettings = {
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

export const useEditorConfigStore = defineStore("editorSetting", {
  state: (): IEditorSettings => initialSettings,
  actions: {
    /** 更新若干设置 */
    updateSettings(settings: DeepPartial<IEditorSettings>): void {
      this.$patch(settings)
    },
  },
})