import { OriginLang, Prep } from "@type/prep"
import { ITemplate, TemplateLang, TemplateType } from "@type/template"
import { ITemplateInfo } from "@utils/config/indexed-db"
import { componentTemplateCodeMap, componentTemplateLibrariesMap, componentTemplatePrepMap, templateCodeMap, templateLibrariesMap, templatePrepMap } from "@utils/config/template"
import { prep2IconMap } from "@utils/tools/prep"

/** 不同类型模板对应的icon */
export const inbuiltTemplateIconMap = {
  [TemplateLang.VUE]: "icon-vue",
  [TemplateLang.VANILLA]: "icon-javascript",
  [TemplateLang.REACT]: "icon-jsx",
  [TemplateLang.ANGULAR]: "icon-angular",
}

/** 根据模板的预处理获取模板的主要语言 */
export const getTemplateIcon = (template: ITemplate): string => {
  const { lang, type, editorConfig: { prepMap = {} } } = template
  if (type === TemplateType.INBUILT && lang !== TemplateLang.CUSTOM) {
    return inbuiltTemplateIconMap[lang]
  } else {
    if (prepMap[OriginLang.HTML] === Prep.MARKDOWN ) {
      return "icon-markdown"
    } else {
      return prep2IconMap[prepMap[OriginLang.JAVASCRIPT] || Prep.JAVASCRIPT] || "icon-custom"
    }
  }
}

/** 内置模板列表, 不存入数据库中，id从-1开始递减 */
export const inbuiltTemplateList: ITemplateInfo[] = [
  {
    id: -1,
    lang: TemplateLang.VANILLA,
    type: TemplateType.INBUILT,
    codeMap: templateCodeMap[TemplateLang.VANILLA],
    editorConfig: {
      prepMap: templatePrepMap[TemplateLang.VANILLA],
    },
  },
  {
    id: -2,
    lang: TemplateLang.VUE,
    type: TemplateType.INBUILT,
    codeMap: templateCodeMap[TemplateLang.VUE],
    editorConfig: {
      libraries: templateLibrariesMap[TemplateLang.VUE],
      prepMap: templatePrepMap[TemplateLang.VUE],
    },
  },
  {
    id: -3,
    lang: TemplateLang.VUE,
    type: TemplateType.INBUILT,
    isComponent: true,
    codeMap: componentTemplateCodeMap[TemplateLang.VUE],
    editorConfig: {
      libraries: componentTemplateLibrariesMap[TemplateLang.VUE],
      prepMap: componentTemplatePrepMap[TemplateLang.VUE],
    },
  },
  {
    id: -4,
    lang: TemplateLang.REACT,
    type: TemplateType.INBUILT,
    codeMap: templateCodeMap[TemplateLang.REACT],
    editorConfig: {
      libraries: templateLibrariesMap[TemplateLang.REACT],
      prepMap: templatePrepMap[TemplateLang.REACT],
    },
  },
]