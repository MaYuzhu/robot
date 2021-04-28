<template>
	<div class="xunjian_wrap">
    <!--<div>{{taskInfo}}</div>-->
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
      <p><span>预计巡检时间:</span><span>{{timeFormatter(taskInfo.totalRunTime)}}</span></p><!--timeFormatter--><!--taskInfo.totalRunTime-->
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

      }
    },
		props:['taskInfo'],

    mounted(){
      //console.log(this.taskInfo)
    },
    methods:{
      taskStatusFun(val){
        let status = ''
        switch (val){
          case 0:
            status = '已执行'
            break
          case 1:
            status = '正在执行'
            break
          case 2:
            status = '暂停'
            break
          case 3:
            status = '继续'
            break
          case 4:
            status = '完成'  //清除
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

      //秒转时间
      timeFormatter(duration) {
        //console.log(duration)
        let result
        if(!duration){
          result = ''
          return result;
        }
        let secondTime = parseInt(duration);// 秒
        let minuteTime = 0;// 分
        let hourTime = 0;// 小时
        if (secondTime > 60) { // 如果秒数大于60，将秒数转换成整数
          // 获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60);
          // 获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60)
          // 如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
            // 获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            // 获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
          }
        }
        result = secondTime > 9 ? secondTime : ('0' + secondTime);
        if (minuteTime > 0) {
          result = (minuteTime > 9 ? minuteTime : ('0' + minuteTime)) + "分钟" + result + '秒';
        } else {
          result = "00" + "分钟" + result + '秒';
        }
        if (hourTime > 0) {
          result = (hourTime > 9 ? hourTime : (hourTime)) + "小时" + result;
        } else {
          //result = "00" + "小时" + result;
        }
        return result;
      }
    },
    watch:{
      taskInfo:{
        handler(n,o){
          //console.log(n)
        },
        deep: true,
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
