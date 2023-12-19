import { indentWithTab } from "@codemirror/commands"
import { indentUnit } from "@codemirror/language"
import { Compartment, EditorState, Extension, StateEffect } from "@codemirror/state"
import { EditorView, EditorViewConfig, keymap } from "@codemirror/view"
import { AnyObject } from "@type/interface"

/* 构建并配置codemirror编辑器 */
const useCodemirrorEditor = (config: EditorViewConfig) => {
  const view: EditorView = new EditorView({ ...config })

  /** 获取编辑器内容 */
  const getContent = (): string => {
    return view.state.doc.toString()
  }

  /** 设置编辑器内容 */
  const setContent = (newContent: string): void => {
    view.dispatch({
      changes: {
        from: 0,
        to: view.state.doc.length,
        insert: newContent,
      },
    })
  }

  /** 获得光标位置信息 */
  const getCursorPos = (): { line: number, col: number } => {
    const head = view.state.selection.main.head
    const cursor = view.state.doc.lineAt(head)
    return {
      line: cursor.number,
      col: head - cursor.from,
    }
  }

  /**
   * 扩展相关
   */

  /** 获取扩展更新方法 */
  const getExtensionUpdater = () => {
    const compartment = new Compartment()
    // 返回个函数保留compartment引用
    return (extension: Extension) => {
      return compartment.get(view.state)
        // 重新配置插件
        ? view.dispatch({ effects: compartment.reconfigure(extension) })
        // 注入新插件
        : view.dispatch({ effects: StateEffect.appendConfig.of(compartment.of(extension)) })
    }
  }

  /** 开启或关闭扩展 */
  const getExtensionToggler = (extension: Extension) => {
    const updater = getExtensionUpdater()
    return (newStatus?: boolean) => {
      updater(newStatus ? extension : [])
    }
  }

  const tabSizeUpdater = getExtensionUpdater()
  /** 设置tab size */
  const setTabSize = (tabSize: number): void => {
    tabSizeUpdater([
      EditorState.tabSize.of(tabSize),
      indentUnit.of(" ".repeat(tabSize)),
    ])
  }

  /** 更新扩展列表 */
  const extensionUpdater = getExtensionUpdater()

  const styleUpdater = getExtensionUpdater()
  /** 设置内部样式 */
  const setStyle = (style: Record<string, AnyObject>): void => {
    styleUpdater([
      EditorView.theme(style)
    ])
  }

  /** 是否用tab缩进开关 */
  const tabIndentToggler = getExtensionToggler(keymap.of([indentWithTab]))

  return {
    view,
    getContent,
    setContent,
    setTabSize,
    tabIndentToggler,
    extensionUpdater,
    getCursorPos,
    setStyle,
  }
}

export default useCodemirrorEditor