import { BOOT_CDN_URL } from "@utils/config"

interface ILibraryItem {
  name: string
  latest: string
}

/** 处理样式库、脚本库内容的获取和查询 */
const useLibraries = () => {
  const styleLibraries: ILibraryItem[] = []
  const scriptLibraries: ILibraryItem[] = []

  const fetchCDNLibraries = () => {
    return fetch(BOOT_CDN_URL)
      .then((res) => res.json())
      .then(({ results }) => results as ILibraryItem[])
  }

  const processLibrariesType = (libraries: ILibraryItem[]) => {
    libraries.forEach((library) => {
      const { latest } = library
      if (/\.css$/.test(latest)) {
        styleLibraries.push(library)
      } else {
        scriptLibraries.push(library)
      }
    })
  }

  /** 请求CDN库链接 */
  const setCDNLibraries = async () => {
    if (!styleLibraries.length && !scriptLibraries.length) {
      const libraries = await fetchCDNLibraries()
      processLibrariesType(libraries)
    }
  }

  const searchLibraries = async (keyword: string, libraries: ILibraryItem[]) => {
    await setCDNLibraries()
    const regExp = new RegExp(`${keyword}`, "ig")
    return libraries.filter(({ latest }) => regExp.test(latest))
  }

  const searchStyleLibraries = (keyword: string) => searchLibraries(keyword, styleLibraries)

  const searchScriptLibraries = (keyword: string) => searchLibraries(keyword, scriptLibraries)

  return {
    searchStyleLibraries,
    searchScriptLibraries,
  }
}

export default useLibraries