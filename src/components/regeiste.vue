<template>
  <div class="login">
    <h1>用户注册</h1>
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
      <van-button round type="info" size="large" @click="register">注册</van-button>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'Registe',
    data(){
      return {
        password:'',
        username:''
      }
    },
    methods:{
      register:function () {
        let userData = {
          username:this.username,
          password:this.password
        }

        this.$http.post('/auth/register',userData)
          .then(res=>{
            if(res.data.success){
              this.$notify({ type: 'success', message: "register Success !" });
              this.$router.push('/')
            }else{
              this.$notify({ type: 'warning', message: res.data.info });
            }
          },err=>{
            this.$notify({ type: 'warning', message: '请求错误!' });
          })
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
