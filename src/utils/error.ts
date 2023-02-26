/* 错误类型 */
export const enum ErrorCode {
  /* JSON解析错误 */
  JSON_PARSE_ERROR = 1000,

  /**
   * IndexedDB
   */
  /* 浏览器不支持IndexedDB */
  INDEXEDDB_NOT_SUPPORT = 2000,
  /* 添加单条数据失败 */
  INDEXEDDB_ADD_SINGLE_FAILED = 2001,
  /* 获取单条数据失败 */
  INDEXEDDB_GET_SINGLE_FAILED = 2002,
  /* 获取所有数据失败 */
  INDEXEDDB_GET_ALL_FAILED = 2003,
  /* 根据索引获取数据失败 */
  INDEXEDDB_GET_BY_INDEX_FAILED = 2004,
  /* 更新数据失败 */
  INDEXEDDB_UPDATE_FAILED = 2005,
  /* 删除数据失败 */
  INDEXEDDB_DELETE_FAILED = 2006,
  /* 获取总条数失败 */
  INDEXEDDB_COUNT_FAILED = 2007,
  /* 数据库连接失败 */
  INDEXEDDB_CONNECT_FAILED = 2008,
  /* 数据库连接被阻止 */
  INDEXEDDB_CONNECT_BLOCKED = 2009,
  /* 创建事务失败 */
  INDEXEDDB_CREATE_TRANSACTION_FAILED = 2010,
}

interface IErrorDetail {
  /* 错误描述 */
  describe?: string
  /* 造成该错误时所处理的数据 */
  data?: object
}

/**
 * 抛出错误
 * @param code 错误代码
 * @param detail 错误详情
 */
export function throwError(code: ErrorCode, detail: IErrorDetail = {}): void {
  console.error(`Error Code: ${code}`, detail)
}