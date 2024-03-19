import { ITemplate } from "@type/template"
import { IIndexedDBConfig, IndexedDBStore } from "@utils/services/indexed-db-service"

export enum IndexedDBStoreName {
  /** 模板 */
  TEMPLATE = "template",
}

export interface IIndexedDBStoreData {
  /** 存储模板信息的表 */
  [IndexedDBStoreName.TEMPLATE]: ITemplateInfo
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

export const indexedDBConfig: IIndexedDBConfig = {
  dbName: INDEXED_DB_NAME,
  version: INDEXED_DB_VERSION,
  stores: [
    {
      name: IndexedDBStoreName.TEMPLATE,
      primaryKey: "id",
      isClear: false,
    },
  ],
}