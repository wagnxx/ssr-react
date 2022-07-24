'use strict'

import Utils from '../utils/Utils'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
const config = require(path.join(__dirname, '/../config/config.json'))[env]
const db: any = {
  modelSchemaStack: []
}

let sequelizeInst
if (config.use_env_variable) {
  sequelizeInst = new Sequelize(process.env[config.use_env_variable], config)
} else {
  const unionConfig = {
    ...config,
    define: {
      freezeTableName: true
    }
  }

  sequelizeInst = new Sequelize(
    config.database,
    // 'sqlite:table_ssr.db',
    config.username,
    config.password,
    unionConfig
  )
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelizeInst,
      Sequelize.DataTypes,
      Sequelize.Model
    )

    // console.log('All attributes::: =====>>>>', model)
    db[model.name] = model

    const singleMap = {
      tableName: model.tableName,
      modelName: model.name,
      model: model
    }
    db.modelSchemaStack.push(singleMap)
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelizeInst
db.alltypes = Object.keys(Sequelize.DataTypes.sqlite)
db.dealAsociation = dealAsociation
module.exports = db

/**
   * =====================================================================================================
   *  Model association settings
   * =====================================================================================================
   */
async function dealAsociation() {
  // const tarModel = db.modelSchemaStack.find(item => item.modelName === 'Team')
  const Team = Utils.findBy(db.modelSchemaStack, 'tableName', 'tb_team').model
  const Company = Utils.findBy(db.modelSchemaStack, 'tableName', 'tb_company').model
  const Player = Utils.findBy(db.modelSchemaStack, 'tableName', 'tb_player').model
  Company.hasMany(Team)
  Team.hasMany(Player)
  Team.belongsTo(Company, { foreignKey: 'companyId' })
  Player.belongsTo(Team, { foreignKey: 'teamId' })
}
