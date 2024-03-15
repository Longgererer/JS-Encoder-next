import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode, CodeFontFamily, IEditorLibraries, IEditorPrepMap } from "@type/settings"
import { DeepPartial } from "@type/types"
import { OriginLang, Prep } from "@type/prep"

interface IEditorConfig {
  settings: IEditorSettings
  libraries: IEditorLibraries
  prepMap: IEditorPrepMap
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

export const initialPrepMap: IEditorPrepMap = {
  [OriginLang.HTML]: Prep.HTML,
  [OriginLang.CSS]: Prep.CSS,
  [OriginLang.JAVASCRIPT]: Prep.JAVASCRIPT,
}

export const useEditorConfigStore = defineStore("editorConfig", {
  state: (): IEditorConfig => ({
    settings: initialSettings,
    libraries: initialLibraries,
    prepMap: initialPrepMap,
  }),
  actions: {
    /** 更新若干设置 */
    updateSettings(settings: DeepPartial<IEditorSettings>): void {
      this.$patch({ settings })
    },
    updateLibraries(libraries: Partial<IEditorLibraries>): void {
      this.$patch({ libraries })
    },
    updatePrepMap(prepMap: Partial<IEditorPrepMap>): void {
      this.$patch({ prepMap })
    },
  },
})