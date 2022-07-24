module.exports = (sequelize, DataType, Model) => {
  class Company extends Model {}

  Company.init(
    {
      name: DataType.STRING
    },
    { sequelize, modelName: 'company', tableName: 'tb_company', timestamps: false }
  )
  // const User: any = sequelize.define('user', {
  //   username: DataType.STRING,
  //   birthday: DataType.DATE
  // })

  return Company
}
