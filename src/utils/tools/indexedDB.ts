/**
 * 对于上一个版本(v3)来说，虽然是纯前端项目，但需要存储的数据量不大，完全可以使用sessionStorage和localStorage来应付。
 * 在v4中新增了可以存储自定义模板的功能，因为无法预知自定义模板的数据大小，所以使用indexedDB更加保险。
 */
import { ErrorCode, throwError } from "@utils/tools/error"
import { deepCopy } from "@utils/tools/common"


interface IndexedDBStoreIndex {
  name: string
  unique: boolean
}

interface IndexedDBStore {
  /** 对象仓库名称 */
  name: string
  /** 主键名称 */
  primaryKey: string
  /** 索引列表 key：索引名称 value：是否可以重复 */
  indexList: IndexedDBStoreIndex[]
  /** 版本更新时是否需要删除原来的仓库 */
  isClear: boolean
}

interface IndexedDBConfig {
  /** 数据库名 */
  dbName: string
  /** 对象仓库集合 */
  stores: IndexedDBStore[]
  /** 数据库版本 */
  version?: number
  /** 初始化回调 */
  initCb?: () => void
}

type TransactionMode = "readonly" | "readwrite" | "versionchange"

declare global {
  interface Window {
    webkitIndexedDB?: IDBFactory
    mozIndexedDB?: IDBFactory
    msIndexedDB?: IDBFactory
  }
}

export class IndexedDBHelper {
  /** 单例模式实例 */
  static dbInstance: IndexedDBHelper
  /** 数据库 */
  private indexedDb?: IDBFactory
  /** 数据库对象 */
  private db: IDBDatabase | null = null
  /** 数据库信息 */
  private readonly dbInfo?: IndexedDBConfig
  /** 数据库请求对象 */
  private readonly dbReq?: IDBOpenDBRequest

  constructor(config: IndexedDBConfig) {
    if (IndexedDBHelper.dbInstance) {
      return IndexedDBHelper.dbInstance
    }

    const indexedDb =  window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB
    if (!indexedDb) {
      throwError(ErrorCode.INDEXED_DB_NOT_SUPPORT)
    }

    this.indexedDb = indexedDb
    this.dbInfo = config
    this.dbReq = this.open()
    this.initRequestHandler()
    IndexedDBHelper.dbInstance = this
  }

  /** 添加单条数据 */
  public add(storeName: string, data: any): Promise<any> {
    return this.setSingleReqCallback(
      ErrorCode.INDEXED_DB_ADD_SINGLE_FAILED,
      () => this.beginTransaction(storeName).add(deepCopy(data)),
      storeName, data,
    )
  }

  /** 获取单条数据 */
  public get(storeName: string, primaryKey: string): Promise<any> {
    return this.setSingleReqCallback(
      ErrorCode.INDEXED_DB_GET_SINGLE_FAILED,
      () => this.beginTransaction(storeName).get(primaryKey),
      storeName, primaryKey,
    )
  }

  /** 获取所有数据 */
  public getAll(storeName: string): Promise<any[]> {
    return this.setMultipleDataReqCallBack(
      ErrorCode.INDEXED_DB_GET_ALL_FAILED,
      () => this.beginTransaction(storeName).openCursor(),
      storeName,
    )
  }

  /** 通过索引获取数据 */
  public getByIndex(storeName: string, indexName: string): Promise<any> {
    return this.setMultipleDataReqCallBack(
      ErrorCode.INDEXED_DB_GET_BY_INDEX_FAILED,
      () => this.beginTransaction(storeName).index(indexName).openCursor(),
      storeName, indexName,
    )
  }

  /** 更新数据 */
  public update(storeName: string, data: any, primaryKey?: string): Promise<any> {
    return this.setSingleReqCallback(
      ErrorCode.INDEXED_DB_UPDATE_FAILED,
      () => this.beginTransaction(storeName).put(data, primaryKey),
      storeName, data, primaryKey,
    )
  }

  /** 删除数据 */
  public delete(storeName: string, primaryKey: string): Promise<any> {
    return this.setSingleReqCallback(
      ErrorCode.INDEXED_DB_DELETE_FAILED,
      () => this.beginTransaction(storeName).delete(primaryKey),
      storeName, primaryKey,
    )
  }

  /** 获取条数 */
  public count(storeName: string): Promise<any> {
    return this.setSingleReqCallback(
      ErrorCode.INDEXED_DB_COUNT_FAILED,
      () => this.beginTransaction(storeName, "readonly").count(),
      storeName,
    )
  }

  /** 开启数据库 */
  private open(): IDBOpenDBRequest {
    const { dbName, version } = this.dbInfo!
    return this.indexedDb!.open(dbName, version)
  }

  /** 初始化数据库事件回调 */
  private initRequestHandler(): void {
    const dbReq = this.dbReq!
    dbReq.onerror = (event) => {
      throwError(ErrorCode.INDEXED_DB_CONNECT_FAILED, { data: event })
    }
    dbReq.onblocked = (event) => {
      throwError(ErrorCode.INDEXED_DB_CONNECT_BLOCKED, { data: event })
    }
    dbReq.onsuccess = (event) => {
      console.log("数据库连接成功")
      this.db = dbReq.result
      this.dbInfo!.initCb?.()
    }
    dbReq.onupgradeneeded = (event) => {
      const db: IDBDatabase = (event as any).target?.result
      const dbInfo = this.dbInfo!
      dbInfo.stores.forEach((store) => {
        const { isClear, name } = store
        if (db.objectStoreNames.contains(name)) {
          if (!isClear) { return }
          // 删除旧仓库
          db.deleteObjectStore(name)
        }
        this.createStore(store, db)
      })
    }
  }

  /** 创建仓库 */
  private createStore(store: IndexedDBStore, db: IDBDatabase = this.db!): void {
    const { name, primaryKey, indexList } = store
    const newStore = db.createObjectStore(name, { keyPath: primaryKey, autoIncrement: true })
    indexList.forEach((index) => {
      const { name: indexName, unique } = index
      newStore.createIndex(indexName, indexName, { unique })
    })
  }

  private beginTransaction(storeName: string, mode: TransactionMode = "readwrite"): IDBObjectStore {
    const transaction = this.db?.transaction(storeName, mode)

    transaction!.onerror = (event) => {
      throwError(ErrorCode.INDEXED_DB_CREATE_TRANSACTION_FAILED, { data: event })
    }
    transaction!.oncomplete = () => {
      console.log("数据库修改结束，事务完成")
    }

    return transaction!.objectStore(storeName)
  }

  private setSingleReqCallback(code: ErrorCode, getReq: () => IDBRequest<any>, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = getReq()
      req.onsuccess = (event) => {
        console.log("数据库操作成功", ...args)
        resolve(event)
      }
      req.onerror = (event) => {
        throwError(code, { data: { ...args, event } })
        reject(event)
      }
    })
  }

  private setMultipleDataReqCallBack(code: ErrorCode, getReq: () => IDBRequest<any>, ...args: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      const req = getReq()
      const res: any[] = []
      req.onsuccess = (event: any) => {
        console.log("数据库操作成功", ...args)
        const cursor = event.target.result
        if (cursor) {
          res.push({ id: cursor.key, ...cursor.value })
          cursor.continue()
        } else {
          resolve(res)
        }
      }
      req.onerror = (event) => {
        throwError(code,  { data: { ...args, event } })
        reject(event)
      }
    })
  }
}
