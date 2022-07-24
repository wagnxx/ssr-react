import { Inject, Controller, Provide, Get, Post } from '@midwayjs/decorator'
import { Context } from '@midwayjs/koa'
import { IApiService, IApiDetailService, IApiDbService } from '../interface'

@Provide()
@Controller('/api')
export class Api {
  @Inject()
  ctx: Context

  @Inject('ApiService')
  service: IApiService

  @Inject('ApiDetailService')
  detailService: IApiDetailService

  @Inject('ApiDbService')
  dbService: IApiDbService

  @Get('/index')
  async getIndexData() {
    const data = await this.service.index()
    return data
  }

  @Get('/detail/:id')
  async getDetailData() {
    const { ctx, detailService } = this
    const id = ctx.params.id
    const data = await detailService.index(id)
    return data
  }

  @Get('/db/tableList')
  async getDBTableList() {
    const { dbService } = this
    const data = await dbService.getDBTableList()
    return data
  }

  @Get('/db/table/:id')
  async getDBTableDtail() {
    const id = this.ctx.params.id
    const data = await this.dbService.getDBTableDtail(id)
    return data
  }

  @Get('/db/table')
  async getDBTableDtailByName(tablenaem) {
    const data = await this.dbService.getDBTableDtail(tablenaem)
    return data
  }

  @Post('/db/table/updateRow')
  async updateTableRow() {
    const { tableName, fields } = this.ctx.request.body
    const data = await this.dbService.updateRowToDBTable(tableName, fields)
    return data
    // console.log('insert:::=======>', tableName, fields)
  }

  @Post('/db/table/delete')
  async deleteTableRow() {
    const { tableName, id } = this.ctx.request.body
    const data = await this.dbService.deleteRowDBTable(tableName, id)
    return data
    // console.log('insert:::=======>', tableName, fields)
  }

  @Post('/db/table/assoiationRow')
  async getTableAssoiationRow() {
    const { source, target } = this.ctx.request.body
    const data = await this.dbService.getAssociationRowDBTable(source, target)
    return data
    // console.log('insert:::=======>', tableName, fields)
  }

}

// import { Inject, Controller, Provide, Get, Post } from '@midwayjs/decorator'
// import { Context } from 'egg'
// // import { IApiDbService } from '../interface'
// import { IApiDbService } from '@/interface/db'

// @Provide()
// @Controller('/api')
// export class Api {
//   @Inject()
//   ctx: Context

//   @Inject('ApiDbService')
//   dbService: IApiDbService

//   @Get('/db/tableList')
//   async getDBTableList() {
//     const { dbService } = this
//     const data = await dbService.getDBTableList()
//     return data
//   }

//   @Get('/db/table/:id')
//   async getDBTableDtail() {
//     const id = this.ctx.params.id
//     const data = await this.dbService.getDBTableDtail(id)
//     return data
//   }

//   @Get('/db/table')
//   async getDBTableDtailByName(tablenaem) {
//     const data = await this.dbService.getDBTableDtail(tablenaem)
//     return data
//   }

//   @Post('/db/table/insert')
//   async insetTable() {
//     const { tableName, fields } = this.ctx.request.body
//     const data = await this.dbService.insertRowToDBTable(tableName, fields)
//     return data
//     // console.log('insert:::=======>', tableName, fields)
//   }
// }
