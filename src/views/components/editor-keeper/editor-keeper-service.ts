import { createVNode, render } from "vue"
import Editor from "../editor/editor.vue"
import SingleInstance from "@utils/decorators/single-instance"
import { AnyObject } from "@type/interface"

@SingleInstance
export default class EditorKeeperService {
  private editorInstanceMap: Record<number, HTMLDivElement> = {}

  constructor() {}

  public getEditorInstance(tabId: number, props: AnyObject) {
    if (this.editorInstanceMap[tabId]) {
      return this.editorInstanceMap[tabId]
    } else {
      const editorWrapperNode = this.render(props)
      this.editorInstanceMap[tabId] = editorWrapperNode
      return editorWrapperNode
    }
  }

  public render(props: AnyObject) {
    const editorVNode = createVNode(Editor, props)
    const editorWrapperNode = document.createElement("div")
    editorWrapperNode.classList.add("fill", "over-hidden")
    render(editorVNode, editorWrapperNode)
    return editorWrapperNode
  }

  public rerender(tabId: number, props: AnyObject) {
    const editorVNode = createVNode(Editor, props)
    render(editorVNode, this.editorInstanceMap[tabId])
  }
}