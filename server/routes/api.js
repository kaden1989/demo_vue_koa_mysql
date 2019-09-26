const todolist = require('../controllers/todolist');
const router = require('koa-router')();

// todolist(router);
router.get('/todolist/:id',todolist.getTodolist)
  .post('/createlist',todolist.createTodolist)
  .post('/updataTodolist/',todolist.updateTodolist)
  .post('/delTodolist/',todolist.removeTodolist);

module.exports = router;
