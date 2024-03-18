/* eslint-disable max-len */
import { initialPrepMap } from "@store/editor-config"
import { OriginLang } from "@type/prep"
import { TemplateLang } from "@type/template"
import vueCodeMap from "./code/vue"
import reactCodeMap from "./code/react"
import vueComponentCodeMap from "./code/vue-component"

export const templateCodeMap = {
  [TemplateLang.VUE]: vueCodeMap,
  [TemplateLang.REACT]: reactCodeMap,
}

export const templateLibrariesMap = {
  [TemplateLang.VUE]: {
    script: ["https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js"],
  },
  [TemplateLang.REACT]: {
    script: [
      "https://cdn.staticfile.org/react/17.0.0/umd/react.development.min.js",
      "https://cdn.staticfile.org/react-dom/17.0.0/umd/react-dom.development.min.js",
    ],
  },
}

export const templatePrepMap = {
  [TemplateLang.VUE]: initialPrepMap,
  [TemplateLang.REACT]: initialPrepMap,
}

export const componentTemplateCodeMap = {
  [TemplateLang.VUE]: vueComponentCodeMap,
}

export const componentTemplateLibrariesMap = {
  [TemplateLang.VUE]: {
    script: ["https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js"],
  },
}