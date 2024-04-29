import { useEditorWrapperStore } from "@store/editor-wrapper"
import { useLayoutStore } from "@store/layout"
import { OriginLang } from "@type/prep"
import EditorKeeperService from "@utils/services/editor-keeper-service"
import { nextTick } from "vue"

let hasInit = false

// eslint-disable-next-line max-lines-per-function
const useEditorWrapperState = () => {
  const layoutStore = useLayoutStore()
  const editorWrapperStore = useEditorWrapperStore()
  const { createTab, updateCodeMap, createEditor, updateSplitter, updateEditor,
    createSplitter, updateRootSplitterId, updateIsComponentMode } = editorWrapperStore

  const initDefaultWrapper = async () => {
    if (hasInit) {
      editorWrapperStore.$reset()
      new EditorKeeperService().clearEditorInstanceMap()
      await nextTick(createDefaultWrapper)
    } else {
      createDefaultWrapper()
      hasInit = true
    }
  }

  const createDefaultWrapper = () => {
    createRootSplitter()
    // 创建根节点
    const rootSplitterId = editorWrapperStore.rootSplitterId!
    // 创建tab
    const tabHTML = createTab(OriginLang.HTML)
    const tabCSS = createTab(OriginLang.CSS)
    const tabJavaScript = createTab(OriginLang.JAVASCRIPT)
    // 初始化编辑器内容
    updateCodeMap(tabHTML.id, "")
    updateCodeMap(tabCSS.id, "")
    updateCodeMap(tabJavaScript.id, "")
    // 创建编辑器
    const editor = createEditor({
      displayTabId: tabHTML.id,
      parentId: rootSplitterId,
      tabIds: [tabHTML.id, tabCSS.id, tabJavaScript.id],
    })
    updateSplitter(rootSplitterId, { editorId: editor.id })
    const { editorWidth, editorHeight } = layoutStore.modulesSize
    updateEditor(editor.id, {
      size: { width: editorWidth, height: editorHeight },
    })
    updateIsComponentMode(false)
  }

  const initComponentWrapper = async () => {
    if (hasInit) {
      editorWrapperStore.$reset()
      new EditorKeeperService().clearEditorInstanceMap()
      await nextTick(() => createComponentWrapper())
    } else {
      createRootSplitter()
      createComponentWrapper()
      hasInit = true
    }
  }

  const createComponentWrapper = () => {
    const codeMap = { [OriginLang.JAVASCRIPT]: "" }
    createRootSplitter()
    const rootSplitterId = editorWrapperStore.rootSplitterId!
    let firstTabId: number
    Object.entries(codeMap).forEach(([origin, code]) => {
      const tab = createTab(origin as OriginLang)
      if (!firstTabId) {
        firstTabId = tab.id
      }
      updateCodeMap(tab.id, code)
    })
    // 创建编辑器
    const editor = createEditor({
      displayTabId: firstTabId!,
      parentId: rootSplitterId,
      tabIds: [firstTabId!],
    })
    updateSplitter(rootSplitterId, { editorId: editor.id })
    const { editorWidth, editorHeight } = layoutStore.modulesSize
    updateEditor(editor.id, {
      size: { width: editorWidth, height: editorHeight },
    })
    updateIsComponentMode(true)
  }

  const createRootSplitter = () => {
    // 先创建一个splitter根节点
    const rootSplitter = createSplitter({})
    updateRootSplitterId(rootSplitter.id)
  }

  return {
    initDefaultWrapper,
    initComponentWrapper,
  }
}

export default useEditorWrapperState