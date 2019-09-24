<template>
  <div>
    <span>欢迎：{{name}}！你的待办事项是：</span>
    <van-cell-group>
      <van-field
        v-model="todoMessage"
        type="textarea"
        placeholder="请输入待办事项"
        rows="1"
        autosize
        clearable
      >
      <van-button slot="button"  type="info" @click="inputThing">添加</van-button>
      </van-field>
    </van-cell-group>

    <van-tabs v-model="active" swipeable border>
      <van-tab v-for="(items,indexs) in listData" :key="indexs" :title="indexs == 0?'待办事项':'已完成事项'">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
        >
          <van-cell
            v-for="(item,index) in items"
            :key="index"
            :title="item.message"
          >
            <div slot="default">
              <div v-if="indexs == 0">
                <van-button  type="info" @click="finishThing(index)">完成</van-button>
                <van-button  type="default" @click="deleteThing(index)">删除</van-button>
              </div>
              <div v-else>
                <van-button  type="info" @click="returnThing(index)">还原</van-button>
              </div>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
  export default {
    name: 'TodoList',
    data(){
      return {
        name:'kaden',
        todoMessage:'',
        active:0,
        loading: false,
        finished: true,
        listData:[
          [
            {
              message:'去吃饭'
            },
            {
              message:'看电影'
            },
          ],[]
        ]
      }
    },
    methods: {
      onLoad(index) {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.listData[index].push(this.listData[index].length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.listData[index].length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      inputThing(e){
        console.log('---',this.todoMessage,'2-',e.value)
        if(this.todoMessage){
          this.listData[0].push({
            message:this.todoMessage
          });
          this.todoMessage = '';
          this.$dialog.alert({
            message: '已添加待办事项'
          });
        }else{
          this.$dialog.alert({
            message: '请先输入需要待办的事项'
          });
        }

      },
      finishThing(index){
        console.log('finish---',index);
        this.listData[1].push({
          message:this.listData[0][index].message
        });
        this.listData[0].splice(index,1);
        this.$dialog.alert({
          message: '完成任务'
        })
      },
      deleteThing(index){
        console.log('delete---',index);
        this.listData[0].splice(index,1);
        this.$dialog.alert({
          message: '任务删除'
        })
      },
      returnThing(index){
        console.log('returnThing---',index);
        this.listData[0].push({
          message:this.listData[1][index].message
        });
        this.listData[1].splice(index,1);
        this.$dialog.alert({
          message: '还原任务'
        })
      }
    }
  }
</script>

<style scoped>

</style>
