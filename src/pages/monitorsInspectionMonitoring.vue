<template>
  <div class="monitoring_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="content">
      <div class="left" style="width: 65%;">
        <div style="background:lavender">
          <XunjianContent :taskInfo="taskInfo"></XunjianContent>
        </div>
        <div class="taskControl_wrap">
          <taskControl @isVideo="isVideo" :irDataTaskHistoryId="irDataTaskHistoryId"></taskControl>
        </div>

      </div>
      <div class="right" style="width: 35%">
        <div class="right_top" @dblclick="bigDiv">
          <div @click="test_login" class="play_video">
            <img src="../../static/img/play.png" alt="">
          </div>
          <div id="divPlugin" style="width: 100%;height: 100%;background:#343434"></div>
        </div>
        <div class="right_bottom" id="container_red" @dblclick="showFull">
          <Button class="red_pic_but" @click="red_pic">红外</Button>
          <img id="chatterMessage" :src="src" style="width: 100%;height: 100%" alt="">
        </div>
      </div>
    </div>

    <div class="tabs_bottom">
      <TabsBottom @isVideo="isVideo"></TabsBottom>
    </div>
    <menuBottom></menuBottom>
  </div>
</template>

<script>
  import menuBottom from '../components/menuBottom.vue'
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'

  import testTree from '../components/test.vue'

  export default {
    data(){
      return{
        title:'巡检监控 > 巡检监控',
        taskInfo:{},
        robotId:'',
        hkUrl:hKUrl,
        src:'',
        listener:null,
        url:robotUrl,
        g_iWndIndex:null,
        currentTaskInfoTimeId:null,
        time:3000,
        ros:null,
        irDataTaskHistoryId:'',
      }
    },

    mounted(){
    	let _this = this
      _this.ros = new ROSLIB.Ros({
          url : _this.url
      });
    	if(robotIdCurrent){
    		_this.robotId = robotIdCurrent
        _this.getTaskInfo()
      }else {
        _this.getRobotList()
      }
        _this.play_but()
        WebVideoCtrl.I_InitPlugin('100%', '100%', {
            iWndowType: 1,
            cbSelWnd: function (xmlDoc) {
                _this.g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
                var szInfo = "当前选择的窗口编号：" + _this.g_iWndIndex;
                console.log(szInfo);
            }
        });

        // 窗口事件绑定
        $(window).bind({
            resize: function () {
                var $Restart = $("#restartDiv");
                if ($Restart.length > 0) {
                    var oSize = _this.getWindowSize();
                    $Restart.css({
                        width: oSize.width + "px",
                        height: oSize.height + "px"
                    });
                }
            }
        });
        $(window).resize(function() {
            // 变化后需要做的事
            _this.play_but()
        })

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
              console.log(res)
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
              currentTaskInfo()
            }
          })
          function currentTaskInfo() {
              _this.ajax_api('get',url_api + '/robot/'+ _this.robotId +'/current-task',
                  null,
                  true,function (res) {
                      if(res.code == 200){
                          //console.log(res)
                          _this.irDataTaskHistoryId = res.data.irDataTaskHistoryId
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
                      }
                  })
              _this.currentTaskInfoTimeId = setTimeout(currentTaskInfo,_this.time)
          }

      },

      red_pic(){
          $('.red_pic_but').hide()
            let _this = this
            /*var ros = new ROSLIB.Ros({
                url : _this.url
            });*/
            //console.log(ros)
            /*ros.on('connection', function() {
              console.log('Connected to websocket server.');
            });*/

            _this.listener = new ROSLIB.Topic({
                ros : _this.ros,
                name : '/thermal/image_proc/compressed',// /thermal/image_proc/compressed
                messageType : 'sensor_msgs/CompressedImage', // sensor_msgs::CompressedImage
                /*name : '/navigation/cmd_vel',// /thermal/image_proc/compressed
                messageType : 'geometry_msgs/Twist' // sensor_msgs::CompressedImage*/

            });

            _this.listener.subscribe(function(message) {
                //console.log('Received message on ' +': ' + message.data);
                var  url = "data:image/png;base64,";
                var i = message.data
                _this.src = url+ i
                setTimeout(function () {
                    $("#chatterMessage").src = _this.src
                },1000)

                //_this.listener.unsubscribe();
            });

      },

      //可见光
      test_login(){
          let _this = this
          $('.play_video').hide()
          WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin")
          var iRet = WebVideoCtrl.I_Login(_this.hkUrl, 1, 80, 'admin', '1234asdf', {
              success: function (xmlDoc) {
                  console.log(" 登录成功！");
                  /*$("#ip").prepend("<option value='" + szIP + "'>" + szIP + "</option>");
                  setTimeout(function () {
                    $("#ip").val(szIP);
                    getChannelInfo();
                  }, 100);*/
                  _this.clickStartRealPlay()

              },
              error: function () {
                  console.log(" 登录失败！");
              }
          });
          if (-1 == iRet) {
            setTimeout(function () {
              _this.clickStartRealPlay()
            },500)
          }


      },
      clickStartRealPlay() {
          let _this = this
          var oWndInfo = WebVideoCtrl.I_GetWindowStatus(_this.g_iWndIndex),
              szIP = _this.hkUrl,//$("#ip").val(),
              iStreamType = 1,//parseInt($("#streamtype").val(), 10),
              iChannelID = 1,//parseInt($("#channels").val(), 10),
              bZeroChannel = false,//$("#channels option").eq($("#channels").get(0).selectedIndex).attr("bZero") == "true" ? true : false,
              szInfo = "";

          if ("" == szIP) {
              return;
          }

          if (oWndInfo != null) {// 已经在播放了，先停止
              WebVideoCtrl.I_Stop();
              console.log('已经在播放了，先停止');
          }

          var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {
              iStreamType: iStreamType,
              iChannelID: iChannelID,
              bZeroChannel: bZeroChannel
          });

          if (0 == iRet) {
              szInfo = "开始预览成功！";
          } else {
              szInfo = "开始预览失败！";
          }

          console.log(szIP + " " + szInfo);
      },
      // 获取窗口尺寸
      getWindowSize() {
          var nWidth = $(this).width() + $(this).scrollLeft(),
              nHeight = $(this).height() + $(this).scrollTop();

          return {width: nWidth, height: nHeight};
      },
      bigDiv(){
          clickFullScreen()
          // 全屏
          function clickFullScreen() {
              WebVideoCtrl.I_FullScreen(true);
          }
      },

      changeId(val){
          let _this = this
          //console.log(val)
          robotIdCurrent = _this.robotId
          _this.getTaskInfo()
      },

      //视频窗口隐藏
      isVideo(val){
          //console.log(val)
          if(!val){
              $('.right_top').css({'visibility': 'hidden'})
          }else {
              $('.right_top').css({'visibility': 'visible'})
          }

      },

      //红外全屏
      showFull(){
          var full=document.getElementById("container_red");
          this.launchIntoFullscreen(full);
      },
      launchIntoFullscreen(element) {
          if(element.requestFullscreen){
              element.requestFullscreen();
          }
          else if(element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
          }
          else if(element.webkitRequestFullscreen) {
              element.webkitRequestFullscreen();
          }
          else if(element.msRequestFullscreen) {
              element.msRequestFullscreen();
          }
      },
      //退出全屏
      exitFullscreen() {
          if(document.exitFullscreen) {
              document.exitFullscreen();
          } else if(document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if(document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
          }
      },
      //视频窗口按钮
      play_but(){
          var video_w = $('.play_video').parent().width()
          var video_h = $('.play_video').parent().height()
          var margin = (video_h/2-30) + 'px ' + (video_w/2-30) + 'px'
          //console.log(margin)
          $('.play_video').css({'margin':margin})
      },
    },
    destroyed(){
        let _this = this
        clearTimeout(_this.currentTaskInfoTimeId)
        _this.ros.close()
    },
    beforeRouteLeave(to, form, next) {
        next()
        if(this.listener){
            console.log('连接已断开')
            this.listener.unsubscribe();
        }

    },
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl,
      menuBottom,
      testTree
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
        .right_top
          height 50%
          border 1px solid
          /*position relative*/
          visibility visible
          .play_video
            width 60px
            height 60px
            position absolute
            z-index 99999
            background #343434
            /*cursor pointer*/
            img
              width 100%
              height 100%
        .taskControl_wrap
          height calc(100% - 87px)
    .tabs_bottom
      height 180px
      background white
      clear both
</style>
