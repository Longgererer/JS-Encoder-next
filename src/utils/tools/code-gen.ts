import { OriginLang } from "@type/prep"
import { IEditorLibraries } from "@type/settings"

export const genCSSLinksCode = (cssLinks: string[]) => {
  return cssLinks
    .map((link) => `<link href="${link}" rel="stylesheet">`)
    .join("\n")
}

export const genScriptLinksCode = (scriptLinks: string[]) => {
  return scriptLinks
    .map((link) => `<script type="text/javascript" src="${link}"></script>`)
    .join("\n")
}

export interface IGenHTMLCodeOption {
  /** 头部标签 */
  headTags?: string
  /** 外部链接 */
  links?: IEditorLibraries
  /** 编辑器代码 */
  code: Record<OriginLang, string>
}

/** 生成完整的HTML文件代码 */
export const genHTMLFileCode = (options: IGenHTMLCodeOption) => {
  const { headTags, links, code } = options
  const { style: styleLinks = [], script: scriptLinks = [] } = links || {}
  const {
    [OriginLang.HTML]: htmlCode = "",
    [OriginLang.CSS]: cssCode = "",
    [OriginLang.JAVASCRIPT]: javascriptCode = "",
  } = code || {}
  const cssLinksCode = genCSSLinksCode(styleLinks)
  const scriptLinksCode = genScriptLinksCode(scriptLinks)
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${headTags}
    ${cssLinksCode}
    ${scriptLinksCode}
    <title></title>
    <style>
    ${cssCode}
    </style>
    <body>
    ${htmlCode}
    <script>
    ${javascriptCode}
    </script>
    </body>
    </html>
  `.trim()
}

export const getMarkdownScriptCode = () => {
  return `
    !function() {
      /** 渲染KaTeX数学公式 */
      renderMathInElement(document.body, {
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "$", right: "$", display: false},
          {left: "\\(", right: "\\)", display: false},
          {left: "\\[", right: "\\]", display: true}
        ]
      })
      /** 渲染markdown中的流程图 */
      const flows = document.querySelectorAll(".language-flow")
      for (let i = 0, k = flows.length;i < k;i++) {
        const currentFlow = flows[i]
        const pre = currentFlow.parentNode
        const chartBox = document.createElement("div")
        chartBox.id = "flow"+i
        pre.parentNode.replaceChild(chartBox, pre)
        const code = currentFlow.value || currentFlow.textContent
        flowchart.parse(code).drawSVG("flow"+i)
      }
    }()
  `.trim()
}