import { Diagnostic, linter } from "@codemirror/lint"
import { HTMLHint } from "htmlhint"
import stylusLintRecommendConfig from "@utils/editor/config/stylus-lint-recommend.config"
import Linter from "eslint4b-prebuilt"
import { esLint } from "@codemirror/lang-javascript"
import { tsLinter } from "../lsp/typescript"

/** 用HTMLHint实现htmlLinter */
export const htmlLinter = linter(
  (view) => {
    const code = view.state.doc.toString()
    const results = HTMLHint.verify(code, {})
    return results.map((result) => {
      const from = view.state.doc.line(result.line - 1).from
      const to = from + result.evidence.length
      return {
        from, to,
        severity: result.type,
        message: result.message,
      }
    })
  }
)

/**
 * 用styleLint实现的styleLinter
 * PS: stylelint本身无法支持浏览器，只支持node，问题可见
 * https://github.com/stylelint/stylelint/issues/3935
 * 解决办法是使用适用于浏览器的bundle文件，在html文件中引入
 * https://github.com/openstyles/stylelint-bundle
 */
const styleLinter = (config: any) => {
  return linter(
    async (view) => {
      const code = view.state.doc.toString()
      const { results } = await window.stylelint.lint({
        code,
        config: { ...config },
      })
      return results.map((result: any) => {
        return result.warnings.map((warning: any) => {
          const from = view.state.doc.line(warning.line - 1).from
          const to = from + (warning.endColumn || warning.column) - warning.column
          return {
            from, to,
            severity: warning.severity,
            message: warning.text,
          }
        })
      }).flat()
    }
  )
}

export const cssLinter = styleLinter({ extends: ["stylelint-config-standard"] })

export const scssLinter = styleLinter({ extends: ["stylelint-config-standard-scss"] })

export const lessLinter = styleLinter({ extends: ["stylelint-config-recommended-less"] })

export const stylusLinter = styleLinter(stylusLintRecommendConfig)

export const javascriptLinter = linter(esLint(new Linter()))

export const typeScriptLinter = linter(() => tsLinter() as Diagnostic[])