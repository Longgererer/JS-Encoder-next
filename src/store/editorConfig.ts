import { defineStore } from 'pinia'
import { IEditorSettings, ShortcutMode } from '@type/settings'

type IEditorConfigStore = IEditorSettings

export const useEditorConfigStore = defineStore('editorSetting', {
  state: (): IEditorConfigStore => {
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
        fontFamily: 'JetBrains Mono',
      },
      other: {
        headTags: '',
        shortcutTemplate: ShortcutMode.VSCODE,
      },
    }
  },
})