/**
 * editor-bar右侧工具栏相关逻辑
 */

import { EditorTabMap, IEditor } from "@type/editor"
import { Ref, computed, ref } from "vue"
import { editorSideOpts } from "@utils/config"

export const useSidemenu = (editor: IEditor, tabMap: Ref<EditorTabMap>) => {
  /* 是否显示更多选项下拉菜单 */
  const showSideMenu = ref<boolean>(false)
  const sideOpts = computed(() => {
    const tab = tabMap.value[editor.displayTabId]
    return editorSideOpts[tab.prep]
  })

  return { showSideMenu, sideOpts }
}