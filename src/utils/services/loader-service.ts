import SingleInstance from "@utils/decorators/single-instance"

/** 缓存模块，防止多次引入相同模块 */
@SingleInstance
class LoaderService {
  /** 缓存模块的映射 */
  private map: Record<string, any> = {}
  constructor() {
    this.map = {}
  }
  /** 加载script脚本，监听加载完成 */
  async loadScript(url: string): Promise<void> {
    const head = document.getElementsByTagName("head")[0]
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = url
    head.appendChild(script)
    return new Promise((resolve) => {
      script.onload = () => resolve()
    })
  }
  /** 请求url获取内容 */
  async loadUrl(url: string) {
    let text = ""
    await fetch(url)
      .then(async (res) => res.blob())
      .then((res) => res.text())
      .then((res) => {
        text = res
      })
    return text
  }
  set(key: string, value: any) {
    this.map[key] = value
  }
  has(key: string) {
    return this.map.hasOwnProperty(key)
  }
  get(key: string) {
    return this.map[key]
  }
}

export default LoaderService