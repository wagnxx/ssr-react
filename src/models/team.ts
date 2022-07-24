module.exports = (sequelize, DataType, Model) => {
  class Team extends Model {}

  Team.init(
    {
      name: DataType.STRING
    },
    { sequelize, modelName: 'team', tableName: 'tb_team', timestamps: false }
  )
  // const User: any = sequelize.define('user', {
  //   username: DataType.STRING,
  //   birthday: DataType.DATE
  // })

  return Team
}
