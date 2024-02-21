import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode, CodeFontFamily, IEditorLibraries } from "@type/settings"
import { DeepPartial } from "@type/types"

interface IEditorConfig {
  settings: IEditorSettings
  libraries: IEditorLibraries
}

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

export const initialLibraries: IEditorLibraries = {
  style: [],
  script: [],
}

export const useEditorConfigStore = defineStore("editorConfig", {
  state: (): IEditorConfig => ({
    settings: initialSettings,
    libraries: initialLibraries,
  }),
  actions: {
    /** 更新若干设置 */
    updateSettings(settings: DeepPartial<IEditorSettings>): void {
      this.$patch({ settings })
    },
    updateLibraries(libraries: DeepPartial<IEditorLibraries>): void {
      this.$patch({ libraries })
    },
  },
})