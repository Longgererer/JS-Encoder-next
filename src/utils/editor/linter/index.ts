import { Diagnostic, linter } from "@codemirror/lint"
import { HTMLHint } from "htmlhint"
import stylelint from "stylelint"
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

/** 用styleLint实现的styleLinter */
const styleLinter = (config: stylelint.Config) => {
  return linter(
    async (view) => {
      const code = view.state.doc.toString()
      const { results } = await stylelint.lint({
        code,
        config: { ...config },
      })
      return results.map((result) => {
        return result.warnings.map((warning) => {
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