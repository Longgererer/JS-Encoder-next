export interface IProps {
  isShowSize?: boolean
}

export enum PreviewOptionType {
  REFRESH = "refresh",
  FULLSCREEN = "fullscreen",
  EXIT_FULLSCREEN = "exitFullscreen",
}

export interface IPreviewOption {
  icon: string
  type: PreviewOptionType
  title: string
}

export const previewOptions: IPreviewOption[] = [
  { icon: "icon-refresh", type: PreviewOptionType.REFRESH, title: "刷新" },
  { icon: "icon-magnify", type: PreviewOptionType.FULLSCREEN, title: "全屏" },
]

export const previewFullscreenOptions: IPreviewOption[] = [
  { icon: "icon-refresh", type: PreviewOptionType.REFRESH, title: "刷新" },
  { icon: "icon-minify", type: PreviewOptionType.EXIT_FULLSCREEN, title: "退出全屏" },
]