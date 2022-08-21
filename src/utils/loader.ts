/** 缓存模块，防止多次引入相同的模块 */
class Loader {
  static instance: Loader

  /** 模块明与其导出对象间的映射 */
  private map!: Record<string, any>

  constructor() {
    if (!Loader.instance) {
      Loader.instance = this
      this.map = {}
    }
    return Loader.instance
  }

  /** 动态加载script */
  public async loadScript(url: string): Promise<void> {
    const head = document.getElementsByTagName('head')[0]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = url
    head.appendChild(script)
    return new Promise<void>((resolve, reject) => {
      script.onload = () => {
        resolve()
      }
    })
  }

  public set(key: string, val: any): void {
    this.map[key] = val
  }

  public get(key: string): any {
    return this.map[key]
  }

  public has(key: string): boolean {
    return this.map.hasOwnProperty(key)
  }
}

export default Loader