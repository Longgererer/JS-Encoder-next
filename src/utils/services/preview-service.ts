import useCodeCompile from "@hooks/use-code-compile"
import SingleInstance from "@utils/decorators/single-instance"

export interface IRefreshOptions {
  /** 当iframe元素被替换 */
  onIframeUpdated?: (iframe: HTMLIFrameElement) => void
  /** 刷新前回调 */
  onBeforeRefresh?: (iframe: HTMLIFrameElement) => void
  /** 刷新后回调 */
  onRefreshed?: (iframe: HTMLIFrameElement) => void
}

/** 预览相关服务 */
@SingleInstance
export default class PreviewService {
  /** iframe元素 */
  private iframe?: HTMLIFrameElement
  private isIframeInit: boolean = false
  /** 刷新选项 */
  private refreshOption?: IRefreshOptions

  constructor(iframe?: HTMLIFrameElement) {
    if (iframe) {
      this.iframe = iframe
    } else {
      if (!this.iframe) {
        throw new Error("初始化预览服务配置缺失！")
      }
    }
  }

  public getIframe() {
    return this.iframe
  }

  public getWindow() {
    return this.iframe!.contentWindow
  }

  public setRefreshOptions(options: IRefreshOptions) {
    this.refreshOption = options
  }

  public replaceOldIframe() {
    if (!this.iframe) { return }
    const newIframe = this.iframe?.cloneNode()
    this.iframe?.parentNode?.replaceChild(newIframe, this.iframe!)
    this.iframe = newIframe as HTMLIFrameElement
  }

  public async refreshIframe() {
    const { onIframeUpdated, onBeforeRefresh, onRefreshed } = this.refreshOption || {}

    if (this.isIframeInit) {
      this.replaceOldIframe()
      onIframeUpdated?.(this.iframe!)
    }

    const iframeWindow = this.getWindow()
    if (!iframeWindow) { return }

    const iframeDoc = this.getWindow()!.document
    iframeDoc.open()
    onBeforeRefresh?.(this.iframe!)
    // 写入结果代码
    const code = await useCodeCompile().getResultCode()
    iframeDoc.write(code)
    iframeDoc.close()

    // 加载完成后结束
    return new Promise<void>((resolve) => {
      iframeWindow.onload = () => {
        this.isIframeInit = true
        onRefreshed?.(this.iframe!)
        iframeWindow.onload = null
        resolve()
      }
    })
  }
}