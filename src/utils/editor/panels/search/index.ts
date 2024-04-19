import { EditorView } from "@codemirror/view"
import { Panel } from "@codemirror/view"
import Search from "./search.vue"
import { VNode, createVNode, render } from "vue"

let searchWrapperNode: HTMLDivElement
let searchVNode: VNode<any>

export const createSearchPanel = (view: EditorView): Panel => {
  if (!searchWrapperNode) {
    searchVNode = createVNode(Search, { view })
    searchWrapperNode = document.createElement("div")
    render(searchVNode, searchWrapperNode)
  }
  return {
    top: true,
    dom: searchWrapperNode,
    mount: () => {
      searchVNode.component?.exposed?.onMounted()
    },
    update: () => {
      console.log("update")
    },
    destroy: () => {
      searchVNode.component?.exposed?.onDestroy()
    },
  }
}