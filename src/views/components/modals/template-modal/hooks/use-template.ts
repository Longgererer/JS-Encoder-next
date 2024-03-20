import { useEditorConfigStore } from "@store/editor-config"
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { OriginLang } from "@type/prep"
import { TemplateLang, TemplateType } from "@type/template"
import { DBStoreName, ITemplateInfo } from "@utils/config/indexed-db"
import { DBService } from "@utils/services/indexed-db-service"

const useTemplate = () => {
  const dbService = new DBService()

  /** 获取本地存储的自定义模板列表 */
  const getCustomTemplateList = async () => {
    return await dbService.getAll<DBStoreName.TEMPLATE>(DBStoreName.TEMPLATE)
  }

  const createTemplate = async () => {
    const { isCodeEmpty, codeMap, tabMap } = useEditorWrapperStore()
    const { libraries, prepMap } = useEditorConfigStore()
    // TODO：代码为空要有提示
    if (isCodeEmpty) { return { success: false } }
    // 获取源到编辑器代码的映射
    const origin2CodeMap = Object.keys(tabMap).reduce((acc, tabId) => {
      const { origin } = tabMap[Number(tabId)]
      acc[origin] = codeMap[Number(tabId)]
      return acc
    }, {} as Record<OriginLang, string>)
    const template: ITemplateInfo = {
      name: "123",
      lang: TemplateLang.CUSTOM,
      type: TemplateType.CUSTOM,
      codeMap: origin2CodeMap,
      editorConfig: { libraries, prepMap },
    }
    return dbService.add<DBStoreName.TEMPLATE>(DBStoreName.TEMPLATE, template)
  }

  const updateTemplate = async (template: ITemplateInfo) => {
    return dbService.update<DBStoreName.TEMPLATE>(DBStoreName.TEMPLATE, template)
  }

  return {
    dbService,
    getCustomTemplateList,
    createTemplate,
    updateTemplate,
  }
}

export default useTemplate