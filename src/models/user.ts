import { Model } from 'sequelize'

module.exports = (sequelize, DataType, Model) => {
  class User extends Model {}

  User.init(
    {
      username: DataType.STRING,
      birthday: DataType.STRING
    },
    // { sequelize, modelName: 'tb_user' }
    { sequelize, modelName: 'user', tableName: 'tb_user', timestamps: false }
  )
  // const User: any = sequelize.define('user', {
  //   username: DataType.STRING,
  //   birthday: DataType.DATE
  // })

  return User
}
