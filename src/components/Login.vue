<template>
  <div class="login">
    <h1>欢迎登录</h1>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <div class="btn">
      <van-button round type="info" size="large" @click="jump(password,username)">登录</van-button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Login',
    data(){
      return {
        password:'',
        username:''
      }
    },
    methods:{
      jump:function (password,username) {
        console.log('jump--');
        if(password == '123456' && username == 'kaden'){
          this.$router.push('/todoList')
        }else{
          this.$dialog.alert({
            message: '用户名/密码不对，请重新输入！'
          });
        }

      }
    }
  }
</script>

<style scoped>
  .login{
    width: 100%;
    padding: 20px 15%;
    box-sizing: border-box;
  }
  .btn{
    margin-top: 20px;
    width: 100%;
  }
</style>
