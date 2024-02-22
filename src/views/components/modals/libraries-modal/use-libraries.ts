import { BOOT_CDN_URL } from "@utils/config"

interface IRemoteLibraryInfo {
  name: string
  latest: string
}

export interface ILibraryItem {
  name: string
  url: string
}

/** 处理样式库、脚本库内容的获取和查询 */
const useLibraries = () => {
  const styleLibraries: ILibraryItem[] = []
  const scriptLibraries: ILibraryItem[] = []

  const fetchCDNLibraries = () => {
    return fetch(BOOT_CDN_URL)
      .then((res) => res.json())
      .then(({ results }) => results as IRemoteLibraryInfo[])
  }

  const processLibraries = (libraries: IRemoteLibraryInfo[]) => {
    libraries.forEach(({ name, latest: url }) => {
      if (/\.css$/.test(url)) {
        styleLibraries.push({ name, url })
      } else {
        scriptLibraries.push({ name, url })
      }
    })
  }

  /** 请求CDN库链接 */
  const setCDNLibraries = async () => {
    if (!styleLibraries.length && !scriptLibraries.length) {
      const libraries = await fetchCDNLibraries()
      processLibraries(libraries)
    }
  }

  const searchLibraries = async (keyword: string, libraries: ILibraryItem[]) => {
    await setCDNLibraries()
    const regExp = new RegExp(`${keyword}`, "ig")
    return libraries.filter(({ name }) => regExp.test(name))
  }

  const searchStyleLibraries = (keyword: string) => searchLibraries(keyword, styleLibraries)

  const searchScriptLibraries = (keyword: string) => searchLibraries(keyword, scriptLibraries)

  return {
    searchStyleLibraries,
    searchScriptLibraries,
  }
}

export default useLibraries