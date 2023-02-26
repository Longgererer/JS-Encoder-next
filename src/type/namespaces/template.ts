export {}
export namespace Template {
  /* 模板对应的语言 */
  export enum Lang {
    VUE2 = 'Vue2',
    VUE3 = 'Vue3',
    VANILLA = 'Vanilla',
    REACT = 'React',
    ANGULAR = 'Angular',
    CUSTOM = 'Custom',
  }

  /* 模板类型 */
  export enum Type {
    DEFAULT = 'Default',
    COMPONENT = 'Component',
    CUSTOM = 'Custom',
  }
}