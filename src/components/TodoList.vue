<template>
  <div>
    <p class="title">欢迎：{{name}}！你的待办事项是：</p>
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="todoMessage"
          type="textarea"
          label="新增待办事项"
          placeholder="请输入待办事项"
          rows="1"
          autosize
          clearable
          label-width = "130px"
          left-icon="todo-list-o"
          class= "van-ellipsis inputTodo"
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
            @load="getList"
          >
            <van-cell
              v-for="(item,index) in items"
              :key="index"
              :title="item.content"
            >
              <div slot="default">
                <div v-if="indexs == 0">
                  <van-button  type="info" @click="finishThing(index,false)">完成</van-button>
                  <van-button  type="default" @click="deleteThing(index)">删除</van-button>
                </div>
                <div v-else>
                  <van-button  type="info" @click="finishThing(index,true)">还原</van-button>
                </div>
              </div>
            </van-cell>
          </van-list>
        </van-tab>
      </van-tabs>
    </div>
    <Logout></Logout>

  </div>
</template>

<script>
  import jwt from 'jsonwebtoken'
  import Logout from './Logout'

  export default {
    name: 'TodoList',
    components: {Logout},
    created(){
      const userInfo = this.getUserInfo();
      if(userInfo != null){
        this.id = userInfo.id;
        this.name = userInfo.name;
        this.getList();
      }else{
        this.id = '';
        this.name = '';
      }
    },
    data(){
      return {
        name:'',
        id:'',
        todoMessage:'',
        active:0,
        loading: false,
        finished: true,
        listData:[
          [],[]
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
      getList(){
        this.$http.get('/api/todolist/'+this.id)
          .then((res=>{
            if(res.status == 200){
              let arr1 = [],arr2 = [];
              res.data.forEach(item=>{
                if(!item.status){
                  arr1.push(item);
                }else {
                  arr2.push(item)
                }
              })
              this.$set(this.listData,0,arr1);
              this.$set(this.listData,1,arr2)
            }else {
              console.log('获取失败---',res)
              this.$notify({ type: 'warning', message: '获取失败!' });
            }
          }),(err=>{
            console.log('获取失败---',err)
            this.$notify({ type: 'warning', message: '获取失败!' });
          }))
      },
      inputThing(){
        if(this.todoMessage){
          let obj={
            status:false,
            content:this.todoMessage,
            id:this.id
          }
          this.$http.post('/api/createlist',obj)
            .then((res=>{
              if(res.status == 200){
                this.listData[0].push({
                  message:this.todoMessage
                });
                this.getList();
                this.todoMessage = '';
                this.$notify({ type: 'primary', message: '已添加待办事项!' });
              }else {
                console.log('添加失败---',res)
                this.$notify({ type: 'warning', message: '添加失败!' });
              }
            }),(err=>{
              console.log('添加失败---',err)
              this.$notify({ type: 'warning', message: '添加失败!' });
            }))
        }else{
          this.$notify({ type: 'warning', message: '请先输入需要待办的事项!' });
        }

      },
      finishThing(index,flag){
        let x = flag ? 1 : 0;
        let data = {
          id :this.listData[x][index].id,
          userId:this.id,
          status:this.listData[x][index].status
        },self = this;
        this.$http.post('/api/updataTodolist',data)
          .then(res=>{
            self.getList();
            // this.listData[1].push(this.listData[0][index]);
            // this.$set(this.listData,1,this.listData[1]);
            // this.listData[0].splice(index,1);
            self.$notify({ type: 'primary', message: '完成任务!' });
          },err=>{
            self.$notify({ type: 'warning', message: '接口出错!' });
          })

      },
      deleteThing(index){
        let self = this,
        data={
          id:this.listData[0][index].id,
          userId: this.id
        };
        this.$http.post('/api/delTodolist/',data)
          .then((res=>{
            if(res.status == 200){
              self.getList()
              self.$notify({ type: 'primary', message: '任务删除!' });
            }else {
              console.log('删除失败---',res)
              self.$notify({ type: 'warning', message: '获取失败!' });
            }
          }),(err=>{
            console.log('删除失败---',err)
            self.$notify({ type: 'warning', message: '删除失败!' });
          }))
      },
      getUserInfo(){
        const token = sessionStorage.getItem('demo-token');
        if(token != null && token != 'null'){
          let decode = jwt.decode(token); // 解析token
          return decode // decode解析出来实际上就是{name: XXX,id: XXX}
        }else {
          return null
        }
      }
    }
  }
</script>

<style scoped>
  .title{
    text-align: center;
    font-size: 18px;
  }
  .content{
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .inputTodo{
    align-items: center;
    font-size: 16px;
  }
  .van-field__left-icon i{
    font-size: 28px;
  }
</style>
