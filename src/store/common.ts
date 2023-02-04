import { defineStore } from 'pinia'
import { ModalName } from '@type/interface'

interface ICommonStore {
  /* 显示的modal名称 */
  displayModal: ModalName | null,
}

export const useCommonStore = defineStore('common', {
  state: (): ICommonStore => {
    return {
      displayModal: ModalName.UPLOAD_CODE,
    }
  },
  actions: {
    updateDisplayModal(name: ModalName | null): void {
      this.displayModal = name
    },
  },
})