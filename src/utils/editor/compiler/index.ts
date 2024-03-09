import LoaderService from "@utils/services/loader-service"
import marked from "./marked"
import pug from "pug"
import { BABEL_URL, COFFEESCRIPT_URL, LESS_JS_URL, SASS_JS_URL, STYLUS_JS_URL, TYPESCRIPT_URL } from "@utils/tools/config"
import { ModuleKind } from "typescript"
import { Prep } from "@type/prep"

const loaderService = new LoaderService()

export const compileMarkdown = async (code: string) => {
  return marked.parse(code, { async: true })
}

export const compilePug = async (code: string) => {
  return pug.compile(code)()
}

// https://github.com/medialize/sass.js/blob/master/docs/getting-started.md
export const compileSass = async (code: string) => {
  if (!loaderService.get("sass")) {
    await loaderService.loadScript(SASS_JS_URL)
    loaderService.set("sass", Sass)
  }
  const sass = new Sass()
  return new Promise<string>((resolve) => {
    sass.compile(code, (result) => {
      resolve(result)
    })
  })
}

export const compileLess = async (code: string) => {
  if (!window.less) {
    await loaderService.loadScript(LESS_JS_URL)
  }
  return window.less.render(code).then(({ css }) => css)
}

export const compileStylus = async (code: string) => {
  if (!window.stylus) {
    await loaderService.loadScript(STYLUS_JS_URL)
  }
  return new Promise<string>((resolve) => {
    window.stylus.render(code, (err, css) => {
      resolve(css)
    })
  })
}

export const compileTypeScript = async (code: string) => {
  if (!window.ts) {
    await loaderService.loadScript(TYPESCRIPT_URL)
  }
  return window.ts.transpile(code, {
    reportDiagnostics: true,
    module: ModuleKind.ESNext,
  })
}

export const compileCoffeeScript = async (code: string) => {
  if (!window.CoffeeScript) {
    await loaderService.loadScript(COFFEESCRIPT_URL)
  }
  return window.CoffeeScript.compile(code)
}

export const compileJSX = async (code: string) => {
  if (!window.Babel) {
    await loaderService.loadScript(BABEL_URL)
  }
  return window.Babel.transform(code, { presets: ["react"] }).code || ""
}

type PrepCompiler = (code: string) => Promise<string>
const prep2CompilerMap: Partial<Record<Prep, PrepCompiler | undefined>> = {
  [Prep.MARKDOWN]: compileMarkdown,
  [Prep.PUG]: compilePug,
  [Prep.SASS]: compileSass,
  [Prep.SCSS]: compileSass,
  [Prep.LESS]: compileLess,
  [Prep.STYLUS]: compileStylus,
  [Prep.TYPESCRIPT]: compileTypeScript,
  [Prep.COFFEESCRIPT]: compileCoffeeScript,
  [Prep.JSX]: compileJSX,
}

export const compile = async (code: string, prep: Prep) => {
  const compileFunc = prep2CompilerMap[prep]
  if (compileFunc) {
    return compileFunc(code).catch((err) => { console.error(err) })
  } else {
    return code
  }
}