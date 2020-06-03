const db = require('../config/db.js'),
  userModel = '../schema/user.js'; // 引入user的表结构
const TodolistDb = db.projectData; // 引入数据库

const User = TodolistDb.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = function* (id){ // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const userInfo = yield User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      id: id
    }
  });

  return userInfo // 返回数据
}

//通过用户名查找
const getUserByName = function* (name){ // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  console.log('name----',name)
  const userInfo = yield User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      user_name: name
    }
  });

  return userInfo // 返回数据
}

//注册
const createUser = function* (data){ // 给某个用户创建一条todolist
  console.log('register2------',data)
  yield User.create({
    user_name:data.username,
    password:data.password
  })
  return true
}
module.exports = {
  getUserById,  // 导出getUserById的方法，将会在controller里调用
  getUserByName,
  createUser
}
