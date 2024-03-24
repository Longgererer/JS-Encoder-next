import { useEditorConfigStore } from "@store/editor-config"
import { useEditorWrapperStore } from "@store/editor-wrapper"
import { OriginLang, Prep } from "@type/prep"
import { compile, compileComponent } from "@utils/editor/compiler"
import { genHTMLFileCode, getMarkdownScriptCode } from "@utils/tools/code-gen"
import { FLOW_CHART_URLS, KATEX_RENDER_URL, KATEX_STYLE_URL, MD_STYLE_URL } from "@utils/tools/config"

// eslint-disable-next-line max-lines-per-function
const useCodeCompile = () => {
  const editorConfigStore = useEditorConfigStore()
  const editorWrapperStore = useEditorWrapperStore()

  /** 获取编译后的代码 */
  const getCompiledCode = async () => {
    const { prepMap, isComponentMode } = editorConfigStore
    const { origin2TabIdMap, codeMap } = editorWrapperStore
    const origin2CodeMap = Object.entries(origin2TabIdMap).reduce((acc, [origin, tabId]) => {
      acc[origin as OriginLang] = codeMap[tabId]
      return acc
    }, {} as Record<OriginLang, string>)

    if (isComponentMode) {
      // 组件模式
      return await compileComponent(origin2CodeMap.JAVASCRIPT, prepMap.JAVASCRIPT)
    } else {
      const htmlCode = await compile(origin2CodeMap.HTML, prepMap.HTML)
      const cssCode = await compile(origin2CodeMap.CSS, prepMap.CSS)
      let javascriptCode = await compile(origin2CodeMap.JAVASCRIPT, prepMap.JAVASCRIPT)
      if (prepMap[OriginLang.HTML] === Prep.MARKDOWN) {
        javascriptCode = getMarkdownScriptCode() + javascriptCode
      }
      const resultCodeMap = {
        [OriginLang.HTML]: htmlCode,
        [OriginLang.CSS]: cssCode,
        [OriginLang.JAVASCRIPT]: javascriptCode,
      }
      return resultCodeMap
    }
  }

  const getResultLinks = () => {
    const { prepMap, isComponentMode, libraries } = editorConfigStore
    if (isComponentMode) { return }
    const style = [...libraries.style]
    const script = [...libraries.script]
    if (prepMap[OriginLang.HTML] === Prep.MARKDOWN) {
      style.push(MD_STYLE_URL, KATEX_STYLE_URL)
      script.push(KATEX_RENDER_URL, ...FLOW_CHART_URLS)
    }
    return { style, script }
  }

  const getResultCode = async () => {
    const { settings: { other: { headTags } } } = editorConfigStore
    const code = await getCompiledCode()
    const links = getResultLinks()
    genHTMLFileCode({
      headTags,
      links,
      code,
    })
  }

  return {
    getResultCode,
  }
}

export default useCodeCompile