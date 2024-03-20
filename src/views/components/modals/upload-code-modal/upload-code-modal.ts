import { MimeType, OriginLang, Prep } from "@type/prep"
import { getOriginByMimeType, mimeType2PrepMap } from "@utils/tools/prep"
import { getFileContent, getFileMimeType } from "@utils/tools/file"
import { ref, shallowReactive } from "vue"
import { splitHTML } from "./split-html"
import { initialPrepMap, useEditorConfigStore } from "@store/editor-config"
import { useEditorWrapperStore } from "@store/editor-wrapper"

interface IUploadFileInfo {
  file: File
  mimeType: string
  prep: Prep
  originLang: OriginLang
}

/** 允许上传的文件后缀 */
const allowMimeTypes = Object.values(MimeType)

export const chosenFiles = shallowReactive<File[]>([])
export const setAllowMimeTypeFiles = (files: FileList) => {
  // 判断上传的文件中哪些是符合后缀名要求的
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < files.length; i++) {
    const mimeType = getFileMimeType(files[i].name)
    if (allowMimeTypes.includes(mimeType as MimeType)) {
      chosenFiles.push(files[i])
    }
  }
}

/** 是否分解HTML */
export const isSplitHTML = ref<boolean>(true)
/** 获取源(OriginLang)到文件信息的映射 */
const getOrigin2FileInfoMap = (files: File[]): Record<OriginLang, IUploadFileInfo> => {
  return files.reduce((acc, file) => {
    const mimeType = getFileMimeType(file.name) as MimeType
    const prep = mimeType2PrepMap[mimeType]
    const originLang = getOriginByMimeType(mimeType)!
    const fileInfo = { file, mimeType, originLang, prep }
    // 在需要分割HTML时，html文件中的CSS和JavaScript代码会覆盖之前上传的同源(OriginLang)文件代码
    if (originLang === OriginLang.HTML && isSplitHTML.value) {
      acc = {
        [originLang]: fileInfo,
      } as Record<OriginLang, IUploadFileInfo>
    } else {
      acc[originLang] = fileInfo
    }
    return acc
  }, {} as Record<OriginLang, IUploadFileInfo>)
}

/** 更新store中的代码和预处理器 */
const setCodeAndTabInfo = (content: string, originLang: OriginLang) => {
  const editorWrapperStore = useEditorWrapperStore()
  const { origin2TabIdMap } = editorWrapperStore
  const tabId = origin2TabIdMap[originLang]
  editorWrapperStore.updateCodeMap(tabId, content)
}

/** 处理上传的文件列表，将解析出的信息存储至store */
export const processUploadFiles = async (files: File[]) => {
  // 由于上传相同类型的文件，后面的文件会覆盖前面文件的内容，因此如果列表中有重复类型的文件，只读取后面文件的内容
  const origin2FileInfoMap = getOrigin2FileInfoMap(files)
  for (const fileInfo of Object.values(origin2FileInfoMap)) {
    const fileContent = await getFileContent(fileInfo.file)
    if (fileInfo.originLang === OriginLang.HTML && isSplitHTML.value) {
      // 分解HTML内容并设置到对应的tab中
      const {
        styleLinks,
        styleContent,
        htmlContent,
        scriptLinks,
        scriptContent,
      } = splitHTML(fileContent)
      const editorConfigStore = useEditorConfigStore()
      // 更新外部链接
      const { libraries: { style, script } } = editorConfigStore
      editorConfigStore.updateLibraries({
        style: [...style, ...styleLinks],
        script: [...script, ...scriptLinks],
      })
      editorConfigStore.updatePrepMap(initialPrepMap)
      setCodeAndTabInfo(htmlContent, OriginLang.HTML)
      setCodeAndTabInfo(styleContent, OriginLang.CSS)
      setCodeAndTabInfo(scriptContent, OriginLang.JAVASCRIPT)
    } else {
      setCodeAndTabInfo(fileContent, fileInfo.originLang)
    }
  }
}