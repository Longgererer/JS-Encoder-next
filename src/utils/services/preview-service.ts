import useCodeCompile from "@hooks/use-code-compile"
import SingleInstance from "@utils/decorators/single-instance"

export interface IRefreshOptions {
  /** 刷新前回调 */
  onBeforeRefresh: (iframe: HTMLIFrameElement) => void
  /** 刷新后回调 */
  onRefreshed: (iframe: HTMLIFrameElement) => void
}

/** 预览相关服务 */
@SingleInstance
export default class PreviewService {
  /** iframe元素 */
  private iframe?: HTMLIFrameElement
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

  public async refreshIframe() {
    const iframeWindow = this.getWindow()
    if (!iframeWindow) { return }
    const { onBeforeRefresh, onRefreshed } = this.refreshOption || {}
    onBeforeRefresh?.(this.iframe!)
    // 写入结果代码
    const code = await useCodeCompile().getResultCode()
    this.setCode(code)
    // 加载完成后结束
    return new Promise<void>((resolve) => {
      iframeWindow.onload = () => {
        onRefreshed?.(this.iframe!)
        resolve()
      }
    })
  }

  private async setCode(code: string) {
    const iframeDoc = this.getWindow()!.document
    iframeDoc.open()
    iframeDoc.write(code)
    iframeDoc.close()
  }
}