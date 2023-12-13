import { basicSetup } from "codemirror"
import { keymap, EditorView, ViewUpdate, lineNumbers } from "@codemirror/view"
import { EditorState, Compartment, Extension, StateEffect, EditorStateConfig } from "@codemirror/state"
import { javascript } from "@codemirror/lang-javascript"
import { css } from "@codemirror/lang-css"
import { html } from "@codemirror/lang-html"
import { Prep } from "@type/prep"
import { EditorViewConfig } from "@codemirror/view"
import { syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language"
import { oneDark } from "@codemirror/theme-one-dark"
import { Ref, ShallowRef, ref, shallowRef } from "vue"

export interface ICodemirrorEditorSettings {
  tabSize: number
  indentWithTab: boolean
}

export interface IProps {
  prep: Prep,
  settings: ICodemirrorEditorSettings
}

export interface IEmits {
  (e: "change", index: number): void
}



