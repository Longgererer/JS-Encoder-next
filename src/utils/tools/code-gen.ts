import { IEditorLibraries } from "@type/settings"

export const genCSSLinksCode = (cssLinks: string[]) => {
  return cssLinks
    .map((link) => `<link href="${link}" rel="stylesheet">`)
    .join("\n")
}

export const genScriptLinksCode = (scriptLinks: string[]) => {
  return scriptLinks
    .map((link) => `<script src="${link}"></script>`)
    .join("\n")
}

export interface IGenHTMLCodeOption {
  /** 头部标签 */
  headTags?: string
  /** 外部链接 */
  links?: IEditorLibraries
  /** 编辑器代码 */
  code: {
    html?: string
    css?: string
    javascript?: string
  }
}

/** 生成完整的HTML文件代码 */
export const genHTMLFileCode = (options: IGenHTMLCodeOption) => {
  const { headTags, links, code } = options
  const { style: styleLinks = [], script: scriptLinks = [] } = links || {}
  const { html: htmlCode = "", css: cssCode = "", javascript: javascriptCode = "" } = code || {}
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
    <title></title>
    <style>
    ${cssCode}
    </style>
    <body>
    ${htmlCode}
    ${scriptLinksCode}
    <script>
    ${javascriptCode}
    </script>
    </body>
    </html>
  `.trim()
}

/** 编译并合并编辑器代码生成最终结果代码 */
const genResultCode = () => {

}