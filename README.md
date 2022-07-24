# 官方文档

官方文档请查看 [http://doc.ssr-fc.com/](http://doc.ssr-fc.com/)

## getting start

```bash
$ npm start # 本地开发模式运行，单进程 支持 前端 HMR 前端静态资源走本地 webpack 服务
$ npm run prod # 模拟生产环境运行，多进程，前端资源走静态目录
$ npm run stop # 生产环境停止服务
```


### 项目简介

该项目实现对数据库 sqlite 的 web 版本基本操作，整体架构由 ssr midway --react 实现， 数据库操作由 sequilize orm 方式执行

### sequelize 基础：

1. 模型查找

```js
// findAll
// findByPk 方法使用提供的主键从表中仅获得一个条目
const project = await Project.findByPk(123)
// findOne 方法获得它找到的第一个条目(它可以满足提供的可选查询参数).
const project = await Project.findOne({ where: { title: 'My Title' } })
if (project === null) {
  console.log('Not found!')
} else {
  console.log(project instanceof Project) // true
  console.log(project.title) // 'My Title'
}

// findOrCreate ,查询有则返回，没则创建并返回
const [user, created] = await User.findOrCreate({
  where: { username: 'sdepold' },
  defaults: {
    job: 'Technical Lead JavaScript'
  }
})

// findAndCountAll
// 没有group时count是一个整数
// 有group时count是一个数组对象 - 包含每组中的合计和预设属性
const { count, rows } = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
})
```

2. 虚拟字段

```js
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  firstName: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`
    },
    set(value) {
      throw new Error('不要尝试设置 `fullName` 的值!')
    }
  }
})
```

3. 作用域
   作用域适用于 .find, .findAll, .count, .update, .increment 和 .destroy.

```js
class Project extends Model {}
Project.init({
  // 属性
}, {
  defaultScope: {
    where: {
      active: true
    }
  },
  scopes: {
    deleted: {
      where: {
        deleted: true
      }
    },
    activeUsers: {
      include: [
        { model: User, where: { active: true } }
      ]
    },
    random() {
      return {
        where: {
          someNumber: Math.random()
        }
      }
    },
    accessLevel(value) {
      return {
        where: {
          accessLevel: {
            [Op.gte]: value
          }
        }
      }
    },
    sequelize,
    modelName: 'project'
  }
});


// Project.findAll() 默认作用域
SELECT * FROM projects WHERE active = true
// 自定义作用域 await Project.scope('deleted').findAll()
SELECT * FROM project WHERE deleted = true

// 上例中定义的 `activeUsers` 作用域也可以通过以下方式定义：
Project.addScope('activeUsers', {
  include: [
    { model: User.scope('active') }
  ]
});

// 链式调用
const DeletedProjects = Project.scope('deleted');
await DeletedProjects.findAll();

// 以上相当于:
await Project.findAll({
  where: {
    deleted: true
  }
});


// 合并
// 这两个是等效的
await Project.scope('deleted', 'activeUsers').findAll();
await Project.scope(['deleted', 'activeUsers']).findAll();
// sql:
SELECT × FROM projects
INNER JOIN users ON projects.userId = users.id
WHERE project.deleted = true
AND users.active = true

// 因此，默认作用域不想被覆盖的话要加进去
await Project.scope('defaultScope', 'deleted').findAll();
SELECT * FROM projects WHERE active = true AND deleted = true

// 合并会导致后面的键覆盖前面的 （where，include除外）
YourMode.addScope('scope1', {
  where: {
    firstName: 'bob',
    age: {
      [Op.gt]: 20
    }
  },
  limit: 2
});
YourMode.addScope('scope2', {
  where: {
    age: {
      [Op.gt]: 30
    }
  },
  limit: 10
});
// .scope('scope1', 'scope2') 会产生
WHERE firstName = 'bob' AND age > 30 LIMIT 10

```
4. 关联
Sequelize 支持标准关联关系: 一对一, 一对多 和 多对多.
为此,Sequelize 提供了 四种 关联类型,并将它们组合起来以创建关联：

- HasOne 关联类型 / BelongsTo 关联类型
```js
// 方法 1
Foo.hasOne(Bar, {
  foreignKey: 'myFooId'
});
Bar.belongsTo(Foo);

// 方法 2
Foo.hasOne(Bar, {
  foreignKey: {
    name: 'myFooId'
  }
});
Bar.belongsTo(Foo);

// 方法 3
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: 'myFooId'
});

// 方法 4
Foo.hasOne(Bar);
Bar.belongsTo(Foo, {
  foreignKey: {
    name: 'myFooId'
  }
});

```
- HasMany 关联类型 
```js
Team.hasMany(Player);
Player.belongsTo(Team);
```
- BelongsToMany 关联类型













### pending task
- drag
- video (like youtube)