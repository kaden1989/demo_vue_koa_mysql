<template>
  <div>
    <span>欢迎：{{name}}！你的待办事项是：</span>
<!--      <van-cell-group">-->
<!--        <van-field-->
<!--          v-model="itme.message"-->
<!--          label="'待办事项'+index"-->
<!--          type="textarea"-->
<!--          placeholder="请输入留言"-->
<!--          rows="1"-->
<!--          autosize-->
<!--        />-->
<!--      </van-cell-group>-->
  </div>
</template>

<script>
  export default {
    name: 'TodoList',
    data(){
      return {
        name:'kaden',
        listData:[
          {
            message:'去吃饭'
          },
          {
            message:'看电影'
          },
        ]
      }
    }
  }
</script>

<style scoped>

</style>
