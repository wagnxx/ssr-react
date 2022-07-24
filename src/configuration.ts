import { Configuration, App } from '@midwayjs/decorator'
import * as koa from '@midwayjs/koa'
import { join } from 'path'
import { initialSSRDevProxy, getCwd } from 'ssr-server-utils'
import Utils from './utils/Utils'
import { json } from 'sequelize/types'

const db = require('./models')

const koaStatic = require('koa-static-cache')
const cwd = getCwd()

@Configuration({
  imports: [
    koa
  ],
  importConfigs: [join(__dirname, './config')]
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application

  async onReady () {
    this.app.use(koaStatic(join(cwd, './build')))
    this.app.use(koaStatic(join(cwd, './public')))
    this.app.use(koaStatic(join(cwd, './build/client')))
    await initialSSRDevProxy(this.app)
    this.initSQL()
  }

  async initSQL() {
    const models = await db.sequelize.getQueryInterface().showAllSchemas()
    console.log('App Start:::::   modelSchemaStack', db.modelSchemaStack)
    // db.sequelize.drop()
    // console.log('所有表已删除!')
    await db.dealAsociation()
    await db.sequelize.sync()
    // const Team = db['team']
    // const Player = db['player']
    // const Player1 = Utils.findBy(db.modelSchemaStack, 'tableName', 'tb_player').model
    // const team = await Team.findAll({ include: Player })
    // console.log('team', team)
    // console.log('Player === Player1:::::::::::::::::', Player === Player1)
    // const someTableResult = await db.modelSchemaStack[0].model.findAll({raw: true})
    // const someTableResult1 = await db.modelSchemaStack[1].model.findAll({
    //   attributes: ['id', 'username']
    // })
    // console.log('someTableResult1', someTableResult1)
    // console.log('someTableResult', someTableResult)
  }
}
