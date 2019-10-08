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
      <van-button class="LR" plain round type="info" size="normal" @click="register">注册</van-button>
      <van-button class="LR" round type="info" size="normal" @click="login" style="margin-left: auto">登录</van-button>
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
      login:function () {
        let userData = {
          username:this.username,
          password:this.password
        }

        this.$http.post('/auth/user',userData)
          .then(res=>{
            if(res.data.success){
              sessionStorage.setItem('demo-token',res.data.token)//
              this.$notify({ type: 'success', message: "Login Success !" });
              this.$router.push('/todoList')
              console.log('chenggong')
            }else{
              sessionStorage.setItem('demo-token',null)
              this.$notify({ type: 'warning', message: res.data.info });
            }
          },err=>{
            sessionStorage.setItem('demo-token',null)
            this.$notify({ type: 'warning', message: '请求错误!' });
          })
      },
      register:function () {
        this.$router.push('/regeiste')
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
    display: flex;
  }
  .LR{
    width: 45%;
  }
</style>
