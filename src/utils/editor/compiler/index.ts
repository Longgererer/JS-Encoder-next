import LoaderService from "@utils/services/loader-service"
import { BABEL_URL, COFFEESCRIPT_URL, LESS_JS_URL, SASS_JS_URL, STYLUS_JS_URL, TYPESCRIPT_URL, PUG_JS_URL } from "@utils/tools/config"
import { ModuleKind } from "typescript"
import { OriginLang, Prep } from "@type/prep"
import hash from "hash-sum"

const loaderService = new LoaderService()

export const compileMarkdown = async (code: string) => {
  const marked = await import("marked")
  return marked.parse(code, { async: true })
}

export const compilePug = async (code: string) => {
  if (!window.jade) {
    await loaderService.loadScript(PUG_JS_URL)
  }
  return window.jade.compile(code)()
}

// https://sass-lang.com/blog/sass-in-the-browser/
export const compileSass = async (code: string) => {
  const sass = await import(SASS_JS_URL)
  return sass.compileString(code).css
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
  return new Promise<string>((resolve, rejected) => {
    window.stylus.render(code, { filename: "index.styl" }, (err, css) => {
      if (err) {
        rejected(err)
      } else {
        resolve(css)
      }
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

export const compileVue = async (code: string): Promise<Record<OriginLang, string>> => {
  const vue = await import("@vue/compiler-sfc")
  const { parse, compileScript, rewriteDefault } = vue
  const descriptor = parse(code).descriptor
  const id = hash(code)

  // 解析编译style
  const styles = descriptor.styles
  const styleCodes = []
  for (const style of styles) {
    const { lang = "", scoped, content } = style
    const prep = getStylePrepByLang(lang)
    const cssCode = await compile(content, prep)
    styleCodes.push(vue.compileStyle({
      scoped,
      source: cssCode,
      id: `data-v-${hash(code)}`,
      filename: "",
    }).code.trim())
  }

  // 解析编译script
  const compiledScript = compileScript(descriptor, { id })
  const mainName = "_sfc_main"
  let scriptCode = rewriteDefault(compiledScript.content, mainName)
  // 取出通过import引入的变量，改为从Vue中取出
  const importReg = /import [^<]* from ['|"]vue['|"]/
  const importList = scriptCode.match(importReg)
  const importStr = importList?.[0] || ""
  const importContent = importStr.match(/{.+}/)
  scriptCode = scriptCode.replace(importReg, `const ${importContent} = Vue`)

  // 获取template
  const templateCode = descriptor.template?.content.trim() || ""

  // 组装html
  const htmlCode = `
    <div id="app"></div>
    <script type="module">
      ${scriptCode}
      const _sfc_app = Vue.createApp({
        template: \`${templateCode}\`,
        ...${mainName}
      }).mount("#app")
    </script>
  `.trim()

  return {
    [OriginLang.HTML]: htmlCode,
    [OriginLang.CSS]: styleCodes.join("\n"),
    [OriginLang.JAVASCRIPT]: "",
  }
}

const getStylePrepByLang = (lang: string) => {
  if (/^sass$/i.test(lang)) {
    return Prep.SASS
  } else if (/^scss$/i.test(lang)) {
    return Prep.SCSS
  } else if (/^less$/i.test(lang)) {
    return Prep.LESS
  } else {
    return Prep.CSS
  }
}

type PrepCompiler = (code: string) => Promise<string>
const prep2CompilerMap: Partial<Record<Prep, PrepCompiler>> = {
  [Prep.MARKDOWN]: compileMarkdown,
  [Prep.PUG]: compilePug,
  [Prep.SASS]: compileSass,
  [Prep.SCSS]: compileSass,
  [Prep.LESS]: compileLess,
  [Prep.STYLUS]: compileStylus,
  [Prep.TYPESCRIPT]: compileTypeScript,
  [Prep.COFFEESCRIPT]: compileCoffeeScript,
  [Prep.BABEL]: compileJSX,
}

export const compile = async (code: string = "", prep: Prep) => {
  const compileFunc = prep2CompilerMap[prep]
  if (compileFunc && code) {
    return compileFunc(code)
      .catch((err) => {
        // TODO: 编译错误时在iframe上展示错误信息
        console.error(err)
        return ""
      })
  } else {
    return code
  }
}

type PrepComponentCompiler = (code: string) => Promise<Record<OriginLang, string>>
const prep2ComponentCompilerMap: Partial<Record<Prep, PrepComponentCompiler>> = {
  [Prep.VUE]: compileVue,
}

export const compileComponent = async (code: string, prep: Prep) => {
  const compileFunc = prep2ComponentCompilerMap[prep]
  const defaultCodeMap = {
    [OriginLang.HTML]: "",
    [OriginLang.CSS]: "",
    [OriginLang.JAVASCRIPT]: "",
  }
  if (compileFunc) {
    return compileFunc(code)
      .catch((err) => {
        console.error(err)
        return defaultCodeMap
      })
  } else {
    return defaultCodeMap
  }
}