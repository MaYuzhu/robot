<template>
  <div class="systems_display_wrap">
    <HeaderTop :title="title"></HeaderTop>

    <div class="systems_content">
      <div class="left">
        <div class="left_top">机器人状态</div>
        <div class="left_content">
          <p>运行状态信息</p>
          <div class="yunxing_info">
            <div><p>机身温度: <span>{{body_wendu}} ℃</span></p></div>
            <div><p>云台水平位置: <span>{{yun_x}} °</span></p></div>
            <div><p>运行速度: <span>{{body_speed}} m/s</span></p></div>
            <div><p>云台垂直位置: <span>{{yun_y}} °</span></p></div>
            <div><p>相机倍数: <span>{{zoom}}</span></p></div>
          </div>
          <p>通讯状态信息</p>
          <div class="tong_info">
            <div><p><span>无线基站: </span><img src="../../static/img/signal_no.png" alt=""></p></div>
            <div><p><span>控制系统: </span><img :src="require('../../static/img/'+kongzhiImgSrc+'.png')" alt=""></p></div>
            <div><p><span>可见光摄像: </span><img :src="require('../../static/img/'+videoImgSrc+'.png')" alt=""></p></div>
            <div><p><span>充电系统: </span><img src="../../static/img/signal_no.png" alt=""></p></div>
            <div><p><span>红外摄像: </span><img :src="require('../../static/img/'+redImgSrc+'.png')" alt=""></p></div>
          </div>
          <p>电池状态信息</p>
          <div class="dian_info">
            <div style="width: 100%">
              <p style="float: left;width: 50%">当前电池电量: <span>{{power}} %</span></p>
              <p style="float: left;">电压: {{dianya}} V</p>
            </div>
          </div>
          <p>机器人自身模块信息</p>
          <div class="mokuai_info">
            <div class="mokuai_info_li">
              <p>驱动模块</p>
              <div>
                <div><p>左轮: <span>0</span></p></div>
                <div><p>右轮: <span>0</span></p></div>
              </div>
            </div>
            <div class="mokuai_info_li">
              <p>电源模块</p>
              <div>
                <div><p>外供电源: <span>0</span></p></div>
                <div><p>充电状态: <span>{{chongdian}}</span></p></div>
                <div><p>充电: <span>0</span></p></div>
              </div>
            </div>
            <div class="mokuai_info_li">
              <p>系统模块</p>
              <div>
                <div><p>运行行程: <span>0</span></p></div>
                <div><p>运行时间: <span>0</span></p></div>
                <div><p>巡检设备数量: <span>0</span></p></div>
                <div><p>发现缺陷数量: <span>0</span></p></div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="right">
        <div class="right_top">机器人控制</div>
        <div class="right_content">
          <p>运行状态信息</p>
          <div>
            <div><p>温度: <span>{{temperature}} ℃</span></p></div>
            <div><p>湿度: <span>{{humidity}} %</span></p></div>
            <div><p>风速: <span>{{wind_speed}} m/s</span></p></div>
          </div>
          <p>控制状态信息</p>
          <div class="right_content_bottom">
            <div>
              <p>红外功能：</p>
              <el-switch disabled
                v-model="value_switch1"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>可见光功能：</p>
              <el-switch disabled
                v-model="value_switch2"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>雨刷：</p>
              <el-switch disabled
                v-model="value_switch3"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>避障功能：</p>
              <el-switch disabled
                v-model="value_switch4"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>车灯状态：</p>
              <el-switch disabled
                v-model="value_switch5"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>
                <el-select v-model="value5" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <el-switch disabled
                v-model="value_switch6"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>充电房(后门)：</p>
              <el-switch disabled
                v-model="value_switch7"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
            <div>
              <p>机器人状态：</p>
              <el-switch disabled
                v-model="value_switch8"
                active-text="开"
                inactive-text="关">
              </el-switch>
            </div>
          </div>
        </div>
      </div>
    </div>

    <menuBottom></menuBottom>
    <div id="divPlugin" style="width: 10px;height: 10px;background: #99885e;margin:-100px 0 0 -100px"></div>
  </div>
