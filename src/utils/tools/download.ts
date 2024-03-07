import JSZip from "jszip"

interface IZipFile {
  /** 文件名 */
  name: string
  /** 文件内容 */
  content: string
  /** 后缀名 */
  mimeType: string
}

interface IZipInfo {
  /** zip文件名 */
  name: string
  /** 文件列表 */
  fileList: IZipFile[]
}

const generateZipFile = (params: IZipInfo) => {
  const { name, fileList } = params
  const zip = new JSZip()
  const zipFolder = zip.folder(name)
  if (!zipFolder) {
    throw new Error("生成zip文件错误！")
  }
  fileList.forEach(({ name: fileName, mimeType, content }) => {
    zipFolder.file(`${fileName}.${mimeType}`, content)
  })
  return zip.generateAsync({ type: "blob" })
}

const download = (filename: string, blob: Blob) => {
  const href = URL.createObjectURL(blob)
  const aELement = document.createElement("a")
  aELement.download = filename
  aELement.href = href
  // document.body.appendChild(aELement)
  aELement.click()
  // document.body.removeChild(aELement)
  URL.revokeObjectURL(href)
}

/** 下载单个文件 */
export const downloadFile = (filename: string, content: string) => {
  const blob = new Blob([content])
  download(filename, blob)
}

/** 下载zip文件 */
export const downloadZip = (params: IZipInfo) => {
  generateZipFile(params).then((blob) => {
    download(params.name, blob)
  })
}