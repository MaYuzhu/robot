<template>
  <div class="monitoring_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="left" style="width: 65%;">
        <div style="background:lavender">
          <XunjianContent :taskInfo="taskInfo"></XunjianContent>
        </div>
        <taskControl></taskControl>
      </div>
      <div class="right" style="width: 35%">
        <div class="right_top">

        </div>
        <div class="right_bottom">
          <!--<Button @click="red_pic">红外</Button>-->
          <!--<img id="chatterMessage" :src="src" style="width: 100%;height: 100%" alt="">-->
        </div>
      </div>
    </div>


    <TabsBottom class="tabs_bottom"></TabsBottom>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'

  export default {
    data(){
      return{
        title:'巡检监控 > 巡检监控',
        taskInfo:{},
        robotId:'',
      }
    },

    mounted(){
    	let _this = this
    	if(robotIdCurrent){
    		_this.robotId = robotIdCurrent
        _this.getTaskInfo()
      }else {
        _this.getRobotList()
      }

    },
    methods:{
      getRobotList(){
        let _this = this
        _this.ajax_api('get',url_api + '/robot',
          {page:1,size:100},
          true,function (res) {
            if(res.code == 200){
              _this.options = res.data.items
              _this.robotId = _this.options[0].id
              robotIdCurrent = _this.robotId
              _this.getTaskInfo()
            }
          })
      },
      getTaskInfo(){
        let _this = this//GET /ui/robot/{id}/current-task
        _this.ajax_api('get',url_api + '/robot/'+ _this.robotId +'/current-task',
          null,
          true,function (res) {
            if(res.code == 200){
              //console.log(res)
              _this.taskInfo = {
                name:res.data.taskName,
                taskStatus:res.data.taskStatus,
                abnormalPointNum:res.data.abnormalPointNum,
                pointTotal:res.data.pointTotal,
                currentPoint:res.data.currentPoint,
                passPointNum:res.data.passPointNum,
                totalRunTime:res.data.totalRunTime,
                cumulativeRunTime:res.data.cumulativeRunTime,

              }
              //console.log(_this.taskInfo)
            }
          })

      },
    },
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl,
      menuBottom
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .monitoring_wrap
    height 100%
    .content
      height calc(100% - 272px)
      .left,.right
        float left
        height 100%
        box-sizing border-box
        .right_top,.right_bottom
          height 50%
          border 1px solid
    .tabs_bottom
      height 180px
      background white
      clear both
</style>
