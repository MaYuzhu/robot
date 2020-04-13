<template>
	<div class="robot_management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="left">
      <div style="background: #e9e9e9;display: flex">
        <p style="height:36px;line-height: 36px;margin: 0 18px;float: left">机器人列表：</p>
        <el-select v-model="value" placeholder="请选择" size="medium" style="float: left">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="background:lavender;clear: both">
        <XunjianContent></XunjianContent>
      </div>
      <taskControl style=""></taskControl>
    </div>

    <div class="right" style="width: 35%">
      <div class="right_top" @dblclick="bigDiv">
        <!--<Button @click="test_ie">IE9</Button>-->
        <Button @click="test_login" style="position: absolute;z-index: 99999">可见光</Button>
        <div id="divPlugin" style="width: 100%;height: 100%;"></div>
      </div>
      <div class="right_bottom">
        <Button @click="red_pic">红外测试</Button>
        <img id="chatterMessage" :src="src" style="width: 100%;height: 100%" alt="">
      </div>
    </div>

    <TabsBottom class="tabs_bottom"></TabsBottom>
    <menuBottom></menuBottom>
	</div>
</template>

<script>
  let socket;
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'
  import menuBottom from '../components/menuBottom.vue'


	export default {
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl,
      menuBottom
    },
    data() {
      return {
      	title:'机器人管理 > 机器人管理',
        options: [{
          value: '选项1',
          label: '机器人一号'
        }, {
          value: '选项2',
          label: '机器人二号'
        }],
        value: '选项1',

        lockReconnect: false,
        wsCfg: {
          // websocket地址
          url: "ws://192.168.1.78:9090"
        },
        src:'',
        listener:null,
        hkUrl:'192.168.1.13'
      }
    },
    methods: {
    	red_pic(){
    		let _this = this
        var ros = new ROSLIB.Ros({
          url : 'ws://192.168.1.78:9090'
        });
    		//console.log(ros)
        ros.on('connection', function() {
          console.log('Connected to websocket server.');
        });

        _this.listener = new ROSLIB.Topic({
          ros : ros,
          name : '/thermal/image_proc/compressed',
          messageType : 'sensor_msgs/CompressedImage'
        });

        _this.listener.subscribe(function(message) {
          console.log('Received message on ' +': ' + message.data);
          var  url = "data:image/png;base64,";
          var i = message.data
          _this.src = url+ i
          setTimeout(function () {

            $("#chatterMessage").src = _this.src
          },1000)

          //_this.listener.unsubscribe();
        });
      },
      test_aaa(){
        let _this = this
        var ros = new ROSLIB.Ros({
          url : 'ws://192.168.1.78:9090'
        });

        var listener = new ROSLIB.Topic({
          ros : ros,
          name : '/detect_result',
          messageType : 'yidamsg/InspectedResult'
        });

        listener.subscribe(function(message) {
          //console.log(message);
          listener.unsubscribe();
        });
      },
      test_ie(){
        var ws = new WebSocket("ws://192.168.1.78:9090");
        console.log(ws)
        ws.onopen = function() {
          //ws.send("Hello");  // Sends a message.
          console.log('ie9')
        };
        ws.onmessage = function(e) {
          // Receives a message.
          alert(e.data);
          console.log(ie9)
        };
        ws.onclose = function() {
          alert("closed");
        };
      },
      createWebSocket() {
        try {
          // 创建Web Socket 连接
          socket = new WebSocket(this.wsCfg.url);
          // 初始化事件
          this.initEventHandle(socket);
        } catch (e) {
          // 出错时重新连接
          this.reconnect(this.wsCfg.url);
        }
      },
      initEventHandle(socket) {
      	let _this = this

        // 连接关闭时触发
        socket.onclose = () => {
          console.log("连接关闭");
        };
        // 通信发生错误时触发
        socket.onerror = () => {
          // 重新创建长连接
          this.reconnect();
        };
        // 连接建立时触发
        socket.onopen = () => {
          console.log("连接成功");
          //console.log(ROSLIB)


        };
        // 客户端接收服务端数据时触发
        socket.onmessage = msg => {
          // 业务逻辑处理
          console.log(msg.data, "ws:data");
        };

      },
      reconnect() {
        if (this.lockReconnect) {
          return;
        }
        this.lockReconnect = true;

        // 没连接上会一直重连，设置延迟避免请求过多
        setTimeout(() => {
          this.lockReconnect = false;
          this.createWebSocket(this.wsCfg.url);
        }, 5000);
      },
      test() {
        // 给服务器发送一个字符串:
        // ws.send("Hello!");
        socket.send("Hello!");
      },

      //可见光
      test_login(){
      	let _this = this

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
          _this.clickStartRealPlay()
        }


      },
      clickStartRealPlay() {
        let _this = this
        var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
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

    },
    mounted() {
    	let _this = this
      // 初始化插件参数及插入插件
      WebVideoCtrl.I_InitPlugin('100%', '100%', {
        iWndowType: 1,
        cbSelWnd: function (xmlDoc) {
          let g_iWndIndex = $(xmlDoc).find("SelectWnd").eq(0).text();
          var szInfo = "当前选择的窗口编号：" + g_iWndIndex;
          console.log(szInfo);
        }
      });
      WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin");
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

      //this.createWebSocket();
    },
    beforeRouteLeave(to, form, next) {
      next()
      if(this.listener){
        console.log('连接已断开')
        this.listener.unsubscribe();
      }

    },

  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .robot_management_wrap
    height 100%
    .left
      width 65%
      float left
      height calc(100% - 270px)
      overflow hidden
    .right
      width 35%
      height calc(100% - 270px)
      //border 2px solid red
      box-sizing border-box
      float left
      .right_top
        height 50%
        border 2px solid
        position relative
      .right_bottom
        height 50%
        border 2px solid
    .tabs_bottom
      clear both
  div>>>
    .el-select
      .el-input
        .el-input__suffix
          .el-icon-arrow-up

            -ms-transform: rotate(180deg)


</style>
