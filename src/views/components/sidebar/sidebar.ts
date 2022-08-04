export enum SidebarType {
  /** 模板 */
  TEMPLATE = 'template',
  /** 编码设置 */
  SETTING = 'setting',
  /** 库 */
  LIBRARY = 'library',
  /** 上传代码 */
  UPLOAD = 'upload',
  /** 下载代码 */
  DOWNLOAD = 'download',
  /** 快捷键 */
  SHORTCUT = 'shortcut',
  /** 更新日志 */
  UPDATE_LOG = 'updateLog',
  /** Github */
  GITHUB = 'Github',
}

export const SidebarTypeToText = {
  [SidebarType.TEMPLATE]: '模板',
  [SidebarType.SETTING]: '编码设置',
  [SidebarType.LIBRARY]: '库',
  [SidebarType.UPLOAD]: '上传代码',
  [SidebarType.DOWNLOAD]: '下载代码',
  [SidebarType.SHORTCUT]: '快捷键',
  [SidebarType.UPDATE_LOG]: '更新日志',
  [SidebarType.GITHUB]: 'Github',
}

export const SidebarTypeToIcon = {
  [SidebarType.TEMPLATE]: '',
  [SidebarType.SETTING]: '',
  [SidebarType.LIBRARY]: '',
  [SidebarType.UPLOAD]: '',
  [SidebarType.DOWNLOAD]: '',
  [SidebarType.SHORTCUT]: '',
  [SidebarType.UPDATE_LOG]: '',
  [SidebarType.GITHUB]: '',
}