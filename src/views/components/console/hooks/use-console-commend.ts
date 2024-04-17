import { insertNewlineAndIndent } from "@codemirror/commands"
import { Prec } from "@codemirror/state"
import { keymap } from "@codemirror/view"
import { useCommonStore } from "@store/common"
import { AnyFunction } from "@type/interface"
import { Prep } from "@type/prep"
import { getEditorThemeExtension, getPrepBaseExtension } from "@utils/editor/config/editor.config"
import { ICodemirrorEditorSettings } from "@views/components/editor/editor"
import { computed, ref } from "vue"

const useConsoleCommend = (options: {
  executeCommend: AnyFunction
}) => {
  const { executeCommend } = options
  /** console命令 */
  const commend = ref<string>("")

  /** 指令编辑器用codemirror，需要指定扩展 */
  const commendEditorExtensions = computed(() => {
    const { theme } = useCommonStore()
    return [
      getPrepBaseExtension(Prep.JAVASCRIPT),
      getEditorThemeExtension(theme),
      // shift + enter换行, enter执行
      Prec.highest(keymap.of([
        { key: "Shift-Enter", run: insertNewlineAndIndent },
        { key: "Enter", run: () => {
          executeCommend()
          return true
        } },
      ])),
    ]
  })

  const commendEditorSettings: ICodemirrorEditorSettings = {
    lineNumbers: false,
    lineWrapping: true,
    style: {
      ".cm-scroller": {
        fontSize: "12px",
        fontFamily: "JetBrains Mono",
      },
      ".cm-scroller .cm-line": {
        paddingLeft: "4px",
      },
      ".cm-scroller .cm-content": {
        padding: 0,
      },
      "&.cm-focused": {
        outline: "none",
      },
    },
  }

  return {
    commend,
    commendEditorExtensions,
    commendEditorSettings,
  }
}

export default useConsoleCommend