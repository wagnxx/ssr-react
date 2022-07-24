const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize('sqlite:./test.db', {
  define: {
    freezeTableName: true
  }
})

// class User extends Model {}

// User.init(
//   {
//     username: DataTypes.STRING,
//     birthday: DataTypes.STRING
//   },
//   { sequelize, modelName: 'book', tableName: 'tb_book' }
// )
// const Team = sequelize.define('Team' /* ... */)
// const Player = sequelize.define('Player' /* ... */)
// Team.hasMany(Player)
// Player.belongsTo(Team)
const User = sequelize.define('user', { name: DataTypes.STRING }, { timestamps: false })
// const Task = sequelize.define('task', { name: DataTypes.STRING }, { timestamps: false })
// const Tool = sequelize.define('tool', {
//   name: DataTypes.STRING,
//   size: DataTypes.STRING
// }, { timestamps: false })
// User.hasMany(Task)
// Task.belongsTo(User)
// User.hasMany(Tool, { as: 'Instruments' })
/**
|--------------------------------------------------
| scedule sequelize
|--------------------------------------------------
*/

;(async () => {

  // await sequelize.drop()
  await sequelize.sync()
  // await User.create({ name: 'wang' })
  // await User.create({ name: 'wang2' })
  // await Task.create({ name: 'task1', userId: 1 })
  const users = await User.findAll({ nest: true })
  console.log('users', users)
  // console.log('tasks', tasks)
  // await Player.create({ TeamId: 1 })
  // const team = await Team.findAll({ raw: true, nest: false, include: Player })
  // const coposite = await team.getPlayers({ raw: true })
  // console.log('team', team)

})()

/**
 *

  const users = await User.findAll({ raw: false, nest: true, include: Task })
  const tasks = await Task.findAll({ raw: false, nest: true, include: User })
  console.log(JSON.stringify(users, null, 2))
  console.log(JSON.stringify(tasks, null, 2))
================================ raw:false =============================
   users
  [
    {
      "id": 1,
      "name": "wang",
      "tasks": [
        {
          "id": 1,
          "name": "task1",
          "userId": 1
        }
      ]
    }
  ]
  tasks
  [
    {
      "id": 1,
      "name": "task1",
      "userId": 1,
      "user": {
        "id": 1,
        "name": "wang"
      }
    }
  ]

 ================================ raw:true =============================
 users
 [
  {
    "id": 1,
    "name": "wang",
    "tasks": {
      "id": 1,
      "name": "task1",
      "userId": 1
    }
  }
]
tasks
[
  {
    "id": 1,
    "name": "task1",
    "userId": 1,
    "user": {
      "id": 1,
      "name": "wang"
    }
  }
]

 */
