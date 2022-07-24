// IApiDbService
export interface IDBTableName {
  data: IItemTableName[]
}
export interface IItemTableName {
  name: string
  active?: boolean
}

export interface IDBTableDetail {
  tableName: string
  moduleName: string
  fields: object
  model?: object
}
