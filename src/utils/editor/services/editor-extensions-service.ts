import { Extension } from "@codemirror/state"
import { OriginLang, Prep } from "@type/prep"
import SingleInstance from "@utils/decorators/single-instance"
import { getDefaultEditorConfigByPrep, getDefaultEditorExtensions, getEditorThemeExtension, getPrepBaseExtension, getPrepLintExtension } from "../config/editor.config"
import { Theme } from "@type/interface"
import { getPrepOrigin } from "@utils/prep"

/**
 * 处理缓存编辑器的扩展
 */
@SingleInstance
export default class EditorExtensionsService {
  private lang2ExtensionsMap: Record<OriginLang, Extension[]> = {
    [OriginLang.HTML]: [],
    [OriginLang.CSS]: [],
    [OriginLang.JAVASCRIPT]: [],
  }

  constructor() {}

  public setExtensionsByPrep(prep: Prep, extensions: Extension[]): void {
    const originLang = getPrepOrigin(prep)
    this.lang2ExtensionsMap[originLang!] = extensions
  }

  public getExtensionsByPrep(prep: Prep): Extension[] {
    const originLang = getPrepOrigin(prep)
    return this.lang2ExtensionsMap[originLang!]
  }

  /** 获取预处理相关拓展 */
  public getEditorExtensionsByPrep(prep: Prep): Extension[] {
    return [
      getDefaultEditorConfigByPrep(prep),
      getPrepBaseExtension(prep),
      getPrepLintExtension(prep),
    ]
  }

  /** 获取编辑器所需扩展 */
  public getAndCacheEditorExtensions = (prep: Prep, theme: Theme): Extension[] => {
    const extensions = [
      getDefaultEditorExtensions(),
      getEditorThemeExtension(theme),
      this.getEditorExtensionsByPrep(prep),
    ]
    this.setExtensionsByPrep(prep, extensions)
    return extensions
  }

  public updateThemeExtension(theme: Theme): void {
    Object.keys(this.lang2ExtensionsMap).forEach((originLang) => {
      const extensions = this.lang2ExtensionsMap[originLang as OriginLang]
      extensions.push(getEditorThemeExtension(theme))
    })
  }

  public updatePrepExtension(prep: Prep): void {
    const extensions = this.getExtensionsByPrep(prep)
    this.setExtensionsByPrep(prep, [
      ...extensions,
      this.getEditorExtensionsByPrep(prep),
    ])
  }
}