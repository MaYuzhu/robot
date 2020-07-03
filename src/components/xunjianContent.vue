<template>
	<div class="xunjian_wrap">
    <div>
      <p><span>巡检任务名称：</span><span>{{taskInfo.name}}</span></p>
      <p><span></span><span></span></p>
      <p><span>任务状态：</span><span>{{taskStatusFun(taskInfo.taskStatus)}}</span></p>
    </div>
    <div>
      <p><span>巡检点总数:</span><span>{{taskInfo.pointTotal}}</span></p>
      <p><span>异常巡检点数:</span><span>{{taskInfo.abnormalPointNum}}</span></p>
      <p><span>当前巡检点:</span><span>{{taskInfo.currentPoint?taskInfo.currentPoint.name:''}}</span></p>
    </div>
    <div>
      <p><span>预计巡检时间:</span><span>{{taskInfo.totalRunTime}}</span></p>
      <p><span>巡检进度:</span><span>{{taskInfo.passPointNum?Math.round(taskInfo.passPointNum/taskInfo.pointTotal*100)+'%':''}}</span></p>
      <p><span>已巡检点数:</span><span>{{taskInfo.passPointNum}}</span></p>
      <!--<p><span>巡检进度:</span><span>{{Math.round(0.953/5*100)+'%'}}</span></p>-->
    </div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
        //taskInfo:{}
      }
    },
		props:['taskInfo'],
    mounted(){

    },
    methods:{
      taskStatusFun(val){
        let status = ''
        switch (val){
          case 0:
            status = '已执行'
            break
          case 1:
            status = '终止'
            break
          case 2:
            status = '暂停'
            break
          case 3:
            status = '正在执行'
            break
          case 4:
            status = '未执行'
            break
          case 5:
            status = '超期'
            break
          case 6:
            status = '预执行'
            break
        }
        return status
      },
    },
    watch:{
      taskInfo:{
        handler(n,o){

        },
        deep: true
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .xunjian_wrap
    >div
      display flex
      justify-content space-around
      background #e3f2ee
      padding 8px
      overflow hidden
      box-sizing border-box
    >:nth-child(1)
      >p
        float left
        width 33%
        margin 0px
        box-sizing border-box
    >:nth-child(2),:nth-child(3)
      >p
        float left
        width 33%
        margin 0px
        box-sizing border-box

</style>
