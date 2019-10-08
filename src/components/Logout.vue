<template>
  <div class="btn">
    <van-button round type="info" size="large" @click="Logout">注销</van-button>
  </div>
</template>

<script>
  export default {
    name: 'Logout',
    methods:{
      Logout:function () {
        if(sessionStorage.getItem('demo-token')){
          sessionStorage.removeItem('demo-token')
          this.$toast.success('注销成功');
          this.$router.push('/')
        }
      }
    }
  }
</script>

<style scoped>

</style>
