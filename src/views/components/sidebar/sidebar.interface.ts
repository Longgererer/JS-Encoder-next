export enum SidebarType {
  /* 模板 */
  TEMPLATE = 'template',
  /* 编码设置 */
  SETTING = 'setting',
  /* 库 */
  LIBRARY = 'library',
  /* 上传代码 */
  UPLOAD = 'upload',
  /* 下载代码 */
  DOWNLOAD = 'download',
  /* 快捷键 */
  SHORTCUT = 'shortcut',
  /* 更新日志 */
  UPDATE_LOG = 'updateLog',
  /* 主题 */
  THEME = 'theme',
  /* Github */
  GITHUB = 'Github',
  /* 明亮 */
  LIGHT = 'light',
  /* 黑暗 */
  DARK = 'dark',
}

export const SidebarTypeToText = {
  [SidebarType.TEMPLATE]: '模板',
  [SidebarType.SETTING]: '编码设置',
  [SidebarType.LIBRARY]: '库',
  [SidebarType.UPLOAD]: '上传代码',
  [SidebarType.DOWNLOAD]: '下载代码',
  [SidebarType.SHORTCUT]: '快捷键',
  [SidebarType.UPDATE_LOG]: '更新日志',
  [SidebarType.THEME]: '主题',
  [SidebarType.GITHUB]: 'Github',
  [SidebarType.LIGHT]: '明亮主题',
  [SidebarType.DARK]: '黑暗主题',
}

export const SidebarTypeToIcon = {
  [SidebarType.TEMPLATE]: 'icon-template',
  [SidebarType.SETTING]: 'icon-setting',
  [SidebarType.LIBRARY]: 'icon-library',
  [SidebarType.UPLOAD]: 'icon-upload',
  [SidebarType.DOWNLOAD]: 'icon-download',
  [SidebarType.SHORTCUT]: 'icon-keyboard',
  [SidebarType.THEME]: 'icon-theme',
  [SidebarType.UPDATE_LOG]: 'icon-light',
  [SidebarType.GITHUB]: 'icon-github',
  [SidebarType.LIGHT]: 'icon-sun',
  [SidebarType.DARK]: 'icon-moon',
}