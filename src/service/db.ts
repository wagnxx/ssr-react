import { Provide } from '@midwayjs/decorator'
import { IDBTableName, IDBTableDetail } from '~/typings/data'
import { IApiDbService } from '~src/interface/db'
import Utils from '~src/utils/Utils'
const db = require('../models')
const modelSchemaStack = db.modelSchemaStack

@Provide('ApiDbService')
export class ApiDbService implements IApiDbService {

  async getAssociationRowDBTable(sourceTable: string, targetSource: string): Promise<object> {
    if (!sourceTable || !targetSource) return null

    try {
      const sourceModel = Utils.findBy(modelSchemaStack, 'tableName', sourceTable).model
      const targetModel = Utils.findBy(modelSchemaStack, 'tableName', targetSource).model
      const result = await sourceModel.findAndCountAll({
        nest: true, include: targetModel
      })

      // console.log('row from destroy:::::::::::::::::===================>>>>>>>>>>>>>>>:::::::', row)
      return result
    } catch (error) {
      console.error(error)
      return null
    }
  }

  async deleteRowDBTable(tableName: string, id: string): Promise<boolean> {
    if (!tableName || !id) return false

    try {
      const model = Utils.findBy(modelSchemaStack, 'tableName', tableName).model
      const row = await model.destroy({
        where: {
          id
        }
      })
      // console.log('row from destroy:::::::::::::::::===================>>>>>>>>>>>>>>>:::::::', row)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  async updateRowToDBTable(tableName, fields): Promise<boolean> {
    try {
      const model = Utils.findBy(modelSchemaStack, 'tableName', tableName).model
      const rowId = fields.id
      let row = null
      if (rowId) {
        row = await model.update(fields, {
          where: {
            id: rowId
          }
        })
        // console.log('row from findByPk:::::::::::::::::===================>>>>>>>>>>>>>>>:::::::', row)
      } else {

        row = await model.create(fields)
      }
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  // insertRowToDBTabl
  async getDBTableDtail(tableName: string): Promise<IDBTableDetail> {
    const result = Utils.findBy(modelSchemaStack, 'tableName', tableName)
    var fieldRawAttributesMap = result.model.fieldRawAttributesMap
    console.log('result', result)
    for (const k in fieldRawAttributesMap) {
      if (fieldRawAttributesMap.hasOwnProperty(k)) {
        const value = fieldRawAttributesMap[k]
        const typeOption = value.type
        const typeOriginName = typeOption.constructor.name || 'UNKNOW'
        // console.log('typeOption::====>', typeOption.constructor.name)
        value.type = typeOriginName
      }
    }

    const fieldsAttr = Object.values(fieldRawAttributesMap)

    const alltypes = db.alltypes

    const filterAttr = fieldsAttr
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      .filter((item: any) => item?.field)
      .map((item: any) => item.field)

    console.log('filterAttr', filterAttr)

    const dataList = await result.model.findAll({
      // attributes: {
      //   exclude: ['createdAt', 'updatedAt']
      // }
      // raw: true
    })
    console.log('dataList  result=======>  ', dataList)

    return {
      ...result,
      fieldsMap: fieldRawAttributesMap,
      fieldsAttr,
      alltypes,
      dataList
    }
  }

  /**
   tools func
   */
  async getDBTableList(): Promise<IDBTableName> {
    try {
      // console.log('model.rawAttributes ===> ', db.sequelize.getDatabaseName())
      // db.sequelize.showAllSchemas().then((a) => {
      //   console.log('=====================:::', a)
      // log::
      //   =====================::: [
      //     { name: 'users' },
      //     { name: 'books' },
      //     { name: 'book' },
      //     { name: 'user' }
      //   ]
      // })
      // const a = await db.sequelize.showAllSchemas()

      // Object.values(allSchemas).forEach(schema => {

      //   console.log('model.name=====', db['user'].schema('users'))
      // })

      // const ins = await db.sequelize.models

      // console.log('ins ========>>>>>', a)

      const allSchemas = await db.sequelize.getQueryInterface().showAllSchemas()
      // console.log('model.rawAttributes ===> ', db['user'].rawAttributes)
      // const bookSchema = db.modelSchemaStack[0]
      // console.log('modelSchemaStack ========> ', Object.entries(bookSchema))
      // console.log('db.modelSchemaMap ::: ====>>> ', db.modelSchemaMap)
      return { data: allSchemas }
    } catch (error) {
      // error
      return { data: [] }
    }
  }
}
