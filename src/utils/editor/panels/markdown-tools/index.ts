import { StateEffect, StateField, Transaction } from "@codemirror/state"
import { EditorView, Panel, showPanel } from "@codemirror/view"
import MarkdownTools from "@views/components/plugins/markdown-tools/markdown-tools.vue"
import { VNode, createVNode, render } from "vue"

let markdownToolsWrapperNode: HTMLDivElement
let markdownToolsVNode: VNode<any>

export const createMarkdownToolsPanel = (view: EditorView): Panel => {
  if (!markdownToolsWrapperNode) {
    markdownToolsVNode = createVNode(MarkdownTools, { view })
    markdownToolsWrapperNode = document.createElement("div")
    render(markdownToolsVNode, markdownToolsWrapperNode)
  }
  return {
    top: true,
    dom: markdownToolsWrapperNode,
    mount: () => {},
    destroy: () => {},
  }
}

const toggleMarkdownTools = StateEffect.define<boolean>()

export const markdownToolsState = StateField.define<boolean>({
  create: () => false,
  update(value: boolean, tr: Transaction) {
    for (const effect of tr.effects) {
      if (effect.is(toggleMarkdownTools)) {
        value = effect.value
      }
    }
    return value
  },
  provide: (f) => {
    return showPanel.from(f, (on) => on ? createMarkdownToolsPanel : null)
  },
})

export const toggleMarkdownToolsPanel = (view: EditorView) => {
  view.dispatch({
    effects: toggleMarkdownTools.of(!view.state.field(markdownToolsState)),
  })
}