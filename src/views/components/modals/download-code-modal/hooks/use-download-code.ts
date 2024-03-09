import { useEditorWrapperStore } from "@store/editor-wrapper"
import { MimeType } from "@type/prep"
import { IZipInfo, downloadFile, downloadZip } from "@utils/tools/download"
import { ref } from "vue"

const useDownloadCode = () => {
  const editorWrapperStore = useEditorWrapperStore()
  const getDownloadCodeInfo = () => {

  }
  const downloadSingleFile = (filename: string) => {
    // downloadFile(filename)
  }
  const downloadMultipleFiles = (zipName: string) => {
    const zipInfo: IZipInfo = {
      name: zipName,
      fileList: [
        { name: zipName, content: "", mimeType: MimeType.HTML },
        { name: zipName, content: "", mimeType: MimeType.CSS },
        { name: zipName, content: "", mimeType: MimeType.JAVASCRIPT },
      ],
    }
    downloadZip(zipInfo)
  }
  return {
    downloadSingleFile,
    downloadMultipleFiles,
  }
}

export default useDownloadCode