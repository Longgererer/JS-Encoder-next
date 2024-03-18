import { OriginLang, Prep } from "@type/prep"
import { ITemplate, TemplateLang, TemplateType } from "@type/template"
import { ITemplateInfo } from "@utils/config/indexed-db"
import { templateCodeMap, templateLibrariesMap, templatePrepMap } from "@utils/config/template"

/** 不同类型模板对应的icon */
export const TemplateLang2IconMap = {
  [TemplateLang.VUE]: "icon-vue",
  [TemplateLang.VANILLA]: "icon-javascript",
  [TemplateLang.REACT]: "icon-react",
  [TemplateLang.ANGULAR]: "icon-angular",
  [TemplateLang.CUSTOM]: "icon-custom-template",
}

/** 获取本地存储的自定义模板列表 */
export const getCustomTemplateList = (): ITemplateInfo[] => {
  // const db = new IndexedDBService({
  //   dbName: INDEXED_DB_NAME,
  //   version: INDEXED_DB_VERSION,
  // })
  return []
}

/** 内置模板列表 */
export const inbuiltTemplateList: ITemplate[] = [
  {
    lang: TemplateLang.VUE,
    type: TemplateType.INBUILT,
    codeMap: templateCodeMap[TemplateLang.VUE],
    editorConfig: {
      libraries: templateLibrariesMap[TemplateLang.VUE],
      prepMap: templatePrepMap[TemplateLang.VUE],
    },
  },
  {
    lang: TemplateLang.VANILLA,
    type: TemplateType.INBUILT,
    codeMap: templateCodeMap[TemplateLang.VANILLA],
  },
  { lang: TemplateLang.VANILLA, type: TemplateType.CUSTOM },
  { lang: TemplateLang.REACT, type: TemplateType.CUSTOM },
  { lang: TemplateLang.ANGULAR, type: TemplateType.CUSTOM },
  { lang: TemplateLang.VUE, type: TemplateType.COMPONENT },
]