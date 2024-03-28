import { App, AppContext } from "vue"
import { IMessageProps, MessageType } from "./message-list.interface"
import MessageManagerService from "./services/message-manager-service"

const apiNameList = [
  "notice",
  "error",
  "success",
  "warning",
]

const getFormatOptions = (options: IMessageProps | string): IMessageProps => {
  return typeof options === "string" ? { text: options } : options
}

let messageManagerService: MessageManagerService | null = null
const messageApi = apiNameList.reduce((acc, apiName) => {
  acc[apiName as string] = (options: IMessageProps | string, app: AppContext) => {
    const formatOptions = getFormatOptions(options)
    if (!messageManagerService) {
      messageManagerService = new MessageManagerService(app)
    }
    return messageManagerService.add({
      ...formatOptions,
      type: apiName as MessageType,
    })
  }
  return acc
}, {} as Record<string, any>)

export default messageApi