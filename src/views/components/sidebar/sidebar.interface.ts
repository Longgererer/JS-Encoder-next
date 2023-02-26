import { ModalName, Theme } from '@type/interface'

export enum SidebarType {
  /* 模板 */
  TEMPLATE = 'template',
  /* 编码设置 */
  CODE_SETTINGS = 'codeSettings',
  /* 库 */
  LIBRARIES = 'libraries',
  /* 上传代码 */
  UPLOAD_CODE = 'uploadCode',
  /* 下载代码 */
  DOWNLOAD_CODE = 'downloadCode',
  /* 快捷键 */
  SHORTCUT = 'shortcut',
  /* 更新日志 */
  UPDATE_LOG = 'updateLog',
  /* 帮助文档 */
  HELP_DOCUMENT = 'helpDocument',
  /* 主题 */
  THEME = 'theme',
  /* Github */
  GITHUB = 'Github',
}

export const SidebarTypeToText = {
  [SidebarType.TEMPLATE]: '模板',
  [SidebarType.CODE_SETTINGS]: '编码设置',
  [SidebarType.LIBRARIES]: '库',
  [SidebarType.UPLOAD_CODE]: '上传代码',
  [SidebarType.DOWNLOAD_CODE]: '下载代码',
  [SidebarType.SHORTCUT]: '快捷键',
  [SidebarType.UPDATE_LOG]: '更新日志',
  [SidebarType.HELP_DOCUMENT]: '帮助文档',
  [SidebarType.THEME]: '主题',
  [SidebarType.GITHUB]: 'Github',
}

export const SidebarTypeToIcon = {
  [SidebarType.TEMPLATE]: 'icon-template',
  [SidebarType.CODE_SETTINGS]: 'icon-setting',
  [SidebarType.LIBRARIES]: 'icon-library',
  [SidebarType.UPLOAD_CODE]: 'icon-upload',
  [SidebarType.DOWNLOAD_CODE]: 'icon-download',
  [SidebarType.SHORTCUT]: 'icon-keyboard',
  [SidebarType.UPDATE_LOG]: 'icon-light',
  [SidebarType.HELP_DOCUMENT]: 'icon-doc-help',
  [SidebarType.THEME]: 'icon-sun',
  [SidebarType.GITHUB]: 'icon-github',
}

export const ThemeIcon = {
  [Theme.LIGHT]: 'icon-moon',
  [Theme.DARK]: 'icon-sun',
}

/* 侧边栏选项列表，每个子列表之间用横线分割 */
export const SidebarList: SidebarType[][] = [
  [SidebarType.TEMPLATE, SidebarType.CODE_SETTINGS, SidebarType.LIBRARIES],
  [SidebarType.UPLOAD_CODE, SidebarType.DOWNLOAD_CODE],
  [SidebarType.SHORTCUT, SidebarType.UPDATE_LOG, SidebarType.HELP_DOCUMENT],
  [],
  [SidebarType.THEME, SidebarType.GITHUB],
]

export const SidebarTypeToModalNameMap: Map<SidebarType, ModalName> = new Map([
  [SidebarType.TEMPLATE, ModalName.TEMPLATE],
  [SidebarType.CODE_SETTINGS, ModalName.CODE_SETTINGS],
  [SidebarType.LIBRARIES, ModalName.LIBRARIES],
  [SidebarType.UPLOAD_CODE, ModalName.UPLOAD_CODE],
  [SidebarType.DOWNLOAD_CODE, ModalName.DOWNLOAD_CODE],
  [SidebarType.SHORTCUT, ModalName.SHORTCUT],
  [SidebarType.UPDATE_LOG, ModalName.UPDATE_LOG],
])