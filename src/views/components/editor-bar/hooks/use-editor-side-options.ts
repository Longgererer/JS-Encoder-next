import { useEditorWrapperStore } from "@store/editor-wrapper"
import { Prep } from "@type/prep"
import { storeToRefs } from "pinia"
import { computed, ref } from "vue"

const useEditorSideOptions = (editorId: number) => {
  const editorWrapperStore = useEditorWrapperStore()
  const { editorMap, tabId2PrepMap } = storeToRefs(editorWrapperStore)

  /** 是否显示更多选项下拉菜单 */
  const showSideMenu = ref<boolean>(false)
  const sideOptions = computed(() => {
    const { displayTabId } = editorMap.value[editorId]
    const prep = tabId2PrepMap.value[displayTabId]
    return prep2EditorSideOptionsMap[prep]
  })

  return {
    showSideMenu,
    sideOptions,
  }
}

export default useEditorSideOptions

export const enum EditorSideOptionType {
  /** 格式化代码 */
  FORMAT_CODE,
  /** Markdown工具栏 */
  MARKDOWN_TOOLS,
}

/** 选项列表 */
export const editorSideOptionsListMap: Record<EditorSideOptionType, { text?: string, icon?: string }> = {
  [EditorSideOptionType.FORMAT_CODE]: { text: "格式化代码" },
  [EditorSideOptionType.MARKDOWN_TOOLS]: { text: "Markdown工具栏", icon: "icon-markdown-tools" },
}

export interface IEditorSideOptions {
  display: EditorSideOptionType[]
  more: EditorSideOptionType[]
}

/** 存储各个预处理器所包含的选项id，分为直接展示出的选项和在菜单中展示的更多选项 */
export const prep2EditorSideOptionsMap: Record<Prep, IEditorSideOptions> = {
  [Prep.HTML]: { display: [], more: [] },
  [Prep.MARKDOWN]: { display: [EditorSideOptionType.MARKDOWN_TOOLS], more: [] },
  [Prep.PUG]: { display: [], more: [] },
  [Prep.CSS]: { display: [], more: [] },
  [Prep.SASS]: { display: [], more: [] },
  [Prep.SCSS]: { display: [], more: [] },
  [Prep.LESS]: { display: [], more: [] },
  [Prep.STYLUS]: { display: [], more: [] },
  [Prep.JAVASCRIPT]: { display: [], more: [] },
  [Prep.TYPESCRIPT]: { display: [], more: [] },
  [Prep.COFFEESCRIPT]: { display: [], more: [] },
  [Prep.JSX]: { display: [], more: [] },
  [Prep.VUE]: { display: [], more: [] },
}