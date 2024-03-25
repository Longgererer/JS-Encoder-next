export enum PreviewOptionType {
  REFRESH = "refresh",
  FULLSCREEN = "fullscreen",
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