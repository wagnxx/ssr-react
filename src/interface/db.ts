import { IDBTableName, IDBTableDetail } from '~/typings/data'
export interface IApiDbService {
  getDBTableList: () => Promise<IDBTableName>
  getDBTableDtail: (id: string) => Promise<IDBTableDetail>
  updateRowToDBTable: (tablename: string, fields: []) => Promise<boolean>
  deleteRowDBTable: (tablename: string, id: string) => Promise<boolean>
  getAssociationRowDBTable: (tablename: string, id: string) => Promise<object>
}
