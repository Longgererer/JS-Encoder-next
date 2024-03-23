import { useCommonStore } from "@store/common"
import { ModalName, Theme } from "@type/interface"
import { storeToRefs } from "pinia"
import { SidebarType, sidebarList, themeIcon } from "../sidebar"
import { GITHUB_REPO_URL } from "@utils/tools/config"
import useUpdateLogs from "@hooks/use-update-logs"
import { getLocalStorage } from "@utils/tools/storage"
import { LocalStorageKey } from "@utils/config/storage"
import Modal from "@components/modal/modal.vue"

const useSidebar = () => {
  const commonStore = useCommonStore()
  const { theme } = storeToRefs(commonStore)
  const { updateDisplayModal, updateTheme } = commonStore

  const processClickTheme = () => {
    const newTheme = theme.value === Theme.DARK ? Theme.LIGHT : Theme.DARK
    updateTheme(newTheme)
    sidebarList[SidebarType.THEME].icon = themeIcon[newTheme]
  }

  const processClickGithub = () => {
    window.open(GITHUB_REPO_URL, "_blank")
  }

  const processClickHelp = () => {
    window.open(GITHUB_REPO_URL, "_blank")
  }

  const processClickUpdateLogs = () => {
    updateDisplayModal(ModalName.UPDATE_LOG)
    sidebarList[SidebarType.UPDATE_LOG].isShowBadge = false
  }

  const processOpenModal = (type: SidebarType) => {
    const modalName = sidebarList[type].modalName
    if (modalName) { updateDisplayModal(modalName) }
  }

  const { getLatestRelease } = useUpdateLogs()
  const setUpdateLogBadge = async () => {
    // 如果当前储存的版本不是最新版本的话就展示badge
    const latestRelease = await getLatestRelease()
    const savedVersion = getLocalStorage(LocalStorageKey.VERSION)
    if (savedVersion !== latestRelease.version) {
      sidebarList[SidebarType.UPDATE_LOG].isShowBadge = true
    }
  }

  return {
    processClickTheme,
    processClickGithub,
    processClickHelp,
    processClickUpdateLogs,
    processOpenModal,
    setUpdateLogBadge,
  }
}

export default useSidebar