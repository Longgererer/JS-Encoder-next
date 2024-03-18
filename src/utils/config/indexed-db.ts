import { OriginLang } from "@type/prep"
import { IEditorConfig } from "@type/settings"
import { ITemplate, TemplateLang, TemplateType } from "@type/template"
import { DeepPartial } from "@type/types"
import { IndexedDBStore } from "@utils/services/indexed-db-service"

export enum DBStoreName {
  /** 模板 */
  TEMPLATE = "template",
}

export interface IDBStoreData {
  /** 存储模板信息的表 */
  [DBStoreName.TEMPLATE]: ITemplateInfo
}

export interface ITemplateInfo extends ITemplate {
  /** id自增 */
  id: number
}

/** 数据库名 */
export const INDEXED_DB_NAME = "JS-Encoder-DB"
/** 数据库版本 */
export const INDEXED_DB_VERSION = 1
/** 数据库配置 */
export const INDEXED_DB_STORES: IndexedDBStore[] = [
  {
    name: "template",
    primaryKey: "id",
    isClear: false,
  },
]
