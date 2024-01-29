import { IEditor } from "@type/editor"
import { OriginLang, Prep } from "@type/prep"
import { TemplateLang, TemplateType } from "@type/template"

export interface ITemplateItem {
  lang: TemplateLang
  type: TemplateType
}

/** 内置模板列表 */
export const inbuiltTemplateList: ITemplateItem[] = [
  { lang: TemplateLang.VUE2, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VUE3, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VANILLA, type: TemplateType.DEFAULT },
  { lang: TemplateLang.REACT, type: TemplateType.DEFAULT },
  { lang: TemplateLang.ANGULAR, type: TemplateType.DEFAULT },
  { lang: TemplateLang.VUE2, type: TemplateType.COMPONENT },
  { lang: TemplateLang.VUE3, type: TemplateType.COMPONENT },
]

/** 不同类型模板对应的icon */
export const TemplateLang2IconMap = {
  [TemplateLang.VUE2]: "icon-vue",
  [TemplateLang.VUE3]: "icon-vue",
  [TemplateLang.VANILLA]: "icon-javascript",
  [TemplateLang.REACT]: "icon-react",
  [TemplateLang.ANGULAR]: "icon-angular",
  [TemplateLang.CUSTOM]: "icon-custom-template",
}

export interface ITemplateContent {
  /** 模板名 */
  name: string
  editorList: IEditor[]
  links: []
}