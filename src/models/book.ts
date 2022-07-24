module.exports = (sequelize, DataType, Model) => {
  class Book extends Model {}

  Book.init(
    {
      username: DataType.STRING,
      birthday: DataType.STRING
    },
    { sequelize, modelName: 'book', tableName: 'tb_book', timestamps: false }
  )
  // const User: any = sequelize.define('user', {
  //   username: DataType.STRING,
  //   birthday: DataType.DATE
  // })

  return Book
}
