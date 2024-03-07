import { downloadFile, downloadZip } from "@utils/tools/download"
import { ref } from "vue"

const useDownloadCode = () => {
  const getDownloadCodeInfo = () => {

  }
  const downloadSingleFile = (filename: string) => {
    // downloadFile(filename)
  }
  const downloadMultipleFiles = (zipName: string) => {
    const zipInfo = {
      name: zipName,
      fileList: [

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