</template>

<script>
  import HeaderTop from '../components/headerTop.vue'
  import menuBottom from '../components/menuBottom.vue'

  export default {
    data(){
      return{
        title:'机器人信息查询 > 机器人状态显示',
        value_switch1:true,
        value_switch2:true,
        value_switch3:true,
        value_switch4:true,
        value_switch5:true,
        value_switch6:true,
        value_switch7:true,
        value_switch8:true,
        options5: [
          {
            value: '选项1',
            label: '充电室前门'
          }, {
            value: '选项2',
            label: '待选1'
          }, {
            value: '选项3',
            label: '待选2'
          }],
        value5: '',

        body_wendu: '',
        yun_x: '',
        body_speed: '',
        yun_y: '',
        zoom: '',
        listener:null,
        listenerYun:null,
        temperature:0,
        humidity:0,
        wind_speed:0,
        power: '',
        dianya: '',
        url: robotUrl,
        redImgSrc:'signal_no',
        ros:null,
        ros_server:null,
        hkUrl: hKUrl,
        videoImgSrc:'signal_no',
        kongzhiImgSrc:'signal_no',
        webVideoCtrl:null,
        chongdian:'',
      }
    },
    mounted(){
      //window.location.reload()
      let _this = this
      _this.ros = new ROSLIB.Ros({
          url : _this.url
      });
      _this.ros.on('connection', function() {
          console.log('ros.');
      });
      _this.ros.on('close', function() {
          console.log('Connection to websocket server closed.');
      });

      this.init()
      this.weather()
      this.power_now()
      this.speed_now()
      this.yun_xy_now()
      this.isRed()
      this.isVideo()
    },
    methods:{
    	init(){
    		let _this = this
        _this.ajax_api('get',url_api + '/robot-param' + '?&_t=' + new Date().getTime(),
          {irBaseRobotId:1,size:20,page:1,},
          true, function (res) {
            //console.log(res.data)
            //_this.body_speed = 1
          })
      },
      weather(){
        let _this = this
          /*var ros = new ROSLIB.Ros({
            url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
            console.log('weather server.');
          });*/

        _this.listener = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/car_status_now',
          messageType : 'yidamsg/weather'
        });

        _this.listener.subscribe(function(message) {
          //console.log(message);
          //_this.listener.unsubscribe();
          _this.temperature = message.temperature
          _this.humidity = message.humidity
          _this.wind_speed = message.wind_speed
        });
      },
      power_now(){
        let _this = this
        /*var ros = new ROSLIB.Ros({
            url : _this.url
        });
        //console.log(ros)
        ros.on('connection', function() {
            console.log('power.');
        });*/

        _this.listener = new ROSLIB.Topic({
            ros : _this.ros,
            name : '/car_status_now',
            messageType : 'yidamsg/nrcar_status'
        });

        _this.listener.subscribe(function(message) {
          //console.log(message);
          //_this.listener.unsubscribe();
          _this.power = message.battery_info
          _this.body_wendu = message.incar_temperature
          _this.dianya = message.battery_voltage
          _this.chongdian = message.fall?'正在充电':'未充电'
        });
      },
      speed_now(){
            let _this = this
            /*var ros = new ROSLIB.Ros({
                url : _this.url
            });
            //console.log(ros)
            ros.on('connection', function() {
                console.log('speed.');
            });*/

            _this.listener = new ROSLIB.Topic({
                ros : _this.ros,
                name : '/cmd_vel',
                messageType : 'geometry_msgs/Twist'
            });

            _this.listener.subscribe(function(message) {
                //console.log(message.linear.x);
                _this.body_speed = message.linear.x
            });
        },
      yun_xy_now(){
          let _this = this
          /*var ros = new ROSLIB.Ros({
              url : _this.url
          });
          //console.log(ros)
          ros.on('connection', function() {
              console.log('yuntai.');
          });*/

          _this.listenerYun = new ROSLIB.Service({
              ros : _this.ros,
              name : '/cloudplatform_control',
              serviceType : 'cloud_platform/CloudPlatControl'
          });

          var request_x = new ROSLIB.ServiceRequest({
              id:0 ,action:0 ,type:0 ,velue:0
          });
          var request_y = new ROSLIB.ServiceRequest({
              id:0 ,action:0 ,type:1 ,velue:0
          });
          var request_zoom = new ROSLIB.ServiceRequest({
              id:0 ,action:0 ,type:2 ,velue:0
          });
          _this.listenerYun.callService(request_x, function(result) {
              //console.log(result);
              _this.yun_x = result.result/100
              _this.listenerYun.callService(request_y, function(result) {
                  //console.log(result);
                  _this.yun_y = result.result/100
                  _this.listenerYun.callService(request_zoom, function(result) {
                      //console.log(result);
                      _this.zoom = result.result
                  });
              });
          });
      },
      isRed(){

      },
      isVideo(){
        let _this = this
        _this.listener = new ROSLIB.Topic({
          ros : _this.ros,
          name : '/self_check',
          messageType : 'yidamsg/connection_status'
        });

        _this.listener.subscribe(function(message) {
          //console.log(message)
          //可见光
          if(message.camera){
            _this.videoImgSrc = 'signal'
          }else {
            _this.videoImgSrc = 'signal_no'
          }
          //红外
          if(message.infrared_camera){
            _this.redImgSrc = 'signal'
          }else {
            _this.redImgSrc = 'signal_no'
          }
          //控制系统
          if(message.ipc){
            _this.kongzhiImgSrc = 'signal'
          }else {
            _this.kongzhiImgSrc = 'signal_no'
          }
          _this.listener.unsubscribe();
        });

      },

    },
    components: {
      HeaderTop,
      menuBottom
    },
    beforeRouteLeave(to, form, next) {
    	let _this = this
      next()
      if(_this.listener){
        console.log('连接已断开')
        _this.listener.unsubscribe();
      }
    },
    destroyed(){
        let _this = this
        _this.ros.close()
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .systems_display_wrap
    background white
    height 100%
    .systems_content
      display flex
      height calc(100% - 90px)
      min-height 700px
      overflow hidden
      .left,.right
        float left
        border 1px solid #cbeeca
        width 50%
        border-bottom-color transparent
        box-sizing border-box
        .left_top,.right_top
          height: 39px;
          font-size: 17px;
          line-height: 39px;
          text-align: center;
          background-color: #109cb4;
        .left_content
          height calc(100% - 39px)
          color #109cb4
          background white
          >p
            width: 100%;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-size: 15px;
            color: red;
            margin 10px auto 4px
          >div
            width 86%
            margin 0 auto
            padding: 6px 18px;
            border: 1px solid #109cb4;
            display flex
            flex-wrap wrap
          .yunxing_info,.dian_info
            >div
              width 50%
              margin 10px 0
          .tong_info
            >div
              width 33%
              margin 7px 0
              span
                vertical-align middle
              img
                width 20px
                height 20px
                vertical-align middle
          .mokuai_info
            display block
            .mokuai_info_li
              border-bottom 1px dashed #109cb4;
              >p
                color red
                text-align center
                margin 8px auto 4px
              >div
                display flex
                flex-wrap wrap
                >div
                  width 50%
                  margin 6px 0
        .right_content
          height calc(100% - 39px)
          color #109cb4
          background white
          >p
            width: 100%;
            height: 31px;
            line-height: 31px;
            text-align: center;
            font-size: 15px;
            color: red;
            margin 10px auto 4px
          >div
            width 86%
            margin 0 auto
            padding: 6px 18px;
            border: 1px solid #109cb4;
            >div
              margin 15px 0
          .right_content_bottom
            >div
              display flex
              align-items center
              margin 28px
              >p
                float left
                width 200px
                text-align right
          div>>>.el-switch__core
            width 80px!important
            height 20px
          div>>>.el-switch__core::after
            height 16px
            width 16px

</style>
