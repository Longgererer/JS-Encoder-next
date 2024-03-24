import { defineStore } from "pinia"
import { IEditorSettings, ShortcutMode, CodeFontFamily, IEditorLibraries, IEditorPrepMap, IEditorConfig } from "@type/settings"
import { DeepPartial } from "@type/types"
import { OriginLang, Prep } from "@type/prep"

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
    settings: { ...initialSettings },
    libraries: { ...initialLibraries },
    prepMap: { ...initialPrepMap },
    isComponentMode: false,
  }),
  actions: {
    /** 更新若干设置 */
    updateSettings(settings: DeepPartial<IEditorSettings>): void {
      this.$patch({ settings: { ...settings } })
    },
    updateLibraries(libraries: Partial<IEditorLibraries>): void {
      this.$patch({ libraries: { ...libraries } })
    },
    updatePrepMap(prepMap: Partial<IEditorPrepMap>): void {
      this.$patch({ prepMap: { ...prepMap } })
    },
    updateIsComponentMode(newState: boolean): void {
      this.isComponentMode = newState
    },
  },
})