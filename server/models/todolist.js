const db = require('../config/db'),
  todoModel = '../schema/list.js';//引入todolist的表结构
const TodolistDb = db.projectData;//引入数据库

const Todolist = TodolistDb.import(todoModel);

const getTodolistById = function* (id) {
  const todolist = yield Todolist.findAll({
    where:{
      user_id:id
    },
    attributes:['id','content','status']//只需返回这三个字段的结果即可
  });
  return todolist
}

const createTodolist = function* (data){ // 给某个用户创建一条todolist
  yield Todolist.create({
    // id:data.id,
    user_id: data.id, // 用户的id，用来确定给哪个用户创建
    content: data.content,
    status: data.status
  })
  return true
}

const removeTodolist = function* (id,user_id){
  yield Todolist.destroy({
    where: {
      id,
      user_id
    }
  })
  return true
}

const updateTodolist = function* (id,user_id,status){
  yield Todolist.update(
    {
      status
    },
    {
      where: {
        id,
        user_id
      }
    }
  )
  return true
}

module.exports = {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}

