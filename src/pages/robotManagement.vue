<template>
	<div class="robot_management_wrap">
    <HeaderTop :title="title"></HeaderTop>
    <div class="left">
      <div style="width: 65%;background: #e9e9e9;display: flex">
        <p style="height:36px;line-height: 36px;margin: 0 18px;">机器人列表：</p>
        <el-select v-model="value" placeholder="请选择" size="medium">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="background:lavender">
        <XunjianContent></XunjianContent>
      </div>
      <taskControl style=""></taskControl>
    </div>

    <div class="right" style="width: 35%">
      <div class="right_top">

      </div>
      <div class="right_bottom">
        <h1>vue + websocket连接demo</h1>
        <Button @click="test">test</Button>
        <Button @click="testaaa">AAAA</Button>
        <img id="chatterMessage" :src="src" style="width: 200px;height: 200px" alt="">
      </div>
    </div>

    <TabsBottom class="tabs_bottom"></TabsBottom>

	</div>
</template>

<script>
  let socket;
  import HeaderTop from '../components/headerTop.vue'
  import TabsBottom from '../components/tabsBottom.vue'
  import XunjianContent from '../components/xunjianContent.vue'
  import taskControl from '../components/taskControl.vue'

	export default {
    components: {
      HeaderTop,
      TabsBottom,
      XunjianContent,
      taskControl
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
        src:''
      }
    },
    methods: {
    	testaaa(){
    		let _this = this
        var ros = new ROSLIB.Ros({
          url : 'ws://192.168.1.78:9090'
        });
        ros.on('connection', function() {
          console.log('Connected to websocket server.');
        });
        var cmdVel = new ROSLIB.Topic({
          ros : ros,
          name : '/thermal/image_proc/compressed',
          messageType : 'sensor_msgs::CompressedImage'
        });
        //console.log(cmdVel)
        var listener = new ROSLIB.Topic({
          ros : ros,
          name : '/thermal/image_proc/compressed',
          messageType : 'sensor_msgs/CompressedImage'
        });

        listener.subscribe(function(message) {
          console.log('Received message on ' + listener.name + ': ' + message.data);
          var  url = "data:image/png;base64,";
          var i = message.data
          _this.src = url+ i
          setInterval(function () {

            $("#chatterMessage").src = _this.src
          },1000)

          //listener.unsubscribe();
        });
      },
    	test_aaa(){
        let ros = new ROSLIB.Ros()
        ros.connect(this.wsCfg.url)
        ros.on('error', function(event) {
          console.log("Error connecting to ROS Bridge. Check to make sure you have launched the rosbridge server.");
        });
        ros.on('connection', function() {
          console.log('Rosbridge connected.');
          var chatterData = document.getElementById('chatterMessage');


          var listener = new ROSLIB.Topic({
            ros : ros,
            name : '/thermal/image_proc/compressed',
            messageType : 'sensor_msgs::CompressedImage'
          });

          if (1) {
            console.log('Subscribed to ' + listener.name);
            //chatterSubscribed = true;
            listener.subscribe(function(msg) {
              chatterData.innerHTML = msg.data;
              console.log(msg)
            });
          }
          else {
            listener.unsubscribe();
            //chatterSubscribed = false;
            console.log('Unsubscribed from ' + listener.name);
          }


        });

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
      }
    },
    mounted() {
      this.createWebSocket();
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

  .robot_management_wrap
    height 100%
    .left
      width 65%
      float left
      height calc(100% - 70px)
      overflow hidden
    .right
      width 35%
      height calc(100% - 70px)
      //border 2px solid red
      box-sizing border-box
      float left
      .right_top
        height 50%
        border 2px solid
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

            -ms-transform: rotate(180deg)\0;


</style>
