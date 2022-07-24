module.exports = (sequelize, DataType, Model) => {
  class Player extends Model {}

  Player.init(
    {
      name: DataType.STRING

    },
    {
      sequelize,
      modelName: 'player',
      tableName: 'tb_player',
      timestamps: true,
      createdAt: false,
      updatedAt: false
    }
  )
  // const User: any = sequelize.define('user', {
  //   username: DataType.STRING,
  //   birthday: DataType.DATE
  // })

  return Player
}
