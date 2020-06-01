const user = require('../models/user.js');
const jwt  = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const secret = 'vue-koa-demo-kaden';//指定秘钥，这是之后用来判断token合法性的标志

const getUserInfo = function* (){
  const id = this.params.id; // 获取url里传过来的参数里的id
  const result = yield user.getUserById(id);  // 通过yield “同步”地返回查询结果
  this.body = result // 将请求的结果放到response的body里返回
}

const postUserAuth = function* (){
  const data = this.request.body;
  console.log('111',this.request)
  const userInfo = yield user.getUserByName(data.username);
  if(userInfo !=null){
    if(!bcrypt.compareSync(data.password,userInfo.password)){
      this.body = {
        success:false,
        info:"密码错误"
      }
    }else{
      const userToken = {
        name:userInfo.user_name,
        id:userInfo.id
      }
      const token = jwt.sign(userToken,secret);//签发token
      this.body={
        success:true,
        token:token
      }
    }
  }else{
    this.body={
      success:false,
      info:'用户不存在！'
    }
  }
}

const register = function* (){
  let data = this.request.body,
    userInfo = yield user.getUserByName(data.username);
  if(userInfo ==null){
    let salt = bcrypt.genSaltSync(10);
    data.password = bcrypt.hashSync(data.password, salt);
    const result = yield user.createUser(data);
    this.body = {
      success: true
    }
  }else{
    this.body={
      success:false,
      info:'用户已存在！'
    }
  }
}

module.exports = {
  getUserInfo, // 把获取用户信息的方法暴露出去
  postUserAuth,
  register
}
