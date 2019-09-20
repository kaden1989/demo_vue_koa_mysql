<template>
  <div>
    dfafdafafsdf
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
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button round type="info">登录</van-button>
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
    }
  }
</script>

<style scoped>

</style>
