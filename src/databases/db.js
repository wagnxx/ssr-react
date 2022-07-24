// const { Sequelize, Model, DataTypes } = require('sequelize')
// const sequelize = new Sequelize('sqlite:memo', {
//   define: {
//     freezeTableName: true
//   }
// })

// class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     birthday: DataTypes.STRING
//   },
//   { sequelize, modelName: 'book', tableName: 'tb_book' }
// )
// ;(async () => {
//   await sequelize.sync()

//   const jane2 = await User.create({
//     username: 'jandoe-2',
//     birthday: '2022-04-02'
//   })
//   var janea = await User.findAll()
//   console.log(janea)
// })()

// class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     birthday: DataTypes.DATE
//   },
//   { sequelize, modelName: 'user' }
// )
// class Profile extends Model {}
// Profile.init(
//   {
//     name: DataTypes.STRING
//   },
//   { sequelize, modelName: 'profile' }
// )

// User.belongsToMany(Profile, { through: 'User_Profile' })
// Profile.belongsToMany(User, { through: 'User_Profile' })
// ;(async () => {
//   // await sequelize.sync()
//   // const jane = await User.create({
//   //   username: 'jandoe',
//   //   birthday: new Date(1980, 6, 20)
//   // })
//   // const jane2 = await User.create({
//   //   username: 'jandoe-2',
//   //   birthday: new Date(1980, 8, 20)
//   // })
//   // var janea = await User.findAll({
//   //   raw: true
//   // })
//   // console.log(janea)

//   // const models = await sequelize.getQueryInterface()
//   const models = await sequelize.getQueryInterface().showAllSchemas()
//   console.log(models)

//   // const user = await User.create({
//   //   username: 'jandoe_hasProfile',
//   //   birthday: new Date(1980, 6, 10)
//   // })
//   // const queen = await Profile.create({ name: 'Queen' })

//   // user.addProfile(queen)

//   // const result = await User.findAndCountAll({
//   //   attributes: ['id', 'username'],
//   //   raw: true,
//   //   // include: [Profile],
//   //   nest: true
//   // })
//   // console.log(result)
//   // for (const u in User.prototype) {
//   //   if (u.includes('get')) {
//   //     console.log('--', u)

//   //   }
//   // }
// })()

// const db = {}

// db.sequelize = sequelize
