import { IEditor } from '@type/editor'
import { Origin, Prep } from '@type/prep'
import { Template } from '@type/namespaces/template'

export interface ITemplateItem {
  lang: Template.Lang
  type: Template.Type
}

/* 内置模板列表 */
export const inbuiltTemplateList: ITemplateItem[] = [
  { lang: Template.Lang.VUE2, type: Template.Type.DEFAULT },
  { lang: Template.Lang.VUE3, type: Template.Type.DEFAULT },
  { lang: Template.Lang.VANILLA, type: Template.Type.DEFAULT },
  { lang: Template.Lang.REACT, type: Template.Type.DEFAULT },
  { lang: Template.Lang.ANGULAR, type: Template.Type.DEFAULT },
  { lang: Template.Lang.VUE2, type: Template.Type.COMPONENT },
  { lang: Template.Lang.VUE3, type: Template.Type.COMPONENT },
]

/* 不同类型模板对应的icon */
export const TemplateLang2IconMap = {
  [Template.Lang.VUE2]: 'icon-vue',
  [Template.Lang.VUE3]: 'icon-vue',
  [Template.Lang.VANILLA]: 'icon-javascript',
  [Template.Lang.REACT]: 'icon-react',
  [Template.Lang.ANGULAR]: 'icon-angular',
  [Template.Lang.CUSTOM]: 'icon-custom-template',
}

export interface ITemplateContent {
  /* 模板名 */
  name: string
  editorList: IEditor[]
  links: []
}