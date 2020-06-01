<template xmlns="http://www.w3.org/1999/html">
  <div>
    <h1>vue leaning</h1>
    <p :title="message">
      1---鼠标悬停几秒钟查测看此处动态绑定的提示信息！
    </p>

    <p>2---Using v-html directive: <span v-html="rawHtml"></span><br>Using mustaches: {{ rawHtml }}</p>

    <p>3---<span v-text="rawHtml"></span></p>

    <p>4---计算属性--computed<br>
      <input v-model="message" key="message">
      计算reverseMessage->>>>:{{reverseMessage}}
    </p>

    <p>4---监听属性--watch<br>
      <input v-model="watchData" key="watchData">
      计算watchData->>>>:{{watchData}}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data() {
      return{
        message:'xuanting'+ new Date().toLocaleString(),
        rawHtml:'<span>this is html style</span>',
        watchData:'kaden'
      }
    },
    computed:{
      reverseMessage:{
        get:function () {//getter
          console.log('this is getter---')
          return this.message.split('').reverse().join(' ')
        },
        set:function(newValue){
          console.log('this is setter---',newValue)
        }
      }
      // reverseMessage:function () {
      //   return this.message.split('').reverse().join(' ')
      // }
    },
    watch:{
      watchData:function (newValue,oldValue) {
        // _.debounce(this.getAnswer, 500)
        this.message = newValue + '&';
        console.log('this is watch message--',newValue,oldValue)
      }
    },
    created(){
      this.reverseMessage = 'kaden'
    }
  }
</script>

<style scoped>

</style>
