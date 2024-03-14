/**
 * editor-bar右侧工具栏相关逻辑
 */

import { EditorTabMap, IEditor } from "@type/editor"
import { Ref, computed, ref } from "vue"
import { editorSideOpts } from "@utils/tools/config"
import { useEditorWrapperStore } from "@store/editor-wrapper"

export const useSideMenu = (editor: IEditor, tabMap: Ref<EditorTabMap>) => {
  /** 是否显示更多选项下拉菜单 */
  const showSideMenu = ref<boolean>(false)
  const sideOpts = computed(() => {
    const { tabId2PrepMap } = useEditorWrapperStore()
    const tab = tabMap.value[editor.displayTabId]
    return editorSideOpts[tabId2PrepMap[tab.id]]
  })

  return { showSideMenu, sideOpts }
}